import { TECH_STACK } from '@/content/techstack';
import { AWARDS } from '@/content/awards';
import { Badge } from '../Badge';
import { Section } from '../Section';

const GROUPS: Array<[string, readonly string[]]> = [
  ['Languages', TECH_STACK.languages],
  ['Frameworks', TECH_STACK.frameworks],
  ['Tools and platforms', TECH_STACK.tools],
  ['Soft Skills', TECH_STACK.soft],
];

export function TechStack() {
  return (
    <Section
      kicker="Stack and recognition"
      title="What I build with"
    >
      <div className="space-y-8">
        {GROUPS.map(([label, items]) => (
          <div key={label}>
            <p className="text-xs uppercase tracking-widest text-muted mb-3">{label}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted mb-3">Awards</p>
          <div className="flex flex-wrap gap-2">
            {AWARDS.map((a) => (
              <Badge key={a.title} tone="accent">
                {a.year}. {a.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
