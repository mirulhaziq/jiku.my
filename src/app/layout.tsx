import './globals.css';
import type { Metadata, Viewport } from 'next';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Nav } from '@/components/Nav';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';

const DESCRIPTION =
  'Amirul Haziq is a final-year Software Engineering student at UKM, on industrial training at RHB Bank Group Digital, and founding-team Mobile Full-Stack Developer at VERiQ. I build AI and fintech products for Southeast Asia. Open to full-time software engineering roles from September 2026.';

export const metadata: Metadata = {
  metadataBase: new URL('https://jiku.my'),
  title: {
    default: 'Amirul Haziq — Software Engineer, AI & Fintech (jiku.my)',
    template: '%s · Amirul Haziq',
  },
  description: DESCRIPTION,
  keywords: [
    'Amirul Haziq',
    'Amirul Haziq Bin Shazlee',
    'jiku',
    'jiku.my',
    'Software Engineer Malaysia',
    'AI fintech Southeast Asia',
    'RHB Bank internship',
    'UKM software engineering',
    'Next.js portfolio',
    'VERiQ',
    'MyDID',
    'Mobile Full-Stack Developer Malaysia',
  ],
  authors: [{ name: 'Amirul Haziq', url: 'https://jiku.my' }],
  creator: 'Amirul Haziq',
  publisher: 'Amirul Haziq',
  applicationName: 'jiku.my',
  category: 'portfolio',
  alternates: { canonical: 'https://jiku.my' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
    description: DESCRIPTION,
    siteName: 'jiku.my',
    locale: 'en_MY',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Amirul Haziq — jiku.my' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amirul Haziq · jiku.my',
    description: DESCRIPTION,
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
const INTRO_SKIP_SCRIPT = `try{if(sessionStorage.getItem('intro-played')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip')}}catch(e){}`;

// JSON-LD structured data — Google reads this and enriches search results.
// Person schema tells Google who Amirul is, his role, his links.
const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amirul Haziq Bin Shazlee',
  alternateName: ['Amirul Haziq', 'Jiku'],
  url: 'https://jiku.my',
  image: 'https://jiku.my/face.webp',
  jobTitle: 'Software Engineering Intern',
  worksFor: [
    { '@type': 'Organization', name: 'RHB Bank, Group Digital', url: 'https://www.rhbgroup.com/' },
    { '@type': 'Organization', name: 'VERiQ', url: 'https://veriq.my' },
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universiti Kebangsaan Malaysia',
    url: 'https://www.ukm.my',
  },
  nationality: { '@type': 'Country', name: 'Malaysia' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuala Lumpur',
    addressCountry: 'MY',
  },
  email: 'mailto:ahaziqshazlee@gmail.com',
  sameAs: [
    'https://github.com/mirulhaziq',
    'https://www.linkedin.com/in/amirulhaziqshazlee',
  ],
  knowsAbout: [
    'Software Engineering',
    'AI Applications',
    'Fintech',
    'Mobile Development',
    'Full-Stack Development',
    'Next.js',
    'TypeScript',
    'Python',
    'Swift',
    'FastAPI',
    'Supabase',
    'AWS',
  ],
  description: DESCRIPTION,
};

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'jiku.my',
  url: 'https://jiku.my',
  description: DESCRIPTION,
  author: { '@type': 'Person', name: 'Amirul Haziq Bin Shazlee' },
  inLanguage: 'en-MY',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload the LCP image (Hero photo) so it starts downloading immediately */}
        <link rel="preload" as="image" href="/face.webp" type="image/webp" fetchPriority="high" />
        {/* Preload the Lottie WASM so the intro doesn't wait for it */}
        <link rel="preload" as="fetch" href="/dotlottie-player.wasm" type="application/wasm" crossOrigin="anonymous" />
        {/* Intro-skip pre-hydration guard */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }} />
        {/* JSON-LD structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
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
