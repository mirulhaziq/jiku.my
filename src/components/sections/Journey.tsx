import { TIMELINE } from '@/content/timeline';
import { Section } from '../Section';

export function Journey() {
  return (
    <Section
      id="journey"
      kicker="Journey"
      title="What I have been up to"
      intro="I am a final-year software engineering student at UKM. I am on my industrial training at RHB Bank Group Digital and I am working toward the AWS Solutions Architect Associate certification."
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
