import { MetadataRoute } from 'next';
import { resignationTemplates } from '../src/utils/letterTemplates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resignationletter.net';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Template pages
  const templatePages = resignationTemplates.map((template) => ({
    url: `${baseUrl}/templates/${template.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...templatePages];
}