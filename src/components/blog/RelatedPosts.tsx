'use client';

import React, { useEffect, useState } from 'react';
import { BlogCard } from './BlogCard';
import { BlogPost } from '../../types/blog';
import { getAllPosts } from '../../utils/blogUtils';

interface RelatedPostsProps {
  currentPost: BlogPost;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost }) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        
        // Get related posts based on category and tags
        const related = allPosts
          .filter(post => post.slug !== currentPost.slug)
          .map(post => {
            let relevanceScore = 0;
            
            // Same category gets higher score
            if (post.category === currentPost.category) {
              relevanceScore += 3;
            }
            
            // Shared tags get points
            const sharedTags = post.tags.filter(tag => 
              currentPost.tags.includes(tag)
            );
            relevanceScore += sharedTags.length * 2;
            
            // Same author gets a point
            if (post.author === currentPost.author) {
              relevanceScore += 1;
            }
            
            return { ...post, relevanceScore };
          })
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 3);
        
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching related posts:', error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost]);

  if (loading || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts">
      <div className="related-posts-container">
        <div className="related-posts-header">
          <h2 className="related-posts-title">Related Articles</h2>
          <p className="related-posts-description">
            Continue exploring career insights and professional development topics
          </p>
        </div>
        
        <div className="related-posts-grid">
          {relatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};