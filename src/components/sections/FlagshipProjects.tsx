import { FLAGSHIP_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Reveal } from '../Reveal';

export function FlagshipProjects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Flagship Projects</h2>
        <p className="text-muted mb-12">Real client work, hackathon wins, and ongoing builds.</p>
      </Reveal>
      <div className="grid gap-8 md:gap-12">
        {FLAGSHIP_PROJECTS.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} variant="flagship" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
