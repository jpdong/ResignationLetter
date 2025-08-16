import { Metadata } from 'next';
import React from 'react';
import { BlogPage } from '../../src/page-components/BlogPage';

export const metadata: Metadata = {
  title: 'Career Insights & Professional Development Blog | Resignation Letter Templates',
  description: 'Expert advice on career transitions, resignation etiquette, workplace trends, and professional development. Stay informed with the latest insights for your career journey.',
  alternates: {
    canonical: 'https://resignation-letter.net/blog',
  },
  openGraph: {
    title: 'Career Insights & Professional Development Blog',
    description: 'Expert advice on career transitions, resignation etiquette, workplace trends, and professional development.',
    url: 'https://resignation-letter.net/blog',
    siteName: 'Resignation Letter Templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Insights & Professional Development Blog',
    description: 'Expert advice on career transitions, resignation etiquette, workplace trends, and professional development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Blog() {
  return <BlogPage />;
}