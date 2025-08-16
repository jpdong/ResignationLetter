import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className={`blog-card ${featured ? 'blog-card-featured' : ''}`}>
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-content">
          {post.image && (
            <div className="blog-card-image">
              <img 
                src={post.image} 
                alt={post.title}
                className="blog-card-img"
              />
              <div className="blog-card-overlay"></div>
            </div>
          )}
          
          <div className="blog-card-body">
            <div className="blog-card-meta">
              <span className="blog-card-category">{post.category}</span>
              <span className="blog-card-date">{formatDate(post.date)}</span>
            </div>
            
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-description">{post.description}</p>
            
            <div className="blog-card-footer">
              <div className="blog-card-author">
                <span>By {post.author}</span>
                <span className="blog-card-read-time">{post.readTime}</span>
              </div>
              
              {post.tags.length > 0 && (
                <div className="blog-card-tags">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="blog-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="blog-card-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
};