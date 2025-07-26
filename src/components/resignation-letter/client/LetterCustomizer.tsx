'use client';

import React, { useState, useEffect } from 'react';
import { ResignationLetterData, FormValidation } from '../../../types/resignation';
import { validateForm, isFormValid, getTodayDate, getMinDate } from '../../../utils/validation';
import Container from '../../layout/Container';
import Row from '../../layout/Row';
import Column from '../../layout/Column';

interface LetterCustomizerProps {
  letterData: ResignationLetterData;
  onDataChange: (data: ResignationLetterData) => void;
  onValidationChange: (isValid: boolean) => void;
}

const LetterCustomizer: React.FC<LetterCustomizerProps> = ({
  letterData,
  onDataChange,
  onValidationChange
}) => {
  const [validation, setValidation] = useState<FormValidation>({
    employeeName: null,
    employeePosition: null,
    companyName: null,
    supervisorName: null,
    lastWorkingDate: null
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newValidation = validateForm(letterData);
    setValidation(newValidation);
    onValidationChange(isFormValid(newValidation));
  }, [letterData, onValidationChange]);

  const handleInputChange = (field: keyof ResignationLetterData, value: string) => {
    const updatedData = { ...letterData, [field]: value };
    onDataChange(updatedData);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: keyof FormValidation): string | null => {
    return touched[field] ? validation[field] : null;
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '12px 16px',
    border: hasError ? '2px solid #ef4444' : '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: hasError ? '#fef2f2' : '#fff'
  });

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  };

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
    minHeight: '16px'
  };

  return (
    <div style={{ padding: '60px 0', background: '#fff' }} id="customize">
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            Customize Your Resignation Letter
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            Fill in your personal information to generate your professional resignation letter.
          </p>
        </div>

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          background: '#f9fafb',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Row gutter={[24, 24]}>
            {/* Employee Name */}
            <Column xs={24} md={12}>
              <label style={labelStyle}>
                Your Full Name *
              </label>
              <input
                type="text"
                value={letterData.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                onBlur={() => handleBlur('employeeName')}
                placeholder="Enter your full name"
                style={inputStyle(!!getFieldError('employeeName'))}
                onFocus={(e) => {
                  if (!getFieldError('employeeName')) {
                    e.target.style.borderColor = '#3b82f6';
                  }
                }}
                onBlur={(e) => {
                  handleBlur('employeeName');
                  if (!getFieldError('employeeName')) {
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              />
              <div style={errorStyle}>
                {getFieldError('employeeName') || ''}
              </div>
            </Column>

            {/* Employee Position */}
            <Column xs={24} md={12}>
              <label style={labelStyle}>
                Your Position *
              </label>
              <input
                type="text"
                value={letterData.employeePosition}
                onChange={(e) => handleInputChange('employeePosition', e.target.value)}
                onBlur={() => handleBlur('employeePosition')}
                placeholder="e.g., Software Engineer"
                style={inputStyle(!!getFieldError('employeePosition'))}
                onFocus={(e) => {
                  if (!getFieldError('employeePosition')) {
                    e.target.style.borderColor = '#3b82f6';
                  }
                }}
                onBlur={(e) => {
                  handleBlur('employeePosition');
                  if (!getFieldError('employeePosition')) {
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              />
              <div style={errorStyle}>
                {getFieldError('employeePosition') || ''}
              </div>
            </Column>

            {/* Company Name */}
            <Column xs={24} md={12}>
              <label style={labelStyle}>
                Company Name *
              </label>
              <input
                type="text"
                value={letterData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                onBlur={() => handleBlur('companyName')}
                placeholder="Enter company name"
                style={inputStyle(!!getFieldError('companyName'))}
                onFocus={(e) => {
                  if (!getFieldError('companyName')) {
                    e.target.style.borderColor = '#3b82f6';
                  }
                }}
                onBlur={(e) => {
                  handleBlur('companyName');
                  if (!getFieldError('companyName')) {
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              />
              <div style={errorStyle}>
                {getFieldError('companyName') || ''}
              </div>
            </Column>

            {/* Supervisor Name */}
            <Column xs={24} md={12}>
              <label style={labelStyle}>
                Supervisor Name *
              </label>
              <input
                type="text"
                value={letterData.supervisorName}
                onChange={(e) => handleInputChange('supervisorName', e.target.value)}
                onBlur={() => handleBlur('supervisorName')}
                placeholder="Enter supervisor's name"
                style={inputStyle(!!getFieldError('supervisorName'))}
                onFocus={(e) => {
                  if (!getFieldError('supervisorName')) {
                    e.target.style.borderColor = '#3b82f6';
                  }
                }}
                onBlur={(e) => {
                  handleBlur('supervisorName');
                  if (!getFieldError('supervisorName')) {
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              />
              <div style={errorStyle}>
                {getFieldError('supervisorName') || ''}
              </div>
            </Column>

            {/* Resignation Date */}
            <Column xs={24} md={12}>
              <label style={labelStyle}>
                Resignation Date *
              </label>
              <input
                type="date"
                value={letterData.resignationDate}
                onChange={(e) => handleInputChange('resignationDate', e.target.value)}
                min={getTodayDate()}
                style={inputStyle(false)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <div style={errorStyle}></div>
            </Column>

            {/* Last Working Date */}
            <Column xs={24} md={12}>
              <label style={labelStyle}>
                Last Working Date *
              </label>
              <input
                type="date"
                value={letterData.lastWorkingDate}
                onChange={(e) => handleInputChange('lastWorkingDate', e.target.value)}
                onBlur={() => handleBlur('lastWorkingDate')}
                min={getMinDate()}
                style={inputStyle(!!getFieldError('lastWorkingDate'))}
                onFocus={(e) => {
                  if (!getFieldError('lastWorkingDate')) {
                    e.target.style.borderColor = '#3b82f6';
                  }
                }}
                onBlur={(e) => {
                  handleBlur('lastWorkingDate');
                  if (!getFieldError('lastWorkingDate')) {
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              />
              <div style={errorStyle}>
                {getFieldError('lastWorkingDate') || ''}
              </div>
            </Column>

            {/* Reason (Optional) */}
            <Column xs={24}>
              <label style={labelStyle}>
                Reason for Resignation (Optional)
              </label>
              <textarea
                value={letterData.reason || ''}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Brief reason for your resignation (optional)"
                rows={3}
                style={{
                  ...inputStyle(false),
                  resize: 'vertical',
                  minHeight: '80px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <div style={errorStyle}></div>
            </Column>

            {/* Custom Message (Optional) */}
            <Column xs={24}>
              <label style={labelStyle}>
                Additional Message (Optional)
              </label>
              <textarea
                value={letterData.customMessage || ''}
                onChange={(e) => handleInputChange('customMessage', e.target.value)}
                placeholder="Any additional message you'd like to include"
                rows={4}
                style={{
                  ...inputStyle(false),
                  resize: 'vertical',
                  minHeight: '100px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <div style={errorStyle}></div>
            </Column>
          </Row>

          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: '#f0f9ff', 
            border: '1px solid #0ea5e9',
            borderRadius: '8px' 
          }}>
            <h4 style={{ 
              color: '#0c4a6e', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '8px' 
            }}>
              💡 Tips for Your Resignation Letter
            </h4>
            <ul style={{ 
              color: '#075985', 
              fontSize: '14px', 
              margin: 0, 
              paddingLeft: '20px' 
            }}>
              <li>Keep your reason brief and professional</li>
              <li>Provide adequate notice (typically 2 weeks minimum)</li>
              <li>Express gratitude for opportunities received</li>
              <li>Offer to help with the transition process</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LetterCustomizer;