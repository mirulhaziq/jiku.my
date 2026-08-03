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
