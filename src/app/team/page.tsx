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
    bio: 'Experienced technology professional with 20+ years in full-stack development, software architecture, and AI-driven solutions. Expertise includes: React.js, Node.js, Python, Java, Kubernetes, Docker, AWS, MLOps, Microservices, GraphQL, MongoDB, LangChain, LlamaIndex, Hugging Face, Kafka, ElasticSearch, and Prometheus. Significant software contributor to a major FedEx project awarded APEC 2002 accolade. Global experience: US, Canada, China, and Singapore.',
    expertise: [
      'Frontend: React.js, Material-UI, Redux, Gatsby',
      'Backend: Node.js, Express.js, Python, GraphQL, Java, C',
      'AI/LLMs: LangChain, LlamaIndex, Hugging Face, RAG, Kubeflow, CUDA',
      'DevOps/Cloud: Kubernetes, Docker, AWS, CI/CD, MLOps',
      'Data: Kafka, ElasticSearch, Prometheus, PostgreSQL, MongoDB',
      'Microservices Architecture, Data Pipelines',
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
    title: 'Software Architect (CAD/BIM/AI)',
    location: 'Vancouver, Canada',
    experience: 26,
    avatar: '/images/lewis-liu.jpg',
    bio: 'Highly experienced Software Architect, Programmer, and CAD specialist with 26 years of experience. Mastery of BIM/CAD data modeling and exchange. Strong mathematical background, specializing in parallel algorithm design, Parasolid/ACIS/OCC geometry kernels, and AI + CAD. Holds a Master’s degree from Tsinghua University.',
    expertise: [
      'BIM/CAD data modeling and exchange ',
      'C/C++, C#, STL, Python, Win32, MFC ',
      'Parasolid/ACIS/OCC geometry, modeling kernels ',
      'AutoCAD/Revit development and integration ',
      'AI + CAD, CAD/CAE integration, 3D retrieval ',
      'Parallel algorithm design, OpenMP, SDK interface design ',
    ],
    achievements: [
      '26 years of working experience as a Software Architect and Programmer.',
      "Master's degree in Civil Engineering from Tsinghua University (1996-1999).",
      'Published 4 books and over 10 technical articles about software development.',
      'Authored "AutoCAD2000 ARX Development Technology".',
    ],
    specializations: [
      'CAD/BIM Data Modeling, BIM/CAD/CAE Integration',
      'AI + CAD Solutions',
      'C/C++, C#, Python Programming',
      'Geometry/Modeling Kernels (Parasolid/ACIS/OCC)',
      '3D Printing/Flexible Manufacturing (STL format)',
    ],
    prestigeProjects: [],
  },
  {
    id: 'shamin-yang',
    name: 'Shamin Yang',
    title: 'Senior Software Engineer / Solution Architect',
    location: 'Vancouver, Canada',
    experience: 20,
    avatar: '/images/shaming-yang.jpeg',
    bio: 'Highly experienced Senior Software Engineer / Solution Architect with 20+ years of .NET development and Microsoft technology expertise. Extensive experience in Web Application (.NetCore, Blazor, Angular), Windows Application (WPF, UWP), and System Integration (BizTalk, MSMQ, ETL). Proficient in DevOps (Git, TeamCity, Octopus)  and RPA platforms (UiPath, BluePrism, Workfusion). Holds multiple certifications including Google Cloud Architect and DevOps Master.',
    expertise: [
      'ASP.NET, .NET Core, Blazor, WPF, UWP ',
      'Azure, Google Cloud, AWS Integration ',
      'RPA: UiPath, BluePrism, Workfusion, AutoIT ',
      'Database: SQL Server, Oracle, PostgreSQL, MongoDB, Redis, Azure CosmosDB ',
      'DevOps: Git, TeamCity, Octopus, TDD, BDD ',
      'System Integration: BizTalk, MSMQ, SSIS, SSRS, Self-Service ETL ',
    ],
    achievements: [
      'More than 20 years .net development experience.',
      'Google Cloud Architect Certified & Professional Developer Certified (2024).',
      'HSBC Enterprise Engineering Programme Certified (2024).',
      'DevOps Master Certified (2020)  and PMP Certified (2011).',
      'Envoy Web-Automation Tool won top 10 Award in HSBC HTC (2021).',
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
        description:
          'Led development as Senior Core Engineer/Solution Designer for a self-service ETL platform , delivering advanced features like PDF/XML/Map Data Nodes, and Governance Model Processing.',
        outcome:
          'Significant contributor to enterprise data transformation, delivered approval/release process integrated with JIRA.',
        technologies: ['.NET', 'SQL Server', 'Azure', 'ETL', 'WPF', 'MongoDB'],
        year: 2020,
      },
      {
        id: 'credit-suisse-alpha',
        name: 'Credit Suisse Alpha Trading System',
        type: 'company',
        description:
          'Backend developer for Alpha web application used to automate coverage workflow based on client/trade data.',
        outcome:
          'Improved common data query by creating Redis index, implemented unit-test/integration-test/acc-test using SpecFlow (BDD) and NUnit.',
        technologies: [
          '.NET',
          'C#',
          'MongoDB',
          'Redis',
          'SpecFlow',
          'Teamcity',
          'Octopus',
        ],
        year: 2018,
      },
    ],
  },
  {
    id: 'wayne-li',
    name: 'Wayne Li',
    title: 'DevOps, Cloud Engineer & AI Solution Architect',
    location: 'Vancouver, Canada',
    experience: 10,
    avatar: '/images/wayne-li.jpg',
    bio: 'A DevOps and Cloud Engineer specializing in deploying AI solutions for government and enterprise clients. Focuses on using low-cost computing base and full-process automation tools to bridge the AI application technology gap. Expertise in AI-driven design platforms, MLOps, and scalable system architecture. Driven to deliver highly customized AI solutions that achieve technology equity and reduce the barrier to AI usage.',
    expertise: [
      'AWS, Azure, Google Cloud (DevOps & Cloud) ',
      'Docker, Kubernetes, Terraform (DevOps & Cloud)',
      'AI Solutions for Government & Enterprise ',
      'AI Design Platforms (Creative Style Exploration, Turing Work, Smart Pattern Search) ',
      'AI Engineering (Model Training, Knowledge Base, Retrieval-Augmented Generation (RAG)) ',
      'Microservices & Low-Code Platform Architecture ',
    ],
    achievements: [
      'Specializes in AI solutions for government and enterprise clients.',
      'Achieves technology equity by lowering the AI usage threshold for organizations.',
      'Expertise in AI+ innovation design in the textile and light industry, solving client problems like long design cycles and high manual dependency.',
      'Company service covers 10+ industries with 100+ successful cases.',
      'Reduced deployment time by 80%',
      'Achieved 99.9% system uptime',
    ],
    specializations: [
      'AI & Generative Design Solutions',
      'AWS, Azure, Google Cloud',
      'Docker, Kubernetes, Terraform',
      'CI/CD Pipelines (Jenkins, GitLab)',
      'Monitoring (Prometheus, Grafana)',
      'Infrastructure as Code',
    ],
    prestigeProjects: [
      {
        id: 'ai-textile-design',
        name: 'AI+ Innovation Design Platforms for Light/Textile Industry',
        type: 'project',
        description:
          'Developed a suite of AI platforms (Creative Style Exploration, Turing Work, Smart Pattern Search) for the textile industry to accelerate product iteration.',
        outcome:
          'Replaced physical sampling with digital mock-ups, cut sampling costs, broke production bottlenecks, and increased the probability of best-sellers.',
        technologies: ['AI', 'Generative Design', 'Computer Vision', 'MLOps'],
        year: 2025,
      },
    ],
  },
  {
    id: 'james-cheung',
    name: 'James Cheung',
    title: 'Strategic Development Partner (Chengdu Zhanying Tech.)',
    location: 'Chengdu, China',
    experience: 15,
    avatar: '/images/james-cheung.jpeg',
    bio: 'Representative of Chengdu Zhanying Technology Co., Ltd., a high-tech enterprise specializing in software development, customization, and implementation. With development teams in Chengdu and Hangzhou. Core business includes OA Systems, Engineering Cost Management Systems, and High-end Customization services like Mobile (Android/iOS/React Native) and Embedded Systems development.',
    expertise: [
      'OA Systems (Task, Project, Asset Management) ',
      'Engineering Cost Management Systems (Budget, Costing) ',
      'Mobile Development (Android/iOS Native, React Native) ',
      'Embedded Systems & Hardware Solutions ',
      'Enterprise ERP, MES, EKP Systems',
      'Supply Chain Finance Platforms',
    ],
    achievements: [
      'High-tech enterprise with R&D, service, and integration capabilities.',
      'Development teams based in Chengdu and Hangzhou.',
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
    prestigeProjects: [
      {
        id: 'ningbo-holographic-supervision',
        name: 'Ningbo Holographic Supervision System',
        type: 'project',
        description:
          'Engineering project management system with multi-terminal coordination (PC/Mobile) for real-time monitoring of personnel, construction progress, and approval status.',
        outcome:
          'Ensured efficient and orderly progress of engineering work through data visualization.',
        technologies: [
          'Mobile Development',
          'Data Visualization',
          'Workflow Engine',
        ],
        year: 2023,
      },
      {
        id: 'mengxin-factoring-platform',
        name: 'Mengxin Commodity Factoring Platform',
        type: 'project',
        description:
          'Online platform for enterprise lending and financing disbursement, including account opening, circulation, and repayment.',
        outcome:
          'Completed the full loan process from credit application to disbursement/repayment for clients, utilizing electronic signatures and risk/client management.',
        technologies: [
          'Financial Services',
          'Online Lending',
          'Risk Management',
          'Electronic Signature',
        ],
        year: 2022,
      },
    ],
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
