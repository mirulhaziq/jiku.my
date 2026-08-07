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
    tileBg: 'bg-blue-700',
    tileText: 'text-white',
  },
  client: {
    label: 'Client work',
    tileBg: 'bg-emerald-700',
    tileText: 'text-white',
  },
};

export function WorkCard({ entry }: { entry: WorkEntry }) {
  const meta = KIND_META[entry.kind];
  const isOngoing = /to now/i.test(entry.dateRange);

  return (
    <Link
      href={`/work/${entry.slug}`}
      className={cn(
        'group block rounded-card border border-border bg-card p-5 md:p-6',
        'transition-[transform,box-shadow,border-color] duration-200 ease-out',
        'hover:border-fg/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        'active:scale-[0.995]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
      )}
    >
      <div className="flex items-start gap-4 md:gap-6">
        {/* Left: monogram tile — solid color with iOS glass highlight */}
        <div
          className={cn(
            'relative w-14 h-14 md:w-16 md:h-16 rounded-2xl grid place-items-center shrink-0 overflow-hidden',
            meta.tileBg,
            meta.tileText,
          )}
          aria-hidden="true"
        >
          {/* Top-to-transparent light highlight for glass depth */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"
            aria-hidden="true"
          />
          <span className="relative text-sm md:text-base font-bold tracking-wider">
            {entry.employerShort}
          </span>
        </div>

        {/* Middle: role, employer, date row, one-liner, bullets, tech */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-muted">
              {meta.label}
            </span>
            <span className="text-[11px] text-muted">·</span>
            <span className="text-[11px] uppercase tracking-widest text-muted">
              {entry.dateRange}
            </span>
            {isOngoing && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Ongoing
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-fg group-hover:text-accent transition-colors leading-tight">
            {entry.role}
          </h3>
          <p className="text-sm text-muted mt-1">{entry.employer}</p>

          <p className="mt-4 text-fg leading-relaxed">{entry.oneLiner}</p>

          <ul className="mt-4 space-y-2">
            {entry.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-fg/40 shrink-0 mt-1.5 h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {entry.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-400 transition-transform group-hover:translate-x-0.5">
            Read case study
            <span aria-hidden="true">→</span>
          </span>
        </div>

        {/* Right: impact display (only on md+, stacks below on mobile) */}
        <div className="hidden md:block w-48 shrink-0 pl-4">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Impact
          </p>
          <p className="text-2xl lg:text-3xl font-semibold tracking-tight text-fg leading-tight">
            {entry.impactHeadline}
          </p>
          <p className="mt-2 text-xs text-muted leading-relaxed">{entry.impactContext}</p>
        </div>
      </div>

      {/* Mobile impact: below everything since no room on the right */}
      <div className="md:hidden mt-5 pt-5 border-t border-border">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-700 dark:text-blue-400 mb-2">
          Impact
        </p>
        <p className="text-2xl font-semibold tracking-tight text-fg leading-tight">
          {entry.impactHeadline}
        </p>
        <p className="mt-1.5 text-xs text-muted leading-relaxed">{entry.impactContext}</p>
      </div>
    </Link>
  );
}
