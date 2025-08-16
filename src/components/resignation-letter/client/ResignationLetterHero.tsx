'use client';

import React, { useState, useEffect } from 'react';
import { resignationTemplates } from '../../../utils/letterTemplates';
import Container from '../../layout/Container';
import Row from '../../layout/Row';
import Column from '../../layout/Column';

const ResignationLetterHero: React.FC = () => {
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate through templates
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTemplateIndex((prev) => 
        (prev + 1) % Math.min(resignationTemplates.length, 3) // Show only first 3 templates
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredTemplates = resignationTemplates.slice(0, 3);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '100px 0 80px 0',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }} />

      <Container>
        <Row gutter={[40, 40]} align="middle">
          {/* Left Column - Main Content */}
          <Column xs={24} lg={12}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h1 style={{ 
                fontSize: '48px', 
                fontWeight: '800', 
                lineHeight: '1.2',
                marginBottom: '24px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Professional Resignation Letter Template
              </h1>
              
              <p style={{ 
                fontSize: '20px', 
                lineHeight: '1.6',
                marginBottom: '32px',
                opacity: 0.95,
                maxWidth: '500px'
              }}>
                Create a professional resignation letter in minutes with our easy-to-use templates. 
                Choose from various scenarios, customize with your details, and download in multiple formats.
              </p>

              {/* Key Features */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', marginRight: '12px' }}>✨</span>
                  <span style={{ fontSize: '16px' }}>Professional templates for every situation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', marginRight: '12px' }}>🔒</span>
                  <span style={{ fontSize: '16px' }}>100% private - no data stored on servers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', marginRight: '12px' }}>📱</span>
                  <span style={{ fontSize: '16px' }}>Works on desktop, tablet, and mobile</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', marginRight: '12px' }}>⚡</span>
                  <span style={{ fontSize: '16px' }}>Download as PDF, Word, or plain text</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => scrollToSection('templates')}
                  style={{
                    background: '#fff',
                    color: '#667eea',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '16px 32px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  Get Started Free
                </button>
                
                <button
                  onClick={() => scrollToSection('guide')}
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    padding: '14px 28px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                >
                  View Writing Guide
                </button>
              </div>
            </div>
          </Column>

          {/* Right Column - Template Preview Carousel */}
          <Column xs={24} lg={12}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Template Preview
                </h3>

                {/* Template Carousel */}
                <div 
                  style={{ 
                    position: 'relative',
                    minHeight: '300px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#1f2937'
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {featuredTemplates.map((template, index) => (
                    <div
                      key={template.id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '24px',
                        opacity: index === currentTemplateIndex ? 1 : 0,
                        transform: `translateX(${index === currentTemplateIndex ? '0' : '20px'})`,
                        transition: 'all 0.5s ease-in-out'
                      }}
                    >
                      <div style={{
                        background: getCategoryColor(template.category),
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '16px',
                        textTransform: 'capitalize'
                      }}>
                        {template.category.replace('-', ' ')}
                      </div>
                      
                      <h4 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        marginBottom: '12px',
                        color: '#1f2937'
                      }}>
                        {template.name}
                      </h4>
                      
                      <p style={{ 
                        fontSize: '14px', 
                        lineHeight: '1.6',
                        color: '#6b7280',
                        marginBottom: '16px'
                      }}>
                        {template.description}
                      </p>
                      
                      <div style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        fontStyle: 'italic',
                        borderTop: '1px solid #e5e7eb',
                        paddingTop: '12px'
                      }}>
                        {template.preview}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  marginTop: '20px' 
                }}>
                  {featuredTemplates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTemplateIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: 'none',
                        background: index === currentTemplateIndex 
                          ? '#fff' 
                          : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Column>
        </Row>

        {/* Stats Section */}
        <div style={{ 
          marginTop: '80px', 
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '40px'
        }}>
          <Row gutter={[40, 20]}>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                {resignationTemplates.length}+
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Professional Templates
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                100%
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Privacy Protected
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                3
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Download Formats
              </div>
            </Column>
            <Column xs={12} md={6}>
              <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                Free
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Always & Forever
              </div>
            </Column>
          </Row>
        </div>
      </Container>
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

export default ResignationLetterHero;