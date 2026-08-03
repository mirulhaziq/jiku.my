# Portfolio v2 Build Plan — Revised for the Two-App Architecture

Supersedes `portfolio-sdlc-plan.md`'s Sprint order (that file's Phase 0/1 discipline — spec first, data model before code, explain-before-moving-on — still applies exactly as written). This revises *what* gets built and in what order, now that the system includes an admin route plus three backend services. Source of truth for all content/structure decisions below is `portfolio-master-spec.md` — `portfolio-v2-architecture.md` has been folded into it and its three open questions are now settled there.

Same rule as before: **you must be able to explain what you built before moving to the next step.**

---

## Phase 0 — Spec Lock (done)
- [x] `portfolio-master-spec.md` — complete, all architecture decisions settled (admin at `/admin`, journal is hand-written, no repo pre-filtering)
- [x] `ai-context.md` — filled in with real per-project specifics
- [ ] Commit both into the repo as `/docs/spec.md` and `/docs/ai-context.md`

## Phase 1 — Data Model Before Code
- [ ] Write the Supabase schema for real (the four tables in the master spec's Data Model section) — run it as an actual migration, don't just sketch it
- [ ] Seed it manually with your existing flagship projects (OncoTrace, BAC, RHB GO, C.A.R.I., Guidr) plus the "More Projects" list, all as `status = published` rows, written by hand — this is your existing content, not something GitHub sync needs to detect. Fill in `github_repo_url` wherever a public repo actually exists, so the sync service recognizes them as already-known instead of re-flagging them as pending.

## Phase 2 — Scaffolding (one project, two surfaces)
- [ ] `create-next-app`, Tailwind, Supabase client, deploy to `jiku.my`
- [ ] `/admin` route group with Supabase Auth middleware (magic-link, restricted to your email) — same deploy as the public site, per the settled decision

*Checkpoint: the public site is live and empty, and you can log into `/admin` and see nothing but a blank dashboard.*

## Phase 3 — Public Site (same as before, now reading from Supabase instead of MDX)
Everything from the original plan's Sprint A and B applies unchanged — Hero, Journey, Tech Stack, Certifications, project cards, DeviceMockup component, GitHub heatmap, "More Projects" — just swap the data source from static content to a Supabase read query. Add:
- [ ] Roadmap page — reads `roadmap_items`, grouped by category, simple timeline/status UI
- [ ] Journal page (if you're writing these yourself, per the architecture doc's default) — reads `journal_posts`
- [ ] LinkedIn activity section on the homepage or a dedicated section — reads `linkedin_posts_cache`

*Checkpoint: the public site works end to end against real (hand-seeded) data. Deploy it. This is a legitimate v1.*

## Phase 4 — Admin App: Read-Only First
- [ ] Dashboard listing all `projects` rows with their status
- [ ] Detail view per project showing every field, editable, with a Save (draft) and Publish button
- [ ] Publish action triggers the public site's revalidation (webhook or on-demand ISR call)

*Checkpoint: you can edit an existing project's write-up in admin and see it change on the live site after publishing.*

## Phase 5 — GitHub Sync Service
- [ ] Scheduled function (Vercel Cron or Supabase Edge Function on a schedule) that pulls your public repo list and diffs against known `github_repo_url` values
- [ ] New repos insert as `status = pending` rows with no content (not `draft` — `pending` means GitHub-detected with nothing written yet; `draft` means it has content but isn't published, per the master spec's status model)
- [ ] Admin dashboard shows these as a distinct "pending — not yet drafted" list

*Checkpoint: create a throwaway public test repo on GitHub, wait for (or manually trigger) the next sync run, confirm it shows up in admin.*

## Phase 6 — AI Draft Generator
- [ ] Admin "Generate write-up" button on a pending draft, calling the Claude API with the repo's README + recent commits + `ai-context.md`
- [ ] Response populates the editable fields — nothing publishes automatically, per the architecture doc's hard rule

*Checkpoint: run it on one real pending project, read the draft critically against `ai-context.md`'s hard rules (no invented metrics, no misattributed ownership) before editing/publishing.*

## Phase 7 — LinkedIn Cron
- [ ] Set up Google Programmable Search Engine scoped to `site:linkedin.com`
- [ ] Weekly scheduled function writes results to `linkedin_posts_cache`; confirm a run with zero new results leaves the table untouched (this is the behavior you specifically wanted — test it deliberately, don't assume it works)

## Phase 8 — Intro Animation + Polish Passes
- [ ] The `.lottie` intro animation, per the master spec
- [ ] Design Pass and Recruiter Review Pass, exactly as specified in `portfolio-master-spec.md`'s Build & Review Process section

## Phase 9 — PWA + QA + Deploy
- [ ] Manifest + offline shell caching on the public site only
- [ ] Full QA pass (Lighthouse, mobile, every link) as in the original plan
- [ ] Final deploy

---

## Sequencing note
Phases 3 and 4 can genuinely run in parallel sprints if you want — the public site and the admin app don't depend on each other until Phase 4's publish action needs to trigger Phase 3's revalidation. Phases 5–7 (the three automated services) are the highest-complexity, highest-risk part of this whole build — budget them generously and don't compress them to "catch up" if earlier phases run long.
