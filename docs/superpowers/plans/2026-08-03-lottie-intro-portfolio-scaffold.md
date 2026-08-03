# jiku.my Iteration 1 — Lottie Intro + Portfolio Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a live static portfolio at a Vercel URL with all 11 sections rendering hand-seeded CV content, a full-viewport Apple "Hello" Lottie intro that plays once per session and cross-fades into the site, and smooth section-reveal scrolling.

**Architecture:** Single Next.js 14 App Router project scaffolded manually in the existing folder (avoids `create-next-app` non-empty-dir refusal). Static content lives in `src/content/*.ts`. One client-side `<IntroAnimation>` component wraps the root layout, gated by `sessionStorage`. Reveal animations use IntersectionObserver + CSS transitions only.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3, `@lottiefiles/dotlottie-react`, deployed on Vercel.

## Global Constraints

- **Next.js:** 14.x App Router only. No Pages Router.
- **TypeScript:** strict mode on.
- **Tailwind:** 3.x. No custom fonts, no font-loading — system font stack only.
- **Animation libraries:** ONLY `@lottiefiles/dotlottie-react` for the intro. Everything else is CSS transitions + IntersectionObserver.
- **Theme:** light default, dark via `@media (prefers-color-scheme: dark)`. No toggle UI.
- **Accent color:** `#0071e3` (light), `#0a84ff` (dark). Used sparingly.
- **Fonts:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif`.
- **Radii:** cards 16px, hero surfaces 24px.
- **Content honesty:** no fabricated metrics. Every claim from the CV verbatim or from `portfolio-master-spec.md`. Unwritten case-study bodies render "Write-up in progress."
- **Responsive:** mobile-first. Must not overflow horizontally at 375px width.
- **Perf target:** Lighthouse mobile Performance ≥ 95.
- **No automated tests this iteration.** Verification is manual per the checklist in Task 6.
- **Session gate:** `sessionStorage.getItem('intro-played')` controls intro replay.
- **Intro fade:** 500ms ease-out, always black background regardless of user theme.
- **Reveal fade:** 600ms ease-out, `translateY(16px) → 0` + `opacity 0 → 1`, threshold 0.15, one-shot.
- **`prefers-reduced-motion: reduce`:** intro skipped entirely, reveals fire immediately without transition, `scroll-behavior: auto`.
- **Deploy target:** Vercel default `*.vercel.app` URL. No custom domain wiring this iteration.
- **Flagship projects (5):** OncoTrace, BAC, RHB GO, C.A.R.I., Guidr/VERiQ-my (per spec, user confirmed "keep both").

---

## File Structure

Layout locked in during planning:

```
package.json                    # Manual init (Task 1)
tsconfig.json                   # Strict TS (Task 1)
next.config.mjs                 # Minimal (Task 1)
next-env.d.ts                   # Auto-generated
postcss.config.mjs              # Tailwind + autoprefixer (Task 1)
tailwind.config.ts              # Content globs, dark: media strategy (Task 1)
.gitignore                      # Node/Next standard (Task 1)
.eslintrc.json                  # next/core-web-vitals preset (Task 1)
public/
  hello-apple.lottie            # Moved from repo root (Task 1)
  face.png                      # Moved from repo root (Task 1)
  resume.pdf                    # Copy of AMIRULHAZIQ_CV_updated.pdf (Task 1)
src/
  app/
    layout.tsx                  # RootLayout wraps <IntroAnimation> (Task 4)
    page.tsx                    # Homepage composing 11 sections (Task 5)
    globals.css                 # Reset, theme vars, scroll-behavior (Task 2)
    projects/[slug]/page.tsx    # Shell case-study page (Task 5)
  lib/
    cn.ts                       # Tailwind class merge helper (Task 2)
  content/
    projects.ts                 # 5 flagship + 5 more projects (Task 2)
    timeline.ts                 # Journey timeline entries (Task 2)
    roadmap.ts                  # Career/cert/skill items (Task 2)
    techstack.ts                # Language/framework/tool groups (Task 2)
    awards.ts                   # Awards + certs (Task 2)
    profile.ts                  # Name, role, contact, socials (Task 2)
  components/
    IntroAnimation.tsx          # Full-viewport Lottie overlay (Task 3)
    Reveal.tsx                  # IntersectionObserver wrapper (Task 3)
    DeviceMockup.tsx            # CSS/SVG laptop + phone (Task 3)
    Nav.tsx                     # Sticky nav with anchor links (Task 3)
    ProjectCard.tsx             # Flagship + More card variants (Task 3)
    Badge.tsx                   # Status pill (Task 3)
    sections/
      Hero.tsx                  # (Task 5)
      Journey.tsx               # (Task 5)
      FlagshipProjects.tsx      # (Task 5)
      MoreProjects.tsx          # (Task 5)
      Roadmap.tsx               # (Task 5)
      Journal.tsx               # (Task 5)
      LinkedInActivity.tsx      # (Task 5)
      GitHubActivity.tsx        # (Task 5)
      TechStack.tsx             # (Task 5)
      Contact.tsx               # (Task 5)
```

Existing files (`AMIRULHAZIQ_CV_updated.pdf`, `ai-context.md`, `portfolio-master-spec.md`, `portfolio-v2-sdlc-plan.md`, `face.png`, `hello-apple.lottie`, `docs/`) stay in place. The Lottie and PNG get copied into `public/` in Task 1; the originals remain at the repo root as source-of-truth artifacts.

---

## Task 1: Scaffold Next.js 14 project manually

**Rationale:** `create-next-app` refuses non-empty directories. Manual init is faster than moving spec files aside.

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.eslintrc.json`, `next-env.d.ts`
- Create: `public/hello-apple.lottie`, `public/face.png`, `public/resume.pdf`
- Create: `src/app/layout.tsx` (temporary placeholder), `src/app/page.tsx` (temporary placeholder), `src/app/globals.css` (empty)

**Interfaces:**
- Consumes: nothing
- Produces: working `npm run dev` on http://localhost:3000 showing a blank page. Later tasks assume Next 14 App Router + Tailwind + TS are ready.

- [ ] **Step 1: Initialize package.json**

Create `package.json`:
```json
{
  "name": "jiku-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- [ ] **Step 2: Install runtime dependencies**

Run in PowerShell:
```
npm install next@14 react@18 react-dom@18 @lottiefiles/dotlottie-react
```

- [ ] **Step 3: Install dev dependencies**

Run in PowerShell:
```
npm install -D typescript @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer eslint eslint-config-next
```

- [ ] **Step 4: Create tsconfig.json**

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create next.config.mjs**

Create `next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;
```

- [ ] **Step 6: Create tailwind.config.ts**

Create `tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        card: 'var(--card)',
        border: 'var(--border)',
      },
      borderRadius: {
        card: '16px',
        hero: '24px',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"Segoe UI"', 'Roboto', 'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 7: Create postcss.config.mjs**

Create `postcss.config.mjs`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 8: Create .eslintrc.json**

Create `.eslintrc.json`:
```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 9: Create .gitignore**

Create `.gitignore`:
```
node_modules/
.next/
out/
.env*.local
.vercel
next-env.d.ts
*.log
.DS_Store
Thumbs.db
```

- [ ] **Step 10: Create initial placeholder layout and page**

Create `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create `src/app/layout.tsx`:
```tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'jiku.my',
  description: 'Portfolio of Amirul Haziq (Jiku)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `src/app/page.tsx`:
```tsx
export default function Home() {
  return <main className="p-8">Scaffold works.</main>;
}
```

- [ ] **Step 11: Copy assets into public/**

Run in PowerShell:
```
New-Item -ItemType Directory -Force public
Copy-Item "hello-apple.lottie" "public/hello-apple.lottie"
Copy-Item "face.png" "public/face.png"
Copy-Item "AMIRULHAZIQ_CV_updated.pdf" "public/resume.pdf"
```

- [ ] **Step 12: Verify dev server runs**

Run: `npm run dev`
Expected: Compiles without error, `http://localhost:3000` shows "Scaffold works." Kill the dev server (Ctrl+C) after confirming.

- [ ] **Step 13: Initialize git and commit**

Run in PowerShell:
```
git init
git add .gitignore package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts .eslintrc.json src/ public/
git commit -m "chore: scaffold Next.js 14 + Tailwind + TS project"
```

---

## Task 2: Theme tokens, helper, and all content data

**Files:**
- Modify: `src/app/globals.css` (add CSS vars, reset, scroll-behavior)
- Create: `src/lib/cn.ts`
- Create: `src/content/profile.ts`, `src/content/timeline.ts`, `src/content/projects.ts`, `src/content/roadmap.ts`, `src/content/techstack.ts`, `src/content/awards.ts`

**Interfaces:**
- Consumes: Task 1 scaffold
- Produces:
  - `cn(...classes: (string | undefined | false)[]): string` — Tailwind class-name merger
  - Content exports typed and importable by section components in Task 5:
    - `PROFILE: { name, tagline, statusBadge, email, github, linkedin, resumeHref }`
    - `TIMELINE: Array<{ date, dateISO, title, org, kind: 'edu'|'work'|'award'|'project' }>`
    - `FLAGSHIP_PROJECTS: Array<{ slug, title, oneLiner, impact, techStack: string[], role, mockup: 'both'|'laptop'|'phone' }>`
    - `MORE_PROJECTS: Array<{ slug, title, oneLiner, techStack: string[] }>`
    - `ROADMAP: Array<{ title, category: 'cert'|'career'|'skill', status: 'done'|'in_progress'|'planned', note?: string }>`
    - `TECH_STACK: { languages: string[], frameworks: string[], tools: string[], soft: string[] }`
    - `AWARDS: Array<{ year, title }>`

- [ ] **Step 1: Fill in globals.css with theme + reset + scroll**

Overwrite `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #fafafa;
  --fg: #0a0a0a;
  --muted: #6b7280;
  --accent: #0071e3;
  --card: #ffffff;
  --border: rgba(10, 10, 10, 0.08);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a;
    --fg: #ededed;
    --muted: #9ca3af;
    --accent: #0a84ff;
    --card: #141414;
    --border: rgba(255, 255, 255, 0.08);
  }
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Create cn helper**

Create `src/lib/cn.ts`:
```ts
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

- [ ] **Step 3: Create profile.ts**

Create `src/content/profile.ts`:
```ts
export const PROFILE = {
  name: 'Amirul Haziq',
  tagline: 'Software Engineer — AI applications & fintech.',
  statusBadge: 'Interning at RHB · Group Digital',
  email: 'ahaziqshazlee@gmail.com',
  github: 'https://github.com/mirulhaziq',
  linkedin: 'https://www.linkedin.com/in/amirulhaziqshazlee',
  resumeHref: '/resume.pdf',
  location: 'Sentul, Kuala Lumpur',
} as const;
```

- [ ] **Step 4: Create timeline.ts**

Create `src/content/timeline.ts` — entries in chronological order per master spec §Journey. Content is verbatim from CV + master spec:
```ts
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
```

- [ ] **Step 5: Create projects.ts**

Create `src/content/projects.ts`. Impact strings pull from CV extracurricular + master spec §Flagship Projects. Copy applies `ai-context.md` honesty rules — no invented metrics beyond what's in those sources:
```ts
export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  impact: string;
  techStack: string[];
  role: string;
  mockup: 'both' | 'laptop' | 'phone';
};

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    slug: 'oncotrace',
    title: 'OncoTrace',
    oneLiner: 'AI pan-cancer early detection using ICP-MS biomarkers.',
    impact: '86.3% F1 · 238 patients · 2 patents filed',
    techStack: ['Python', 'ML', 'ICP-MS'],
    role: 'Co-founder / Commercialization Lead',
    mockup: 'laptop',
  },
  {
    slug: 'bac',
    title: 'BAC — Business Analyst Co-Pilot',
    oneLiner: 'Multi-agent compliance assistant on Microsoft Copilot Studio using Claude.',
    impact: '2nd place, Agents@RHB Hackathon 2026 · workflow cut ~53 → ~30 days on a moderate project',
    techStack: ['Copilot Studio', 'Claude', 'BNM regulations KB'],
    role: 'Co-built with Azim Rudy',
    mockup: 'laptop',
  },
  {
    slug: 'rhb-go',
    title: 'RHB GO',
    oneLiner: 'Student fintech web app — verified GPS merchant discovery, discount portal, AI chatbot.',
    impact: '2nd place, RHB MySiswa Brand Challenge 2026 · 160-student primary survey shaped features',
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'PostGIS', 'Mapbox GL JS', 'Claude API'],
    role: 'Team of 3 — owned all tech/dev; Azim owned RHB/merchant data, Qiqi owned marketing',
    mockup: 'both',
  },
  {
    slug: 'cari',
    title: 'C.A.R.I.',
    oneLiner: 'Agentic AI career co-pilot — diagnoses CVs against JDs, auto-tailors resumes with human approval gate.',
    impact: 'Built at seKODlah TecHive Hackathon 2026 (Team 3A+) — 40-hour build',
    techStack: ['Express.js', 'TypeScript', 'Supabase', 'Claude', 'OpenAI'],
    role: 'Backend — planning loop + tool-use with staged actions behind human approval',
    mockup: 'laptop',
  },
  {
    slug: 'guidr',
    title: 'Guidr / VERiQ-my',
    oneLiner: 'Scam-investigation PWA on the Databricks hackathon track.',
    impact: 'Hackathon build — Databricks track 2026',
    techStack: ['Next.js', 'Firebase', 'Vertex AI Gemini'],
    role: 'Team build',
    mockup: 'phone',
  },
];

export const MORE_PROJECTS: Project[] = [
  {
    slug: 'fst-ipad-loan',
    title: 'FST iPad Loan System',
    oneLiner: 'iPad + shared learning room booking with row-level security and DB exclusion constraint against double-booking.',
    impact: 'Delivered and demoed working MVP to faculty',
    techStack: ['Supabase', 'PostgreSQL', 'Magic-link auth'],
    role: 'Web Developer, UKM FST',
    mockup: 'laptop',
  },
  {
    slug: 'kiz-mobile',
    title: 'Kolej Ibu Zain Mobile App',
    oneLiner: 'Student college registration with AR map + Google Maps location.',
    impact: 'In use for KIZ college onboarding',
    techStack: ['Mobile', 'AR', 'Maps'],
    role: 'Mobile Developer, UKM KIZ',
    mockup: 'phone',
  },
  {
    slug: 'cakapnbayar',
    title: 'CAKAPnBAYAR',
    oneLiner: 'Voice ordering for F&B — Malay-English code-switching transcription with sub-3s validation latency.',
    impact: 'Built at Cursor × Anthropic Hackathon',
    techStack: ['Whisper ASR', 'Groq inference'],
    role: 'Hackathon build',
    mockup: 'phone',
  },
  {
    slug: 'fyp-b40-finance',
    title: 'Voice Finance App for B40 Entrepreneurs',
    oneLiner: 'FYP — voice-based sales tracker with LLM data extraction (>90% accuracy) targeting 100 users.',
    impact: 'Final-year project, Sep 2025 – Feb 2026',
    techStack: ['React', 'LLM', 'PostgreSQL'],
    role: 'Sole developer (FYP)',
    mockup: 'laptop',
  },
  {
    slug: 'deriv-trading-coach',
    title: 'Deriv AI Trading Coach',
    oneLiner: 'Chrome extension giving traders real-time LLM insights and coaching prompts.',
    impact: 'Top 50 of all submissions, Deriv AI Hackathon 2026',
    techStack: ['Chrome Extension', 'LLM'],
    role: 'Hackathon build',
    mockup: 'laptop',
  },
];
```

- [ ] **Step 6: Create roadmap.ts**

Create `src/content/roadmap.ts`:
```ts
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
```

- [ ] **Step 7: Create techstack.ts**

Create `src/content/techstack.ts` — verbatim from CV Technical Skills section:
```ts
export const TECH_STACK = {
  languages: ['Java', 'Python', 'Kotlin', 'Dart', 'Swift', 'PHP', 'HTML', 'CSS', 'SQL', 'Go'],
  frameworks: ['Jetpack Compose', 'Flutter', 'FastAPI', 'Next.js'],
  tools: ['Firebase', 'MySQL', 'Git', 'GitHub', 'PowerBI', 'Docker', 'PostgreSQL', 'Supabase', 'Postman', 'Bruno', 'AWS (EC2)'],
  soft: ['Leadership', 'Strategic Communication', 'Project Coordination', 'Agile Mindset'],
} as const;
```

- [ ] **Step 8: Create awards.ts**

Create `src/content/awards.ts` — verbatim from CV Awards & Honors:
```ts
export type Award = { year: string; title: string };

export const AWARDS: Award[] = [
  { year: '2026', title: '2nd place, Agents@RHB Hackathon 2026' },
  { year: '2026', title: '2nd place, RHB MySiswa Brand Challenge 2026' },
  { year: '2025', title: '2nd place, RHB Business Challenge 2025' },
  { year: '2025', title: 'Best Facilitator Choice Award, ASEAN Youth Volunteer Program 2025' },
];
```

- [ ] **Step 9: Verify TypeScript compiles**

Run: `npm run build`
Expected: builds successfully (may still show only placeholder page). If TS errors appear, fix them in the content files.

- [ ] **Step 10: Commit**

Run in PowerShell:
```
git add src/app/globals.css src/lib/ src/content/
git commit -m "feat: add theme tokens, cn helper, and hand-seeded CV content"
```

---

## Task 3: Shared components (Reveal, IntroAnimation, Nav, ProjectCard, Badge, DeviceMockup)

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/components/IntroAnimation.tsx`
- Create: `src/components/Nav.tsx`
- Create: `src/components/DeviceMockup.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/Badge.tsx`

**Interfaces:**
- Consumes:
  - `@lottiefiles/dotlottie-react` → `DotLottieReact` component with `onComplete` prop
  - `PROFILE` from `@/content/profile` (Nav uses it for nothing in this task; still stays independent)
  - `Project` type from `@/content/projects`
- Produces:
  - `<IntroAnimation>{children}</IntroAnimation>` — client wrapper; renders overlay + children with fade choreography; sessionStorage gate
  - `<Reveal delay?: number className?: string>{children}</Reveal>` — client wrapper; IntersectionObserver adds `data-visible="true"`; CSS transitions in `globals.css` addendum
  - `<Nav />` — server component; sticky top bar with anchor links to `#hero #journey #projects #roadmap #contact`
  - `<DeviceMockup variant: 'laptop'|'phone'|'both'>` — server component, pure JSX CSS/SVG frame
  - `<ProjectCard project: Project variant: 'flagship'|'more'>` — server component
  - `<Badge status: 'done'|'in_progress'|'planned' | string>` — server component, colored pill

- [ ] **Step 1: Add reveal transition rules to globals.css**

Append to `src/app/globals.css`:
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
  will-change: opacity, transform;
}
[data-reveal][data-visible="true"] {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Create Reveal.tsx**

Create `src/components/Reveal.tsx`:
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export function Reveal({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      data-visible={visible ? 'true' : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create IntroAnimation.tsx (core component)**

Create `src/components/IntroAnimation.tsx`.

**SSR/hydration note:** Initial state is `'idle'` on BOTH server and client (no hydration mismatch). Overlay renders only after the client-side session-flag check decides to play. Repeat visitors (session flag set) never see an overlay flash. First visitors see a very brief bare-page paint before the overlay covers everything — accepted tradeoff to keep repeat visits instant.

```tsx
'use client';

import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SESSION_KEY = 'intro-played';
const FADE_MS = 500;
const FALLBACK_TIMEOUT_MS = 3000;

type Phase = 'idle' | 'playing' | 'fading' | 'done';

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY);

    if (alreadyPlayed || reduced) {
      if (reduced) window.sessionStorage.setItem(SESSION_KEY, '1');
      setPhase('done');
      return;
    }

    setPhase('playing');
    document.body.style.overflow = 'hidden';

    const fallback = window.setTimeout(startFade, FALLBACK_TIMEOUT_MS);
    return () => window.clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startFade() {
    window.sessionStorage.setItem(SESSION_KEY, '1');
    setPhase('fading');
    window.setTimeout(() => {
      document.body.style.overflow = '';
      setPhase('done');
    }, FADE_MS);
  }

  const overlayVisible = phase === 'playing' || phase === 'fading';

  return (
    <>
      {overlayVisible && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            zIndex: 100,
            display: 'grid',
            placeItems: 'center',
            opacity: phase === 'fading' ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-out`,
            pointerEvents: phase === 'fading' ? 'none' : 'auto',
          }}
        >
          {phase === 'playing' && (
            <div style={{ width: 'min(70vw, 520px)', aspectRatio: '1 / 1' }}>
              <DotLottieReact
                src="/hello-apple.lottie"
                autoplay
                loop={false}
                onComplete={startFade}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
        </div>
      )}
      {children}
    </>
  );
}
```

- [ ] **Step 4: Create Nav.tsx**

Create `src/components/Nav.tsx`:
```tsx
export function Nav() {
  const links = [
    { href: '#journey', label: 'Journey' },
    { href: '#projects', label: 'Projects' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-bg/70 border-b border-border">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <a href="#hero" className="font-semibold tracking-tight">jiku.my</a>
        <ul className="flex gap-6 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-fg transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: Create DeviceMockup.tsx**

Create `src/components/DeviceMockup.tsx`:
```tsx
export function DeviceMockup({
  variant,
  children,
}: {
  variant: 'laptop' | 'phone' | 'both';
  children?: React.ReactNode;
}) {
  const Laptop = (
    <div className="relative w-full aspect-[16/10] rounded-t-xl bg-card border border-border shadow-lg overflow-hidden">
      <div className="absolute inset-0 grid place-items-center text-muted text-sm">
        {children ?? 'Coming soon'}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-border rounded-b-xl" />
    </div>
  );
  const Phone = (
    <div className="relative w-[28%] aspect-[9/19] rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-4 rounded-full bg-black/60" />
      <div className="absolute inset-0 grid place-items-center text-muted text-xs pt-6">
        {children ?? 'Coming soon'}
      </div>
    </div>
  );

  if (variant === 'laptop') return <div className="w-full">{Laptop}</div>;
  if (variant === 'phone') return <div className="flex justify-center">{Phone}</div>;
  return (
    <div className="relative w-full">
      {Laptop}
      <div className="absolute -bottom-6 right-4">{Phone}</div>
    </div>
  );
}
```

- [ ] **Step 6: Create Badge.tsx**

Create `src/components/Badge.tsx`:
```tsx
import { cn } from '@/lib/cn';

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'done' | 'in_progress' | 'planned';
}) {
  const styles: Record<string, string> = {
    neutral: 'bg-card text-muted border-border',
    accent: 'bg-accent/10 text-accent border-accent/30',
    done: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
    in_progress: 'bg-accent/10 text-accent border-accent/30',
    planned: 'bg-card text-muted border-border',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs', styles[tone])}>
      {children}
    </span>
  );
}
```

- [ ] **Step 7: Create ProjectCard.tsx**

Create `src/components/ProjectCard.tsx`:
```tsx
import Link from 'next/link';
import type { Project } from '@/content/projects';
import { DeviceMockup } from './DeviceMockup';
import { Badge } from './Badge';

export function ProjectCard({
  project,
  variant,
}: {
  project: Project;
  variant: 'flagship' | 'more';
}) {
  if (variant === 'flagship') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-card border border-border bg-card p-6 md:p-8 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <div className="mb-6">
          <DeviceMockup variant={project.mockup} />
        </div>
        <div className="pt-6">
          <h3 className="text-2xl font-semibold tracking-tight mb-2">{project.title}</h3>
          <p className="text-muted mb-3">{project.oneLiner}</p>
          <p className="text-sm mb-4"><span className="text-accent font-medium">Impact:</span> {project.impact}</p>
          <p className="text-xs text-muted mb-4"><span className="uppercase tracking-wider">Role · </span>{project.role}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-card border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <h4 className="text-lg font-semibold mb-1">{project.title}</h4>
      <p className="text-sm text-muted mb-3">{project.oneLiner}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 8: Verify TypeScript compiles**

Run: `npm run build`
Expected: builds without TS errors. Components are unused in `page.tsx` yet, so no visual verification here.

- [ ] **Step 9: Commit**

Run in PowerShell:
```
git add src/components/ src/app/globals.css
git commit -m "feat: add Reveal, IntroAnimation, Nav, DeviceMockup, ProjectCard, Badge"
```

---

## Task 4: Wire IntroAnimation into RootLayout

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `<IntroAnimation>` from Task 3, `<Nav>` from Task 3
- Produces: RootLayout now always renders `<IntroAnimation>{Nav + children + footer scaffold}</IntroAnimation>`

- [ ] **Step 1: Update layout.tsx**

Overwrite `src/app/layout.tsx`:
```tsx
import './globals.css';
import type { Metadata } from 'next';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'jiku.my — Amirul Haziq',
  description: 'Portfolio of Amirul Haziq (Jiku) — Software Engineer, AI applications, RHB Group Digital intern.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IntroAnimation>
          <Nav />
          {children}
        </IntroAnimation>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server**

Run: `npm run dev`
Expected: on first visit to `http://localhost:3000` (fresh incognito or after clearing sessionStorage), a full-viewport black overlay with the "Hello" Lottie plays; on completion it fades out and the placeholder page fades in. Reload once — no intro. Open a fresh incognito window — intro plays again. Kill dev server.

- [ ] **Step 3: Commit**

Run in PowerShell:
```
git add src/app/layout.tsx
git commit -m "feat: wire IntroAnimation into root layout"
```

---

## Task 5: Build all homepage sections + case-study shell page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/sections/Hero.tsx`, `Journey.tsx`, `FlagshipProjects.tsx`, `MoreProjects.tsx`, `Roadmap.tsx`, `Journal.tsx`, `LinkedInActivity.tsx`, `GitHubActivity.tsx`, `TechStack.tsx`, `Contact.tsx`
- Create: `src/app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: everything from Tasks 2 and 3
- Produces: complete homepage + shell case-study page. This is the last coding task.

- [ ] **Step 1: Create Hero.tsx**

Create `src/components/sections/Hero.tsx`:
```tsx
import { PROFILE } from '@/content/profile';
import { Badge } from '../Badge';

export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
      <Badge tone="accent">{PROFILE.statusBadge}</Badge>
      <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
        {PROFILE.name}
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-muted max-w-2xl">
        {PROFILE.tagline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={PROFILE.resumeHref} className="rounded-full bg-fg text-bg px-5 py-2.5 text-sm font-medium transition hover:opacity-90">
          View resume
        </a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
          GitHub
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Journey.tsx**

Create `src/components/sections/Journey.tsx`:
```tsx
import { TIMELINE } from '@/content/timeline';
import { Reveal } from '../Reveal';

export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Journey</h2>
        <p className="text-muted max-w-2xl mb-12">
          I build AI and fintech tools for underserved Southeast Asian communities. Currently on Industrial Training at RHB Bank Group Digital, working toward the AWS Solutions Architect Associate certification and a longer-arc Solution Architect track.
        </p>
      </Reveal>
      <ol className="relative border-l border-border pl-6 space-y-8">
        {TIMELINE.slice().reverse().map((entry) => (
          <Reveal key={`${entry.dateISO}-${entry.title}`}>
            <li>
              <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-accent" />
              <p className="text-xs uppercase tracking-wider text-muted">{entry.date}</p>
              <p className="mt-1 font-medium">{entry.title}</p>
              <p className="text-sm text-muted">{entry.org}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 3: Create FlagshipProjects.tsx**

Create `src/components/sections/FlagshipProjects.tsx`:
```tsx
import { FLAGSHIP_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Reveal } from '../Reveal';

export function FlagshipProjects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Flagship Projects</h2>
        <p className="text-muted mb-12">Real client work, hackathon wins, and ongoing builds.</p>
      </Reveal>
      <div className="grid gap-8 md:gap-12">
        {FLAGSHIP_PROJECTS.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} variant="flagship" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create MoreProjects.tsx**

Create `src/components/sections/MoreProjects.tsx`:
```tsx
import { MORE_PROJECTS } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { Reveal } from '../Reveal';

export function MoreProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">More Projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5">
        {MORE_PROJECTS.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} variant="more" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create Roadmap.tsx**

Create `src/components/sections/Roadmap.tsx`:
```tsx
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
```

- [ ] **Step 6: Create Journal.tsx**

Create `src/components/sections/Journal.tsx`:
```tsx
import { Reveal } from '../Reveal';

export function Journal() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Journal</h2>
        <p className="text-muted">Coming soon — personal writing lives here.</p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 7: Create LinkedInActivity.tsx**

Create `src/components/sections/LinkedInActivity.tsx`:
```tsx
import { PROFILE } from '@/content/profile';
import { Reveal } from '../Reveal';

export function LinkedInActivity() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">LinkedIn Activity</h2>
        <p className="text-muted">
          Recent posts sync coming soon.{' '}
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Follow on LinkedIn →
          </a>
        </p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 8: Create GitHubActivity.tsx**

Create `src/components/sections/GitHubActivity.tsx`:
```tsx
import { Reveal } from '../Reveal';

export function GitHubActivity() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">GitHub Activity</h2>
        <a href="https://github.com/mirulhaziq" target="_blank" rel="noreferrer" className="block rounded-card border border-border bg-card p-6 hover:shadow-lg transition">
          <img
            src="https://ghchart.rshah.org/0071e3/mirulhaziq"
            alt="Amirul Haziq's GitHub contribution heatmap"
            className="w-full max-w-full"
            loading="lazy"
          />
          <p className="text-sm text-muted mt-4">github.com/mirulhaziq →</p>
        </a>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 9: Create TechStack.tsx**

Create `src/components/sections/TechStack.tsx`:
```tsx
import { TECH_STACK } from '@/content/techstack';
import { AWARDS } from '@/content/awards';
import { Badge } from '../Badge';
import { Reveal } from '../Reveal';

const GROUPS: Array<[string, readonly string[]]> = [
  ['Languages', TECH_STACK.languages],
  ['Frameworks', TECH_STACK.frameworks],
  ['Tools & Platforms', TECH_STACK.tools],
  ['Soft Skills', TECH_STACK.soft],
];

export function TechStack() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">Stack, Certifications & Awards</h2>
      </Reveal>
      <div className="space-y-6 mb-12">
        {GROUPS.map(([label, items]) => (
          <Reveal key={label}>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-3">{label}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted mb-3">Awards</p>
          <div className="flex flex-wrap gap-2">
            {AWARDS.map((a) => (
              <Badge key={a.title} tone="accent">{a.year} — {a.title}</Badge>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 10: Create Contact.tsx**

Create `src/components/sections/Contact.tsx`:
```tsx
import { PROFILE } from '@/content/profile';
import { Reveal } from '../Reveal';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 md:py-32 border-t border-border">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Get in touch</h2>
        <p className="text-muted max-w-2xl mb-8">
          Looking for a Software Engineer role with a focus on AI applications, graduating September 2026.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${PROFILE.email}`} className="rounded-full bg-fg text-bg px-5 py-2.5 text-sm font-medium transition hover:opacity-90">
            Email
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
            LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
            GitHub
          </a>
          <a href={PROFILE.resumeHref} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-card">
            Resume PDF
          </a>
        </div>
        <p className="text-xs text-muted mt-12">© {new Date().getFullYear()} Amirul Haziq. Built with Next.js, deployed on Vercel.</p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 11: Compose page.tsx**

Overwrite `src/app/page.tsx`:
```tsx
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { FlagshipProjects } from '@/components/sections/FlagshipProjects';
import { MoreProjects } from '@/components/sections/MoreProjects';
import { Roadmap } from '@/components/sections/Roadmap';
import { Journal } from '@/components/sections/Journal';
import { LinkedInActivity } from '@/components/sections/LinkedInActivity';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Journey />
      <FlagshipProjects />
      <MoreProjects />
      <Roadmap />
      <Journal />
      <LinkedInActivity />
      <GitHubActivity />
      <TechStack />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 12: Create case-study shell page**

Create `src/app/projects/[slug]/page.tsx`:
```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FLAGSHIP_PROJECTS, MORE_PROJECTS } from '@/content/projects';

const ALL = [...FLAGSHIP_PROJECTS, ...MORE_PROJECTS];

export function generateStaticParams() {
  return ALL.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = ALL.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <Link href="/#projects" className="text-sm text-muted hover:text-fg transition">← Back</Link>
      <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-xl text-muted">{project.oneLiner}</p>
      <p className="mt-2 text-sm"><span className="text-accent font-medium">Impact:</span> {project.impact}</p>
      <p className="mt-2 text-sm text-muted"><span className="uppercase tracking-wider">Role · </span>{project.role}</p>

      <div className="mt-16 space-y-12">
        {['Problem', 'Architecture', 'Key Decisions & Trade-offs', 'Cost Optimization', 'Impact', 'Lessons Learned'].map((heading) => (
          <section key={heading}>
            <h2 className="text-xl font-semibold mb-3">{heading}</h2>
            <p className="text-muted italic">Write-up in progress.</p>
          </section>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 13: Build and run production locally**

Run: `npm run build`
Expected: builds successfully, prints all 10 static routes (`/`, `/projects/oncotrace`, `/projects/bac`, `/projects/rhb-go`, `/projects/cari`, `/projects/guidr`, `/projects/fst-ipad-loan`, `/projects/kiz-mobile`, `/projects/cakapnbayar`, `/projects/fyp-b40-finance`, `/projects/deriv-trading-coach`) in the output.

Run: `npm start`
Open `http://localhost:3000`. Kill server after visual confirm.

- [ ] **Step 14: Commit**

Run in PowerShell:
```
git add src/app/page.tsx src/app/projects/ src/components/sections/
git commit -m "feat: add all 11 homepage sections + case-study shell page"
```

---

## Task 6: Manual verification + Vercel deploy

**Files:** None modified.

**Interfaces:**
- Consumes: everything from Tasks 1–5
- Produces: a live URL

- [ ] **Step 1: Run the full manual verification checklist**

Start dev server: `npm run dev`. In a browser (Chrome/Edge):

1. Open a fresh incognito window → visit `http://localhost:3000` → intro Lottie plays on black BG → fades to Hero after animation completes (~500ms fade).
2. Refresh the page → no intro replay (sessionStorage flag holds).
3. Close incognito window entirely, open new incognito → intro plays again.
4. Click each nav link (`Journey`, `Projects`, `Roadmap`, `Contact`) → page scrolls smoothly to the section (no instant jump).
5. Scroll from top slowly → each section fades and lifts into view once when it enters viewport. Scroll back up → sections stay visible (one-shot).
6. Chrome DevTools → Rendering panel → check "Emulate CSS media feature prefers-reduced-motion: reduce" → refresh → intro is skipped, reveals fire immediately with no transition.
7. DevTools → Rendering → "Emulate CSS media feature prefers-color-scheme: dark" → page flips to dark palette without reload.
8. DevTools → Toggle device toolbar → set to iPhone SE (375×667) → scroll the whole site → confirm nothing overflows horizontally.
9. Click every CTA: Resume PDF opens `resume.pdf`, GitHub / LinkedIn / email links open correct targets.
10. Click each Flagship project card → `/projects/[slug]` shell page loads with "Write-up in progress" placeholders.
11. Open browser console → confirm no red errors on load or navigation.

Kill dev server after all 11 pass.

- [ ] **Step 2: Run Lighthouse on production build**

```
npm run build
npm start
```

In an incognito window (clean state) with DevTools open → Lighthouse tab → Mobile, Performance + Accessibility + Best Practices + SEO categories → Analyze.

Record scores. **Target: Performance ≥ 95, Accessibility ≥ 95.** If either falls below, note the specific opportunities Lighthouse flags and fix inline before deploy (common suspects: image sizes, unused CSS from Tailwind purge misconfig, missing `alt` attrs, insufficient color contrast on `--muted` text).

Kill server.

- [ ] **Step 3: Deploy to Vercel**

If Vercel CLI not installed: `npm install -g vercel`.

Run:
```
vercel login
vercel
```

Accept all defaults (Next.js framework auto-detected). First deploy publishes to a preview URL. Then:
```
vercel --prod
```

Copy the production URL Vercel prints.

- [ ] **Step 4: Verify live deploy**

Open the production URL in a fresh incognito window. Re-run manual checklist items 1, 4, 5, 6, 8, 10, 11 against the live URL.

If any fail, fix locally, commit, and re-run `vercel --prod`.

- [ ] **Step 5: Final commit and tag**

Run in PowerShell:
```
git add -A
git commit --allow-empty -m "chore: verified Iteration 1 live deploy"
git tag iteration-1-live
```

Print the live URL to the user in the final report.

---

## Rollback Guidance

If any task's verification fails and isn't fixable in the current step:
- Revert with `git reset --hard <previous-commit-hash>` to the last known-good commit.
- Skipping a task is not an option — every task is a dependency for later tasks except Task 6 (which cannot itself be skipped since it's the verification gate).

## What "Done" looks like

- Live Vercel URL exists.
- Intro plays first visit, doesn't replay same session.
- All 11 sections render with real CV content.
- 10 case-study shell routes exist and render "Write-up in progress."
- Lighthouse mobile Performance ≥ 95, Accessibility ≥ 95.
- No console errors.
- Git tagged `iteration-1-live`.
