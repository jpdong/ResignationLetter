import { Metadata } from 'next';
import ContactUsPage from '../../src/page-components/ContactUsPage';

export const metadata: Metadata = {
  title: 'Contact Us - Resignation Letter Template',
  description: 'Get help with our resignation letter template. Contact us for support, advice on resignation etiquette, or to report issues with our professional templates.',
  alternates: {
    canonical: 'https://resignation-letter.net/contact',
  },
  openGraph: {
    title: 'Contact Us - Resignation Letter Template',
    description: 'Get help with our resignation letter template. Contact us for support, advice on resignation etiquette, or to report issues with our professional templates.',
    url: 'https://resignation-letter.net/contact',
    siteName: 'Resignation Letter Templates',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us - Resignation Letter Template',
    description: 'Get help with our resignation letter template. Contact us for support, advice on resignation etiquette, or to report issues with our professional templates.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return <ContactUsPage />
}
