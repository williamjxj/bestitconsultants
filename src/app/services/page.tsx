'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Brain,
  Building2,
  Cog,
  Cloud,
  Smartphone,
  Database,
  // Sparkles,
  // Zap,
  // Shield,
  // Rocket,
  // Target,
} from 'lucide-react'
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
import { ServicesHero } from '@/components/ui/hero-variants'
import { useLanguage } from '@/contexts/LanguageContext'

const services = [
  {
    title: 'AI & Machine Learning Solutions',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
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
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
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
    icon: Cog,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
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
    icon: Cloud,
    gradient: 'from-sky-500 to-blue-500',
    bgGradient: 'from-sky-50 to-blue-50',
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
    icon: Smartphone,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
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
    icon: Database,
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50',
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
    <div className='-mt-8'>
      {/* Hero Section */}
      <ServicesHero
        title={translations.services.title}
        subtitle={translations.services.subtitle}
        description='Transform your business with our comprehensive suite of enterprise-grade solutions. From AI/ML to cloud infrastructure, we deliver the technology expertise your business needs to succeed.'
        ctaText='Get Started'
        ctaLink='/contact'
        secondaryCtaText='View Case Studies'
        secondaryCtaLink='/case-studies'
        badge='Fortune 500 Proven Solutions'
      />

      {/* Main Content */}
      <div className='min-h-screen py-20'>
        <div className='container mx-auto px-4'>
          {/* Services Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  className='group'
                >
                  <Card
                    className={`
                  h-full border-0 bg-white/80 backdrop-blur-sm
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500 ease-out
                  group-hover:scale-105
                  relative overflow-hidden
                  before:absolute before:inset-0
                  before:bg-gradient-to-br ${service.bgGradient}
                  before:opacity-0 before:transition-opacity before:duration-500
                  group-hover:before:opacity-100
                  before:z-0
                `}
                  >
                    <div className='relative z-10'>
                      <CardHeader className='pb-4'>
                        <div className='flex items-center mb-4'>
                          <motion.div
                            className={`
                            p-3 rounded-2xl bg-gradient-to-r ${service.gradient}
                            shadow-lg group-hover:shadow-xl
                            transition-all duration-300
                            group-hover:scale-110 group-hover:rotate-3
                          `}
                            whileHover={{
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.5 },
                            }}
                          >
                            <IconComponent className='w-8 h-8 text-white' />
                          </motion.div>
                          <div className='ml-4 flex-1'>
                            <CardTitle className='text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                              {service.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className='pt-0'>
                        <p className='text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                          {service.description}
                        </p>
                        <ul className='space-y-3'>
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              className='flex items-start'
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1 + featureIndex * 0.1 + 0.3,
                              }}
                              viewport={{ once: true }}
                            >
                              <motion.div
                                className='flex-shrink-0 mr-3 mt-0.5'
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className='w-5 h-5 text-green-500' />
                              </motion.div>
                              <span className='text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
                                {feature}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>

                    {/* Animated background elements */}
                    <div className='absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500'>
                      <motion.div
                        className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-full`}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Process Section */}
          <motion.div
            className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background elements */}
            <div className='absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-x-32 -translate-y-32 animate-float'></div>
            <div
              className='absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full translate-x-24 translate-y-24 animate-float'
              style={{ animationDelay: '2s' }}
            ></div>

            <motion.h2
              className='text-3xl font-bold text-center mb-12 relative z-10'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {translations.services.process.title}
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10'>
              {translations.services.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className='text-center group'
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300'
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                    animate={{
                      boxShadow: [
                        '0 4px 15px rgba(59, 130, 246, 0.3)',
                        '0 8px 25px rgba(147, 51, 234, 0.4)',
                        '0 4px 15px rgba(59, 130, 246, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className='text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300'>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className='text-3xl font-bold mb-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {translations.services.pricing.title}
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {translations.services.pricing.plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className='group'
                >
                  <Card
                    className={`relative transition-all duration-500 ${
                      plan.popular
                        ? 'border-purple-500 border-2 shadow-2xl scale-105'
                        : 'shadow-lg hover:shadow-xl'
                    } group-hover:shadow-2xl`}
                  >
                    {plan.popular && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 animate-pulse-slow'>
                          {translations.services.pricing.popular}
                        </Badge>
                      </motion.div>
                    )}
                    <CardHeader className='text-center'>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardTitle className='text-2xl group-hover:text-purple-600 transition-colors duration-300'>
                          {plan.name}
                        </CardTitle>
                        <motion.div
                          className='text-3xl font-bold text-blue-600 my-4'
                          animate={
                            plan.popular
                              ? {
                                  scale: [1, 1.05, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {plan.price}
                        </motion.div>
                        <CardDescription className='group-hover:text-gray-700 transition-colors duration-300'>
                          {plan.description}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-3 mb-8'>
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className='flex items-start'
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.2 + featureIndex * 0.1 + 0.5,
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.span
                              className='text-green-500 mr-2'
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              ✓
                            </motion.span>
                            <span className='group-hover:text-gray-700 transition-colors duration-300'>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className={`w-full transition-all duration-300 ${
                            plan.popular
                              ? 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
                              : 'hover:shadow-lg'
                          }`}
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          {translations.services.pricing.getStarted}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background elements */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36 animate-float'></div>
            <div
              className='absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32 animate-float'
              style={{ animationDelay: '3s' }}
            ></div>
            <div
              className='absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full -translate-x-24 -translate-y-24 animate-float'
              style={{ animationDelay: '1.5s' }}
            ></div>

            <motion.div className='relative z-10'>
              <motion.h2
                className='text-3xl font-bold mb-4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {translations.services.cta.title}
              </motion.h2>
              <motion.p
                className='text-xl mb-8 opacity-90'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {translations.services.cta.subtitle}
              </motion.p>
              <motion.div
                className='flex flex-col sm:flex-row gap-4 justify-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size='lg'
                    variant='secondary'
                    className='shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    {translations.services.cta.consultation}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size='lg'
                    variant='outline'
                    className='text-white border-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    {translations.services.cta.portfolio}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
