import type { MetadataRoute } from 'next';
import { FLAGSHIP_PROJECTS, MORE_PROJECTS } from '@/content/projects';
import { WORK } from '@/content/work';
import { getAllPosts } from '@/lib/posts';

const BASE_URL = 'https://jiku.my';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projects = [...FLAGSHIP_PROJECTS, ...MORE_PROJECTS].map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const work = WORK.map((w) => ({
    url: `${BASE_URL}/work/${w.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogIndex = {
    url: `${BASE_URL}/blog`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };

  const blogPosts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
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
    blogIndex,
    ...blogPosts,
    ...work,
    ...projects,
  ];
}
