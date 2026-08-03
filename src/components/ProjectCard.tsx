import Link from 'next/link';
import type { Project } from '@/content/projects';
import { DeviceMockup } from './DeviceMockup';
import { Badge } from './Badge';

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
        className="group block rounded-card border border-border bg-card p-6 md:p-8 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <div className="mb-6">
          <DeviceMockup variant={project.mockup} />
        </div>
        <div className="pt-6">
          <h3 className="text-2xl font-semibold tracking-tight mb-2">{project.title}</h3>
          <p className="text-muted mb-3">{project.oneLiner}</p>
          <p className="text-sm mb-4"><span className="text-accent font-medium">Impact:</span> {project.impact}</p>
          <p className="text-xs text-muted mb-4"><span className="uppercase tracking-wider">Role · </span>{project.role}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-card border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <h4 className="text-lg font-semibold mb-1">{project.title}</h4>
      <p className="text-sm text-muted mb-3">{project.oneLiner}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </Link>
  );
}
