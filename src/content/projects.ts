export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  impact: string;
  techStack: string[];
  role: string;
  mockup: 'both' | 'laptop' | 'phone';
  image?: string;
  imageAlt?: string;
};

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    slug: 'oncotrace',
    title: 'OncoTrace',
    oneLiner: 'An AI system that spots early cancer signals from blood biomarkers.',
    impact: 'Reached 86.3% F1 across 238 patients. Two patents filed.',
    techStack: ['Python', 'Machine Learning', 'ICP-MS'],
    role: 'Co-founder and commercialisation lead.',
    mockup: 'laptop',
    image: '/projects/oncotrace.png',
    imageAlt: 'Amirul Haziq, co-founder of OncoTrace',
  },
  {
    slug: 'bac',
    title: 'BAC (Business Analyst Co-Pilot)',
    oneLiner: 'A multi-agent compliance assistant that drafts business requirements documents.',
    impact: 'Second place at Agents@RHB Hackathon 2026. Cut a mid-sized project workflow from around 53 days to around 30.',
    techStack: ['Microsoft Copilot Studio', 'Claude', 'BNM regulations knowledge base'],
    role: 'Co-built with Azim Rudy.',
    mockup: 'laptop',
  },
  {
    slug: 'rhb-go',
    title: 'RHB GO',
    oneLiner: 'A student fintech web app with a verified GPS merchant map, a discount portal, and an AI chatbot.',
    impact: 'Second place at RHB MySiswa Brand Challenge 2026. Shaped by a primary survey of 160 students.',
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'PostGIS', 'Mapbox GL JS', 'Claude API'],
    role: 'I owned all the tech and development. Azim handled the RHB and merchant data. Qiqi handled marketing.',
    mockup: 'both',
  },
  {
    slug: 'cari',
    title: 'C.A.R.I.',
    oneLiner: 'An agentic AI career co-pilot that diagnoses CVs against job descriptions and auto-tailors resumes.',
    impact: 'Built in 40 hours at seKODlah TecHive Hackathon 2026 with Team 3A+.',
    techStack: ['Express.js', 'TypeScript', 'Supabase', 'Claude', 'OpenAI'],
    role: 'I built the backend. Every AI action goes through a human approval gate.',
    mockup: 'laptop',
  },
  {
    slug: 'guidr',
    title: 'Guidr',
    oneLiner: 'A scam investigation PWA built for the Databricks hackathon track.',
    impact: 'Hackathon build in 2026.',
    techStack: ['Next.js', 'Firebase', 'Vertex AI Gemini'],
    role: 'Team build.',
    mockup: 'phone',
  },
];

export const MORE_PROJECTS: Project[] = [
  {
    slug: 'fst-ipad-loan',
    title: 'FST iPad Loan System',
    oneLiner: 'A booking system for iPads and shared learning rooms with row-level security and a database-level guard against double-booking.',
    impact: 'Delivered a working MVP to the faculty and demoed it to stakeholders.',
    techStack: ['Supabase', 'PostgreSQL', 'Magic-link auth'],
    role: 'Web Developer at UKM FST.',
    mockup: 'laptop',
  },
  {
    slug: 'kiz-mobile',
    title: 'Kolej Ibu Zain Mobile App',
    oneLiner: 'A student registration app with an AR map and a Google Maps location for finding the college.',
    impact: 'In use for onboarding at KIZ.',
    techStack: ['Mobile', 'Augmented Reality', 'Maps'],
    role: 'Mobile Developer at UKM Kolej Ibu Zain.',
    mockup: 'phone',
  },
  {
    slug: 'cakapnbayar',
    title: 'CAKAPnBAYAR',
    oneLiner: 'A voice ordering app for restaurants that transcribes Malay and English in the same sentence.',
    impact: 'Built at the Cursor and Anthropic hackathon. Validation runs in under three seconds.',
    techStack: ['Whisper ASR', 'Groq inference'],
    role: 'Hackathon build.',
    mockup: 'phone',
  },
  {
    slug: 'fyp-b40-finance',
    title: 'Voice Finance App for B40 Entrepreneurs',
    oneLiner: 'My final year project. A voice-based sales tracker that pulls structured data from spoken input.',
    impact: 'LLM extraction accuracy passed 90% in testing. Targeting 100 users.',
    techStack: ['React', 'Large Language Models', 'PostgreSQL'],
    role: 'Sole developer. Timeline runs September 2025 to February 2026.',
    mockup: 'laptop',
  },
  {
    slug: 'deriv-trading-coach',
    title: 'Deriv AI Trading Coach',
    oneLiner: 'A Chrome extension that gives traders real-time coaching prompts from an LLM.',
    impact: 'Placed in the top 50 of all submissions at Deriv AI Hackathon 2026.',
    techStack: ['Chrome Extension', 'Large Language Models'],
    role: 'Hackathon build.',
    mockup: 'laptop',
  },
];
