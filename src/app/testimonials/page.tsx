'use client'

import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export default function TestimonialsPage() {
  const { translations } = useLanguage()
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)

  const testimonials = translations.testimonials.list

  return (
    <div className='min-h-screen py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>
            {translations.testimonials.title}
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {translations.testimonials.subtitle}
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className='mb-16'>
          <Card className='bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-xl'>
            <CardContent className='p-8 md:p-12'>
              <div className='text-center mb-8'>
                <div className='text-6xl text-blue-600 mb-4'>"</div>
                <blockquote className='text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-8'>
                  {testimonials[selectedTestimonial].content}
                </blockquote>
                <div className='flex items-center justify-center space-x-4'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage
                      src={testimonials[selectedTestimonial].avatar}
                    />
                    <AvatarFallback className='text-lg'>
                      {testimonials[selectedTestimonial].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-left'>
                    <div className='font-bold text-lg'>
                      {testimonials[selectedTestimonial].name}
                    </div>
                    <div className='text-gray-600'>
                      {testimonials[selectedTestimonial].position}
                    </div>
                    <div className='text-gray-500 text-sm'>
                      {testimonials[selectedTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap gap-2 justify-center'>
                {testimonials[selectedTestimonial].project.technologies.map(
                  (tech, index) => (
                    <Badge key={index} variant='secondary'>
                      {tech}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Navigation */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedTestimonial === index
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTestimonial(index)}
            >
              <CardHeader className='pb-3'>
                <div className='flex items-center space-x-3'>
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className='text-sm'>
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className='text-xs'>
                      {testimonial.position} at {testimonial.company}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='flex items-center mb-2'>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className='ml-2 text-xs text-gray-600'>
                    ({testimonial.rating}/5)
                  </span>
                </div>
                <p className='text-sm text-gray-600 line-clamp-3'>
                  {testimonial.content}
                </p>
                <div className='mt-3'>
                  <Badge variant='outline' className='text-xs'>
                    {testimonial.project.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.testimonials.stats.title}
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {translations.testimonials.stats.metrics.map((metric, index) => (
              <div key={index} className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  {metric.value}
                </div>
                <div className='text-lg font-medium mb-1'>{metric.label}</div>
                <div className='text-gray-600 text-sm'>
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.testimonials.awards.title}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {translations.testimonials.awards.list.map((award, index) => (
              <Card
                key={index}
                className='text-center hover:shadow-lg transition-shadow border-0 bg-white/50 backdrop-blur-sm'
              >
                <CardContent className='p-6'>
                  <div className='text-4xl mb-4'>{award.icon}</div>
                  <h3 className='font-bold text-lg mb-2'>{award.title}</h3>
                  <p className='text-gray-600 text-sm mb-3'>
                    {award.organization}
                  </p>
                  <Badge variant='secondary' className='text-xs'>
                    {award.year}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.testimonials.clients.title}
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center'>
            {translations.testimonials.clients.logos.map((client, index) => (
              <div
                key={index}
                className='flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300'
              >
                <div className='text-2xl font-bold text-gray-400 hover:text-gray-800'>
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries Served */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.testimonials.industries.title}
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {translations.testimonials.industries.list.map(
              (industry, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <div className='text-2xl'>{industry.icon}</div>
                  <div>
                    <div className='font-medium'>{industry.name}</div>
                    <div className='text-sm text-gray-600'>
                      {industry.projects} projects
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white'>
          <h2 className='text-3xl font-bold mb-4'>
            {translations.testimonials.cta.title}
          </h2>
          <p className='text-xl mb-8 opacity-90'>
            {translations.testimonials.cta.subtitle}
          </p>
          <div className='space-x-4'>
            <Button size='lg' variant='secondary'>
              {translations.testimonials.cta.getQuote}
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-white border-white hover:bg-white hover:text-blue-600'
            >
              {translations.testimonials.cta.caseStudies}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
