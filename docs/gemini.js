// Filename: app/layout.js
// Root layout for the Next.js application.
// Includes global styles, Tailwind CSS, and Font.
// Establishes the basic HTML structure.
import './globals.css';
import { Inter } from 'next/font/google';
import { LanguageProvider } from './_components/LanguageContext'; // Context for multi-language support
import Navbar from './_components/Navbar'; // Navigation bar component
import Footer from './_components/Footer'; // Footer component

// Initialize Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the website (SEO purposes)
export const metadata = {
  title: 'BestITConsulting Ltd - Software Outsourcing Solutions',
  description: 'Expert full-stack software development and outsourcing services. JS, TS, Python, Java, .NET and more. Located in Vancouver, Canada with a branch in East Asia.',
};

// RootLayout component: applies to all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {/* LanguageProvider wraps the entire application to provide language context */}
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Site navigation */}
            <main className="flex-grow container mx-auto px-4 py-8">
              {children} {/* Page content will be rendered here */}
            </main>
            <Footer /> {/* Site footer */}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
```react
// Filename: app/page.js
// This is the main homepage for the BestITConsulting Ltd website.
// It imports and uses various sections like Hero, AboutSummary, ServicesSummary,
// PortfolioPreview, and TestimonialsPreview to build the landing page.
'use client'; // Specifies this component as a Client Component

import HeroSection from './_components/HeroSection';
import AboutSummary from './_components/AboutSummary';
import ServicesSummary from './_components/ServicesSummary';
import PortfolioPreview from './_components/PortfolioPreview';
import TestimonialsPreview from './_components/TestimonialsPreview';
import ContactSnippet from './_components/ContactSnippet';

// HomePage component
export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero section: Main introductory content */}
      <HeroSection />

      {/* AboutSummary section: Brief overview of the company */}
      <AboutSummary />

      {/* ServicesSummary section: Highlights of services offered */}
      <ServicesSummary />

      {/* PortfolioPreview section: Sneak peek of projects */}
      <PortfolioPreview />

      {/* TestimonialsPreview section: Client feedback */}
      <TestimonialsPreview />

      {/* ContactSnippet section: Quick contact call to action */}
      <ContactSnippet />
    </div>
  );
}
```react
// Filename: app/_components/LanguageContext.js
// This file defines the LanguageContext and LanguageProvider for managing
// multi-language support across the application.
'use client'; // Specifies this component as a Client Component

import React, { createContext, useState, useContext } from 'react';

// Translations for different languages
// Keys are structured for easy access, e.g., translations[lang].navbar.home
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
      subtitle: 'Delivering high-quality, scalable, and innovative software with our global team of full-stack engineers.',
      cta: 'Get a Free Quote',
    },
    aboutSummary: {
      title: 'Who We Are',
      content: "BestITConsulting Ltd is a premier software outsourcing company with a team of dedicated full-stack engineers. We specialize in JavaScript, TypeScript, Python, Java, .NET, and more. Headquartered in Vancouver, Canada, with a strategic branch in East Asia, we bridge global talent with your project needs.",
      learnMore: 'Learn More About Us',
    },
    servicesSummary: {
        title: 'Our Services',
        content: 'We offer a wide array of software development services tailored to meet your unique business requirements. From web and mobile applications to complex enterprise solutions, our expertise ensures top-notch results.',
        services: [
            { name: 'Custom Web Development', description: 'Building responsive and dynamic websites.' },
            { name: 'Mobile App Development', description: 'iOS and Android applications for diverse needs.' },
            { name: 'Cloud Solutions & DevOps', description: 'Scalable cloud infrastructure and CI/CD pipelines.' },
            { name: 'AI & Machine Learning', description: 'Intelligent solutions to drive innovation.' },
            { name: 'QA & Testing', description: 'Ensuring software quality and reliability.' },
        ],
        seeAllServices: 'Explore All Services'
    },
    portfolioPreview: {
        title: 'Our Proven Accomplishments',
        viewProject: 'View Project Details',
        projects: [
            { id: 1, name: 'E-commerce Platform Revamp', tech: 'Next.js, Node.js, PostgreSQL', description: 'Overhauled a major online retailer\'s platform, improving performance by 60% and user engagement by 40%.' },
            { id: 2, name: 'Healthcare Management System', tech: 'Java Spring Boot, Angular, AWS', description: 'Developed a secure and HIPAA-compliant system for managing patient records and appointments for a network of clinics.' },
            { id: 3, name: 'AI-Powered Logistics Optimizer', tech: 'Python, TensorFlow, Docker, Kubernetes', description: 'Created an AI solution that optimized delivery routes, reducing fuel costs by 15% for a large logistics company.' },
        ],
        allProjects: 'View All Projects'
    },
    testimonialsPreview: {
        title: 'What Our Clients Say',
        testimonials: [
            { id: 1, name: 'Sarah L., CEO of TechSolutions Inc.', quote: '"BestITConsulting delivered beyond our expectations. Their team is skilled, professional, and truly understood our vision."' },
            { id: 2, name: 'John B., Project Manager at Innovate Corp.', quote: '"The quality of work and the communication throughout the project were outstanding. Highly recommend them!"' },
            { id: 3, name: 'Emily K., Founder of StartupX', quote: '"Working with BestITConsulting was a game-changer for us. They helped us scale our product efficiently and effectively."' },
        ],
        moreTestimonials: 'Read More Testimonials'
    },
    contactSnippet: {
        title: "Let's Build Something Great Together",
        description: "Ready to start your next project or have questions? We're here to help.",
        cta: "Contact Us Now"
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. All rights reserved.',
      followUs: 'Follow Us:',
      contactInfo: 'Contact Information',
      vancouver: 'Vancouver HQ: 123 Tech Street, Vancouver, BC, Canada',
      eastAsia: 'East Asia Branch: 456 Innovation Ave, Tech City',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234'
    },
    // Add more detailed translations for other pages/sections as needed
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
      subtitle: 'Fournir des logiciels de haute qualité, évolutifs et innovants avec notre équipe mondiale d\'ingénieurs full-stack.',
      cta: 'Obtenir un Devis Gratuit',
    },
    aboutSummary: {
      title: 'Qui Sommes-Nous',
      content: "BestITConsulting Ltd est une entreprise d'externalisation de logiciels de premier plan avec une équipe d'ingénieurs full-stack dévoués. Nous sommes spécialisés en JavaScript, TypeScript, Python, Java, .NET, et plus encore. Notre siège social est à Vancouver, Canada, avec une succursale stratégique en Asie de l'Est, nous relions les talents mondiaux à vos besoins de projet.",
      learnMore: 'En Savoir Plus Sur Nous',
    },
    servicesSummary: {
        title: 'Nos Services',
        content: "Nous offrons une vaste gamme de services de développement logiciel adaptés pour répondre à vos besoins commerciaux uniques. Des applications web et mobiles aux solutions d'entreprise complexes, notre expertise garantit des résultats de premier ordre.",
        services: [
            { name: 'Développement Web Personnalisé', description: 'Création de sites web réactifs et dynamiques.' },
            { name: 'Développement d\'Applications Mobiles', description: 'Applications iOS et Android pour divers besoins.' },
            { name: 'Solutions Cloud & DevOps', description: 'Infrastructure cloud évolutive et pipelines CI/CD.' },
            { name: 'IA & Apprentissage Automatique', description: 'Solutions intelligentes pour stimuler l\'innovation.' },
            { name: 'AQ & Tests', description: 'Assurer la qualité et la fiabilité des logiciels.' },
        ],
        seeAllServices: 'Explorer Tous les Services'
    },
    portfolioPreview: {
        title: 'Nos Réalisations Éprouvées',
        viewProject: 'Voir les Détails du Projet',
        projects: [
            { id: 1, name: 'Refonte de Plateforme E-commerce', tech: 'Next.js, Node.js, PostgreSQL', description: 'Refonte de la plateforme d\'un grand détaillant en ligne, améliorant les performances de 60% et l\'engagement utilisateur de 40%.' },
            { id: 2, name: 'Système de Gestion des Soins de Santé', tech: 'Java Spring Boot, Angular, AWS', description: 'Développement d\'un système sécurisé et conforme HIPAA pour la gestion des dossiers patients et des rendez-vous pour un réseau de cliniques.' },
            { id: 3, name: 'Optimiseur Logistique IA', tech: 'Python, TensorFlow, Docker, Kubernetes', description: 'Création d\'une solution IA qui a optimisé les itinéraires de livraison, réduisant les coûts de carburant de 15% pour une grande entreprise de logistique.' },
        ],
        allProjects: 'Voir Tous les Projets'
    },
    testimonialsPreview: {
        title: 'Ce Que Disent Nos Clients',
        testimonials: [
            { id: 1, name: 'Sarah L., PDG de TechSolutions Inc.', quote: '"BestITConsulting a dépassé nos attentes. Leur équipe est compétente, professionnelle et a vraiment compris notre vision."' },
            { id: 2, name: 'John B., Chef de Projet chez Innovate Corp.', quote: '"La qualité du travail et la communication tout au long du projet ont été exceptionnelles. Je les recommande vivement!"' },
            { id: 3, name: 'Emily K., Fondatrice de StartupX', quote: '"Travailler avec BestITConsulting a changé la donne pour nous. Ils nous ont aidés à faire évoluer notre produit de manière efficace."' },
        ],
        moreTestimonials: 'Lire Plus de Témoignages'
    },
    contactSnippet: {
        title: "Construisons Quelque Chose de Grand Ensemble",
        description: "Prêt à démarrer votre prochain projet ou vous avez des questions? Nous sommes là pour vous aider.",
        cta: "Contactez-Nous Maintenant"
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. Tous droits réservés.',
      followUs: 'Suivez-Nous :',
      contactInfo: 'Coordonnées',
      vancouver: 'Siège Vancouver : 123 Rue Tech, Vancouver, BC, Canada',
      eastAsia: 'Succursale Asie de l\'Est : 456 Avenue Innovation, Tech City',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234'
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
      subtitle: 'Entregando software de alta calidad, escalable e innovador con nuestro equipo global de ingenieros full-stack.',
      cta: 'Obtener Cotización Gratis',
    },
     aboutSummary: {
      title: 'Quiénes Somos',
      content: "BestITConsulting Ltd es una empresa líder en outsourcing de software con un equipo de ingenieros full-stack dedicados. Nos especializamos en JavaScript, TypeScript, Python, Java, .NET y más. Con sede en Vancouver, Canadá, y una sucursal estratégica en Asia Oriental, conectamos el talento global con las necesidades de su proyecto.",
      learnMore: 'Conoce Más Sobre Nosotros',
    },
    servicesSummary: {
        title: 'Nuestros Servicios',
        content: 'Ofrecemos una amplia gama de servicios de desarrollo de software diseñados para satisfacer sus requisitos comerciales únicos. Desde aplicaciones web y móviles hasta complejas soluciones empresariales, nuestra experiencia garantiza resultados de primer nivel.',
        services: [
            { name: 'Desarrollo Web Personalizado', description: 'Construcción de sitios web responsivos y dinámicos.' },
            { name: 'Desarrollo de Aplicaciones Móviles', description: 'Aplicaciones iOS y Android para diversas necesidades.' },
            { name: 'Soluciones Cloud y DevOps', description: 'Infraestructura cloud escalable y pipelines CI/CD.' },
            { name: 'IA y Aprendizaje Automático', description: 'Soluciones inteligentes para impulsar la innovación.' },
            { name: 'QA y Pruebas', description: 'Asegurando la calidad y fiabilidad del software.' },
        ],
        seeAllServices: 'Explorar Todos los Servicios'
    },
    portfolioPreview: {
        title: 'Nuestros Logros Demostrados',
        viewProject: 'Ver Detalles del Proyecto',
        projects: [
            { id: 1, name: 'Renovación de Plataforma E-commerce', tech: 'Next.js, Node.js, PostgreSQL', description: 'Revisión de la plataforma de un importante minorista en línea, mejorando el rendimiento en un 60% y la participación del usuario en un 40%.' },
            { id: 2, name: 'Sistema de Gestión de Salud', tech: 'Java Spring Boot, Angular, AWS', description: 'Desarrollo de un sistema seguro y compatible con HIPAA para gestionar registros de pacientes y citas para una red de clínicas.' },
            { id: 3, name: 'Optimizador Logístico con IA', tech: 'Python, TensorFlow, Docker, Kubernetes', description: 'Creación de una solución de IA que optimizó las rutas de entrega, reduciendo los costos de combustible en un 15% para una gran empresa de logística.' },
        ],
        allProjects: 'Ver Todos los Proyectos'
    },
    testimonialsPreview: {
        title: 'Lo Que Dicen Nuestros Clientes',
        testimonials: [
            { id: 1, name: 'Sarah L., CEO de TechSolutions Inc.', quote: '"BestITConsulting superó nuestras expectativas. Su equipo es talentoso, profesional y realmente entendió nuestra visión."' },
            { id: 2, name: 'John B., Gerente de Proyectos en Innovate Corp.', quote: '"La calidad del trabajo y la comunicación durante todo el proyecto fueron sobresalientes. ¡Los recomiendo encarecidamente!"' },
            { id: 3, name: 'Emily K., Fundadora de StartupX', quote: '"Trabajar con BestITConsulting fue un cambio de juego para nosotros. Nos ayudaron a escalar nuestro producto de manera eficiente y efectiva."' },
        ],
        moreTestimonials: 'Leer Más Testimonios'
    },
    contactSnippet: {
        title: "Construyamos Algo Grandioso Juntos",
        description: "¿Listo para comenzar su próximo proyecto o tiene preguntas? Estamos aquí para ayudar.",
        cta: "Contáctenos Ahora"
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. Todos los derechos reservados.',
      followUs: 'Síguenos:',
      contactInfo: 'Información de Contacto',
      vancouver: 'Sede Vancouver: 123 Calle Tech, Vancouver, BC, Canadá',
      eastAsia: 'Sucursal Asia Oriental: 456 Avenida Innovación, Tech City',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234'
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
      content: "BestITConsulting Ltd 是一家领先的软件外包公司，拥有一支专业的全栈工程师团队。我们专注于 JavaScript、TypeScript、Python、Java、.NET 等技术。总部位于加拿大温哥华，并在东亚设有战略分支机构，我们将全球人才与您的项目需求联系起来。",
      learnMore: '了解更多关于我们',
    },
    servicesSummary: {
        title: '我们的服务',
        content: '我们提供广泛的软件开发服务，以满足您独特的业务需求。从 Web 和移动应用程序到复杂的企业解决方案，我们的专业知识确保一流的成果。',
        services: [
            { name: '定制 Web 开发', description: '构建响应式和动态网站。' },
            { name: '移动应用开发', description: '满足各种需求的 iOS 和 Android 应用程序。' },
            { name: '云解决方案与 DevOps', description: '可扩展的云基础设施和 CI/CD 管道。' },
            { name: '人工智能与机器学习', description: '推动创新的智能解决方案。' },
            { name: '质量保证与测试', description: '确保软件质量和可靠性。' },
        ],
        seeAllServices: '浏览所有服务'
    },
    portfolioPreview: {
        title: '我们已证实的成就',
        viewProject: '查看项目详情',
        projects: [
            { id: 1, name: '电商平台改造', tech: 'Next.js, Node.js, PostgreSQL', description: '对一家大型在线零售商的平台进行了全面改革，性能提升60%，用户参与度提升40%。' },
            { id: 2, name: '医疗管理系统', tech: 'Java Spring Boot, Angular, AWS', description: '为一家连锁诊所开发了一个安全的、符合HIPAA标准的系统，用于管理患者记录和预约。' },
            { id: 3, name: '人工智能物流优化器', tech: 'Python, TensorFlow, Docker, Kubernetes', description: '创建了一个人工智能解决方案，优化了配送路线，为一家大型物流公司降低了15%的燃料成本。' },
        ],
        allProjects: '查看所有项目'
    },
    testimonialsPreview: {
        title: '客户怎么说',
        testimonials: [
            { id: 1, name: 'TechSolutions 公司首席执行官 Sarah L.', quote: '"BestITConsulting 超出了我们的预期。他们的团队技术精湛、专业，并且真正理解我们的愿景。"' },
            { id: 2, name: 'Innovate Corp. 项目经理 John B.', quote: '"整个项目的工作质量和沟通都非常出色。强烈推荐他们！"' },
            { id: 3, name: 'StartupX 创始人 Emily K.', quote: '"与 BestITConsulting 合作对我们来说改变了游戏规则。他们帮助我们高效地扩展了我们的产品。"' },
        ],
        moreTestimonials: '阅读更多评价'
    },
    contactSnippet: {
        title: "让我们一起创造卓越",
        description: "准备好开始您的下一个项目或有任何疑问吗？我们随时为您提供帮助。",
        cta: "立即联系我们"
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. 版权所有。',
      followUs: '关注我们：',
      contactInfo: '联系方式',
      vancouver: '温哥华总部：加拿大不列颠哥伦比亚省温哥华市科技街123号',
      eastAsia: '东亚分部：科技城创新大道456号',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234'
    },
  },
};

// Create LanguageContext
const LanguageContext = createContext();

// LanguageProvider component to wrap around the app
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default language is English

  // Function to change the language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Current translations based on selected language
  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the LanguageContext
export function useLanguage() {
  return useContext(LanguageContext);
}
```react
// Filename: app/_components/Navbar.js
// This component renders the navigation bar for the website.
// It includes the company logo, navigation links, and a language switcher.
'use client'; // Specifies this component as a Client Component

import Link from 'next/link';
import { useLanguage } from './LanguageContext'; // Hook for accessing language context
import { useState } from 'react'; // Hook for managing component state (e.g., mobile menu)
import { Globe, Menu, X } from 'lucide-react'; // Icons for language and menu

// Navbar component
export default function Navbar() {
  const { language, changeLanguage, translations } = useLanguage(); // Access language state and functions
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false); // State for language dropdown

  // Navigation links data
  const navLinks = [
    { href: '/', label: translations.navbar.home },
    { href: '/about', label: translations.navbar.about },
    { href: '/services', label: translations.navbar.services },
    { href: '/portfolio', label: translations.navbar.portfolio },
    { href: '/testimonials', label: translations.navbar.testimonials },
    { href: '/contact', label: translations.navbar.contact },
  ];

  // Available languages for the switcher
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'cn', name: '中文' },
  ];

  // Handles language change and closes dropdown
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangDropdownOpen(false);
    if(isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu on lang change
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            BestITConsulting
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Desktop Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-md border border-gray-300 hover:border-blue-500"
                aria-label="Change language"
              >
                <Globe size={20} className="mr-1" />
                {language.toUpperCase()}
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === lang.code ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-md border border-gray-300 hover:border-blue-500"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-40 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile Language Switcher */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5">
              <p className="text-sm font-medium text-gray-500 mb-2 flex items-center"><Globe size={16} className="mr-2"/> Language</p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`block w-full text-left px-3 py-2 my-1 rounded-md text-base font-medium ${
                    language === lang.code ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
```react
// Filename: app/_components/Footer.js
// This component renders the footer for the website.
// It includes copyright information, social media links, and basic contact details.
'use client'; // Specifies this component as a Client Component

import Link from 'next/link';
import { useLanguage } from './LanguageContext'; // Hook for accessing language context
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react'; // Icons

// Footer component
export default function Footer() {
  const { translations } = useLanguage(); // Access translations from context
  const currentYear = new Date().getFullYear(); // Get current year for copyright

  // Social media links data
  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/bestitconsulting', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com/bestitconsulting', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/bestitconsulting', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/bestitconsulting', icon: Github },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info & Mission (Optional) */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">BestITConsulting Ltd</h3>
            <p className="text-sm">
              {/* A short tagline or mission statement can go here, potentially translated */}
              Empowering businesses with innovative software solutions and global expertise.
            </p>
          </div>

          {/* Quick Links (Optional) */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{translations.navbar.contact}</h3> {/* Re-using navbar translation for "Contact" */}
             <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">{translations.navbar.about}</Link></li>
                <li><Link href="/services" className="hover:text-blue-400 transition-colors">{translations.navbar.services}</Link></li>
                <li><Link href="/portfolio" className="hover:text-blue-400 transition-colors">{translations.navbar.portfolio}</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">{translations.navbar.contact}</Link></li>
             </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{translations.footer.contactInfo}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>{translations.footer.vancouver}</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>{translations.footer.eastAsia}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${translations.footer.email}`} className="hover:text-blue-400 transition-colors">{translations.footer.email}</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400 flex-shrink-0" />
                <a href={`tel:${translations.footer.phone}`} className="hover:text-blue-400 transition-colors">{translations.footer.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">{translations.footer.followUs}</p>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-center md:text-right">
            {translations.footer.copy.replace('{year}', currentYear)}
          </p>
        </div>
      </div>
    </footer>
  );
}
```react
// Filename: app/_components/HeroSection.js
// This component displays the main hero section for the homepage.
// It includes a title, subtitle, and a call-to-action button.
'use client'; // Specifies this component as a Client Component

import Link from 'next/link';
import { useLanguage } from './LanguageContext'; // Hook for accessing language context
import { ArrowRight } from 'lucide-react'; // Icon for the CTA button

// HeroSection component
export default function HeroSection() {
  const { translations } = useLanguage(); // Access translations from context

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32 rounded-lg shadow-xl">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {translations.hero.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-indigo-100">
          {translations.hero.subtitle}
        </p>
        <Link
          href="/contact" // Link to the contact page or a quote request page
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg inline-flex items-center transition-transform transform hover:scale-105 shadow-md"
        >
          {translations.hero.cta}
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}
```react
// Filename: app/_components/AboutSummary.js
// This component provides a brief summary of the company on the homepage.
// It includes a title, a short description, and a link to the full "About Us" page.
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Users, Globe, Briefcase } from 'lucide-react'; // Icons for visual enhancement

export default function AboutSummary() {
  const { translations } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-white rounded-lg shadow-lg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {translations.aboutSummary.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translations.aboutSummary.content}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-10 md:mb-12">
          {/* Feature 1: Expert Team */}
          <div className="p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow">
            <Users size={48} className="mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Professional Full-Stack Engineers</h3>
            <p className="text-gray-600 text-sm">JS, TS, Python, Java, .NET & more. Our team is our greatest asset.</p>
          </div>
          {/* Feature 2: Global Presence */}
          <div className="p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow">
            <Globe size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Global Reach, Local Expertise</h3>
            <p className="text-gray-600 text-sm">Vancouver HQ, Canada & East Asia branch. We understand diverse markets.</p>
          </div>
          {/* Feature 3: Proven Experience */}
          <div className="p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow">
            <Briefcase size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Extensive Experience</h3>
            <p className="text-gray-600 text-sm">Years of demonstrated accomplishments and successful project deliveries.</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            href="/about" // Link to the full "About Us" page
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition-colors"
          >
            {translations.aboutSummary.learnMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
```react
// Filename: app/_components/ServicesSummary.js
// This component displays a summary of the services offered on the homepage.
// It includes a title, a brief overview, a list of key services, and a link to the full "Services" page.
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { CheckCircle, Code, Smartphone, Cloud, Brain, Search } from 'lucide-react'; // Icons for services

export default function ServicesSummary() {
  const { translations } = useLanguage();

  // Mapping service names to icons for dynamic rendering
  const serviceIcons = {
    'Custom Web Development': <Code size={24} className="mr-3 text-indigo-500" />,
    'Mobile App Development': <Smartphone size={24} className="mr-3 text-pink-500" />,
    'Cloud Solutions & DevOps': <Cloud size={24} className="mr-3 text-sky-500" />,
    'AI & Machine Learning': <Brain size={24} className="mr-3 text-teal-500" />,
    'QA & Testing': <Search size={24} className="mr-3 text-amber-500" />,
  };

  return (
    <section className="py-12 md:py-16 bg-gray-100 rounded-lg shadow-lg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {translations.servicesSummary.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translations.servicesSummary.content}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 md:mb-12">
          {translations.servicesSummary.services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-3">
                {serviceIcons[service.name] || <CheckCircle size={24} className="mr-3 text-green-500" /> } {/* Fallback icon */}
                <h3 className="text-xl font-semibold text-gray-700">{service.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/services" // Link to the full "Services" page
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition-colors"
          >
            {translations.servicesSummary.seeAllServices}
          </Link>
        </div>
      </div>
    </section>
  );
}
```react
// Filename: app/_components/PortfolioPreview.js
// This component showcases a preview of company projects on the homepage.
// It includes a title, a few example projects, and a link to the full "Portfolio" page.
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Eye } from 'lucide-react'; // Icon for viewing project

export default function PortfolioPreview() {
  const { translations } = useLanguage();

  // Placeholder project data (to be replaced with actual data or fetched from an API)
  const projects = translations.portfolioPreview.projects.slice(0,3); // Show first 3 for preview

  return (
    <section className="py-12 md:py-16 bg-white rounded-lg shadow-lg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {translations.portfolioPreview.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 md:mb-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
              {/* Placeholder for project image - replace with actual image component if available */}
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Project Image Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-1"><strong>Tech:</strong> {project.tech}</p>
                <p className="text-gray-600 text-sm mb-4 truncate group-hover:whitespace-normal group-hover:overflow-visible">
                  {project.description}
                </p>
                <Link
                  href={`/portfolio/${project.id}`} // Link to individual project page (if exists)
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  {translations.portfolioPreview.viewProject} <Eye size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/portfolio" // Link to the full "Portfolio" page
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition-colors"
          >
            {translations.portfolioPreview.allProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}
```react
// Filename: app/_components/TestimonialsPreview.js
// This component displays a preview of client testimonials on the homepage.
// It includes a title, a few example testimonials, and a link to the full "Testimonials" page.
'use client';

import { useLanguage } from './LanguageContext';
import Link from 'next/link';
import { Star, MessageSquare } from 'lucide-react'; // Icons for testimonials

export default function TestimonialsPreview() {
  const { translations } = useLanguage();

  // Placeholder testimonial data (to be replaced with actual data)
  const testimonials = translations.testimonialsPreview.testimonials.slice(0,2); // Show first 2 for preview

  return (
    <section className="py-12 md:py-16 bg-blue-50 rounded-lg shadow-lg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {translations.testimonialsPreview.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10 md:mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold mr-4">
                  {testimonial.name.substring(0, 1)} {/* Initial of the name */}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  {/* Optional: Add stars for rating */}
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic relative">
                <MessageSquare size={20} className="absolute -top-1 -left-2 text-blue-200 transform rotate-12 opacity-50" />
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/testimonials" // Link to the full "Testimonials" page
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition-colors"
          >
            {translations.testimonialsPreview.moreTestimonials}
          </Link>
        </div>
      </div>
    </section>
  );
}
```react
// Filename: app/_components/ContactSnippet.js
// This component provides a quick call-to-action for contacting the company,
// typically placed towards the end of the homepage.
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Send } from 'lucide-react';

export default function ContactSnippet() {
  const { translations } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-xl">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {translations.contactSnippet.title}
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-indigo-100">
          {translations.contactSnippet.description}
        </p>
        <Link
          href="/contact"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg inline-flex items-center transition-transform transform hover:scale-105 shadow-md"
        >
          {translations.contactSnippet.cta}
          <Send size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}
```react
// Filename: app/about/page.js
// This is the "About Us" page.
// It will provide detailed information about BestITConsulting Ltd.
'use client';

import { useLanguage } from '../_components/LanguageContext';
import { Users, Globe, Briefcase, Award, Target, Lightbulb, MapPin } from 'lucide-react'; // Added MapPin

export default function AboutPage() {
  const { translations } = useLanguage();

  // Placeholder for detailed content, ideally fetched or managed elsewhere
  const aboutContent = {
    en: {
      title: "About BestITConsulting Ltd",
      intro: "We are a dynamic and forward-thinking software outsourcing company dedicated to helping businesses achieve their technological goals. With a strong foundation in innovation and a commitment to excellence, we deliver cutting-edge solutions tailored to your unique needs.",
      mission: {
        title: "Our Mission",
        text: "To empower businesses worldwide with superior software solutions, driven by expertise, collaboration, and a passion for technology. We strive to be a trusted partner in our clients' success stories."
      },
      vision: {
        title: "Our Vision",
        text: "To be a globally recognized leader in software outsourcing, known for our innovative approaches, exceptional talent, and unwavering commitment to client satisfaction and technological advancement."
      },
      team: {
        title: "Our Expert Team",
        text: "Our core strength lies in our team of highly skilled and experienced full-stack engineers. Proficient in a wide range of technologies including JavaScript (React, Node.js, Next.js), TypeScript, Python (Django, Flask), Java (Spring Boot), .NET, and more. We foster a culture of continuous learning and collaboration to stay at the forefront of technology.",
        skills: ["JavaScript & TypeScript", "Python & Django/Flask", "Java & Spring Boot", ".NET Core & Framework", "React, Angular, Vue.js", "Node.js & Express", "Cloud Platforms (AWS, Azure, GCP)", "DevOps & CI/CD", "Database Management (SQL & NoSQL)", "AI & Machine Learning"]
      },
      locations: {
        title: "Our Global Presence",
        text: "Strategically headquartered in Vancouver, Canada, a vibrant hub for technological innovation, we also operate a key branch in East Asia. This dual presence allows us to leverage global talent pools, offer round-the-clock support, and provide cost-effective solutions while maintaining close collaboration with our clients across different time zones."
      },
      achievements: {
        title: "Proven Accomplishments",
        text: "Over the years, BestITConsulting Ltd has successfully delivered a multitude of projects across various industries, including e-commerce, healthcare, finance, logistics, and education. Our portfolio showcases our ability to tackle complex challenges and deliver robust, scalable, and user-friendly software. We pride ourselves on high client retention rates and positive feedback, reflecting our dedication to quality and results."
      }
    },
    fr: {
      title: "À Propos de BestITConsulting Ltd",
      intro: "Nous sommes une entreprise d'externalisation de logiciels dynamique et avant-gardiste, dédiée à aider les entreprises à atteindre leurs objectifs technologiques. Avec une base solide en innovation et un engagement envers l'excellence, nous fournissons des solutions de pointe adaptées à vos besoins uniques.",
      mission: {
        title: "Notre Mission",
        text: "Donner aux entreprises du monde entier les moyens de disposer de solutions logicielles supérieures, grâce à l'expertise, la collaboration et une passion pour la technologie. Nous nous efforçons d'être un partenaire de confiance dans les réussites de nos clients."
      },
      vision: {
        title: "Notre Vision",
        text: "Être un leader mondialement reconnu dans l'externalisation de logiciels, connu pour nos approches innovantes, nos talents exceptionnels et notre engagement indéfectible envers la satisfaction client et le progrès technologique."
      },
      team: {
        title: "Notre Équipe d'Experts",
        text: "Notre force principale réside dans notre équipe d'ingénieurs full-stack hautement qualifiés et expérimentés. Maîtrisant un large éventail de technologies, notamment JavaScript (React, Node.js, Next.js), TypeScript, Python (Django, Flask), Java (Spring Boot), .NET, et plus encore. Nous favorisons une culture d'apprentissage continu et de collaboration pour rester à la pointe de la technologie.",
        skills: ["JavaScript & TypeScript", "Python & Django/Flask", "Java & Spring Boot", ".NET Core & Framework", "React, Angular, Vue.js", "Node.js & Express", "Plateformes Cloud (AWS, Azure, GCP)", "DevOps & CI/CD", "Gestion de Bases de Données (SQL & NoSQL)", "IA & Apprentissage Automatique"]
      },
      locations: {
        title: "Notre Présence Mondiale",
        text: "Avec un siège stratégique à Vancouver, Canada, un centre dynamique d'innovation technologique, nous exploitons également une succursale clé en Asie de l'Est. Cette double présence nous permet de tirer parti des viviers de talents mondiaux, d'offrir un support continu et de fournir des solutions rentables tout en maintenant une collaboration étroite avec nos clients à travers différents fuseaux horaires."
      },
      achievements: {
        title: "Réalisations Éprouvées",
        text: "Au fil des ans, BestITConsulting Ltd a livré avec succès une multitude de projets dans divers secteurs, notamment le commerce électronique, la santé, la finance, la logistique et l'éducation. Notre portefeuille illustre notre capacité à relever des défis complexes et à fournir des logiciels robustes, évolutifs et conviviaux. Nous sommes fiers de nos taux élevés de fidélisation client et de nos retours positifs, reflétant notre dévouement à la qualité et aux résultats."
      }
    },
    es: {
        title: "Acerca de BestITConsulting Ltd",
        intro: "Somos una empresa de outsourcing de software dinámica y con visión de futuro, dedicada a ayudar a las empresas a alcanzar sus objetivos tecnológicos. Con una sólida base en innovación y un compromiso con la excelencia, ofrecemos soluciones de vanguardia adaptadas a sus necesidades únicas.",
        mission: {
            title: "Nuestra Misión",
            text: "Empoderar a las empresas de todo el mundo con soluciones de software superiores, impulsadas por la experiencia, la colaboración y la pasión por la tecnología. Nos esforzamos por ser un socio de confianza en las historias de éxito de nuestros clientes."
        },
        vision: {
            title: "Nuestra Visión",
            text: "Ser un líder reconocido a nivel mundial en outsourcing de software, conocido por nuestros enfoques innovadores, talento excepcional y compromiso inquebrantable con la satisfacción del cliente y el avance tecnológico."
        },
        team: {
            title: "Nuestro Equipo de Expertos",
            text: "Nuestra principal fortaleza radica en nuestro equipo de ingenieros full-stack altamente cualificados y experimentados. Competentes en una amplia gama de tecnologías, incluyendo JavaScript (React, Node.js, Next.js), TypeScript, Python (Django, Flask), Java (Spring Boot), .NET, y más. Fomentamos una cultura de aprendizaje continuo y colaboración para mantenernos a la vanguardia de la tecnología.",
            skills: ["JavaScript & TypeScript", "Python & Django/Flask", "Java & Spring Boot", ".NET Core & Framework", "React, Angular, Vue.js", "Node.js & Express", "Plataformas Cloud (AWS, Azure, GCP)", "DevOps & CI/CD", "Gestión de Bases de Datos (SQL & NoSQL)", "IA & Aprendizaje Automático"]
        },
        locations: {
            title: "Nuestra Presencia Global",
            text: "Con sede estratégica en Vancouver, Canadá, un vibrante centro de innovación tecnológica, también operamos una sucursal clave en Asia Oriental. Esta doble presencia nos permite aprovechar los grupos de talento globales, ofrecer soporte continuo y proporcionar soluciones rentables mientras mantenemos una estrecha colaboración con nuestros clientes en diferentes zonas horarias."
        },
        achievements: {
            title: "Logros Demostrados",
            text: "A lo largo de los años, BestITConsulting Ltd ha entregado con éxito una multitud de proyectos en diversas industrias, incluyendo comercio electrónico, salud, finanzas, logística y educación. Nuestro portafolio demuestra nuestra capacidad para abordar desafíos complejos y entregar software robusto, escalable y fácil de usar. Nos enorgullecemos de las altas tasas de retención de clientes y los comentarios positivos, lo que refleja nuestra dedicación a la calidad y los resultados."
        }
    },
    cn: {
        title: "关于 BestITConsulting Ltd",
        intro: "我们是一家充满活力、具有前瞻性的软件外包公司，致力于帮助企业实现其技术目标。凭借坚实的创新基础和对卓越的承诺，我们提供根据您的独特需求量身定制的尖端解决方案。",
        mission: {
            title: "我们的使命",
            text: "凭借专业知识、协作精神和对技术的热情，为全球企业提供卓越的软件解决方案。我们努力成为客户成功故事中值得信赖的合作伙伴。"
        },
        vision: {
            title: "我们的愿景",
            text: "成为全球公认的软件外包领导者，以我们的创新方法、卓越人才以及对客户满意度和技术进步的坚定承诺而闻名。"
        },
        team: {
            title: "我们的专家团队",
            text: "我们的核心优势在于我们技艺高超、经验丰富的全栈工程师团队。精通各种技术，包括 JavaScript (React, Node.js, Next.js)、TypeScript、Python (Django, Flask)、Java (Spring Boot)、.NET 等。我们培养持续学习和协作的文化，以保持技术领先地位。",
            skills: ["JavaScript & TypeScript", "Python & Django/Flask", "Java & Spring Boot", ".NET Core & Framework", "React, Angular, Vue.js", "Node.js & Express", "云平台 (AWS, Azure, GCP)", "DevOps & CI/CD", "数据库管理 (SQL & NoSQL)", "人工智能与机器学习"]
        },
        locations: {
            title: "我们的全球业务",
            text: "战略总部设在加拿大温哥华这个充满活力的技术创新中心，同时我们还在东亚设有一个重要的分支机构。这种双重布局使我们能够利用全球人才库，提供全天候支持，并提供具有成本效益的解决方案，同时与不同时区的客户保持密切合作。"
        },
        achievements: {
            title: "已证实的成就",
            text: "多年来，BestITConsulting Ltd 已成功交付了众多跨行业的项目，包括电子商务、医疗保健、金融、物流和教育。我们的项目案例展示了我们应对复杂挑战并交付强大、可扩展且用户友好的软件的能力。我们为高客户保留率和积极反馈感到自豪，这反映了我们对质量和成果的执着追求。"
        }
    }
  };
  
  const currentContent = aboutContent[translations.language] || aboutContent.en;


  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 space-y-12 md:space-y-16">
        {/* Page Header */}
        <header className="text-center border-b pb-8 border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">{currentContent.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.intro}</p>
        </header>

        {/* Mission and Vision */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <Target size={40} className="mb-3 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{currentContent.mission.title}</h2>
            <p className="text-gray-700 leading-relaxed">{currentContent.mission.text}</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow-md">
            <Lightbulb size={40} className="mb-3 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{currentContent.vision.title}</h2>
            <p className="text-gray-700 leading-relaxed">{currentContent.vision.text}</p>
          </div>
        </section>

        {/* Our Expert Team */}
        <section className="p-8 bg-gray-50 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <Users size={60} className="text-indigo-600 mb-6 md:mb-0 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{currentContent.team.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{currentContent.team.text}</p>
              <div className="flex flex-wrap gap-3">
                {currentContent.team.skills.map(skill => (
                  <span key={skill} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="p-8 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
                <Globe size={60} className="text-teal-600 mb-6 md:mb-0 flex-shrink-0" />
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{currentContent.locations.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">{currentContent.locations.text}</p>
                    <div className="space-y-2">
                        <p className="font-medium text-gray-700"><MapPin size={16} className="inline mr-2 text-teal-500" />Vancouver, Canada (HQ)</p>
                        <p className="font-medium text-gray-700"><MapPin size={16} className="inline mr-2 text-teal-500" />East Asia Branch</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Proven Accomplishments */}
        <section className="p-8 bg-purple-50 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
                <Award size={60} className="text-purple-600 mb-6 md:mb-0 flex-shrink-0" />
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{currentContent.achievements.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{currentContent.achievements.text}</p>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}
```react
// Filename: app/services/page.js
// This is the "Services" page.
// It will detail the various software outsourcing services offered by BestITConsulting Ltd.
'use client';

import { useLanguage } from '../_components/LanguageContext';
import { Code, Smartphone, Cloud, Brain, Search, Settings, Users, ShieldCheck, Zap } from 'lucide-react';

export default function ServicesPage() {
  const { translations } = useLanguage(); // Using existing translations, assuming they might have a services section

  // More detailed service descriptions, ideally fetched or managed in a CMS/translations file
  const servicesContent = {
    en: {
      title: "Our Comprehensive Software Services",
      intro: "At BestITConsulting Ltd, we offer a wide spectrum of software development and outsourcing services designed to empower your business. Our expert teams leverage the latest technologies and agile methodologies to deliver solutions that are not only robust and scalable but also perfectly aligned with your strategic objectives.",
      serviceCategories: [
        {
          name: "Custom Software Development",
          icon: Code,
          color: "text-blue-600",
          description: "Tailored software solutions built from the ground up to meet your specific business needs. We cover the full lifecycle from ideation and design to development, deployment, and ongoing maintenance.",
          items: ["Enterprise Web Applications", "SaaS Product Development", "API Development & Integration", "Legacy System Modernization"]
        },
        {
          name: "Web Development",
          icon: Zap, // Using Zap for dynamic web
          color: "text-indigo-600",
          description: "Crafting responsive, high-performance, and visually appealing websites and web applications. We focus on user experience (UX) and search engine optimization (SEO) to ensure maximum impact.",
          items: ["Frontend Development (React, Angular, Vue.js)", "Backend Development (Node.js, Python, Java, .NET)", "E-commerce Solutions", "Content Management Systems (CMS)"]
        },
        {
          name: "Mobile App Development",
          icon: Smartphone,
          color: "text-green-600",
          description: "Building native and cross-platform mobile applications for iOS and Android. Our apps are designed for optimal performance, usability, and engagement.",
          items: ["Native iOS (Swift, Objective-C)", "Native Android (Kotlin, Java)", "Cross-Platform (React Native, Flutter)", "Mobile UI/UX Design"]
        },
        {
          name: "Cloud Solutions & DevOps",
          icon: Cloud,
          color: "text-sky-600",
          description: "Helping you leverage the power of the cloud with services ranging from migration and architecture design to CI/CD pipeline implementation and infrastructure management.",
          items: ["AWS, Azure, GCP Expertise", "Cloud Migration & Modernization", "Containerization (Docker, Kubernetes)", "Infrastructure as Code (IaC)", "Automated CI/CD Pipelines"]
        },
        {
          name: "AI & Machine Learning",
          icon: Brain,
          color: "text-purple-600",
          description: "Developing intelligent solutions using Artificial Intelligence and Machine Learning to automate processes, derive insights from data, and create innovative products.",
          items: ["Custom AI Model Development", "Natural Language Processing (NLP)", "Computer Vision", "Predictive Analytics", "Data Science Services"]
        },
        {
          name: "QA & Software Testing",
          icon: ShieldCheck, // Using ShieldCheck for reliability
          color: "text-red-600",
          description: "Ensuring the quality, reliability, and performance of your software through comprehensive testing strategies and methodologies.",
          items: ["Manual & Automated Testing", "Performance & Load Testing", "Security Testing", "Usability Testing", "API Testing"]
        },
        {
          name: "Dedicated Development Teams",
          icon: Users,
          color: "text-amber-600",
          description: "Augment your in-house team or build a complete remote team with our skilled developers, QAs, and project managers, perfectly matched to your project requirements and company culture.",
          items: ["Flexible Engagement Models", "Full-Stack Expertise", "Project Management Support", "Transparent Communication"]
        },
        {
          name: "IT Consulting & Strategy",
          icon: Settings,
          color: "text-gray-600",
          description: "Providing expert advice and strategic guidance to help you navigate complex technological challenges, optimize your IT infrastructure, and align technology with your business goals.",
          items: ["Technology Roadmap Planning", "Digital Transformation Strategy", "Software Architecture Review", "Process Optimization"]
        }
      ]
    },
    // ... Add fr, es, cn translations similarly
    fr: {
      title: "Nos Services Logiciels Complets",
      intro: "Chez BestITConsulting Ltd, nous offrons un large éventail de services de développement et d'externalisation de logiciels conçus pour dynamiser votre entreprise. Nos équipes d'experts exploitent les dernières technologies et méthodologies agiles pour fournir des solutions non seulement robustes et évolutives, mais aussi parfaitement alignées sur vos objectifs stratégiques.",
      serviceCategories: [
        {
          name: "Développement de Logiciels sur Mesure",
          icon: Code,
          color: "text-blue-600",
          description: "Solutions logicielles sur mesure, conçues de A à Z pour répondre à vos besoins métier spécifiques. Nous couvrons l'ensemble du cycle de vie, de l'idéation et la conception au développement, au déploiement et à la maintenance continue.",
          items: ["Applications Web d'Entreprise", "Développement de Produits SaaS", "Développement et Intégration d'API", "Modernisation de Systèmes Existants"]
        },
        {
          name: "Développement Web",
          icon: Zap,
          color: "text-indigo-600",
          description: "Création de sites et applications web réactifs, performants et visuellement attrayants. Nous nous concentrons sur l'expérience utilisateur (UX) et l'optimisation pour les moteurs de recherche (SEO) afin d'assurer un impact maximal.",
          items: ["Développement Frontend (React, Angular, Vue.js)", "Développement Backend (Node.js, Python, Java, .NET)", "Solutions E-commerce", "Systèmes de Gestion de Contenu (CMS)"]
        },
        // ... (Translate other categories and items)
         {
          name: "Développement d'Applications Mobiles",
          icon: Smartphone,
          color: "text-green-600",
          description: "Création d'applications mobiles natives et multiplateformes pour iOS et Android. Nos applications sont conçues pour des performances, une convivialité et un engagement optimaux.",
          items: ["iOS Natif (Swift, Objective-C)", "Android Natif (Kotlin, Java)", "Multiplateforme (React Native, Flutter)", "Design UI/UX Mobile"]
        },
        {
          name: "Solutions Cloud & DevOps",
          icon: Cloud,
          color: "text-sky-600",
          description: "Vous aider à exploiter la puissance du cloud avec des services allant de la migration et de la conception d'architecture à la mise en œuvre de pipelines CI/CD et à la gestion d'infrastructure.",
          items: ["Expertise AWS, Azure, GCP", "Migration et Modernisation Cloud", "Conteneurisation (Docker, Kubernetes)", "Infrastructure en tant que Code (IaC)", "Pipelines CI/CD Automatisés"]
        },
        {
          name: "IA & Apprentissage Automatique",
          icon: Brain,
          color: "text-purple-600",
          description: "Développement de solutions intelligentes utilisant l'Intelligence Artificielle et l'Apprentissage Automatique pour automatiser les processus, extraire des informations des données et créer des produits innovants.",
          items: ["Développement de Modèles IA Personnalisés", "Traitement du Langage Naturel (NLP)", "Vision par Ordinateur", "Analyse Prédictive", "Services de Science des Données"]
        },
        {
          name: "AQ & Tests Logiciels",
          icon: ShieldCheck,
          color: "text-red-600",
          description: "Assurer la qualité, la fiabilité et les performances de vos logiciels grâce à des stratégies et méthodologies de test complètes.",
          items: ["Tests Manuels et Automatisés", "Tests de Performance et de Charge", "Tests de Sécurité", "Tests d'Utilisabilité", "Tests d'API"]
        },
        {
          name: "Équipes de Développement Dédiées",
          icon: Users,
          color: "text-amber-600",
          description: "Augmentez votre équipe interne ou constituez une équipe distante complète avec nos développeurs, testeurs AQ et chefs de projet qualifiés, parfaitement adaptés aux exigences de votre projet et à la culture de votre entreprise.",
          items: ["Modèles d'Engagement Flexibles", "Expertise Full-Stack", "Support en Gestion de Projet", "Communication Transparente"]
        },
        {
          name: "Conseil & Stratégie Informatique",
          icon: Settings,
          color: "text-gray-600",
          description: "Fournir des conseils d'experts et une orientation stratégique pour vous aider à relever des défis technologiques complexes, optimiser votre infrastructure informatique et aligner la technologie sur vos objectifs commerciaux.",
          items: ["Planification de la Feuille de Route Technologique", "Stratégie de Transformation Numérique", "Revue d'Architecture Logicielle", "Optimisation des Processus"]
        }
      ]
    },
    es: {
      title: "Nuestros Servicios Completos de Software",
      intro: "En BestITConsulting Ltd, ofrecemos un amplio espectro de servicios de desarrollo y outsourcing de software diseñados para potenciar su negocio. Nuestros equipos de expertos aprovechan las últimas tecnologías y metodologías ágiles para ofrecer soluciones que no solo son robustas y escalables, sino también perfectamente alineadas con sus objetivos estratégicos.",
      serviceCategories: [
        {
          name: "Desarrollo de Software a Medida",
          icon: Code,
          color: "text-blue-600",
          description: "Soluciones de software personalizadas construidas desde cero para satisfacer sus necesidades comerciales específicas. Cubrimos el ciclo de vida completo desde la ideación y el diseño hasta el desarrollo, la implementación y el mantenimiento continuo.",
          items: ["Aplicaciones Web Empresariales", "Desarrollo de Productos SaaS", "Desarrollo e Integración de API", "Modernización de Sistemas Heredados"]
        },
        {
          name: "Desarrollo Web",
          icon: Zap,
          color: "text-indigo-600",
          description: "Creación de sitios web y aplicaciones web responsivos, de alto rendimiento y visualmente atractivos. Nos enfocamos en la experiencia del usuario (UX) y la optimización para motores de búsqueda (SEO) para garantizar el máximo impacto.",
          items: ["Desarrollo Frontend (React, Angular, Vue.js)", "Desarrollo Backend (Node.js, Python, Java, .NET)", "Soluciones de Comercio Electrónico", "Sistemas de Gestión de Contenidos (CMS)"]
        },
        // ... (Translate other categories and items)
        {
          name: "Desarrollo de Aplicaciones Móviles",
          icon: Smartphone,
          color: "text-green-600",
          description: "Construcción de aplicaciones móviles nativas y multiplataforma para iOS y Android. Nuestras aplicaciones están diseñadas para un rendimiento, usabilidad y compromiso óptimos.",
          items: ["iOS Nativo (Swift, Objective-C)", "Android Nativo (Kotlin, Java)", "Multiplataforma (React Native, Flutter)", "Diseño UI/UX Móvil"]
        },
        {
          name: "Soluciones Cloud y DevOps",
          icon: Cloud,
          color: "text-sky-600",
          description: "Ayudándole a aprovechar el poder de la nube con servicios que van desde la migración y el diseño de arquitectura hasta la implementación de pipelines CI/CD y la gestión de infraestructura.",
          items: ["Experiencia en AWS, Azure, GCP", "Migración y Modernización a la Nube", "Contenerización (Docker, Kubernetes)", "Infraestructura como Código (IaC)", "Pipelines CI/CD Automatizados"]
        },
        {
          name: "IA y Aprendizaje Automático",
          icon: Brain,
          color: "text-purple-600",
          description: "Desarrollo de soluciones inteligentes utilizando Inteligencia Artificial y Aprendizaje Automático para automatizar procesos, obtener información de los datos y crear productos innovadores.",
          items: ["Desarrollo de Modelos de IA Personalizados", "Procesamiento de Lenguaje Natural (NLP)", "Visión por Computadora", "Análisis Predictivo", "Servicios de Ciencia de Datos"]
        },
        {
          name: "QA y Pruebas de Software",
          icon: ShieldCheck,
          color: "text-red-600",
          description: "Asegurando la calidad, confiabilidad y rendimiento de su software a través de estrategias y metodologías de prueba integrales.",
          items: ["Pruebas Manuales y Automatizadas", "Pruebas de Rendimiento y Carga", "Pruebas de Seguridad", "Pruebas de Usabilidad", "Pruebas de API"]
        },
        {
          name: "Equipos de Desarrollo Dedicados",
          icon: Users,
          color: "text-amber-600",
          description: "Aumente su equipo interno o cree un equipo remoto completo con nuestros desarrolladores, QAs y gerentes de proyecto calificados, perfectamente adaptados a los requisitos de su proyecto y la cultura de su empresa.",
          items: ["Modelos de Contratación Flexibles", "Experiencia Full-Stack", "Soporte en Gestión de Proyectos", "Comunicación Transparente"]
        },
        {
          name: "Consultoría y Estrategia de TI",
          icon: Settings,
          color: "text-gray-600",
          description: "Proporcionando asesoramiento experto y orientación estratégica para ayudarle a navegar desafíos tecnológicos complejos, optimizar su infraestructura de TI y alinear la tecnología con sus objetivos comerciales.",
          items: ["Planificación de Hoja de Ruta Tecnológica", "Estrategia de Transformación Digital", "Revisión de Arquitectura de Software", "Optimización de Procesos"]
        }
      ]
    },
    cn: {
      title: "我们的综合软件服务",
      intro: "在 BestITConsulting Ltd，我们提供广泛的软件开发和外包服务，旨在为您的业务赋能。我们的专家团队利用最新技术和敏捷方法论来交付不仅强大且可扩展，而且与您的战略目标完美契合的解决方案。",
      serviceCategories: [
        {
          name: "定制软件开发",
          icon: Code,
          color: "text-blue-600",
          description: "根据您的特定业务需求从头开始构建量身定制的软件解决方案。我们涵盖从构思和设计到开发、部署和持续维护的整个生命周期。",
          items: ["企业 Web 应用程序", "SaaS 产品开发", "API 开发与集成", "旧系统现代化"]
        },
        {
          name: "Web 开发",
          icon: Zap,
          color: "text-indigo-600",
          description: "打造响应迅速、高性能且视觉效果吸引人的网站和 Web 应用程序。我们专注于用户体验 (UX) 和搜索引擎优化 (SEO)，以确保最大程度的影响力。",
          items: ["前端开发 (React, Angular, Vue.js)", "后端开发 (Node.js, Python, Java, .NET)", "电子商务解决方案", "内容管理系统 (CMS)"]
        },
        // ... (Translate other categories and items)
        {
          name: "移动应用开发",
          icon: Smartphone,
          color: "text-green-600",
          description: "为 iOS 和 Android 构建原生和跨平台移动应用程序。我们的应用程序旨在实现最佳性能、可用性和参与度。",
          items: ["原生 iOS (Swift, Objective-C)", "原生 Android (Kotlin, Java)", "跨平台 (React Native, Flutter)", "移动 UI/UX 设计"]
        },
        {
          name: "云解决方案与 DevOps",
          icon: Cloud,
          color: "text-sky-600",
          description: "通过从迁移和架构设计到 CI/CD 管道实施和基础设施管理等服务，帮助您利用云的力量。",
          items: ["AWS、Azure、GCP 专业知识", "云迁移与现代化", "容器化 (Docker, Kubernetes)", "基础设施即代码 (IaC)", "自动化 CI/CD 管道"]
        },
        {
          name: "人工智能与机器学习",
          icon: Brain,
          color: "text-purple-600",
          description: "利用人工智能和机器学习开发智能解决方案，以实现流程自动化、从数据中获取洞察并创造创新产品。",
          items: ["定制人工智能模型开发", "自然语言处理 (NLP)", "计算机视觉", "预测分析", "数据科学服务"]
        },
        {
          name: "质量保证与软件测试",
          icon: ShieldCheck,
          color: "text-red-600",
          description: "通过全面的测试策略和方法确保您的软件的质量、可靠性和性能。",
          items: ["手动和自动化测试", "性能和负载测试", "安全测试", "可用性测试", "API 测试"]
        },
        {
          name: "专属开发团队",
          icon: Users,
          color: "text-amber-600",
          description: "通过我们技术娴熟的开发人员、QA 和项目经理来扩充您的内部团队或组建一个完整的远程团队，他们将完美匹配您的项目需求和公司文化。",
          items: ["灵活的合作模式", "全栈专业知识", "项目管理支持", "透明沟通"]
        },
        {
          name: "IT 咨询与战略",
          icon: Settings,
          color: "text-gray-600",
          description: "提供专家建议和战略指导，帮助您应对复杂的技术挑战，优化您的 IT 基础设施，并使技术与您的业务目标保持一致。",
          items: ["技术路线图规划", "数字化转型战略", "软件架构审查", "流程优化"]
        }
      ]
    }
  };

  const currentContent = servicesContent[translations.language] || servicesContent.en;

  // Helper icon (if not already defined, or for consistency)
  const CheckCircle = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">{currentContent.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.intro}</p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.serviceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-4">
                  <IconComponent size={36} className={`${category.color} mr-4 flex-shrink-0`} />
                  <h2 className="text-2xl font-semibold text-gray-800">{category.name}</h2>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{category.description}</p>
                <ul className="space-y-2 text-sm">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```react
// Filename: app/portfolio/page.js
// This is the "Portfolio" page.
// It will showcase various projects completed by BestITConsulting Ltd.
'use client';

import { useLanguage } from '../_components/LanguageContext';
import Link from 'next/link';
import { Briefcase, ExternalLink, Calendar, Users as TeamIcon } from 'lucide-react';

export default function PortfolioPage() {
  const { translations } = useLanguage();

  // Placeholder for detailed project data - ideally fetched from a CMS or API
  const portfolioContent = {
    en: {
      title: "Our Success Stories",
      intro: "Explore a selection of projects that demonstrate our expertise, commitment to quality, and ability to deliver impactful software solutions across various industries. Each project reflects our dedication to understanding client needs and exceeding expectations.",
      projects: [
        {
          id: "ecommerce-revamp",
          name: "E-commerce Platform Revamp for Global Retailer",
          industry: "E-commerce",
          date: "2023",
          client: "Global Fashion Co.",
          technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Stripe"],
          description: "Led the complete overhaul of an international e-commerce platform, focusing on scalability, performance, and user experience. Implemented a new microservices architecture, redesigned the UI/UX, and integrated advanced analytics. Resulted in a 60% improvement in page load times and a 40% increase in conversion rates.",
          imageUrl: "[https://placehold.co/600x400/3498db/ffffff?text=E-commerce+Platform](https://placehold.co/600x400/3498db/ffffff?text=E-commerce+Platform)",
          link: "#" // Placeholder for actual project link or case study
        },
        {
          id: "healthcare-system",
          name: "HIPAA-Compliant Healthcare Management System",
          industry: "Healthcare",
          date: "2022",
          client: "MediCare Solutions Group",
          technologies: ["Java Spring Boot", "Angular", "MySQL", "Azure", "HL7/FHIR"],
          description: "Developed a secure and comprehensive healthcare management system for a network of clinics. The system handles patient records, appointment scheduling, billing, and reporting, all while ensuring strict HIPAA compliance. Streamlined clinic operations and improved patient data management.",
          imageUrl: "[https://placehold.co/600x400/2ecc71/ffffff?text=Healthcare+System](https://placehold.co/600x400/2ecc71/ffffff?text=Healthcare+System)",
          link: "#"
        },
        {
          id: "ai-logistics-optimizer",
          name: "AI-Powered Logistics & Supply Chain Optimizer",
          industry: "Logistics",
          date: "2023",
          client: "SwiftDeliveries Inc.",
          technologies: ["Python", "TensorFlow", "Flask", "Docker", "Kubernetes", "GCP"],
          description: "Created an innovative AI solution to optimize delivery routes and warehouse management for a large logistics company. The system uses machine learning algorithms to predict demand, reduce fuel consumption, and improve delivery times, leading to a 15% reduction in operational costs.",
          imageUrl: "[https://placehold.co/600x400/f39c12/ffffff?text=AI+Logistics](https://placehold.co/600x400/f39c12/ffffff?text=AI+Logistics)",
          link: "#"
        },
        {
          id: "fintech-mobile-app",
          name: "Mobile Banking Application for FinTech Startup",
          industry: "Finance",
          date: "2022",
          client: "PayWise Startups",
          technologies: ["React Native", "Firebase", "Node.js", "GraphQL"],
          description: "Designed and developed a user-friendly mobile banking application for a FinTech startup. Features include secure transactions, P2P payments, budget tracking, and investment portfolio management. Focused on robust security and intuitive UX.",
          imageUrl: "[https://placehold.co/600x400/9b59b6/ffffff?text=FinTech+App](https://placehold.co/600x400/9b59b6/ffffff?text=FinTech+App)",
          link: "#"
        },
         {
          id: "edtech-learning-platform",
          name: "Interactive E-Learning Platform",
          industry: "Education Technology",
          date: "2023",
          client: "LearnSphere Academy",
          technologies: ["Ruby on Rails", "React", "PostgreSQL", "Heroku"],
          description: "Built a comprehensive e-learning platform featuring interactive courses, video lectures, quizzes, and progress tracking for K-12 students and corporate training. The platform supports thousands of concurrent users and provides detailed analytics for educators.",
          imageUrl: "[https://placehold.co/600x400/e74c3c/ffffff?text=E-Learning+Platform](https://placehold.co/600x400/e74c3c/ffffff?text=E-Learning+Platform)",
          link: "#"
        },
        {
          id: "iot-smart-home",
          name: "IoT Smart Home Automation System",
          industry: "IoT / Smart Devices",
          date: "2022",
          client: "ConnectHome Innovations",
          technologies: ["Python (MicroPython)", "MQTT", "AWS IoT", "Vue.js"],
          description: "Developed the backend infrastructure and mobile control panel for an IoT-based smart home automation system. The system allows users to control lighting, climate, security, and appliances remotely, with a focus on energy efficiency and user convenience.",
          imageUrl: "[https://placehold.co/600x400/1abc9c/ffffff?text=Smart+Home+IoT](https://placehold.co/600x400/1abc9c/ffffff?text=Smart+Home+IoT)",
          link: "#"
        }
      ]
    },
    // ... fr, es, cn translations
    fr: {
      title: "Nos Histoires de Succès",
      intro: "Explorez une sélection de projets qui démontrent notre expertise, notre engagement envers la qualité et notre capacité à fournir des solutions logicielles percutantes dans divers secteurs. Chaque projet reflète notre dévouement à comprendre les besoins des clients et à dépasser leurs attentes.",
      projects: [
        {
          id: "ecommerce-revamp",
          name: "Refonte de Plateforme E-commerce pour Détaillant Mondial",
          industry: "E-commerce",
          date: "2023",
          client: "Global Fashion Co.",
          technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Stripe"],
          description: "Direction de la refonte complète d'une plateforme e-commerce internationale, axée sur l'évolutivité, la performance et l'expérience utilisateur. Implémentation d'une nouvelle architecture microservices, refonte de l'UI/UX et intégration d'analyses avancées. Résultat : amélioration de 60% des temps de chargement des pages et augmentation de 40% des taux de conversion.",
          imageUrl: "[https://placehold.co/600x400/3498db/ffffff?text=Plateforme+E-commerce](https://placehold.co/600x400/3498db/ffffff?text=Plateforme+E-commerce)",
          link: "#"
        },
        {
          id: "healthcare-system",
          name: "Système de Gestion des Soins de Santé Conforme HIPAA",
          industry: "Santé",
          date: "2022",
          client: "MediCare Solutions Group",
          technologies: ["Java Spring Boot", "Angular", "MySQL", "Azure", "HL7/FHIR"],
          description: "Développement d'un système de gestion des soins de santé sécurisé et complet pour un réseau de cliniques. Le système gère les dossiers patients, la planification des rendez-vous, la facturation et les rapports, tout en garantissant une stricte conformité HIPAA. Rationalisation des opérations cliniques et amélioration de la gestion des données patients.",
          imageUrl: "[https://placehold.co/600x400/2ecc71/ffffff?text=Système+de+Santé](https://placehold.co/600x400/2ecc71/ffffff?text=Système+de+Santé)",
          link: "#"
        },
        {
          id: "ai-logistics-optimizer",
          name: "Optimiseur Logistique et Chaîne d'Approvisionnement IA",
          industry: "Logistique",
          date: "2023",
          client: "SwiftDeliveries Inc.",
          technologies: ["Python", "TensorFlow", "Flask", "Docker", "Kubernetes", "GCP"],
          description: "Création d'une solution IA innovante pour optimiser les itinéraires de livraison et la gestion des entrepôts pour une grande entreprise de logistique. Le système utilise des algorithmes d'apprentissage automatique pour prédire la demande, réduire la consommation de carburant et améliorer les délais de livraison, entraînant une réduction de 15% des coûts opérationnels.",
          imageUrl: "[https://placehold.co/600x400/f39c12/ffffff?text=Logistique+IA](https://placehold.co/600x400/f39c12/ffffff?text=Logistique+IA)",
          link: "#"
        },
      ]
    },
    es: {
      title: "Nuestras Historias de Éxito",
      intro: "Explore una selección de proyectos que demuestran nuestra experiencia, compromiso con la calidad y capacidad para ofrecer soluciones de software impactantes en diversas industrias. Cada proyecto refleja nuestra dedicación para comprender las necesidades del cliente y superar las expectativas.",
      projects: [
        {
          id: "ecommerce-revamp",
          name: "Renovación de Plataforma de Comercio Electrónico para Minorista Global",
          industry: "Comercio Electrónico",
          date: "2023",
          client: "Global Fashion Co.",
          technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Stripe"],
          description: "Lideró la revisión completa de una plataforma de comercio electrónico internacional, centrándose en la escalabilidad, el rendimiento y la experiencia del usuario. Implementó una nueva arquitectura de microservicios, rediseñó la UI/UX e integró análisis avanzados. Resultó en una mejora del 60% en los tiempos de carga de la página y un aumento del 40% en las tasas de conversión.",
          imageUrl: "[https://placehold.co/600x400/3498db/ffffff?text=Plataforma+E-commerce](https://placehold.co/600x400/3498db/ffffff?text=Plataforma+E-commerce)",
          link: "#"
        },
        {
          id: "healthcare-system",
          name: "Sistema de Gestión de Salud Conforme a HIPAA",
          industry: "Salud",
          date: "2022",
          client: "MediCare Solutions Group",
          technologies: ["Java Spring Boot", "Angular", "MySQL", "Azure", "HL7/FHIR"],
          description: "Desarrolló un sistema de gestión de salud seguro y completo para una red de clínicas. El sistema maneja registros de pacientes, programación de citas, facturación e informes, todo mientras garantiza el estricto cumplimiento de HIPAA. Optimizó las operaciones de la clínica y mejoró la gestión de datos de los pacientes.",
          imageUrl: "[https://placehold.co/600x400/2ecc71/ffffff?text=Sistema+de+Salud](https://placehold.co/600x400/2ecc71/ffffff?text=Sistema+de+Salud)",
          link: "#"
        },
        {
          id: "ai-logistics-optimizer",
          name: "Optimizador de Logística y Cadena de Suministro con IA",
          industry: "Logística",
          date: "2023",
          client: "SwiftDeliveries Inc.",
          technologies: ["Python", "TensorFlow", "Flask", "Docker", "Kubernetes", "GCP"],
          description: "Creó una innovadora solución de IA para optimizar las rutas de entrega y la gestión de almacenes para una gran empresa de logística. El sistema utiliza algoritmos de aprendizaje automático para predecir la demanda, reducir el consumo de combustible y mejorar los tiempos de entrega, lo que lleva a una reducción del 15% en los costos operativos.",
          imageUrl: "[https://placehold.co/600x400/f39c12/ffffff?text=Logística+IA](https://placehold.co/600x400/f39c12/ffffff?text=Logística+IA)",
          link: "#"
        },
      ]
    },
    cn: {
      title: "我们的成功案例",
      intro: "浏览一系列精选项目，这些项目展示了我们在各个行业提供有影响力的软件解决方案的专业知识、对质量的承诺以及能力。每个项目都反映了我们致力于理解客户需求并超越期望。",
      projects: [
        {
          id: "ecommerce-revamp",
          name: "全球零售商电子商务平台改造",
          industry: "电子商务",
          date: "2023年",
          client: "Global Fashion Co.",
          technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Stripe"],
          description: "领导了一家国际电子商务平台的全面改革，重点关注可扩展性、性能和用户体验。实施了新的微服务架构，重新设计了 UI/UX，并集成了高级分析功能。最终使页面加载时间缩短了 60%，转化率提高了 40%。",
          imageUrl: "[https://placehold.co/600x400/3498db/ffffff?text=电子商务平台](https://placehold.co/600x400/3498db/ffffff?text=电子商务平台)",
          link: "#"
        },
        {
          id: "healthcare-system",
          name: "符合 HIPAA 标准的医疗管理系统",
          industry: "医疗保健",
          date: "2022年",
          client: "MediCare Solutions Group",
          technologies: ["Java Spring Boot", "Angular", "MySQL", "Azure", "HL7/FHIR"],
          description: "为一家连锁诊所开发了一个安全且全面的医疗管理系统。该系统处理患者记录、预约安排、计费和报告，同时确保严格遵守 HIPAA。简化了诊所运营并改进了患者数据管理。",
          imageUrl: "[https://placehold.co/600x400/2ecc71/ffffff?text=医疗系统](https://placehold.co/600x400/2ecc71/ffffff?text=医疗系统)",
          link: "#"
        },
        {
          id: "ai-logistics-optimizer",
          name: "人工智能驱动的物流与供应链优化器",
          industry: "物流",
          date: "2023年",
          client: "SwiftDeliveries Inc.",
          technologies: ["Python", "TensorFlow", "Flask", "Docker", "Kubernetes", "GCP"],
          description: "为一家大型物流公司创建了一个创新的人工智能解决方案，以优化配送路线和仓库管理。该系统使用机器学习算法预测需求、减少燃料消耗并缩短配送时间，从而使运营成本降低了 15%。",
          imageUrl: "[https://placehold.co/600x400/f39c12/ffffff?text=人工智能物流](https://placehold.co/600x400/f39c12/ffffff?text=人工智能物流)",
          link: "#"
        },
      ]
    }
  };

  const currentContent = portfolioContent[translations.language] || portfolioContent.en;

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12 md:mb-16">
          <Briefcase size={48} className="mx-auto mb-4 text-purple-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">{currentContent.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.intro}</p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {currentContent.projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 group">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-56 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="[https://placehold.co/600x400/cccccc/ffffff?text=Image+Error](https://placehold.co/600x400/cccccc/ffffff?text=Image+Error)"; }}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{project.name}</h2>
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <Briefcase size={14} className="mr-1.5" /> {project.industry}
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Calendar size={14} className="mr-1.5" /> {project.date}   |   <TeamIcon size={14} className="mr-1.5" /> {project.client}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{project.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
                {project.link && project.link !== "#" && (
                  <Link href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center text-sm text-purple-600 hover:text-purple-800 font-semibold group">
                    View Case Study <ExternalLink size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                 {project.link === "#" && (
                  <span className="mt-auto inline-flex items-center text-sm text-gray-400 font-semibold">
                    Details Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```react
// Filename: app/testimonials/page.js
// This is the "Testimonials" page.
// It will showcase client feedback and success stories.
'use client';

import { useLanguage } from '../_components/LanguageContext';
import { Star, MessageCircle } from 'lucide-react'; // Removed UserCircle, Building as they were not used.

export default function TestimonialsPage() {
  const { translations } = useLanguage();

  // Placeholder for detailed testimonial data - ideally fetched from a CMS or API
  const testimonialsContent = {
    en: {
      title: "Hear From Our Valued Clients",
      intro: "We take pride in building strong, lasting relationships with our clients. Their success is our success. Read what they have to say about their experience working with BestITConsulting Ltd.",
      testimonials: [
        {
          id: 1,
          name: "Sarah L.",
          titlePosition: "CEO",
          company: "TechSolutions Inc.",
          avatarInitial: "SL",
          quote: "BestITConsulting Ltd delivered beyond our expectations. Their team is incredibly skilled, professional, and truly understood our vision from day one. The project was completed on time and within budget. We've seen significant improvements in our platform's performance thanks to their work.",
          rating: 5,
          projectType: "E-commerce Platform Development"
        },
        {
          id: 2,
          name: "John B.",
          titlePosition: "Project Manager",
          company: "Innovate Corp.",
          avatarInitial: "JB",
          quote: "The quality of work and the communication throughout the project were outstanding. BestITConsulting's developers integrated seamlessly with our team and provided valuable insights that helped shape the final product. Highly recommend them for complex software challenges!",
          rating: 5,
          projectType: "Custom Enterprise Software"
        },
        {
          id: 3,
          name: "Emily K.",
          titlePosition: "Founder",
          company: "StartupX Ventures",
          avatarInitial: "EK",
          quote: "Working with BestITConsulting was a game-changer for us. As a startup, we needed a flexible and agile partner, and they delivered. They helped us scale our product efficiently and effectively, providing top-notch technical expertise and strategic advice.",
          rating: 5,
          projectType: "Mobile App Development"
        },
        {
          id: 4,
          name: "David R.",
          titlePosition: "CTO",
          company: "HealthData Systems",
          avatarInitial: "DR",
          quote: "Their expertise in cloud solutions and DevOps was instrumental in modernizing our infrastructure. The team was knowledgeable, responsive, and proactive in identifying potential issues. We now have a more resilient and scalable system.",
          rating: 4,
          projectType: "Cloud Migration & DevOps"
        },
        {
          id: 5,
          name: "Maria G.",
          titlePosition: "Head of Product",
          company: "LearnWell EdTech",
          avatarInitial: "MG",
          quote: "The AI-powered recommendation engine they built for our e-learning platform has significantly improved user engagement. The BestITConsulting team demonstrated deep understanding of AI/ML technologies and delivered a solution that truly adds value.",
          rating: 5,
          projectType: "AI & Machine Learning Solution"
        }
      ]
    },
    // ... fr, es, cn translations
    fr: {
      title: "Ce Que Disent Nos Précieux Clients",
      intro: "Nous sommes fiers de construire des relations solides et durables avec nos clients. Leur succès est notre succès. Lisez ce qu'ils ont à dire sur leur expérience de travail avec BestITConsulting Ltd.",
      testimonials: [
        {
          id: 1,
          name: "Sarah L.",
          titlePosition: "PDG",
          company: "TechSolutions Inc.",
          avatarInitial: "SL",
          quote: "BestITConsulting Ltd a dépassé nos attentes. Leur équipe est incroyablement compétente, professionnelle et a vraiment compris notre vision dès le premier jour. Le projet a été achevé à temps et dans le respect du budget. Nous avons constaté des améliorations significatives des performances de notre plateforme grâce à leur travail.",
          rating: 5,
          projectType: "Développement de Plateforme E-commerce"
        },
        // ... (Translate other testimonials)
        {
          id: 2,
          name: "John B.",
          titlePosition: "Chef de Projet",
          company: "Innovate Corp.",
          avatarInitial: "JB",
          quote: "La qualité du travail et la communication tout au long du projet ont été exceptionnelles. Les développeurs de BestITConsulting se sont intégrés de manière transparente à notre équipe et ont fourni des informations précieuses qui ont contribué à façonner le produit final. Je les recommande vivement pour les défis logiciels complexes !",
          rating: 5,
          projectType: "Logiciel d'Entreprise Personnalisé"
        },
      ]
    },
    es: {
      title: "Escuche a Nuestros Valiosos Clientes",
      intro: "Nos enorgullecemos de construir relaciones sólidas y duraderas con nuestros clientes. Su éxito es nuestro éxito. Lea lo que tienen que decir sobre su experiencia trabajando con BestITConsulting Ltd.",
      testimonials: [
        {
          id: 1,
          name: "Sarah L.",
          titlePosition: "CEO",
          company: "TechSolutions Inc.",
          avatarInitial: "SL",
          quote: "BestITConsulting Ltd superó nuestras expectativas. Su equipo es increíblemente talentoso, profesional y realmente entendió nuestra visión desde el primer día. El proyecto se completó a tiempo y dentro del presupuesto. Hemos visto mejoras significativas en el rendimiento de nuestra plataforma gracias a su trabajo.",
          rating: 5,
          projectType: "Desarrollo de Plataforma de Comercio Electrónico"
        },
        // ... (Translate other testimonials)
        {
          id: 2,
          name: "John B.",
          titlePosition: "Gerente de Proyecto",
          company: "Innovate Corp.",
          avatarInitial: "JB",
          quote: "La calidad del trabajo y la comunicación durante todo el proyecto fueron sobresalientes. Los desarrolladores de BestITConsulting se integraron perfectamente con nuestro equipo y proporcionaron información valiosa que ayudó a dar forma al producto final. ¡Los recomiendo encarecidamente para desafíos de software complejos!",
          rating: 5,
          projectType: "Software Empresarial Personalizado"
        },
      ]
    },
    cn: {
      title: "听听我们尊贵客户的声音",
      intro: "我们为与客户建立稳固、持久的关系而感到自豪。他们的成功就是我们的成功。请阅读他们对与 BestITConsulting Ltd 合作的体验。",
      testimonials: [
        {
          id: 1,
          name: "Sarah L.",
          titlePosition: "首席执行官",
          company: "TechSolutions Inc.",
          avatarInitial: "SL",
          quote: "BestITConsulting Ltd 超出了我们的预期。他们的团队技术精湛、专业，并且从第一天起就真正理解了我们的愿景。项目按时并在预算内完成。由于他们的工作，我们平台的性能得到了显着改善。",
          rating: 5,
          projectType: "电子商务平台开发"
        },
        // ... (Translate other testimonials)
        {
          id: 2,
          name: "John B.",
          titlePosition: "项目经理",
          company: "Innovate Corp.",
          avatarInitial: "JB",
          quote: "整个项目的工作质量和沟通都非常出色。BestITConsulting 的开发人员与我们的团队无缝集成，并提供了宝贵的见解，帮助塑造了最终产品。强烈推荐他们应对复杂的软件挑战！",
          rating: 5,
          projectType: "定制企业软件"
        },
      ]
    }
  };

  const currentContent = testimonialsContent[translations.language] || testimonialsContent.en;

  return (
    <div className="bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12 md:mb-16">
          <MessageCircle size={48} className="mx-auto mb-4 text-teal-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">{currentContent.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.intro}</p>
        </header>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-2xl font-semibold mr-4 flex-shrink-0">
                  {testimonial.avatarInitial}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.titlePosition}, {testimonial.company}</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"} />
                ))}
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed mb-4 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Project Type:</span> {testimonial.projectType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```react
// Filename: app/contact/page.js
// This is the "Contact Us" page.
// It will include a contact form, address, and other contact details.
'use client';

import { useState } from 'react';
import { useLanguage } from '../_components/LanguageContext';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Type, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const { translations } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' }); // 'success' or 'error'

  const contactContent = {
    en: {
      title: "Get In Touch",
      intro: "We're excited to hear from you! Whether you have a project idea, a question about our services, or just want to say hello, please don't hesitate to reach out. Fill out the form below, or use our direct contact details.",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
        success: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        error: "Oops! Something went wrong. Please try again later or contact us directly."
      },
      directContact: "Direct Contact",
      vancouverOffice: "Vancouver HQ",
      vancouverAddr: "123 Tech Street, Vancouver, BC, V6B 1X0, Canada",
      eastAsiaOffice: "East Asia Branch",
      eastAsiaAddr: "456 Innovation Ave, Tech City, 10001",
      emailAddr: "info@bestitconsulting.com",
      phoneNum: "+1 (604) 555-1234",
      workingHours: "Our Working Hours",
      hoursDetail: "Monday - Friday: 9:00 AM - 6:00 PM (PST)"
    },
    fr: {
      title: "Contactez-Nous",
      intro: "Nous sommes ravis de vous entendre ! Que vous ayez une idée de projet, une question sur nos services ou que vous souhaitiez simplement dire bonjour, n'hésitez pas à nous contacter. Remplissez le formulaire ci-dessous ou utilisez nos coordonnées directes.",
      form: {
        name: "Nom Complet",
        email: "Adresse E-mail",
        subject: "Sujet",
        message: "Votre Message",
        send: "Envoyer le Message",
        success: "Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.",
        error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer plus tard ou nous contacter directement."
      },
      directContact: "Contact Direct",
      vancouverOffice: "Siège de Vancouver",
      vancouverAddr: "123 Rue Tech, Vancouver, BC, V6B 1X0, Canada",
      eastAsiaOffice: "Succursale d'Asie de l'Est",
      eastAsiaAddr: "456 Avenue de l'Innovation, Tech City, 10001",
      emailAddr: "info@bestitconsulting.com",
      phoneNum: "+1 (604) 555-1234",
      workingHours: "Nos Horaires d'Ouverture",
      hoursDetail: "Lundi - Vendredi : 9h00 - 18h00 (PST)"
    },
    es: {
      title: "Póngase en Contacto",
      intro: "¡Estamos emocionados de saber de usted! Ya sea que tenga una idea para un proyecto, una pregunta sobre nuestros servicios o simplemente quiera saludar, no dude en comunicarse. Complete el formulario a continuación o utilice nuestros datos de contacto directo.",
      form: {
        name: "Nombre Completo",
        email: "Dirección de Correo Electrónico",
        subject: "Asunto",
        message: "Su Mensaje",
        send: "Enviar Mensaje",
        success: "¡Gracias! Su mensaje ha sido enviado con éxito. Nos pondremos en contacto con usted pronto.",
        error: "¡Ups! Algo salió mal. Por favor, inténtelo de nuevo más tarde o contáctenos directamente."
      },
      directContact: "Contacto Directo",
      vancouverOffice: "Sede de Vancouver",
      vancouverAddr: "123 Tech Street, Vancouver, BC, V6B 1X0, Canadá",
      eastAsiaOffice: "Sucursal de Asia Oriental",
      eastAsiaAddr: "456 Innovation Ave, Tech City, 10001",
      emailAddr: "info@bestitconsulting.com",
      phoneNum: "+1 (604) 555-1234",
      workingHours: "Nuestro Horario de Atención",
      hoursDetail: "Lunes - Viernes: 9:00 AM - 6:00 PM (PST)"
    },
    cn: {
      title: "联系我们",
      intro: "我们很高兴收到您的来信！无论您有项目想法、对我们服务有疑问，还是只想打个招呼，请随时与我们联系。请填写下面的表格，或使用我们的直接联系方式。",
      form: {
        name: "全名",
        email: "电子邮件地址",
        subject: "主题",
        message: "您的留言",
        send: "发送消息",
        success: "谢谢！您的消息已成功发送。我们会尽快回复您。",
        error: "糟糕！出了一些问题。请稍后重试或直接与我们联系。"
      },
      directContact: "直接联系",
      vancouverOffice: "温哥华总部",
      vancouverAddr: "加拿大不列颠哥伦比亚省温哥华市科技街123号，V6B 1X0",
      eastAsiaOffice: "东亚分公司",
      eastAsiaAddr: "科技城创新大道456号，10001",
      emailAddr: "info@bestitconsulting.com",
      phoneNum: "+1 (604) 555-1234",
      workingHours: "我们的工作时间",
      hoursDetail: "周一至周五：上午9:00 - 下午6:00 (太平洋标准时间)"
    }
  };
  
  const currentContent = contactContent[translations.language] || contactContent.en;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' }); // Reset status

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({ type: 'error', message: 'Please fill in all fields.'}); // Simple validation message
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setFormStatus({ type: 'error', message: 'Please enter a valid email address.'});
        return;
    }

    // Simulate API call
    console.log("Form Data Submitted: ", formData); 
    // Replace with actual API endpoint call to send email or save to DB
    // For now, we'll just simulate success.
    try {
        // const response = await fetch('/api/contact', { // Example API endpoint
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // });
        // if (!response.ok) throw new Error('Network response was not ok.');
        // const result = await response.json();
        
        // Simulate success after 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));

        setFormStatus({ type: 'success', message: currentContent.form.success });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
        console.error("Form submission error:", error);
        setFormStatus({ type: 'error', message: currentContent.form.error });
    }
  };

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12 md:mb-16">
          <Mail size={48} className="mx-auto mb-4 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">{currentContent.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.intro}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{currentContent.form.name}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{currentContent.form.email}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{currentContent.form.subject}</label>
                 <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{currentContent.form.message}</label>
                <div className="relative">
                     <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                </div>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Send size={20} className="mr-2" /> {currentContent.form.send}
                </button>
              </div>
              {formStatus.message && (
                <div className={`p-3 rounded-md text-sm ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center`}>
                  {formStatus.type === 'success' ? <CheckCircle size={20} className="mr-2" /> : <AlertCircle size={20} className="mr-2" />}
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Direct Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentContent.directContact}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">{currentContent.vancouverOffice}</h3>
                  <p className="flex items-start text-gray-600">
                    <MapPin size={20} className="mr-3 mt-1 text-blue-500 flex-shrink-0" />
                    <span>{currentContent.vancouverAddr}</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">{currentContent.eastAsiaOffice}</h3>
                  <p className="flex items-start text-gray-600">
                    <MapPin size={20} className="mr-3 mt-1 text-blue-500 flex-shrink-0" />
                    <span>{currentContent.eastAsiaAddr}</span>
                  </p>
                </div>
                <p className="flex items-center text-gray-600">
                  <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                  <a href={`mailto:${currentContent.emailAddr}`} className="hover:text-blue-600">{currentContent.emailAddr}</a>
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone size={20} className="mr-3 text-blue-500 flex-shrink-0" />
                  <a href={`tel:${currentContent.phoneNum}`} className="hover:text-blue-600">{currentContent.phoneNum}</a>
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{currentContent.workingHours}</h2>
              <p className="text-gray-600">{currentContent.hoursDetail}</p>
            </div>
            {/* Optional: Embedded Map - Ensure the src is a valid embeddable URL */}
            {/* <div className="bg-white p-2 rounded-xl shadow-xl h-64 md:h-80">
              <iframe 
                src="[https://maps.google.com/maps?q=Vancouver&hl=en&z=14&output=embed](https://maps.google.com/maps?q=Vancouver&hl=en&z=14&output=embed)" // Example valid embed URL for Vancouver
                width="100%" 
                height="100%" 
                style={{ border:0, borderRadius: '0.75rem' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Vancouver Office Location"
                referrerPolicy="no-referrer-when-downgrade" // Recommended for Google Maps embeds
              ></iframe>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
```css
/* Filename: app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Basic body styling for better typography and background */
body {
  @apply bg-gray-100 text-gray-800 antialiased;
  font-family: 'Inter', sans-serif; /* Ensure Inter font is loaded if specified */
}

/* Custom scrollbar for a more modern look (optional) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  @apply bg-gray-200 rounded-full;
}
::-webkit-scrollbar-thumb {
  @apply bg-blue-500 rounded-full;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-blue-600;
}

/* Define some custom component styles if needed, or rely purely on Tailwind utility classes */
@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors;
  }
  .btn-secondary {
    @apply py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors;
  }
  .card {
    @apply bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out;
  }
  .card-hover {
    @apply hover:shadow-xl hover:scale-105;
  }
  .section-title {
    @apply text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center;
  }
  .section-subtitle {
    @apply text-lg text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-center;
  }
}

/* Ensure full height for layout */
html, body, #__next {
  height: 100%;
}
#__next > div { /* This targets the direct child div of #__next which is usually the main wrapper by Next.js */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex-grow: 1;
}

```json
// Filename: package.json
// Basic package.json for a Next.js project with Tailwind CSS and lucide-react icons.
// This file lists project dependencies and scripts.
{
  "name": "bestitconsulting-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.300.0",  // Using a recent version of lucide-react for icons
    "next": "14.2.3",           // Latest stable Next.js version as of creation
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "postcss": "^8",
    "tailwindcss": "^3.3.0"     // Latest stable Tailwind CSS version
  }
}
```json
// Filename: tailwind.config.js
// Tailwind CSS configuration file.
// Defines custom theme settings, plugins, and content paths.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include 'app' directory for Next.js 13+ App Router
  ],
  theme: {
    extend: {
      colors: {
        // Example: Define custom brand colors
        'brand-blue': '#007bff',
        'brand-navy': '#003d73',
        'brand-light': '#f8f9fa',
        'brand-dark': '#343a40',
      },
      fontFamily: {
        // Example: Add custom fonts if needed, ensure they are imported in globals.css or layout
        // sans: ['Inter', 'sans-serif'], // Inter is already set in layout.js
      },
      backgroundImage: {
        // Example: Custom gradient backgrounds
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Add any other theme extensions here
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Uncomment if you need enhanced form styling
    // require('@tailwindcss/typography'), // Uncomment for prose styling
  ],
}
