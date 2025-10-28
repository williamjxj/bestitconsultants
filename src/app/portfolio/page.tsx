'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  Building2,
  Landmark,
  Database,
  Globe,
  ShoppingCart,
  Truck,
  Diamond,
  Zap,
  Car,
  Laptop,
  Plane,
  CreditCard,
} from 'lucide-react'
import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PortfolioHero } from '@/components/ui/hero-variants'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const portfolioItems = [
  {
    title: 'Xperi ML Data Pipelines',
    description:
      'Machine Learning Data Pipelines and Experiment Collection Manager for AI-related tasks. Developed using microservices architecture with React.js, Node.js, Python and Java. Optimized GPU/CPU performance in Kubernetes environments with Kubeflow, CUDA, and MLOps workflows.',
    icon: Brain,
    category: 'ai',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
    tech: [
      'React.js',
      'Node.js',
      'Python',
      'Java',
      'Kubernetes',
      'MLOps',
      'CUDA',
      'Kubeflow',
    ],
    client: 'Xperi Corporation',
    year: '2021-Present',
    achievements: [
      'GPU/CPU Optimization',
      'MLOps Workflows',
      'Kubernetes Scaling',
    ],
  },
  {
    title: 'Credit Suisse Real-Time Trading Platform',
    description:
      'Real-time stock integration system with existing datasets via various pipelines and microservices. Built with React/Node.js, WebSockets, MongoDB, and Python for high-frequency trading operations.',
    icon: CreditCard,
    category: 'fintech',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
    tech: [
      'React',
      'Node.js',
      'WebSockets',
      'MongoDB',
      'Python',
      'Microservices',
    ],
    client: 'Credit Suisse (via EPAM)',
    year: '2018-2020',
    achievements: [
      'Real-time Processing',
      'High-frequency Trading',
      'Microservices Architecture',
    ],
  },
  {
    title: 'HSBC Banking Onboarding Services',
    description:
      'Retail Business Banking onboarding services for small and medium customers. Built with React, Redux, Java Spring Boot microservices, Node.js + MongoDB, and mobile apps for SME banking.',
    icon: Landmark,
    category: 'fintech',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
    tech: [
      'React',
      'Redux',
      'Java Spring Boot',
      'Node.js',
      'MongoDB',
      'Mobile Apps',
    ],
    client: 'HSBC Bank (via China Soft)',
    year: '2017-2018',
    achievements: [
      'SME Banking Platform',
      'Mobile Integration',
      'Microservices',
    ],
  },
  {
    title: 'HSBC Transformers ETL Platform',
    description:
      'Semi-ETL self-service platform supporting file extraction, data processing, and reporting. Features PDF processing, XML parsing, file management, and citizen-developer workflow creation with drag-and-drop interface.',
    icon: Database,
    category: 'enterprise',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg',
    tech: [
      'WPF',
      'MongoDB',
      'Angular',
      'Microservices',
      'ETL',
      'PDF Processing',
    ],
    client: 'HSBC Global Market Services',
    year: '2020-Present',
    achievements: [
      'Self-Service ETL',
      'PDF Data Extraction',
      'Workflow Automation',
    ],
  },
  {
    title: 'WebMD Advertisement Platform',
    description:
      'Web-based advertisement delivery system using JavaScript, HTML5/CSS3, Google DFP, Node.js, and jQuery. Integrated with Google DFP, Adobe tools, and Media.net header-bidding to significantly improve revenue.',
    icon: Globe,
    category: 'web',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2227310361-612x612.webp',
    tech: [
      'JavaScript',
      'HTML5/CSS3',
      'Node.js',
      'Google DFP',
      'jQuery',
      'MongoDB',
    ],
    client: 'WebMD New York',
    year: '2014-2017',
    achievements: [
      'Big Data Pipelines',
      'Revenue Optimization',
      'Real-time Processing',
    ],
  },
  {
    title: 'BestBuy Canada E-commerce',
    description:
      'E-commerce platform improvements including product gallery updates, multi-video features, 360 rotate, desktop/tablet/mobile optimization, warranties, and shopping cart enhancements.',
    icon: ShoppingCart,
    category: 'ecommerce',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1145868161-612x612.webp',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'E-commerce'],
    client: 'BestBuy Canada',
    year: '2007-2014',
    achievements: [
      'Multi-video Gallery',
      '360° Product View',
      'Multi-platform Support',
    ],
  },
  {
    title: 'FedEx Global Inventory System (APEC Award Winner)',
    description:
      'FedEx GIVS (Global Inventory Visibility System) and EC-IV system. Includes Global Clearance System for Australia, South Korea, and China. Wireless application for mobile tracking awarded APEC 2002 accolade.',
    icon: Truck,
    category: 'enterprise',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2163952011-612x612.webp',
    tech: [
      'Java',
      'C/C++',
      'Oracle',
      'TCP/IP',
      'Wireless Apps',
      'Global Systems',
    ],
    client: 'FedEx Singapore',
    year: '2000-2004',
    achievements: [
      'APEC 2002 Award',
      'Global System Integration',
      'Wireless Innovation',
    ],
  },
  {
    title: 'Tiffany Global E-Commerce Platform',
    description:
      'World Of Tiffany (WOT) CMS and frontend system, global site maintenance, Compass Case management system, and EOM order management. Served multiple international markets including US, CA, AU, BE, MX.',
    icon: Diamond,
    category: 'ecommerce',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-492514758-612x612.webp',
    tech: [
      '.NET MVC',
      'WebAPI',
      'WCF',
      'jQuery',
      'Kendo UI',
      'SQL Server',
      'SSRS',
    ],
    client: 'Tiffany & Co (via IBM)',
    year: '2012-2016',
    achievements: [
      'Global Platform',
      'Multi-country Deployment',
      'Case Management',
    ],
  },
  {
    title: 'Netherlands Government Energy Systems',
    description:
      'Gas energy integration systems for Gate & TAQA companies. Microsoft BizTalk integration solution for 20+ servers managing 100+ daily message types, improving processing from 2 hours to under 1 minute.',
    icon: Zap,
    category: 'enterprise',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_2.png',
    tech: ['BizTalk', 'Oracle', 'SQL Server', 'Web Services', 'JBoss', 'Linux'],
    client: 'Netherlands Government (via IBM)',
    year: '2011-2012',
    achievements: [
      '99% Performance Improvement',
      '24/7 Operations',
      'Government Compliance',
    ],
  },
  {
    title: 'GM Asset & Business Management',
    description:
      'GM ABM applications supporting Assets, Datamart, Global Lease management, and Product Order systems. PSP/TSP implementation with team leadership and professional development programs.',
    icon: Car,
    category: 'enterprise',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
    tech: ['VB.NET', 'ASP.NET', 'SQL Server', 'SSIS', 'DTS', 'Agent Jobs'],
    client: 'General Motors (via HP)',
    year: '2008-2011',
    achievements: [
      'Asset Management',
      'Global Lease System',
      'Team Excellence Awards',
    ],
  },
  {
    title: 'Huawei MateBook Assistant',
    description:
      'Desktop application for MateBook devices with localization for 54 languages and 100+ countries. Includes user guides, driver updates, PSI functionality, and MateTrans file sharing between devices.',
    icon: Laptop,
    category: 'desktop',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
    tech: ['WPF', 'UWP', 'MVVM', 'Localization', 'COM', 'Multi-language'],
    client: 'Huawei (via iSoftstone)',
    year: '2016-2018',
    achievements: [
      '54 Languages Support',
      '100+ Countries',
      'Delivery Star Award',
    ],
  },
  {
    title: 'Aerospace Engineering Knowledge System',
    description:
      'Enterprise Knowledge Portal (EKP) system with resource navigation, expert networks, and aerospace industry data analytics. Provides intelligence, technical documentation, and global aerospace industry insights.',
    icon: Plane,
    category: 'enterprise',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg',
    tech: [
      'EKP Systems',
      'Knowledge Management',
      'Data Analytics',
      'Expert Networks',
    ],
    client: 'Aerospace Engineering (via Chengdu Partner)',
    year: '2020-Present',
    achievements: [
      'Knowledge Management',
      'Expert Networks',
      'Industry Analytics',
    ],
  },
  {
    title: 'Supply Chain Finance Platform',
    description:
      'Risk management and electronic signature platform for supply chain financing. Features multi-level approval, contract management, loan processing, and real-time monitoring with mobile integration.',
    icon: Building2,
    category: 'fintech',
    image:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2227310361-612x612.webp',
    tech: [
      'Java',
      '.NET',
      'Mobile Apps',
      'Electronic Signatures',
      'Risk Management',
    ],
    client: 'Financial Services (via Chengdu Partner)',
    year: '2019-Present',
    achievements: [
      'Risk Management',
      'Electronic Signatures',
      'Mobile Integration',
    ],
  },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'fintech', label: 'Financial Services' },
    { id: 'enterprise', label: 'Enterprise Systems' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'web', label: 'Web Applications' },
    { id: 'desktop', label: 'Desktop Applications' },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter(project => project.category === selectedCategory)

  return (
    <div>
      <PortfolioHero
        title='Our Portfolio'
        subtitle='Success Stories from Fortune 500 Clients'
        description='Explore our portfolio of successful projects for global clients including Xperi, HSBC, Credit Suisse, and more. See how we have helped businesses transform with cutting-edge technology.'
        ctaText='View Case Studies'
        ctaLink='/case-studies'
        secondaryCtaText='Start Your Project'
        secondaryCtaLink='/contact'
        badge='Fortune 500 Proven Results'
      />
      <div className='min-h-screen py-20'>
        <div className='container mx-auto px-4'>
          {/* Filter Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className='mb-12'
          >
            <TabsList className='grid w-full grid-cols-7 lg:w-fit lg:mx-auto'>
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className='px-4 text-xs lg:text-sm'
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className='group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden'>
                  <div className='aspect-video relative overflow-hidden'>
                    <OptimizedImage
                      src={project.image || '/placeholder.svg'}
                      alt={`${project.title} - ${project.client} project showcase`}
                      width={400}
                      height={225}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                    <div className='absolute bottom-4 left-4 text-white'>
                      <Badge variant='secondary' className='mb-2'>
                        {project.client}
                      </Badge>
                      <p className='text-sm font-medium'>{project.year}</p>
                    </div>
                    <div className='absolute top-4 right-4'>
                      <project.icon size={32} className='text-white/80' />
                    </div>
                  </div>

                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-xl mb-2'>
                          {project.title}
                        </CardTitle>
                        <CardDescription className='text-gray-600'>
                          {project.description}
                        </CardDescription>
                      </div>
                      <Badge variant='secondary' className='ml-2'>
                        {
                          categories.find(cat => cat.id === project.category)
                            ?.label
                        }
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex flex-wrap gap-2'>
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant='outline'
                            className='text-xs'
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {project.achievements && (
                        <div>
                          <h4 className='text-sm font-medium text-gray-700 mb-2'>
                            Key Achievements:
                          </h4>
                          <ul className='text-sm space-y-1'>
                            {project.achievements
                              .slice(0, 3)
                              .map((achievement, achievementIndex) => (
                                <li
                                  key={achievementIndex}
                                  className='flex items-start'
                                >
                                  <span className='text-green-500 mr-2 text-xs'>
                                    ✓
                                  </span>
                                  {achievement}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Success Stories Section */}
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Our Track Record
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>60+</div>
                <div className='text-lg font-medium mb-2'>
                  Years Combined Experience
                </div>
                <div className='text-gray-600 text-sm'>
                  Across all team members
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  Fortune 500
                </div>
                <div className='text-lg font-medium mb-2'>
                  Enterprise Clients
                </div>
                <div className='text-gray-600 text-sm'>
                  Including Xperi, HSBC, Credit Suisse
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>12+</div>
                <div className='text-lg font-medium mb-2'>
                  Major Projects Delivered
                </div>
                <div className='text-gray-600 text-sm'>
                  Across multiple industries
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  Global
                </div>
                <div className='text-lg font-medium mb-2'>
                  Reach & Experience
                </div>
                <div className='text-gray-600 text-sm'>
                  US, Canada, China, Singapore, Europe
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white'>
            <h2 className='text-3xl font-bold mb-4'>
              Ready to Start Your Next Project?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Let's discuss how our proven expertise can help drive your
              business forward.
            </p>
            <div className='space-x-4'>
              <Button size='lg' variant='secondary'>
                Start Your Project
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-white border-white hover:bg-white hover:text-blue-600'
              >
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
