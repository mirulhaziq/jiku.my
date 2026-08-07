import Link from 'next/link';
import type { Metadata } from 'next';
import { NotFoundAnimation } from '@/components/NotFoundAnimation';

export const metadata: Metadata = {
  title: 'Page not found',
  description: "The page you're looking for doesn't exist on jiku.my.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 md:py-32 text-center">
      <div className="mx-auto" style={{ width: 'min(60vw, 260px)', aspectRatio: '1 / 1' }}>
        <NotFoundAnimation />
      </div>

      <p className="mt-4 text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400 font-semibold">
        404
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-fg">
        This page hasn&apos;t been built yet
      </h1>
      <p className="mt-3 text-muted max-w-md mx-auto leading-relaxed">
        The URL you followed either moved, doesn&apos;t exist, or is still on the roadmap. Head back to the homepage and try one of the sections.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="rounded-full bg-fg text-bg px-6 py-3 text-sm font-medium transition hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/#projects"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          See projects
        </Link>
      </div>
    </main>
  );
}
