import { ResignationLetterData } from '../types/resignation';
import { formatDate } from './validation';

export const renderTemplate = (template: string, data: ResignationLetterData): string => {
  let rendered = template;

  // Replace basic variables
  rendered = rendered.replace(/\{\{employeeName\}\}/g, data.employeeName || '[Your Name]');
  rendered = rendered.replace(/\{\{employeePosition\}\}/g, data.employeePosition || '[Your Position]');
  rendered = rendered.replace(/\{\{companyName\}\}/g, data.companyName || '[Company Name]');
  rendered = rendered.replace(/\{\{supervisorName\}\}/g, data.supervisorName || '[Supervisor Name]');
  
  // Format dates
  const formattedLastWorkingDate = data.lastWorkingDate 
    ? formatDate(data.lastWorkingDate) 
    : '[Last Working Date]';
  const formattedResignationDate = data.resignationDate 
    ? formatDate(data.resignationDate) 
    : formatDate(new Date().toISOString().split('T')[0]);
    
  rendered = rendered.replace(/\{\{lastWorkingDate\}\}/g, formattedLastWorkingDate);
  rendered = rendered.replace(/\{\{resignationDate\}\}/g, formattedResignationDate);

  // Handle conditional sections
  rendered = handleConditionalSections(rendered, data);

  return rendered;
};

const handleConditionalSections = (template: string, data: ResignationLetterData): string => {
  let rendered = template;

  // Handle {{#if reason}} blocks
  const reasonRegex = /\{\{#if reason\}\}\s*([\s\S]*?)\s*\{\{\/if\}\}/g;
  rendered = rendered.replace(reasonRegex, (match, content) => {
    if (data.reason && data.reason.trim()) {
      return content.replace(/\{\{reason\}\}/g, data.reason);
    }
    return '';
  });

  // Handle {{#if customMessage}} blocks
  const customMessageRegex = /\{\{#if customMessage\}\}\s*([\s\S]*?)\s*\{\{\/if\}\}/g;
  rendered = rendered.replace(customMessageRegex, (match, content) => {
    if (data.customMessage && data.customMessage.trim()) {
      return content.replace(/\{\{customMessage\}\}/g, data.customMessage);
    }
    return '';
  });

  // Clean up any remaining template variables
  rendered = rendered.replace(/\{\{reason\}\}/g, data.reason || '');
  rendered = rendered.replace(/\{\{customMessage\}\}/g, data.customMessage || '');

  return rendered;
};

export const getLetterWordCount = (renderedLetter: string): number => {
  return renderedLetter.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const getLetterCharacterCount = (renderedLetter: string): number => {
  return renderedLetter.length;
};

export const estimateReadingTime = (renderedLetter: string): number => {
  const wordCount = getLetterWordCount(renderedLetter);
  // Average reading speed is about 200-250 words per minute
  return Math.ceil(wordCount / 225);
};