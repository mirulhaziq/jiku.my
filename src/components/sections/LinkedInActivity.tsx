import { PROFILE } from '@/content/profile';
import { Reveal } from '../Reveal';

export function LinkedInActivity() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">LinkedIn Activity</h2>
        <p className="text-muted">
          Recent posts sync coming soon.{' '}
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Follow on LinkedIn →
          </a>
        </p>
      </Reveal>
    </section>
  );
}
