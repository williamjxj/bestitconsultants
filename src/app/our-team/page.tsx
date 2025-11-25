// src/app/team/page.tsx

'use client'

import { Globe, MapPin, Users } from 'lucide-react'
import React from 'react'

import { EnhancedTeamProfile } from '@/components/team/EnhancedTeamProfile'
import { FullWidthHeroWrapper } from '@/components/ui/full-width-hero-wrapper'
import { TeamHero } from '@/components/ui/hero-variants'
import { useLanguage } from '@/contexts/LanguageContext'
import { getR2ImageUrl } from '@/lib/utils'
import { TeamMember } from '@/types/team'

const teamMembers: TeamMember[] = [
  {
    id: 'william-jiang',
    name: 'William Jiang',
    title: 'Founder & Full Stack Engineer, AI Consultant',
    location: 'Vancouver, Canada',
    experience: 20,
    avatar: getR2ImageUrl('selfies/william-jiang.jpg'),
    bio: 'Experienced technology professional with 20+ years in full-stack development, software architecture, and AI-driven solutions. Expertise includes: React.js, Node.js, Python, Java, Kubernetes, Docker, AWS, MLOps, Microservices, GraphQL, MongoDB, LangChain, LlamaIndex, Hugging Face, Kafka, ElasticSearch, and Prometheus. Significant software contributor to a major FedEx project awarded APEC 2002 accolade. Global experience: US, Canada, China, and Singapore.',
    expertise: [
      'Frontend: Nextjs, Reactjs, Tailwindcss, Shadcn, Gatsby',
      'Backend: Node.js, Express.js, Python, GraphQL, Java, C',
      'AI/LLMs: OpenAI, Anthropic Claude, LangChain, LlamaIndex, Hugging Face, Ollama, RAG, Colab',
      'AI: Agentic AI, Generative Design, Speckit, cursor ai, claude code, ',
      'DevOps/Cloud: Kubernetes, Docker, AWS, CI/CD, MLOps',
      'Data: PostgreSQL, MongoDB, Apache, Kafka, ElasticSearch, Prometheus, Data Pipelines',
      'Archtecture: Software/System Design, Project software implementation, Microservices',
    ],
    achievements: [
      'Significant software contributor to a major FedEx project awarded APEC 2002 accolade in Shanghai, China.',
      'Software program awarded a First-Class accolade in Shaanxi Province, China, for its CDMA application.',
      '20+ years Fortune 500 experience in the US, Canada, China, and Singapore.',
      'Managed AI model training using tools such as Kubeflow, YOLO, CUDA, and WandB.',
    ],
    specializations: [
      'AI & Machine Learning (MLOps, CUDA, Kubeflow)',
      'React.js, Node.js, Python, Java',
      'Kubernetes, Docker, AWS, MLOps',
      'Microservices, GraphQL, MongoDB',
      'LangChain, LlamaIndex, Hugging Face',
      'Kafka, ElasticSearch, Prometheus',
    ],
    prestigeProjects: [
      {
        id: 'fedex-project',
        name: 'FedEx Award-Winning Project (APEC 2002)',
        type: 'project',
        description:
          'Led development of the Wireless Application for the FedEx tracking system, which was part of the FedEx Global Clearance System',
        outcome: 'Awarded APEC 2002 accolade in Shanghai, China',
        technologies: ['Wireless Application', 'C/C++', 'Oracle'],
        year: 2002,
      },
      {
        id: 'xperi-ml-pipelines',
        name: 'Xperi ML Data Pipelines & MLOps',
        type: 'company',
        description:
          'Developed ML Data Pipelines and Experiment Collection Manager using microservices architecture (React.js, Node.js, Python, Java). Managed MLOps workflows using Kubernetes, Docker, Jenkins, and AWS.',
        outcome:
          'Optimized GPU/CPU performance in Kubernetes environments and streamlined ML operations and deployment',
        technologies: ['Python', 'MLOps', 'Kubernetes', 'AWS', 'Kubeflow'],
        year: 2020,
      },
    ],
  },
  {
    id: 'vicky-zheng',
    name: 'Vicky Zheng',
    title: 'Senior Full Stack Developer',
    location: 'Vancouver, Canada',
    experience: 20,
    avatar: getR2ImageUrl('selfies/vicky-zheng.png'),
    bio: 'Senior Full Stack Developer with 20 years of experience in software design, implementation, and full life cycle development using agile methodologies. Skilled in both frontend and backend development, RESTful APIs, SQL, and a wide array of enterprise-level technologies. Demonstrated great successes in diverse industries including government, healthcare, insurance, and commercial software solutions.',
    expertise: [
      'Languages: JavaScript, TypeScript, Java, C#, SQL, HTML, CSS, XML',
      'Frameworks: Sencha ExtJS, ASP.NET, React, Next.js, Angular, JSF, Oracle ADF, Spring, Hibernate',
      'APIs: RESTEasy, OData, SOAP, Web Services, AXIS2',
      'Databases: MS SQL Server, MySQL, Oracle 11g/12c',
      'Tools/IDE: VS Code, Visual Studio, Eclipse, SQL Server Management Studio, JDeveloper',
      'Version Control: Git, SVN, CVS',
    ],
    achievements: [
      '20 years of experience in software design and implementation',
      'Expertise in full life cycle development using agile methodologies',
      'Demonstrated success across diverse industries: government, healthcare, insurance, and commercial software',
      'Proficient in both frontend and backend development with RESTful APIs',
      'Strong background in enterprise-level technologies and solutions',
    ],
    specializations: [
      'Full Stack Development (Frontend & Backend)',
      'JavaScript, TypeScript, Java, C#',
      'React, Next.js, Angular, ASP.NET',
      'Database Design (SQL Server, MySQL, Oracle)',
      'RESTful APIs, Web Services, SOAP',
      'Agile Development Methodologies',
    ],
    prestigeProjects: [],
  },
  {
    id: 'mingchun-hu',
    name: 'Mingchun Hu',
    title:
      'Project Manager, Multimodal Model Engineering, Mobile Development Specialist',
    location: 'Chengdu, China',
    experience: 12,
    avatar: getR2ImageUrl('selfies/mingchun-hu.jpg'),
    bio: "Experienced Project Manager and R&D lead with 12 years in software development, specializing in multimodal model engineering and mobile applications. Led R&D for Meituan B&B and the AIGC product 'Yima Zhipian'. Proficient in full-stack development (Java, Python, C++), mobile development (Android, iOS), and cloud platforms (AWS, Alibaba Cloud). Proven ability to manage and deliver complex software solutions, with a focus on project management and quality assurance.",
    expertise: [
      'Project Management',
      'Multimodal Model Engineering',
      'AIGC Product R&D',
      'Mobile Development (Android, iOS)',
      'Full-stack Development (Java, Python, C++, .NET, Web)',
      'Cloud Platforms (AWS, Alibaba Cloud)',
      'Software Customization and Implementation',
      'System Integration and Database Management (SQL Server, Oracle, MySQL)',
    ],
    achievements: [
      'Served as R&D head for Meituan B&B',
      "Served as R&D head for AIGC product 'Yima Zhipian'",
      'Successfully delivered various software projects, including OA systems, engineering cost management, and mobile applications',
      'Led a team of Web, Java, .NET, UI, Android, and iOS developers',
    ],
    specializations: [
      'AIGC Products',
      'Software R&D',
      'Mobile Application Development',
      'Enterprise Software Solutions',
      'Project Management & Quality Assurance',
    ],
    prestigeProjects: [],
  },
  {
    id: 'lianghua-liu',
    name: 'Lewis Liu',
    title: 'Software Architect, Programmer',
    location: 'Beijing, China',
    experience: 26,
    avatar: getR2ImageUrl('selfies/lewis-liu.jpg'),
    bio: 'Software Architect and Programmer with 26 years of experience, specializing in **BIM/CAD technology**, geometric modeling (Parasolid/ACIS/OCC), parallel algorithm design (OpenMP), and AutoCAD/Revit development. Possesses strong mathematical capability and expertise in C/C++, C#, STL, Python, and third-party library integration. Holds 1 patent authorization for **Associated Parametric Modeling (APM)**.',
    expertise: [
      'BIM/CAD Data modeling and exchange, SDK technology (Autodesk ObjectARX-like)',
      'Mathematical capability, parallel algorithm design, OpenMP, design patterns, SDK interface design',
      'Geometry & Modeling Kernels: Parasolid, ACIS, OCC',
      'Programming Languages & Frameworks: C/C++, C#, STL, Python, Win32, MFC, script',
      'CAD/CAE integration, AI + CAD',
    ],
    achievements: [
      "Authored 4 books and over 10 technical articles, including 'AutoCAD2000 ARX Development Technology'",
      "Published 'Hybrid intelligence utilization for construction site layout' in Automation in Construction (SCI and EI searches conducted)",
      'Successfully developed Associated Parametric Modeling (APM) technology, applied in 3D digitization in the Chinese engineering market (similar to Autodesk Revit technology)',
      "Received 1 patent authorization for 'A technology to capture design intents automatically while users modeling as usual'",
      'Received the Golden Idea Award at the Quality Conference',
      'Won multiple awards in the Beijing College Student Mathematics Competition',
    ],
    specializations: [
      'CAD/BIM/CAE Geometric Algorithms',
      'Parallel Computing & Multithreading (OpenMP)',
      '3D Modeling Techniques (Spline curves/surfaces, CAD features)',
      'STL format, 3D printing slicing, mold printing development',
      'Large-scale software architecture design',
    ],
    education:
      'Master of Civil Engineering, Tsinghua University (1996-1999); Bachelor, Northern China University of Technology (1992-1996)',
    prestigeProjects: [
      {
        id: 'apm-technology',
        name: 'Associated Parametric Modeling (APM)',
        type: 'project',
        description:
          'Successfully developed APM technology for 3D digitization in the Chinese engineering market.',
        outcome:
          'Successfully applied in the Chinese engineering market with cases (similar to Autodesk Revit). Resulted in a patent for automatically capturing design intents.',
        technologies: ['C/C++', 'Java', 'C#', 'Parasolid', 'ACIS'],
        year: 2015,
      },
      {
        id: 'cad-cae-expert',
        name: 'CAD/CAE Software Development Expert (A research institution)',
        type: 'company',
        description:
          'Guiding the development of a visual testing platform, designing interfaces and implementing/comparing algorithms (OCC vs. PK) for kernel testing benchmarks.',
        outcome:
          'Included imitation of OCC draft, cleaning, surface replacement algorithms, and Euler operation testing interface design.',
        technologies: ['C/C++', 'OCC', 'Parasolid (PK)', 'AI+CAD'],
        year: 2024,
      },
    ],
  },
  {
    id: 'shamin-yang',
    name: 'Shamin Yang',
    title: 'Senior Software Engineer / Solution Architect',
    location: 'Guangzhou, China',
    experience: 20,
    avatar: getR2ImageUrl('selfies/shaming-yang.jpeg'),
    bio: 'More than 20 years of .NET development experience across various Microsoft tech domains including Web, Windows, CI/CD, and System Integration. Has a strong background in RPA and Auto Testing, holding multiple industry certifications, and experience in finance (HSBC, Credit-Suisse) and large corporate projects (Huawei, IBM, GM).',
    expertise: [
      'Web Application: ASP.NET, .NetCore, Blazor, MVC, WebApi, WCF, Siverlight, EntityFramework & Linq, Html, CSS, Javascript, Jquery, Angular, Typescript, Bootstrap, Java & JSP',
      'Windows Application: WPF, UWP, Winform, MaterialDesign',
      'CICD: Git, Jira, TeamCity, Octopus, PowerShell/BAT scripts, TDD, BDD',
      'System Integration: Biztalk, MSMQ, SSIS, SSRS, DTS, Agent Job, Windows Service, WCF, SOAP, Self-Service ETL',
      'Data Base: SQLServer, Oracle, PostgreSQL, MongoDB, Redis, Azure CosmosDB, H2',
      'Scripts: Excel script formular, VBA Programming, Powershell, bat, lua',
      'RPA: UiPath, BluePrism, Workfusion, AutoIT, VBA, Envoy, Smart Automation Agent',
      'Auto Testing: NUnit, MSTest, Spec Flow, Jmeter, Jasmine, Karma, TestBed',
    ],
    achievements: [
      'Delivered several advanced challenge features independently in Transformers ETL Platform at HSBC, including PDF Input Node, Map Data Process Node, and XML Input Node',
      "Delivered Approval and Release Process for Citizen users' flow, synchronized with JIRA",
      'Developed Envoy Web-Automation Tool (Won top 10 Award in HSBC HTC 2021)',
      'Achieved Delivery Star in Huawei Tablet PDU department with an excellent performance level in Q2 of 2016',
      'Significantly improved the request processing performance for the Gate & TAQA integration systems from 2 hours to less than 1 minute',
      'Team received 2 formal praise letters from GM customers while leading the ABM Sustain team at HP',
      'Got "Star Of Efficiency" of PSP/TSP implementation awards in Q1 of 2011 at HP',
    ],
    specializations: [
      '.NET Full-Stack Development',
      'Solution Design and Architecture',
      'System Integration (BizTalk, WCF)',
      'Robotic Process Automation (RPA)',
      'DevOps & CICD (TDD, BDD)',
    ],
    certifications: [
      'MSCT Certified (2009)',
      'PMP Certified (2011)',
      'RPA platform Certified: UiPath, Workfution, Blue Prism foundation (2018)',
      'ACP Certified (2019)',
      'DevOps Master Certified (2020)',
      'HSBC HTC Craft Engineering Programme Certified (2023)',
      'HSBC Enterprise Engineering Programme Certified (2024)',
      'Google Cloud Architect Certified (2024)',
      'Google Cloud Professional Developer Certified (2024)',
    ],
    education:
      'Bachelor of Computer Science and Technology, Huazhong University of Science and Technology (2000 - 2004)',
    prestigeProjects: [
      {
        id: 'transformers-etl-platform',
        name: 'Transformers ETL Platform (HSBC)',
        type: 'project',
        description:
          'A semi-ETL self-service platform supporting file extraction, data processing, loading, and reporting for Global Market Service Security Share Services.',
        outcome:
          'Delivered advanced features including PDF/XML/File Search/File Management Nodes and Governance Model Processing. Won top 10 Award for innovation (Envoy Web-Automation Tool).',
        technologies: [
          '.NetCore',
          'JIRA',
          'RPA',
          'MongoDB',
          'WPF',
          'Angular',
          'VBA',
          'Git',
          'Jenkins',
        ],
        year: 2020,
      },
      {
        id: 'huawei-matebook',
        name: 'Huawei Matebook Assistant and MateTrans',
        type: 'project',
        description:
          'Led the development and localization solution for MateBook Assistant (UWP Demo and WPF app, 54 languages/100+ countries) and rescued the MateTrans file transfer project at the end of its lifecycle.',
        outcome:
          "MateBook Assistant was successfully deployed, achieving an 'Excellent' performance rating. Fixed critical UI/localization bugs in MateTrans.",
        technologies: ['WPF', 'UWP', 'MVVM', 'C#', 'COM'],
        year: 2016,
      },
      {
        id: 'tiffany-ecommerce',
        name: 'Tiffany e-Commerce (WOT, Compass Case, EOM)',
        type: 'project',
        description:
          "Tech Leader for multiple projects including 'World Of Tiffany' CMS/Frontend, site maintenance, internal case management (Compass Case), and order management (Compass EOM) systems.",
        outcome:
          'Successfully published WOT to PROD. Led SEO work and delivered SiteMapGenerator. Compass Case/EOM were successfully deployed across multiple countries.',
        technologies: [
          '.NET MVC 4',
          'webAPI',
          'WCF',
          'Jquery',
          'Kendo UI',
          'SSRS',
          'SQLServer',
          'Redis',
          'MongoDB',
          'IBM Watson Explore',
        ],
        year: 2012,
      },
    ],
  },
  {
    id: 'li-dong',
    name: 'Wayne Li',
    title: 'AI Technical Director, Project Director, LLM Expert',
    location: 'Shanghai, China',
    experience: 25,
    avatar: getR2ImageUrl('selfies/wayne-li.jpg'),
    bio: 'Technical Director and LLM expert with 25 years of experience, specializing in AI solutions for government and enterprise clients. Achieves technology equity by lowering the AI usage threshold for organizations. Expert in AI+ innovation design in the textile and light industry, solving client problems like long design cycles and high manual dependency. Company service covers 10+ industries with 100+ successful cases. Strong AI engineering capability, rapidly building applications on platforms like OpenAI and ComfyUI. Experienced in global firms like Oracle and Accenture.',
    expertise: [
      'AI Solutions for Government & Enterprise',
      'AI Design Platforms (Creative Style Exploration, Turing Work, Smart Pattern Search)',
      'AI Engineering (Model Training, Knowledge Base, Retrieval-Augmented Generation (RAG))',
      'Microservices & Low-Code Platform Architecture',
      'AI Engineering: OPENAI, ComfyUI, GPU-driven content automation',
      'Large Language Models (LLMs)',
      'Enterprise AI Application Implementation',
    ],
    achievements: [
      'Specializes in AI solutions for government and enterprise clients',
      'Achieves technology equity by lowering the AI usage threshold for organizations',
      'Expertise in AI+ innovation design in the textile and light industry, solving client problems like long design cycles and high manual dependency',
      'Company service covers 10+ industries with 100+ successful cases',
      'Reduced deployment time by 80%',
      'Achieved 99.9% system uptime',
      'Successfully realized a GPU-driven content automation generation platform',
    ],
    specializations: [
      'AI Application Landing Solutions',
      'Project Management',
      'Technical Architecture',
    ],
    education:
      'School of Software, Tsinghua University (Tsinghua Software School)',
    prestigeProjects: [
      {
        id: 'ai-innovation-design-platforms',
        name: 'AI+ Innovation Design Platforms for Light/Textile Industry',
        type: 'project',
        description:
          'Developed a suite of AI platforms (Creative Style Exploration, Turing Work, Smart Pattern Search) for the textile industry to accelerate product iteration.',
        outcome:
          'Replaced physical sampling with digital mock-ups, cut sampling costs, broke production bottlenecks, and increased the probability of best-sellers.',
        technologies: [
          'AI Design Platforms',
          'Creative Style Exploration',
          'Turing Work',
          'Smart Pattern Search',
        ],
        year: 2025,
      },
    ],
  },
  {
    id: 'james-chueng',
    name: 'James Chueng',
    title: 'Full Stack Software Engineer',
    location: 'Hong Kong',
    experience: 7,
    avatar: getR2ImageUrl('selfies/james-cheung.jpeg'),
    bio: 'A full stack software engineer with 7+ years working on freelancing platforms like Freelancer and Upwork. Contributed to lots of software development ranging from small web and AI projects to enterprise applications. Seeking long-term collaboration with senior European developers due to perceived location bias.',
    expertise: [
      'Frontend: React, Next.js, Angular, Vue3, other JavaScript frameworks',
      'Backend: Node, ROR, Laravel',
      'AI/LLMs: NLP, LLM, Lang Chain, TensorFlow',
    ],
    achievements: [
      'Successfully delivered on small web/AI projects and enterprise applications as a freelancer',
      'Developed an effective bidding strategy on Upwork',
    ],
    specializations: [
      'Full Stack Development (React, Node.js)',
      'AI/ML/NLP/LLM (Lang Chain, TensorFlow)',
      'Freelance Project Execution & Bidding Strategy (Upwork, Freelancer)',
    ],
    certifications: [],
    education: 'UCLA',
    prestigeProjects: [],
  },
  {
    id: 'chen-wenlong',
    name: 'Vince Chen',
    title: 'Knowledge Base, AI Tech Expert, Model Training Expert',
    location: 'Shenzhen, China',
    experience: 14,
    avatar: getR2ImageUrl('selfies/vince-chen.jpg'),
    bio: 'AI and model training expert with 14 years of experience, specializing in data platform and machine learning platform construction. Extensive experience in LLM applications, especially in AI chat assistants and image semantic retrieval. Formerly a Data Platform Group Leader at Meituan.',
    expertise: [
      'Data Platform & Machine Learning Platform Construction',
      'Large Language Model (LLM) Applications',
      'AI Chat Assistants, Image Semantic Retrieval',
    ],
    achievements: [
      'Led multiple core projects at Meituan as Data Platform Group Leader',
    ],
    specializations: [
      'Data & Machine Learning Platforms',
      'LLM Fine-tuning and Application',
    ],
    prestigeProjects: [],
  },
  {
    id: 'lu-zhenyu',
    name: 'Jack Lu',
    title: 'ComfyUI Expert',
    location: 'Shenzhen, China',
    experience: 5,
    avatar: getR2ImageUrl('selfies/jack-lu.jpg'),
    bio: 'ComfyUI expert with 5 years of experience. Highly skilled in using and training various AI image and video LLMs, ComfyUI workflow development, and creating image, text, video, and AI digital human assets.',
    expertise: [
      'ComfyUI Workflow Development',
      'AI Image and Video Large Models (Usage & Training)',
      'AI Digital Human Production',
    ],
    achievements: [
      'Created 1000+ custom ComfyUI workflows used by 500+ creative professionals worldwide, establishing industry best practices for AI-powered content generation',
      'Developed AI digital human pipeline reducing production time by 90% and cost by 70% for creative agencies and enterprise clients',
    ],
    specializations: ['Generative AI (Image/Video)', 'ComfyUI Customization'],
    prestigeProjects: [],
  },
]

const TeamPage = () => {
  const { language } = useLanguage()

  // Team content with translations
  const teamContent = {
    en: {
      hero: {
        title: 'Our Expert Team',
        subtitle:
          'Meet the seasoned professionals with Fortune 500 experience who drive our success',
        description:
          'Our leadership team brings decades of real-world experience from top-tier companies. From AI/ML experts to enterprise architects, we combine North American innovation with Asian efficiency.',
        ctaText: 'View Our Services',
        secondaryCtaText: 'Contact Us',
        badge: '20+ Years Combined Experience',
      },
    },
    fr: {
      hero: {
        title: "Notre Équipe d'Experts",
        subtitle:
          'Rencontrez les professionnels chevronnés avec une expérience Fortune 500 qui font notre succès',
        description:
          "Notre équipe de direction apporte des décennies d'expérience réelle des meilleures entreprises. Des experts IA/ML aux architectes d'entreprise, nous combinons l'innovation nord-américaine avec l'efficacité asiatique.",
        ctaText: 'Voir Nos Services',
        secondaryCtaText: 'Nous Contacter',
        badge: "20+ Années d'Expérience Combinées",
      },
    },
    es: {
      hero: {
        title: 'Nuestro Equipo de Expertos',
        subtitle:
          'Conozca a los profesionales experimentados con experiencia Fortune 500 que impulsan nuestro éxito',
        description:
          'Nuestro equipo de liderazgo aporta décadas de experiencia del mundo real de empresas de primer nivel. Desde expertos en IA/ML hasta arquitectos empresariales, combinamos la innovación norteamericana con la eficiencia asiática.',
        ctaText: 'Ver Nuestros Servicios',
        secondaryCtaText: 'Contáctenos',
        badge: '20+ Años de Experiencia Combinada',
      },
    },
    cn: {
      hero: {
        title: '我们的专家团队',
        subtitle: '认识拥有财富500强经验、推动我们成功的资深专业人士',
        description:
          '我们的领导团队带来了来自顶级公司的数十年实际经验。从AI/ML专家到企业架构师，我们将北美创新与亚洲效率相结合。',
        ctaText: '查看我们的服务',
        secondaryCtaText: '联系我们',
        badge: '20+年综合经验',
      },
    },
  }

  const currentContent =
    teamContent[language as keyof typeof teamContent] || teamContent.en

  return (
    <div>
      {/* Hero Section */}
      <FullWidthHeroWrapper>
        <TeamHero
          title={currentContent.hero.title}
          subtitle={currentContent.hero.subtitle}
          description={currentContent.hero.description}
          ctaText={currentContent.hero.ctaText}
          ctaLink='/services'
          secondaryCtaText={currentContent.hero.secondaryCtaText}
          secondaryCtaLink='/contact-us?title=Contact Our Team#contact-form'
          badge={currentContent.hero.badge}
          background='image'
          backgroundImage={getR2ImageUrl('optimized/hs-4.webp')}
          overlay={false}
          imageBrightness={0.8}
          imageContrast={1.1}
          imagePosition='center center'
          enableParallax={true}
        />
      </FullWidthHeroWrapper>

      {/* Main Content */}
      <div className='bg-white py-12 md:py-16'>
        <div className='container mx-auto px-4 space-y-12 md:space-y-16'>
          {/* Strategic Global Presence */}
          <section className='p-8 bg-gray-50 rounded-lg shadow-lg'>
            <div className='flex flex-col md:flex-row items-start md:space-x-8'>
              <Globe
                size={60}
                className='text-teal-600 mb-6 md:mb-0 flex-shrink-0'
              />
              <div className='flex-1'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                  {language === 'en'
                    ? 'Strategic Global Presence'
                    : language === 'fr'
                      ? 'Notre Présence Mondiale Stratégique'
                      : language === 'es'
                        ? 'Presencia Global Estratégica'
                        : '战略全球布局'}
                </h2>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  {language === 'en'
                    ? 'Our leadership team brings decades of real-world experience from top-tier companies. Headquartered in Vancouver, Canada with our core development center in Shenzhen, China, this strategic positioning combines North American business acumen with Asian technical excellence. We deliver Fortune 500 quality at competitive rates with 24/7 development cycles.'
                    : language === 'fr'
                      ? "Notre équipe de direction apporte des décennies d'expérience réelle des meilleures entreprises. Avec un siège stratégique à Vancouver, Canada et notre centre de développement principal à Shenzhen, en Chine, ce positionnement stratégique combine le savoir-faire commercial nord-américain avec l'excellence technique asiatique. Nous offrons une qualité Fortune 500 à des tarifs compétitifs avec des cycles de développement 24/7."
                      : language === 'es'
                        ? 'Nuestro equipo de liderazgo aporta décadas de experiencia del mundo real de empresas de primer nivel. Con sede en Vancouver, Canadá y nuestro centro de desarrollo principal en Shenzhen, China, este posicionamiento estratégico combina la perspicacia comercial de América del Norte con la excelencia técnica asiática. Entregamos calidad Fortune 500 a tarifas competitivas con ciclos de desarrollo 24/7.'
                        : '我们的领导团队带来了来自顶级公司的数十年实际经验。总部位于加拿大温哥华，核心开发中心位于中国深圳，这种战略定位结合了北美商业敏锐度与亚洲技术卓越性。我们以具有竞争力的价格提供财富500强品质，并支持24/7开发周期。'}
                </p>
                <div className='flex flex-wrap items-center gap-4'>
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

          {/* Our Proven Expert Team */}
          <section className='p-8 bg-gray-50 rounded-lg shadow-lg'>
            <div className='flex flex-col md:flex-row items-start md:space-x-8 mb-8'>
              <Users
                size={60}
                className='text-indigo-600 mb-6 md:mb-0 flex-shrink-0'
              />
              <div className='flex-1'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                  {language === 'en'
                    ? 'Our Proven Expert Team'
                    : language === 'fr'
                      ? "Notre Équipe d'Experts Éprouvée"
                      : language === 'es'
                        ? 'Nuestro Equipo de Expertos Probados'
                        : '我们的经验丰富的专家团队'}
                </h2>
              </div>
            </div>
            {/* Team Members */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
              {teamMembers.map(member => (
                <EnhancedTeamProfile key={member.id} member={member} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TeamPage
