import React, { useState, useEffect } from 'react';

interface BlogFilterProps {
  categories: string[];
  tags: string[];
  selectedCategory: string;
  selectedTag: string;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onSearch: (query: string) => void;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, onSearch]);

  return (
    <div className="blog-filter">
      <div className="blog-filter-container">
        {/* Search Bar */}
        <div className="blog-filter-search">
          <div className="blog-filter-search-wrapper">
            <svg className="blog-filter-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-filter-search-input"
            />
          </div>
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          className="blog-filter-toggle"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-label="Toggle filters"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 7H21L19 9H5L3 7Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 12H18" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 17H15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Filters
        </button>

        {/* Filter Options */}
        <div className={`blog-filter-options ${isFilterOpen ? 'blog-filter-options-open' : ''}`}>
          {/* Categories */}
          <div className="blog-filter-group">
            <label className="blog-filter-label">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="blog-filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="blog-filter-group">
            <label className="blog-filter-label">Tag</label>
            <select
              value={selectedTag}
              onChange={(e) => onTagChange(e.target.value)}
              className="blog-filter-select"
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <button
              className="blog-filter-clear"
              onClick={() => {
                onCategoryChange('');
                onTagChange('');
                setSearchQuery('');
                onSearch('');
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};