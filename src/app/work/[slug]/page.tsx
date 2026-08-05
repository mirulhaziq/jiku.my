import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WORK } from '@/content/work';
import { Badge } from '@/components/Badge';
import { InDevelopment } from '@/components/InDevelopment';
import { ProjectImage } from '@/components/ProjectImage';

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const entry = WORK.find((w) => w.slug === params.slug);
  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition"
      >
        <span aria-hidden="true">←</span> Back to work
      </Link>

      <div className="mt-8 mb-10">
        <ProjectImage
          source={{ slug: entry.slug, label: entry.employer, image: entry.image, imageAlt: entry.imageAlt }}
          aspect="16/9"
          priority
        />
      </div>

      <header className="pb-10 mb-12 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">Case study</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">{entry.role}</h1>
        <p className="text-xl text-muted leading-relaxed mb-2">{entry.employer}</p>
        <p className="text-sm text-muted mb-6">{entry.dateRange} · {entry.location}</p>

        <p className="text-lg text-fg leading-relaxed mb-6">{entry.oneLiner}</p>

        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-1">Impact</p>
          <p className="text-2xl font-semibold tracking-tight text-fg mb-1">{entry.impactHeadline}</p>
          <p className="text-sm text-muted leading-relaxed">{entry.impactContext}</p>
        </div>

        <ul className="space-y-2 mb-6">
          {entry.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-muted leading-relaxed">
              <span className="text-fg/50 shrink-0" aria-hidden="true">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {entry.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </header>

      <InDevelopment />
    </main>
  );
}
