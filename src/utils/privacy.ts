import { ResignationLetterData } from '../types/resignation';

export const clearFormData = (): ResignationLetterData => {
  return {
    employeeName: '',
    employeePosition: '',
    companyName: '',
    supervisorName: '',
    lastWorkingDate: '',
    resignationDate: new Date().toISOString().split('T')[0],
    reason: '',
    customMessage: ''
  };
};

export const clearBrowserData = (): void => {
  // Clear any potential browser storage
  if (typeof window !== 'undefined') {
    // Clear localStorage
    try {
      localStorage.removeItem('resignationLetterData');
      localStorage.removeItem('selectedTemplate');
    } catch (error) {
      console.warn('Could not clear localStorage:', error);
    }

    // Clear sessionStorage
    try {
      sessionStorage.removeItem('resignationLetterData');
      sessionStorage.removeItem('selectedTemplate');
    } catch (error) {
      console.warn('Could not clear sessionStorage:', error);
    }

    // Clear any form data from memory (handled by React state)
    // This is automatically handled when components unmount
  }
};

export const getPrivacyNotice = (): string => {
  return `Privacy Notice: Your personal information is processed entirely on your device. 
  We do not store, transmit, or have access to any of the information you enter. 
  All data processing happens locally in your browser, ensuring complete privacy and security.`;
};

export const validatePrivacyCompliance = (): boolean => {
  // Check that we're not accidentally storing data
  if (typeof window === 'undefined') return true;

  try {
    // Check localStorage
    const localStorageKeys = Object.keys(localStorage);
    const hasResignationData = localStorageKeys.some(key => 
      key.includes('resignation') || key.includes('letter')
    );

    // Check sessionStorage
    const sessionStorageKeys = Object.keys(sessionStorage);
    const hasSessionData = sessionStorageKeys.some(key => 
      key.includes('resignation') || key.includes('letter')
    );

    // Return true if no data is found (good for privacy)
    return !hasResignationData && !hasSessionData;
  } catch (error) {
    console.warn('Could not validate privacy compliance:', error);
    return true; // Assume compliant if we can't check
  }
};

export const logPrivacyCompliance = (): void => {
  if (process.env.NODE_ENV === 'development') {
    const isCompliant = validatePrivacyCompliance();
    console.log('Privacy Compliance Check:', isCompliant ? 'PASSED' : 'FAILED');
    
    if (!isCompliant) {
      console.warn('Warning: Potential privacy issue detected. Data may be stored in browser storage.');
    }
  }
};