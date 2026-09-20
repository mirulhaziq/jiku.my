import { PROFILE } from '@/content/profile';
import { Section } from '../Section';

export function Contact() {
  return (
    <Section
      id="contact"
      bordered
      kicker="Contact"
      title="Get in touch"
      intro={`${PROFILE.location}. Open to full-time software engineering roles focused on AI applications from September 2026. Email is the fastest way to reach me.`}
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
          download="Amirul-Haziq-Resume.pdf"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card"
        >
          Resume PDF
        </a>
      </div>
      <p className="text-xs text-muted mt-16 pb-24 md:pb-0">
        © {new Date().getFullYear()} Amirul Haziq. Built with Next.js and deployed on Vercel.
      </p>
    </Section>
  );
}
