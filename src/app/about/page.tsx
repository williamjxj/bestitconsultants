'use client'

import { Award, Globe, Lightbulb, MapPin, Target, Users } from 'lucide-react'
import React from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { language } = useLanguage()

  // Detailed content for the about page based on real team information
  const aboutContent = {
    en: {
      title: 'About BestITConsultants Ltd',
      intro:
        'We are a premier software outsourcing company founded by industry veterans with over 60 years of combined experience. Led by CEO William Jiang, our international team has delivered successful projects for Fortune 500 companies including Xperi, Credit Suisse, HSBC, WebMD, and BestBuy Canada.',
      mission: {
        title: 'Our Mission',
        text: 'To empower businesses worldwide with exceptional software solutions, leveraging our deep expertise in AI/ML, enterprise systems, and cloud technologies. We combine North American innovation with Asian efficiency to deliver world-class results.',
      },
      vision: {
        title: 'Our Vision',
        text: 'To be the premier global software outsourcing partner, recognized for our innovative AI-driven solutions, Fortune 500 track record, and commitment to delivering measurable business value through technology excellence.',
      },
      team: {
        title: 'Our Proven Expert Team',
        text: 'Our leadership team brings decades of real-world experience from top-tier companies. William Jiang (20+ years, Founder & CEO) has architected systems for Xperi, Credit Suisse, and HSBC. Our Chengdu partner leads 20+ developers specializing in enterprise solutions. Shamin Yang brings 20+ years of .NET expertise from IBM, HSBC, and HP projects.',
        skills: [
          'AI & Machine Learning (MLOps, CUDA, Kubeflow)',
          'Enterprise Software (.NET, Java Spring Boot)',
          'Full-Stack Development (React, Node.js, Python)',
          'Cloud & DevOps (AWS, Kubernetes, Docker)',
          'RPA & Automation (UiPath, BluePrism)',
          'Mobile Development (Android, iOS, React Native)',
          'Database Systems (Oracle, SQL Server, MongoDB)',
          'System Integration & Microservices',
        ],
      },
      locations: {
        title: 'Strategic Global Presence',
        text: 'Headquartered in Vancouver, Canada with our core development center in Chengdu, China. This strategic positioning combines North American business acumen with Asian technical excellence, enabling us to deliver Fortune 500 quality at competitive rates with 24/7 development cycles.',
      },
      achievements: {
        title: 'Proven Track Record',
        text: 'Our team has delivered mission-critical systems for global leaders: ML Data Pipelines for Xperi, real-time trading systems for Credit Suisse, banking platforms for HSBC, Big Data solutions for WebMD, and e-commerce systems for BestBuy Canada. Our APEC 2002 award-winning FedEx project and government systems demonstrate our versatility across industries.',
      },
    },
    fr: {
      title: 'À Propos de BestITConsultants Ltd',
      intro:
        "Nous sommes une entreprise d'externalisation de logiciels dynamique et avant-gardiste, dédiée à aider les entreprises à atteindre leurs objectifs technologiques. Avec une base solide en innovation et un engagement envers l'excellence, nous fournissons des solutions de pointe adaptées à vos besoins uniques.",
      mission: {
        title: 'Notre Mission',
        text: "Donner aux entreprises du monde entier les moyens de disposer de solutions logicielles supérieures, grâce à l'expertise, la collaboration et une passion pour la technologie. Nous nous efforçons d'être un partenaire de confiance dans les réussites de nos clients.",
      },
      vision: {
        title: 'Notre Vision',
        text: "Être un leader mondialement reconnu dans l'externalisation de logiciels, connu pour nos approches innovantes, nos talents exceptionnels et notre engagement indéfectible envers la satisfaction client et le progrès technologique.",
      },
      team: {
        title: "Notre Équipe d'Experts",
        text: "Notre force principale réside dans notre équipe d'ingénieurs full-stack hautement qualifiés et expérimentés. Maîtrisant un large éventail de technologies, notamment JavaScript (React, Node.js, Next.js), TypeScript, Python (Django, Flask), Java (Spring Boot), .NET, et plus encore. Nous favorisons une culture d'apprentissage continu et de collaboration pour rester à la pointe de la technologie.",
        skills: [
          'JavaScript & TypeScript',
          'Python & Django/Flask',
          'Java & Spring Boot',
          '.NET Core & Framework',
          'React, Angular, Vue.js',
          'Node.js & Express',
          'Plateformes Cloud (AWS, Azure, GCP)',
          'DevOps & CI/CD',
          'Gestion de Bases de Données (SQL & NoSQL)',
          'IA & Apprentissage Automatique',
        ],
      },
      locations: {
        title: 'Notre Présence Mondiale',
        text: "Avec un siège stratégique à Vancouver, Canada, un centre dynamique d'innovation technologique, nous exploitons également une succursale clé en Asie de l'Est. Cette double présence nous permet de tirer parti des viviers de talents mondiaux, d'offrir un support continu et de fournir des solutions rentables tout en maintenant une collaboration étroite avec nos clients à travers différents fuseaux horaires.",
      },
      achievements: {
        title: 'Réalisations Éprouvées',
        text: "Au fil des ans, BestITConsultants Ltd a livré avec succès une multitude de projets dans divers secteurs, notamment le commerce électronique, la santé, la finance, la logistique et l'éducation. Notre portefeuille illustre notre capacité à relever des défis complexes et à fournir des logiciels robustes, évolutifs et conviviaux. Nous sommes fiers de nos taux élevés de fidélisation client et de nos retours positifs, reflétant notre dévouement à la qualité et aux résultats.",
      },
    },
    es: {
      title: 'Acerca de BestITConsultants Ltd',
      intro:
        'Somos una empresa de outsourcing de software dinámica y con visión de futuro, dedicada a ayudar a las empresas a alcanzar sus objetivos tecnológicos. Con una sólida base en innovación y un compromiso con la excelencia, ofrecemos soluciones de vanguardia adaptadas a sus necesidades únicas.',
      mission: {
        title: 'Nuestra Misión',
        text: 'Empoderar a las empresas de todo el mundo con soluciones de software superiores, impulsadas por la experiencia, la colaboración y la pasión por la tecnología. Nos esforzamos por ser un socio de confianza en las historias de éxito de nuestros clientes.',
      },
      vision: {
        title: 'Nuestra Visión',
        text: 'Ser un líder reconocido a nivel mundial en outsourcing de software, conocido por nuestros enfoques innovadores, talento excepcional y compromiso inquebrantable con la satisfacción del cliente y el avance tecnológico.',
      },
      team: {
        title: 'Nuestro Equipo de Expertos',
        text: 'Nuestra principal fortaleza radica en nuestro equipo de ingenieros full-stack altamente cualificados y experimentados. Competentes en una amplia gama de tecnologías, incluyendo JavaScript (React, Node.js, Next.js), TypeScript, Python (Django, Flask), Java (Spring Boot), .NET, y más. Fomentamos una cultura de aprendizaje continuo y colaboración para mantenernos a la vanguardia de la tecnología.',
        skills: [
          'JavaScript & TypeScript',
          'Python & Django/Flask',
          'Java & Spring Boot',
          '.NET Core & Framework',
          'React, Angular, Vue.js',
          'Node.js & Express',
          'Plataformas Cloud (AWS, Azure, GCP)',
          'DevOps & CI/CD',
          'Gestión de Bases de Datos (SQL & NoSQL)',
          'IA & Aprendizaje Automático',
        ],
      },
      locations: {
        title: 'Nuestra Presencia Global',
        text: 'Con sede estratégica en Vancouver, Canadá, un vibrante centro de innovación tecnológica, también operamos una sucursal clave en Asia Oriental. Esta doble presencia nos permite aprovechar los grupos de talento globales, ofrecer soporte continuo y proporcionar soluciones rentables mientras mantenemos una estrecha colaboración con nuestros clientes en diferentes zonas horarias.',
      },
      achievements: {
        title: 'Logros Demostrados',
        text: 'A lo largo de los años, BestITConsultants Ltd ha entregado con éxito una multitud de proyectos en diversas industrias, incluyendo comercio electrónico, salud, finanzas, logística y educación. Nuestro portafolio demuestra nuestra capacidad para abordar desafíos complejos y entregar software robusto, escalable y fácil de usar. Nos enorgullecemos de las altas tasas de retención de clientes y los comentarios positivos, lo que refleja nuestra dedicación a la calidad y los resultados.',
      },
    },
    cn: {
      title: '关于 BestITConsultants Ltd',
      intro:
        '我们是一家充满活力、具有前瞻性的软件外包公司，致力于帮助企业实现其技术目标。凭借坚实的创新基础和对卓越的承诺，我们提供根据您的独特需求量身定制的尖端解决方案。',
      mission: {
        title: '我们的使命',
        text: '凭借专业知识、协作精神和对技术的热情，为全球企业提供卓越的软件解决方案。我们努力成为客户成功故事中值得信赖的合作伙伴。',
      },
      vision: {
        title: '我们的愿景',
        text: '成为全球公认的软件外包领导者，以我们的创新方法、卓越人才以及对客户满意度和技术进步的坚定承诺而闻名。',
      },
      team: {
        title: '我们的专家团队',
        text: '我们的核心优势在于我们技艺高超、经验丰富的全栈工程师团队。精通各种技术，包括 JavaScript (React, Node.js, Next.js)、TypeScript、Python (Django, Flask)、Java (Spring Boot)、.NET 等。我们培养持续学习和协作的文化，以保持技术领先地位。',
        skills: [
          'JavaScript & TypeScript',
          'Python & Django/Flask',
          'Java & Spring Boot',
          '.NET Core & Framework',
          'React, Angular, Vue.js',
          'Node.js & Express',
          '云平台 (AWS, Azure, GCP)',
          'DevOps & CI/CD',
          '数据库管理 (SQL & NoSQL)',
          '人工智能与机器学习',
        ],
      },
      locations: {
        title: '我们的全球业务',
        text: '战略总部设在加拿大温哥华这个充满活力的技术创新中心，同时我们还在东亚设有一个重要的分支机构。这种双重布局使我们能够利用全球人才库，提供全天候支持，并提供具有成本效益的解决方案，同时与不同时区的客户保持密切合作。',
      },
      achievements: {
        title: '已证实的成就',
        text: '多年来，BestITConsultants Ltd 已成功交付了众多跨行业的项目，包括电子商务、医疗保健、金融、物流和教育。我们的项目案例展示了我们应对复杂挑战并交付强大、可扩展且用户友好的软件的能力。我们为高客户保留率和积极反馈感到自豪，这反映了我们对质量和成果的执着追求。',
      },
    },
  }

  const currentContent =
    aboutContent[language as keyof typeof aboutContent] || aboutContent.en

  return (
    <div className='bg-white py-12 md:py-16'>
      <div className='container mx-auto px-4 space-y-12 md:space-y-16'>
        {/* Page Header */}
        <header className='text-center border-b pb-8 border-gray-200'>
          <h1 className='text-4xl md:text-5xl font-bold text-blue-700 mb-4'>
            {currentContent.title}
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            {currentContent.intro}
          </p>
        </header>

        {/* Mission and Vision */}
        <section className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
          <div className='p-6 bg-blue-50 rounded-lg shadow-md'>
            <Target size={40} className='mb-3 text-blue-600' />
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
              {currentContent.mission.title}
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {currentContent.mission.text}
            </p>
          </div>
          <div className='p-6 bg-green-50 rounded-lg shadow-md'>
            <Lightbulb size={40} className='mb-3 text-green-600' />
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
              {currentContent.vision.title}
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {currentContent.vision.text}
            </p>
          </div>
        </section>

        {/* Our Expert Team */}
        <section className='p-8 bg-gray-50 rounded-lg shadow-lg'>
          <div className='flex flex-col md:flex-row items-center md:space-x-8'>
            <Users
              size={60}
              className='text-indigo-600 mb-6 md:mb-0 flex-shrink-0'
            />
            <div>
              <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                {currentContent.team.title}
              </h2>
              <p className='text-gray-700 leading-relaxed mb-6'>
                {currentContent.team.text}
              </p>
              <div className='flex flex-wrap gap-3'>
                {currentContent.team.skills.map(skill => (
                  <span
                    key={skill}
                    className='bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className='p-8 bg-white rounded-lg shadow-md border border-gray-200'>
          <div className='flex flex-col md:flex-row items-center md:space-x-8'>
            <Globe
              size={60}
              className='text-teal-600 mb-6 md:mb-0 flex-shrink-0'
            />
            <div>
              <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                {currentContent.locations.title}
              </h2>
              <p className='text-gray-700 leading-relaxed mb-4'>
                {currentContent.locations.text}
              </p>
              <div className='space-y-2'>
                <p className='font-medium text-gray-700'>
                  <MapPin size={16} className='inline mr-2 text-teal-500' />
                  Vancouver, Canada (HQ)
                </p>
                <p className='font-medium text-gray-700'>
                  <MapPin size={16} className='inline mr-2 text-teal-500' />
                  East Asia Branch
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proven Accomplishments */}
        <section className='p-8 bg-purple-50 rounded-lg shadow-lg'>
          <div className='flex flex-col md:flex-row items-center md:space-x-8'>
            <Award
              size={60}
              className='text-purple-600 mb-6 md:mb-0 flex-shrink-0'
            />
            <div>
              <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                {currentContent.achievements.title}
              </h2>
              <p className='text-gray-700 leading-relaxed'>
                {currentContent.achievements.text}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
