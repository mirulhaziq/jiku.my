import { TECH_STACK } from '@/content/techstack';
import { AWARDS } from '@/content/awards';
import { Section } from '../Section';
import { ToolboxCard, type ToolboxGroup } from '../ToolboxCard';

const GROUPS: ToolboxGroup[] = [
  {
    label: 'Languages',
    items: TECH_STACK.languages,
    icon: <BracesIcon />,
    tileTint: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    pillTint: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20',
    glowRgb: '139, 92, 246',
    featured: 'Python',
  },
  {
    label: 'Frameworks',
    items: TECH_STACK.frameworks,
    icon: <FrameworkIcon />,
    tileTint: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    pillTint: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    glowRgb: '59, 130, 246',
    featured: 'Next.js',
  },
  {
    label: 'Tools and platforms',
    items: TECH_STACK.tools,
    icon: <WrenchIcon />,
    tileTint: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    pillTint: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    glowRgb: '16, 185, 129',
    featured: 'Supabase',
  },
  {
    label: 'Soft skills',
    items: TECH_STACK.soft,
    icon: <HandshakeIcon />,
    tileTint: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    pillTint: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    glowRgb: '245, 158, 11',
    featured: 'Leadership',
  },
];

type Credential = {
  logo: React.ReactNode;
  brand: string;
  title: string;
  status: 'earned' | 'in_progress';
  meta: string;
};

const CREDENTIALS: Credential[] = [
  {
    logo: <AppleLogo />,
    brand: 'Apple',
    title: 'App Development with Swift Associate',
    status: 'earned',
    meta: 'Earned September 2025',
  },
  {
    logo: <AWSLogo />,
    brand: 'AWS',
    title: 'Solutions Architect Associate (SAA-C03)',
    status: 'in_progress',
    meta: 'In progress',
  },
];

export function TechStack() {
  return (
    <Section
      kicker="Stack and recognition"
      title="What I build with, what I have earned"
    >
      {/* Credentials */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-muted mb-4">Credentials</p>
        <div className="grid gap-4 md:grid-cols-2">
          {CREDENTIALS.map((c) => (
            <div
              key={c.title}
              className="flex items-start gap-4 rounded-card border border-border bg-card p-5 md:p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-fg shrink-0">
                {c.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted mb-1">{c.brand}</p>
                <p className="font-medium text-fg leading-snug">{c.title}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted">
                  {c.status === 'earned' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 font-medium">
                      <CheckIcon /> {c.meta}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 font-medium">
                      <SpinIcon /> {c.meta}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbox */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-muted mb-4">Toolbox</p>
        <div className="grid gap-4 md:grid-cols-2">
          {GROUPS.map((g) => (
            <ToolboxCard key={g.label} group={g} />
          ))}
        </div>
      </div>

      {/* Awards */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-4">Awards</p>
        <div className="grid gap-4 md:grid-cols-2">
          {AWARDS.map((a) => {
            const isRunnerUp = a.title.toLowerCase().includes('2nd place');
            const isTopTier = isRunnerUp;
            return (
              <div
                key={a.title}
                className={
                  isTopTier
                    ? 'rounded-card border border-accent/30 bg-accent/5 p-5 md:p-6'
                    : 'rounded-card border border-border bg-card p-5 md:p-6'
                }
              >
                <div className="flex items-start gap-4">
                  <div className={
                    isTopTier
                      ? 'w-10 h-10 rounded-full bg-accent/15 grid place-items-center text-accent shrink-0'
                      : 'w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-fg shrink-0'
                  }>
                    <TrophyIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted mb-1">{a.year}</p>
                    <p className="font-medium text-fg leading-snug">{a.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// --- icons ---

function BracesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M8 3H6a2 2 0 0 0-2 2v3.5a2 2 0 0 1-2 2 2 2 0 0 1 2 2V16a2 2 0 0 0 2 2h2" />
      <path d="M16 3h2a2 2 0 0 1 2 2v3.5a2 2 0 0 0 2 2 2 2 0 0 0-2 2V16a2 2 0 0 1-2 2h-2" />
    </svg>
  );
}

function FrameworkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-2.4z" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M11 17l2 2a1 1 0 1 0 1.5-1.5" />
      <path d="M13 15l2.5 2.5a1 1 0 1 0 1.5-1.5L14 13" />
      <path d="M16 10l2 2a1 1 0 1 0 1.5-1.5L15 6H12a5 5 0 0 0-3 1.5L6 10a1 1 0 0 0 1.5 1.5L10 9" />
      <path d="M18 14l-2-2M4 12l4-4" />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function AWSLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6.76 10.42c0 .3.03.55.09.73.07.18.15.38.27.6.04.06.06.13.06.19 0 .09-.05.17-.16.26l-.53.35c-.08.05-.16.08-.23.08-.09 0-.18-.04-.27-.13a2.8 2.8 0 0 1-.32-.42 6.86 6.86 0 0 1-.28-.53c-.66.78-1.49 1.17-2.49 1.17-.71 0-1.28-.2-1.7-.61-.42-.41-.63-.95-.63-1.63 0-.72.25-1.31.77-1.75.51-.44 1.19-.66 2.06-.66.29 0 .59.02.9.07.31.05.63.12.97.2v-.62c0-.64-.13-1.09-.4-1.35-.27-.26-.72-.39-1.37-.39-.29 0-.6.04-.91.11-.31.07-.62.16-.91.28-.13.05-.23.09-.29.1-.06.02-.11.03-.14.03-.13 0-.19-.09-.19-.28v-.44c0-.14.02-.25.07-.31.05-.06.13-.13.26-.2.29-.15.65-.28 1.06-.38.41-.11.86-.16 1.32-.16 1 0 1.74.23 2.21.68.47.45.7 1.14.7 2.06v2.71zm-3.44 1.29c.27 0 .55-.05.85-.15.3-.1.56-.28.79-.53.13-.16.23-.34.28-.54.05-.2.08-.44.08-.72v-.35c-.25-.06-.52-.11-.79-.15a6.66 6.66 0 0 0-.81-.05c-.58 0-1 .11-1.29.35-.29.24-.43.57-.43 1 0 .41.11.72.32.94.21.21.52.32.9.32zm6.81.92c-.16 0-.27-.03-.34-.09-.07-.06-.13-.19-.19-.36l-2.06-6.79c-.06-.19-.09-.31-.09-.38 0-.15.07-.23.22-.23h.83c.17 0 .29.03.35.09.07.06.13.19.19.36l1.47 5.81 1.37-5.81c.05-.19.11-.31.18-.36.07-.06.19-.09.36-.09h.68c.17 0 .29.03.36.09.07.06.14.19.18.36l1.39 5.88 1.52-5.88c.06-.19.13-.31.19-.36.07-.06.19-.09.36-.09h.79c.15 0 .23.08.23.23 0 .04-.01.09-.02.15a1.4 1.4 0 0 1-.07.23l-2.11 6.79c-.06.19-.13.32-.19.38a.556.556 0 0 1-.34.09h-.72c-.17 0-.29-.03-.36-.09-.07-.07-.14-.19-.18-.38l-1.36-5.68-1.35 5.67c-.05.19-.11.31-.18.38-.07.06-.19.09-.36.09h-.72zm10.92.24c-.44 0-.88-.05-1.3-.15-.42-.1-.75-.21-.97-.34-.14-.08-.23-.16-.27-.24a.6.6 0 0 1-.04-.22v-.46c0-.19.07-.28.21-.28.06 0 .11.01.16.03l.19.1c.29.12.6.22.94.28.34.06.68.1 1.02.1.54 0 .96-.09 1.25-.28.29-.19.44-.46.44-.81 0-.24-.08-.44-.23-.6-.15-.16-.44-.31-.86-.44l-1.24-.39c-.62-.2-1.09-.49-1.38-.87-.29-.38-.44-.8-.44-1.25 0-.36.08-.68.23-.96.15-.28.36-.52.62-.72.26-.2.56-.34.9-.44.34-.1.7-.14 1.08-.14.19 0 .39.01.58.04.2.03.38.06.56.1.17.04.33.09.48.14.15.05.27.11.35.16.11.06.19.13.24.2.05.07.07.16.07.28v.43c0 .19-.07.28-.21.28-.07 0-.19-.04-.34-.11-.5-.23-1.07-.34-1.7-.34-.49 0-.88.08-1.14.24-.26.16-.4.41-.4.75 0 .24.09.44.26.6.17.16.49.32.94.46l1.22.39c.61.2 1.06.47 1.32.82.26.35.39.75.39 1.19 0 .37-.08.7-.23 1-.15.29-.36.55-.62.75-.26.2-.58.36-.94.47-.37.11-.76.17-1.19.17z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
