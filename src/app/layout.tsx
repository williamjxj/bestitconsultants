import './globals.css'
import { Inter, Poppins, Roboto } from 'next/font/google'

import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import { StructuredData } from '@/components/seo/StructuredData'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { getBaseUrl } from '@/lib/utils'

// Initialize fonts with Latin subset
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

// Metadata for the website (SEO purposes)
const baseUrl = getBaseUrl()

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'BestIT Consultants - Vancouver IT & AI Consulting',
  description:
    'Vancouver BC software and IT consulting. Elite IT outsourcing, AI solutions, and SME software development. Canadian Quality, Global Talent.',
  keywords: [
    'Vancouver software company',
    'Vancouver IT consulting',
    'software company Vancouver BC',
    'SME software company Vancouver',
    'IT outsourcing Vancouver Canada',
    'AI consulting Vancouver',
    'IT Outsourcing Canada',
    'AI Consulting Services',
    'Global Software Development',
    'Elite IT Consulting',
    'Fortune 500 Experience',
  ],
  openGraph: {
    title: 'BestIT Consultants - Vancouver IT & AI Consulting',
    description:
      'Vancouver BC software and IT consulting. Elite IT outsourcing, AI solutions, and SME software development. Canadian Quality, Global Talent.',
    images: [`${baseUrl}/og-images/home.png`],
    url: baseUrl,
    siteName: 'BestIT Consultants',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestIT Consultants - Vancouver IT & AI Consulting',
    description:
      'Vancouver BC software and IT consulting. Elite IT outsourcing, AI solutions, and SME software development.',
    images: [`${baseUrl}/og-images/home.png`],
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

// RootLayout component: applies to all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${poppins.variable} ${roboto.variable} bg-gray-50 text-gray-800`}
        suppressHydrationWarning={true}
      >
        {/* LanguageProvider wraps the entire application to provide language context */}
        <LanguageProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar /> {/* Site navigation */}
            <main className='flex-grow container mx-auto px-4 py-8'>
              {children} {/* Page content will be rendered here */}
            </main>
            <Footer /> {/* Site footer */}
            <StructuredData /> {/* SEO structured data */}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
