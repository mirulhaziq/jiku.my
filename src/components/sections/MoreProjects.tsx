import { MORE_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Reveal } from '../Reveal';

export function MoreProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">More Projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5">
        {MORE_PROJECTS.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} variant="more" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
