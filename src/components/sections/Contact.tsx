import { PROFILE } from '@/content/profile';
import { Section } from '../Section';

export function Contact() {
  return (
    <Section
      id="contact"
      bordered
      kicker="Contact"
      title="Get in touch"
      intro="I graduate in September 2026 and I am looking for a software engineering role focused on AI applications. Reach out on any of these and I will read it."
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
