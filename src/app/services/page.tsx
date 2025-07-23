'use client'

import { CheckCircle } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

const services = [
  {
    title: 'AI & Machine Learning Solutions',
    description:
      'Enterprise-grade AI/ML solutions with proven track record. From ML Data Pipelines at Xperi to real-time trading systems, we deliver production-ready AI solutions with MLOps, Kubernetes optimization, and modern AI tool integration.',
    features: [
      'ML Data Pipelines & MLOps (Kubeflow, CUDA, Airflow)',
      'GPU/CPU Optimization in Kubernetes',
      'AI Tool Integration (ChatGPT, Claude, LangChain)',
      'Real-time Data Processing & Analytics',
      'Model Training & Deployment Automation',
    ],
  },
  {
    title: 'Enterprise Software Development',
    description:
      'Full-stack enterprise applications with Fortune 500 experience. From HSBC banking platforms to Credit Suisse trading systems, we build scalable, secure enterprise solutions using modern architectures.',
    features: [
      'React.js, Node.js, Python Full-Stack Development',
      '.NET Core, Java Spring Boot Enterprise Apps',
      'Microservices Architecture & GraphQL APIs',
      'Real-time Systems (WebSockets, Trading Platforms)',
      'Banking & Financial Services Compliance',
    ],
  },
  {
    title: 'System Integration & Automation',
    description:
      'Expert system integration and business process automation. From Netherlands Government energy systems to enterprise ETL platforms, we connect complex systems and automate critical business processes.',
    features: [
      'RPA Solutions (UiPath, BluePrism, WorkFusion)',
      'ETL Platforms & Data Integration',
      'BizTalk & Enterprise Service Bus',
      'API Integration & Legacy Modernization',
      'Government & Enterprise System Integration',
    ],
  },
  {
    title: 'Cloud & DevOps Solutions',
    description:
      'Complete cloud transformation and DevOps implementation. With experience at major cloud providers and container orchestration, we deliver scalable, reliable cloud solutions for enterprise workloads.',
    features: [
      'Kubernetes & Docker Container Orchestration',
      'AWS, Azure, Google Cloud Migration',
      'CI/CD Pipeline Implementation (Jenkins, TeamCity)',
      'Infrastructure as Code & Automation',
      'Monitoring & Observability (Prometheus, ElasticSearch)',
    ],
  },
  {
    title: 'Mobile & Cross-Platform Development',
    description:
      'Native and cross-platform mobile solutions from concept to deployment. With experience in enterprise mobile apps for major corporations, we deliver high-performance mobile applications.',
    features: [
      'iOS Native Development (Swift, Objective-C)',
      'Android Native Development (Java, Kotlin)',
      'React Native Cross-Platform Solutions',
      'Enterprise Mobile App Architecture',
      'App Store & Play Store Deployment',
    ],
  },
  {
    title: 'OA & Enterprise Management Systems',
    description:
      'Specialized enterprise management solutions including OA systems, ERP, engineering cost management, and government project implementations. Proven success with major Chinese enterprises and government agencies.',
    features: [
      'OA Systems (Task, Project, Asset Management)',
      'Engineering Cost Management Systems',
      'ERP, MES, EKP Enterprise Solutions',
      'Government & Military Project Systems',
      'Supply Chain Finance Platforms',
    ],
  },
]

const ServicesPage = () => {
  const { translations } = useLanguage()

  return (
    <div className='min-h-screen py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>
            {translations.services.title}
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {translations.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {services.map(service => (
            <Card
              key={service.title}
              className='h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/50 backdrop-blur-sm'
            >
              <CardHeader>
                <CardTitle className='text-xl mb-2'>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='mb-4'>{service.description}</p>
                <ul>
                  {service.features.map(feature => (
                    <li key={feature} className='flex items-center mb-2'>
                      <CheckCircle className='w-5 h-5 text-green-500 mr-2' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.services.process.title}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {translations.services.process.steps.map((step, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4'>
                  {index + 1}
                </div>
                <h3 className='text-lg font-semibold mb-2'>{step.title}</h3>
                <p className='text-gray-600 text-sm'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-8'>
            {translations.services.pricing.title}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {translations.services.pricing.plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? 'border-purple-500 border-2' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500'>
                    {translations.services.pricing.popular}
                  </Badge>
                )}
                <CardHeader className='text-center'>
                  <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                  <div className='text-3xl font-bold text-blue-600 my-4'>
                    {plan.price}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-3 mb-8'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-start'>
                        <span className='text-green-500 mr-2'>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {translations.services.pricing.getStarted}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white'>
          <h2 className='text-3xl font-bold mb-4'>
            {translations.services.cta.title}
          </h2>
          <p className='text-xl mb-8 opacity-90'>
            {translations.services.cta.subtitle}
          </p>
          <div className='space-x-4'>
            <Button size='lg' variant='secondary'>
              {translations.services.cta.consultation}
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-white border-white hover:bg-white hover:text-blue-600'
            >
              {translations.services.cta.portfolio}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
