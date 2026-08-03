import { TIMELINE } from '@/content/timeline';
import { Reveal } from '../Reveal';

export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Journey</h2>
        <p className="text-muted max-w-2xl mb-12">
          I build AI and fintech tools for underserved Southeast Asian communities. Currently on Industrial Training at RHB Bank Group Digital, working toward the AWS Solutions Architect Associate certification and a longer-arc Solution Architect track.
        </p>
      </Reveal>
      <ol className="relative border-l border-border pl-6 space-y-8">
        {TIMELINE.slice().reverse().map((entry) => (
          <Reveal key={`${entry.dateISO}-${entry.title}`}>
            <li>
              <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-accent" />
              <p className="text-xs uppercase tracking-wider text-muted">{entry.date}</p>
              <p className="mt-1 font-medium">{entry.title}</p>
              <p className="text-sm text-muted">{entry.org}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
