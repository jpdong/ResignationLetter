'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ResignationLetterData, LetterTemplate } from '../../../types/resignation';
import ResignationLetterHero from './ResignationLetterHero';
import TemplateSelector from './TemplateSelector';
import LetterCustomizer from './LetterCustomizer';
import LetterPreview from './LetterPreview';
import { LazyDownloadOptions, LazyResignationGuide, LazyResignationFAQ } from '../lazy';
import LazyLoad from '../../common/LazyLoad';
import LoadingSpinner from '../../common/LoadingSpinner';
import { getTodayDate } from '../../../utils/validation';
import { logPrivacyCompliance } from '../../../utils/privacy';
import { logPageLoadMetrics, logMemoryUsage } from '../../../utils/performance';

interface ResignationLetterAppProps {
  initialTemplate?: LetterTemplate;
}

const ResignationLetterApp: React.FC<ResignationLetterAppProps> = ({ initialTemplate }) => {
  // State management
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate | null>(initialTemplate || null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [letterData, setLetterData] = useState<ResignationLetterData>({
    employeeName: '',
    employeePosition: '',
    companyName: '',
    supervisorName: '',
    lastWorkingDate: '',
    resignationDate: getTodayDate(),
    reason: '',
    customMessage: ''
  });

  // Handlers
  const handleTemplateSelect = useCallback((template: LetterTemplate) => {
    setSelectedTemplate(template);
    
    // Smooth scroll to customizer section
    setTimeout(() => {
      const element = document.getElementById('customize');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const handleDataChange = useCallback((data: ResignationLetterData) => {
    setLetterData(data);
  }, []);

  const handleValidationChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid);
  }, []);

  // Privacy compliance check and performance monitoring on component mount
  useEffect(() => {
    logPrivacyCompliance();
    logPageLoadMetrics();
    logMemoryUsage();
  }, []);

  return (
    <div style={{ background: '#f7f9fb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <ResignationLetterHero />

      {/* Template Selection Section */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
      />

      {/* Form and Preview Section */}
      {selectedTemplate && (
        <>
          <LetterCustomizer
            letterData={letterData}
            onDataChange={handleDataChange}
            onValidationChange={handleValidationChange}
          />

          <LetterPreview
            template={selectedTemplate}
            letterData={letterData}
            isFormValid={isFormValid}
          />

          <LazyLoad fallback={<LoadingSpinner text="Loading download options..." />}>
            <LazyDownloadOptions
              template={selectedTemplate}
              letterData={letterData}
              isFormValid={isFormValid}
            />
          </LazyLoad>
        </>
      )}

      {/* Educational Content */}
      <LazyLoad fallback={<LoadingSpinner text="Loading writing guide..." />}>
        <LazyResignationGuide />
      </LazyLoad>
      <LazyLoad fallback={<LoadingSpinner text="Loading FAQ..." />}>
        <LazyResignationFAQ />
      </LazyLoad>

      {/* Progress Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#fff',
        borderRadius: '50px',
        padding: '12px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Step 1: Template Selection */}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: selectedTemplate ? '#10b981' : '#e5e7eb',
            color: selectedTemplate ? '#fff' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            {selectedTemplate ? '✓' : '1'}
          </div>
          
          <div style={{
            width: '20px',
            height: '2px',
            background: selectedTemplate && letterData.employeeName ? '#10b981' : '#e5e7eb',
            transition: 'all 0.3s ease'
          }} />

          {/* Step 2: Form Completion */}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: isFormValid ? '#10b981' : selectedTemplate ? '#3b82f6' : '#e5e7eb',
            color: isFormValid ? '#fff' : selectedTemplate ? '#fff' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            {isFormValid ? '✓' : '2'}
          </div>

          <div style={{
            width: '20px',
            height: '2px',
            background: isFormValid ? '#10b981' : '#e5e7eb',
            transition: 'all 0.3s ease'
          }} />

          {/* Step 3: Download */}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: isFormValid ? '#3b82f6' : '#e5e7eb',
            color: isFormValid ? '#fff' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            3
          </div>
        </div>

        <span style={{ color: '#6b7280', marginLeft: '8px' }}>
          {!selectedTemplate 
            ? 'Select Template' 
            : !isFormValid 
              ? 'Complete Form' 
              : 'Ready to Download'
          }
        </span>
      </div>

      {/* Floating Action Button for Mobile */}
      {selectedTemplate && !isFormValid && (
        <button
          onClick={() => {
            const element = document.getElementById('customize');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
          }}
        >
          <span>📝</span>
          Fill Details
        </button>
      )}

      {/* Floating Download Button */}
      {isFormValid && (
        <button
          onClick={() => {
            const element = document.getElementById('download');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
          }}
        >
          <span>⬇️</span>
          Download
        </button>
      )}
    </div>
  );
};

export default ResignationLetterApp;