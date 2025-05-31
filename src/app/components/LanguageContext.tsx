'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Translations for different languages
const translations = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      testimonials: 'Testimonials',
      contact: 'Contact Us',
    },
    hero: {
      title: 'Expert Software Outsourcing Solutions',
      subtitle:
        'Delivering high-quality, scalable, and innovative software with our global team of full-stack engineers.',
      cta: 'Get a Free Quote',
    },
    aboutSummary: {
      title: 'Who We Are',
      content:
        'BestITConsulting Ltd is a premier software outsourcing company with a team of dedicated full-stack engineers. We specialize in JavaScript, TypeScript, Python, Java, .NET, and more. Headquartered in Vancouver, Canada, with a strategic branch in East Asia, we bridge global talent with your project needs.',
      learnMore: 'Learn More About Us',
    },
    servicesSummary: {
      title: 'Our Services',
      content:
        'We offer a wide array of software development services tailored to meet your unique business requirements. From web and mobile applications to complex enterprise solutions, our expertise ensures top-notch results.',
      services: [
        {
          name: 'Custom Web Development',
          description: 'Building responsive and dynamic websites.',
        },
        {
          name: 'Mobile App Development',
          description: 'iOS and Android applications for diverse needs.',
        },
        {
          name: 'Cloud Solutions & DevOps',
          description: 'Scalable cloud infrastructure and CI/CD pipelines.',
        },
        {
          name: 'AI & Machine Learning',
          description: 'Intelligent solutions to drive innovation.',
        },
        {
          name: 'QA & Testing',
          description: 'Ensuring software quality and reliability.',
        },
      ],
      seeAllServices: 'Explore All Services',
    },
    portfolioPreview: {
      title: 'Our Proven Accomplishments',
      viewProject: 'View Project Details',
      projects: [
        {
          id: 1,
          name: 'E-commerce Platform Revamp',
          tech: 'Next.js, Node.js, PostgreSQL',
          description:
            "Overhauled a major online retailer's platform, improving performance by 60% and user engagement by 40%.",
        },
        {
          id: 2,
          name: 'Healthcare Management System',
          tech: 'Java Spring Boot, Angular, AWS',
          description:
            'Developed a secure and HIPAA-compliant system for managing patient records and appointments for a network of clinics.',
        },
        {
          id: 3,
          name: 'AI-Powered Logistics Optimizer',
          tech: 'Python, TensorFlow, Docker, Kubernetes',
          description:
            'Created an AI solution that optimized delivery routes, reducing fuel costs by 15% for a large logistics company.',
        },
      ],
      allProjects: 'View All Projects',
    },
    testimonialsPreview: {
      title: 'What Our Clients Say',
      testimonials: [
        {
          id: 1,
          name: 'Sarah L., CEO of TechSolutions Inc.',
          quote:
            '"BestITConsulting delivered beyond our expectations. Their team is skilled, professional, and truly understood our vision."',
        },
        {
          id: 2,
          name: 'John B., Project Manager at Innovate Corp.',
          quote:
            '"The quality of work and the communication throughout the project were outstanding. Highly recommend them!"',
        },
        {
          id: 3,
          name: 'Emily K., Founder of StartupX',
          quote:
            '"Working with BestITConsulting was a game-changer for us. They helped us scale our product efficiently and effectively."',
        },
      ],
      moreTestimonials: 'Read More Testimonials',
    },
    contactSnippet: {
      title: "Let's Build Something Great Together",
      description:
        "Ready to start your next project or have questions? We're here to help.",
      cta: 'Contact Us Now',
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. All rights reserved.',
      followUs: 'Follow Us:',
      contactInfo: 'Contact Information',
      vancouver: 'Vancouver HQ: 123 Tech Street, Vancouver, BC, Canada',
      eastAsia: 'East Asia Branch: 456 Innovation Ave, Tech City',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234',
    },
  },
  fr: {
    navbar: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      portfolio: 'Portefeuille',
      testimonials: 'Témoignages',
      contact: 'Contactez-Nous',
    },
    hero: {
      title: 'Solutions Expertes en Externalisation de Logiciels',
      subtitle:
        "Fournir des logiciels de haute qualité, évolutifs et innovants avec notre équipe mondiale d'ingénieurs full-stack.",
      cta: 'Obtenir un Devis Gratuit',
    },
    aboutSummary: {
      title: 'Qui Sommes-Nous',
      content:
        "BestITConsulting Ltd est une entreprise d'externalisation de logiciels de premier plan avec une équipe d'ingénieurs full-stack dévoués. Nous sommes spécialisés en JavaScript, TypeScript, Python, Java, .NET, et plus encore. Notre siège social est à Vancouver, Canada, avec une succursale stratégique en Asie de l'Est, nous relions les talents mondiaux à vos besoins de projet.",
      learnMore: 'En Savoir Plus Sur Nous',
    },
    servicesSummary: {
      title: 'Nos Services',
      content:
        "Nous offrons une vaste gamme de services de développement logiciel adaptés pour répondre à vos besoins commerciaux uniques. Des applications web et mobiles aux solutions d'entreprise complexes, notre expertise garantit des résultats de premier ordre.",
      services: [
        {
          name: 'Développement Web Personnalisé',
          description: 'Création de sites web réactifs et dynamiques.',
        },
        {
          name: "Développement d'Applications Mobiles",
          description: 'Applications iOS et Android pour divers besoins.',
        },
        {
          name: 'Solutions Cloud & DevOps',
          description: 'Infrastructure cloud évolutive et pipelines CI/CD.',
        },
        {
          name: 'IA & Apprentissage Automatique',
          description: "Solutions intelligentes pour stimuler l'innovation.",
        },
        {
          name: 'AQ & Tests',
          description: 'Assurer la qualité et la fiabilité des logiciels.',
        },
      ],
      seeAllServices: 'Explorer Tous les Services',
    },
    portfolioPreview: {
      title: 'Nos Réalisations Éprouvées',
      viewProject: 'Voir les Détails du Projet',
      projects: [
        {
          id: 1,
          name: 'Refonte de Plateforme E-commerce',
          tech: 'Next.js, Node.js, PostgreSQL',
          description:
            "Refonte de la plateforme d'un grand détaillant en ligne, améliorant les performances de 60% et l'engagement utilisateur de 40%.",
        },
        {
          id: 2,
          name: 'Système de Gestion des Soins de Santé',
          tech: 'Java Spring Boot, Angular, AWS',
          description:
            "Développement d'un système sécurisé et conforme HIPAA pour la gestion des dossiers patients et des rendez-vous pour un réseau de cliniques.",
        },
        {
          id: 3,
          name: 'Optimiseur Logistique IA',
          tech: 'Python, TensorFlow, Docker, Kubernetes',
          description:
            "Création d'une solution IA qui a optimisé les itinéraires de livraison, réduisant les coûts de carburant de 15% pour une grande entreprise de logistique.",
        },
      ],
      allProjects: 'Voir Tous les Projets',
    },
    testimonialsPreview: {
      title: 'Ce Que Disent Nos Clients',
      testimonials: [
        {
          id: 1,
          name: 'Sarah L., PDG de TechSolutions Inc.',
          quote:
            '"BestITConsulting a dépassé nos attentes. Leur équipe est compétente, professionnelle et a vraiment compris notre vision."',
        },
        {
          id: 2,
          name: 'John B., Chef de Projet chez Innovate Corp.',
          quote:
            '"La qualité du travail et la communication tout au long du projet ont été exceptionnelles. Je les recommande vivement!"',
        },
        {
          id: 3,
          name: 'Emily K., Fondatrice de StartupX',
          quote:
            '"Travailler avec BestITConsulting a changé la donne pour nous. Ils nous ont aidés à faire évoluer notre produit de manière efficace."',
        },
      ],
      moreTestimonials: 'Lire Plus de Témoignages',
    },
    contactSnippet: {
      title: 'Construisons Quelque Chose de Grand Ensemble',
      description:
        'Prêt à démarrer votre prochain projet ou vous avez des questions? Nous sommes là pour vous aider.',
      cta: 'Contactez-Nous Maintenant',
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. Tous droits réservés.',
      followUs: 'Suivez-Nous :',
      contactInfo: 'Coordonnées',
      vancouver: 'Siège Vancouver : 123 Rue Tech, Vancouver, BC, Canada',
      eastAsia: "Succursale Asie de l'Est : 456 Avenue Innovation, Tech City",
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234',
    },
  },
  es: {
    navbar: {
      home: 'Inicio',
      about: 'Nosotros',
      services: 'Servicios',
      portfolio: 'Portafolio',
      testimonials: 'Testimonios',
      contact: 'Contacto',
    },
    hero: {
      title: 'Soluciones Expertas en Outsourcing de Software',
      subtitle:
        'Entregando software de alta calidad, escalable e innovador con nuestro equipo global de ingenieros full-stack.',
      cta: 'Obtener Cotización Gratis',
    },
    aboutSummary: {
      title: 'Quiénes Somos',
      content:
        'BestITConsulting Ltd es una empresa líder en outsourcing de software con un equipo de ingenieros full-stack dedicados. Nos especializamos en JavaScript, TypeScript, Python, Java, .NET y más. Con sede en Vancouver, Canadá, y una sucursal estratégica en Asia Oriental, conectamos el talento global con las necesidades de su proyecto.',
      learnMore: 'Conoce Más Sobre Nosotros',
    },
    servicesSummary: {
      title: 'Nuestros Servicios',
      content:
        'Ofrecemos una amplia gama de servicios de desarrollo de software diseñados para satisfacer sus requisitos comerciales únicos. Desde aplicaciones web y móviles hasta complejas soluciones empresariales, nuestra experiencia garantiza resultados de primer nivel.',
      services: [
        {
          name: 'Desarrollo Web Personalizado',
          description: 'Construcción de sitios web responsivos y dinámicos.',
        },
        {
          name: 'Desarrollo de Aplicaciones Móviles',
          description: 'Aplicaciones iOS y Android para diversas necesidades.',
        },
        {
          name: 'Soluciones Cloud y DevOps',
          description: 'Infraestructura cloud escalable y pipelines CI/CD.',
        },
        {
          name: 'IA y Aprendizaje Automático',
          description: 'Soluciones inteligentes para impulsar la innovación.',
        },
        {
          name: 'QA y Pruebas',
          description: 'Asegurando la calidad y fiabilidad del software.',
        },
      ],
      seeAllServices: 'Explorar Todos los Servicios',
    },
    portfolioPreview: {
      title: 'Nuestros Logros Demostrados',
      viewProject: 'Ver Detalles del Proyecto',
      projects: [
        {
          id: 1,
          name: 'Renovación de Plataforma E-commerce',
          tech: 'Next.js, Node.js, PostgreSQL',
          description:
            'Revisión de la plataforma de un importante minorista en línea, mejorando el rendimiento en un 60% y la participación del usuario en un 40%.',
        },
        {
          id: 2,
          name: 'Sistema de Gestión de Salud',
          tech: 'Java Spring Boot, Angular, AWS',
          description:
            'Desarrollo de un sistema seguro y compatible con HIPAA para gestionar registros de pacientes y citas para una red de clínicas.',
        },
        {
          id: 3,
          name: 'Optimizador Logístico con IA',
          tech: 'Python, TensorFlow, Docker, Kubernetes',
          description:
            'Creación de una solución de IA que optimizó las rutas de entrega, reduciendo los costos de combustible en un 15% para una gran empresa de logística.',
        },
      ],
      allProjects: 'Ver Todos los Proyectos',
    },
    testimonialsPreview: {
      title: 'Lo Que Dicen Nuestros Clientes',
      testimonials: [
        {
          id: 1,
          name: 'Sarah L., CEO de TechSolutions Inc.',
          quote:
            '"BestITConsulting superó nuestras expectativas. Su equipo es talentoso, profesional y realmente entendió nuestra visión."',
        },
        {
          id: 2,
          name: 'John B., Gerente de Proyectos en Innovate Corp.',
          quote:
            '"La calidad del trabajo y la comunicación durante todo el proyecto fueron sobresalientes. ¡Los recomiendo encarecidamente!"',
        },
        {
          id: 3,
          name: 'Emily K., Fundadora de StartupX',
          quote:
            '"Trabajar con BestITConsulting fue un cambio de juego para nosotros. Nos ayudaron a escalar nuestro producto de manera eficiente y efectiva."',
        },
      ],
      moreTestimonials: 'Leer Más Testimonios',
    },
    contactSnippet: {
      title: 'Construyamos Algo Grandioso Juntos',
      description:
        '¿Listo para comenzar su próximo proyecto o tiene preguntas? Estamos aquí para ayudar.',
      cta: 'Contáctenos Ahora',
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. Todos los derechos reservados.',
      followUs: 'Síguenos:',
      contactInfo: 'Información de Contacto',
      vancouver: 'Sede Vancouver: 123 Calle Tech, Vancouver, BC, Canadá',
      eastAsia: 'Sucursal Asia Oriental: 456 Avenida Innovación, Tech City',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234',
    },
  },
  cn: {
    navbar: {
      home: '首页',
      about: '关于我们',
      services: '服务项目',
      portfolio: '项目案例',
      testimonials: '客户评价',
      contact: '联系我们',
    },
    hero: {
      title: '专业的软件外包解决方案',
      subtitle: '我们的全球全栈工程师团队为您提供高质量、可扩展和创新的软件。',
      cta: '获取免费报价',
    },
    aboutSummary: {
      title: '我们是谁',
      content:
        'BestITConsulting Ltd 是一家领先的软件外包公司，拥有一支专业的全栈工程师团队。我们专注于 JavaScript、TypeScript、Python、Java、.NET 等技术。总部位于加拿大温哥华，并在东亚设有战略分支机构，我们将全球人才与您的项目需求联系起来。',
      learnMore: '了解更多关于我们',
    },
    servicesSummary: {
      title: '我们的服务',
      content:
        '我们提供广泛的软件开发服务，以满足您独特的业务需求。从 Web 和移动应用程序到复杂的企业解决方案，我们的专业知识确保一流的成果。',
      services: [
        { name: '定制 Web 开发', description: '构建响应式和动态网站。' },
        {
          name: '移动应用开发',
          description: '满足各种需求的 iOS 和 Android 应用程序。',
        },
        {
          name: '云解决方案与 DevOps',
          description: '可扩展的云基础设施和 CI/CD 管道。',
        },
        { name: '人工智能与机器学习', description: '推动创新的智能解决方案。' },
        { name: '质量保证与测试', description: '确保软件质量和可靠性。' },
      ],
      seeAllServices: '浏览所有服务',
    },
    portfolioPreview: {
      title: '我们已证实的成就',
      viewProject: '查看项目详情',
      projects: [
        {
          id: 1,
          name: '电商平台改造',
          tech: 'Next.js, Node.js, PostgreSQL',
          description:
            '对一家大型在线零售商的平台进行了全面改革，性能提升60%，用户参与度提升40%。',
        },
        {
          id: 2,
          name: '医疗管理系统',
          tech: 'Java Spring Boot, Angular, AWS',
          description:
            '为一家连锁诊所开发了一个安全的、符合HIPAA标准的系统，用于管理患者记录和预约。',
        },
        {
          id: 3,
          name: '人工智能物流优化器',
          tech: 'Python, TensorFlow, Docker, Kubernetes',
          description:
            '创建了一个人工智能解决方案，优化了配送路线，为一家大型物流公司降低了15%的燃料成本。',
        },
      ],
      allProjects: '查看所有项目',
    },
    testimonialsPreview: {
      title: '客户怎么说',
      testimonials: [
        {
          id: 1,
          name: 'TechSolutions 公司首席执行官 Sarah L.',
          quote:
            '"BestITConsulting 超出了我们的预期。他们的团队技术精湛、专业，并且真正理解我们的愿景。"',
        },
        {
          id: 2,
          name: 'Innovate Corp. 项目经理 John B.',
          quote: '"整个项目的工作质量和沟通都非常出色。强烈推荐他们！"',
        },
        {
          id: 3,
          name: 'StartupX 创始人 Emily K.',
          quote:
            '"与 BestITConsulting 合作对我们来说改变了游戏规则。他们帮助我们高效地扩展了我们的产品。"',
        },
      ],
      moreTestimonials: '阅读更多评价',
    },
    contactSnippet: {
      title: '让我们一起创造卓越',
      description:
        '准备好开始您的下一个项目或有任何疑问吗？我们随时为您提供帮助。',
      cta: '立即联系我们',
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. 版权所有。',
      followUs: '关注我们：',
      contactInfo: '联系方式',
      vancouver: '温哥华总部：加拿大不列颠哥伦比亚省温哥华市科技街123号',
      eastAsia: '东亚分部：科技城创新大道456号',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234',
    },
  },
} as const;

type Language = keyof typeof translations;
type TranslationKey = (typeof translations)[Language];

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translations: TranslationKey;
}

// Create LanguageContext
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

// LanguageProvider component to wrap around the app
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Function to change the language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Current translations based on selected language
  const currentTranslations = translations[language];

  const value: LanguageContextType = {
    language,
    changeLanguage,
    translations: currentTranslations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the LanguageContext
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
