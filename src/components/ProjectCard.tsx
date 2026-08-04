import Link from 'next/link';
import type { Project } from '@/content/projects';
import { Badge } from './Badge';
import { ProjectImage } from './ProjectImage';

export function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: 'flagship' | 'more';
}) {
  if (variant === 'flagship') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col rounded-card border border-border bg-card p-5 md:p-6 transition hover:-translate-y-0.5 hover:shadow-xl h-full"
      >
        <ProjectImage project={project} aspect="16/10" className="mb-5" />
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-fg group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted mb-4 leading-relaxed">{project.oneLiner}</p>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 mb-4">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-1">Impact</p>
          <p className="text-sm text-fg leading-relaxed">{project.impact}</p>
        </div>
        <p className="text-xs text-muted mb-5">
          <span className="uppercase tracking-widest">Role. </span>
          {project.role}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <span className="mt-4 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          Read case study →
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-card border border-border bg-card p-4 md:p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <ProjectImage project={project} aspect="16/9" className="mb-4" />
      <h3 className="text-lg font-semibold mb-1 text-fg group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-muted mb-3 leading-relaxed">{project.oneLiner}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </Link>
  );
}
