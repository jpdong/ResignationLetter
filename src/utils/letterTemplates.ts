import { LetterTemplate } from '../types/resignation';

export const resignationTemplates: LetterTemplate[] = [
  {
    id: 'standard-resignation',
    name: 'Standard Resignation Letter',
    category: 'standard',
    description: 'A professional, straightforward resignation letter suitable for most situations.',
    template: `Dear {{supervisorName}},

I am writing to formally notify you of my resignation from my position as {{employeePosition}} at {{companyName}}. My last day of work will be {{lastWorkingDate}}.

{{#if reason}}
{{reason}}
{{/if}}

I am committed to making this transition as smooth as possible. I am willing to assist in training my replacement and completing any outstanding projects during my remaining time here.

Thank you for the opportunities for professional and personal growth during my time at {{companyName}}. I have enjoyed working with the team and appreciate the support provided to me.

{{#if customMessage}}
{{customMessage}}
{{/if}}

Sincerely,
{{employeeName}}`,
    preview: 'A professional standard resignation letter that includes formal notification, last working date, transition assistance offer, and gratitude expression.'
  },
  {
    id: 'immediate-resignation',
    name: 'Immediate Resignation Letter',
    category: 'immediate',
    description: 'For situations requiring immediate departure with minimal notice period.',
    template: `Dear {{supervisorName}},

I am writing to inform you of my immediate resignation from my position as {{employeePosition}} at {{companyName}}, effective {{resignationDate}}.

{{#if reason}}
Due to {{reason}}, I am unable to provide the standard notice period.
{{/if}}

I understand this may cause inconvenience, and I apologize for the short notice. I am willing to assist in any way possible during this immediate transition to minimize disruption to the team and ongoing projects.

{{#if customMessage}}
{{customMessage}}
{{/if}}

I appreciate the opportunities I have had at {{companyName}} and wish the organization continued success.

Sincerely,
{{employeeName}}`,
    preview: 'An immediate resignation letter for urgent situations where standard notice period cannot be provided.'
  },
  {
    id: 'career-change-resignation',
    name: 'Career Change Resignation Letter',
    category: 'career-change',
    description: 'Perfect for when you\'re leaving to pursue a new career path or opportunity.',
    template: `Dear {{supervisorName}},

I am writing to formally announce my resignation from my position as {{employeePosition}} at {{companyName}}. My last day of work will be {{lastWorkingDate}}.

I have accepted a position that will allow me to pursue new career opportunities and professional growth in a different field. This decision was not made lightly, as I have greatly valued my time and experiences at {{companyName}}.

{{#if reason}}
{{reason}}
{{/if}}

During my remaining time, I am committed to ensuring a smooth transition. I will work diligently to complete my current projects and assist in training my replacement or transferring my responsibilities to other team members.

I want to express my sincere gratitude for the professional development opportunities, mentorship, and support I have received during my tenure here. The skills and experiences I have gained at {{companyName}} will be invaluable as I move forward in my career.

{{#if customMessage}}
{{customMessage}}
{{/if}}

Thank you again for everything. I wish {{companyName}} and the entire team continued success.

Best regards,
{{employeeName}}`,
    preview: 'A resignation letter specifically crafted for career transitions, emphasizing growth opportunities and gratitude.'
  },
  {
    id: 'retirement-resignation',
    name: 'Retirement Resignation Letter',
    category: 'retirement',
    description: 'A dignified resignation letter for those retiring after years of service.',
    template: `Dear {{supervisorName}},

After much consideration, I am writing to formally announce my retirement from my position as {{employeePosition}} at {{companyName}}. My last day of work will be {{lastWorkingDate}}.

This decision comes after careful thought and planning, and I am excited to begin this new chapter of my life. My years at {{companyName}} have been incredibly rewarding, both professionally and personally.

{{#if reason}}
{{reason}}
{{/if}}

I am committed to ensuring a smooth transition during my remaining time. I will work closely with my colleagues and management to transfer my responsibilities and share my knowledge to maintain continuity in our operations.

I want to express my heartfelt gratitude for the opportunities, experiences, and relationships I have built during my time here. {{companyName}} has been more than just a workplace; it has been a place where I have grown professionally and formed lasting friendships.

{{#if customMessage}}
{{customMessage}}
{{/if}}

Thank you for your understanding and support. I wish {{companyName}} and all my colleagues continued success and prosperity.

With warm regards,
{{employeeName}}`,
    preview: 'A respectful retirement resignation letter that reflects on years of service and expresses gratitude.'
  },
  {
    id: 'personal-reasons-resignation',
    name: 'Personal Reasons Resignation Letter',
    category: 'personal',
    description: 'A tactful resignation letter for personal circumstances without oversharing details.',
    template: `Dear {{supervisorName}},

I am writing to formally notify you of my resignation from my position as {{employeePosition}} at {{companyName}}. My last day of work will be {{lastWorkingDate}}.

Due to personal circumstances that require my immediate attention, I have made the difficult decision to step away from my current role.

{{#if reason}}
{{reason}}
{{/if}}

I am committed to making this transition as seamless as possible. I will work diligently to complete my current assignments and assist in the handover of my responsibilities to ensure minimal disruption to the team and our projects.

I have greatly appreciated the opportunities for growth and development that {{companyName}} has provided me. Working with such a dedicated and professional team has been a valuable experience.

{{#if customMessage}}
{{customMessage}}
{{/if}}

Thank you for your understanding during this time. I wish {{companyName}} and the team all the best for the future.

Sincerely,
{{employeeName}}`,
    preview: 'A professional resignation letter for personal reasons that maintains privacy while being respectful.'
  },
  {
    id: 'relocation-resignation',
    name: 'Relocation Resignation Letter',
    category: 'personal',
    description: 'For resignations due to moving to a new location where remote work isn\'t possible.',
    template: `Dear {{supervisorName}},

I am writing to formally notify you of my resignation from my position as {{employeePosition}} at {{companyName}}. My last day of work will be {{lastWorkingDate}}.

Due to my upcoming relocation to a new city/state, I will no longer be able to fulfill my current role requirements. This decision was not made lightly, as I have thoroughly enjoyed my time working at {{companyName}}.

{{#if reason}}
{{reason}}
{{/if}}

I am fully committed to ensuring a smooth transition during my remaining time. I will work closely with my team to complete ongoing projects and provide comprehensive documentation for my replacement.

I want to thank you and the entire team for the support, guidance, and opportunities for professional growth that I have received during my tenure. The experience and skills I have gained here will be invaluable in my future endeavors.

{{#if customMessage}}
{{customMessage}}
{{/if}}

I hope to maintain the professional relationships I have built here and wish {{companyName}} continued success.

Best regards,
{{employeeName}}`,
    preview: 'A resignation letter specifically for relocation situations, maintaining positive relationships for the future.'
  }
];

export const getTemplateById = (id: string): LetterTemplate | undefined => {
  return resignationTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): LetterTemplate[] => {
  if (category === 'all') {
    return resignationTemplates;
  }
  return resignationTemplates.filter(template => template.category === category);
};

export const searchTemplates = (searchTerm: string): LetterTemplate[] => {
  const term = searchTerm.toLowerCase();
  return resignationTemplates.filter(template => 
    template.name.toLowerCase().includes(term) ||
    template.description.toLowerCase().includes(term) ||
    template.category.toLowerCase().includes(term)
  );
};