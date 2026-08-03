import { PROFILE } from '@/content/profile';
import { Section } from '../Section';

export function Contact() {
  return (
    <Section
      id="contact"
      bordered
      kicker="Contact"
      title="Get in touch"
      intro="Looking for a Software Engineer role focused on AI applications, graduating September 2026. Reach out — I read everything."
    >
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${PROFILE.email}`}
          className="rounded-full bg-fg text-bg px-6 py-3 text-sm font-medium transition hover:opacity-90"
        >
          {PROFILE.email}
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
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          GitHub
        </a>
        <a
          href={PROFILE.resumeHref}
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          Resume PDF
        </a>
      </div>
      <p className="text-xs text-muted mt-16">
        © {new Date().getFullYear()} Amirul Haziq. Built with Next.js, deployed on Vercel.
      </p>
    </Section>
  );
}
