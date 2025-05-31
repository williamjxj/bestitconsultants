'use client';

import { useLanguage } from './LanguageContext';

export default function AboutSummary() {
  const { translations } = useLanguage();

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">{translations.aboutSummary.title}</h2>
        <p className="section-subtitle">{translations.aboutSummary.content}</p>
        <button className="btn-secondary">
          {translations.aboutSummary.learnMore}
        </button>
      </div>
    </section>
  );
}
