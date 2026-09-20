import Link from 'next/link';
import { FLAGSHIP_PROJECTS, MORE_PROJECTS } from '@/content/projects';
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

      {MORE_PROJECTS.length > 0 && (
        <div className="mt-12 pt-10 border-t border-border">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-1">
                More projects
              </p>
              <p className="text-sm text-muted">Smaller builds and side experiments.</p>
            </div>
          </div>
          <ul className="divide-y divide-border rounded-card border border-border bg-card overflow-hidden">
            {MORE_PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between px-5 py-4 transition hover:bg-fg/[0.03]"
                >
                  <span className="font-medium text-fg">{p.title}</span>
                  <span className="text-sm text-muted sm:text-right sm:max-w-md">
                    {p.oneLiner}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
