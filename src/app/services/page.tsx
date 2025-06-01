'use client'

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

const serviceIcons = {
  'web-development': '🌐',
  'mobile-apps': '📱',
  'cloud-solutions': '☁️',
  'ai-ml': '🤖',
  devops: '⚙️',
  consulting: '💼',
}

export default function ServicesPage() {
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
          {translations.services.list.map((service, index) => (
            <Card
              key={index}
              className='h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/50 backdrop-blur-sm'
            >
              <CardHeader>
                <div className='text-4xl mb-4'>
                  {serviceIcons[service.icon as keyof typeof serviceIcons] ||
                    '💻'}
                </div>
                <CardTitle className='text-xl mb-2'>{service.title}</CardTitle>
                <CardDescription className='text-gray-600'>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex flex-wrap gap-2'>
                    {service.technologies?.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant='secondary'
                        className='text-xs'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className='pt-4'>
                    <p className='text-sm text-gray-500 mb-3'>
                      {translations.services.deliverables}:
                    </p>
                    <ul className='text-sm space-y-1'>
                      {service.deliverables?.map((deliverable, delIndex) => (
                        <li key={delIndex} className='flex items-start'>
                          <span className='text-green-500 mr-2'>✓</span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
                className={`relative ${plan.popular ? 'border-purple-500 border-2' : ''}`}
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
                    className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
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
