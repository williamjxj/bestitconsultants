'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, TrendingUp, Users, Zap } from 'lucide-react'
import Image from 'next/image'

// Mock data for AI news - in a real app, this would come from an API
const aiNews = [
  {
    id: 1,
    title: 'OpenAI Releases GPT-4 Turbo with Enhanced Reasoning Capabilities',
    excerpt: 'The latest iteration brings improved mathematical reasoning and code generation, with 128k context window for complex problem solving.',
    date: '2025-01-25',
    category: 'AI Models',
    readTime: '5 min read',
    image: '/api/placeholder/400/250',
    trending: true,
    tags: ['GPT-4', 'OpenAI', 'LLM', 'Reasoning']
  },
  {
    id: 2,
    title: 'Google DeepMind Unveils AlphaFold 3 for Protein Structure Prediction',
    excerpt: 'Revolutionary AI model predicts protein structures with unprecedented accuracy, accelerating drug discovery and biomedical research.',
    date: '2025-01-24',
    category: 'Biotech AI',
    readTime: '7 min read',
    image: '/api/placeholder/400/250',
    trending: true,
    tags: ['DeepMind', 'AlphaFold', 'Protein', 'Biotech']
  },
  {
    id: 3,
    title: 'Anthropic Claude 3.5 Sonnet Achieves New Benchmarks in AI Safety',
    excerpt: 'Latest model demonstrates improved constitutional AI training, reducing harmful outputs while maintaining helpfulness.',
    date: '2025-01-23',
    category: 'AI Safety',
    readTime: '6 min read',
    image: '/api/placeholder/400/250',
    trending: false,
    tags: ['Claude', 'Safety', 'Constitutional AI', 'Anthropic']
  },
  {
    id: 4,
    title: 'Microsoft Copilot Studio Enables Custom AI Agents for Enterprises',
    excerpt: 'New platform allows businesses to create specialized AI assistants for internal processes and customer interactions.',
    date: '2025-01-22',
    category: 'Enterprise AI',
    readTime: '4 min read',
    image: '/api/placeholder/400/250',
    trending: false,
    tags: ['Microsoft', 'Copilot', 'Enterprise', 'AI Agents']
  },
  {
    id: 5,
    title: 'Meta AI Research Breakthrough in Multimodal Understanding',
    excerpt: 'New architecture enables seamless processing of text, images, and audio in a unified model framework.',
    date: '2025-01-21',
    category: 'Research',
    readTime: '8 min read',
    image: '/api/placeholder/400/250',
    trending: true,
    tags: ['Meta', 'Multimodal', 'Research', 'AI Architecture']
  },
  {
    id: 6,
    title: 'Tesla FSD v12.3 Shows Significant Improvement in Urban Driving',
    excerpt: 'Latest full self-driving update demonstrates enhanced decision-making in complex traffic scenarios.',
    date: '2025-01-20',
    category: 'Autonomous Vehicles',
    readTime: '5 min read',
    image: '/api/placeholder/400/250',
    trending: false,
    tags: ['Tesla', 'FSD', 'Autonomous', 'Driving']
  }
]

const categories = ['All', 'AI Models', 'Biotech AI', 'AI Safety', 'Enterprise AI', 'Research', 'Autonomous Vehicles']

export default function AINewsPage() {
  const trendingNews = aiNews.filter(news => news.trending)
  const allNews = aiNews

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingNews.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <Image
                    src={news.image}
                    alt={news.title}
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
                      {news.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {news.date}
                    </div>
                    <span>{news.readTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.map((tag) => (
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
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {news.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {news.date}
                    </div>
                    <span>{news.readTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.map((tag) => (
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
