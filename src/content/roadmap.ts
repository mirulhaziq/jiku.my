export type RoadmapItem = {
  title: string;
  category: 'cert' | 'career' | 'skill';
  status: 'done' | 'in_progress' | 'planned';
  note?: string;
};

export const ROADMAP: RoadmapItem[] = [
  { title: 'Apple App Development with Swift Associate', category: 'cert', status: 'done', note: 'Sept 2025' },
  { title: 'AWS Solutions Architect Associate (SAA-C03)', category: 'cert', status: 'in_progress' },
  { title: 'Solution Architect track', category: 'career', status: 'in_progress', note: 'Long-arc goal after graduation (Sept 2026)' },
  { title: 'Fintech + AI for underserved Southeast Asian problems', category: 'career', status: 'in_progress', note: 'North star' },
];
