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
    glowRgb: '139, 92, 246',
  },
  {
    label: 'Frameworks',
    items: TECH_STACK.frameworks,
    icon: <FrameworkIcon />,
    tileTint: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    glowRgb: '59, 130, 246',
  },
  {
    label: 'Tools and platforms',
    items: TECH_STACK.tools,
    icon: <WrenchIcon />,
    tileTint: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    glowRgb: '16, 185, 129',
  },
  {
    label: 'Soft skills',
    items: TECH_STACK.soft,
    icon: <HandshakeIcon />,
    tileTint: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    glowRgb: '245, 158, 11',
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
  // Text wordmark + orange "smile" underline. Clean, readable, unmistakably AWS.
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="font-bold text-[0.95rem] tracking-tight text-fg">aws</span>
      <svg viewBox="0 0 24 6" className="w-6 h-1.5 mt-0.5" fill="none" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round">
        <path d="M2 2 Q12 6 22 2" />
      </svg>
    </div>
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
