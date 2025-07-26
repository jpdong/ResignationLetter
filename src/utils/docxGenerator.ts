import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { ResignationLetterData, LetterTemplate } from '../types/resignation';
import { renderTemplate } from './templateRenderer';

export interface DOCXGenerationOptions {
  filename?: string;
  fontSize?: number;
  fontFamily?: string;
  lineSpacing?: number;
}

const DEFAULT_OPTIONS: Required<DOCXGenerationOptions> = {
  filename: 'resignation-letter.docx',
  fontSize: 24, // Half-points (12pt = 24 half-points)
  fontFamily: 'Times New Roman',
  lineSpacing: 1.5
};

export const generateDOCX = async (
  template: LetterTemplate,
  letterData: ResignationLetterData,
  options: DOCXGenerationOptions = {}
): Promise<void> => {
  try {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    // Render the template with user data
    const renderedLetter = renderTemplate(template.template, letterData);
    
    // Create document
    const doc = new Document({
      creator: 'Resignation Letter Generator',
      title: 'Resignation Letter',
      description: 'Professional resignation letter',
      sections: [
        {
          properties: {},
          children: [
            // Date paragraph (right-aligned)
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  font: opts.fontFamily,
                  size: opts.fontSize
                })
              ],
              spacing: {
                after: 400 // Space after paragraph
              }
            }),
            
            // Letter content paragraphs
            ...createLetterParagraphs(renderedLetter, opts)
          ]
        }
      ]
    });

    // Generate and download the document
    const blob = await Packer.toBlob(doc);
    downloadBlob(blob, opts.filename);
    
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate Word document. Please try again.');
  }
};

export const generateDOCXBlob = async (
  template: LetterTemplate,
  letterData: ResignationLetterData,
  options: DOCXGenerationOptions = {}
): Promise<Blob> => {
  try {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    
    // Render the template with user data
    const renderedLetter = renderTemplate(template.template, letterData);
    
    // Create document
    const doc = new Document({
      creator: 'Resignation Letter Generator',
      title: 'Resignation Letter',
      description: 'Professional resignation letter',
      sections: [
        {
          properties: {},
          children: [
            // Date paragraph (right-aligned)
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  font: opts.fontFamily,
                  size: opts.fontSize
                })
              ],
              spacing: {
                after: 400 // Space after paragraph
              }
            }),
            
            // Letter content paragraphs
            ...createLetterParagraphs(renderedLetter, opts)
          ]
        }
      ]
    });

    // Return as blob
    return await Packer.toBlob(doc);
    
  } catch (error) {
    console.error('Error generating DOCX blob:', error);
    throw new Error('Failed to generate Word document. Please try again.');
  }
};

const createLetterParagraphs = (
  renderedLetter: string,
  options: Required<DOCXGenerationOptions>
): Paragraph[] => {
  const paragraphs: Paragraph[] = [];
  const lines = renderedLetter.split('\n');
  
  let currentParagraphLines: string[] = [];
  
  for (const line of lines) {
    if (line.trim() === '') {
      // Empty line - end current paragraph and start new one
      if (currentParagraphLines.length > 0) {
        paragraphs.push(createParagraph(currentParagraphLines.join('\n'), options));
        currentParagraphLines = [];
      }
      // Add empty paragraph for spacing
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: '' })],
        spacing: { after: 200 }
      }));
    } else {
      currentParagraphLines.push(line);
    }
  }
  
  // Add final paragraph if there are remaining lines
  if (currentParagraphLines.length > 0) {
    paragraphs.push(createParagraph(currentParagraphLines.join('\n'), options));
  }
  
  return paragraphs;
};

const createParagraph = (
  text: string,
  options: Required<DOCXGenerationOptions>
): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        font: options.fontFamily,
        size: options.fontSize
      })
    ],
    spacing: {
      line: Math.round(options.lineSpacing * 240), // Convert to twentieths of a point
      after: 200 // Space after paragraph
    }
  });
};

const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const validateDOCXGeneration = (
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

export const generatePlainText = (
  template: LetterTemplate,
  letterData: ResignationLetterData
): string => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const renderedLetter = renderTemplate(template.template, letterData);
  
  return `${currentDate}\n\n${renderedLetter}`;
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw new Error('Failed to copy to clipboard. Please try again.');
  }
};