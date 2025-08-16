import { Metadata } from 'next';
import React from 'react';
import { BlogPostPage } from '../../../src/page-components/BlogPostPage';
import { getPostBySlug } from '../../../src/utils/blogServerUtils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Resignation Letter Templates',
      description: 'The requested blog post could not be found. Explore our other career insights and professional development articles.',
      alternates: {
        canonical: `https://resignation-letter.net/blog/${slug}`,
      },
    };
  }
  
  return {
    title: `${post.title} | Resignation Letter Templates`,
    description: post.description,
    alternates: {
      canonical: `https://resignation-letter.net/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://resignation-letter.net/blog/${slug}`,
      siteName: 'Resignation Letter Templates',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}