'use client'

import Link from 'next/link'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PortfolioPreview() {
  const { translations } = useLanguage()

  return (
    <section className='py-16'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='section-title'>{translations.portfolioPreview.title}</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {translations.portfolioPreview.projects.map(project => (
            <div key={project.id} className='card card-hover'>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                {project.name}
              </h3>
              <p className='text-blue-600 text-sm font-medium mb-3'>
                {project.tech}
              </p>
              <p className='text-gray-600 mb-4'>{project.description}</p>
              <button className='text-blue-600 hover:text-blue-800 font-medium'>
                {translations.portfolioPreview.viewProject} →
              </button>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <Link
            href='/portfolio'
            className='btn-primary inline-block'
          >
            {translations.portfolioPreview.allProjects}
          </Link>
        </div>
      </div>
    </section>
  )
}
