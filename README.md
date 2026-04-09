# TribeBills

> Group bill-splitting platform — iOS app, web app, and shared backend — built and operated by a single engineer.

**Live:** [tribebills.com](https://tribeapp-frontend.vercel.app) · **App Store:** [TribeBills on iOS](https://apps.apple.com/app/tribebills)

---

## What It Is

TribeBills is a multi-surface product for group expense management: splitting bills, tracking payments, managing subscriptions, scanning receipts with AI, and coordinating across members on different devices. It runs across three layers, all designed, built, deployed, and operated by me.

This repository contains the **marketing site and landing page** (Next.js, React, TypeScript, Tailwind CSS). The full product backend and iOS app are in private repositories — see the architecture overview below for technical detail on the complete system.

## System Architecture

```
┌─────────────┐   ┌─────────────┐   ┌──────────────────┐
│  iOS App     │   │  Web App    │   │  This Repo       │
│  SwiftUI     │   │  Next.js    │   │  Landing Page    │
│  VisionKit   │   │  React/TS   │   │  Next.js/TS      │
└──────┬───────┘   └──────┬──────┘   └──────────────────┘
       │                  │
       └────────┬─────────┘
                │
       ┌────────▼────────┐
       │  FastAPI Backend │
       │  50+ endpoints   │
       │  Gunicorn/Uvicorn│
       └────────┬─────────┘
                │
       ┌────────▼────────┐     ┌──────────────┐
       │  PostgreSQL 15   │     │  Gemini AI   │
       │  SQLAlchemy/     │     │  Receipt OCR │
       │  Alembic         │     │  Pipeline    │
       └─────────────────┘     └──────────────┘
```

### Client Layer

**iOS App** — SwiftUI with MVVM architecture. VisionKit document scanner feeds into a multimodal receipt parsing pipeline. Firebase Auth for identity, transitioning toward the PostgreSQL-backed API as the source of truth. Push notifications via APNs.

**Web App** — Next.js, React, TypeScript, Tailwind CSS. Zustand for state management. Google OAuth, Apple Sign-In, and a guest-to-registered user promotion flow. The web surface is critical for join-by-link: a user receives an invite, lands on the web, joins a tribe as a guest, and participates before ever creating an account.

### API Layer

**FastAPI** on Gunicorn with Uvicorn workers, containerized in Docker. 50+ endpoints across seven route modules: users, tribes, bills, payments, subscriptions, recurring bills, and dashboard/analytics. Key features:

- JWT access + refresh token rotation with revocation
- Apple Sign-In and Google ID token verification
- Guest identity system (`X-Guest-ID` header) with promotion to registered user
- Stripe Checkout integration with webhook handling and tier-based usage gating
- Rate limiting via SlowAPI with environment-aware thresholds
- Recurring bill processing via in-container cron

### Data Layer

**PostgreSQL 15** via SQLAlchemy 2.x ORM with Alembic migrations. 10+ tables supporting soft deletes, guest-to-user promotion, subscription tier enforcement, and parent-child recurring bill schedules.

### AI / ML Pipeline

Receipt intelligence pipeline:
1. Image capture (VisionKit on iOS, file upload on web)
2. EXIF orientation correction via Pillow
3. Multimodal extraction via Google Gemini 2.0 Flash Lite — structured JSON output (items, tax, total, shop name)
4. Optional post-OCR categorization against the platform's taxonomy
5. Separate pipeline for payment proof parsing (amount, date, method, transaction ID)

Each AI call is wrapped in a **circuit breaker** (3-failure threshold, 30–60s recovery). On breaker open, the user can still create bills manually. Token costs reduced ~60% through chunking strategies, prompt tuning, and cost monitoring.

### Infrastructure

| Component | Stack |
|-----------|-------|
| Hosting | Self-managed Linux VPS |
| Containers | Docker + docker-compose (app + PostgreSQL 15 Alpine) |
| Reverse proxy | Nginx with TLS termination |
| CI/CD | Coolify |
| Monitoring | Mixpanel with non-blocking middleware and its own circuit breaker |
| Push | APNs via aioapns with device token management |

## Key Engineering Decisions

**Firebase → PostgreSQL migration.** The iOS app started on Firebase. As the product matured, I migrated the authoritative data layer to PostgreSQL for relational flexibility, proper constraints, and reporting. A `MigrationManager` in the iOS codebase handles one-time data transfer. Firebase Auth is retained for identity.

**Guest identity system.** Core product requirement: someone receives a bill-split link but has no account. The web frontend creates a guest identity (UUID), stores it locally, passes it via header. The guest can join tribes, view bills, and participate. On registration, the backend promotes the guest record — preserving history, splits, and memberships.

**Freemium gating.** Stripe manages subscriptions. Tier limits (max tribes, monthly bills, recurring bill access) are enforced at the API layer with HTTP 403 payloads that clients parse into upgrade prompts.

## This Repository

The landing page is built with:

- **Next.js** + **React** + **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- Responsive design, dark mode support, contact form, FAQ, feature showcase

## What This Demonstrates

- Full-stack ownership across iOS (SwiftUI), web (Next.js/React/TypeScript), backend (Python/FastAPI), database (PostgreSQL), and infrastructure (Docker/Nginx/CI/CD)
- Production AI integration with real failure handling — circuit breakers, fallbacks, cost controls
- Architectural evolution of a live system (Firebase → PostgreSQL) without downtime
- Product thinking embedded in engineering: guest flows, freemium gating, join-by-link, upgrade prompts
- Solo operation of a multi-surface production platform

---

*Built and operated by Abinash Karki. Backend and iOS repositories are private as TribeBills is a live product with real users.*
