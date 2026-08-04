import { Section } from '../Section';

export function Journal() {
  return (
    <Section
      kicker="Journal"
      title="Notes from the build"
      intro="A place where I plan to write about what I am learning and where I want to go next. Coming soon."
    >
      <div className="rounded-card border border-dashed border-border bg-card/50 p-8 text-center">
        <p className="text-muted text-sm">The first posts will land here.</p>
      </div>
    </Section>
  );
}
