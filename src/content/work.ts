export type WorkKind = 'internship' | 'client';

export type WorkEntry = {
  slug: string;
  employer: string;
  employerShort: string;
  role: string;
  dateRange: string;
  dateISO: string;
  location: string;
  kind: WorkKind;
  oneLiner: string;
  bullets: string[];
  impactHeadline: string;
  impactContext: string;
  techStack: string[];
  /** Optional logo under /logos — shown instead of the monogram tile. */
  employerLogo?: string;
  image?: string;
  imageAlt?: string;
};

export const WORK: WorkEntry[] = [
  {
    slug: 'rhb-industrial',
    employer: 'RHB Bank, Group Digital',
    employerShort: 'RHB',
    employerLogo: '/logos/rhb.png',
    role: 'Software Engineering Intern (Industrial Training)',
    dateRange: 'March to August 2026',
    dateISO: '2026-03',
    location: 'Kuala Lumpur, Malaysia',
    kind: 'internship',
    oneLiner: 'Worked on the MyDID and Mobile Banking App integration proof of concept.',
    bullets: [
      'Designed and documented OAS 3.0 REST specs for the mBK integration, improving handoff efficiency for the engineering team.',
      'Built the e-verification feature UI and API polling for the MyDID SSO proof of concept.',
      'Ran Agile sprints with cross-functional teams to deliver secure digital identity solutions.',
    ],
    impactHeadline: 'MyDID SSO',
    impactContext: 'Shipped API specs and e-verification UI for RHB’s Mobile Banking App integration.',
    techStack: ['OAS 3.0', 'REST', 'Agile'],
  },
  {
    slug: 'kiz-mobile',
    employer: 'UKM Kolej Ibu Zain',
    employerShort: 'KIZ',
    employerLogo: '/logos/kiz.png',
    role: 'Mobile Developer',
    dateRange: 'June 2026 to now',
    dateISO: '2026-06-11',
    location: 'Bangi, Malaysia',
    kind: 'client',
    oneLiner: 'KIZ Super App: resident ops for Kolej Ibu Zain, with AR campus navigation and registration.',
    bullets: [
      'Shipped the resident stack: auth, Kad Maya, bookings, helpdesk, parcels, lost and found, announcements, and more.',
      'Built AR Directory (camera + compass + OSRM walking paths) and the matric-based registration / intake unlock flow.',
      'Added QR counter check-in with digital signatures so the office can drop the paper sign-in book.',
    ],
    impactHeadline: 'Live at KIZ',
    impactContext: 'Onboarding and daily ops tool used by Kolej Ibu Zain students and staff.',
    techStack: ['Next.js', 'Prisma', 'AR', 'Auth.js'],
  },
  {
    slug: 'fst-ipad-loan',
    employer: 'UKM Faculty of Science and Technology',
    employerShort: 'UKM',
    role: 'Web Developer',
    dateRange: 'June 2026 to now',
    dateISO: '2026-06-10',
    location: 'Bangi, Malaysia',
    kind: 'client',
    oneLiner: 'iPad and shared learning room booking system for the Dean’s Office.',
    bullets: [
      'Shipped a Supabase and PostgreSQL backend with magic-link auth and row-level security.',
      'Prevented double-bookings at the database level using a PostgreSQL exclusion constraint.',
      'Delivered a working MVP and demoed it to faculty stakeholders.',
    ],
    impactHeadline: 'Zero double-bookings',
    impactContext: 'A PostgreSQL exclusion constraint guarantees it at the database level.',
    techStack: ['Supabase', 'PostgreSQL', 'Magic-link auth'],
  },
  {
    slug: 'rhb-summer-2025',
    employer: 'RHB Bank',
    employerShort: 'RHB',
    employerLogo: '/logos/rhb.png',
    role: 'Software Engineering Intern (Summer Program)',
    dateRange: 'June to August 2025',
    dateISO: '2025-06',
    location: 'Kuala Lumpur, Malaysia',
    kind: 'internship',
    oneLiner: 'Built internal tooling to speed up documentation and reporting.',
    bullets: [
      'Built an AI documentation assistant with FastAPI and LLM integration that turns raw developer input into structured summaries.',
      'Created three Superset dashboards visualising developer productivity and SonarQube quality scores, enabling weekly management reports.',
    ],
    impactHeadline: '40% less doc time',
    impactContext: 'AI assistant that turned raw developer notes into structured summaries.',
    techStack: ['FastAPI', 'Python', 'LLM', 'Superset', 'SonarQube'],
  },
];
