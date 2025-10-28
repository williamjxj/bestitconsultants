'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { translations } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, newsletter: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          budget: '',
          timeline: '',
          message: '',
          newsletter: false,
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>
            {translations.contact.title}
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {translations.contact.subtitle}
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-2xl'>
                  {translations.contact.form.title}
                </CardTitle>
                <CardDescription>
                  {translations.contact.form.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>
                        {translations.contact.form.fields.name.label}
                      </Label>
                      <Input
                        id='name'
                        name='name'
                        placeholder={
                          translations.contact.form.fields.name.placeholder
                        }
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>
                        {translations.contact.form.fields.email.label}
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder={
                          translations.contact.form.fields.email.placeholder
                        }
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='company'>
                        {translations.contact.form.fields.company.label}
                      </Label>
                      <Input
                        id='company'
                        name='company'
                        placeholder={
                          translations.contact.form.fields.company.placeholder
                        }
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>
                        {translations.contact.form.fields.phone.label}
                      </Label>
                      <Input
                        id='phone'
                        name='phone'
                        placeholder={
                          translations.contact.form.fields.phone.placeholder
                        }
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='service'>
                        {translations.contact.form.fields.service.label}
                      </Label>
                      <Select
                        onValueChange={value =>
                          handleSelectChange('service', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              translations.contact.form.fields.service
                                .placeholder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {translations.contact.form.fields.service.options.map(
                            (option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='budget'>
                        {translations.contact.form.fields.budget.label}
                      </Label>
                      <Select
                        onValueChange={value =>
                          handleSelectChange('budget', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              translations.contact.form.fields.budget
                                .placeholder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {translations.contact.form.fields.budget.options.map(
                            (option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='timeline'>
                      {translations.contact.form.fields.timeline.label}
                    </Label>
                    <Select
                      onValueChange={value =>
                        handleSelectChange('timeline', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            translations.contact.form.fields.timeline
                              .placeholder
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {translations.contact.form.fields.timeline.options.map(
                          (option, index) => (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='message'>
                      {translations.contact.form.fields.message.label}
                    </Label>
                    <Textarea
                      id='message'
                      name='message'
                      placeholder={
                        translations.contact.form.fields.message.placeholder
                      }
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='newsletter'
                      checked={formData.newsletter}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor='newsletter' className='text-sm'>
                      {translations.contact.form.fields.newsletter.label}
                    </Label>
                  </div>

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-lg text-center ${
                        submitStatus.type === 'success'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <Button
                    type='submit'
                    className='w-full'
                    size='lg'
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Sending...'
                      : translations.contact.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            {/* Contact Details */}
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle>{translations.contact.info.title}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {translations.contact.info.details.map((detail, index) => (
                  <div key={index} className='flex items-start space-x-3'>
                    <div className='text-2xl'>{detail.icon}</div>
                    <div>
                      <div className='font-medium'>{detail.label}</div>
                      <div className='text-gray-600 text-sm'>
                        {detail.value}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle>{translations.contact.hours.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {translations.contact.hours.schedule.map(
                    (schedule, index) => (
                      <div key={index} className='flex justify-between'>
                        <span className='font-medium'>{schedule.days}</span>
                        <span className='text-gray-600'>{schedule.hours}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle>{translations.contact.social.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4'>
                  {translations.contact.social.links.map((social, index) => (
                    <Button
                      key={index}
                      variant='outline'
                      className='justify-start'
                      asChild
                    >
                      <a
                        href={social.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='mr-2'>{social.icon}</span>
                        {social.platform}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card className='border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
              <CardHeader>
                <CardTitle className='text-white'>
                  {translations.contact.quick.title}
                </CardTitle>
                <CardDescription className='text-blue-100'>
                  {translations.contact.quick.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {translations.contact.quick.options.map((option, index) => (
                  <Button
                    key={index}
                    variant='secondary'
                    className='w-full justify-start'
                    asChild
                  >
                    <a href={option.link}>
                      <span className='mr-2'>{option.icon}</span>
                      {option.label}
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-20'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.contact.faq.title}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {translations.contact.faq.items.map((item, index) => (
              <Card
                key={index}
                className='border-0 bg-white/50 backdrop-blur-sm'
              >
                <CardHeader>
                  <CardTitle className='text-lg'>{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className='mt-20'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {translations.contact.location.title}
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Address Information */}
            <Card className='border-0 shadow-xl'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <span className='text-2xl'>📍</span>
                  <span>Our Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold text-lg mb-2'>Address</h4>
                  <p className='text-gray-600'>
                    9727 152B Street
                    <br />
                    Surrey, BC V3R 0G5
                    <br />
                    Canada
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold text-lg mb-2'>Get Directions</h4>
                  <div className='space-y-2'>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      asChild
                    >
                      <a
                        href='https://maps.google.com/maps?q=9727+152B+Street,+Surrey,+BC+V3R+0G5,+Canada'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='mr-2'>🗺️</span>
                        Open in Google Maps
                      </a>
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      asChild
                    >
                      <a
                        href='https://maps.apple.com/?q=9727+152B+Street,+Surrey,+BC+V3R+0G5,+Canada'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='mr-2'>🍎</span>
                        Open in Apple Maps
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold text-lg mb-2'>
                    Nearby Landmarks
                  </h4>
                  <ul className='text-gray-600 space-y-1'>
                    <li>• Near Guildford Town Centre</li>
                    <li>• Close to Highway 1 access</li>
                    <li>• 15 minutes from Surrey Central</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Embed */}
            <Card className='border-0 shadow-xl overflow-hidden'>
              <div className='aspect-square lg:aspect-video'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.1!2d-122.813385!3d49.196667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548676c8b7a8f5f1%3A0x123456789abcdef!2s9727%20152B%20St%2C%20Surrey%2C%20BC%20V3R%200G5%2C%20Canada!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='BestITConsultants Office Location - 9727 152B Street, Surrey, BC'
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
