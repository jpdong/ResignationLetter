import { Metadata } from 'next';
import ContactUsPage from '../../src/pages/ContactUsPage';

export const metadata: Metadata = {
  title: 'Contact Us - Resignation Letter Template',
  description: 'Get help with our resignation letter template. Contact us for support, advice on resignation etiquette, or to report issues with our professional templates.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return <ContactUsPage />
}
