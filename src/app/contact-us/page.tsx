'use client'

import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Instagram,
} from 'lucide-react'
import { Suspense, useEffect } from 'react'

import { AnimatedFAQ } from '@/components/contact/AnimatedFAQ'
import { ContactForm } from '@/components/contact/ContactForm'
import Breadcrumb from '@/components/seo/Breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FullWidthHeroWrapper } from '@/components/ui/full-width-hero-wrapper'
import { ContactHero } from '@/components/ui/hero-variants'
import { ShineBorder } from '@/components/ui/shine-border'
import { useLanguage } from '@/contexts/LanguageContext'
import { getR2ImageUrl } from '@/lib/utils'

export default function ContactPage() {
  const { language, translations } = useLanguage()

  // Scroll to contact form when hash is present
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      const formElement = document.getElementById('contact-form')
      if (formElement) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [])

  // Contact page content with translations
  const contactContent = {
    en: {
      hero: {
        description:
          "Ready to transform your business with cutting-edge technology? Let's discuss your project and see how our Fortune 500 expertise can help you achieve your goals.",
        ctaText: 'Schedule a Call',
        secondaryCtaText: 'View Case Studies',
        badge: 'Free Consultation Available',
      },
      messages: {
        sending: 'Sending...',
        success:
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        error: 'Failed to send message. Please try again.',
        networkError:
          'Network error. Please check your connection and try again.',
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
        success:
          'Merci! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.',
        error: "Échec de l'envoi du message. Veuillez réessayer.",
        networkError:
          'Erreur réseau. Veuillez vérifier votre connexion et réessayer.',
      },
      location: {
        ourLocation: 'Notre Emplacement',
        address: 'Adresse',
        getDirections: "Obtenir l'Itinéraire",
        openInGoogleMaps: 'Ouvrir dans Google Maps',
        openInAppleMaps: 'Ouvrir dans Apple Maps',
        nearbyLandmarks: 'Points de Repère à Proximité',
        landmarks: [
          'Près du Centre Commercial Guildford',
          "Proche de l'accès à l'Autoroute 1",
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
        success:
          '¡Gracias! Su mensaje ha sido enviado exitosamente. Nos pondremos en contacto pronto.',
        error: 'Error al enviar el mensaje. Por favor, intente nuevamente.',
        networkError:
          'Error de red. Por favor, verifique su conexión e intente nuevamente.',
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
    contactContent[language as keyof typeof contactContent] || contactContent.en

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
    <div>
      {/* Hero Section */}
      <FullWidthHeroWrapper>
        <ContactHero
          title={translations.contact.title}
          subtitle={translations.contact.subtitle}
          description={currentContent.hero.description}
          ctaText={currentContent.hero.ctaText}
          ctaLink='#contact-form'
          secondaryCtaText={currentContent.hero.secondaryCtaText}
          secondaryCtaLink='/portfolio'
          badge={currentContent.hero.badge}
          background='image'
          backgroundImage={getR2ImageUrl('optimized/hs-6.webp')}
          overlay={false}
          imageBrightness={0.8}
          imageContrast={1.1}
          imagePosition='center center'
          enableParallax={true}
        />
      </FullWidthHeroWrapper>

      {/* Breadcrumb - Hidden visually but provides SEO structured data */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact-us', isActive: true },
        ]}
        hideVisual={true}
      />

      {/* Main Content */}
      <div className='min-h-screen pt-16 pb-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          {/* Contact Us Section */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-center mb-12 main-content-title'>
              {translations.contact.form.title}
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
              {/* Contact Form */}
              <div id='contact-form' className='lg:col-span-2'>
                <Card className='relative w-full overflow-hidden border-0 shadow-xl bg-white/50 backdrop-blur-sm'>
                  <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
                  <CardHeader>
                    <CardDescription>
                      {translations.contact.form.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={
                        <div className='flex items-center justify-center py-8'>
                          <div className='text-muted-foreground'>
                            Loading form...
                          </div>
                        </div>
                      }
                    >
                      <ContactForm />
                    </Suspense>
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
                      .map((detail, index) => {
                        // Check if this detail should be displayed inline (phone, email, website)
                        const isInline =
                          detail.label?.toLowerCase() === 'phone' ||
                          detail.label?.toLowerCase() === 'email' ||
                          detail.label?.toLowerCase() === 'website'

                        // Check if value is an array (for multiple emails)
                        const isEmailArray =
                          detail.label?.toLowerCase() === 'email' &&
                          Array.isArray(detail.value)

                        return (
                          <div
                            key={index}
                            className='flex items-start space-x-3'
                          >
                            <div className='text-2xl'>{detail.icon}</div>
                            <div>
                              {isEmailArray ? (
                                <>
                                  <div className='font-medium mb-1'>
                                    {detail.label}
                                  </div>
                                  <div className='text-sm space-y-1 main-content-paragraph'>
                                    {(detail.value as string[]).map(
                                      (email: string, emailIndex: number) => (
                                        <div key={emailIndex}>{email}</div>
                                      )
                                    )}
                                  </div>
                                </>
                              ) : isInline ? (
                                <div className='text-sm main-content-paragraph'>
                                  <span className='font-medium'>
                                    {detail.label}:{' '}
                                  </span>
                                  {detail.value}
                                </div>
                              ) : (
                                <>
                                  <div className='font-medium main-content-subtitle'>
                                    {detail.label}
                                  </div>
                                  <div className='text-sm main-content-paragraph'>
                                    {detail.value}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )
                      })}

                    {/* Quick Contact (merged) */}
                    <div className='pt-4 border-t border-gray-200'>
                      <h4 className='font-semibold mb-3 main-content-subtitle'>
                        {translations.contact.quick.title}
                      </h4>
                      <p className='text-sm mb-4 main-content-paragraph'>
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
                      {translations.contact.social.links.map(
                        (social, index) => (
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
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className='mt-20'>
            <AnimatedFAQ
              items={translations.contact.faq.items}
              title={translations.contact.faq.title}
            />
          </div>

          {/* Location Map */}
          <div className='mt-20'>
            <h2 className='text-3xl font-bold text-center mb-12 main-content-title'>
              {translations.contact.location.title}
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
              {/* Address Information */}
              <Card className='border-0 shadow-xl lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <span className='text-2xl'>📍</span>
                    <span>{currentContent.location.ourLocation}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 main-content-subtitle'>
                      {currentContent.location.address}
                    </h4>
                    <p className='main-content-paragraph'>
                      10355 152 St
                      <br />
                      Surrey, BC V3R 7C3
                      <br />
                      Canada
                    </p>
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg mb-2 main-content-subtitle'>
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
                    <h4 className='font-semibold text-lg mb-2 main-content-subtitle'>
                      {currentContent.location.nearbyLandmarks}
                    </h4>
                    <ul className='space-y-1 main-content-paragraph'>
                      {currentContent.location.landmarks.map(
                        (landmark, index) => (
                          <li key={index}>• {landmark}</li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Embed */}
              <Card className='border-0 shadow-xl overflow-hidden lg:col-span-3'>
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
