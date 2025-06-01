'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { translations } = useLanguage();

  return (
    <section className="text-center py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          {translations.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {translations.hero.subtitle}
        </p>
        <button className="btn-primary text-lg px-8 py-4">
          {translations.hero.cta}
        </button>
      </div>
    </section>
  );
}
