import { PROFILE } from '@/content/profile';
import { Reveal } from '../Reveal';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 md:py-32 border-t border-border">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Get in touch</h2>
        <p className="text-muted max-w-2xl mb-8">
          Looking for a Software Engineer role with a focus on AI applications, graduating September 2026.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${PROFILE.email}`} className="rounded-full bg-fg text-bg px-5 py-2.5 text-sm font-medium transition hover:opacity-90">
            Email
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
            LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
            GitHub
          </a>
          <a href={PROFILE.resumeHref} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
            Resume PDF
          </a>
        </div>
        <p className="text-xs text-muted mt-12">© {new Date().getFullYear()} Amirul Haziq. Built with Next.js, deployed on Vercel.</p>
      </Reveal>
    </section>
  );
}
