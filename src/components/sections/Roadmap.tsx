import { ROADMAP } from '@/content/roadmap';
import { Badge } from '../Badge';
import { Section } from '../Section';

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      kicker="Roadmap"
      title="What is next for me"
      intro="Where I want to grow after graduation and the certifications I am walking through to get there."
    >
      <ul className="space-y-3">
        {ROADMAP.map((item) => (
          <li
            key={item.title}
            className="flex items-start justify-between gap-4 rounded-card border border-border bg-card p-5"
          >
            <div>
              <p className="font-medium text-fg">{item.title}</p>
              {item.note && <p className="text-sm text-muted mt-1">{item.note}</p>}
            </div>
            <Badge tone={item.status}>{item.status.replace('_', ' ')}</Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}
