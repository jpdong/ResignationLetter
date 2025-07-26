import { validateDOCXGeneration, generatePlainText, copyToClipboard } from '../docxGenerator';
import { ResignationLetterData, LetterTemplate } from '../../types/resignation';

// Mock docx library
jest.mock('docx', () => ({
  Document: jest.fn(),
  Packer: {
    toBlob: jest.fn(() => Promise.resolve(new Blob()))
  },
  Paragraph: jest.fn(),
  TextRun: jest.fn(),
  AlignmentType: {
    RIGHT: 'right'
  }
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve())
  }
});

// Mock window.isSecureContext
Object.defineProperty(window, 'isSecureContext', {
  writable: true,
  value: true
});

describe('DOCX Generator', () => {
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

  describe('validateDOCXGeneration', () => {
    it('validates complete form data successfully', () => {
      const result = validateDOCXGeneration(mockTemplate, validLetterData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns errors for missing template', () => {
      const result = validateDOCXGeneration(null, validLetterData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a template');
    });

    it('returns errors for incomplete form data', () => {
      const result = validateDOCXGeneration(mockTemplate, incompleteLetterData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Employee name is required');
      expect(result.errors).toContain('Employee position is required');
      expect(result.errors).toContain('Company name is required');
      expect(result.errors).toContain('Supervisor name is required');
      expect(result.errors).toContain('Last working date is required');
    });
  });

  describe('generatePlainText', () => {
    it('generates plain text with date and rendered template', () => {
      const result = generatePlainText(mockTemplate, validLetterData);
      
      expect(result).toContain('Dear Jane Smith');
      expect(result).toContain('Tech Corp');
      expect(result).toContain('John Doe');
      expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}/); // Date format
    });

    it('handles template variables correctly', () => {
      const result = generatePlainText(mockTemplate, validLetterData);
      
      expect(result).toContain('Jane Smith');
      expect(result).toContain('Tech Corp');
      expect(result).toContain('John Doe');
      expect(result).not.toContain('{{supervisorName}}');
      expect(result).not.toContain('{{companyName}}');
      expect(result).not.toContain('{{employeeName}}');
    });
  });

  describe('copyToClipboard', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('uses modern clipboard API when available', async () => {
      const testText = 'Test resignation letter content';
      
      await copyToClipboard(testText);
      
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
    });

    it('falls back to execCommand when clipboard API is not available', async () => {
      // Mock clipboard API as unavailable
      Object.assign(navigator, {
        clipboard: undefined
      });

      // Mock document methods
      const mockTextArea = {
        value: '',
        style: {},
        focus: jest.fn(),
        select: jest.fn(),
        remove: jest.fn()
      };
      
      jest.spyOn(document, 'createElement').mockReturnValue(mockTextArea as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation();
      jest.spyOn(document, 'execCommand').mockReturnValue(true);

      const testText = 'Test resignation letter content';
      
      await copyToClipboard(testText);
      
      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(mockTextArea.value).toBe(testText);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('throws error when clipboard operation fails', async () => {
      // Mock clipboard API to throw error
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(new Error('Clipboard error'));
      
      await expect(copyToClipboard('test')).rejects.toThrow('Failed to copy to clipboard. Please try again.');
    });
  });
});