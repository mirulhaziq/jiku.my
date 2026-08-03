# jiku.my — Portfolio Master Spec (v2, Complete)

This is the single source of truth. It replaces everything before it. Two companion files exist alongside this one and are referenced, not duplicated: `ai-context.md` (the living voice/style file fed to Claude when drafting project write-ups) and the SDLC execution plan (the step-by-step build order).

## Goal
A fast, credible portfolio for Amirul Haziq ("Jiku") — final-year SE student, RHB Bank AI/fintech intern, Apple Swift Associate, working toward Solution Architect. Audience is recruiters and technical reviewers. Priority: speed, honesty (never overclaim), and enough architectural depth per project to support the Solution Architect narrative.

---

## Stack & Constraints
- **Public site:** Next.js 14 (App Router), Tailwind CSS, deployed to `jiku.my` on Vercel. Static/ISR-rendered — no auth-check latency on any public page.
- **Admin app:** same Next.js project, behind `/admin`, gated by Supabase Auth middleware (magic-link, restricted to Jiku's email only). One deploy, not two separate projects — simpler to maintain, per the stated goal of making this easy to keep up.
- **Database:** Supabase Postgres.
- **AI drafting:** Claude API.
- **Performance target:** Lighthouse Performance ≥95 on the public site. No heavy client JS beyond what specific interactive pieces need (Lottie player, GitHub heatmap embed). CSS transitions only — no animation libraries.
- **PWA:** installable manifest + offline shell caching on the **public site only**. The admin app is a working tool for one person — functional, not offline-capable.
- **Responsive:** mobile-first, must hold up equally well on phone and laptop — this is a stated hard requirement, not a nice-to-have.

---

## Visual Direction
Minimalist but bold — Apple/iOS-native: simple, professional, classy, echoing the Swift Associate credential. Large confident type (system-ui/SF Pro stack), soft rounded corners (16–24px card radii), frosted-glass (backdrop-blur) depth over hard borders, one accent color used sparingly. Calm, considered pacing in layout and copy — informed by the reference (`rbp-portfolio.vercel.app`): generous negative space, large project cards, simple three-item nav, restrained motion (ease-out, slight spring, never gratuitous). Neutral palette (near-white or near-black) so the accent reads as intentional.

## Intro Loading Animation
Full-viewport `.lottie` "Hello" animation (asset: `hello-apple.lottie`) plays once per fresh session before the site renders.
- `@lottiefiles/dotlottie-web` — lightweight, purpose-built for `.lottie`, not the full `lottie-web` + AE-json stack.
- `sessionStorage` flag so it doesn't replay on in-session navigation; a fresh visit always replays it.
- Skip-on-tap fallback; short runtime; preload the asset (~1.7KB); cross-fade (~200–300ms) into the Hero.

---

## Real Values & Open Items
- `GITHUB_URL`: `https://github.com/mirulhaziq`
- `GITHUB_USERNAME`: `mirulhaziq` (for the heatmap embed)
- `LINKEDIN_URL`: `https://www.linkedin.com/in/amirulhaziqshazlee`
- `EMAIL`: `ahaziqshazlee@gmail.com`
- Domain: `jiku.my`
- **Still open:** which resume (one-page targeted vs. full CV) is the public "View Resume" download; per-project GitHub repo URLs to fill into the seed data; which projects (if any) should link to a live demo.

---

## Public Site Structure

### 1. Hero
Name, role line, current-status badge, CTAs (Resume PDF, GitHub, LinkedIn).

### 2. Journey
Personal narrative (2–4 sentences, his own words — draft below adapted from his resume summary, not fabricated) + a vertical timeline.

> "I build AI and fintech tools for underserved Southeast Asian communities. I'm currently at RHB Bank's Digital & Technology team, with a track record of shipping AI-powered applications across hackathons and real client work. My stack spans Go, Python, React, and FastAPI — right now I'm working toward the AWS Solutions Architect Associate certification."

Timeline (real dates, in actual chronological order — this was out of order in the previous draft, fixed here):
- UKM FTSM — Bachelor of Software Engineering (Information Systems), Oct 2022 – Present
- RHB Bank — Software Engineering Intern, Summer Internship Program, June – Aug 2025 (AI documentation assistant, Superset dashboards)
- RHB Bank, Group Digital — Software Engineering Intern, Industrial Training, March 2026 – Present (MyDID/mBK integration POC, API specs, e-Verification)
- seKODlah TecHive Bootcamp (CIMB-funded) — Apr–May 2026
- C.A.R.I. — seKODlah TecHive Hackathon 2026 (Team 3A+), mid-May 2026, within the TecHive program
- Web Developer, FST (UKM) — June 2026 – Present
- Mobile Developer, Kolej Ibu Zain (UKM) — June 2026 – Present
- 2nd place, RHB MySiswa Brand Challenge 2026 — RHB GO (Grand Final 22 June 2026)
- 2nd place, Agents@RHB Hackathon 2026 — BAC (showcase 7 July 2026)
- Guidr / VERiQ-my — Databricks-track hackathon, 2026, exact date TBD
- OncoTrace — Co-founder / Commercialization Lead, ongoing

### 3. Flagship Projects
Full cards with device mockups (see component spec below), each linking to its full case-study page.
1. **OncoTrace** — AI pan-cancer early detection (ICP-MS biomarkers). 86.3% F1, 238 patients, 2 patents filed.
2. **BAC (Business Analyst Co-Pilot)** — multi-agent compliance assistant, Copilot Studio + Claude. 2nd place, Agents@RHB Hackathon 2026. Cuts a moderate project's BA workflow from ~53 to ~30 days (23 days saved).
3. **RHB GO** — student fintech web app (MapSiswa, discount portal, ADI chatbot). 2nd place, RHB MySiswa Brand Challenge 2026.
4. **C.A.R.I.** — agentic AI career co-pilot (Team 3A+, TecHive Hackathon 2026). Express.js/TypeScript on Supabase, Claude-powered planning loop, staged actions behind a human-approval gate.
5. **Guidr / VERiQ-my** — scam-investigation PWA, Next.js/Firebase/Vertex AI Gemini, Databricks-track hackathon build.

**Device Mockup component:** CSS/SVG-drawn `laptop` + `phone` frame variants (no image assets), phone overlapping the laptop's bottom-right corner. Empty-but-styled with a "Coming soon" label until real screenshots exist — swap in `next/image` later, no markup changes needed.

### 4. More Projects (collapsed)
FST iPad Loan System, KIZ Mobile App, CAKAPnBAYAR, Finance Management App for B40 Entrepreneurs (Final Year Project), Rental Car Mobile Application — same card treatment, phone-mockup-only, smaller scale.

### 5. Project Case Study Pages (`/projects/[slug]`)
Content now lives in Supabase (`projects` table), not static MDX — see Data Model below — but the template is unchanged:
**Problem → Architecture (Mermaid diagram, compiled to static SVG at build/request time) → Key Decisions & Trade-offs (table) → Cost Optimization → Impact → Lessons Learned → Changelog** (dated log, newest first).
Unwritten sections render as "Write-up in progress" — never fabricated. This template is also what `ai-context.md` instructs Claude to draft into.

### 6. Roadmap
Career/skill roadmap — AWS SAA-C03 progress, Solution Architect path, upcoming certs/goals. Reads from `roadmap_items`, grouped by category (career / cert / skill), simple status indicator (planned / in progress / done).

### 7. Journal (nice-to-have)
Short personal posts/stories, written directly by Jiku in admin — **no AI drafting here**, this is deliberately his own voice with nothing to generate from. Can launch with zero entries.

### 8. LinkedIn Activity
Reads from `linkedin_posts_cache`, populated by the weekly cron (see Services). If a cron run finds nothing new, the section simply keeps showing the last-known posts — no empty state, no "no updates" message ever shown to a visitor.

### 9. GitHub Activity
Lightweight image-based contribution heatmap embed + profile link. No live API polling on page load.

### 10. Tech Stack, Certifications & Awards
Grouped tag rows: Languages / Frameworks / Data & Infra / AI-ML. Certifications (AWS SAA in progress, Apple Swift Associate) and awards (2nd place ×3, Best Facilitator) as a compact badge row — reads in 2 seconds, no scrolling.

### 11. Contact / Footer
LinkedIn, GitHub, email, Resume PDF download. All CTAs solid-filled regardless of href readiness — never let a placeholder link render as disabled/greyed.

---

## Admin App (`jiku.my/admin`)
Auth-gated, exclusively Jiku's.
- **Dashboard:** all `projects` rows by status — published, draft (edited but not live), and pending (GitHub-detected, no content yet).
- **Project editor:** every case-study field, editable, Save (draft) / Publish buttons. Publish triggers `revalidatePath` on the public site.
- **"Generate write-up" button** on pending projects — sends the repo's README + recent commits + `ai-context.md` to Claude, populates the editable fields. Never auto-publishes.
- **Roadmap manager:** CRUD on `roadmap_items`.
- **Journal editor:** CRUD on `journal_posts`, written by hand.
- **Repo noise handling:** any auto-detected repo Jiku doesn't want shown gets dismissed/archived here — this is the human checkpoint, so no pre-filtering is needed upstream in the sync service itself.

## Data Model (Supabase Postgres)
```
projects
  id, slug, title, github_repo_url (nullable — hand-seeded projects like OncoTrace may have no public repo), status (pending | draft | published | archived)
  summary, problem, architecture_md, decisions_md, cost_optimization_md,
  impact_md, lessons_md, changelog (jsonb array of {date, note})
  tech_stack (text[]), created_at, updated_at, published_at

roadmap_items
  id, title, category (career | cert | skill), status (planned | in_progress | done)
  target_date, notes, sort_order

journal_posts
  id, slug, title, body_md, status (draft | published), published_at

linkedin_posts_cache
  id, post_url, snippet, fetched_at   -- overwritten weekly; untouched if a run finds nothing new
```

## Services
1. **GitHub sync** — daily scheduled function, diffs Jiku's public repo list against known `github_repo_url` values, inserts new repos as `status = pending`, empty content.
2. **AI draft generator** — manually triggered from admin per project, Claude API, uses `ai-context.md` as its system context. Human approval required before publish, always.
3. **LinkedIn cron** — weekly scheduled function, Google Programmable Search (`site:linkedin.com` + username) via Custom Search JSON API, writes to `linkedin_posts_cache`, leaves it untouched on empty results.

## Architecture Decisions (settled, not open)
- **Admin URL:** path-based (`jiku.my/admin`), one deploy — simpler to maintain than a separate subdomain project.
- **Journal authorship:** human-written only, no AI involvement — it's meant to be personal voice.
- **Repo filtering:** none upstream — every new public repo becomes a pending draft; Jiku dismisses noise at the admin approval step rather than the sync service trying to guess relevance.

---

## What NOT to Do
- No fabricated metrics, ever — anywhere on the site. Unwritten case-study sections say "in progress," never invented detail.
- No claiming sole ownership of team projects — name the actual split (e.g., "co-built").
- No animation libraries beyond the Lottie player for the intro — CSS transitions elsewhere.
- No stock photography/illustration.
- No broken-looking CTAs — style them solid regardless of href readiness.
- No LinkedIn scraping — search-index workaround only, per the architecture above.

## Build & Review Process
1. **Design pass** — spacing rhythm, type hierarchy, mockup fidelity, accent-color discipline, as a senior product design engineer would.
2. **Recruiter review pass** — 5-second first-scan test (name/role/one proof point visible without scrolling), no CTA looks disabled, every placeholder looks intentional not incomplete, project cards lead with impact before tech stack, nothing overstated relative to source facts. Two passes, not an indefinite loop.

## Deliverable
One Next.js project (public site + `/admin`), Supabase-backed, deployed to `jiku.my`, with the three automated services running on schedule and every publish action gated by human review.
