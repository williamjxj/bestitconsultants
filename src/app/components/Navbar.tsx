'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

// Navbar component
export default function Navbar() {
  const { language, changeLanguage, translations } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { href: '/', label: translations.navbar.home },
    { href: '/about', label: translations.navbar.about },
    { href: '/services', label: translations.navbar.services },
    { href: '/portfolio', label: translations.navbar.portfolio },
    { href: '/testimonials', label: translations.navbar.testimonials },
    { href: '/contact', label: translations.navbar.contact },
  ];

  // Available languages for the switcher
  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'fr' as const, name: 'Français' },
    { code: 'es' as const, name: 'Español' },
    { code: 'cn' as const, name: '中文' },
  ];

  // Handles language change and closes dropdown
  const handleLanguageChange = (langCode: 'en' | 'fr' | 'es' | 'cn') => {
    changeLanguage(langCode);
    setIsLangDropdownOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            BestITConsulting
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Desktop Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-md border border-gray-300 hover:border-blue-500"
                aria-label="Change language"
              >
                <Globe size={20} className="mr-1" />
                {language.toUpperCase()}
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === lang.code
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Language:</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`text-sm py-2 px-3 rounded ${
                        language === lang.code
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
