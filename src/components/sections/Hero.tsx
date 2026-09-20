import { PROFILE } from '@/content/profile';
import { Badge } from '../Badge';
import TiltedCard from '../TiltedCard';

export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="grid gap-12 md:grid-cols-[1fr_300px] md:gap-16 items-center">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">{PROFILE.statusBadge}</Badge>
            {PROFILE.availabilityActive && (
              <span
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                aria-live="polite"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {PROFILE.availabilityBadge}
              </span>
            )}
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            {PROFILE.name}
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-muted max-w-2xl leading-relaxed">
            {PROFILE.tagline}
          </p>
          <p className="mt-3 text-base md:text-lg text-fg/80 max-w-2xl leading-relaxed">
            Actively looking for a full-time software engineering role focused on AI
            applications, starting September 2026.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.resumeHref}
              download="Amirul-Haziq-Resume.pdf"
              className="rounded-full bg-fg text-bg px-6 py-3 text-sm font-medium transition hover:opacity-90"
            >
              View resume
            </a>
            <a
              href="#projects"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
            >
              Selected work
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg transition"
            >
              GitHub
            </a>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg transition"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-fg transition">
              Email
            </a>
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <TiltedCard
            imageSrc="/face.webp"
            altText="Amirul Haziq"
            captionText="That's me."
            containerHeight="375px"
            containerWidth="300px"
            imageHeight="375px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
          />
        </div>
      </div>
    </section>
  );
}
