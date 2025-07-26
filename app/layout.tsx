import type { Metadata } from 'next'
import './globals.css'
import './tailwind.css'
import './mobile.css'
import GoogleAnalytics from '../src/components/analytics/GoogleAnalytics'
import CookieConsent from '../src/components/analytics/CookieConsent'

export const metadata: Metadata = {
  title: 'Resignation Letter Generator - Professional Templates & Examples',
  description: 'Create professional resignation letters instantly with our free generator. Choose from 6+ templates, customize with your details, and download as PDF, Word, or text. No signup required.',
  icons: {
    icon: '/logo.png',
  },
  
  alternates: {
      canonical: `https://resignation-letter.net/`,
    },
  
  openGraph: {
    title: 'Resignation Letter Generator - Professional Templates',
    description: 'Create professional resignation letters instantly with our free generator. Choose from multiple templates and download in various formats.',
    url: 'https://resignationletter.net/',
    siteName: 'Resignation Letter Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resignation Letter Generator - Professional Templates',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Resignation Letter Generator - Professional Templates',
    description: 'Create professional resignation letters instantly with our free generator. Choose from multiple templates and download in various formats.',
    images: ['/og-image.png'],
    creator: '@resignationgen',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}