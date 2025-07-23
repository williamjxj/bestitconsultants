'use client'

export default function HeroSection() {
  return (
    <section className='text-center py-16 md:py-24'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-6'>
          Enterprise Software Solutions with Fortune 500 Experience
        </h1>
        <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
          Led by industry veterans with 60+ years combined experience, we
          deliver AI/ML solutions, enterprise systems, and cloud platforms for
          global clients including Xperi, HSBC, and Credit Suisse.
        </p>
        <button className='btn-primary text-lg px-8 py-4'>
          Start Your Project
        </button>
      </div>
    </section>
  )
}
