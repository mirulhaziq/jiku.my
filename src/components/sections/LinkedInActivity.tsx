import { PROFILE } from '@/content/profile';
import { Section } from '../Section';

export function LinkedInActivity() {
  return (
    <Section
      kicker="LinkedIn"
      title="Where I write about the work"
    >
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-6 rounded-card border border-border bg-card p-6 md:p-8 hover:shadow-lg hover:-translate-y-0.5 transition"
      >
        <div>
          <p className="text-sm text-muted mb-1">linkedin.com/in/amirulhaziqshazlee</p>
          <p className="text-lg md:text-xl font-medium text-fg">
            Posts about what I am learning at RHB and from every hackathon I ship.
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 md:w-12 md:h-12 text-fg shrink-0"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </Section>
  );
}
