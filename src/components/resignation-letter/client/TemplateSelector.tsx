'use client';

import React, { useState, useMemo } from 'react';
import { LetterTemplate, TemplateCategory, TEMPLATE_CATEGORIES } from '../../../types/resignation';
import { resignationTemplates, getTemplatesByCategory, searchTemplates } from '../../../utils/letterTemplates';
import TemplateCard from '../TemplateCard';
import Container from '../../layout/Container';
import Row from '../../layout/Row';
import Column from '../../layout/Column';

interface TemplateSelectorProps {
  selectedTemplate: LetterTemplate | null;
  onTemplateSelect: (template: LetterTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = useMemo(() => {
    let templates = resignationTemplates;
    
    // Filter by category
    if (activeCategory !== 'all') {
      templates = getTemplatesByCategory(activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      templates = searchTemplates(searchTerm);
      // If we have a category filter and search term, apply both
      if (activeCategory !== 'all') {
        templates = templates.filter(t => t.category === activeCategory);
      }
    }
    
    return templates;
  }, [activeCategory, searchTerm]);

  const categories: Array<{ key: TemplateCategory | 'all', label: string }> = [
    { key: 'all', label: 'All Templates' },
    ...Object.entries(TEMPLATE_CATEGORIES).map(([key, label]) => ({
      key: key as TemplateCategory,
      label
    }))
  ];

  return (
    <div style={{ padding: '60px 0', background: '#f9fafb' }} id="templates">
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            Choose Your Resignation Letter Template
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Select from our professionally crafted templates designed for different resignation scenarios.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div style={{ marginBottom: '40px' }}>
          <Row gutter={[20, 20]} justify="center">
            <Column xs={24} md={12}>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </Column>
          </Row>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '12px', 
            marginTop: '20px' 
          }}>
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeCategory === key ? '#3b82f6' : '#fff',
                  color: activeCategory === key ? '#fff' : '#6b7280',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredTemplates.map((template) => (
              <Column xs={24} md={12} lg={8} key={template.id}>
                <div style={{ position: 'relative', height: '100%' }}>
                  <TemplateCard
                    template={template}
                    isSelected={selectedTemplate?.id === template.id}
                    onSelect={onTemplateSelect}
                  />
                </div>
              </Column>
            ))}
          </Row>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ color: '#6b7280', marginBottom: '8px' }}>No templates found</h3>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {selectedTemplate && (
          <div style={{ 
            marginTop: '40px', 
            textAlign: 'center',
            padding: '20px',
            background: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '10px'
          }}>
            <p style={{ 
              color: '#065f46', 
              fontSize: '16px', 
              fontWeight: '500',
              margin: 0
            }}>
              ✓ Selected: {selectedTemplate.name}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TemplateSelector;