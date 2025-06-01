'use client';

import React, { createContext, useContext, useState } from 'react';
import { translations, Language, TranslationKeys } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translations: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        translations: currentTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
