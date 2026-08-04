import { MORE_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Section } from '../Section';

export function MoreProjects() {
  return (
    <Section
      kicker="More projects"
      title="Smaller builds and side experiments"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {MORE_PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} variant="more" />
        ))}
      </div>
    </Section>
  );
}
