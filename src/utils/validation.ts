import { ResignationLetterData, ValidationRule, VALIDATION_RULES, FormValidation } from '../types/resignation';

export const validateField = (
  fieldName: keyof ResignationLetterData,
  value: string
): string | null => {
  const rules = VALIDATION_RULES[fieldName];
  
  for (const rule of rules) {
    if (rule.required && (!value || value.trim() === '')) {
      return rule.message;
    }
    
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }
    
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message;
    }
    
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }
  }
  
  return null;
};

export const validateForm = (data: ResignationLetterData): FormValidation => {
  const validation: FormValidation = {
    employeeName: validateField('employeeName', data.employeeName),
    employeePosition: validateField('employeePosition', data.employeePosition),
    companyName: validateField('companyName', data.companyName),
    supervisorName: validateField('supervisorName', data.supervisorName),
    lastWorkingDate: validateField('lastWorkingDate', data.lastWorkingDate)
  };

  // Additional date validation
  if (data.lastWorkingDate) {
    const lastWorkingDate = new Date(data.lastWorkingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (lastWorkingDate <= today) {
      validation.lastWorkingDate = 'Last working date must be in the future';
    }
  }

  return validation;
};

export const isFormValid = (validation: FormValidation): boolean => {
  return Object.values(validation).every(error => error === null);
};

export const formatDate = (date: string): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getMinDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};