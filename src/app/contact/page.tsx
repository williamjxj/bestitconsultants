'use client'

import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Instagram,
} from 'lucide-react'
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
import { ContactHero } from '@/components/ui/hero-variants'
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
  const { language, translations } = useLanguage()
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

  // Contact page content with translations
  const contactContent = {
    en: {
      hero: {
        description:
          "Ready to transform your business with cutting-edge technology? Let's discuss your project and see how our Fortune 500 expertise can help you achieve your goals.",
        ctaText: 'Schedule a Call',
        secondaryCtaText: 'View Our Work',
        badge: 'Free Consultation Available',
      },
      messages: {
        sending: 'Sending...',
        success: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        error: 'Failed to send message. Please try again.',
        networkError: 'Network error. Please check your connection and try again.',
      },
      location: {
        ourLocation: 'Our Location',
        address: 'Address',
        getDirections: 'Get Directions',
        openInGoogleMaps: 'Open in Google Maps',
        openInAppleMaps: 'Open in Apple Maps',
        nearbyLandmarks: 'Nearby Landmarks',
        landmarks: [
          'Near Guildford Town Centre',
          'Close to Highway 1 access',
          '15 minutes from Surrey Central',
        ],
      },
    },
    fr: {
      hero: {
        description:
          'Prêt à transformer votre entreprise avec une technologie de pointe? Discutons de votre projet et voyons comment notre expertise Fortune 500 peut vous aider à atteindre vos objectifs.',
        ctaText: 'Planifier un Appel',
        secondaryCtaText: 'Voir Notre Travail',
        badge: 'Consultation Gratuite Disponible',
      },
      messages: {
        sending: 'Envoi en cours...',
        success: 'Merci! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.',
        error: 'Échec de l\'envoi du message. Veuillez réessayer.',
        networkError: 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.',
      },
      location: {
        ourLocation: 'Notre Emplacement',
        address: 'Adresse',
        getDirections: 'Obtenir l\'Itinéraire',
        openInGoogleMaps: 'Ouvrir dans Google Maps',
        openInAppleMaps: 'Ouvrir dans Apple Maps',
        nearbyLandmarks: 'Points de Repère à Proximité',
        landmarks: [
          'Près du Centre Commercial Guildford',
          'Proche de l\'accès à l\'Autoroute 1',
          '15 minutes de Surrey Central',
        ],
      },
    },
    es: {
      hero: {
        description:
          '¿Listo para transformar su negocio con tecnología de vanguardia? Hablemos de su proyecto y veamos cómo nuestra experiencia Fortune 500 puede ayudarlo a alcanzar sus objetivos.',
        ctaText: 'Programar una Llamada',
        secondaryCtaText: 'Ver Nuestro Trabajo',
        badge: 'Consulta Gratuita Disponible',
      },
      messages: {
        sending: 'Enviando...',
        success: '¡Gracias! Su mensaje ha sido enviado exitosamente. Nos pondremos en contacto pronto.',
        error: 'Error al enviar el mensaje. Por favor, intente nuevamente.',
        networkError: 'Error de red. Por favor, verifique su conexión e intente nuevamente.',
      },
      location: {
        ourLocation: 'Nuestra Ubicación',
        address: 'Dirección',
        getDirections: 'Obtener Direcciones',
        openInGoogleMaps: 'Abrir en Google Maps',
        openInAppleMaps: 'Abrir en Apple Maps',
        nearbyLandmarks: 'Puntos de Referencia Cercanos',
        landmarks: [
          'Cerca del Centro Comercial Guildford',
          'Cerca del acceso a la Autopista 1',
          '15 minutos de Surrey Central',
        ],
      },
    },
    cn: {
      hero: {
        description:
          '准备用尖端技术改变您的业务了吗？让我们讨论您的项目，看看我们的财富500强专业知识如何帮助您实现目标。',
        ctaText: '安排通话',
        secondaryCtaText: '查看我们的作品',
        badge: '免费咨询可用',
      },
      messages: {
        sending: '发送中...',
        success: '谢谢！您的消息已成功发送。我们会尽快回复您。',
        error: '发送消息失败。请重试。',
        networkError: '网络错误。请检查您的连接并重试。',
      },
      location: {
        ourLocation: '我们的位置',
        address: '地址',
        getDirections: '获取路线',
        openInGoogleMaps: '在Google地图中打开',
        openInAppleMaps: '在Apple地图中打开',
        nearbyLandmarks: '附近地标',
        landmarks: [
          '靠近Guildford Town Centre',
          '靠近1号高速公路入口',
          '距离Surrey Central 15分钟',
        ],
      },
    },
  }

  const currentContent =
    contactContent[language as keyof typeof contactContent] ||
    contactContent.en

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
          message: currentContent.messages.success,
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
          message: result.error || currentContent.messages.error,
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: currentContent.messages.networkError,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderSocialIcon = (platform: string) => {
    const key = platform.toLowerCase()
    if (key.includes('facebook')) return <Facebook className='mr-2 h-5 w-5' />
    if (key.includes('twitter') || key.includes('x'))
      return <Twitter className='mr-2 h-5 w-5' />
    if (key.includes('linkedin')) return <Linkedin className='mr-2 h-5 w-5' />
    if (key.includes('github')) return <Github className='mr-2 h-5 w-5' />
    if (key.includes('youtube')) return <Youtube className='mr-2 h-5 w-5' />
    if (key.includes('instagram')) return <Instagram className='mr-2 h-5 w-5' />
    return <Linkedin className='mr-2 h-5 w-5' />
  }

  return (
    <div className='-mt-8'>
      {/* Hero Section */}
      <ContactHero
        title={translations.contact.title}
        subtitle={translations.contact.subtitle}
        description={currentContent.hero.description}
        ctaText={currentContent.hero.ctaText}
        ctaLink='#contact-form'
        secondaryCtaText={currentContent.hero.secondaryCtaText}
        secondaryCtaLink='/portfolio'
        badge={currentContent.hero.badge}
      />

      {/* Main Content */}
      <div className='min-h-screen py-20'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Contact Form */}
            <div id='contact-form' className='lg:col-span-2'>
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
                        ? currentContent.messages.sending
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
                  {translations.contact.info.details
                    .filter(
                      detail =>
                        !(
                          typeof detail?.label === 'string' &&
                          detail.label.toLowerCase().includes('address')
                        )
                    )
                    .map((detail, index) => (
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

                  {/* Quick Contact (merged) */}
                  <div className='pt-4 border-t border-gray-200'>
                    <h4 className='font-semibold mb-3'>
                      {translations.contact.quick.title}
                    </h4>
                    <p className='text-sm text-gray-600 mb-4'>
                      {translations.contact.quick.subtitle}
                    </p>
                    <div className='grid grid-cols-1 gap-3'>
                      {translations.contact.quick.options.map(
                        (option, index) => (
                          <Button
                            key={index}
                            variant='outline'
                            className='w-full justify-start'
                            asChild
                          >
                            <a href={option.link}>
                              <span className='mr-2'>{option.icon}</span>
                              {option.label}
                            </a>
                          </Button>
                        )
                      )}
                    </div>
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
                          {renderSocialIcon(social.platform)}
                          {social.platform}
                        </a>
                      </Button>
                    ))}
                  </div>
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
                    <span>{currentContent.location.ourLocation}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <h4 className='font-semibold text-lg mb-2'>
                      {currentContent.location.address}
                    </h4>
                    <p className='text-gray-600'>
                      10355 152 St
                      <br />
                      Surrey, BC V3R 7C3
                      <br />
                      Canada
                    </p>
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2'>
                      {currentContent.location.getDirections}
                    </h4>
                    <div className='space-y-2'>
                      <Button
                        variant='outline'
                        className='w-full justify-start'
                        asChild
                      >
                        <a
                          href='https://www.google.com/maps/search/?api=1&query=10355%20152%20St%2C%20Surrey%2C%20BC%20V3R%207C3'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <span className='mr-2'>🗺️</span>
                          {currentContent.location.openInGoogleMaps}
                        </a>
                      </Button>
                      <Button
                        variant='outline'
                        className='w-full justify-start'
                        asChild
                      >
                        <a
                          href='https://maps.apple.com/?q=10355+152+St,+Surrey,+BC+V3R+7C3'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <span className='mr-2'>🍎</span>
                          {currentContent.location.openInAppleMaps}
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2'>
                      {currentContent.location.nearbyLandmarks}
                    </h4>
                    <ul className='text-gray-600 space-y-1'>
                      {currentContent.location.landmarks.map((landmark, index) => (
                        <li key={index}>• {landmark}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Embed */}
              <Card className='border-0 shadow-xl overflow-hidden'>
                <div className='aspect-square lg:aspect-video'>
                  <iframe
                    src='https://www.google.com/maps?q=10355+152+St,+Surrey,+BC+V3R+7C3&output=embed'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='BestITConsultants Office Location - 10355 152 St, Surrey, BC'
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
