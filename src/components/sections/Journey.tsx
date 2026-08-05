import { TIMELINE, type TimelineEntry, type TimelineKind } from '@/content/timeline';
import { Section } from '../Section';
import { cn } from '@/lib/cn';

const KIND_META: Record<TimelineKind, { label: string; tint: string; icon: React.ReactNode }> = {
  edu:        { label: 'Education',   tint: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',   icon: <CapIcon /> },
  award:      { label: 'Award',       tint: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',      icon: <TrophyIcon /> },
  internship: { label: 'Internship',  tint: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',         icon: <BriefcaseIcon /> },
  client:     { label: 'Client work', tint: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', icon: <HandshakeIcon /> },
  venture:    { label: 'Venture',     tint: 'bg-pink-500/15 text-pink-600 dark:text-pink-400',         icon: <RocketIcon /> },
  programme:  { label: 'Programme',   tint: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',         icon: <BookIcon /> },
};

function groupByYear(entries: TimelineEntry[]): { year: string; entries: TimelineEntry[] }[] {
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
      intro="I am a final-year software engineering student at UKM. Currently on industrial training at RHB Bank Group Digital and building on the founding team at VERiQ. Working toward the AWS Solutions Architect Associate certification."
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
                    <p className="mt-1 text-sm text-muted">{entry.org}</p>
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

function CapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

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

function HandshakeIcon() {
  // Lucide "handshake" — actually reads as a handshake.
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
