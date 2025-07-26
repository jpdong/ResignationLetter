import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resignationTemplates, getTemplateById } from '../../../src/utils/letterTemplates';
import { TEMPLATE_CATEGORIES } from '../../../src/types/resignation';
import ResignationLetterPage from '../../../src/pages/ResignationLetterPage';

interface TemplatePageProps {
  params: {
    templateId: string;
  };
}

export async function generateStaticParams() {
  return resignationTemplates.map((template) => ({
    templateId: template.id,
  }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const template = getTemplateById(params.templateId);
  
  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested resignation letter template was not found.',
    };
  }

  const categoryName = TEMPLATE_CATEGORIES[template.category];
  
  return {
    title: `${template.name} - Free Resignation Letter Template`,
    description: `${template.description} Download this professional ${categoryName.toLowerCase()} resignation letter template for free. Customize with your details and download as PDF, Word, or text.`,
    keywords: `${template.name.toLowerCase()}, ${categoryName.toLowerCase()}, resignation letter template, ${template.category} resignation, professional resignation letter`,
    openGraph: {
      title: `${template.name} - Free Template`,
      description: template.description,
      url: `https://resignationletter.net/templates/${params.templateId}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://resignationletter.net/templates/${params.templateId}`,
    },
  };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  const template = getTemplateById(params.templateId);
  
  if (!template) {
    notFound();
  }

  return <ResignationLetterPage initialTemplate={template} />;
}