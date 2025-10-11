// src/app/team/page.tsx

import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const teamMembers = [
  {
    name: 'William Jiang',
    role: 'Founder & CEO',
    avatar: '/avatars/william.jpg',
    fallback: 'WJ',
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
  },
  {
    name: 'Chengdu Zhanying Technology Co., Ltd.',
    role: 'Strategic Development Partner',
    avatar: '/avatars/chengdu.jpg',
    fallback: 'CZ',
    bio: 'Professional software development company with teams in Chengdu and Hangzhou. Specializes in OA systems, engineering cost management, mobile development, and government solutions. Serves Fortune 500 clients, government agencies, and major engineering companies.',
    expertise: [
      'OA Systems (Task, Project, Asset Management)',
      'Engineering Cost Management Systems',
      'Mobile Development (Android/iOS, React Native)',
      'Embedded Systems & Hardware Solutions',
      'Enterprise ERP, MES, EKP Systems',
      'Supply Chain Finance Platforms',
    ],
    teamComposition: [
      'Web Developers: 5',
      'Java Developers: 7',
      '.NET Developers: 2',
      'Mobile Developers: 4 (Android: 2, iOS: 2)',
      'UI Designers: 1',
      'Product & Sales: 2',
      'Support Team: 2',
    ],
    notableClients: [
      'Government Agencies & Military Units',
      'Beijing Science Press',
      'Chongqing University of Technology',
      'Multiple Engineering Companies',
      'Aerospace Industry Partners',
    ],
  },
  {
    name: 'Shamin Yang',
    role: '.NET Architecture Specialist',
    avatar: '/avatars/shamin.jpg',
    fallback: 'SY',
    bio: '20+ years Microsoft technology expert with extensive Fortune 500 experience. Led major projects at HSBC (Transformers ETL Platform), IBM (Tiffany e-Commerce), HP (GM applications), and EPAM (Credit Suisse Alpha). Multiple certifications including Google Cloud Architect and DevOps Master.',
    expertise: [
      'ASP.NET, .NET Core, Blazor, WPF, UWP',
      'Azure, Google Cloud, AWS Integration',
      'RPA: UiPath, BluePrism, WorkFusion',
      'Database: SQL Server, Oracle, MongoDB',
      'DevOps: Git, TeamCity, Octopus, PowerShell',
      'System Integration: BizTalk, MSMQ, ETL',
    ],
    certifications: [
      'Google Cloud Architect & Professional Developer (2024)',
      'HSBC Enterprise Engineering Programme (2024)',
      'DevOps Master Certified (2020)',
      'PMP Certified (2011)',
      'RPA Platform Certified: UiPath, BluePrism (2018)',
    ],
    majorProjects: [
      'HSBC Transformers ETL Platform (2020-Present)',
      'Credit Suisse Alpha Trading System (EPAM)',
      'Tiffany Global e-Commerce Platform (IBM)',
      'Netherlands Government Energy Systems (IBM)',
      'GM Asset Management Systems (HP)',
      'Huawei MateBook Assistant (iSoftstone)',
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
      <div className='grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto'>
        {teamMembers.map(member => (
          <Card key={member.name} className='p-6'>
            <CardHeader className='text-center'>
              <Avatar className='w-32 h-32 mx-auto mb-4'>
                <AvatarImage src={member.avatar} />
                <AvatarFallback className='text-2xl'>
                  {member.fallback}
                </AvatarFallback>
              </Avatar>
              <CardTitle className='text-2xl'>{member.name}</CardTitle>
              <p className='text-muted-foreground text-lg'>{member.role}</p>
            </CardHeader>
            <CardContent className='space-y-6'>
              <p className='text-center text-lg leading-relaxed'>
                {member.bio}
              </p>

              <div className='text-center'>
                <h4 className='font-semibold mb-3 text-lg'>
                  Technical Expertise
                </h4>
                <div className='flex flex-wrap justify-center gap-2 mb-4'>
                  {member.expertise.map(skill => (
                    <span
                      key={skill}
                      className='bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {member.achievements && (
                <div className='text-center'>
                  <h4 className='font-semibold mb-3 text-lg'>
                    Key Achievements
                  </h4>
                  <div className='flex flex-wrap justify-center gap-2 mb-4'>
                    {member.achievements.map(achievement => (
                      <span
                        key={achievement}
                        className='bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full'
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.teamComposition && (
                <div className='text-center'>
                  <h4 className='font-semibold mb-3 text-lg'>
                    Team Composition
                  </h4>
                  <div className='flex flex-wrap justify-center gap-2 mb-4'>
                    {member.teamComposition.map(role => (
                      <span
                        key={role}
                        className='bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full'
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.certifications && (
                <div className='text-center'>
                  <h4 className='font-semibold mb-3 text-lg'>Certifications</h4>
                  <div className='flex flex-wrap justify-center gap-2 mb-4'>
                    {member.certifications.map(cert => (
                      <span
                        key={cert}
                        className='bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full'
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.majorProjects && (
                <div className='text-center'>
                  <h4 className='font-semibold mb-3 text-lg'>Major Projects</h4>
                  <div className='flex flex-wrap justify-center gap-2 mb-4'>
                    {member.majorProjects.map(project => (
                      <span
                        key={project}
                        className='bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full'
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.notableClients && (
                <div className='text-center'>
                  <h4 className='font-semibold mb-3 text-lg'>
                    Notable Clients
                  </h4>
                  <div className='flex flex-wrap justify-center gap-2'>
                    {member.notableClients.map(client => (
                      <span
                        key={client}
                        className='bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full'
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TeamPage
