---
title: "How we built AR navigation and registration in the KIZ Super App"
date: "2026-09-19"
tags: [AR, Next.js, campus, architecture]
---

Kolej Ibu Zain used to run on WhatsApp groups, paper forms, and notice boards. The KIZ Super App puts residents and college staff on one Next.js app instead. This post covers the coding approach, every module that shipped, how registration works, and how the AR directory is wired.

## Stack and coding rules

- **App:** Next.js App Router, React 19, MUI design system
- **Data:** Prisma 7 on PostgreSQL
- **Auth:** Auth.js credentials (matric ID + password), JWT session
- **Mutations:** Server Actions behind shared RBAC helpers
- **Roles:** `superadmin`, `admin_kiz`, `pengetua`, `fellow`, `ahli`, `staf`
- **Ops notes:** product truth in `docs/SPEC.md`, build truth in `docs/STATUS.md`, coding rules in `AGENTS.md`

Identity is the matric ID, not email. The eKolej intake CSV has no email column, so email only proves UKM ownership. Matric on the active intake proves the person belongs at KIZ.

Leaflet (AR mini-map) and OSRM (walking paths) are deliberate free-map exceptions. No paid map SDK.

## Feature map

Everything below is in the live product scope.

### Account and access

1. Auth and profile — matric login, role dashboards, editable profile
2. Self-registration — `/daftar`, email domain picks student vs staff, Resend verify link
3. Invitations — superadmin invite links (bulk or one-off) that freeze email and role
4. Intake reconcile — CSV / Sheets intake unlocks `pending` students when matric matches

### Living on campus

5. Kad Maya — digital resident card with QR for gate and office checks
6. Facility booking — slots, admin approval, PDF booking slip
7. Guest house booking — daily / weekly / monthly, approval, manual payment flag, check-in and out
8. Accommodation applications — single / double roommate / flexible preference; admin allocates real beds
9. QR counter check-in and check-out — session QR, digital signature, room reveal, Excel / CSV export
10. In-app check-in — same signature flow for students who already have an account

### Day-to-day ops

11. Helpdesk — live chat plus structured tickets, status lifecycle, office open badge
12. KIZ-AI concierge — RAG over announcements, facilities, FAQ; handoff to helpdesk when stuck
13. Announcements — tags, pin, schedule, expiry, attachments, acknowledge flow
14. Digital guide — PDF library with per-user "New" badge
15. Community chat — one room, reactions, replies, reports, presence
16. Parcel tracker — admin registers parcel to matric; student marks collected
17. Lost and found — photo reports with KIZ location picker
18. Events and living widgets — dashboard Things to Do, emergency contacts, upcoming activities
19. App settings — logo, student-card art, check-in directions image

### Wayfinding

20. AR Directory — camera + compass arrow + distance; Leaflet mini-map; OSRM foot paths outdoors; Google Maps fallback when sensors are missing

Out of scope on purpose: payment gateways, smart locks, marketplace.

## Architecture

![KIZ Super App architecture: clients, Next.js app, Postgres, and external services](/blog/kiz-architecture.svg)

Clients hit a Next.js App Router shell. `proxy.ts` guards routes. Role pages call Server Actions through shared RBAC. Auth.js keeps a JWT session. Feature modules (bookings, helpdesk, AR, registration, check-in) all write through Prisma to PostgreSQL, with uploads for signatures and PDFs.

External pieces stay thin: Resend for mail, OSRM + OpenStreetMap for walking paths and tiles, Google Sheets for intake sync, and Gemini or Ollama for the KIZ-AI concierge.

## Registration state machine

![Registration states: unverified to pending to active](/blog/kiz-registration-states.svg)

Email domain maps role (`@siswa.ukm.edu.my` → `ahli`, `@ukm.edu.my` → `staf`). Invites can override domain rules. Matric strings run through one normaliser so trailing `*` from eKolej exports still match.

Admin-created accounts skip verify and land on active.

## AR Directory loop

1. Admin pins destinations (`Destination` rows: lat/lng, type, indoor, verified).
2. Student picks a place, then opens camera (permissions explained once first).
3. Each frame: smooth compass heading, haversine distance, bearing to next OSRM waypoint (or straight line if indoor / under ~60 m).
4. SVG arrow rotates via `requestAnimationFrame` refs so React does not re-render at 60 fps.
5. Arrive at ~15 m; haptic buzz; Google Maps link stays available as backup.

## What I would do the same again

Ship one campus workflow that has to work in a real hallway. Keep paid map SDKs out until the free path fails. Put matric normalisation and account status in shared libs so login, registration, check-in, and intake sync cannot drift. Keep SPEC and STATUS honest so the next person knows what is done versus what still shakes on a real phone compass.
