'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Project, ProjectCategory } from '@/content/projects';
import { Badge } from './Badge';
import { ProjectImage } from './ProjectImage';
import { cn } from '@/lib/cn';

type Variant = 'flagship-hero' | 'flagship' | 'more';

const CATEGORY_TINT: Record<ProjectCategory, string> = {
  programme: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
  client: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  hackathon: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
  fyp: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/30',
  venture: 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/30',
};

const CATEGORY_GLOW: Record<ProjectCategory, string> = {
  programme: '0, 113, 227',
  client: '16, 185, 129',
  hackathon: '245, 158, 11',
  fyp: '139, 92, 246',
  venture: '236, 72, 153',
};

export function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: Variant;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  const glowRgb = CATEGORY_GLOW[project.category];
  const glowStyle = {
    background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(${glowRgb}, 0.10), transparent 40%)`,
  } as React.CSSProperties;

  if (variant === 'more') {
    return (
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-card p-4 md:p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={glowStyle} />
        <span className={cn('inline-flex self-start items-center rounded-full border px-2.5 py-0.5 text-xs font-medium mb-3 relative z-10', CATEGORY_TINT[project.category])}>
          {project.categoryLabel}
        </span>
        <ProjectImage
          source={{ slug: project.slug, label: project.title, image: project.image, imageAlt: project.imageAlt }}
          aspect="16/9"
          className="mb-4"
        />
        <h3 className="text-lg font-semibold mb-1 text-fg group-hover:text-accent transition-colors relative z-10">
          {project.title}
        </h3>
        <p className="text-sm text-muted mb-3 leading-relaxed relative z-10">{project.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {project.techStack.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </Link>
    );
  }

  if (variant === 'flagship-hero') {
    return (
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        onMouseMove={handleMouseMove}
        className="group relative overflow-hidden rounded-card border border-border bg-card p-6 md:p-8 transition hover:-translate-y-0.5 hover:shadow-xl md:col-span-2 grid gap-6 md:gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center"
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={glowStyle} />

        <div className="relative z-10 order-2 md:order-1">
          <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium mb-4', CATEGORY_TINT[project.category])}>
            {project.categoryLabel}
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-fg group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-6">{project.oneLiner}</p>
          <ImpactDisplay project={project} />
          <p className="mt-6 text-xs text-muted">
            <span className="uppercase tracking-widest">Role. </span>
            {project.role}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <span className="mt-6 inline-block text-xs text-blue-700 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read case study →
          </span>
        </div>

        <div className="relative z-10 order-1 md:order-2">
          <ProjectImage
            source={{ slug: project.slug, label: project.title, image: project.image, imageAlt: project.imageAlt }}
            aspect="16/10"
            priority
          />
        </div>
      </Link>
    );
  }

  // variant === 'flagship' (standard flagship, 2-up grid)
  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden flex flex-col rounded-card border border-border bg-card p-5 md:p-6 transition hover:-translate-y-0.5 hover:shadow-xl h-full"
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={glowStyle} />

      <div className="relative z-10 mb-4">
        <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', CATEGORY_TINT[project.category])}>
          {project.categoryLabel}
        </span>
      </div>
      <div className="relative z-10 mb-5">
        <ProjectImage
          source={{ slug: project.slug, label: project.title, image: project.image, imageAlt: project.imageAlt }}
          aspect="16/10"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-fg group-hover:text-accent transition-colors relative z-10">
        {project.title}
      </h3>
      <p className="text-muted mb-5 leading-relaxed relative z-10">{project.oneLiner}</p>
      <div className="relative z-10 mb-5">
        <ImpactDisplay project={project} compact />
      </div>
      <p className="text-xs text-muted mb-4 relative z-10">
        <span className="uppercase tracking-widest">Role. </span>
        {project.role}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 relative z-10">
        {project.techStack.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <span className="mt-4 text-xs text-blue-700 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
        Read case study →
      </span>
    </Link>
  );
}

function ImpactDisplay({ project, compact = false }: { project: Project; compact?: boolean }) {
  const headline = project.impactHeadline;
  const context = project.impactContext ?? project.impact;

  if (!headline) {
    return <p className="text-sm text-fg leading-relaxed">{context}</p>;
  }

  return (
    <div>
      <p
        className={cn(
          'font-semibold tracking-tight text-fg',
          compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl',
        )}
      >
        {headline}
      </p>
      <p className="mt-1.5 text-sm text-muted leading-relaxed">{context}</p>
    </div>
  );
}
