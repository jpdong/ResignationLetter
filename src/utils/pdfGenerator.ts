import jsPDF from 'jspdf';
import { ResignationLetterData, LetterTemplate } from '../types/resignation';
import { renderTemplate } from './templateRenderer';

export interface PDFGenerationOptions {
  filename?: string;
  fontSize?: number;
  lineHeight?: number;
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const DEFAULT_OPTIONS: Required<PDFGenerationOptions> = {
  filename: 'resignation-letter.pdf',
  fontSize: 12,
  lineHeight: 1.6,
  margins: {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
  }
};

export const generatePDF = async (
  template: LetterTemplate,
  letterData: ResignationLetterData,
  options: PDFGenerationOptions = {}
): Promise<void> => {
  try {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const doc = new jsPDF();
    
    // Set up document properties
    doc.setProperties({
      title: 'Resignation Letter',
      subject: 'Professional Resignation Letter',
      author: letterData.employeeName || 'Employee',
      creator: 'Resignation Letter Template'
    });

    // Render the template with user data
    const renderedLetter = renderTemplate(template.template, letterData);
    
    // Set font and size
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(opts.fontSize);
    
    // Calculate page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - opts.margins.left - opts.margins.right;
    
    // Add date at the top right
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.setFontSize(10);
    const dateWidth = doc.getTextWidth(currentDate);
    doc.text(currentDate, pageWidth - opts.margins.right - dateWidth, opts.margins.top);
    
    // Reset font size for letter content
    doc.setFontSize(opts.fontSize);
    
    // Split text into lines and add to PDF
    const lines = doc.splitTextToSize(renderedLetter, textWidth);
    let yPosition = opts.margins.top + 20; // Start below the date
    
    for (let i = 0; i < lines.length; i++) {
      // Check if we need a new page
      if (yPosition > pageHeight - opts.margins.bottom) {
        doc.addPage();
        yPosition = opts.margins.top;
      }
      
      doc.text(lines[i], opts.margins.left, yPosition);
      yPosition += opts.fontSize * opts.lineHeight;
    }
    
    // Save the PDF
    doc.save(opts.filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const generatePDFBlob = async (
  template: LetterTemplate,
  letterData: ResignationLetterData,
  options: PDFGenerationOptions = {}
): Promise<Blob> => {
  try {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const doc = new jsPDF();
    
    // Set up document properties
    doc.setProperties({
      title: 'Resignation Letter',
      subject: 'Professional Resignation Letter',
      author: letterData.employeeName || 'Employee',
      creator: 'Resignation Letter Template'
    });

    // Render the template with user data
    const renderedLetter = renderTemplate(template.template, letterData);
    
    // Set font and size
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(opts.fontSize);
    
    // Calculate page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - opts.margins.left - opts.margins.right;
    
    // Add date at the top right
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.setFontSize(10);
    const dateWidth = doc.getTextWidth(currentDate);
    doc.text(currentDate, pageWidth - opts.margins.right - dateWidth, opts.margins.top);
    
    // Reset font size for letter content
    doc.setFontSize(opts.fontSize);
    
    // Split text into lines and add to PDF
    const lines = doc.splitTextToSize(renderedLetter, textWidth);
    let yPosition = opts.margins.top + 20; // Start below the date
    
    for (let i = 0; i < lines.length; i++) {
      // Check if we need a new page
      if (yPosition > pageHeight - opts.margins.bottom) {
        doc.addPage();
        yPosition = opts.margins.top;
      }
      
      doc.text(lines[i], opts.margins.left, yPosition);
      yPosition += opts.fontSize * opts.lineHeight;
    }
    
    // Return as blob
    return doc.output('blob');
    
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const validatePDFGeneration = (
  template: LetterTemplate | null,
  letterData: ResignationLetterData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!template) {
    errors.push('Please select a template');
  }
  
  if (!letterData.employeeName?.trim()) {
    errors.push('Employee name is required');
  }
  
  if (!letterData.employeePosition?.trim()) {
    errors.push('Employee position is required');
  }
  
  if (!letterData.companyName?.trim()) {
    errors.push('Company name is required');
  }
  
  if (!letterData.supervisorName?.trim()) {
    errors.push('Supervisor name is required');
  }
  
  if (!letterData.lastWorkingDate) {
    errors.push('Last working date is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};