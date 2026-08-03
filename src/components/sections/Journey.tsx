import { TIMELINE } from '@/content/timeline';
import { Section } from '../Section';

export function Journey() {
  return (
    <Section
      id="journey"
      kicker="Journey"
      title="Where I've been building"
      intro="AI and fintech tools for underserved Southeast Asian communities. Currently on Industrial Training at RHB Bank Group Digital, working toward the AWS Solutions Architect Associate certification and a longer-arc Solution Architect track."
    >
      <ol className="relative border-l border-border pl-6 md:pl-8 space-y-8">
        {TIMELINE.slice().reverse().map((entry) => (
          <li key={`${entry.dateISO}-${entry.title}`} className="relative">
            <span className="absolute -left-[30px] md:-left-[38px] top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
            <p className="text-xs uppercase tracking-widest text-muted mb-1">{entry.date}</p>
            <p className="font-medium text-fg">{entry.title}</p>
            <p className="text-sm text-muted">{entry.org}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
