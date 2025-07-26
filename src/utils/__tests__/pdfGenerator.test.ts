import { validatePDFGeneration } from '../pdfGenerator';
import { ResignationLetterData, LetterTemplate } from '../../types/resignation';

// Mock jsPDF
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    setProperties: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    internal: {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297
      }
    },
    getTextWidth: jest.fn(() => 50),
    text: jest.fn(),
    splitTextToSize: jest.fn(() => ['Line 1', 'Line 2']),
    addPage: jest.fn(),
    save: jest.fn(),
    output: jest.fn(() => new Blob())
  }));
});

describe('PDF Generator', () => {
  const mockTemplate: LetterTemplate = {
    id: 'test-template',
    name: 'Test Template',
    category: 'standard',
    description: 'A test template',
    template: 'Dear {{supervisorName}},\n\nI am resigning from {{companyName}}.\n\nSincerely,\n{{employeeName}}',
    preview: 'Test preview'
  };

  const validLetterData: ResignationLetterData = {
    employeeName: 'John Doe',
    employeePosition: 'Software Engineer',
    companyName: 'Tech Corp',
    supervisorName: 'Jane Smith',
    lastWorkingDate: '2025-02-15',
    resignationDate: '2025-02-01',
    reason: 'Career advancement',
    customMessage: 'Thank you'
  };

  const incompleteLetterData: ResignationLetterData = {
    employeeName: '',
    employeePosition: '',
    companyName: '',
    supervisorName: '',
    lastWorkingDate: '',
    resignationDate: '',
    reason: '',
    customMessage: ''
  };

  describe('validatePDFGeneration', () => {
    it('validates complete form data successfully', () => {
      const result = validatePDFGeneration(mockTemplate, validLetterData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns errors for missing template', () => {
      const result = validatePDFGeneration(null, validLetterData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a template');
    });

    it('returns errors for incomplete form data', () => {
      const result = validatePDFGeneration(mockTemplate, incompleteLetterData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Employee name is required');
      expect(result.errors).toContain('Employee position is required');
      expect(result.errors).toContain('Company name is required');
      expect(result.errors).toContain('Supervisor name is required');
      expect(result.errors).toContain('Last working date is required');
    });

    it('validates partial data correctly', () => {
      const partialData = {
        ...incompleteLetterData,
        employeeName: 'John Doe',
        companyName: 'Tech Corp'
      };
      
      const result = validatePDFGeneration(mockTemplate, partialData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).not.toContain('Employee name is required');
      expect(result.errors).not.toContain('Company name is required');
      expect(result.errors).toContain('Employee position is required');
      expect(result.errors).toContain('Supervisor name is required');
    });

    it('handles whitespace-only values as invalid', () => {
      const whitespaceData = {
        ...validLetterData,
        employeeName: '   ',
        supervisorName: '\t\n'
      };
      
      const result = validatePDFGeneration(mockTemplate, whitespaceData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Employee name is required');
      expect(result.errors).toContain('Supervisor name is required');
    });
  });
});