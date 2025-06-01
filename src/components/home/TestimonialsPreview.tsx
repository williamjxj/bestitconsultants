'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TestimonialsPreview() {
  const { translations } = useLanguage()

  return (
    <section className='py-16 bg-gray-100'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='section-title'>
          {translations.testimonialsPreview.title}
        </h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {translations.testimonialsPreview.testimonials.map(testimonial => (
            <div key={testimonial.id} className='card card-hover'>
              <blockquote className='text-gray-600 mb-4 italic'>
                {testimonial.quote}
              </blockquote>
              <cite className='text-gray-800 font-semibold not-italic'>
                {testimonial.name}
              </cite>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <button className='btn-primary'>
            {translations.testimonialsPreview.moreTestimonials}
          </button>
        </div>
      </div>
    </section>
  )
}
