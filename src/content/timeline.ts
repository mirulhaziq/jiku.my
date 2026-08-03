export type TimelineEntry = {
  date: string;
  dateISO: string;
  title: string;
  org: string;
  kind: 'edu' | 'work' | 'award' | 'project';
};

export const TIMELINE: TimelineEntry[] = [
  { date: 'Oct 2022 – Present', dateISO: '2022-10', title: 'Bachelor of Software Engineering (Information Systems)', org: 'UKM FTSM', kind: 'edu' },
  { date: 'Jun – Aug 2025', dateISO: '2025-06', title: 'Software Engineering Intern (Summer Program)', org: 'RHB Bank', kind: 'work' },
  { date: 'Sept 2025', dateISO: '2025-09', title: 'Apple App Development with Swift Associate', org: 'Apple', kind: 'award' },
  { date: 'Mar 2026 – Present', dateISO: '2026-03', title: 'Software Engineering Intern (Industrial Training) — MyDID / mBK POC', org: 'RHB Bank, Group Digital', kind: 'work' },
  { date: 'Apr – May 2026', dateISO: '2026-04', title: 'seKODlah TecHive Bootcamp (CIMB-funded) + C.A.R.I. hackathon build', org: 'CIMB / TecHive', kind: 'project' },
  { date: 'Jun 2026 – Present', dateISO: '2026-06', title: 'Web Developer — iPad loan system', org: 'UKM FST', kind: 'work' },
  { date: 'Jun 2026 – Present', dateISO: '2026-06', title: 'Mobile Developer — student registration app', org: 'UKM Kolej Ibu Zain', kind: 'work' },
  { date: '22 Jun 2026', dateISO: '2026-06-22', title: '2nd place, RHB MySiswa Brand Challenge — RHB GO', org: 'RHB', kind: 'award' },
  { date: '7 Jul 2026', dateISO: '2026-07-07', title: '2nd place, Agents@RHB Hackathon — BAC', org: 'RHB', kind: 'award' },
];
