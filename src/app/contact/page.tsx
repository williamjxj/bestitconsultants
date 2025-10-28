'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Video,
  Calendar,
  Globe,
  Users,
  Zap,
  Shield,
  Headphones,
  Smartphone,
  Laptop,
  Building2,
  Star,
  CheckCircle,
  AlertCircle,
  Send,
  Copy,
  ExternalLink
} from 'lucide-react'

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
import { Badge } from '@/components/ui/badge'
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

  // Animation states
  const [isOnline, setIsOnline] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [copiedText, setCopiedText] = useState('')

  // Refs for animations
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const contactCardsRef = useRef(null)
  const mapRef = useRef(null)

  // Animation controls
  const headerControls = useAnimation()
  const formControls = useAnimation()
  const contactCardsControls = useAnimation()
  const mapControls = useAnimation()

  // Intersection observers
  const headerInView = useInView(headerRef, { once: true })
  const formInView = useInView(formRef, { once: true })
  const contactCardsInView = useInView(contactCardsRef, { once: true })
  const mapInView = useInView(mapRef, { once: true })

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Check online status
  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Trigger animations when elements come into view
  useEffect(() => {
    if (headerInView) headerControls.start('visible')
    if (formInView) formControls.start('visible')
    if (contactCardsInView) contactCardsControls.start('visible')
    if (mapInView) mapControls.start('visible')
  }, [headerInView, formInView, contactCardsInView, mapInView, headerControls, formControls, contactCardsControls, mapControls])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  // Enhanced contact information
  const contactMethods = [
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      icon: Phone,
      primary: '+1 (236) 992-3846',
      secondary: '+1 (604) 555-0123',
      status: 'Available Now',
      statusColor: 'green',
      action: 'tel:+12369923846',
      responseTime: '< 2 minutes',
      hours: '24/7 Emergency Support'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get detailed responses via email',
      icon: Mail,
      primary: 'jxjwilliam@gmail.com',
      secondary: 'support@bestitconsulting.com',
      status: 'Online',
      statusColor: 'green',
      action: 'mailto:jxjwilliam@gmail.com',
      responseTime: '< 2 hours',
      hours: 'Business Hours'
    },
    {
      id: 'video',
      title: 'Video Consultation',
      description: 'Schedule a face-to-face meeting',
      icon: Video,
      primary: 'Schedule Call',
      secondary: 'Free 30-min consultation',
      status: 'Available',
      statusColor: 'blue',
      action: 'https://calendly.com/bestitconsulting',
      responseTime: 'Same day',
      hours: 'Mon-Fri 9AM-6PM PST'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Instant messaging support',
      icon: MessageCircle,
      primary: 'Start Chat',
      secondary: 'Average response: 30 seconds',
      status: 'Online',
      statusColor: 'green',
      action: '#chat',
      responseTime: '< 30 seconds',
      hours: 'Mon-Fri 9AM-6PM PST'
    }
  ]

  const regionalOffices = [
    {
      city: 'Vancouver',
      country: 'Canada',
      address: '9727 152B Street, Surrey, BC V3R 0G5',
      phone: '+1 (236) 992-3846',
      email: 'vancouver@bestitconsulting.com',
      timezone: 'PST (UTC-8)',
      services: ['Headquarters', 'Full Services', 'Emergency Support'],
      icon: Building2
    },
    {
      city: 'Chengdu',
      country: 'China',
      address: '456 Innovation Avenue, Tech City',
      phone: '+86 28 1234 5678',
      email: 'chengdu@bestitconsulting.com',
      timezone: 'CST (UTC+8)',
      services: ['Development Center', 'Mobile Apps', 'AI/ML'],
      icon: Laptop
    },
    {
      city: 'Hangzhou',
      country: 'China',
      address: '789 Digital Boulevard, Silicon Valley',
      phone: '+86 571 8765 4321',
      email: 'hangzhou@bestitconsulting.com',
      timezone: 'CST (UTC+8)',
      services: ['R&D Center', 'Cloud Solutions', 'DevOps'],
      icon: Globe
    }
  ]

  const emergencyContacts = [
    {
      type: 'Critical System Down',
      contact: '+1 (236) 992-3846',
      response: 'Immediate',
      icon: AlertCircle,
      color: 'red'
    },
    {
      type: 'Security Incident',
      contact: 'security@bestitconsulting.com',
      response: '< 15 minutes',
      icon: Shield,
      color: 'orange'
    },
    {
      type: 'Data Recovery',
      contact: '+1 (604) 555-0123',
      response: '< 1 hour',
      icon: Zap,
      color: 'yellow'
    }
  ]

  // Utility functions
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getBusinessStatus = () => {
    const now = new Date()
    const hour = now.getHours()
    const day = now.getDay()

    if (day === 0) return { status: 'Closed', color: 'red' } // Sunday
    if (day === 6 && hour < 10) return { status: 'Closed', color: 'red' } // Saturday before 10
    if (day === 6 && hour >= 16) return { status: 'Closed', color: 'red' } // Saturday after 4
    if (hour >= 9 && hour < 18) return { status: 'Open', color: 'green' }
    if (hour >= 18 && hour < 22) return { status: 'After Hours', color: 'yellow' }
    return { status: 'Closed', color: 'red' }
  }

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

  const businessStatus = getBusinessStatus()

  return (
    <div className='min-h-screen py-20 relative overflow-hidden'>
      {/* Floating background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl'
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className='absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl'
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className='absolute bottom-40 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl'
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Enhanced Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={fadeInUp}
          className='text-center mb-16'
        >
          <motion.h1
            className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6'
            variants={fadeInUp}
          >
            {translations.contact.title}
          </motion.h1>
          <motion.p
            className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'
            variants={fadeInUp}
          >
            {translations.contact.subtitle}
          </motion.p>

          {/* Live Status Bar */}
          <motion.div
            className='flex items-center justify-center space-x-6 mb-8'
            variants={fadeInUp}
          >
            <div className='flex items-center space-x-2'>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className='text-sm text-gray-600'>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-600'>
                {formatTime(currentTime)} PST
              </span>
            </div>
            <Badge
              variant={businessStatus.color === 'green' ? 'default' : businessStatus.color === 'yellow' ? 'secondary' : 'destructive'}
              className='flex items-center space-x-1'
            >
              <div className={`w-2 h-2 rounded-full ${businessStatus.color === 'green' ? 'bg-green-500' : businessStatus.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span>{businessStatus.status}</span>
            </Badge>
          </motion.div>
        </motion.div>

        {/* Emergency Contact Banner */}
        <motion.div
          className='mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className='border-l-4 border-red-500 bg-red-50/50 backdrop-blur-sm'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <AlertCircle className='w-8 h-8 text-red-500' />
                  <div>
                    <h3 className='text-lg font-semibold text-red-800'>Emergency Support Available</h3>
                    <p className='text-red-600'>Critical issues? Call our 24/7 emergency line</p>
                  </div>
                </div>
                <Button
                  variant='destructive'
                  size='lg'
                  className='animate-pulse'
                  asChild
                >
                  <a href='tel:+12369923846'>
                    <Phone className='w-4 h-4 mr-2' />
                    Call Now
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Contact Methods Grid */}
        <motion.div
          ref={contactCardsRef}
          initial="hidden"
          animate={contactCardsControls}
          variants={staggerContainer}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'
        >
          {contactMethods.map((method, index) => (
            <motion.div key={method.id} variants={scaleIn}>
              <Card className='group hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 cursor-pointer'>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <method.icon className='w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors' />
                    <Badge
                      variant={method.statusColor === 'green' ? 'default' : method.statusColor === 'blue' ? 'secondary' : 'outline'}
                      className='text-xs'
                    >
                      {method.status}
                    </Badge>
                  </div>
                  <h3 className='font-semibold text-lg mb-2 group-hover:text-blue-700 transition-colors'>
                    {method.title}
                  </h3>
                  <p className='text-gray-600 text-sm mb-4'>{method.description}</p>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>{method.primary}</span>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard(method.primary, method.title)}
                        className='opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        <Copy className='w-3 h-3' />
                      </Button>
                    </div>
                    <p className='text-xs text-gray-500'>{method.secondary}</p>
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>{method.responseTime}</span>
                      <span>{method.hours}</span>
                    </div>
                  </div>
                  <Button
                    className='w-full mt-4 group-hover:bg-blue-600 transition-colors'
                    asChild
                  >
                    <a href={method.action} target={method.action.startsWith('http') ? '_blank' : '_self'}>
                      {method.id === 'video' || method.id === 'chat' ? method.primary : 'Contact'}
                      <ExternalLink className='w-3 h-3 ml-2' />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Enhanced Contact Form */}
          <div className='lg:col-span-2'>
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formControls}
              variants={slideInLeft}
            >
              <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300'>
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

          {/* Enhanced Contact Information Sidebar */}
          <motion.div
            className='space-y-8'
            initial="hidden"
            animate={formControls}
            variants={slideInRight}
          >
            {/* Regional Offices */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Globe className='w-5 h-5 text-blue-600' />
                  <span>Regional Offices</span>
                </CardTitle>
                <CardDescription>Our global presence</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {regionalOffices.map((office, index) => (
                  <motion.div
                    key={office.city}
                    className='group p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 cursor-pointer'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex items-start space-x-3'>
                      <office.icon className='w-6 h-6 text-blue-600 mt-1' />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                          <h4 className='font-semibold text-lg group-hover:text-blue-700 transition-colors'>
                            {office.city}
                          </h4>
                          <Badge variant='outline' className='text-xs'>
                            {office.timezone}
                          </Badge>
                        </div>
                        <p className='text-sm text-gray-600 mb-2'>{office.country}</p>
                        <p className='text-xs text-gray-500 mb-3'>{office.address}</p>
                        <div className='space-y-1'>
                          <div className='flex items-center justify-between text-xs'>
                            <span className='text-gray-600'>Phone:</span>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => copyToClipboard(office.phone, `${office.city} Phone`)}
                              className='h-auto p-0 text-xs hover:text-blue-600'
                            >
                              {office.phone}
                            </Button>
                          </div>
                          <div className='flex items-center justify-between text-xs'>
                            <span className='text-gray-600'>Email:</span>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => copyToClipboard(office.email, `${office.city} Email`)}
                              className='h-auto p-0 text-xs hover:text-blue-600'
                            >
                              {office.email}
                            </Button>
                          </div>
                        </div>
                        <div className='flex flex-wrap gap-1 mt-3'>
                          {office.services.map((service, serviceIndex) => (
                            <Badge key={serviceIndex} variant='secondary' className='text-xs'>
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Contact Details */}
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Users className='w-5 h-5 text-blue-600' />
                  <span>{translations.contact.info.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {translations.contact.info.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    className='flex items-start space-x-3 group'
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='text-2xl group-hover:scale-110 transition-transform duration-200'>{detail.icon}</div>
                    <div className='flex-1'>
                      <div className='font-medium group-hover:text-blue-700 transition-colors'>{detail.label}</div>
                      <div className='text-gray-600 text-sm flex items-center justify-between'>
                        <span>{detail.value}</span>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => copyToClipboard(detail.value, detail.label)}
                          className='opacity-0 group-hover:opacity-100 transition-opacity h-auto p-1'
                        >
                          <Copy className='w-3 h-3' />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Office Hours */}
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Clock className='w-5 h-5 text-blue-600' />
                  <span>{translations.contact.hours.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {translations.contact.hours.schedule.map((schedule, index) => (
                    <motion.div
                      key={index}
                      className='flex justify-between items-center p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors'
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className='font-medium'>{schedule.days}</span>
                      <Badge variant='outline'>{schedule.hours}</Badge>
                    </motion.div>
                  ))}
                </div>
                <div className='mt-4 p-3 bg-green-50 rounded-lg border border-green-200'>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='w-4 h-4 text-green-600' />
                    <span className='text-sm font-medium text-green-800'>Current Status: {businessStatus.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <AlertCircle className='w-5 h-5 text-red-600' />
                  <span>Emergency Contacts</span>
                </CardTitle>
                <CardDescription>Critical issues requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={contact.type}
                    className='p-4 rounded-lg bg-white/70 hover:bg-white/90 transition-all duration-300 cursor-pointer'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center space-x-3'>
                        <contact.icon className={`w-5 h-5 ${
                          contact.color === 'red' ? 'text-red-600' :
                          contact.color === 'orange' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                        <span className='font-medium text-sm'>{contact.type}</span>
                      </div>
                      <Badge
                        variant={contact.color === 'red' ? 'destructive' : contact.color === 'orange' ? 'secondary' : 'outline'}
                        className='text-xs'
                      >
                        {contact.response}
                      </Badge>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => copyToClipboard(contact.contact, contact.type)}
                      className='w-full justify-start text-xs hover:text-blue-600'
                    >
                      {contact.contact}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Social Media */}
            <Card className='border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Globe className='w-5 h-5 text-blue-600' />
                  <span>{translations.contact.social.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-3'>
                  {translations.contact.social.links.map((social, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant='outline'
                        className='w-full justify-start group hover:bg-blue-50 hover:border-blue-300 transition-all duration-300'
                        asChild
                      >
                        <a
                          href={social.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <span className='mr-2 group-hover:scale-110 transition-transform duration-200'>{social.icon}</span>
                          <span className='text-sm'>{social.platform}</span>
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card className='border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
              <CardHeader>
                <CardTitle className='text-white flex items-center space-x-2'>
                  <Zap className='w-5 h-5' />
                  <span>{translations.contact.quick.title}</span>
                </CardTitle>
                <CardDescription className='text-blue-100'>
                  {translations.contact.quick.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {translations.contact.quick.options.map((option, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant='secondary'
                      className='w-full justify-start hover:bg-white/20 transition-all duration-300'
                      asChild
                    >
                      <a href={option.link}>
                        <span className='mr-2'>{option.icon}</span>
                        {option.label}
                      </a>
                    </Button>
                  </motion.div>
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
                  title='BestITConsulting Office Location - 9727 152B Street, Surrey, BC'
                />
              </div>
            </Card>
          </div>
        </div>
        {/* Enhanced FAQ Section */}
        <motion.div
          className='mt-20'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className='text-3xl font-bold text-center mb-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {translations.contact.faq.title}
          </motion.h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {translations.contact.faq.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className='border-0 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group'>
                  <CardHeader>
                    <CardTitle className='text-lg group-hover:text-blue-700 transition-colors'>
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-600'>{item.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Location Map */}
        <motion.div
          ref={mapRef}
          initial="hidden"
          animate={mapControls}
          variants={staggerContainer}
          className='mt-20'
        >
          <motion.h2
            className='text-3xl font-bold text-center mb-12'
            variants={fadeInUp}
          >
            {translations.contact.location.title}
          </motion.h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Enhanced Address Information */}
            <motion.div variants={slideInLeft}>
              <Card className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300'>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <MapPin className='w-6 h-6 text-blue-600' />
                    <span>Our Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='p-4 bg-blue-50 rounded-lg'>
                    <h4 className='font-semibold text-lg mb-3 flex items-center space-x-2'>
                      <Building2 className='w-5 h-5 text-blue-600' />
                      <span>Headquarters</span>
                    </h4>
                    <p className='text-gray-700 leading-relaxed'>
                      9727 152B Street<br />
                      Surrey, BC V3R 0G5<br />
                      Canada
                    </p>
                  </div>

                  <div>
                    <h4 className='font-semibold text-lg mb-3 flex items-center space-x-2'>
                      <Smartphone className='w-5 h-5 text-green-600' />
                      <span>Get Directions</span>
                    </h4>
                    <div className='space-y-3'>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant='outline'
                          className='w-full justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-300'
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
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant='outline'
                          className='w-full justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-300'
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
                      </motion.div>
                    </div>
                  </div>

                  <div className='p-4 bg-gray-50 rounded-lg'>
                    <h4 className='font-semibold text-lg mb-3 flex items-center space-x-2'>
                      <Star className='w-5 h-5 text-yellow-600' />
                      <span>Nearby Landmarks</span>
                    </h4>
                    <ul className='text-gray-600 space-y-2'>
                      <li className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                        <span>Near Guildford Town Centre</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                        <span>Close to Highway 1 access</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                        <span>15 minutes from Surrey Central</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                        <span>Easy access to Vancouver Airport</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Google Maps Embed */}
            <motion.div variants={slideInRight}>
              <Card className='border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300'>
                <div className='aspect-square lg:aspect-video relative'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.1!2d-122.813385!3d49.196667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548676c8b7a8f5f1%3A0x123456789abcdef!2s9727%20152B%20St%2C%20Surrey%2C%20BC%20V3R%200G5%2C%20Canada!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='BestITConsulting Office Location - 9727 152B Street, Surrey, BC'
                    className='rounded-lg'
                  />
                  <div className='absolute top-4 right-4'>
                    <Badge variant='secondary' className='bg-white/90 backdrop-blur-sm'>
                      <MapPin className='w-3 h-3 mr-1' />
                      Live Map
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Copy Success Toast */}
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className='fixed bottom-8 right-8 z-50'
          >
            <Card className='bg-green-500 text-white border-0 shadow-xl'>
              <CardContent className='p-4 flex items-center space-x-2'>
                <CheckCircle className='w-5 h-5' />
                <span className='font-medium'>Copied {copiedText} to clipboard!</span>
              </CardContent>
            </Card>
          </motion.div>
        )}
