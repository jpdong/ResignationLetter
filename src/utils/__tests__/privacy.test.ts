import { clearFormData, clearBrowserData, getPrivacyNotice, validatePrivacyCompliance } from '../privacy';

// Mock localStorage and sessionStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock Object.keys for storage
Object.keys = jest.fn();

describe('privacy utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('clearFormData', () => {
    it('returns empty form data structure', () => {
      const result = clearFormData();
      
      expect(result.employeeName).toBe('');
      expect(result.employeePosition).toBe('');
      expect(result.companyName).toBe('');
      expect(result.supervisorName).toBe('');
      expect(result.lastWorkingDate).toBe('');
      expect(result.reason).toBe('');
      expect(result.customMessage).toBe('');
      expect(result.resignationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('clearBrowserData', () => {
    it('clears localStorage items', () => {
      clearBrowserData();
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('resignationLetterData');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('selectedTemplate');
    });

    it('clears sessionStorage items', () => {
      clearBrowserData();
      
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('resignationLetterData');
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('selectedTemplate');
    });

    it('handles localStorage errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      expect(() => clearBrowserData()).not.toThrow();
    });
  });

  describe('getPrivacyNotice', () => {
    it('returns privacy notice text', () => {
      const notice = getPrivacyNotice();
      
      expect(notice).toContain('Privacy Notice');
      expect(notice).toContain('processed entirely on your device');
      expect(notice).toContain('do not store');
    });
  });

  describe('validatePrivacyCompliance', () => {
    it('returns true when no resignation data is stored', () => {
      (Object.keys as jest.Mock)
        .mockReturnValueOnce(['someOtherKey'])
        .mockReturnValueOnce(['anotherKey']);
      
      const result = validatePrivacyCompliance();
      
      expect(result).toBe(true);
    });

    it('returns false when resignation data is found in localStorage', () => {
      (Object.keys as jest.Mock)
        .mockReturnValueOnce(['resignationLetterData'])
        .mockReturnValueOnce([]);
      
      const result = validatePrivacyCompliance();
      
      expect(result).toBe(false);
    });

    it('returns false when resignation data is found in sessionStorage', () => {
      (Object.keys as jest.Mock)
        .mockReturnValueOnce([])
        .mockReturnValueOnce(['selectedTemplate']);
      
      const result = validatePrivacyCompliance();
      
      expect(result).toBe(false);
    });

    it('handles storage access errors gracefully', () => {
      (Object.keys as jest.Mock).mockImplementation(() => {
        throw new Error('Storage access error');
      });
      
      const result = validatePrivacyCompliance();
      
      expect(result).toBe(true);
    });
  });
});