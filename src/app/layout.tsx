import './globals.css';
import type { Metadata } from 'next';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'jiku.my — Amirul Haziq',
  description: 'Portfolio of Amirul Haziq (Jiku) — Software Engineer, AI applications, RHB Group Digital intern.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IntroAnimation>
          <Nav />
          {children}
        </IntroAnimation>
      </body>
    </html>
  );
}
