'use client';

import React, { useEffect, useState } from 'react';
import { BlogPostHeader } from '../components/blog/BlogPostHeader';
import { BlogContent } from '../components/blog/BlogContent';
import { RelatedPosts } from '../components/blog/RelatedPosts';
import { getPostBySlug } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';

interface BlogPostPageProps {
  slug: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <NavBar />
        <div className="blog-post-loading">
          <div className="blog-post-loading-container">
            <div className="blog-post-loading-spinner">
              <svg className="blog-post-spinner" width="40" height="40" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <p className="blog-post-loading-text">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <NavBar />
        <div className="blog-post-not-found">
          <div className="blog-post-not-found-container">
            <div className="blog-post-not-found-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h1 className="blog-post-not-found-title">Article Not Found</h1>
            <p className="blog-post-not-found-description">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <a href="/blog" className="blog-post-not-found-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <NavBar />
      
      <main className="blog-post-main">
        <article className="blog-post-article">
          <BlogPostHeader post={post} />
          
          <div className="blog-post-content-container">
            <BlogContent content={post.content} />
          </div>
          
          {/* Article Footer */}
          <footer className="blog-post-footer">
            <div className="blog-post-footer-container">
              <div className="blog-post-cta">
                <h3 className="blog-post-cta-title">Ready to Take Action?</h3>
                <p className="blog-post-cta-description">
                  Create your professional resignation letter with our expertly crafted templates.
                </p>
                <a href="/" className="blog-post-cta-button">
                  Get Started Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </article>

        <RelatedPosts currentPost={post} />
      </main>

      <Footer />
    </div>
  );
};