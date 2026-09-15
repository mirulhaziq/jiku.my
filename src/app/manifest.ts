import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'jiku.my. Amirul Haziq',
    short_name: 'jiku.my',
    description: 'Former software engineering intern at RHB Group Digital. I build AI and fintech products for Southeast Asia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#0071e3',
    orientation: 'portrait',
    categories: ['portfolio', 'productivity'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
