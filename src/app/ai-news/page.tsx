'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  ExternalLink,
  TrendingUp,
  Users,
  Zap,
  RefreshCw,
  Search,
  Filter,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Star,
  Bookmark,
  Share2,
  Play,
  Image as ImageIcon,
  Video,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Heart,
  MessageCircle,
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'

import { aiNewsService } from '@/services/ai-news'
import type { AINewsArticle, NewsCategory } from '@/types/ai-news'
import { formatArticleDate, isRecent } from '@/lib/date-utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ArticleImage } from '@/components/ui/article-image'

const categories: (NewsCategory | 'All')[] = [
  'All',
  'AI Models',
  'Biotech AI',
  'AI Safety',
  'Enterprise AI',
  'Research',
  'Autonomous Vehicles',
]

export default function AINewsPage() {
  const [articles, setArticles] = useState<AINewsArticle[]>([])
  const [trendingArticles, setTrendingArticles] = useState<AINewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<AINewsArticle[]>([])
  const [selectedCategory, setSelectedCategory] = useState<
    NewsCategory | 'All'
  >('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'trending' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showOnlyTrending, setShowOnlyTrending] = useState(false)
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())

  // Load articles from Supabase
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Load all articles from Supabase
        const result = await aiNewsService.getArticles({ limit: 100 })
        setArticles(result.articles)

        // Load trending articles
        const trending = await aiNewsService.getTrendingArticles(6)
        setTrendingArticles(trending.trending)
      } catch (err) {
        console.error('Error loading articles:', err)
        setError('Failed to load articles from database')
        // Fallback to empty state
        setArticles([])
        setTrendingArticles([])
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Filter, search, and sort articles with pagination
  const { paginatedArticles, totalPages, totalItems } = useMemo(() => {
    let filtered = articles

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        article => article.category === selectedCategory
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by trending
    if (showOnlyTrending) {
      filtered = filtered.filter(article => article.trending)
    }

    // Filter by images
    if (showOnlyWithImages) {
      filtered = filtered.filter(article => article.image_url)
    }

    // Sort articles
    filtered.sort((a, b) => {
      let comparison = 0

      if (sortBy === 'trending') {
        if (a.trending && !b.trending) comparison = -1
        else if (!a.trending && b.trending) comparison = 1
        else
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title)
      } else {
        comparison = new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      return sortOrder === 'asc' ? -comparison : comparison
    })

    const totalItems = filtered.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedArticles = filtered.slice(startIndex, endIndex)

    return { paginatedArticles, totalPages, totalItems }
  }, [
    articles,
    selectedCategory,
    searchQuery,
    sortBy,
    sortOrder,
    showOnlyTrending,
    showOnlyWithImages,
    currentPage,
    itemsPerPage,
  ])

  // Update filtered articles for display
  useEffect(() => {
    setFilteredArticles(paginatedArticles)
  }, [paginatedArticles])

  // Handle category filter
  const handleCategoryFilter = (category: NewsCategory | 'All') => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page
  }

  // Handle sort change
  const handleSortChange = (newSortBy: 'date' | 'trending' | 'title') => {
    setSortBy(newSortBy)
    setCurrentPage(1) // Reset to first page
  }

  // Handle sort order toggle
  const handleSortOrderToggle = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setCurrentPage(1) // Reset to first page
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle favorites
  const toggleFavorite = (articleId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(articleId)) {
        newFavorites.delete(articleId)
      } else {
        newFavorites.add(articleId)
      }
      return newFavorites
    })
  }

  // Handle bookmarks
  const toggleBookmark = (articleId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId)
      } else {
        newBookmarks.add(articleId)
      }
      return newBookmarks
    })
  }

  // Handle content refresh - reload from Supabase
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      setError(null)

      // Reload articles from Supabase
      const result = await aiNewsService.getArticles({ limit: 100 })
      setArticles(result.articles)

      // Reload trending articles
      const trending = await aiNewsService.getTrendingArticles(6)
      setTrendingArticles(trending.trending)

      // Reset pagination
      setCurrentPage(1)
    } catch (err) {
      console.error('Error refreshing content:', err)
      setError('Failed to refresh content from database')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Simplified Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8'
      >
        <div className='container mx-auto px-4 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-2xl md:text-3xl font-bold mb-2'
          >
            AI News & Trends
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-sm text-blue-100 mb-4'
          >
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </motion.p>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant='secondary'
            size='sm'
            className='bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30'
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </motion.section>

      {/* Trending News Section */}
      <section className='py-8'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-xl font-bold text-gray-900 mb-6 flex items-center'
          >
            <TrendingUp className='w-5 h-5 mr-2 text-blue-600' />
            Trending Now
          </motion.h2>

          {isLoading ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[...Array(3)].map((_, i) => (
                <Card key={i} className='overflow-hidden'>
                  <div className='h-48 bg-gray-200 animate-pulse'></div>
                  <CardContent className='p-6'>
                    <div className='h-6 bg-gray-200 rounded animate-pulse mb-3'></div>
                    <div className='h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded animate-pulse mb-4'></div>
                    <div className='h-4 bg-gray-200 rounded animate-pulse w-1/2'></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className='text-center p-8'>
              <CardContent>
                <p className='text-gray-600 mb-4'>
                  Unable to load trending articles from database.
                </p>
                <Button onClick={handleRefresh}>Try Again</Button>
              </CardContent>
            </Card>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {trendingArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className='article-card'>
                    {article.image_url && (
                      <div className='relative'>
                        <ArticleImage
                          src={article.image_url}
                          alt={article.title}
                          width={400}
                          height={250}
                          className='w-full h-48'
                          priority={index < 3}
                        />
                      </div>
                    )}

                    <CardContent className='p-6'>
                      <CardTitle className='article-title text-xl mb-3 line-clamp-2'>
                        {article.title}
                      </CardTitle>
                      <CardDescription className='article-excerpt mb-4 line-clamp-3'>
                        {article.excerpt}
                      </CardDescription>

                      <Button className='w-full' asChild>
                        <a
                          href={article.source_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Read More
                          <ExternalLink className='w-4 h-4 ml-2' />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All News Section */}
      <section className='py-8 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-xl font-bold text-gray-900 mb-6'
          >
            Latest AI News
          </motion.h2>

          {/* Enhanced Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8 space-y-6'
          >
            {/* Top Controls Row */}
            <div className='flex flex-col lg:flex-row gap-4'>
              {/* Search Input */}
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search articles, tags, or content...'
                  value={searchQuery}
                  onChange={e => handleSearch(e.target.value)}
                  className='pl-10 pr-4'
                />
              </div>

              {/* View Mode Toggle */}
              <div className='flex gap-2'>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className='w-4 h-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('list')}
                >
                  <List className='w-4 h-4' />
                </Button>
              </div>

              {/* Sort Controls */}
              <div className='flex gap-2'>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className='w-full md:w-48'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='date'>Date</SelectItem>
                    <SelectItem value='trending'>Trending</SelectItem>
                    <SelectItem value='title'>Title</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleSortOrderToggle}
                  className='px-3'
                >
                  {sortOrder === 'asc' ? (
                    <ArrowUp className='w-4 h-4' />
                  ) : (
                    <ArrowDown className='w-4 h-4' />
                  )}
                </Button>
              </div>

              {/* Refresh Button */}
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant='outline'
                size='sm'
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
            </div>

            {/* Filter Controls */}
            <div className='flex flex-col md:flex-row gap-4 items-start md:items-center'>
              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryFilter}
              >
                <SelectTrigger className='w-full md:w-48'>
                  <SelectValue placeholder='All Categories' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Advanced Filters */}
              <div className='flex flex-wrap gap-4 items-center'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='trending-only'
                    checked={showOnlyTrending}
                    onCheckedChange={checked =>
                      setShowOnlyTrending(checked as boolean)
                    }
                  />
                  <Label htmlFor='trending-only' className='text-sm'>
                    Trending Only
                  </Label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='with-images'
                    checked={showOnlyWithImages}
                    onCheckedChange={checked =>
                      setShowOnlyWithImages(checked as boolean)
                    }
                  />
                  <Label htmlFor='with-images' className='text-sm'>
                    With Images
                  </Label>
                </div>
              </div>

              {/* Results Count */}
              <div className='text-sm text-gray-600'>
                Showing {filteredArticles.length} of {totalItems} articles
              </div>
            </div>

            {/* Category Pills */}
            <div className='flex flex-wrap gap-2'>
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  size='sm'
                  className='transition-all duration-200'
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {isLoading ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className='overflow-hidden'>
                  <div className='h-48 bg-gray-200 animate-pulse'></div>
                  <CardContent className='p-6'>
                    <div className='h-6 bg-gray-200 rounded animate-pulse mb-3'></div>
                    <div className='h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded animate-pulse mb-4'></div>
                    <div className='h-4 bg-gray-200 rounded animate-pulse w-1/2'></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className='text-center p-8'>
              <CardContent>
                <p className='text-gray-600 mb-4'>
                  Unable to load articles from database.
                </p>
                <Button onClick={handleRefresh}>Try Again</Button>
              </CardContent>
            </Card>
          ) : filteredArticles.length === 0 ? (
            <Card className='text-center p-8'>
              <CardContent>
                <p className='text-gray-600 mb-4'>
                  No articles found for the selected criteria.
                </p>
                <Button
                  variant='outline'
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode='wait'>
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      scale: viewMode === 'grid' ? 1.02 : 1.01,
                    }}
                    className={viewMode === 'list' ? 'w-full' : ''}
                  >
                    <Card className='article-card group'>
                      <div
                        className={viewMode === 'grid' ? 'relative' : 'flex'}
                      >
                        {/* Image Section - Only show if image exists */}
                        {article.image_url && (
                          <div
                            className={
                              viewMode === 'grid'
                                ? 'relative'
                                : 'relative w-64 h-48 flex-shrink-0'
                            }
                          >
                            <ArticleImage
                              src={article.image_url}
                              alt={article.title}
                              width={viewMode === 'grid' ? 400 : 256}
                              height={viewMode === 'grid' ? 250 : 192}
                              className={`${viewMode === 'grid' ? 'w-full h-48' : 'w-full h-full'} group-hover:scale-105 transition-transform duration-300`}
                              priority={index < 6}
                            />
                          </div>
                        )}

                        {/* Content Section */}
                        <CardContent
                          className={`${viewMode === 'grid' ? 'p-6' : 'p-6 flex-1'}`}
                        >
                          <CardTitle
                            className={`article-title ${viewMode === 'grid' ? 'text-xl' : 'text-lg'} line-clamp-2 mb-3`}
                          >
                            {article.title}
                          </CardTitle>

                          <CardDescription
                            className={`article-excerpt ${viewMode === 'grid' ? 'line-clamp-3' : 'line-clamp-2'} mb-4`}
                          >
                            {article.excerpt}
                          </CardDescription>

                          <Button className='w-full' asChild>
                            <a
                              href={article.source_url}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Read More
                              <ExternalLink className='w-4 h-4 ml-2' />
                            </a>
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='flex justify-center items-center gap-4 mt-12'
            >
              <Button
                variant='outline'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='flex items-center gap-2'
              >
                <ChevronLeft className='w-4 h-4' />
                Previous
              </Button>

              <div className='flex items-center gap-2'>
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <Button
                      variant={currentPage === 1 ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </Button>
                    {currentPage > 4 && (
                      <span className='text-gray-400'>...</span>
                    )}
                  </>
                )}

                {/* Page numbers around current page */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const start = Math.max(
                    1,
                    Math.min(currentPage - 2, totalPages - 4)
                  )
                  const pageNum = start + i

                  if (pageNum > totalPages) return null

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => handlePageChange(pageNum)}
                      className='min-w-[40px]'
                    >
                      {pageNum}
                    </Button>
                  )
                })}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className='text-gray-400'>...</span>
                    )}
                    <Button
                      variant={
                        currentPage === totalPages ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant='outline'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='flex items-center gap-2'
              >
                Next
                <ChevronRight className='w-4 h-4' />
              </Button>
            </motion.div>
          )}

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='text-center text-gray-600 mt-8'
          >
            <p>
              Showing {filteredArticles.length} of {totalItems} articles
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
      >
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Stay Updated with AI Trends
          </h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Get the latest AI news, research breakthroughs, and industry
            insights from our curated database delivered to your inbox
          </p>
          <Card className='max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20'>
            <CardContent className='p-6'>
              <div className='flex gap-4'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70'
                />
                <Button className='bg-white text-blue-600 hover:bg-gray-100'>
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  )
}
