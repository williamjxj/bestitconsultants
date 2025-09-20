import './globals.css'
import { Inter, Poppins, Roboto } from 'next/font/google'

import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import { LanguageProvider } from '@/contexts/LanguageContext'

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
export const metadata = {
  title: 'BestITConsulting Ltd - Software Outsourcing Solutions',
  description:
    'Expert full-stack software development and outsourcing services. JS, TS, Python, Java, .NET and more. Located in Vancouver, Canada with a branch in East Asia.',
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
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
