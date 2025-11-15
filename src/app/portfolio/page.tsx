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
  LayoutGrid,
  List,
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
import { FullWidthHeroWrapper } from '@/components/ui/full-width-hero-wrapper'
import { PortfolioHero } from '@/components/ui/hero-variants'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/contexts/LanguageContext'
import { getR2ImageUrl } from '@/lib/utils'

const portfolioItems = [
  {
    title: 'Xperi ML Data Pipelines',
    description:
      'Machine Learning Data Pipelines and Experiment Collection Manager for AI-related tasks. Developed using microservices architecture with React.js, Node.js, Python and Java. Optimized GPU/CPU performance in Kubernetes environments with Kubeflow, CUDA, and MLOps workflows.',
    icon: Brain,
    category: 'ai',
    images: [getR2ImageUrl('optimized/g-8.webp'), getR2ImageUrl('optimized/g-34.webp'), getR2ImageUrl('optimized/g-45.webp')],
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
    images: [getR2ImageUrl('optimized/g-5.webp'), getR2ImageUrl('optimized/g-18.webp')],
    tech: [
      'React',
      'Node.js',
      'WebSockets',
      'MongoDB',
      'Python',
      'Microservices',
    ],
    client: 'Credit Suisse (via EPAM)',
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
    images: [getR2ImageUrl('optimized/g-4.webp'), getR2ImageUrl('optimized/g-11.webp')],
    tech: [
      'React',
      'Redux',
      'Java Spring Boot',
      'Node.js',
      'MongoDB',
      'Mobile Apps',
    ],
    client: 'HSBC Bank (via China Soft)',
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
    images: [getR2ImageUrl('optimized/g-9.webp'), getR2ImageUrl('optimized/g-14.webp')],
    tech: [
      'WPF',
      'MongoDB',
      'Angular',
      'Microservices',
      'ETL',
      'PDF Processing',
    ],
    client: 'HSBC Global Market Services',
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
    images: [getR2ImageUrl('optimized/g-1.webp'), getR2ImageUrl('optimized/g-2.webp')],
    tech: [
      'JavaScript',
      'HTML5/CSS3',
      'Node.js',
      'Google DFP',
      'jQuery',
      'MongoDB',
    ],
    client: 'WebMD New York',
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
    images: [getR2ImageUrl('optimized/g-6.webp'), getR2ImageUrl('optimized/g-17.webp')],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'E-commerce'],
    client: 'BestBuy Canada',
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
    images: [getR2ImageUrl('optimized/g-50.webp'), getR2ImageUrl('optimized/g-47.webp'), getR2ImageUrl('optimized/g-31.webp')],
    tech: [
      'Java',
      'C/C++',
      'Oracle',
      'TCP/IP',
      'Wireless Apps',
      'Global Systems',
    ],
    client: 'FedEx Singapore',
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
    images: [getR2ImageUrl('optimized/g-35.webp'), getR2ImageUrl('optimized/g-36.webp')],
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
    images: [getR2ImageUrl('optimized/g-49.webp'), getR2ImageUrl('optimized/g-45.webp')],
    tech: ['BizTalk', 'Oracle', 'SQL Server', 'Web Services', 'JBoss', 'Linux'],
    client: 'Netherlands Government (via IBM)',
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
    images: [getR2ImageUrl('optimized/g-48.webp'), getR2ImageUrl('optimized/g-32.webp'), getR2ImageUrl('optimized/g-33.webp')],
    tech: ['VB.NET', 'ASP.NET', 'SQL Server', 'SSIS', 'DTS', 'Agent Jobs'],
    client: 'General Motors (via HP)',
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
    images: [getR2ImageUrl('optimized/g-39.webp'), getR2ImageUrl('optimized/g-40.webp')],
    tech: ['WPF', 'UWP', 'MVVM', 'Localization', 'COM', 'Multi-language'],
    client: 'Huawei (via iSoftstone)',
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
    images: [getR2ImageUrl('optimized/g-43.webp'), getR2ImageUrl('optimized/g-44.webp')],
    tech: [
      'EKP Systems',
      'Knowledge Management',
      'Data Analytics',
      'Expert Networks',
    ],
    client: 'Aerospace Engineering (via Chengdu Partner)',
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
    images: [getR2ImageUrl('optimized/g-30.webp'), getR2ImageUrl('optimized/g-29.webp')],
    tech: [
      'Java',
      '.NET',
      'Mobile Apps',
      'Electronic Signatures',
      'Risk Management',
    ],
    client: 'Financial Services (via Chengdu Partner)',
    achievements: [
      'Risk Management',
      'Electronic Signatures',
      'Mobile Integration',
    ],
  },
]

export default function PortfolioPage() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Portfolio content with translations
  const portfolioContent = {
    en: {
      hero: {
        title: 'Our Portfolio',
        subtitle: 'Success Stories from Fortune 500 Clients',
        description:
          'Explore our portfolio of successful projects for global clients including Xperi, HSBC, Credit Suisse, and more. See how we have helped businesses transform with cutting-edge technology.',
        ctaText: 'View Case Studies',
        secondaryCtaText: 'Start Your Project',
        badge: 'Fortune 500 Proven Results',
      },
      categories: [
        { id: 'all', label: 'All Projects' },
        { id: 'ai', label: 'AI & ML' },
        { id: 'fintech', label: 'Financial Services' },
        { id: 'enterprise', label: 'Enterprise Systems' },
        { id: 'ecommerce', label: 'E-commerce' },
        { id: 'web', label: 'Web Applications' },
        { id: 'desktop', label: 'Desktop Applications' },
      ],
      trackRecord: {
        title: 'Our Track Record',
        stats: {
          experience: 'Years Combined Experience',
          experienceDesc: 'Across all team members',
          clients: 'Enterprise Clients',
          clientsDesc: 'Including Xperi, HSBC, Credit Suisse',
          projects: 'Major Projects Delivered',
          projectsDesc: 'Across multiple industries',
          reach: 'Reach & Experience',
          reachDesc: 'US, Canada, China, Singapore, Europe',
        },
      },
      cta: {
        title: 'Ready to Start Your Next Project?',
        description:
          "Let's discuss how our proven expertise can help drive your business forward.",
        primary: 'Start Your Project',
        secondary: 'View All Projects',
      },
      labels: {
        keyAchievements: 'Key Achievements:',
      },
    },
    fr: {
      hero: {
        title: 'Notre Portefeuille',
        subtitle: 'Histoires de Réussite de Clients Fortune 500',
        description:
          'Explorez notre portefeuille de projets réussis pour des clients mondiaux, notamment Xperi, HSBC, Credit Suisse et plus encore. Découvrez comment nous avons aidé les entreprises à se transformer avec une technologie de pointe.',
        ctaText: 'Voir les Études de Cas',
        secondaryCtaText: 'Démarrer Votre Projet',
        badge: 'Résultats Éprouvés Fortune 500',
      },
      categories: [
        { id: 'all', label: 'Tous les Projets' },
        { id: 'ai', label: 'IA & ML' },
        { id: 'fintech', label: 'Services Financiers' },
        { id: 'enterprise', label: "Systèmes d'Entreprise" },
        { id: 'ecommerce', label: 'E-commerce' },
        { id: 'web', label: 'Applications Web' },
        { id: 'desktop', label: 'Applications Desktop' },
      ],
      trackRecord: {
        title: 'Notre Historique',
        stats: {
          experience: "Années d'Expérience Combinées",
          experienceDesc: "Parmi tous les membres de l'équipe",
          clients: "Clients d'Entreprise",
          clientsDesc: 'Incluant Xperi, HSBC, Credit Suisse',
          projects: 'Projets Majeurs Livrés',
          projectsDesc: 'Dans plusieurs industries',
          reach: 'Portée et Expérience',
          reachDesc: 'États-Unis, Canada, Chine, Singapour, Europe',
        },
      },
      cta: {
        title: 'Prêt à Démarrer Votre Prochain Projet?',
        description:
          'Discutons de la façon dont notre expertise éprouvée peut aider à faire progresser votre entreprise.',
        primary: 'Démarrer Votre Projet',
        secondary: 'Voir Tous les Projets',
      },
      labels: {
        keyAchievements: 'Réalisations Clés:',
      },
    },
    es: {
      hero: {
        title: 'Nuestro Portafolio',
        subtitle: 'Historias de Éxito de Clientes Fortune 500',
        description:
          'Explore nuestro portafolio de proyectos exitosos para clientes globales, incluyendo Xperi, HSBC, Credit Suisse y más. Vea cómo hemos ayudado a las empresas a transformarse con tecnología de vanguardia.',
        ctaText: 'Ver Casos de Estudio',
        secondaryCtaText: 'Iniciar Su Proyecto',
        badge: 'Resultados Probados Fortune 500',
      },
      categories: [
        { id: 'all', label: 'Todos los Proyectos' },
        { id: 'ai', label: 'IA y ML' },
        { id: 'fintech', label: 'Servicios Financieros' },
        { id: 'enterprise', label: 'Sistemas Empresariales' },
        { id: 'ecommerce', label: 'E-commerce' },
        { id: 'web', label: 'Aplicaciones Web' },
        { id: 'desktop', label: 'Aplicaciones de Escritorio' },
      ],
      trackRecord: {
        title: 'Nuestro Historial',
        stats: {
          experience: 'Años de Experiencia Combinada',
          experienceDesc: 'Entre todos los miembros del equipo',
          clients: 'Clientes Empresariales',
          clientsDesc: 'Incluyendo Xperi, HSBC, Credit Suisse',
          projects: 'Proyectos Principales Entregados',
          projectsDesc: 'En múltiples industrias',
          reach: 'Alcance y Experiencia',
          reachDesc: 'EE.UU., Canadá, China, Singapur, Europa',
        },
      },
      cta: {
        title: '¿Listo para Iniciar Su Próximo Proyecto?',
        description:
          'Hablemos de cómo nuestra experiencia probada puede ayudar a impulsar su negocio.',
        primary: 'Iniciar Su Proyecto',
        secondary: 'Ver Todos los Proyectos',
      },
      labels: {
        keyAchievements: 'Logros Clave:',
      },
    },
    cn: {
      hero: {
        title: '我们的作品集',
        subtitle: '财富500强客户成功案例',
        description:
          '探索我们为全球客户（包括Xperi、HSBC、Credit Suisse等）成功完成的项目组合。了解我们如何帮助企业在尖端技术的推动下实现转型。',
        ctaText: '查看案例研究',
        secondaryCtaText: '开始您的项目',
        badge: '财富500强验证的结果',
      },
      categories: [
        { id: 'all', label: '所有项目' },
        { id: 'ai', label: '人工智能与机器学习' },
        { id: 'fintech', label: '金融服务' },
        { id: 'enterprise', label: '企业系统' },
        { id: 'ecommerce', label: '电子商务' },
        { id: 'web', label: 'Web应用' },
        { id: 'desktop', label: '桌面应用' },
      ],
      trackRecord: {
        title: '我们的业绩记录',
        stats: {
          experience: '年综合经验',
          experienceDesc: '所有团队成员',
          clients: '企业客户',
          clientsDesc: '包括Xperi、HSBC、Credit Suisse',
          projects: '已交付的主要项目',
          projectsDesc: '跨多个行业',
          reach: '覆盖范围和经验',
          reachDesc: '美国、加拿大、中国、新加坡、欧洲',
        },
      },
      cta: {
        title: '准备开始您的下一个项目了吗？',
        description:
          '让我们讨论一下我们经过验证的专业知识如何帮助推动您的业务发展。',
        primary: '开始您的项目',
        secondary: '查看所有项目',
      },
      labels: {
        keyAchievements: '主要成就：',
      },
    },
  }

  const currentContent =
    portfolioContent[language as keyof typeof portfolioContent] ||
    portfolioContent.en

  const categories = currentContent.categories

  const filteredProjects =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter(project => project.category === selectedCategory)

  return (
    <div>
      <FullWidthHeroWrapper>
        <PortfolioHero
          title={currentContent.hero.title}
          subtitle={currentContent.hero.subtitle}
          description={currentContent.hero.description}
          ctaText={currentContent.hero.ctaText}
          ctaLink='/case-studies'
          secondaryCtaText={currentContent.hero.secondaryCtaText}
          secondaryCtaLink='/contact-us?title=Get a Quote#contact-form'
          badge={currentContent.hero.badge}
          background='image'
          backgroundImage={getR2ImageUrl('optimized/hs-2.webp')}
          overlay={false}
          imageBrightness={0.8}
          imageContrast={1.1}
          imagePosition='center center'
          enableParallax={true}
        />
      </FullWidthHeroWrapper>
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

          {/* View Toggle */}
          <div className='flex justify-end mb-6'>
            <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label='Grid view'
                title='Grid view'
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label='List view'
                title='List view'
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'
                : 'flex flex-col gap-6 mb-16'
            }
          >
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  <Card
                    className={`group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === 'list'
                          ? 'w-64 h-48 flex-shrink-0'
                          : 'aspect-video'
                      }`}
                    >
                      <ImageCarousel
                        images={project.images}
                        alt={`${project.title} - ${project.client} project showcase`}
                        className='w-full h-full'
                        aspectRatio={viewMode === 'list' ? 'auto' : 'video'}
                        autoPlay={false}
                        showIndicators={project.images.length > 1}
                        showNavigation={project.images.length > 1}
                      />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none' />
                    <div className='absolute bottom-4 left-4 text-white z-10'>
                      <Badge variant='secondary'>
                        {project.client}
                      </Badge>
                    </div>
                    <div className='absolute top-4 right-4 z-10'>
                      <project.icon size={32} className='text-white/80' />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={`flex-1 flex flex-col ${viewMode === 'list' ? 'min-w-0' : ''}`}>
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
                            {currentContent.labels.keyAchievements}
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
                  </div>
                </Card>
              </motion.div>
              )
            })}
          </div>

          {/* Success Stories Section */}
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              {currentContent.trackRecord.title}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>20+</div>
                <div className='text-lg font-medium mb-2'>
                  {currentContent.trackRecord.stats.experience}
                </div>
                <div className='text-gray-600 text-sm'>
                  {currentContent.trackRecord.stats.experienceDesc}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  Fortune 500
                </div>
                <div className='text-lg font-medium mb-2'>
                  {currentContent.trackRecord.stats.clients}
                </div>
                <div className='text-gray-600 text-sm'>
                  {currentContent.trackRecord.stats.clientsDesc}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>12+</div>
                <div className='text-lg font-medium mb-2'>
                  {currentContent.trackRecord.stats.projects}
                </div>
                <div className='text-gray-600 text-sm'>
                  {currentContent.trackRecord.stats.projectsDesc}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  Global
                </div>
                <div className='text-lg font-medium mb-2'>
                  {currentContent.trackRecord.stats.reach}
                </div>
                <div className='text-gray-600 text-sm'>
                  {currentContent.trackRecord.stats.reachDesc}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white'>
            <h2 className='text-3xl font-bold mb-4'>
              {currentContent.cta.title}
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              {currentContent.cta.description}
            </p>
            <div className='space-x-4'>
              <Button size='lg' variant='secondary'>
                {currentContent.cta.primary}
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-white border-white hover:bg-white hover:text-blue-600'
              >
                {currentContent.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
