import './globals.css';
import type { Metadata, Viewport } from 'next';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Nav } from '@/components/Nav';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://jiku.my'),
  title: 'jiku.my. Amirul Haziq',
  description: 'Software engineering intern at RHB Group Digital. I build AI and fintech products for Southeast Asia. Open to full-time roles from September 2026.',
  applicationName: 'jiku.my',
  appleWebApp: {
    capable: true,
    title: 'jiku.my',
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://jiku.my',
    title: 'Amirul Haziq · jiku.my',
    description: 'Software engineering intern at RHB Group Digital. I build AI and fintech products for Southeast Asia. Open to full-time roles from September 2026.',
    siteName: 'jiku.my',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Amirul Haziq — jiku.my' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amirul Haziq · jiku.my',
    description: 'Software engineering intern at RHB Group Digital. I build AI and fintech products for Southeast Asia.',
    images: ['/og.png'],
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

// Runs during initial HTML parse, before React hydration and before the
// intro overlay can paint. If the user has already seen the intro this
// session (or prefers reduced motion), we add `intro-skip` to <html> so
// the CSS in globals.css hides the overlay instantly — no flash of black.
// Fresh visitors don't get the class, so the overlay stays visible and the
// Lottie plays as normal.
const INTRO_SKIP_SCRIPT = `try{if(sessionStorage.getItem('intro-played')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <IntroAnimation>
            <Nav />
            <SmoothScroll>{children}</SmoothScroll>
          </IntroAnimation>
        </ThemeProvider>
      </body>
    </html>
  );
}
