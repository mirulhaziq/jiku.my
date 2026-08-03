# AI Context — How to Write My Project Descriptions

This file is fed to Claude alongside a repo's README and commits when drafting a project write-up in the admin app. Edit this over time as you notice the AI getting your voice wrong.

## Who I am, for context
Final-year Software Engineering student, RHB Bank AI/fintech intern, working toward becoming a Solution Architect. My north star is fintech + AI for underserved Southeast Asian problems.

## Voice and tone
- Direct and concrete. No marketing language, no "revolutionary," "cutting-edge," "seamless."
- Technical specificity over vague impact claims — name the actual stack, the actual numbers, not "significantly improved."
- Confident but not overstated. If I built the backend and a teammate built the frontend, say that — don't imply I did it all.

## What I need explained for every project (matches the case-study template)
1. **Problem** — who this was for, what was actually broken, real constraints (budget, timeline, data privacy, hackathon time limit — whatever applied).
2. **Architecture** — how data/requests actually flow. Prefer a diagram description I can turn into Mermaid, not a paragraph of prose.
3. **Key Decisions & Trade-offs** — this is the most important section. A real table: what I chose, what I considered instead, why I chose it, and what I gave up by choosing it. This is the evidence of design judgment, not the tech-tag list.
4. **Cost Optimization** — if there was a real deliberate cost decision (serverless vs. always-on, managed service vs. self-hosted, why a specific DB), state it plainly. If there wasn't one, say "not yet optimized — here's what I'd reconsider at scale" rather than inventing a saving that didn't happen.
5. **Impact** — only real, known numbers (hackathon placement, accuracy, latency, user counts). Never estimate or round up a number I haven't confirmed.
6. **Lessons Learned** — 2-3 sentences, genuinely what I'd do differently, not generic reflection filler.

## Hard rules
- Never invent a metric. If a number isn't in the README, commits, or my notes, leave the section marked "write-up in progress" instead of guessing.
- Never claim ownership of a teammate's work. If it was a team project, say "co-built" or name my specific piece.
- Don't pad short projects to sound bigger than they are — a small, honest write-up beats an inflated one.

## Notes on specific recurring facts
- RHB GO: team of 3 — Azim owned RHB product/merchant data, Qiqi owned marketing/portal content, I owned all the tech/dev. Don't credit me with the product or marketing decisions.
- BAC: co-built with Azim Rudy on Copilot Studio + Claude. The "23 days saved" figure is from the official pitch deck, per moderate-scale project — don't state it as a universal number.
- C.A.R.I.: built during a team hackathon (Team 3A+, seKODlah TecHive 2026); I specifically built the backend (Express.js/TypeScript, Supabase, the Claude agent tool-use planning loop with staged actions behind a human-approval gate, OpenAI for CV/JD analysis and embeddings). Don't imply I built the frontend too unless I actually did.
- MyDID/mBK work at RHB: my hands-on contribution was mostly frontend and API-spec documentation for the mBK integration POC — not the MyDID core service, and not backend implementation.
