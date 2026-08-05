import { FLAGSHIP_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Section } from '../Section';

export function FlagshipProjects() {
  const [hero, ...rest] = FLAGSHIP_PROJECTS;
  return (
    <Section
      id="projects"
      kicker="Flagship projects"
      title="The work I am proudest of"
      intro="Everything below either shipped to real users or won a hackathon. Tap a card for the full case study."
    >
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {hero && <ProjectCard key={hero.slug} project={hero} variant="flagship-hero" />}
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} variant="flagship" />
        ))}
      </div>
    </Section>
  );
}
