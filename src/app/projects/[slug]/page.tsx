import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FLAGSHIP_PROJECTS, MORE_PROJECTS } from '@/content/projects';
import { Badge } from '@/components/Badge';
import { InDevelopment } from '@/components/InDevelopment';

const ALL = [...FLAGSHIP_PROJECTS, ...MORE_PROJECTS];

export function generateStaticParams() {
  return ALL.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = ALL.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition"
      >
        <span aria-hidden="true">←</span> Back to projects
      </Link>

      <header className="mt-8 pb-10 mb-12 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">Case Study</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">{project.title}</h1>
        <p className="text-xl text-muted leading-relaxed mb-6">{project.oneLiner}</p>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 mb-4">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-1">Impact</p>
          <p className="text-sm text-fg leading-relaxed">{project.impact}</p>
        </div>
        <p className="text-sm text-muted mb-4">
          <span className="uppercase tracking-widest">Role · </span>
          {project.role}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </header>

      <InDevelopment />
    </main>
  );
}
