import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../../types/blog';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="blog-post-header">
      <div className="blog-post-header-container">
        {/* Breadcrumb */}
        <nav className="blog-post-breadcrumb">
          <Link href="/blog" className="blog-post-breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>
        </nav>

        {/* Category Badge */}
        <div className="blog-post-category">
          <span className="blog-post-category-badge">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="blog-post-title">{post.title}</h1>

        {/* Description */}
        <p className="blog-post-description">{post.description}</p>

        {/* Meta Information */}
        <div className="blog-post-meta">
          <div className="blog-post-author">
            <div className="blog-post-author-avatar">
              <div className="blog-post-author-initial">
                {post.author.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="blog-post-author-info">
              <span className="blog-post-author-name">{post.author}</span>
              <div className="blog-post-meta-details">
                <span className="blog-post-date">{formatDate(post.date)}</span>
                <span className="blog-post-separator">•</span>
                <span className="blog-post-read-time">{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="blog-post-share">
            <span className="blog-post-share-label">Share:</span>
            <div className="blog-post-share-buttons">
              <button 
                className="blog-post-share-button"
                onClick={() => {
                  const url = window.location.href;
                  const text = `${post.title} - ${post.description}`;
                  navigator.share ? navigator.share({ title: post.title, text, url }) : 
                    navigator.clipboard.writeText(url);
                }}
                aria-label="Share article"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className="blog-post-share-button"
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
                aria-label="Share on Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className="blog-post-share-button"
                onClick={() => {
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
                aria-label="Share on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};