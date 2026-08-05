import { WORK } from '@/content/work';
import { Section } from '../Section';
import { WorkCard } from '../WorkCard';

export function Work() {
  return (
    <Section
      id="work"
      kicker="Work"
      title="Where I have shipped in the wild"
      intro="Two internships at RHB Bank and two client engagements at UKM. Real employers, real users, real deadlines."
    >
      <div className="space-y-4">
        {WORK.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Section>
  );
}
