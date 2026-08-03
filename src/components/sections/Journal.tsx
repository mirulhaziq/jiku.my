import { Section } from '../Section';

export function Journal() {
  return (
    <Section
      kicker="Journal"
      title="Notes from the build"
      intro="Coming soon — personal writing on what I'm learning, shipping, and reconsidering."
    >
      <div className="rounded-card border border-dashed border-border bg-card/50 p-8 text-center">
        <p className="text-muted text-sm">First posts will land here.</p>
      </div>
    </Section>
  );
}
