import React from 'react';

export const BlogHero: React.FC = () => {
  return (
    <section className="blog-hero">
      <div className="blog-hero-container">
        <div className="blog-hero-content">
          <div className="blog-hero-badge">
            <span>Professional Insights</span>
          </div>
          
          <h1 className="blog-hero-title">
            Navigate Your Career
            <span className="blog-hero-highlight"> Journey</span>
          </h1>
          
          <p className="blog-hero-description">
            Expert insights, strategic advice, and practical guidance for every stage of your professional development. From resignation planning to career advancement.
          </p>
          

        </div>
        
        <div className="blog-hero-visual">
          <div className="blog-hero-shape blog-hero-shape-1"></div>
          <div className="blog-hero-shape blog-hero-shape-2"></div>
          <div className="blog-hero-shape blog-hero-shape-3"></div>
        </div>
      </div>
    </section>
  );
};