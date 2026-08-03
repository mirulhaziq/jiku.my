# jiku.my — Iteration 1: Scaffold + Lottie Intro + Smooth Scroll

**Date:** 2026-08-03
**Status:** Approved (brainstorm complete, awaiting spec review before implementation planning)
**Owner:** Amirul Haziq (Jiku)
**Companion docs:** `portfolio-master-spec.md`, `ai-context.md`, `portfolio-v2-sdlc-plan.md`

---

## 1. Goal

Ship a **live, credible, static** version of `jiku.my` at a Vercel URL. All 11 public sections from the master spec render with hand-seeded content from Amirul's CV. Case-study pages are shells that say "Coming soon" — real write-ups are deferred to Iteration 2. Every recruiter-visible surface must look intentional; nothing looks unfinished.

The two headline experiences that must feel right on this iteration:
1. **Intro animation** — Apple "Hello" Lottie plays once per browser session, then cross-fades into the Hero.
2. **Smooth scroll** — anchor jumps ease; sections fade/lift into view as they enter the viewport.

---

## 2. Scope

### In-scope
- Next.js 14 (App Router) + TypeScript + Tailwind CSS scaffold
- Full public site: all 11 sections rendering with hand-seeded content
- `<IntroAnimation />` component with sessionStorage gating
- `<Reveal />` component with IntersectionObserver
- Light/dark theme via `prefers-color-scheme` (no toggle)
- CSS/SVG device mockup component (laptop + phone) — no image assets
- `/projects/[slug]` shell pages that render "Coming soon"
- Deploy to Vercel (default `*.vercel.app` URL — no custom domain wiring)

### Out-of-scope (deferred to later iterations)
- Real case-study bodies (Iteration 2)
- Supabase, `/admin`, magic-link auth (Iteration 3)
- GitHub sync cron, AI draft generator, LinkedIn cron (Iteration 4)
- PWA manifest + offline shell, custom domain `jiku.my` wiring (Iteration 5)
- Automated tests

### Non-goals
- No animation libraries beyond the Lottie player
- No CMS
- No content editing UI

---

## 3. Decisions Locked In

| Decision | Choice | Rationale |
|---|---|---|
| Project state | Scaffold from scratch in this folder | Only spec docs + assets exist; no code yet |
| Iteration scope | Full public site, Supabase later | Ship a real front door first, layer intelligence on top |
| Intro replay rule | Once per browser session (`sessionStorage`) | Master spec default; balances drama vs. repeat-visitor patience |
| Skip-on-tap | Not included this iteration | User did not select it; short runtime makes it optional |
| Scroll behavior | Native CSS `scroll-behavior: smooth` + IntersectionObserver fade-up | Zero JS libs, respects `prefers-reduced-motion`, keeps Lighthouse ≥95 |
| Theme | Light default, system-preference dark | Feels like apple.com, prints cleanly, no toggle noise |
| Accent color | Apple system blue `#0071e3` | One accent used sparingly, matches Swift Associate narrative |
| Intro background | Always black regardless of theme | Matches original Apple hello aesthetic |
| Intro fade timing | 500ms ease-out crossfade | Cinematic but not slow; user picked this over 250ms |
| Case-study content | Shell pages ("Coming soon") | User explicitly deferred — priority is going live |

---

## 4. Architecture

### Stack
- **Framework:** Next.js 14 (App Router), TypeScript, React 18
- **Styling:** Tailwind CSS with CSS variables for theme tokens
- **Runtime deps:** `@lottiefiles/dotlottie-react` (only external animation dep)
- **Hosting:** Vercel (default deploy URL)
- **Content:** Static TypeScript files in `src/content/`

### Directory structure (target)
```
src/
  app/
    layout.tsx                  # RootLayout wraps children in <IntroAnimation>
    page.tsx                    # Homepage — composes all 11 sections
    projects/
      [slug]/page.tsx           # Shell case-study page
    globals.css                 # Reset, theme vars, scroll-behavior
  components/
    IntroAnimation.tsx          # Full-viewport Lottie overlay
    Reveal.tsx                  # IntersectionObserver wrapper
    DeviceMockup.tsx            # CSS/SVG laptop + phone frames
    sections/
      Hero.tsx
      Journey.tsx
      FlagshipProjects.tsx
      MoreProjects.tsx
      Roadmap.tsx
      Journal.tsx
      LinkedInActivity.tsx
      GitHubActivity.tsx
      TechStack.tsx
      Contact.tsx
    ui/
      Nav.tsx                   # Sticky nav with anchor links
      ProjectCard.tsx
      Badge.tsx
  content/
    projects.ts                 # Flagship + more projects
    timeline.ts                 # Journey timeline entries
    roadmap.ts                  # Career/cert/skill items
    techstack.ts                # Languages / frameworks / tools / soft skills
    awards.ts
  lib/
    cn.ts                       # Tailwind class merge helper
public/
  hello-apple.lottie            # Moved from repo root
  face.png                      # Existing headshot
  resume.pdf                    # Copy of AMIRULHAZIQ_CV_updated.pdf
```

### Data flow
Static-only. Every section imports from `src/content/*.ts`. No API calls, no fetches, no client-side data loading in this iteration. Empty sections (Journal, LinkedIn Activity) render intentional placeholder copy — never "no data" errors.

---

## 5. Component Specs

### 5.1 `<IntroAnimation />` — the core ask

**File:** `src/components/IntroAnimation.tsx`
**Type:** Client component (needs `sessionStorage`, DOM APIs)
**Wraps:** entire site in `app/layout.tsx`, so overlay covers everything

**Contract:**
```ts
type Props = { children: React.ReactNode }
```

**Behavior:**
1. On mount, read `sessionStorage.getItem('intro-played')`.
   - Truthy → render children only, no overlay ever mounted.
   - Falsy → render fixed black overlay + Lottie, plus children beneath (initially opacity 0).
2. Overlay: `position: fixed; inset: 0; background: #000; z-index: 100; display: grid; place-items: center;`.
3. Lottie via `@lottiefiles/dotlottie-react` with `autoplay`, `loop={false}`, `src="/hello-apple.lottie"`.
4. On Lottie `complete` event:
   - `sessionStorage.setItem('intro-played', '1')`
   - Start 500ms opacity 1→0 ease-out on overlay
   - Simultaneously start 500ms opacity 0→1 + translateY 8px→0 ease-out on children
5. After 500ms → unmount overlay entirely (no invisible layer catching clicks).
6. While overlay present: `document.body.style.overflow = 'hidden'`; restore on unmount.
7. `prefers-reduced-motion: reduce` branch: skip Lottie, immediately mark `intro-played`, render children with no fade.

**SSR safety:** Overlay state is `null` on server; mounts client-side only. First paint is bare site; overlay pops on client hydration. Acceptable trade for perf and avoiding hydration mismatch. Alternative (server-render overlay always, hide with CSS if `intro-played` is set) is a client-only decision anyway since sessionStorage isn't accessible server-side.

**Failure modes:**
- Lottie fails to load → 3-second timeout falls back to marking `intro-played` and fading out anyway. No broken forever-black screen.
- User has JS disabled → overlay never mounts; site renders normally (acceptable — this is a portfolio, not a critical service).

### 5.2 `<Reveal />` — the "smooth scroll" component

**File:** `src/components/Reveal.tsx`
**Type:** Client component

**Contract:**
```ts
type Props = { children: React.ReactNode; delay?: number; className?: string }
```

**Behavior:**
1. On mount, attach IntersectionObserver with `threshold: 0.15`, `rootMargin: '0px 0px -60px 0px'`.
2. When element enters view → add `data-visible="true"` and disconnect observer (one-shot).
3. CSS transitions on `[data-visible]`:
   - `opacity: 0 → 1`
   - `transform: translateY(16px) → translateY(0)`
   - `transition: opacity 600ms ease-out, transform 600ms ease-out`
   - Optional `transition-delay` from prop
4. `prefers-reduced-motion: reduce` → element starts with `opacity: 1`, no transform, no transition.

**Usage:** Wrap each section body in `<Reveal>` on `page.tsx`. Hero is NOT wrapped — it fades in as part of the intro handoff.

### 5.3 Global scroll behavior

In `globals.css`:
```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

Nav anchors use `href="#section-id"`; browser handles the easing.

### 5.4 `<DeviceMockup />`

**File:** `src/components/DeviceMockup.tsx`
**Type:** Server component (pure JSX)

Two variants selected by prop: `variant: 'laptop' | 'phone' | 'both'`. Pure CSS/SVG frames — rounded rects, subtle shadows, notch shape for phone. Content area accepts `children` (screenshot component later; for now renders a "Coming soon" caption). When `variant='both'`, phone overlaps laptop's bottom-right corner per master spec.

---

## 6. Content Mapping (CV → Sections)

| Section | Source lines from CV | Rendering |
|---|---|---|
| Hero | Name, "Software Engineering Intern at RHB Group Digital", `jiku.my`, email, LinkedIn, GitHub | Big name, one-line role, current-status badge ("Interning at RHB · Group Digital"), 3 CTAs: Resume PDF / GitHub / LinkedIn |
| Journey | Summary paragraph + all Education/Experience entries + relevant Extracurricular | 2-sentence narrative (adapted from CV summary per master spec) + vertical timeline, chronological order per master spec §Journey |
| Flagship Projects | Master spec §3 + CV extracurricular | 5 cards: OncoTrace, BAC, RHB GO, C.A.R.I., Guidr/VERiQ-my. Each links to `/projects/[slug]` shell. **Note:** OncoTrace and Guidr appear in the master spec but not the current CV — spec assumes both are valid projects Amirul wants shown. If wrong, drop them and swap in CAKAPnBAYAR + Deriv trading coach as flagships. |
| More Projects | Remaining project entries | FST iPad Loan, KIZ Mobile, CAKAPnBAYAR, FYP B40 Finance App, Deriv AI trading coach ext. Smaller cards |
| Roadmap | Certification section | AWS SAA-C03 (in progress), Apple Swift Associate (done Sept 2025), Solution Architect goal |
| Journal | Empty | Renders "Coming soon — personal writing lives here" |
| LinkedIn Activity | Empty | Renders "Recent posts sync coming soon" (never shown after cron is live in Iteration 4) |
| GitHub Activity | GitHub URL | `https://ghchart.rshah.org/mirulhaziq` `<img>` embed + link |
| Tech Stack / Certs / Awards | Technical Skills + Certification + Awards & Honors | Grouped tag rows (Languages / Frameworks / Tools / Soft) + badges for 2nd place ×3, Best Facilitator |
| Contact / Footer | Contact block | Email, LinkedIn, GitHub, Resume PDF |

**No fabrication rule** (from `ai-context.md`): every metric and claim comes from the CV verbatim or from the master spec. Unverified numbers stay out.

---

## 7. Visual System

### Color tokens (CSS vars, applied via Tailwind)
```
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
    --accent: #0a84ff;   /* Apple's dark-mode blue */
    --card: #141414;
    --border: rgba(255, 255, 255, 0.08);
  }
}
```

### Typography
System font stack — `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif`. Zero web font load, zero CLS. Hero name at ~clamp(2.5rem, 6vw, 4.5rem), tight tracking.

### Spacing rhythm
Section padding: `py-24 md:py-32`. Content max-width: `max-w-5xl` (measured feel, not full-bleed). Card radii: 16px. Hero surface radii: 24px. Blur: `backdrop-blur-xl` on nav and floating cards.

### Motion tokens
- Intro fade: `500ms ease-out`
- Reveal fade+lift: `600ms ease-out`
- Hover transitions: `150ms ease-out`

---

## 8. Testing & Verification

### Manual verification checklist (before I say "done")
1. `npm run dev` boots without errors
2. First load in a fresh incognito tab → intro plays, fades to Hero
3. Navigate to another anchor → no intro replay
4. Close tab, reopen → intro replays (fresh session)
5. Set `prefers-reduced-motion: reduce` in devtools → intro skipped, reveals disabled
6. Toggle OS dark mode → theme flips without reload
7. Every nav anchor scrolls smoothly to its section
8. Each section fades/lifts once when scrolled to
9. Mobile viewport (375px) → nothing overflows horizontally
10. Lighthouse (mobile, prod build) → Performance ≥ 95, Accessibility ≥ 95
11. Every CTA link resolves (Resume PDF, GitHub, LinkedIn, mailto)
12. Vercel deploy succeeds; live URL loads intro on first visit

### Not in this iteration
- No unit / integration / E2E tests. If you want Playwright coverage of the intro sessionStorage logic, that's a follow-up.

---

## 9. Success Criteria

Done means:
- Live at a Vercel URL you can share with a recruiter today
- Intro plays once per session, fade transition feels smooth (subjective — you approve)
- Scroll reveals feel intentional, not laggy
- Site holds up on both mobile (375px) and laptop (1440px)
- Lighthouse Performance ≥ 95 mobile
- No console errors, no broken links, no placeholder that looks like a bug

---

## 10. Known Risks & Trade-offs

| Risk | Mitigation |
|---|---|
| SSR flash before intro overlay mounts client-side | Accepted; alternative (blocking SSR) hurts perf more than the ~50ms flash hurts polish |
| Lottie asset fails to load on slow network | 3-second timeout falls back to marking played + fading out |
| Recruiter revisits mid-day and sees intro again (new session) | Chosen behavior — dramatic first impression per visit, still short (~2s Lottie) |
| Case-study shells look empty | "Write-up in progress" copy per `ai-context.md`, structured layout so it reads as intentional |
| System font stack renders differently on Windows vs. macOS | Acceptable — better than font-load CLS |

---

## 11. Handoff

After user reviews and approves this spec:
1. Invoke `superpowers:writing-plans` skill to produce an implementation plan.
2. Plan will break the work into ordered, verifiable steps.
3. Implementation happens under a separate skill invocation, following the plan.
