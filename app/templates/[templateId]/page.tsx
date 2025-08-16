import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resignationTemplates, getTemplateById } from '../../../src/utils/letterTemplates';
import { TEMPLATE_CATEGORIES } from '../../../src/types/resignation';
import ResignationLetterPage from '../../../src/pages/ResignationLetterPage';

interface TemplatePageProps {
  params: Promise<{
    templateId: string;
  }>;
}

export async function generateStaticParams() {
  return resignationTemplates.map((template) => ({
    templateId: template.id,
  }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplateById(templateId);
  
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
    openGraph: {
      title: `${template.name} - Free Template`,
      description: template.description,
      url: `https://resignation-letter.net/templates/${templateId}`,
      siteName: 'Resignation Letter Templates',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${template.name} - Free Template`,
      description: template.description,
    },
    alternates: {
      canonical: `https://resignation-letter.net/templates/${templateId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);
  
  if (!template) {
    notFound();
  }

  return <ResignationLetterPage initialTemplate={template} />;
}