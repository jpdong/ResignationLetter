import { Metadata } from 'next';
import TermsOfUsePage from '../../src/page-components/TermsOfUsePage';

export const metadata: Metadata = {
  title: 'Terms of Use - Resignation Letter Template',
  description: 'Terms of use for our free resignation letter template. Learn about your rights and responsibilities when using our professional resignation letter templates.',
  alternates: {
    canonical: 'https://resignation-letter.net/terms-of-use',
  },
  openGraph: {
    title: 'Terms of Use - Resignation Letter Template',
    description: 'Terms of use for our free resignation letter template. Learn about your rights and responsibilities when using our professional resignation letter templates.',
    url: 'https://resignation-letter.net/terms-of-use',
    siteName: 'Resignation Letter Templates',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use - Resignation Letter Template',
    description: 'Terms of use for our free resignation letter template. Learn about your rights and responsibilities when using our professional resignation letter templates.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUse() {
  return <TermsOfUsePage />
}
