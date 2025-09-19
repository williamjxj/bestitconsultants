'use client'

import { motion } from 'framer-motion'
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
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { aiNewsService } from '@/services/ai-news'
import { webScrapingService } from '@/services/web-scraping'
import type { AINewsArticle, NewsCategory } from '@/types/ai-news'
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
  const [sortBy, setSortBy] = useState<'date' | 'trending'>('date')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load articles from service
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const result = await aiNewsService.getArticles()
        setArticles(result.articles)
        setFilteredArticles(result.articles)

        const trending = await aiNewsService.getTrendingArticles()
        setTrendingArticles(trending)
      } catch (err) {
        console.error('Error loading articles:', err)
        setError('Failed to load articles')
        // Fallback to empty state
        setArticles([])
        setFilteredArticles([])
        setTrendingArticles([])
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Filter and search articles
  useEffect(() => {
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

    // Sort articles
    filtered.sort((a, b) => {
      if (sortBy === 'trending') {
        if (a.trending && !b.trending) return -1
        if (!a.trending && b.trending) return 1
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    setFilteredArticles(filtered)
  }, [selectedCategory, articles, searchQuery, sortBy])

  // Handle category filter
  const handleCategoryFilter = (category: NewsCategory | 'All') => {
    setSelectedCategory(category)
  }

  // Handle content refresh
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      await webScrapingService.refreshContent()

      // Reload articles after refresh
      const result = await aiNewsService.getArticles()
      setArticles(result.articles)
      setFilteredArticles(result.articles)

      const trending = await aiNewsService.getTrendingArticles()
      setTrendingArticles(trending)
    } catch (err) {
      console.error('Error refreshing content:', err)
      setError('Failed to refresh content')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'
      >
        <div className='container mx-auto px-4 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-4xl md:text-6xl font-bold mb-6'
          >
            AI News & Trends
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'
          >
            Stay updated with the latest developments in artificial
            intelligence, machine learning, and emerging technologies
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='flex flex-wrap justify-center gap-4'
          >
            <Badge
              variant='secondary'
              className='bg-white/20 backdrop-blur-sm text-white border-white/30'
            >
              <TrendingUp className='w-4 h-4 mr-2' />
              Trending Topics
            </Badge>
            <Badge
              variant='secondary'
              className='bg-white/20 backdrop-blur-sm text-white border-white/30'
            >
              <Zap className='w-4 h-4 mr-2' />
              Latest Updates
            </Badge>
            <Badge
              variant='secondary'
              className='bg-white/20 backdrop-blur-sm text-white border-white/30'
            >
              <Users className='w-4 h-4 mr-2' />
              Expert Insights
            </Badge>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant='secondary'
              className='bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30'
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              {isRefreshing ? 'Refreshing...' : 'Refresh Content'}
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Trending News Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold text-gray-900 mb-8 flex items-center'
          >
            <TrendingUp className='w-8 h-8 mr-3 text-blue-600' />
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
                  Unable to load trending articles at this time.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
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
                  <Card className='overflow-hidden hover:shadow-xl transition-all duration-300'>
                    <div className='relative'>
                      <Image
                        src={article.image_url || '/api/placeholder/400/250'}
                        alt={article.title}
                        width={400}
                        height={250}
                        className='w-full h-48 object-cover'
                      />
                      <div className='absolute top-4 left-4'>
                        <Badge className='bg-red-500 text-white'>
                          Trending
                        </Badge>
                      </div>
                      <div className='absolute top-4 right-4'>
                        <Badge variant='secondary'>{article.category}</Badge>
                      </div>
                    </div>

                    <CardContent className='p-6'>
                      <CardTitle className='text-xl mb-3 line-clamp-2'>
                        {article.title}
                      </CardTitle>
                      <CardDescription className='mb-4 line-clamp-3'>
                        {article.excerpt}
                      </CardDescription>

                      <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                        <div className='flex items-center'>
                          <Calendar className='w-4 h-4 mr-1' />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {article.read_time}
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-2 mb-4'>
                        {article.tags?.map(tag => (
                          <Badge
                            key={tag}
                            variant='outline'
                            className='text-xs'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className='w-full'>
                        Read More
                        <ExternalLink className='w-4 h-4 ml-2' />
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
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl font-bold text-gray-900 mb-8'
          >
            Latest AI News
          </motion.h2>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8 space-y-4'
          >
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Search Input */}
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search articles...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryFilter}
              >
                <SelectTrigger className='w-full md:w-48'>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select
                value={sortBy}
                onValueChange={(value: 'date' | 'trending') => setSortBy(value)}
              >
                <SelectTrigger className='w-full md:w-48'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='date'>Latest First</SelectItem>
                  <SelectItem value='trending'>Trending First</SelectItem>
                </SelectContent>
              </Select>
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
                  Unable to load articles at this time.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
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
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className='overflow-hidden hover:shadow-xl transition-all duration-300'>
                    <div className='relative'>
                      <Image
                        src={article.image_url || '/api/placeholder/400/250'}
                        alt={article.title}
                        width={400}
                        height={250}
                        className='w-full h-48 object-cover'
                      />
                      <div className='absolute top-4 right-4'>
                        <Badge variant='secondary'>{article.category}</Badge>
                      </div>
                      {article.trending && (
                        <div className='absolute top-4 left-4'>
                          <Badge className='bg-red-500 text-white'>
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className='p-6'>
                      <CardTitle className='text-xl mb-3 line-clamp-2'>
                        {article.title}
                      </CardTitle>
                      <CardDescription className='mb-4 line-clamp-3'>
                        {article.excerpt}
                      </CardDescription>

                      <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                        <div className='flex items-center'>
                          <Calendar className='w-4 h-4 mr-1' />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-1' />
                          {article.read_time}
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-2 mb-4'>
                        {article.tags?.map(tag => (
                          <Badge
                            key={tag}
                            variant='outline'
                            className='text-xs'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button variant='outline' className='w-full'>
                        Read More
                        <ExternalLink className='w-4 h-4 ml-2' />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
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
            insights delivered to your inbox
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
