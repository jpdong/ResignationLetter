import { validateField, validateForm, isFormValid, formatDate, getTodayDate, getMinDate } from '../validation';
import { ResignationLetterData } from '../../types/resignation';

describe('validation', () => {
  describe('validateField', () => {
    it('validates required fields', () => {
      const result = validateField('employeeName', '');
      expect(result).toBe('Employee name is required');
    });

    it('validates minimum length', () => {
      const result = validateField('employeeName', 'A');
      expect(result).toBe('Name must be at least 2 characters');
    });

    it('validates maximum length', () => {
      const longName = 'A'.repeat(51);
      const result = validateField('employeeName', longName);
      expect(result).toBe('Name must be less than 50 characters');
    });

    it('returns null for valid input', () => {
      const result = validateField('employeeName', 'John Doe');
      expect(result).toBeNull();
    });

    it('handles optional fields', () => {
      const result = validateField('reason', '');
      expect(result).toBeNull();
    });
  });

  describe('validateForm', () => {
    const validData: ResignationLetterData = {
      employeeName: 'John Doe',
      employeePosition: 'Software Engineer',
      companyName: 'Tech Corp',
      supervisorName: 'Jane Smith',
      lastWorkingDate: '2025-02-15',
      resignationDate: '2025-02-01',
      reason: '',
      customMessage: ''
    };

    it('validates complete form successfully', () => {
      const result = validateForm(validData);
      
      expect(result.employeeName).toBeNull();
      expect(result.employeePosition).toBeNull();
      expect(result.companyName).toBeNull();
      expect(result.supervisorName).toBeNull();
      expect(result.lastWorkingDate).toBeNull();
    });

    it('validates incomplete form with errors', () => {
      const incompleteData = { ...validData, employeeName: '', companyName: '' };
      const result = validateForm(incompleteData);
      
      expect(result.employeeName).toBe('Employee name is required');
      expect(result.companyName).toBe('Company name is required');
    });

    it('validates future date requirement', () => {
      const pastDate = '2020-01-01';
      const dataWithPastDate = { ...validData, lastWorkingDate: pastDate };
      const result = validateForm(dataWithPastDate);
      
      expect(result.lastWorkingDate).toBe('Last working date must be in the future');
    });
  });

  describe('isFormValid', () => {
    it('returns true for valid form', () => {
      const validation = {
        employeeName: null,
        employeePosition: null,
        companyName: null,
        supervisorName: null,
        lastWorkingDate: null
      };
      
      expect(isFormValid(validation)).toBe(true);
    });

    it('returns false for invalid form', () => {
      const validation = {
        employeeName: 'Employee name is required',
        employeePosition: null,
        companyName: null,
        supervisorName: null,
        lastWorkingDate: null
      };
      
      expect(isFormValid(validation)).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const result = formatDate('2025-02-15');
      expect(result).toBe('February 15, 2025');
    });

    it('handles empty date', () => {
      const result = formatDate('');
      expect(result).toBe('');
    });

    it('handles invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('getTodayDate', () => {
    it('returns today\'s date in YYYY-MM-DD format', () => {
      const result = getTodayDate();
      const today = new Date().toISOString().split('T')[0];
      
      expect(result).toBe(today);
    });
  });

  describe('getMinDate', () => {
    it('returns tomorrow\'s date in YYYY-MM-DD format', () => {
      const result = getMinDate();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const expectedDate = tomorrow.toISOString().split('T')[0];
      
      expect(result).toBe(expectedDate);
    });
  });
});