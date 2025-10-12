// src/app/team/page.tsx

import React from 'react'

import { EnhancedTeamProfile } from '@/components/team/EnhancedTeamProfile'
import { TeamMember } from '@/types/team'

const teamMembers: TeamMember[] = [
  {
    id: 'william-jiang',
    name: 'William Jiang',
    title: 'Founder & CEO',
    location: 'Vancouver, Canada',
    experience: 20,
    avatar: '/images/william-jiang.jpg',
    bio: 'Senior Full-Stack Engineer with 20+ years in software architecture and AI-driven solutions. APEC 2002 award winner for FedEx project. Led major initiatives at Xperi (ML Data Pipelines), Credit Suisse (real-time stock integration), HSBC (banking services), WebMD (Big Data pipelines), and BestBuy Canada (e-commerce).',
    expertise: [
      'AI & Machine Learning (MLOps, CUDA, Kubeflow)',
      'React.js, Node.js, Python, Java',
      'Kubernetes, Docker, AWS, MLOps',
      'Microservices, GraphQL, MongoDB',
      'LangChain, LlamaIndex, Hugging Face',
      'Kafka, ElasticSearch, Prometheus',
    ],
    achievements: [
      'APEC 2002 accolade - FedEx Global Project',
      'First-Class accolade - CDMA application (Shaanxi Province)',
      '20+ years Fortune 500 experience',
      'Global experience: US, Canada, China, Singapore',
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
        name: 'FedEx Award-Winning Project',
        type: 'project',
        description:
          'Led development of award-winning logistics optimization system',
        outcome: 'APEC 2002 accolade - FedEx Global Project',
        technologies: ['Python', 'Kafka', 'Microservices', 'Cloud'],
        year: 2002,
      },
      {
        id: 'xperi-ml-pipelines',
        name: 'Xperi ML Data Pipelines',
        type: 'company',
        description: 'Developed machine learning data pipelines for Xperi',
        outcome: 'Significant contributor to ML infrastructure',
        technologies: ['Python', 'MLOps', 'Kubernetes', 'AWS'],
        year: 2020,
      },
    ],
  },
  {
    id: 'mingchun-hu',
    name: 'Mingchun Hu',
    title: 'Mobile Development Specialist',
    location: 'Vancouver, Canada',
    experience: 8,
    avatar: '/images/mingchun-hu.jpg',
    bio: 'Mobile development expert with extensive experience in iOS and Android app development. Specializes in cross-platform solutions and native mobile applications.',
    expertise: [
      'React Native, Flutter',
      'iOS (Swift, Objective-C)',
      'Android (Kotlin, Java)',
      'Mobile UI/UX Design',
      'App Store Optimization',
      'Push Notifications, Analytics',
    ],
    achievements: [
      'Published 30+ mobile apps',
      '4.8+ average app store rating',
      '1M+ total app downloads',
      'Mobile development certifications',
    ],
    specializations: [
      'React Native, Flutter',
      'iOS (Swift, Objective-C)',
      'Android (Kotlin, Java)',
      'Mobile UI/UX Design',
      'App Store Optimization',
      'Push Notifications, Analytics',
    ],
    prestigeProjects: [],
  },
  {
    id: 'lewis-liu',
    name: 'Lewis Liu',
    title: 'Senior Full-Stack Developer',
    location: 'Vancouver, Canada',
    experience: 12,
    avatar: '/images/lewis-liu.jpg',
    bio: 'Experienced full-stack developer with expertise in modern web technologies and cloud solutions. Specializes in building scalable applications and leading development teams.',
    expertise: [
      'React.js, Vue.js, Angular',
      'Node.js, Express, FastAPI',
      'AWS, Azure, Google Cloud',
      'Docker, Kubernetes',
      'PostgreSQL, MongoDB, Redis',
      'GraphQL, REST APIs',
    ],
    achievements: [
      'Led development of 50+ web applications',
      'Mentored 20+ junior developers',
      'Certified AWS Solutions Architect',
      'Open source contributor',
    ],
    specializations: [
      'React.js, Vue.js, Angular',
      'Node.js, Express, FastAPI',
      'AWS, Azure, Google Cloud',
      'Docker, Kubernetes',
      'PostgreSQL, MongoDB, Redis',
      'GraphQL, REST APIs',
    ],
    prestigeProjects: [],
  },
  {
    id: 'shamin-yang',
    name: 'Shamin Yang',
    title: '.NET Architecture Specialist',
    location: 'Vancouver, Canada',
    experience: 20,
    avatar: '/images/shaming-yang.jpeg',
    bio: '20+ years Microsoft technology expert with extensive Fortune 500 experience. Led major projects at HSBC (Transformers ETL Platform), IBM (Tiffany e-Commerce), HP (GM applications), and EPAM (Credit Suisse Alpha). Multiple certifications including Google Cloud Architect and DevOps Master.',
    expertise: [
      'ASP.NET, .NET Core, Blazor, WPF, UWP',
      'Azure, Google Cloud, AWS Integration',
      'RPA: UiPath, BluePrism, WorkFusion',
      'Database: SQL Server, Oracle, MongoDB',
      'DevOps: Git, TeamCity, Octopus, PowerShell',
      'System Integration: BizTalk, MSMQ, ETL',
    ],
    achievements: [
      'Google Cloud Architect & Professional Developer (2024)',
      'HSBC Enterprise Engineering Programme (2024)',
      'DevOps Master Certified (2020)',
      'PMP Certified (2011)',
      'RPA Platform Certified: UiPath, BluePrism (2018)',
    ],
    specializations: [
      'ASP.NET, .NET Core, Blazor, WPF, UWP',
      'Azure, Google Cloud, AWS Integration',
      'RPA: UiPath, BluePrism, WorkFusion',
      'Database: SQL Server, Oracle, MongoDB',
      'DevOps: Git, TeamCity, Octopus, PowerShell',
      'System Integration: BizTalk, MSMQ, ETL',
    ],
    prestigeProjects: [
      {
        id: 'hsbc-transformers',
        name: 'HSBC Transformers ETL Platform',
        type: 'company',
        description: 'Led development of enterprise ETL platform for HSBC',
        outcome: 'Significant contributor to enterprise data transformation',
        technologies: ['.NET', 'SQL Server', 'Azure', 'ETL'],
        year: 2020,
      },
      {
        id: 'credit-suisse-alpha',
        name: 'Credit Suisse Alpha Trading System',
        type: 'company',
        description: 'Developed trading system for Credit Suisse',
        outcome: 'Key contributor to trading platform',
        technologies: ['.NET', 'C#', 'SQL Server', 'Financial APIs'],
        year: 2018,
      },
    ],
  },
  {
    id: 'wayne-li',
    name: 'Wayne Li',
    title: 'DevOps & Cloud Engineer',
    location: 'Vancouver, Canada',
    experience: 10,
    avatar: '/images/wayne-li.jpg',
    bio: 'DevOps and cloud infrastructure specialist with expertise in automation, monitoring, and scalable system architecture. Focuses on improving development workflows and system reliability.',
    expertise: [
      'AWS, Azure, Google Cloud',
      'Docker, Kubernetes, Terraform',
      'CI/CD Pipelines (Jenkins, GitLab)',
      'Monitoring (Prometheus, Grafana)',
      'Infrastructure as Code',
      'Security & Compliance',
    ],
    achievements: [
      'Reduced deployment time by 80%',
      'Achieved 99.9% system uptime',
      'Certified Kubernetes Administrator',
      'Cost optimization savings of $100K+',
    ],
    specializations: [
      'AWS, Azure, Google Cloud',
      'Docker, Kubernetes, Terraform',
      'CI/CD Pipelines (Jenkins, GitLab)',
      'Monitoring (Prometheus, Grafana)',
      'Infrastructure as Code',
      'Security & Compliance',
    ],
    prestigeProjects: [],
  },
  {
    id: 'james-cheung',
    name: 'James Cheung',
    title: 'Strategic Development Partner',
    location: 'Chengdu, China',
    experience: 15,
    avatar: '/images/james-cheung.jpeg',
    bio: 'Professional software development company with teams in Chengdu and Hangzhou. Specializes in OA systems, engineering cost management, mobile development, and government solutions. Serves Fortune 500 clients, government agencies, and major engineering companies.',
    expertise: [
      'OA Systems (Task, Project, Asset Management)',
      'Engineering Cost Management Systems',
      'Mobile Development (Android/iOS, React Native)',
      'Embedded Systems & Hardware Solutions',
      'Enterprise ERP, MES, EKP Systems',
      'Supply Chain Finance Platforms',
    ],
    achievements: [
      'Government Agencies & Military Units',
      'Beijing Science Press',
      'Chongqing University of Technology',
      'Multiple Engineering Companies',
      'Aerospace Industry Partners',
    ],
    specializations: [
      'OA Systems (Task, Project, Asset Management)',
      'Engineering Cost Management Systems',
      'Mobile Development (Android/iOS, React Native)',
      'Embedded Systems & Hardware Solutions',
      'Enterprise ERP, MES, EKP Systems',
      'Supply Chain Finance Platforms',
    ],
    prestigeProjects: [],
  },
]

const TeamPage = () => {
  return (
    <div className='container mx-auto py-12'>
      <h1 className='text-4xl font-bold text-center mb-8'>Our Expert Team</h1>
      <p className='text-center text-lg text-muted-foreground mb-12'>
        Meet the seasoned professionals with Fortune 500 experience who drive
        our success.
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
        {teamMembers.map(member => (
          <EnhancedTeamProfile key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export default TeamPage
