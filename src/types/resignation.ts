export interface ResignationLetterData {
  employeeName: string;
  employeePosition: string;
  companyName: string;
  supervisorName: string;
  lastWorkingDate: string;
  resignationDate: string;
  reason?: string;
  customMessage?: string;
}

export interface LetterTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  template: string;
  preview: string;
}

export type TemplateCategory = 'standard' | 'immediate' | 'career-change' | 'retirement' | 'personal';

export interface FormValidation {
  employeeName: string | null;
  employeePosition: string | null;
  companyName: string | null;
  supervisorName: string | null;
  lastWorkingDate: string | null;
}

export interface DownloadOptions {
  format: 'pdf' | 'docx' | 'text';
  filename?: string;
}

export interface TemplateFilter {
  category: TemplateCategory | 'all';
  searchTerm: string;
}

export const TEMPLATE_CATEGORIES: Record<TemplateCategory, string> = {
  standard: 'Standard Resignation',
  immediate: 'Immediate Resignation',
  'career-change': 'Career Change',
  retirement: 'Retirement',
  personal: 'Personal Reasons'
};

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message: string;
}

export const VALIDATION_RULES: Record<keyof ResignationLetterData, ValidationRule[]> = {
  employeeName: [
    { required: true, message: 'Employee name is required' },
    { minLength: 2, message: 'Name must be at least 2 characters' },
    { maxLength: 50, message: 'Name must be less than 50 characters' }
  ],
  employeePosition: [
    { required: true, message: 'Position is required' },
    { minLength: 2, message: 'Position must be at least 2 characters' },
    { maxLength: 100, message: 'Position must be less than 100 characters' }
  ],
  companyName: [
    { required: true, message: 'Company name is required' },
    { minLength: 2, message: 'Company name must be at least 2 characters' },
    { maxLength: 100, message: 'Company name must be less than 100 characters' }
  ],
  supervisorName: [
    { required: true, message: 'Supervisor name is required' },
    { minLength: 2, message: 'Supervisor name must be at least 2 characters' },
    { maxLength: 50, message: 'Supervisor name must be less than 50 characters' }
  ],
  lastWorkingDate: [
    { required: true, message: 'Last working date is required' }
  ],
  resignationDate: [
    { required: true, message: 'Resignation date is required' }
  ],
  reason: [
    { maxLength: 500, message: 'Reason must be less than 500 characters' }
  ],
  customMessage: [
    { maxLength: 1000, message: 'Custom message must be less than 1000 characters' }
  ]
};