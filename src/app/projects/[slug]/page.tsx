import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FLAGSHIP_PROJECTS, MORE_PROJECTS } from '@/content/projects';

const ALL = [...FLAGSHIP_PROJECTS, ...MORE_PROJECTS];

export function generateStaticParams() {
  return ALL.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = ALL.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <Link href="/#projects" className="text-sm text-muted hover:text-fg transition">← Back</Link>
      <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-xl text-muted">{project.oneLiner}</p>
      <p className="mt-2 text-sm"><span className="text-accent font-medium">Impact:</span> {project.impact}</p>
      <p className="mt-2 text-sm text-muted"><span className="uppercase tracking-wider">Role · </span>{project.role}</p>

      <div className="mt-16 space-y-12">
        {['Problem', 'Architecture', 'Key Decisions & Trade-offs', 'Cost Optimization', 'Impact', 'Lessons Learned'].map((heading) => (
          <section key={heading}>
            <h2 className="text-xl font-semibold mb-3">{heading}</h2>
            <p className="text-muted italic">Write-up in progress.</p>
          </section>
        ))}
      </div>
    </main>
  );
}
