import { TECH_STACK } from '@/content/techstack';
import { AWARDS } from '@/content/awards';
import { Badge } from '../Badge';
import { Reveal } from '../Reveal';

const GROUPS: Array<[string, readonly string[]]> = [
  ['Languages', TECH_STACK.languages],
  ['Frameworks', TECH_STACK.frameworks],
  ['Tools & Platforms', TECH_STACK.tools],
  ['Soft Skills', TECH_STACK.soft],
];

export function TechStack() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">Stack, Certifications & Awards</h2>
      </Reveal>
      <div className="space-y-6 mb-12">
        {GROUPS.map(([label, items]) => (
          <Reveal key={label}>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-3">{label}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted mb-3">Awards</p>
          <div className="flex flex-wrap gap-2">
            {AWARDS.map((a) => (
              <Badge key={a.title} tone="accent">{a.year} — {a.title}</Badge>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
