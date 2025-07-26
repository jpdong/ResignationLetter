import { renderTemplate, getLetterWordCount, getLetterCharacterCount, estimateReadingTime } from '../templateRenderer';
import { ResignationLetterData } from '../../types/resignation';

describe('templateRenderer', () => {
  const mockLetterData: ResignationLetterData = {
    employeeName: 'John Doe',
    employeePosition: 'Software Engineer',
    companyName: 'Tech Corp',
    supervisorName: 'Jane Smith',
    lastWorkingDate: '2025-02-15',
    resignationDate: '2025-02-01',
    reason: 'Career advancement',
    customMessage: 'Thank you for everything'
  };

  describe('renderTemplate', () => {
    it('replaces basic template variables', () => {
      const template = 'Dear {{supervisorName}}, I am {{employeeName}} from {{companyName}}.';
      const result = renderTemplate(template, mockLetterData);
      
      expect(result).toBe('Dear Jane Smith, I am John Doe from Tech Corp.');
    });

    it('handles missing data with placeholders', () => {
      const template = 'Dear {{supervisorName}}, I am {{employeeName}}.';
      const incompleteData = { ...mockLetterData, employeeName: '', supervisorName: '' };
      const result = renderTemplate(template, incompleteData);
      
      expect(result).toBe('Dear [Supervisor Name], I am [Your Name].');
    });

    it('formats dates correctly', () => {
      const template = 'My last day will be {{lastWorkingDate}}.';
      const result = renderTemplate(template, mockLetterData);
      
      expect(result).toContain('February 15, 2025');
    });

    it('handles conditional sections with reason', () => {
      const template = '{{#if reason}}Reason: {{reason}}{{/if}}';
      const result = renderTemplate(template, mockLetterData);
      
      expect(result).toBe('Reason: Career advancement');
    });

    it('removes conditional sections when data is missing', () => {
      const template = '{{#if reason}}Reason: {{reason}}{{/if}}';
      const dataWithoutReason = { ...mockLetterData, reason: '' };
      const result = renderTemplate(template, dataWithoutReason);
      
      expect(result).toBe('');
    });

    it('handles custom message conditionals', () => {
      const template = '{{#if customMessage}}{{customMessage}}{{/if}}';
      const result = renderTemplate(template, mockLetterData);
      
      expect(result).toBe('Thank you for everything');
    });
  });

  describe('getLetterWordCount', () => {
    it('counts words correctly', () => {
      const text = 'This is a test letter with ten words total.';
      const count = getLetterWordCount(text);
      
      expect(count).toBe(10);
    });

    it('handles empty text', () => {
      const count = getLetterWordCount('');
      
      expect(count).toBe(0);
    });

    it('handles text with extra whitespace', () => {
      const text = '  This   has   extra   spaces  ';
      const count = getLetterWordCount(text);
      
      expect(count).toBe(4);
    });
  });

  describe('getLetterCharacterCount', () => {
    it('counts characters correctly', () => {
      const text = 'Hello';
      const count = getLetterCharacterCount(text);
      
      expect(count).toBe(5);
    });

    it('includes spaces and punctuation', () => {
      const text = 'Hello, world!';
      const count = getLetterCharacterCount(text);
      
      expect(count).toBe(13);
    });
  });

  describe('estimateReadingTime', () => {
    it('estimates reading time correctly', () => {
      // 225 words should take 1 minute
      const text = 'word '.repeat(225);
      const time = estimateReadingTime(text);
      
      expect(time).toBe(1);
    });

    it('rounds up for partial minutes', () => {
      // 300 words should take 2 minutes (300/225 = 1.33, rounded up to 2)
      const text = 'word '.repeat(300);
      const time = estimateReadingTime(text);
      
      expect(time).toBe(2);
    });

    it('handles empty text', () => {
      const time = estimateReadingTime('');
      
      expect(time).toBe(0);
    });
  });
});