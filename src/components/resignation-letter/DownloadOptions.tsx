import React, { useState } from 'react';
import { ResignationLetterData, LetterTemplate } from '../../types/resignation';
import { generatePDF, validatePDFGeneration } from '../../utils/pdfGenerator';
import { generateDOCX, generatePlainText, copyToClipboard, validateDOCXGeneration } from '../../utils/docxGenerator';
import Container from '../layout/Container';
import Row from '../layout/Row';
import Column from '../layout/Column';

interface DownloadOptionsProps {
  template: LetterTemplate | null;
  letterData: ResignationLetterData;
  isFormValid: boolean;
}

type DownloadFormat = 'pdf' | 'docx' | 'text' | 'copy';

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  template,
  letterData,
  isFormValid
}) => {
  const [isDownloading, setIsDownloading] = useState<DownloadFormat | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const showStatus = (type: 'success' | 'error', message: string) => {
    setDownloadStatus({ type, message });
    setTimeout(() => {
      setDownloadStatus({ type: null, message: '' });
    }, 5000);
  };

  const handleDownload = async (format: DownloadFormat) => {
    if (!template || !isFormValid) {
      showStatus('error', 'Please complete the form and select a template before downloading.');
      return;
    }

    setIsDownloading(format);

    try {
      switch (format) {
        case 'pdf':
          const pdfValidation = validatePDFGeneration(template, letterData);
          if (!pdfValidation.isValid) {
            showStatus('error', pdfValidation.errors.join(', '));
            return;
          }
          await generatePDF(template, letterData, {
            filename: `${letterData.employeeName.replace(/\s+/g, '-').toLowerCase()}-resignation-letter.pdf`
          });
          showStatus('success', 'PDF downloaded successfully!');
          break;

        case 'docx':
          const docxValidation = validateDOCXGeneration(template, letterData);
          if (!docxValidation.isValid) {
            showStatus('error', docxValidation.errors.join(', '));
            return;
          }
          await generateDOCX(template, letterData, {
            filename: `${letterData.employeeName.replace(/\s+/g, '-').toLowerCase()}-resignation-letter.docx`
          });
          showStatus('success', 'Word document downloaded successfully!');
          break;

        case 'text':
          const plainText = generatePlainText(template, letterData);
          const textBlob = new Blob([plainText], { type: 'text/plain' });
          const textUrl = window.URL.createObjectURL(textBlob);
          const textLink = document.createElement('a');
          textLink.href = textUrl;
          textLink.download = `${letterData.employeeName.replace(/\s+/g, '-').toLowerCase()}-resignation-letter.txt`;
          document.body.appendChild(textLink);
          textLink.click();
          document.body.removeChild(textLink);
          window.URL.revokeObjectURL(textUrl);
          showStatus('success', 'Text file downloaded successfully!');
          break;

        case 'copy':
          const copyText = generatePlainText(template, letterData);
          await copyToClipboard(copyText);
          showStatus('success', 'Letter copied to clipboard!');
          break;

        default:
          showStatus('error', 'Invalid download format selected.');
      }
    } catch (error) {
      console.error('Download error:', error);
      showStatus('error', error instanceof Error ? error.message : 'Download failed. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  const downloadOptions = [
    {
      format: 'pdf' as DownloadFormat,
      title: 'Download PDF',
      description: 'Professional PDF format, perfect for printing and email attachments',
      icon: '📄',
      color: '#ef4444',
      disabled: !isFormValid || !template
    },
    {
      format: 'docx' as DownloadFormat,
      title: 'Download Word',
      description: 'Editable Word document format for further customization',
      icon: '📝',
      color: '#2563eb',
      disabled: !isFormValid || !template
    },
    {
      format: 'text' as DownloadFormat,
      title: 'Download Text',
      description: 'Plain text format, compatible with any text editor',
      icon: '📋',
      color: '#059669',
      disabled: !isFormValid || !template
    },
    {
      format: 'copy' as DownloadFormat,
      title: 'Copy to Clipboard',
      description: 'Copy the letter text to paste into emails or documents',
      icon: '📎',
      color: '#7c3aed',
      disabled: !isFormValid || !template
    }
  ];

  return (
    <div style={{ padding: '60px 0', background: '#fff' }} id="download">
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Download Your Resignation Letter
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Choose your preferred format to download or copy your professional resignation letter.
          </p>
        </div>

        {/* Status Message */}
        {downloadStatus.type && (
          <div style={{
            marginBottom: '30px',
            padding: '16px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            background: downloadStatus.type === 'success' ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${downloadStatus.type === 'success' ? '#10b981' : '#ef4444'}`,
            color: downloadStatus.type === 'success' ? '#065f46' : '#991b1b'
          }}>
            {downloadStatus.message}
          </div>
        )}

        {/* Download Options Grid */}
        <Row gutter={[24, 24]}>
          {downloadOptions.map((option) => (
            <Column xs={24} md={12} lg={6} key={option.format}>
              <div
                style={{
                  background: option.disabled ? '#f9fafb' : '#fff',
                  border: `2px solid ${option.disabled ? '#e5e7eb' : option.color}`,
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  cursor: option.disabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: option.disabled ? 0.6 : 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => !option.disabled && handleDownload(option.format)}
                onMouseEnter={(e) => {
                  if (!option.disabled) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${option.color}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!option.disabled) {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '16px',
                    filter: option.disabled ? 'grayscale(100%)' : 'none'
                  }}>
                    {option.icon}
                  </div>
                  <h3 style={{
                    color: option.disabled ? '#9ca3af' : '#1f2937',
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {option.title}
                  </h3>
                  <p style={{
                    color: option.disabled ? '#9ca3af' : '#6b7280',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: '0 0 20px 0'
                  }}>
                    {option.description}
                  </p>
                </div>

                {/* Download Button */}
                <button
                  disabled={option.disabled || isDownloading === option.format}
                  style={{
                    background: option.disabled ? '#e5e7eb' : option.color,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: option.disabled ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!option.disabled && isDownloading !== option.format) {
                      e.currentTarget.style.opacity = '0.9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!option.disabled) {
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                >
                  {isDownloading === option.format ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></span>
                      Processing...
                    </span>
                  ) : (
                    option.format === 'copy' ? 'Copy' : 'Download'
                  )}
                </button>
              </div>
            </Column>
          ))}
        </Row>

        {/* Help Text */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '20px',
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '40px auto 0'
        }}>
          <h4 style={{
            color: '#0c4a6e',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            💡 Download Tips
          </h4>
          <ul style={{
            color: '#075985',
            fontSize: '14px',
            textAlign: 'left',
            margin: 0,
            paddingLeft: '20px',
            maxWidth: '600px',
          }}>
            <li>PDF format is recommended for official submissions</li>
            <li>Word format allows for easy editing and customization</li>
            <li>Text format works with any email client or text editor</li>
            <li>Copy to clipboard for quick pasting into emails</li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          🔒 Your personal information is processed locally and never stored on our servers.
        </div>
      </Container>

      {/* CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DownloadOptions;