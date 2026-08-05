import Link from 'next/link';
import type { WorkEntry, WorkKind } from '@/content/work';
import { Badge } from './Badge';
import { cn } from '@/lib/cn';

const KIND_META: Record<WorkKind, {
  label: string;
  tileBg: string;
  tileText: string;
}> = {
  internship: {
    label: 'Internship',
    tileBg: 'bg-blue-500',
    tileText: 'text-white',
  },
  client: {
    label: 'Client work',
    tileBg: 'bg-emerald-500',
    tileText: 'text-white',
  },
};

export function WorkCard({ entry }: { entry: WorkEntry }) {
  const meta = KIND_META[entry.kind];

  return (
    <Link
      href={`/work/${entry.slug}`}
      className="group block rounded-card border border-border bg-card p-5 md:p-6 transition-colors hover:border-fg/20"
    >
      <div className="flex items-start gap-4 md:gap-6">
        {/* Left: monogram tile — plain solid color, no shadow, no ring */}
        <div
          className={cn(
            'w-14 h-14 md:w-16 md:h-16 rounded-2xl grid place-items-center shrink-0',
            meta.tileBg,
            meta.tileText,
          )}
          aria-hidden="true"
        >
          <span className="text-sm md:text-base font-bold tracking-wider">
            {entry.employerShort}
          </span>
        </div>

        {/* Middle: role, employer, date, one-liner, bullets, tech */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-muted">{meta.label}</span>
            <span className="text-xs uppercase tracking-widest text-muted">·</span>
            <span className="text-xs uppercase tracking-widest text-muted">{entry.dateRange}</span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-fg group-hover:text-accent transition-colors leading-snug">
            {entry.role}
          </h3>
          <p className="text-sm text-muted mt-0.5">{entry.employer}</p>

          <p className="mt-4 text-fg leading-relaxed">{entry.oneLiner}</p>

          <ul className="mt-3 space-y-1.5">
            {entry.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-muted leading-relaxed">
                <span className="text-fg/50 shrink-0" aria-hidden="true">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <span className="mt-4 inline-block text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Read case study →
          </span>
        </div>

        {/* Right: impact display (only on md+, stacks below on mobile) */}
        <div className="hidden md:block w-44 shrink-0 pl-4">
          <p className="text-2xl lg:text-3xl font-semibold tracking-tight text-fg leading-tight">
            {entry.impactHeadline}
          </p>
          <p className="mt-2 text-xs text-muted leading-relaxed">{entry.impactContext}</p>
        </div>
      </div>

      {/* Mobile impact: below everything since no room on the right */}
      <div className="md:hidden mt-4 pt-4 border-t border-border">
        <p className="text-2xl font-semibold tracking-tight text-fg leading-tight">
          {entry.impactHeadline}
        </p>
        <p className="mt-1.5 text-xs text-muted leading-relaxed">{entry.impactContext}</p>
      </div>
    </Link>
  );
}
