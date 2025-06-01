'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesSummary() {
  const { translations } = useLanguage();

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">{translations.servicesSummary.title}</h2>
        <p className="section-subtitle">
          {translations.servicesSummary.content}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {translations.servicesSummary.services.map((service, index) => (
            <div key={index} className="card card-hover">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.name}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="btn-primary">
            {translations.servicesSummary.seeAllServices}
          </button>
        </div>
      </div>
    </section>
  );
}
