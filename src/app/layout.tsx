import './globals.css';
import type { Metadata, Viewport } from 'next';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Nav } from '@/components/Nav';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'jiku.my. Amirul Haziq',
  description: 'Software engineering intern at RHB Group Digital. I build AI and fintech products for Southeast Asia.',
  applicationName: 'jiku.my',
  appleWebApp: {
    capable: true,
    title: 'jiku.my',
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IntroAnimation>
          <SmoothScroll>
            <Nav />
            {children}
          </SmoothScroll>
        </IntroAnimation>
      </body>
    </html>
  );
}
