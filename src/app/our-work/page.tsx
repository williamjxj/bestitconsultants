'use client'

import BookmarkList from '@/components/ui/bookmark-list'
import { OurWorkHero } from '@/components/ui/hero-variants'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OurWorkPage() {
  const { translations } = useLanguage()

  return (
    <div>
      <OurWorkHero
        title={translations.ourWork?.title || 'Our Work'}
        subtitle={
          translations.ourWork?.introTitle || 'Featured Projects & Partnerships'
        }
        description={
          translations.ourWork?.introDescription ||
          "Below you'll find a curated collection of external projects and tools that showcase our technical expertise and industry connections. These projects span multiple categories including business solutions, AI development, e-commerce platforms, and educational tools."
        }
        ctaText='View All Projects'
        ctaLink='/portfolio'
        secondaryCtaText='Get Started'
        secondaryCtaLink='/contact'
        badge='Live Projects & Demos'
      />
      <div className='min-h-screen'>
        {/* Stats Section */}
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                <div className='text-center'>
                  <div className='bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl font-bold text-blue-600'>9</span>
                  </div>
                  <h3 className='font-semibold text-gray-800'>
                    Featured Projects
                  </h3>
                  <p className='text-gray-600'>Carefully selected showcase</p>
                </div>
                <div className='text-center'>
                  <div className='bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl font-bold text-purple-600'>
                      6
                    </span>
                  </div>
                  <h3 className='font-semibold text-gray-800'>Categories</h3>
                  <p className='text-gray-600'>Diverse industry focus</p>
                </div>
                <div className='text-center'>
                  <div className='bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl font-bold text-green-600'>
                      100%
                    </span>
                  </div>
                  <h3 className='font-semibold text-gray-800'>
                    External Links
                  </h3>
                  <p className='text-gray-600'>Live projects & demos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bookmark List Section */}
        <section className='py-16 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='max-w-7xl mx-auto'>
              <div className='text-center mb-12'>
                <h2 className='text-4xl font-bold mb-6 text-gray-900'>
                  {translations.ourWork?.projectsTitle || 'Project Showcase'}
                </h2>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                  {translations.ourWork?.projectsDescription ||
                    'Discover our external collaborations and featured projects. Click on any project to explore it directly.'}
                </p>
              </div>

              {/* Enhanced BookmarkList Container */}
              <div className='bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 p-8'>
                <BookmarkList />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className='bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-6'>
              {translations.ourWork?.ctaTitle || 'Ready to Start Your Project?'}
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto'>
              {translations.ourWork?.ctaDescription ||
                "Let's discuss how we can bring your vision to life with the same expertise and dedication shown in these projects."}
            </p>
            <a
              href='/contact'
              className='inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              {translations.ourWork?.ctaButton || 'Get Started Today'}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
