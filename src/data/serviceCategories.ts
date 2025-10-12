import { ServiceCategory } from '@/types/service'

export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: 'ai-ml-solutions',
    name: 'AI & Machine Learning Solutions',
    seoTagline:
      'Harness AI to automate workflows, unlock insights, and innovate faster.',
    description:
      'Custom AI/LLM applications, MLOps, ChatBI, and enterprise AI solutions',
    benefits: [
      'Automated workflows',
      'Data-driven insights',
      'Faster innovation',
      'Cost reduction',
    ],
    technologies: [
      'LangChain',
      'Hugging Face',
      'RAG',
      'TensorFlow',
      'PyTorch',
      'MLOps',
    ],
    useCases: [
      'ChatBI',
      'Document processing',
      'Predictive analytics',
      'Automated decision making',
    ],
    pricing: 'Contact for custom pricing',
    icon: '/icons/ai-ml.svg',
    order: 1,
    isActive: true,
  },
  {
    id: 'web-development',
    name: 'Web Development & Modernization',
    seoTagline:
      'Transform your digital presence with modern, scalable web applications.',
    description:
      'Full-stack web development, legacy system modernization, and performance optimization',
    benefits: [
      'Modern user experience',
      'Scalable architecture',
      'Performance optimization',
      'Mobile responsiveness',
    ],
    technologies: [
      'React.js',
      'Next.js',
      'Node.js',
      'TypeScript',
      'MongoDB',
      'AWS',
    ],
    useCases: [
      'E-commerce platforms',
      'Corporate websites',
      'Web applications',
      'API development',
    ],
    pricing: 'Contact for custom pricing',
    icon: '/icons/web-dev.svg',
    order: 2,
    isActive: true,
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions & DevOps',
    seoTagline:
      'Accelerate deployment and reduce costs with robust CI/CD pipelines and scalable cloud infrastructure.',
    description:
      'Cloud migration, DevOps implementation, and infrastructure automation',
    benefits: [
      'Faster deployment',
      'Cost optimization',
      'Scalable infrastructure',
      'Automated workflows',
    ],
    technologies: [
      'AWS',
      'Azure',
      'Google Cloud',
      'Docker',
      'Kubernetes',
      'Terraform',
    ],
    useCases: [
      'Cloud migration',
      'CI/CD implementation',
      'Infrastructure automation',
      'Monitoring and logging',
    ],
    pricing: 'Contact for custom pricing',
    icon: '/icons/cloud.svg',
    order: 3,
    isActive: true,
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    seoTagline:
      'Create engaging mobile experiences with native and cross-platform solutions.',
    description: 'iOS, Android, and cross-platform mobile app development',
    benefits: [
      'Native performance',
      'Cross-platform compatibility',
      'App store optimization',
      'User engagement',
    ],
    technologies: [
      'React Native',
      'Flutter',
      'Swift',
      'Kotlin',
      'iOS',
      'Android',
    ],
    useCases: [
      'Mobile apps',
      'Progressive web apps',
      'App store deployment',
      'Mobile optimization',
    ],
    pricing: 'Contact for custom pricing',
    icon: '/icons/mobile.svg',
    order: 4,
    isActive: true,
  },
  {
    id: 'enterprise-solutions',
    name: 'Enterprise Solutions',
    seoTagline:
      'Streamline business operations with custom enterprise software and system integration.',
    description:
      'Enterprise software development, system integration, and business process automation',
    benefits: [
      'Process automation',
      'System integration',
      'Data management',
      'Workflow optimization',
    ],
    technologies: ['.NET', 'Java', 'SQL Server', 'Oracle', 'ERP', 'CRM'],
    useCases: [
      'ERP systems',
      'CRM platforms',
      'Business automation',
      'System integration',
    ],
    pricing: 'Contact for custom pricing',
    icon: '/icons/enterprise.svg',
    order: 5,
    isActive: true,
  },
]
