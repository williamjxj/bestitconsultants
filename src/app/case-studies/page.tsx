'use client'

import BookmarkList from '@/components/ui/bookmark-list'
import { FullWidthHeroWrapper } from '@/components/ui/full-width-hero-wrapper'
import { OurWorkHero } from '@/components/ui/hero-variants'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CaseStudiesPage() {
  const { language } = useLanguage()

  // Case Studies content with translations
  const caseStudiesContent = {
    en: {
      hero: {
        title: 'Case Studies',
        subtitle: 'Featured Projects & Partnerships',
        description:
          "Below you'll find a curated collection of external projects and tools that showcase our technical expertise and industry connections. These projects span multiple categories including business solutions, AI development, e-commerce platforms, and educational tools.",
        ctaText: 'View All Projects',
        secondaryCtaText: 'Get Started',
        badge: 'Live Projects & Demos',
      },
      stats: {
        featuredProjects: 'Featured Projects',
        featuredProjectsDesc: 'Carefully selected showcase',
        categories: 'Categories',
        categoriesDesc: 'Diverse industry focus',
        externalLinks: 'External Links',
        externalLinksDesc: 'Live projects & demos',
      },
      projects: {
        title: 'Project Showcase',
        description:
          'Discover our external collaborations and featured projects. Among our proven, demonstrated apps, here are some demo showcases you can explore directly.',
      },
      cta: {
        title: 'Ready to Start Your Project?',
        description:
          "Let's discuss how we can bring your vision to life with the same expertise and dedication shown in these projects.",
        button: 'Get Started Today',
      },
    },
    fr: {
      hero: {
        title: 'Études de Cas',
        subtitle: 'Projets Vedettes et Partenariats',
        description:
          'Vous trouverez ci-dessous une collection sélectionnée de projets et outils externes qui démontrent notre expertise technique et nos connexions industrielles. Ces projets couvrent plusieurs catégories, notamment les solutions commerciales, le développement IA, les plateformes e-commerce et les outils éducatifs.',
        ctaText: 'Voir Tous les Projets',
        secondaryCtaText: 'Commencer',
        badge: 'Projets en Direct et Démonstrations',
      },
      stats: {
        featuredProjects: 'Projets Vedettes',
        featuredProjectsDesc: 'Vitrine soigneusement sélectionnée',
        categories: 'Catégories',
        categoriesDesc: 'Focus industriel diversifié',
        externalLinks: 'Liens Externes',
        externalLinksDesc: 'Projets en direct et démonstrations',
      },
      projects: {
        title: 'Vitrine de Projets',
        description:
          'Découvrez nos collaborations externes et projets vedettes. Parmi nos applications éprouvées et démontrées, voici quelques démonstrations que vous pouvez explorer directement.',
      },
      cta: {
        title: 'Prêt à Démarrer Votre Projet?',
        description:
          'Discutons de la façon dont nous pouvons donner vie à votre vision avec la même expertise et le même dévouement démontrés dans ces projets.',
        button: "Commencer Aujourd'hui",
      },
    },
    es: {
      hero: {
        title: 'Casos de Estudio',
        subtitle: 'Proyectos Destacados y Asociaciones',
        description:
          'A continuación encontrará una colección curada de proyectos y herramientas externas que muestran nuestra experiencia técnica y conexiones de la industria. Estos proyectos abarcan múltiples categorías, incluyendo soluciones comerciales, desarrollo de IA, plataformas de comercio electrónico y herramientas educativas.',
        ctaText: 'Ver Todos los Proyectos',
        secondaryCtaText: 'Comenzar',
        badge: 'Proyectos en Vivo y Demostraciones',
      },
      stats: {
        featuredProjects: 'Proyectos Destacados',
        featuredProjectsDesc: 'Vitrina cuidadosamente seleccionada',
        categories: 'Categorías',
        categoriesDesc: 'Enfoque industrial diverso',
        externalLinks: 'Enlaces Externos',
        externalLinksDesc: 'Proyectos en vivo y demostraciones',
      },
      projects: {
        title: 'Vitrina de Proyectos',
        description:
          'Descubra nuestras colaboraciones externas y proyectos destacados. Entre nuestras aplicaciones probadas y demostradas, aquí hay algunas demostraciones que puede explorar directamente.',
      },
      cta: {
        title: '¿Listo para Iniciar Su Proyecto?',
        description:
          'Hablemos de cómo podemos hacer realidad su visión con la misma experiencia y dedicación mostradas en estos proyectos.',
        button: 'Comenzar Hoy',
      },
    },
    cn: {
      hero: {
        title: '案例研究',
        subtitle: '精选项目与合作伙伴',
        description:
          '下面您将找到一个精选的外部项目和工具集合，展示我们的技术专长和行业联系。这些项目涵盖多个类别，包括商业解决方案、AI开发、电子商务平台和教育工具。',
        ctaText: '查看所有项目',
        secondaryCtaText: '开始',
        badge: '实时项目与演示',
      },
      stats: {
        featuredProjects: '精选项目',
        featuredProjectsDesc: '精心挑选的展示',
        categories: '类别',
        categoriesDesc: '多元化行业焦点',
        externalLinks: '外部链接',
        externalLinksDesc: '实时项目和演示',
      },
      projects: {
        title: '项目展示',
        description:
          '发现我们的外部合作和精选项目。在我们经过验证和演示的应用中，这里有一些您可以直接探索的演示展示。',
      },
      cta: {
        title: '准备开始您的项目了吗？',
        description:
          '让我们讨论如何以这些项目中展现的相同专业知识和奉献精神来实现您的愿景。',
        button: '今天就开始',
      },
    },
  }

  const currentContent =
    caseStudiesContent[language as keyof typeof caseStudiesContent] ||
    caseStudiesContent.en

  return (
    <div>
      <FullWidthHeroWrapper>
        <OurWorkHero
          title={currentContent.hero.title}
          subtitle={currentContent.hero.subtitle}
          description={currentContent.hero.description}
          ctaText={currentContent.hero.ctaText}
          ctaLink='/portfolio'
          secondaryCtaText={currentContent.hero.secondaryCtaText}
          secondaryCtaLink='/contact-us?title=Get Started#contact-form'
          badge={currentContent.hero.badge}
          background='image'
          backgroundImage='/optimized/hs-3.webp'
          overlay={false}
          imageBrightness={0.8}
          imageContrast={1.1}
          imagePosition='center center'
          enableParallax={true}
        />
      </FullWidthHeroWrapper>
      <div className='min-h-screen'>
        {/* Stats Section */}
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                <div className='text-center'>
                  <div className='bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl font-bold text-blue-600'>9</span>
                  </div>
                  <h3 className='font-semibold text-gray-800'>
                    {currentContent.stats.featuredProjects}
                  </h3>
                  <p className='text-gray-600'>
                    {currentContent.stats.featuredProjectsDesc}
                  </p>
                </div>
                <div className='text-center'>
                  <div className='bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl font-bold text-purple-600'>
                      6
                    </span>
                  </div>
                  <h3 className='font-semibold text-gray-800'>
                    {currentContent.stats.categories}
                  </h3>
                  <p className='text-gray-600'>
                    {currentContent.stats.categoriesDesc}
                  </p>
                </div>
                <div className='text-center'>
                  <div className='bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl font-bold text-green-600'>
                      100%
                    </span>
                  </div>
                  <h3 className='font-semibold text-gray-800'>
                    {currentContent.stats.externalLinks}
                  </h3>
                  <p className='text-gray-600'>
                    {currentContent.stats.externalLinksDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bookmark List Section */}
        <section className='py-16 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='max-w-7xl mx-auto'>
              <div className='text-center mb-12'>
                <h2 className='text-4xl font-bold mb-6 text-gray-900'>
                  {currentContent.projects.title}
                </h2>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                  {currentContent.projects.description}
                </p>
              </div>

              {/* Enhanced BookmarkList Container */}
              <div className='bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 p-8'>
                <BookmarkList />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className='bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-6'>
              {currentContent.cta.title}
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto'>
              {currentContent.cta.description}
            </p>
            <a
              href='/contact-us'
              className='inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              {currentContent.cta.button}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
