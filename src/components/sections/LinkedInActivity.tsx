import { PROFILE } from '@/content/profile';
import { Section } from '../Section';

export function LinkedInActivity() {
  return (
    <Section
      kicker="LinkedIn"
      title="Recent posts"
      intro="I will wire up post sync in a later iteration. For now you can follow along here."
    >
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-card transition"
      >
        Follow on LinkedIn <span aria-hidden="true">→</span>
      </a>
    </Section>
  );
}
