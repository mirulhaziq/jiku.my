# Portfolio Design Audit

A section-by-section pass on the whole site. What works. What could be Apple-tier. Concrete before/after mockups for every section.

**Legend**
- `[MUST]` — significantly improves how the site reads. Do before launch.
- `[SHOULD]` — noticeable polish. Do soon after launch.
- `[COULD]` — nice-to-have. Iteration 2+.

---

## Verdict at a glance

| Section | Verdict | Recommended change level |
|---|---|---|
| Hero | Strong. Small polish only. | `[SHOULD]` |
| Journey | Reads like a spreadsheet. | `[MUST]` |
| Flagship Projects | Flat 5-up grid. No hierarchy. | `[MUST]` |
| More Projects | Fine, would benefit from category chip. | `[COULD]` |
| Roadmap | Fine. Could show credential logos. | `[COULD]` |
| Journal | Placeholder — either hide or seed. | `[SHOULD]` |
| LinkedIn Activity | Fine as CTA card. | `-` |
| GitHub Activity | Fine, could add repo cards. | `[SHOULD]` |
| Stack & Recognition | Pill soup. Needs hierarchy. | `[MUST]` |
| Contact | Fine, could show availability. | `[COULD]` |

Three `[MUST]` sections. Two `[SHOULD]`. The rest are optional polish.

---

# 1. Hero  `[LIVE — availability shipped, remaining polish is SHOULD]`

## Live now (after latest change)

```
┌────────────────────────────────────────────────────────────────┐
│  [SE intern at RHB Group Digital] [🟢 Open to work from 1 Sep 2026]│
│                                                                │
│  Amirul Haziq                              ┌──────────────┐   │
│                                            │              │   │
│  I build AI and fintech products for       │   [photo]    │   │
│  Southeast Asia.                           │  tilted card │   │
│                                            │              │   │
│  Actively looking for a full-time SE role                     │
│  focused on AI, starting September 2026.                      │
│                                                                │
│  [View resume] [GitHub] [LinkedIn] [Email] └──────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

Two status chips side-by-side. The availability chip has a pulsing green dot. A second line under the tagline states availability in words so any recruiter skimming reads the intent.

### Works
- Two chips make the "currently doing / looking for what's next" story instant.
- TiltedCard polish.
- Name at display scale.

### Could still improve  `[SHOULD]`
- Primary CTA (View resume) should be visually distinct from secondaries. Right now all 4 pills look equal.
- No **scroll affordance** at the bottom. Apple product pages usually put a tiny "↓" or "Scroll" hint.

## Proposed next iteration

```
┌────────────────────────────────────────────────────────────────┐
│  [SE intern at RHB Group Digital] [🟢 Open to work from 1 Sep 2026]│
│                                                                │
│  Amirul Haziq                              ┌──────────────┐   │
│                                            │              │   │
│  I build AI and fintech products for       │   [photo]    │   │
│  Southeast Asia.                           │  tilted card │   │
│                                            │              │   │
│  Actively looking for a full-time SE role                     │
│  focused on AI, starting September 2026.                      │
│                                                                │
│  [ VIEW RESUME → ]  GitHub · LinkedIn · Email  └──────────┘   │
│      (solid)          (text links, small icons)                │
│                                                                │
│                        ↓ Scroll                                │
└────────────────────────────────────────────────────────────────┘
```

Change summary:
- Demote GitHub/LinkedIn/Email to icon+label text links (secondary tier). Keep View resume as the solid primary.
- Add small "Scroll" affordance with animated arrow below CTAs.

---

# 2. Journey  `[MUST]`

## Current

```
Journey
What I have been up to
────────────────────────

●  Jul 2026
   Second place at Agents@RHB Hackathon for BAC
   RHB
●  Jun 2026
   Second place at RHB MySiswa Brand Challenge for RHB GO
   RHB
●  Jun 2026
   Mobile Developer on the student registration app
   UKM Kolej Ibu Zain
...
```

### Works
- Chronological, newest first.
- Real dates, real content.

### Could improve
- Every entry looks identical. No visual difference between an **award**, a **job**, a **certification**, and a **project**. The `kind` field in the data model is unused visually.
- Zero brand recognition. RHB / UKM / Apple / CIMB are strong names — they should have their **wordmark or monogram** visible.
- Year clustering — right now the eye can't jump to "2025" quickly. Big year markers help.

## Proposed

```
────────────────────────────────────────────────
2026
────────────────────────────────────────────────

  🏆  Jul 2026 · Award
      Second place · Agents@RHB Hackathon
      For BAC (Business Analyst Co-Pilot)

  🏆  Jun 2026 · Award
      Second place · RHB MySiswa Brand Challenge
      For RHB GO

  💼  Jun 2026 · Now
      Mobile Developer, student registration app
      🎓 Kolej Ibu Zain

  💼  Jun 2026 · Now
      Web Developer, iPad loan system
      🎓 UKM FST

  ...

────────────────────────────────────────────────
2025
────────────────────────────────────────────────

  📜  Sep 2025 · Certification
      Apple App Development with Swift Associate
      🍎 Apple

  💼  Jun – Aug 2025
      Software Engineering intern, Summer Program
      🏦 RHB Bank

────────────────────────────────────────────────
2022
────────────────────────────────────────────────

  🎓  Oct 2022 · Now
      Bachelor of Software Engineering (Info Systems)
      🎓 UKM FTSM
```

Change summary:
- Big **year headers** with a divider line.
- Each entry gets an **icon by kind**: 🏆 award, 💼 work, 📜 cert, 🎓 edu, 💻 project. (SVG icons, not emoji — placeholder emoji here for readability.)
- Each org gets a small **monogram tile** (RHB in red, Apple in dark, UKM in blue) — 20px square with the brand letter.
- Optional: connecting timeline line becomes thinner as it goes back in time (fades to muted).

---

# 3. Flagship Projects  `[MUST]`  *(previously discussed, restated here for completeness)*

## Current

```
Flagship projects
The work I am proudest of
────────────────────────

┌────────────┐  ┌────────────┐
│  [O tile]  │  │  [B tile]  │
│            │  │            │
│ OncoTrace  │  │ BAC        │
│ one-liner  │  │ one-liner  │
│┌──────────┐│  │┌──────────┐│
││ Impact   ││  ││ Impact   ││
│└──────────┘│  │└──────────┘│
│ Role.      │  │ Role.      │
│ [tags]     │  │ [tags]     │
└────────────┘  └────────────┘

... 3 more identical cards ...
```

Every card is equal weight. No hero. Impact box looks like a UI component. Gradient tile placeholders read as unfinished.

## Proposed

```
Flagship projects
The work I am proudest of
────────────────────────────────────────────────────────

┌───────────────────────────────────────────────────────┐
│  [InnoX UKM programme]                                │
│                                                       │
│  ┌─────────────────────────────────────────────┐     │
│  │  [large hero image or product mockup]       │     │
│  └─────────────────────────────────────────────┘     │
│                                                       │
│  OncoTrace                                            │
│  An AI system that spots early cancer signals from    │
│  blood biomarkers.                                    │
│                                                       │
│  86.3%                                                │
│  F1 across 238 patients. Two patents filed.           │
│                                                       │
│  Role. Lead Commercialiser on the InnoX UKM programme.│
│  Python · Machine Learning · ICP-MS                   │
│                                       Read case study →│
└───────────────────────────────────────────────────────┘
                                                          ← the HERO card, spans full width

┌────────────────────────┐  ┌────────────────────────┐
│  [Hackathon · 2nd]     │  │  [Hackathon · 2nd]     │
│                        │  │                        │
│  [image / mockup]      │  │  [image / mockup]      │
│                        │  │                        │
│  BAC                   │  │  RHB GO                │
│  Multi-agent           │  │  Student fintech       │
│  compliance assistant  │  │  web app...            │
│                        │  │                        │
│  23 days               │  │  2nd place             │
│  cut from a moderate   │  │  at RHB MySiswa        │
│  project's workflow.   │  │  Brand Challenge.      │
│                        │  │                        │
│  [tags]                │  │  [tags]                │
└────────────────────────┘  └────────────────────────┘

┌────────────────────────┐  ┌────────────────────────┐
│  [Hackathon]           │  │  [Hackathon]           │
│  C.A.R.I.              │  │  Guidr                 │
│  ...                   │  │  ...                   │
└────────────────────────┘  └────────────────────────┘
```

Change summary:
1. **Hero card** — first flagship spans full width (`col-span-2`), bigger image area, more type breathing.
2. **Category chip at top-left** of every card. The taxonomy (already in the data model):
   - `programme` — OncoTrace (InnoX UKM programme).
   - `client` — FST iPad Loan (Faculty of Science and Technology), KIZ Mobile (Kolej Ibu Zain). These are your real client projects.
   - `hackathon` — BAC, RHB GO, C.A.R.I., Guidr, CAKAPnBAYAR, Deriv Trading Coach. BAC and RHB GO carry the extra "· 2nd place" chip.
   - `fyp` — Voice Finance App for B40 Entrepreneurs.
3. **Impact as display type** — kill the tinted box. Number at `text-3xl md:text-4xl font-semibold`, muted context sentence below.
4. **Cursor-tracking radial glow** — soft ambient gradient follows the cursor on hover.

---

# 4. More Projects  `[SHOULD]`

## Current

```
More projects
Smaller builds and side experiments
────────────────────────

┌────────────┐  ┌────────────┐
│ [G tile]   │  │ [K tile]   │
│ FST iPad   │  │ KIZ Mobile │
│ ...        │  │ ...        │
└────────────┘  └────────────┘

... 3 more ...
```

The two client projects (FST iPad Loan for the Faculty of Science and Technology, and Kolej Ibu Zain Mobile) are buried in the "More" section without any signal that they are your **real client work**. Recruiters skimming will miss it.

### Works
- Compact, correctly de-emphasised vs flagship.

### Could improve  `[SHOULD]`
- Category chip on every card. The two client projects get **`Client · <org name>`** chips in an accent-tinted style so they visually pop from the hackathons around them.
- Compact impact metric if any exists.

## Proposed

```
More projects
Smaller builds and client work
────────────────────────────────────────────────

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  [Client · Faculty of Science   │  │  [Client · Kolej Ibu Zain]      │
│   and Technology] ← accent      │  │   ← accent                      │
│                                 │  │                                 │
│  FST iPad Loan System           │  │  Kolej Ibu Zain Mobile App      │
│  Booking system for iPads and   │  │  Student registration with an   │
│  shared learning rooms.         │  │  AR map and Google Maps.        │
│                                 │  │                                 │
│  Delivered a working MVP.       │  │  In use for onboarding.         │
│                                 │  │                                 │
│  [tags]                         │  │  [tags]                         │
└─────────────────────────────────┘  └─────────────────────────────────┘

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  [Hackathon]                    │  │  [Final year project]           │
│  CAKAPnBAYAR                    │  │  Voice Finance App              │
│  ...                            │  │  ...                            │
└─────────────────────────────────┘  └─────────────────────────────────┘

┌─────────────────────────────────┐
│  [Hackathon]                    │
│  Deriv AI Trading Coach         │
│  ...                            │
└─────────────────────────────────┘
```

The `Client · Faculty of Science and Technology` and `Client · Kolej Ibu Zain` chips are the important signal. Real orgs, real delivery.

---

# 5. Roadmap  `[COULD]`

## Current

```
Roadmap
What is next for me
────────────────────────

┌─────────────────────────────────────────────────┐
│ Apple App Development with Swift Associate      │
│ Earned in September 2025.        [done]         │
├─────────────────────────────────────────────────┤
│ AWS Solutions Architect Associate (SAA-C03)     │
│ Studying for it now.             [in progress]  │
├─────────────────────────────────────────────────┤
│ Solution Architect track                        │
│ ...                              [in progress]  │
├─────────────────────────────────────────────────┤
│ Fintech and AI for Southeast Asia               │
│ ...                              [in progress]  │
└─────────────────────────────────────────────────┘
```

### Works
- Clear status badges.

### Could improve
- Certifications should live in **Stack & Recognition** as credential cards with real logos, not in a plain list here.
- Roadmap could focus purely on **career direction** goals, dropping the cert clutter.

## Proposed

Move the two cert items OUT of Roadmap and into the new Stack & Recognition credential row. Keep Roadmap for the two career-arc goals:

```
Roadmap
What is next for me
────────────────────────

┌─────────────────────────────────────────────────┐
│  Solution Architect track                       │
│  The long arc I plan to walk after graduation   │
│  in September 2026.                             │
│                                                 │
│  ▓▓▓░░░░░░░  in progress                        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Fintech and AI for Southeast Asia              │
│  The kind of problem I want to keep working on. │
│                                                 │
│  ▓▓▓▓▓▓░░░░  ongoing                            │
└─────────────────────────────────────────────────┘
```

Progress-bar visual on each. Ships with dummy percentages until we define what "progress" means.

---

# 6. Journal  `[SHOULD]`

## Current

```
Journal
Notes from the build
────────────────────────

┌─────────────────────────────────────────────────┐
│                                                 │
│         The first posts will land here.         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### The honest question
Empty section that says "coming soon" reads as **unfinished**. Two options:

**Option A — Hide until you have content.** Cleanest. Remove from the homepage. Add back when you write the first post.

**Option B — Ship with 2-3 real short notes now.** Even 60-word thoughts about "why I picked FastAPI for the RHB summer intern project" or "what I learned wiring MyDID SSO" would work. Reads as intentional.

Recommend Option A for launch. Reintroduce as Option B when you're ready.

---

# 7. LinkedIn Activity  `-` fine

Already polished to match GitHub card pattern with logo. Ship as-is. The full pipeline (real posts) is Workstream B in the plan.

---

# 8. GitHub Activity  `[SHOULD]`

## Current

```
GitHub
Where the code lives
────────────────────────

┌─────────────────────────────────────────────────┐
│  github.com/mirulhaziq                    ⌘     │
│  The repositories behind the projects...        │
└─────────────────────────────────────────────────┘
```

### Works
- Clean CTA matches LinkedIn card.

### Could improve
- Show 3–4 pinned repos as mini-cards below the CTA. Instant proof there IS code, not just a link.

## Proposed

```
GitHub
Where the code lives
────────────────────────

┌─────────────────────────────────────────────────┐
│  github.com/mirulhaziq                    ⌘     │
│  Full profile and every repo.                   │
└─────────────────────────────────────────────────┘

┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ 📦 jiku-my    │  │ 📦 bac-copilot│  │ 📦 rhb-go     │
│ Portfolio     │  │ Business      │  │ Student       │
│ source.       │  │ Analyst       │  │ fintech...    │
│               │  │ Co-Pilot.     │  │               │
│ • TypeScript  │  │ • Python      │  │ • TypeScript  │
│ ★ 0    ⑂ 0    │  │ ★ 0    ⑂ 0    │  │ ★ 0    ⑂ 0    │
└───────────────┘  └───────────────┘  └───────────────┘
```

Change: hand-picked repos in `src/content/repos.ts`. Same visual style as ProjectCard "more" variant. Static, no API call.

---

# 9. Stack & Recognition  `[MUST]`  *(previously discussed, restated for completeness)*

## Current

```
Stack and recognition
What I build with
────────────────────────

LANGUAGES
[Java] [Python] [Kotlin] [Dart] [Swift] [PHP]
[HTML] [CSS] [SQL] [Go]

FRAMEWORKS
[Jetpack Compose] [Flutter] [FastAPI] [Next.js]

TOOLS AND PLATFORMS
[Firebase] [MySQL] [Git] [GitHub] [PowerBI]
[Docker] [PostgreSQL] [Supabase] [Postman] [Bruno] [AWS (EC2)]

SOFT SKILLS
[Leadership] [Strategic Communication]
[Project Coordination] [Agile Mindset]

AWARDS
[2026. 2nd place, Agents@RHB Hackathon 2026]
[2026. 2nd place, RHB MySiswa Brand Challenge 2026]
[2025. 2nd place, RHB Business Challenge 2025]
[2025. Best Facilitator Choice Award, ASEAN Youth Volunteer Program 2025]
```

Pill soup. No hierarchy. Certifications aren't here at all.

## Proposed

```
Stack and recognition
What I build with, what I have earned
────────────────────────────────────────────────

CREDENTIALS
────────────
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  🍎  Apple                      │  │  ▲  AWS                         │
│                                 │  │                                 │
│  App Development with Swift     │  │  Solutions Architect Associate  │
│  Associate                      │  │  (SAA-C03)                      │
│                                 │  │                                 │
│  Earned Sep 2025                │  │  ● In progress                  │
│                     Verify →    │  │                                 │
└─────────────────────────────────┘  └─────────────────────────────────┘

TOOLBOX
────────
┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   { }         │  │   ⚛           │  │   🛠           │  │   👥           │
│               │  │               │  │               │  │               │
│  Languages    │  │  Frameworks   │  │  Tools        │  │  Soft skills  │
│  10           │  │  4            │  │  11           │  │  4            │
│               │  │               │  │               │  │               │
│  Python       │  │  Next.js      │  │  Supabase     │  │  Leadership   │
│  TypeScript   │  │  FastAPI      │  │  PostgreSQL   │  │  Strategic    │
│  Swift        │  │  Flutter      │  │  AWS (EC2)    │  │  Communication│
│  Go           │  │  Jetpack      │  │  Docker       │  │  Project      │
│  + 6 more     │  │  Compose      │  │  + 7 more     │  │  Coordination │
│               │  │               │  │               │  │  + 1 more     │
└───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘

AWARDS
────────
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  🥈  2nd place                  │  │  🥈  2nd place                  │
│                                 │  │                                 │
│  Agents@RHB Hackathon           │  │  RHB MySiswa Brand Challenge    │
│  For BAC                        │  │  For RHB GO                     │
│                                 │  │                                 │
│  2026                           │  │  2026                           │
└─────────────────────────────────┘  └─────────────────────────────────┘

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  🥈  2nd place                  │  │  🏅  Best Facilitator           │
│                                 │  │                                 │
│  RHB Business Challenge         │  │  ASEAN Youth Volunteer          │
│                                 │  │  Program                        │
│                                 │  │                                 │
│  2025                           │  │  2025                           │
└─────────────────────────────────┘  └─────────────────────────────────┘
```

Change summary:
1. Three sub-sections: **Credentials · Toolbox · Awards** — each visually distinct.
2. Credentials get real logo tiles + status.
3. Toolbox is 4 category cards, not pill rows. Icon + count + top items + "+N more".
4. Awards are individual cards in a 2x2 grid. Rank chip + event + project + year.
5. The two 2nd-place hackathon wins get accent-tinted backgrounds (rank matters).

---

# 10. Contact  `[COULD]`

## Current

```
Contact
Get in touch
────────────────────────

I graduate in September 2026 and I am looking for
a software engineering role focused on AI
applications. Reach out on any of these and I will
read it.

[ahaziqshazlee@gmail.com] [LinkedIn] [GitHub] [Resume PDF]

© 2026 Amirul Haziq. Built with Next.js and deployed on Vercel.
```

### Works
- Direct, human copy.
- All CTAs work.

### Could improve
- Email deserves display treatment — a HUGE `mailto:` text link, not a pill hidden among others.
- Availability status could be more prominent.
- Footer could show a small "made in Kuala Lumpur" and the stack list.

## Proposed

```
Contact
Get in touch
────────────────────────

🟢  Available from September 2026

I am looking for a software engineering role
focused on AI applications. Reach out on any of
these and I will read it.

ahaziqshazlee@gmail.com                          ← BIG display type
                                                    (clickable mailto)

LinkedIn  ·  GitHub  ·  Resume PDF               ← secondary links

────────────────────────────────────────────────
Amirul Haziq · Kuala Lumpur, Malaysia · 2026
Built with Next.js, deployed on Vercel.
```

Change summary:
- Green availability chip.
- Email as `text-3xl` display type, primary CTA.
- Other links as thin text links, secondary.
- Footer expanded slightly with location.

---

# Cross-cutting improvements  `[COULD]`

- **Scroll-linked micro-animations.** Sections could subtly parallax on scroll (small vertical offset differences between text and images). Costs ~30 lines of CSS per section. Apple product-page pattern.
- **404 page.** Currently Next.js default. Branded 404 with the Claude "in development" Lottie in a new pose ("this page hasn't been built yet") would be on-brand.
- **Open Graph image.** Missing. Blank previews when the URL is shared on WhatsApp/LinkedIn/Slack. Fix with `public/og.png` (1200×630) + OG metadata in layout.
- **Sitemap + robots.txt.** Next 14 auto-generates from `src/app/sitemap.ts` and `src/app/robots.ts`. Needed for Google indexing.

---

# Execution order

If I had to rank by impact-per-hour of work:

1. **Flagship Projects redesign** — hero card, category chips, display-type impact, ambient glow. Biggest visual payoff.
2. **Stack & Recognition redesign** — credentials + toolbox cards + awards grid. Turns pill soup into credibility.
3. **Journey redesign** — year headers, kind icons, org monograms. Cheapest visual upgrade per effort.
4. **OG image + sitemap + robots** — pre-launch essentials, small.
5. **Hero polish** — pulse dot, scroll arrow, CTA hierarchy.
6. **GitHub repo cards + Contact display email + hide Journal** — small touches together.

Estimated effort in sessions:
- (1) Flagship: 1 session
- (2) Stack: 1 session
- (3) Journey: 1 session
- (4) OG + sitemap: 15 minutes
- (5) Hero polish: 30 minutes
- (6) Small touches: 30 minutes

Total to reach shipped-Apple-tier: **~3 focused sessions + ~90 minutes of small polish**.
