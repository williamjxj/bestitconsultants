'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { ChatWidget } from '@/components/chat-widget/chat-widget'
import AboutSummary from '@/components/home/AboutSummary'
import ContactSnippet from '@/components/home/ContactSnippet'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import { QuickHighlights } from '@/components/home/QuickHighlights'
import ServicesSummary from '@/components/home/ServicesSummary'
import { HeroCarousel, HeroCarouselItem } from '@/components/ui/hero-carousel'
import { useLanguage } from '@/contexts/LanguageContext'
import { getR2BaseUrl } from '@/lib/utils'

// HomePage component with animations
export default function HomePage() {
  const { language } = useLanguage()

  // Home page carousel content with translations
  const homeCarouselContent = {
    en: {
      items: [
        {
          title: 'Elite Enterprise Architects. Startup Speed.',
          subtitle: 'Get Fortune 500 Software Expertise Without the Overhead',
          description:
            'Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent. Led by industry veterans with 20+ years combined experience, we deliver AI/ML solutions, enterprise systems, and cloud platforms for global clients.',
          ctaText: 'Start Your Project',
        },
        {
          title:
            'Helping businesses integrate AI and modern software architectures',
          subtitle:
            'From strategy to production — we fuse AI with cloud-native patterns',
          description:
            'We design event-driven, microservices, and data platforms that operationalize AI safely and at scale. Our teams deliver measurable impact with MLOps, vector search, and robust observability.',
          ctaText: 'Start Your Project',
        },
        {
          title: 'Modern engineering for real business outcomes',
          subtitle: 'Secure, observable, and scalable by default',
          description:
            'We apply pragmatic patterns, automation, and rigorous testing to ship faster with confidence — from greenfield builds to complex legacy modernization.',
          ctaText: 'Start Your Project',
        },
      ],
    },
    fr: {
      items: [
        {
          title: "Architectes d'Entreprise d'Élite. Vitesse de Startup.",
          subtitle:
            "Obtenez l'Expertise Logicielle Fortune 500 Sans les Frais Généraux",
          description:
            "Externalisation TI Mondiale et Conseil IA – Qualité Canadienne, Talents Mondiaux. Dirigés par des vétérans de l'industrie avec 20+ années d'expérience combinées, nous livrons des solutions IA/ML, systèmes d'entreprise et plateformes cloud pour des clients mondiaux.",
          ctaText: 'Démarrer Votre Projet',
        },
        {
          title:
            "Aider les entreprises à intégrer l'IA et les architectures logicielles modernes",
          subtitle:
            "De la stratégie à la production — nous fusionnons l'IA avec des modèles cloud-native",
          description:
            "Nous concevons des plateformes orientées événements, microservices et données qui opérationnalisent l'IA de manière sûre et à grande échelle. Nos équipes offrent un impact mesurable avec MLOps, recherche vectorielle et observabilité robuste.",
          ctaText: 'Démarrer Votre Projet',
        },
        {
          title: 'Ingénierie moderne pour des résultats commerciaux réels',
          subtitle: 'Sécurisé, observable et évolutif par défaut',
          description:
            "Nous appliquons des modèles pragmatiques, l'automatisation et des tests rigoureux pour livrer plus rapidement avec confiance — des constructions greenfield à la modernisation complexe de l'héritage.",
          ctaText: 'Démarrer Votre Projet',
        },
      ],
    },
    es: {
      items: [
        {
          title: 'Arquitectos Empresariales de Élite. Velocidad de Startup.',
          subtitle:
            'Obtenga Experiencia en Software Fortune 500 Sin los Costos Generales',
          description:
            'Externalización de TI Global y Consultoría de IA – Calidad Canadiense, Talento Global. Liderados por veteranos de la industria con 20+ años de experiencia combinada, entregamos soluciones IA/ML, sistemas empresariales y plataformas cloud para clientes globales.',
          ctaText: 'Iniciar Su Proyecto',
        },
        {
          title:
            'Ayudando a las empresas a integrar IA y arquitecturas de software modernas',
          subtitle:
            'De la estrategia a la producción — fusionamos IA con patrones cloud-native',
          description:
            'Diseñamos plataformas basadas en eventos, microservicios y datos que operacionalizan la IA de manera segura y a escala. Nuestros equipos ofrecen impacto medible con MLOps, búsqueda vectorial y observabilidad robusta.',
          ctaText: 'Iniciar Su Proyecto',
        },
        {
          title: 'Ingeniería moderna para resultados comerciales reales',
          subtitle: 'Seguro, observable y escalable por defecto',
          description:
            'Aplicamos patrones pragmáticos, automatización y pruebas rigurosas para entregar más rápido con confianza — desde construcciones greenfield hasta modernización compleja de sistemas heredados.',
          ctaText: 'Iniciar Su Proyecto',
        },
      ],
    },
    cn: {
      items: [
        {
          title: '精英企业架构师。创业速度。',
          subtitle: '获得财富500强软件专业知识，无需高昂成本',
          description:
            '全球IT外包和AI咨询 – 加拿大品质，全球人才。由拥有20+年综合经验的行业资深人士领导，我们为全球客户提供AI/ML解决方案、企业系统和云平台。',
          ctaText: '开始您的项目',
        },
        {
          title: '帮助企业整合AI和现代软件架构',
          subtitle: '从战略到生产 — 我们将AI与云原生模式融合',
          description:
            '我们设计事件驱动、微服务和数据平台，以安全和大规模的方式运营AI。我们的团队通过MLOps、向量搜索和强大的可观测性提供可衡量的影响。',
          ctaText: '开始您的项目',
        },
        {
          title: '为真实业务成果提供现代工程',
          subtitle: '默认安全、可观测和可扩展',
          description:
            '我们应用实用模式、自动化和严格测试，以更快、更自信地交付 — 从绿地构建到复杂的遗留系统现代化。',
          ctaText: '开始您的项目',
        },
      ],
    },
  }

  const currentCarouselContent =
    homeCarouselContent[language as keyof typeof homeCarouselContent] ||
    homeCarouselContent.en

  const R2_BASE_URL = getR2BaseUrl()

  const CAROUSEL_ITEMS: HeroCarouselItem[] = [
    {
      id: 'slide-1',
      title: currentCarouselContent.items[0].title,
      subtitle: currentCarouselContent.items[0].subtitle,
      description: currentCarouselContent.items[0].description,
      image: `${R2_BASE_URL}/optimized/b1`,
      ctaText: currentCarouselContent.items[0].ctaText,
      ctaLink: '/contact-us?title=Start Your Project#contact-form',
      secondaryCtaText: 'Get Free Consultation',
      secondaryCtaLink: '/contact-us?title=Free Consultation#contact-form',
    },
    {
      id: 'slide-2',
      title: currentCarouselContent.items[1].title,
      subtitle: currentCarouselContent.items[1].subtitle,
      description: currentCarouselContent.items[1].description,
      image: `${R2_BASE_URL}/optimized/b2`,
      ctaText: currentCarouselContent.items[1].ctaText,
      ctaLink: '/contact-us?title=Start Your Project#contact-form',
      secondaryCtaText: 'Get Free Consultation',
      secondaryCtaLink: '/contact-us?title=Free Consultation#contact-form',
    },
    {
      id: 'slide-3',
      title: currentCarouselContent.items[2].title,
      subtitle: currentCarouselContent.items[2].subtitle,
      description: currentCarouselContent.items[2].description,
      image: `${R2_BASE_URL}/optimized/b3`,
      ctaText: currentCarouselContent.items[2].ctaText,
      ctaLink: '/contact-us?title=Start Your Project#contact-form',
      secondaryCtaText: 'Get Free Consultation',
      secondaryCtaLink: '/contact-us?title=Free Consultation#contact-form',
    },
  ]
  const [navbarHeight, setNavbarHeight] = useState<number>(88) // Default fallback

  // Measure navbar height for full viewport calculation
  useEffect(() => {
    const measureNavbar = () => {
      const navbar = document.querySelector('nav')
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight)
      }
    }
    measureNavbar()
    window.addEventListener('resize', measureNavbar)
    return () => window.removeEventListener('resize', measureNavbar)
  }, [])

  return (
    <div className='space-y-16 md:space-y-24'>
      {/* Hero section: Main introductory content - Full viewport height with navbar */}
      <div
        className='relative -mx-4 -mt-8 -mb-8 w-screen'
        style={{
          height: `calc(100vh - ${navbarHeight}px)`,
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
        }}
      >
        <HeroCarousel items={CAROUSEL_ITEMS} autoPlay autoPlayInterval={8000} />
      </div>

      {/* Quick highlights section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <QuickHighlights />
      </motion.div>

      {/* AboutSummary section: Brief overview of the company */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <AboutSummary />
      </motion.div>

      {/* ServicesSummary section: Highlights of services offered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ServicesSummary />
      </motion.div>

      {/* PortfolioPreview section: Sneak peek of projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <PortfolioPreview />
      </motion.div>

      {/* ContactSnippet section: Quick contact call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ContactSnippet />
      </motion.div>

      {/* AI Chatbot widget - only on landing page */}
      <ChatWidget />
    </div>
  )
}
