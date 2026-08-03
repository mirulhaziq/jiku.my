import { FLAGSHIP_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Section } from '../Section';

export function FlagshipProjects() {
  return (
    <Section
      id="projects"
      kicker="Flagship Projects"
      title="Real client work, hackathon wins, and ongoing builds"
      intro="Every project below has real users, a real deadline, or both. Click any card for the case study."
    >
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {FLAGSHIP_PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} variant="flagship" />
        ))}
      </div>
    </Section>
  );
}
