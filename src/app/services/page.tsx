'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Brain,
  Building2,
  Cog,
  Cloud,
  Smartphone,
  Database,
  Landmark,
  Heart,
  ShoppingCart,
  GraduationCap,
  Factory,
  Car,
  Hotel,
  Cpu,
  // Sparkles,
  // Zap,
  Shield,
  // Rocket,
  // Target,
} from 'lucide-react'
import React from 'react'

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
import { ServicesHero } from '@/components/ui/hero-variants'
import { useLanguage } from '@/contexts/LanguageContext'

// Icon mapping for industries
const industryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Landmark,
  Heart,
  ShoppingCart,
  GraduationCap,
  Factory,
  Car,
  Hotel,
  Cpu,
}

const ServicesPage = () => {
  const { language, translations } = useLanguage()

  // Services content with translations
  const servicesContent = {
    en: {
      hero: {
        title: 'Our Services',
        subtitle: 'Enterprise-Grade Solutions',
        description:
          'Transform your business with our comprehensive suite of enterprise-grade solutions. From AI/ML to cloud infrastructure, we deliver the technology expertise your business needs to succeed.',
        ctaText: 'Get Started',
        secondaryCtaText: 'View Case Studies',
        badge: 'Fortune 500 Proven Solutions',
      },
      services: [
        {
          title: 'AI & Machine Learning Solutions',
          description:
            'Enterprise-grade AI/ML solutions with proven track record. From ML Data Pipelines at Xperi to real-time trading systems, we deliver production-ready AI solutions with MLOps, Kubernetes optimization, and modern AI tool integration.',
          features: [
            'ML Data Pipelines & MLOps (Kubeflow, CUDA, Airflow)',
            'GPU/CPU Optimization in Kubernetes',
            'AI Tool Integration (ChatGPT, Claude, LangChain)',
            'Real-time Data Processing & Analytics',
            'Model Training & Deployment Automation',
          ],
        },
        {
          title: 'Enterprise Software Development',
          description:
            'Full-stack enterprise applications with Fortune 500 experience. From HSBC banking platforms to Credit Suisse trading systems, we build scalable, secure enterprise solutions using modern architectures.',
          features: [
            'React.js, Node.js, Python Full-Stack Development',
            '.NET Core, Java Spring Boot Enterprise Apps',
            'Microservices Architecture & GraphQL APIs',
            'Real-time Systems (WebSockets, Trading Platforms)',
            'Banking & Financial Services Compliance',
          ],
        },
        {
          title: 'System Integration & Automation',
          description:
            'Expert system integration and business process automation. From Netherlands Government energy systems to enterprise ETL platforms, we connect complex systems and automate critical business processes.',
          features: [
            'RPA Solutions (UiPath, BluePrism, WorkFusion)',
            'ETL Platforms & Data Integration',
            'BizTalk & Enterprise Service Bus',
            'API Integration & Legacy Modernization',
            'Government & Enterprise System Integration',
          ],
        },
        {
          title: 'Cloud & DevOps Solutions',
          description:
            'Complete cloud transformation and DevOps implementation. With experience at major cloud providers and container orchestration, we deliver scalable, reliable cloud solutions for enterprise workloads.',
          features: [
            'Kubernetes & Docker Container Orchestration',
            'AWS, Azure, Google Cloud Migration',
            'CI/CD Pipeline Implementation (Jenkins, TeamCity)',
            'Infrastructure as Code & Automation',
            'Monitoring & Observability (Prometheus, ElasticSearch)',
          ],
        },
        {
          title: 'Mobile & Cross-Platform Development',
          description:
            'Native and cross-platform mobile solutions from concept to deployment. With experience in enterprise mobile apps for major corporations, we deliver high-performance mobile applications.',
          features: [
            'iOS Native Development (Swift, Objective-C)',
            'Android Native Development (Java, Kotlin)',
            'React Native Cross-Platform Solutions',
            'Enterprise Mobile App Architecture',
            'App Store & Play Store Deployment',
          ],
        },
        {
          title: 'OA & Enterprise Management Systems',
          description:
            'Specialized enterprise management solutions including OA systems, ERP, engineering cost management, and government project implementations. Proven success with major Chinese enterprises and government agencies.',
          features: [
            'OA Systems (Task, Project, Asset Management)',
            'Engineering Cost Management Systems',
            'ERP, MES, EKP Enterprise Solutions',
            'Government & Military Project Systems',
            'Supply Chain Finance Platforms',
          ],
        },
        {
          id: 'security',
          title: 'Cybersecurity',
          description:
            'Comprehensive security solutions to protect your digital assets.',
          icon: <Shield className='h-8 w-8 text-white' />,
          features: [
            'Security Audits',
            'Penetration Testing',
            'Compliance Management',
            'Threat Detection & Response',
          ],
          color: 'from-red-500 to-pink-500',
          hoverGradient: 'from-red-50 to-pink-50',
          iconGradient: 'from-red-500 to-pink-500',
        },
      ],
    },
    fr: {
      hero: {
        title: 'Nos Services',
        subtitle: 'Solutions de Niveau Entreprise',
        description:
          "Transformez votre entreprise avec notre gamme complète de solutions de niveau entreprise. De l'IA/ML à l'infrastructure cloud, nous offrons l'expertise technologique dont votre entreprise a besoin pour réussir.",
        ctaText: 'Commencer',
        secondaryCtaText: 'Voir les Études de Cas',
        badge: 'Solutions Éprouvées Fortune 500',
      },
      services: [
        {
          title: 'Solutions IA et Apprentissage Automatique',
          description:
            'Solutions IA/ML de niveau entreprise avec un historique éprouvé. Des pipelines de données ML chez Xperi aux systèmes de trading en temps réel, nous livrons des solutions IA prêtes pour la production.',
          features: [
            'Pipelines de Données ML et MLOps',
            'Optimisation GPU/CPU dans Kubernetes',
            "Intégration d'Outils IA (ChatGPT, Claude, LangChain)",
            'Traitement et Analyse de Données en Temps Réel',
            'Automatisation de Formation et Déploiement de Modèles',
          ],
        },
        {
          title: "Développement de Logiciels d'Entreprise",
          description:
            "Applications d'entreprise full-stack avec expérience Fortune 500. Des plateformes bancaires HSBC aux systèmes de trading Credit Suisse.",
          features: [
            'Développement Full-Stack React.js, Node.js, Python',
            "Applications d'Entreprise .NET Core, Java Spring Boot",
            'Architecture Microservices et APIs GraphQL',
            'Systèmes en Temps Réel',
            'Conformité Services Bancaires et Financiers',
          ],
        },
        {
          title: 'Intégration et Automatisation de Systèmes',
          description:
            "Intégration de systèmes experte et automatisation des processus métier. Des systèmes énergétiques du gouvernement néerlandais aux plateformes ETL d'entreprise.",
          features: [
            'Solutions RPA (UiPath, BluePrism, WorkFusion)',
            'Plateformes ETL et Intégration de Données',
            'BizTalk et Enterprise Service Bus',
            'Intégration API et Modernisation Legacy',
            "Intégration de Systèmes Gouvernementaux et d'Entreprise",
          ],
        },
        {
          title: 'Solutions Cloud et DevOps',
          description:
            "Transformation cloud complète et implémentation DevOps. Avec une expérience chez les principaux fournisseurs cloud et l'orchestration de conteneurs.",
          features: [
            'Orchestration de Conteneurs Kubernetes et Docker',
            'Migration AWS, Azure, Google Cloud',
            'Implémentation de Pipelines CI/CD',
            'Infrastructure as Code et Automatisation',
            'Surveillance et Observabilité',
          ],
        },
        {
          title: 'Développement Mobile et Multi-Plateforme',
          description:
            "Solutions mobiles natives et multi-plateformes de la conception au déploiement. Avec une expérience dans les applications mobiles d'entreprise pour les grandes entreprises.",
          features: [
            'Développement iOS Natif',
            'Développement Android Natif',
            'Solutions Multi-Plateforme React Native',
            "Architecture d'Applications Mobiles d'Entreprise",
            'Déploiement App Store et Play Store',
          ],
        },
        {
          title: "Systèmes de Gestion d'Entreprise et OA",
          description:
            "Solutions de gestion d'entreprise spécialisées incluant les systèmes OA, ERP, gestion des coûts d'ingénierie, et implémentations de projets gouvernementaux.",
          features: [
            'Systèmes OA (Gestion de Tâches, Projets, Actifs)',
            "Systèmes de Gestion des Coûts d'Ingénierie",
            "Solutions d'Entreprise ERP, MES, EKP",
            'Systèmes de Projets Gouvernementaux et Militaires',
            "Plateformes de Financement de la Chaîne d'Approvisionnement",
          ],
        },
      ],
    },
    es: {
      hero: {
        title: 'Nuestros Servicios',
        subtitle: 'Soluciones de Nivel Empresarial',
        description:
          'Transforme su negocio con nuestra suite integral de soluciones de nivel empresarial. Desde IA/ML hasta infraestructura en la nube, ofrecemos la experiencia tecnológica que su negocio necesita para tener éxito.',
        ctaText: 'Comenzar',
        secondaryCtaText: 'Ver Casos de Estudio',
        badge: 'Soluciones Probadas Fortune 500',
      },
      services: [
        {
          title: 'Soluciones de IA y Aprendizaje Automático',
          description:
            'Soluciones IA/ML de nivel empresarial con historial probado. Desde pipelines de datos ML en Xperi hasta sistemas de trading en tiempo real.',
          features: [
            'Pipelines de Datos ML y MLOps',
            'Optimización GPU/CPU en Kubernetes',
            'Integración de Herramientas IA',
            'Procesamiento y Análisis de Datos en Tiempo Real',
            'Automatización de Entrenamiento e Implementación de Modelos',
          ],
        },
        {
          title: 'Desarrollo de Software Empresarial',
          description:
            'Aplicaciones empresariales full-stack con experiencia Fortune 500. Desde plataformas bancarias HSBC hasta sistemas de trading Credit Suisse.',
          features: [
            'Desarrollo Full-Stack React.js, Node.js, Python',
            'Aplicaciones Empresariales .NET Core, Java Spring Boot',
            'Arquitectura de Microservicios y APIs GraphQL',
            'Sistemas en Tiempo Real',
            'Cumplimiento de Servicios Bancarios y Financieros',
          ],
        },
        {
          title: 'Integración y Automatización de Sistemas',
          description:
            'Integración de sistemas experta y automatización de procesos de negocio. Desde sistemas energéticos del gobierno holandés hasta plataformas ETL empresariales.',
          features: [
            'Soluciones RPA',
            'Plataformas ETL e Integración de Datos',
            'BizTalk y Enterprise Service Bus',
            'Integración API y Modernización Legacy',
            'Integración de Sistemas Gubernamentales y Empresariales',
          ],
        },
        {
          title: 'Soluciones Cloud y DevOps',
          description:
            'Transformación cloud completa e implementación DevOps. Con experiencia en los principales proveedores cloud y orquestación de contenedores.',
          features: [
            'Orquestación de Contenedores Kubernetes y Docker',
            'Migración AWS, Azure, Google Cloud',
            'Implementación de Pipelines CI/CD',
            'Infraestructura as Code y Automatización',
            'Monitoreo y Observabilidad',
          ],
        },
        {
          title: 'Desarrollo Mobile y Multiplataforma',
          description:
            'Soluciones móviles nativas y multiplataforma desde el concepto hasta el despliegue. Con experiencia en aplicaciones móviles empresariales para grandes corporaciones.',
          features: [
            'Desarrollo iOS Nativo',
            'Desarrollo Android Nativo',
            'Soluciones Multiplataforma React Native',
            'Arquitectura de Aplicaciones Móviles Empresariales',
            'Despliegue en App Store y Play Store',
          ],
        },
        {
          title: 'Sistemas de Gestión Empresarial y OA',
          description:
            'Soluciones de gestión empresarial especializadas que incluyen sistemas OA, ERP, gestión de costos de ingeniería e implementaciones de proyectos gubernamentales.',
          features: [
            'Sistemas OA',
            'Sistemas de Gestión de Costos de Ingeniería',
            'Soluciones Empresariales ERP, MES, EKP',
            'Sistemas de Proyectos Gubernamentales y Militares',
            'Plataformas de Financiamiento de Cadena de Suministro',
          ],
        },
      ],
    },
    cn: {
      hero: {
        title: '我们的服务',
        subtitle: '企业级解决方案',
        description:
          '通过我们全面的企业级解决方案套件改变您的业务。从人工智能/机器学习到云基础设施，我们提供您的业务成功所需的技术专业知识。',
        ctaText: '开始',
        secondaryCtaText: '查看案例研究',
        badge: '财富500强验证的解决方案',
      },
      services: [
        {
          title: '人工智能与机器学习解决方案',
          description:
            '具有经过验证记录的企业级AI/ML解决方案。从Xperi的ML数据管道到实时交易系统，我们提供生产就绪的AI解决方案。',
          features: [
            'ML数据管道和MLOps',
            'Kubernetes中的GPU/CPU优化',
            'AI工具集成（ChatGPT、Claude、LangChain）',
            '实时数据处理与分析',
            '模型训练与部署自动化',
          ],
        },
        {
          title: '企业软件开发',
          description:
            '具有财富500强经验的全栈企业应用程序。从HSBC银行平台到Credit Suisse交易系统。',
          features: [
            'React.js、Node.js、Python全栈开发',
            '.NET Core、Java Spring Boot企业应用',
            '微服务架构和GraphQL API',
            '实时系统',
            '银行和金融服务合规',
          ],
        },
        {
          title: '系统集成与自动化',
          description:
            '专业的系统集成和业务流程自动化。从荷兰政府能源系统到企业ETL平台。',
          features: [
            'RPA解决方案',
            'ETL平台和数据集成',
            'BizTalk和企业服务总线',
            'API集成和遗留系统现代化',
            '政府和企业系统集成',
          ],
        },
        {
          title: '云与DevOps解决方案',
          description:
            '完整的云转型和DevOps实施。在主要云提供商和容器编排方面拥有经验。',
          features: [
            'Kubernetes和Docker容器编排',
            'AWS、Azure、Google Cloud迁移',
            'CI/CD管道实施',
            '基础设施即代码和自动化',
            '监控和可观测性',
          ],
        },
        {
          title: '移动和跨平台开发',
          description:
            '从概念到部署的原生和跨平台移动解决方案。在大型企业的企业移动应用方面拥有经验。',
          features: [
            'iOS原生开发',
            'Android原生开发',
            'React Native跨平台解决方案',
            '企业移动应用架构',
            'App Store和Play Store部署',
          ],
        },
        {
          title: 'OA与企业管理系统',
          description:
            '专业的企业管理解决方案，包括OA系统、ERP、工程成本管理和政府项目实施。',
          features: [
            'OA系统（任务、项目、资产管理）',
            '工程成本管理系统',
            'ERP、MES、EKP企业解决方案',
            '政府和军事项目系统',
            '供应链金融平台',
          ],
        },
      ],
    },
  }

  const currentContent =
    servicesContent[language as keyof typeof servicesContent] ||
    servicesContent.en

  const services = [
    {
      title: currentContent.services[0].title,
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      description: currentContent.services[0].description,
      features: currentContent.services[0].features,
    },
    {
      title: currentContent.services[1].title,
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      description: currentContent.services[1].description,
      features: currentContent.services[1].features,
    },
    {
      title: currentContent.services[2].title,
      icon: Cog,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      description: currentContent.services[2].description,
      features: currentContent.services[2].features,
    },
    {
      title: currentContent.services[3].title,
      icon: Cloud,
      gradient: 'from-sky-500 to-blue-500',
      bgGradient: 'from-sky-50 to-blue-50',
      description: currentContent.services[3].description,
      features: currentContent.services[3].features,
    },
    {
      title: currentContent.services[4].title,
      icon: Smartphone,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      description: currentContent.services[4].description,
      features: currentContent.services[4].features,
    },
    {
      title: currentContent.services[5].title,
      icon: Database,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      description: currentContent.services[5].description,
      features: currentContent.services[5].features,
    },
    ...(currentContent.services[6]
      ? [
          {
            title: currentContent.services[6].title,
            icon: Shield,
            gradient: 'from-red-500 to-pink-500',
            bgGradient: 'from-red-50 to-pink-50',
            description: currentContent.services[6].description,
            features: currentContent.services[6].features,
          },
        ]
      : []),
  ]

  return (
    <div>
      {/* Hero Section */}
      <FullWidthHeroWrapper>
        <ServicesHero
          title={currentContent.hero.title}
          subtitle={currentContent.hero.subtitle}
          description={currentContent.hero.description}
          ctaText={currentContent.hero.ctaText}
          ctaLink='/contact-us?title=Free Consultation#contact-form'
          secondaryCtaText={currentContent.hero.secondaryCtaText}
          secondaryCtaLink='/case-studies'
          badge={currentContent.hero.badge}
          background='image'
          backgroundImage='/optimized/hs-1.webp'
          overlay={false}
          imageBrightness={0.8}
          imageContrast={1.1}
          imagePosition='center center'
          enableParallax={true}
        />
      </FullWidthHeroWrapper>

      {/* Main Content */}
      <div className='min-h-screen py-20'>
        <div className='container mx-auto px-4'>
          {/* Services Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  className='group'
                >
                  <Card
                    className={`
                  h-full border-0 bg-white/80 backdrop-blur-sm
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500 ease-out
                  group-hover:scale-105
                  relative overflow-hidden
                  before:absolute before:inset-0
                  before:bg-gradient-to-br ${service.bgGradient}
                  before:opacity-0 before:transition-opacity before:duration-500
                  group-hover:before:opacity-100
                  before:z-0
                `}
                  >
                    <div className='relative z-10'>
                      <CardHeader className='pb-4'>
                        <div className='flex items-center mb-4'>
                          <motion.div
                            className={`
                            p-3 rounded-2xl bg-gradient-to-r ${service.gradient}
                            shadow-lg group-hover:shadow-xl
                            transition-all duration-300
                            group-hover:scale-110 group-hover:rotate-3
                          `}
                            whileHover={{
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.5 },
                            }}
                          >
                            <IconComponent className='w-8 h-8 text-white' />
                          </motion.div>
                          <div className='ml-4 flex-1'>
                            <CardTitle className='text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                              {service.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className='pt-0'>
                        <p className='text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                          {service.description}
                        </p>
                        <ul className='space-y-3'>
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              className='flex items-start'
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1 + featureIndex * 0.1 + 0.3,
                              }}
                              viewport={{ once: true }}
                            >
                              <motion.div
                                className='flex-shrink-0 mr-3 mt-0.5'
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className='w-5 h-5 text-green-500' />
                              </motion.div>
                              <span className='text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
                                {feature}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>

                    {/* Animated background elements */}
                    <div className='absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500'>
                      <motion.div
                        className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-full`}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Process Section */}
          <motion.div
            className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background elements */}
            <div className='absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-x-32 -translate-y-32 animate-float'></div>
            <div
              className='absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full translate-x-24 translate-y-24 animate-float'
              style={{ animationDelay: '2s' }}
            ></div>

            <motion.h2
              className='text-3xl font-bold text-center mb-12 relative z-10'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {language === 'en'
                ? 'Our Process'
                : language === 'fr'
                  ? 'Notre Processus'
                  : language === 'es'
                    ? 'Nuestro Proceso'
                    : '我们的流程'}
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10'>
              {(language === 'en'
                ? [
                    {
                      title: 'Discovery',
                      description: 'Understand your needs',
                    },
                    { title: 'Planning', description: 'Design the solution' },
                    {
                      title: 'Development',
                      description: 'Build with excellence',
                    },
                    { title: 'Deployment', description: 'Launch and support' },
                  ]
                : language === 'fr'
                  ? [
                      {
                        title: 'Découverte',
                        description: 'Comprendre vos besoins',
                      },
                      {
                        title: 'Planification',
                        description: 'Concevoir la solution',
                      },
                      {
                        title: 'Développement',
                        description: 'Construire avec excellence',
                      },
                      {
                        title: 'Déploiement',
                        description: 'Lancer et soutenir',
                      },
                    ]
                  : language === 'es'
                    ? [
                        {
                          title: 'Descubrimiento',
                          description: 'Entender sus necesidades',
                        },
                        {
                          title: 'Planificación',
                          description: 'Diseñar la solución',
                        },
                        {
                          title: 'Desarrollo',
                          description: 'Construir con excelencia',
                        },
                        { title: 'Despliegue', description: 'Lanzar y apoyar' },
                      ]
                    : [
                        { title: '发现', description: '了解您的需求' },
                        { title: '规划', description: '设计解决方案' },
                        { title: '开发', description: '卓越构建' },
                        { title: '部署', description: '启动和支持' },
                      ]
              ).map((step, index) => (
                <motion.div
                  key={index}
                  className='text-center group'
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300'
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                    animate={{
                      boxShadow: [
                        '0 4px 15px rgba(59, 130, 246, 0.3)',
                        '0 8px 25px rgba(147, 51, 234, 0.4)',
                        '0 4px 15px rgba(59, 130, 246, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className='text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300'>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className='text-3xl font-bold mb-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {language === 'en'
                ? 'Pricing Plans'
                : language === 'fr'
                  ? 'Plans Tarifaires'
                  : language === 'es'
                    ? 'Planes de Precios'
                    : '定价方案'}
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {(language === 'en'
                ? [
                    {
                      name: 'Starter',
                      price: '$5K+',
                      description: 'Perfect for small projects',
                      features: [
                        'Basic features',
                        'Email support',
                        '3 months support',
                      ],
                      popular: false,
                    },
                    {
                      name: 'Professional',
                      price: '$25K+',
                      description: 'Ideal for growing businesses',
                      features: [
                        'All features',
                        'Priority support',
                        '6 months support',
                      ],
                      popular: true,
                    },
                    {
                      name: 'Enterprise',
                      price: 'Custom',
                      description: 'Tailored for large organizations',
                      features: [
                        'Custom features',
                        '24/7 support',
                        '1 year support',
                      ],
                      popular: false,
                    },
                  ]
                : language === 'fr'
                  ? [
                      {
                        name: 'Démarrage',
                        price: '5K$+',
                        description: 'Parfait pour les petits projets',
                        features: [
                          'Fonctionnalités de base',
                          'Support par email',
                          '3 mois de support',
                        ],
                        popular: false,
                      },
                      {
                        name: 'Professionnel',
                        price: '25K$+',
                        description: 'Idéal pour les entreprises en croissance',
                        features: [
                          'Toutes les fonctionnalités',
                          'Support prioritaire',
                          '6 mois de support',
                        ],
                        popular: true,
                      },
                      {
                        name: 'Entreprise',
                        price: 'Sur mesure',
                        description: 'Adapté aux grandes organisations',
                        features: [
                          'Fonctionnalités personnalisées',
                          'Support 24/7',
                          '1 an de support',
                        ],
                        popular: false,
                      },
                    ]
                  : language === 'es'
                    ? [
                        {
                          name: 'Inicial',
                          price: '$5K+',
                          description: 'Perfecto para proyectos pequeños',
                          features: [
                            'Características básicas',
                            'Soporte por email',
                            '3 meses de soporte',
                          ],
                          popular: false,
                        },
                        {
                          name: 'Profesional',
                          price: '$25K+',
                          description: 'Ideal para negocios en crecimiento',
                          features: [
                            'Todas las características',
                            'Soporte prioritario',
                            '6 meses de soporte',
                          ],
                          popular: true,
                        },
                        {
                          name: 'Empresarial',
                          price: 'Personalizado',
                          description: 'Adaptado para grandes organizaciones',
                          features: [
                            'Características personalizadas',
                            'Soporte 24/7',
                            '1 año de soporte',
                          ],
                          popular: false,
                        },
                      ]
                    : [
                        {
                          name: '入门',
                          price: '5K$+',
                          description: '适合小型项目',
                          features: ['基本功能', '邮件支持', '3个月支持'],
                          popular: false,
                        },
                        {
                          name: '专业',
                          price: '25K$+',
                          description: '适合成长中的企业',
                          features: ['所有功能', '优先支持', '6个月支持'],
                          popular: true,
                        },
                        {
                          name: '企业',
                          price: '定制',
                          description: '适合大型组织',
                          features: ['定制功能', '24/7支持', '1年支持'],
                          popular: false,
                        },
                      ]
              ).map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className='group'
                >
                  <Card
                    className={`relative transition-all duration-500 ${
                      plan.popular
                        ? 'border-purple-500 border-2 shadow-2xl scale-105'
                        : 'shadow-lg hover:shadow-xl'
                    } group-hover:shadow-2xl`}
                  >
                    {plan.popular && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 animate-pulse-slow'>
                          {language === 'en'
                            ? 'Popular'
                            : language === 'fr'
                              ? 'Populaire'
                              : language === 'es'
                                ? 'Popular'
                                : '热门'}
                        </Badge>
                      </motion.div>
                    )}
                    <CardHeader className='text-center'>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardTitle className='text-2xl group-hover:text-purple-600 transition-colors duration-300'>
                          {plan.name}
                        </CardTitle>
                        <motion.div
                          className='text-3xl font-bold text-blue-600 my-4'
                          animate={
                            plan.popular
                              ? {
                                  scale: [1, 1.05, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {plan.price}
                        </motion.div>
                        <CardDescription className='group-hover:text-gray-700 transition-colors duration-300'>
                          {plan.description}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-3 mb-8'>
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className='flex items-start'
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.2 + featureIndex * 0.1 + 0.5,
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.span
                              className='text-green-500 mr-2'
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              ✓
                            </motion.span>
                            <span className='group-hover:text-gray-700 transition-colors duration-300'>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className={`w-full transition-all duration-300 ${
                            plan.popular
                              ? 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
                              : 'hover:shadow-lg'
                          }`}
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          {language === 'en'
                            ? 'Get Started'
                            : language === 'fr'
                              ? 'Commencer'
                              : language === 'es'
                                ? 'Comenzar'
                                : '开始'}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards & Recognition */}
          <motion.div
            className='mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className='text-3xl font-bold text-center mb-12'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {language === 'en'
                ? 'Awards & Recognition'
                : language === 'fr'
                  ? 'Prix et Reconnaissance'
                  : language === 'es'
                    ? 'Premios y Reconocimiento'
                    : '奖项与认可'}
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {translations.testimonials.awards.list.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className='text-center hover:shadow-lg transition-shadow border-0 bg-white/50 backdrop-blur-sm h-full'>
                    <CardContent className='p-6'>
                      <div className='text-4xl mb-4'>{award.icon}</div>
                      <h3 className='font-bold text-lg mb-2'>{award.title}</h3>
                      <p className='text-gray-600 text-sm mb-3'>
                        {award.organization}
                      </p>
                      <Badge variant='secondary' className='text-xs'>
                        {award.year}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industries Served */}
          <motion.div
            className='mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className='text-3xl font-bold text-center mb-12'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {language === 'en'
                ? 'Industries Served'
                : language === 'fr'
                  ? 'Industries Desservies'
                  : language === 'es'
                    ? 'Industrias Servidas'
                    : '服务行业'}
            </motion.h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {translations.testimonials.industries.list.map(
                (industry, index) => (
                  <motion.div
                    key={index}
                    className='flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {(() => {
                      const IconComponent = industryIcons[industry.icon]
                      return IconComponent ? (
                        <IconComponent className='w-6 h-6 text-blue-600 flex-shrink-0' />
                      ) : (
                        <div className='text-2xl'>{industry.icon}</div>
                      )
                    })()}
                    <div>
                      <div className='font-medium'>{industry.name}</div>
                      <div className='text-sm text-gray-600'>
                        {industry.projects}{' '}
                        {language === 'en'
                          ? 'projects'
                          : language === 'fr'
                            ? 'projets'
                            : language === 'es'
                              ? 'proyectos'
                              : '项目'}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background elements */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36 animate-float'></div>
            <div
              className='absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32 animate-float'
              style={{ animationDelay: '3s' }}
            ></div>
            <div
              className='absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full -translate-x-24 -translate-y-24 animate-float'
              style={{ animationDelay: '1.5s' }}
            ></div>

            <motion.div className='relative z-10'>
              <motion.h2
                className='text-3xl font-bold mb-4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {language === 'en'
                  ? 'Ready to Get Started?'
                  : language === 'fr'
                    ? 'Prêt à Commencer?'
                    : language === 'es'
                      ? '¿Listo para Empezar?'
                      : '准备开始了吗？'}
              </motion.h2>
              <motion.p
                className='text-xl mb-8 opacity-90'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {language === 'en'
                  ? "Let's discuss your project and see how we can help you succeed."
                  : language === 'fr'
                    ? 'Discutons de votre projet et voyons comment nous pouvons vous aider à réussir.'
                    : language === 'es'
                      ? 'Hablemos de su proyecto y veamos cómo podemos ayudarlo a tener éxito.'
                      : '让我们讨论您的项目，看看我们如何帮助您取得成功。'}
              </motion.p>
              <motion.div
                className='flex flex-col sm:flex-row gap-4 justify-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size='lg'
                    variant='secondary'
                    className='shadow-lg hover:shadow-xl transition-all duration-300'
                    asChild
                  >
                    <a href='/contact-us?title=Free Consultation#contact-form'>
                      {language === 'en'
                        ? 'Free Consultation'
                        : language === 'fr'
                          ? 'Consultation Gratuite'
                          : language === 'es'
                            ? 'Consulta Gratuita'
                            : '免费咨询'}
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size='lg'
                    variant='outline'
                    className='text-white border-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300'
                    asChild
                  >
                    <a href='/portfolio'>
                      {language === 'en'
                        ? 'View Portfolio'
                        : language === 'fr'
                          ? 'Voir le Portfolio'
                          : language === 'es'
                            ? 'Ver Portafolio'
                            : '查看作品集'}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
