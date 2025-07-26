import { Metadata } from 'next';
import ContactUsPage from '../../src/pages/ContactUsPage';

export const metadata: Metadata = {
  title: 'Contact Us - Resignation Letter Generator',
  description: 'Get help with our resignation letter generator. Contact us for support, advice on resignation etiquette, or to report issues with our professional templates.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return <ContactUsPage />
}
