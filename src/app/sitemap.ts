import type { MetadataRoute } from 'next';
import { FLAGSHIP_PROJECTS, MORE_PROJECTS } from '@/content/projects';

const BASE_URL = 'https://jiku.my';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projects = [...FLAGSHIP_PROJECTS, ...MORE_PROJECTS].map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects,
  ];
}
