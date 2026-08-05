import { TIMELINE, type TimelineEntry } from '@/content/timeline';
import { Section } from '../Section';
import { cn } from '@/lib/cn';

// Kind → colored icon tile + label
const KIND_META: Record<TimelineEntry['kind'], { label: string; tint: string; icon: React.ReactNode }> = {
  award:   { label: 'Award',        tint: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',    icon: <TrophyIcon /> },
  work:    { label: 'Work',         tint: 'bg-accent/10 text-accent',                              icon: <BriefcaseIcon /> },
  edu:     { label: 'Education',    tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', icon: <CapIcon /> },
  project: { label: 'Programme',    tint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', icon: <CodeIcon /> },
};

// Extract the org's first meaningful letter for the monogram tile
function monogram(org: string): string {
  // "UKM FTSM" → "U", "RHB Bank, Group Digital" → "R", "Apple" → "A"
  const cleaned = org.replace(/[,.]/g, '').trim();
  return cleaned.charAt(0).toUpperCase();
}

// Group entries by year (from dateISO YYYY-MM-DD prefix)
function groupByYear(entries: TimelineEntry[]): { year: string; entries: TimelineEntry[] }[] {
  // Sort newest first
  const sorted = entries.slice().sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  const groups = new Map<string, TimelineEntry[]>();
  for (const entry of sorted) {
    const year = entry.dateISO.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(entry);
  }
  return Array.from(groups.entries()).map(([year, entries]) => ({ year, entries }));
}

export function Journey() {
  const groups = groupByYear(TIMELINE);

  return (
    <Section
      id="journey"
      kicker="Journey"
      title="What I have been up to"
      intro="I am a final-year software engineering student at UKM. I am on my industrial training at RHB Bank Group Digital and I am working toward the AWS Solutions Architect Associate certification."
    >
      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.year}>
            <div className="flex items-baseline gap-4 mb-6">
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-fg">{group.year}</h3>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs uppercase tracking-widest text-muted">
                {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>

            <ul className="space-y-3">
              {group.entries.map((entry) => (
                <li
                  key={`${entry.dateISO}-${entry.title}`}
                  className="flex items-start gap-4 rounded-card border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className={cn('w-11 h-11 rounded-lg grid place-items-center shrink-0', KIND_META[entry.kind].tint)}>
                    {KIND_META[entry.kind].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase tracking-widest text-muted">{entry.date}</span>
                      <span className="text-xs uppercase tracking-widest text-muted">·</span>
                      <span className="text-xs uppercase tracking-widest text-muted">{KIND_META[entry.kind].label}</span>
                    </div>
                    <p className="font-medium text-fg leading-snug">{entry.title}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-semibold text-fg">
                        {monogram(entry.org)}
                      </span>
                      <span className="text-sm text-muted">{entry.org}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- icons ---

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
