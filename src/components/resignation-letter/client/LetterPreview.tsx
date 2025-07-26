'use client';

import React, { useMemo } from 'react';
import { ResignationLetterData, LetterTemplate } from '../../../types/resignation';
import { renderTemplate, getLetterWordCount, estimateReadingTime } from '../../../utils/templateRenderer';
import Container from '../../layout/Container';

interface LetterPreviewProps {
  template: LetterTemplate | null;
  letterData: ResignationLetterData;
  isFormValid: boolean;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ 
  template, 
  letterData, 
  isFormValid 
}) => {
  const renderedLetter = useMemo(() => {
    if (!template) return '';
    return renderTemplate(template.template, letterData);
  }, [template, letterData]);

  const stats = useMemo(() => {
    if (!renderedLetter) return { wordCount: 0, readingTime: 0 };
    return {
      wordCount: getLetterWordCount(renderedLetter),
      readingTime: estimateReadingTime(renderedLetter)
    };
  }, [renderedLetter]);

  if (!template) {
    return (
      <div style={{ padding: '60px 0', background: '#f9fafb' }} id="preview">
        <Container>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px' 
            }}>
              Letter Preview
            </h2>
            <div style={{
              background: '#fff',
              padding: '60px 40px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div style={{ color: '#9ca3af', fontSize: '18px' }}>
                Select a template to see your resignation letter preview
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0', background: '#f9fafb' }} id="preview">
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            Letter Preview
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Preview your resignation letter as you customize it. The letter will update in real-time.
          </p>
        </div>

        {/* Letter Stats */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#fff',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
              {stats.wordCount}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
              Words
            </div>
          </div>
          <div style={{
            background: '#fff',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
              {stats.readingTime}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
              Min Read
            </div>
          </div>
          <div style={{
            background: '#fff',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: isFormValid ? '#10b981' : '#ef4444' 
            }}>
              {isFormValid ? '✓' : '!'}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
              {isFormValid ? 'Ready' : 'Incomplete'}
            </div>
          </div>
        </div>

        {/* Letter Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            background: '#fff',
            padding: '60px 50px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.8',
            fontSize: '16px',
            color: '#1f2937',
            position: 'relative',
            minHeight: '500px'
          }}>
            {/* Letter Header */}
            <div style={{ marginBottom: '40px', textAlign: 'right' }}>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* Letter Body */}
            <div style={{ whiteSpace: 'pre-line' }}>
              {renderedLetter}
            </div>

            {/* Validation Overlay */}
            {!isFormValid && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '48px', 
                    marginBottom: '16px',
                    opacity: 0.5
                  }}>
                    📝
                  </div>
                  <h3 style={{ 
                    color: '#6b7280', 
                    marginBottom: '8px',
                    fontSize: '20px'
                  }}>
                    Complete the form to see your letter
                  </h3>
                  <p style={{ 
                    color: '#9ca3af', 
                    margin: 0,
                    fontSize: '14px'
                  }}>
                    Fill in all required fields to generate your resignation letter
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Template Info */}
          <div style={{
            marginTop: '20px',
            padding: '16px 20px',
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <strong style={{ color: '#0c4a6e' }}>Template:</strong>{' '}
                <span style={{ color: '#075985' }}>{template.name}</span>
              </div>
              <div style={{ color: '#075985', fontSize: '12px' }}>
                Category: {template.category.replace('-', ' ')}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Note */}
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          display: 'block'
        }}>
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '14px',
            color: '#856404'
          }}>
            <strong>💡 Tip:</strong> This preview shows how your letter will appear when printed or downloaded. 
            The formatting is optimized for professional business correspondence.
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LetterPreview;