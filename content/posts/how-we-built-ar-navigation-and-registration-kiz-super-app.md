---
title: "How we built AR navigation and registration in the KIZ Super App"
date: "2026-09-19"
tags: [AR, Next.js, campus, architecture]
---

Kolej Ibu Zain used to run on WhatsApp groups, paper forms, and notice boards. The KIZ Super App puts residents and college staff on one Next.js app instead. This post is the architecture behind that: how we structured the code, what shipped, how registration unlocks a student, and how the AR directory keeps its arrow steady on a real phone.

## How the app is put together

The app is Next.js App Router with React 19 and an MUI design system. Data lives in PostgreSQL through Prisma 7. Auth.js handles credentials login with a JWT session. Mutations go through Server Actions, and a shared RBAC layer decides what each role can touch: `superadmin`, `admin_kiz`, `pengetua`, `fellow`, `ahli`, and `staf`.

Product truth sits in `docs/SPEC.md`. Build truth sits in `docs/STATUS.md`. Coding rules live in `AGENTS.md`. That split keeps the team from arguing about whether a bug is unfinished product or unfinished code.

Identity is the matric ID, not email. The eKolej intake CSV has no email column, so email only proves UKM ownership. Matric on the active intake proves the person belongs at KIZ. Leaflet for the AR mini-map and OSRM for walking paths are deliberate free-map exceptions. We never pulled in a paid map SDK.

## What the product covers

On the account side, students and staff self-register at `/daftar`, verify through Resend, and land in a pending state until their matric shows up on the active intake. Superadmins can also send invite links that freeze email and role. Profile pages, role dashboards, and intake reconcile all hang off that same matric key.

Day-to-day campus life sits in the middle of the app. Kad Maya is a digital resident card with a QR for the gate and the office. Students book facilities and guest houses, submit accommodation preferences, and check in at the counter with a QR session and a digital signature. Admins approve bookings, allocate beds, and export attendance when they need a paper trail.

Ops tools sit beside that. Helpdesk mixes live chat with structured tickets. KIZ-AI answers from announcements, facilities, and FAQ content, then hands off to helpdesk when it is stuck. Announcements, a digital PDF guide, community chat, parcels, lost and found, events, and a few living widgets fill out the resident home. App settings keep logos, card art, and check-in directions editable without a redeploy.

Wayfinding is the AR Directory: camera, compass arrow, live distance, a Leaflet mini-map, OSRM foot paths outdoors, and a Google Maps fallback when sensors are missing. Payment gateways, smart locks, and a marketplace stayed out of scope on purpose.

## Architecture

![KIZ Super App architecture: clients, Next.js app, Postgres, and external services](/blog/kiz-architecture.svg)

Clients hit a Next.js shell. `proxy.ts` guards routes. Role pages call Server Actions through shared RBAC. Feature modules all write through Prisma, with uploads for signatures and PDFs. Outside the core, Resend sends mail, OSRM and OpenStreetMap handle walking paths and tiles, Google Sheets syncs intake, and Gemini or Ollama powers the concierge.

## Registration without the spreadsheet chaos

![Registration states: unverified to pending to active](/blog/kiz-registration-states.svg)

Self-register creates an unverified account. The Resend link moves it to pending. Matching matric against the active intake moves it to active. Email domain picks a default role (`@siswa.ukm.edu.my` for students, `@ukm.edu.my` for staff), and invites can override that. Matric strings run through one normaliser so trailing junk from eKolej exports still match. Admin-created accounts skip verify and land on active.

## Keeping the AR arrow honest

Admins pin destinations with lat/lng, type, indoor flag, and a verified mark. A student picks a place, sees a short permission explainer the first time, then opens the camera.

While they walk, the phone smooths compass heading, measures distance with haversine, and aims at the next OSRM waypoint. Indoors, or when the destination is already close, the arrow switches to a straight bearing so road snapping does not pull them into the wrong entrance. The SVG arrow rotates through `requestAnimationFrame` refs so React is not re-rendering every frame. When they are close enough, the phone buzzes, and a Google Maps link stays available as backup.

## What I would keep

Ship one campus workflow that has to work in a real hallway. Keep paid map SDKs out until the free path fails. Put matric normalisation and account status in shared libs so login, registration, check-in, and intake sync cannot drift. Keep SPEC and STATUS honest so the next person knows what is done versus what still shakes on a real phone compass.
