import React from 'react';
import { LetterTemplate } from '../../types/resignation';

interface TemplateCardProps {
  template: LetterTemplate;
  isSelected: boolean;
  onSelect: (template: LetterTemplate) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  return (
    <div 
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template)}
      style={{
        background: '#fff',
        border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '100%',
        boxShadow: isSelected ? '0 4px 20px rgba(59, 130, 246, 0.15)' : '0 2px 10px rgba(0,0,0,0.05)',
        transform: isSelected ? 'translateY(-2px)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'none';
        }
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ 
          color: '#1f2937', 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: '0 0 8px 0' 
        }}>
          {template.name}
        </h3>
        <span style={{
          background: getCategoryColor(template.category),
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'capitalize'
        }}>
          {template.category.replace('-', ' ')}
        </span>
      </div>
      
      <p style={{ 
        color: '#6b7280', 
        fontSize: '14px', 
        lineHeight: '1.5', 
        margin: '0 0 12px 0' 
      }}>
        {template.description}
      </p>
      
      <div style={{ 
        color: '#9ca3af', 
        fontSize: '12px', 
        fontStyle: 'italic',
        borderTop: '1px solid #f3f4f6',
        paddingTop: '12px'
      }}>
        {template.preview}
      </div>
      
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#3b82f6',
          color: '#fff',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}>
          ✓
        </div>
      )}
    </div>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'standard': '#3b82f6',
    'immediate': '#ef4444',
    'career-change': '#10b981',
    'retirement': '#8b5cf6',
    'personal': '#f59e0b'
  };
  return colors[category] || '#6b7280';
};

export default TemplateCard;