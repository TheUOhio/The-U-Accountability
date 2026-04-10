
# the U — Accountability App

## Overview
"the U" is a mobile-first HTML/CSS/JS web app that helps users break free from porn addiction through accountability, scripture, daily tracking, and milestone badges.

## Branding
- **Name:** the U
- **Logo:** Circular black badge with white condensed text — "the" in lowercase light weight, "U" in bold uppercase
- **Design language:** Dark, minimal, bold. Inspired by the logo's aesthetic.
- **Color scheme:** Pure black background (#0a0a0a), white text, minimal color accents (green for success, red for falls, gold for badges)
- **Typography:** Inter font, heavy weights (700-900), uppercase headings, wide letter-spacing

## Tech Stack
- **Single-page HTML app** — all code in `index.html` (inline CSS + JS)
- **No backend** — localStorage under key `theu_data`
- **PWA-ready** — `manifest.json` for home screen install
- **Mobile-first** — safe-area-inset support for iPhone notch

## App Structure (Screens)
All screens are `<div class="screen">` toggled via JS:

1. **Setup Screen** (`#setup-screen`) — 3-step onboarding:
   - Step 1: Welcome with "the U" logo + Import Data option for returning users
   - Step 2: Add accountability partners (name + phone)
   - Step 3: Enter name and "why" statement

2. **Dashboard** (`#dashboard-screen`):
   - **Hamburger menu** (top-left) — opens slide-out drawer with Resources and Settings
   - Greeting + streak counter
   - **SOS Button** — pulsing circle, opens SOS modal
   - **Check-in** — split into two sections:
     - ✓ "Stayed Pure Yesterday" — marks **yesterday** as clean, disappears once tapped
     - ✗ "I Fell" — marks **today** as fell, always available, tracks fall count per day
     - Each triggers an encouragement message (slide-down banner)
     - Clean check-ins: victory encouragements
     - Falls: grace encouragements (no condemnation)
   - Next badge progress card

3. **Calendar** (`#calendar-screen`):
   - Stats: current streak, best streak, total clean days
   - Monthly grid — tap to cycle: empty → clean (green ✓) → fell (red ✗) → empty
   - Days before `setupDate` are locked/dimmed
   - Calendar changes trigger badge checks
   - Navigate months with arrows

4. **Badges** (`#badges-screen`):
   - Grid of 11 milestones based on consecutive clean days
   - Earned badges glow gold; locked badges are dimmed
   - Badge popup appears when a new milestone is hit

5. **Resources** (`#resources-screen`) — accessed via hamburger drawer:
   - Community — under construction
   - Prayer — under construction
   - Bible — links to YouVersion (Bible.com)
   - Worship — under construction

6. **Settings** (`#settings-screen`) — accessed via hamburger drawer:
   - Edit name and "why"
   - Manage partners
   - Export data (downloads JSON backup file)
   - Import data (restores from JSON backup file, with confirmation)
   - Reset all data

7. **SOS Modal** (`#sos-modal`):
   - Random Bible verse (20 curated, purity/temptation themed)
   - User's "why" statement
   - "Text My Friend" — shows a button for each partner, opens native SMS via `sms:` protocol

## Badge Milestones
| Badge | Days | Icon |
|-------|------|------|
| First Step | 1 | 🌱 |
| 3 Day Warrior | 3 | ⚔️ |
| One Week | 7 | 🔥 |
| Two Weeks | 14 | 💪 |
| Three Weeks | 21 | 🛡️ |
| One Month | 30 | ⭐ |
| Two Months | 60 | 🌟 |
| Three Months | 90 | 👑 |
| Six Months | 180 | 🏔️ |
| Nine Months | 270 | 🦅 |
| One Year | 365 | 🏆 |

## Data Model (`localStorage` key: `theu_data`)
```json
{
  "setupComplete": true,
  "setupDate": "YYYY-MM-DD",
  "userName": "string",
  "userWhy": "string",
  "partners": [{ "name": "string", "phone": "string" }],
  "checkedDays": { "YYYY-MM-DD": "clean" | "fell" },
  "fellCounts": { "YYYY-MM-DD": number },
  "earnedBadges": { "day1": true },
  "shownBadges": { "day1": true }
}
```

Note: `checkedDays` values changed from `true` to `"clean"` | `"fell"` to support the ✓/✗ check-in system.

## Development Rules
- **NEVER break existing user data.** When adding new fields to the data structure, always provide fallback defaults (e.g. `appData.newField || []`). Never rename or remove existing fields without migration code. Never change the localStorage key (`theu_data`).
- **If a change has ANY potential to lose user data, stop and ask the user before proceeding.**
- **Version every release.** Tag each release with a semantic version (e.g. `v1.0.0`). Add a git tag when pushing to main.
- **Maintain the changelog.** Every commit to main must have a corresponding entry in the Changelog section below.
- **Always update CLAUDE.md.** Any feature addition, removal, or structural change must be reflected in this file before committing.

## Current Version
**v1.7.0** — Service worker for offline support and auto-updates (2026-04-10)

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| v1.7.0 | 2026-04-10 | Added service worker (`sw.js`) for offline support and automatic updates. Network-first strategy ensures users always get the latest version. Added 4 missing Bible verses (24 total). |
| v1.6.0 | 2026-04-10 | Moved Resources and Settings into a hamburger drawer menu (slides from left). Bottom nav reduced to 3 tabs: Home, Calendar, Badges with full names. |
| v1.5.0 | 2026-04-02 | Reworked check-in: "Stayed Pure" now marks yesterday (disappears once used), "I Fell" marks today (always available, tracks fall count). Calendar locks days before setup date. Calendar changes trigger badge checks. Added `setupDate` and `fellCounts` to data model. |
| v1.4.0 | 2026-04-02 | Added Import Data option on setup welcome screen for returning users restoring a backup. |
| v1.3.0 | 2026-04-02 | SOS modal now shows a button for each partner so user can pick who to text. |
| v1.2.0 | 2026-04-02 | Added export/import data feature in Settings for backing up and restoring user data. |
| v1.1.0 | 2026-04-02 | Added Resources tab (Community, Prayer, Bible/YouVersion link, Worship — most under construction). Changed "Text My Partner" to "Text My Friend". SMS now uses first name only, removed "via the U" branding from message. |
| v1.0.0 | 2026-03-25 | Initial release — setup flow, dashboard with SOS button, check-in (clean/fell) with encouragement, calendar with streak tracking, badge milestones, settings, PWA manifest |

## Key Design Decisions
- **SMS via `sms:` protocol** — no backend needed
- **Check-in has two options** — ✓ (stayed pure) and ✗ (I fell), with different encouragement messages for each
- **Encouragement system** — 10 victory messages, 8 grace messages (for falls — no shame, only grace)
- **Badges earned on streak** — consecutive clean days, popup celebration when earned
- **Calendar tri-state** — days cycle through: unchecked → clean → fell → unchecked
- **No Google Fonts dependency for logo** — logo is pure CSS text

## File Inventory
| File | Purpose |
|------|---------|
| `index.html` | Entire app (HTML + CSS + JS) |
| `manifest.json` | PWA manifest for home screen install |
| `sw.js` | Service worker — offline support + auto-updates |
| `CLAUDE.md` | This file — project context for AI assistance |

## Future Enhancement Ideas
- **"the U" logo as home screen icon** — create icon-192.png and icon-512.png from the logo for PWA install
- **"More Verse" button** — add a button in the SOS modal to cycle to another random verse without closing
- **Home screen install instructions** — during setup, show the user step-by-step how to save the app to their home screen (iPhone and Android)
- ~~Service worker for offline support~~ (done in v1.7.0)
- ~~App icons (icon-192.png, icon-512.png)~~ (covered by logo home screen icon above)
- ~~Text all partners (currently first partner only)~~ (done in v1.3.0)
- Daily reminder notifications
- Journal/notes feature
- ~~Export/share streak data~~ (done in v1.2.0)
- Animated confetti on badge earn
