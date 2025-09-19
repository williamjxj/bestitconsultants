'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, TrendingUp, Users, Zap, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { aiNewsService } from '@/services/ai-news'
import { webScrapingService } from '@/services/web-scraping'
import type { AINewsArticle, NewsCategory } from '@/types/ai-news'

const categories: (NewsCategory | 'All')[] = ['All', 'AI Models', 'Biotech AI', 'AI Safety', 'Enterprise AI', 'Research', 'Autonomous Vehicles']

export default function AINewsPage() {
  const [articles, setArticles] = useState<AINewsArticle[]>([])
  const [trendingArticles, setTrendingArticles] = useState<AINewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<AINewsArticle[]>([])
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'All'>('All')
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

  // Filter articles by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredArticles(articles)
    } else {
      const filtered = articles.filter(article => article.category === selectedCategory)
      setFilteredArticles(filtered)
    }
  }, [selectedCategory, articles])

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            AI News & Trends
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Stay updated with the latest developments in artificial intelligence, machine learning, and emerging technologies
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Trending Topics</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Latest Updates</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Expert Insights</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-colors duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">
                {isRefreshing ? 'Refreshing...' : 'Refresh Content'}
              </span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Trending News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-8 flex items-center"
          >
            <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
            Trending Now
          </motion.h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-gray-600">
              <p>Unable to load trending articles at this time.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <Image
                      src={article.image_url || '/api/placeholder/400/250'}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Trending
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <span>{article.read_time}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All News Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Latest AI News
          </motion.h2>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-gray-600">
              <p>Unable to load articles at this time.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>No articles found for the selected category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative">
                    <Image
                      src={article.image_url || '/api/placeholder/400/250'}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <span>{article.read_time}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center justify-center">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </motion.article>
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
        className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with AI Trends</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest AI news, research breakthroughs, and industry insights delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
