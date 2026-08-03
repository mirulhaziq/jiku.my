import { ROADMAP } from '@/content/roadmap';
import { Badge } from '../Badge';
import { Reveal } from '../Reveal';

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">Roadmap</h2>
      </Reveal>
      <ul className="space-y-4">
        {ROADMAP.map((item) => (
          <Reveal key={item.title}>
            <li className="flex items-start justify-between gap-4 rounded-card border border-border bg-card p-5">
              <div>
                <p className="font-medium">{item.title}</p>
                {item.note && <p className="text-sm text-muted mt-1">{item.note}</p>}
              </div>
              <Badge tone={item.status}>{item.status.replace('_', ' ')}</Badge>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
