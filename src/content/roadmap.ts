export type RoadmapItem = {
  title: string;
  category: 'cert' | 'career' | 'skill';
  status: 'done' | 'in_progress' | 'planned';
  note?: string;
};

export const ROADMAP: RoadmapItem[] = [
  { title: 'Apple App Development with Swift Associate', category: 'cert', status: 'done', note: 'Earned in September 2025.' },
  { title: 'AWS Solutions Architect Associate (SAA-C03)', category: 'cert', status: 'in_progress', note: 'Studying for it now.' },
  { title: 'Solution Architect track', category: 'career', status: 'in_progress', note: 'The long arc I plan to walk after graduation in September 2026.' },
  { title: 'Fintech and AI for Southeast Asia', category: 'career', status: 'in_progress', note: 'The kind of problem I want to keep working on.' },
];
