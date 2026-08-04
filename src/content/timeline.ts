export type TimelineEntry = {
  date: string;
  dateISO: string;
  title: string;
  org: string;
  kind: 'edu' | 'work' | 'award' | 'project';
};

export const TIMELINE: TimelineEntry[] = [
  { date: 'Oct 2022 to now', dateISO: '2022-10', title: 'Bachelor of Software Engineering (Information Systems)', org: 'UKM FTSM', kind: 'edu' },
  { date: 'Jun to Aug 2025', dateISO: '2025-06', title: 'Software Engineering intern on the Summer Program', org: 'RHB Bank', kind: 'work' },
  { date: 'Sept 2025', dateISO: '2025-09', title: 'Apple App Development with Swift Associate', org: 'Apple', kind: 'award' },
  { date: 'Mar 2026 to now', dateISO: '2026-03', title: 'Industrial training on the MyDID and mBK integration POC', org: 'RHB Bank, Group Digital', kind: 'work' },
  { date: 'Apr to May 2026', dateISO: '2026-04', title: 'seKODlah TecHive Bootcamp and the C.A.R.I. hackathon build', org: 'CIMB and TecHive', kind: 'project' },
  { date: 'Jun 2026 to now', dateISO: '2026-06', title: 'Web Developer on the iPad loan system', org: 'UKM FST', kind: 'work' },
  { date: 'Jun 2026 to now', dateISO: '2026-06', title: 'Mobile Developer on the student registration app', org: 'UKM Kolej Ibu Zain', kind: 'work' },
  { date: '22 Jun 2026', dateISO: '2026-06-22', title: 'Second place at RHB MySiswa Brand Challenge for RHB GO', org: 'RHB', kind: 'award' },
  { date: '7 Jul 2026', dateISO: '2026-07-07', title: 'Second place at Agents@RHB Hackathon for BAC', org: 'RHB', kind: 'award' },
];
