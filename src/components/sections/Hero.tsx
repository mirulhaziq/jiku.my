import { PROFILE } from '@/content/profile';
import { Badge } from '../Badge';

export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
      <Badge tone="accent">{PROFILE.statusBadge}</Badge>
      <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
        {PROFILE.name}
      </h1>
      <p className="mt-5 text-xl md:text-2xl text-muted max-w-2xl leading-relaxed">
        {PROFILE.tagline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={PROFILE.resumeHref}
          className="rounded-full bg-fg text-bg px-6 py-3 text-sm font-medium transition hover:opacity-90"
        >
          View resume
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          Email
        </a>
      </div>
    </section>
  );
}
