import { Metadata } from 'next';
import TermsOfUsePage from '../../src/pages/TermsOfUsePage';

export const metadata: Metadata = {
  title: 'Terms of Use - Resignation Letter Template',
  description: 'Terms of use for our free resignation letter template. Learn about your rights and responsibilities when using our professional resignation letter templates.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUse() {
  return <TermsOfUsePage />
}
