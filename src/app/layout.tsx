import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'jiku.my',
  description: 'Portfolio of Amirul Haziq (Jiku)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
