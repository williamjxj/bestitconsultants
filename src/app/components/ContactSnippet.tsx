'use client';

import { useLanguage } from './LanguageContext';

export default function ContactSnippet() {
  const { translations } = useLanguage();

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">{translations.contactSnippet.title}</h2>
        <p className="section-subtitle">
          {translations.contactSnippet.description}
        </p>
        <button className="btn-primary text-lg px-8 py-4">
          {translations.contactSnippet.cta}
        </button>
      </div>
    </section>
  );
}
