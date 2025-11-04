'use client'

import { Globe, Menu, X, ChevronDown, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { navigationService } from '@/services/navigation'
import type { NavigationItem } from '@/types/navigation'
import { NavigationCategory } from '@/types/navigation'

interface Translations {
  navbar: {
    home: string
    about: string
    services: string
    portfolio: string
    ourWork: string
    team: string
    contact: string
  }
}

// Navbar component
export default function Navbar() {
  const { language, changeLanguage, translations } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [navItems, setNavItems] = useState<NavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Load navigation items from service
  useEffect(() => {
    const loadNavigationItems = async () => {
      try {
        setIsLoading(true)
        await navigationService.getNavigationItems()

        // Map service items to component format with translations
        // const _mappedItems = items.map(item => ({
        //   ...item,
        //   label: getTranslatedLabel(item.id, translations),
        // }))

        // Update active item based on current path
        navigationService.updateActiveItem(pathname)

        // Get updated items with active state
        const updatedItems = navigationService.getNavigationItems()
        const updatedMappedItems = updatedItems.map(item => ({
          ...item,
          label: getTranslatedLabel(item.id, translations),
        }))

        setNavItems(updatedMappedItems)
      } catch (error) {
        console.error('Error loading navigation items:', error)
        // Fallback to static navigation
        setNavItems(getFallbackNavItems(translations))
      } finally {
        setIsLoading(false)
      }
    }

    loadNavigationItems()
  }, [pathname, translations])

  // Get translated label for navigation item
  const getTranslatedLabel = (
    id: string,
    translations: Translations
  ): string => {
    const labelMap: Record<string, string> = {
      home: translations.navbar.home,
      about: translations.navbar.about,
      services: translations.navbar.services,
      portfolio: translations.navbar.portfolio,
      ourWork: translations.navbar.ourWork,
      team: translations.navbar.team,
      contact: translations.navbar.contact,
    }
    return labelMap[id] || id
  }

  // Fallback navigation items
  const getFallbackNavItems = (
    translations: Translations
  ): NavigationItem[] => [
    {
      id: 'home',
      label: translations.navbar.home,
      href: '/',
      category: NavigationCategory.MAIN,
      order: 1,
      isActive: false,
      isVisible: true,
    },
    {
      id: 'about',
      label: translations.navbar.about,
      href: '/about',
      category: NavigationCategory.COMPANY,
      order: 2,
      isActive: false,
      isVisible: true,
    },
    {
      id: 'services',
      label: translations.navbar.services,
      href: '/services',
      category: NavigationCategory.SERVICES,
      order: 3,
      isActive: false,
      isVisible: true,
    },
    {
      id: 'portfolio',
      label: translations.navbar.portfolio,
      href: '/portfolio',
      category: NavigationCategory.WORK,
      order: 4,
      isActive: false,
      isVisible: true,
    },
    {
      id: 'team',
      label: translations.navbar.team,
      href: '/team',
      category: NavigationCategory.COMPANY,
      order: 5,
      isActive: false,
      isVisible: true,
    },
    {
      id: 'contact',
      label: translations.navbar.contact,
      href: '/contact',
      category: NavigationCategory.MAIN,
      order: 6,
      isActive: false,
      isVisible: true,
    },
  ]

  // Available languages for the switcher with country flags
  const languages: Array<{
    code: 'en' | 'fr' | 'es' | 'cn'
    name: string
    flag: string
    color: string
    bgColor: string
    hoverColor: string
  }> = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      hoverColor: 'hover:bg-yellow-100',
    },
    {
      code: 'cn',
      name: '中文',
      flag: '🇨🇳',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
    },
  ]

  // Get current language info
  const currentLanguage =
    languages.find(lang => lang.code === language) || languages[0]

  // Handles language change and closes dropdown
  const handleLanguageChange = (langCode: 'en' | 'fr' | 'es' | 'cn') => {
    changeLanguage(langCode)
    setIsLangDropdownOpen(false)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        isLangDropdownOpen &&
        !target.closest('.language-dropdown-container')
      ) {
        setIsLangDropdownOpen(false)
      }
    }

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangDropdownOpen])

  return (
    <nav className='bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo with animation */}
          <Link
            href='/'
            className='flex items-center space-x-3 transition-all duration-300 hover:scale-105'
          >
            <img
              src='/logo.png'
              alt='BestITConsultants Logo'
              className='h-12 w-auto'
            />
            <span className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200'>
              bestitconsultants
            </span>
          </Link>

          {/* Desktop Navigation Links with improved styling */}
          <div className='hidden md:flex space-x-8 items-center'>
            {isLoading ? (
              <div className='flex space-x-8'>
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className='h-6 w-16 bg-gray-200 rounded animate-pulse'
                  ></div>
                ))}
              </div>
            ) : (
              navItems.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 group ${
                    link.isActive
                      ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  {link.label}
                  {!link.isActive && (
                    <span className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                  )}
                </Link>
              ))
            )}
          </div>

          {/* Language Switcher and Mobile Menu Toggle */}
          <div className='flex items-center space-x-2 md:space-x-4'>
            {/* Desktop Language Switcher */}
            <div className='relative hidden md:block language-dropdown-container'>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className='flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                aria-label='Change language'
                aria-expanded={isLangDropdownOpen}
                aria-haspopup='true'
              >
                <span className='text-xl leading-none'>
                  {currentLanguage.flag}
                </span>
                <span className='text-sm font-medium hidden lg:inline'>
                  {currentLanguage.name}
                </span>
                <span className='text-sm font-medium lg:hidden'>
                  {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 text-gray-500 ${
                    isLangDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isLangDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200'>
                  {languages.map(lang => {
                    const isActive = language === lang.code
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600'
                            : `text-gray-700 ${lang.hoverColor}`
                        }`}
                        aria-label={`Switch to ${lang.name}`}
                      >
                        <span className='text-xl leading-none'>
                          {lang.flag}
                        </span>
                        <span className='flex-1'>{lang.name}</span>
                        {isActive && (
                          <CheckCircle2 size={16} className={lang.color} />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-gray-600 hover:text-blue-600 transition-colors'
                aria-label='Toggle mobile menu'
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with smooth animation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className='py-4 border-t border-gray-200'>
            <div className='flex flex-col space-y-3'>
              {isLoading ? (
                <div className='space-y-3'>
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className='h-8 w-24 bg-gray-200 rounded animate-pulse'
                    ></div>
                  ))}
                </div>
              ) : (
                navItems.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:translate-x-2 ${
                      link.isActive
                        ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                    {!link.isActive && (
                      <span className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300'></span>
                    )}
                  </Link>
                ))
              )}

              {/* Mobile Language Switcher */}
              <div className='pt-4 border-t border-gray-200 mt-3'>
                <div className='flex items-center space-x-2 mb-3 px-1'>
                  <Globe size={18} className='text-gray-500' />
                  <p className='text-sm font-semibold text-gray-700'>
                    {language === 'en'
                      ? 'Language'
                      : language === 'fr'
                        ? 'Langue'
                        : language === 'es'
                          ? 'Idioma'
                          : '语言'}
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  {languages.map(lang => {
                    const isActive = language === lang.code
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center justify-center space-x-2 text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-200 font-medium ${
                          isActive
                            ? 'bg-blue-500 text-white shadow-md'
                            : `bg-gray-100 text-gray-700 ${lang.hoverColor} hover:shadow-sm active:scale-95`
                        }`}
                        aria-label={`Switch to ${lang.name}`}
                      >
                        <span className='text-lg leading-none'>
                          {lang.flag}
                        </span>
                        <span className='truncate'>{lang.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
