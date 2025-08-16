'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogFilter } from '../components/blog/BlogFilter';
import { getAllPosts, getAllCategories, getAllTags, getFeaturedPosts } from '../utils/blogUtils';
import { BlogPost } from '../types/blog';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [posts, cats, tagsList, featured] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
          getAllTags(),
          getFeaturedPosts()
        ]);
        
        setAllPosts(posts);
        setCategories(cats);
        setTags(tagsList);
        setFeaturedPosts(featured);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [allPosts, selectedCategory, selectedTag, searchQuery]);

  if (loading) {
    return (
      <div className="blog-page">
        <NavBar />
        <div className="blog-loading">
          <div className="blog-loading-container">
            <div className="blog-loading-spinner">
              <svg className="blog-spinner" width="40" height="40" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <p className="blog-loading-text">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page">
      <NavBar />
      
      <main className="blog-main">
        <BlogHero />
        
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && !selectedCategory && !selectedTag && !searchQuery && (
          <section className="blog-featured">
            <div className="blog-featured-container">
              <div className="blog-section-header">
                <h2 className="blog-section-title">Featured Articles</h2>
                <p className="blog-section-description">
                  Our most popular and impactful career guidance content
                </p>
              </div>
              
              <div className="blog-featured-grid">
                {featuredPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post.slug} post={post} featured={true} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section className="blog-posts">
          <div className="blog-posts-container">
            <div className="blog-posts-header">
              <h2 className="blog-posts-title">
                {searchQuery 
                  ? `Search results for "${searchQuery}"` 
                  : selectedCategory 
                    ? `${selectedCategory} Articles`
                    : selectedTag
                      ? `Posts tagged "${selectedTag}"`
                      : 'Latest Articles'
                }
              </h2>
              <p className="blog-posts-count">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="blog-posts-grid">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="blog-no-results">
                <div className="blog-no-results-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="blog-no-results-title">No articles found</h3>
                <p className="blog-no-results-description">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  className="blog-no-results-reset"
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedTag('');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="blog-newsletter">
          <div className="blog-newsletter-container">
            <div className="blog-newsletter-content">
              <h2 className="blog-newsletter-title">Stay Updated</h2>
              <p className="blog-newsletter-description">
                Get the latest career insights and professional development tips delivered to your inbox.
              </p>
              <div className="blog-newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="blog-newsletter-input"
                />
                <button className="blog-newsletter-button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};