import { Metadata } from 'next';
import ResignationLetterPage from '../src/pages/ResignationLetterPage'

export const metadata: Metadata = {
  title: 'Free Professional Resignation Letter Templates | Easy to Customize',
  description: 'Create professional resignation letters instantly with our free templates. Download customizable formats for various scenarios - formal resignation, two weeks notice, and more.',
  alternates: {
    canonical: 'https://resignation-letter.net/',
  },
  openGraph: {
    title: 'Free Professional Resignation Letter Templates',
    description: 'Create professional resignation letters instantly with our free templates. Download customizable formats for various scenarios.',
    url: 'https://resignation-letter.net/',
    siteName: 'Resignation Letter Templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Professional Resignation Letter Templates',
    description: 'Create professional resignation letters instantly with our free templates. Download customizable formats for various scenarios.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <ResignationLetterPage />
}
