# Changelog

All notable changes to **Claude Mastery — Zero to Operator**, newest first.
Facts (prices, model names, limits) live in `content/facts.js`, each stamped with
the date it was last checked against Anthropic's own pages. When a fact changes,
update `facts.js` **and** add a line here.

The format loosely follows [Keep a Changelog](https://keepachangelog.com/).

---

## 2026-08-01

### Added
- **Living currency engine.** Every volatile fact (plan prices, model lineup, API
  rates, limits) now lives in one file, `content/facts.js`, each with a `asOf`
  date and an official source link.
- **Current facts page** (`#current`) — a single verified fact sheet, with a
  per-fact "verified / review-due" chip and source links.
- **Verified badges on lessons.** Any lesson carrying time-sensitive facts shows a
  "✓ Verified · <date>" badge that flips to "⚠ Review due" once the fact passes its
  staleness window, and links to the Current facts page.
- **Scheduled currency check** (`.github/workflows/currency-check.yml`) — a monthly
  GitHub Action that flags any fact past its review window and opens/updates a
  tracking issue, plus a best-effort reachability check of the source pages.
- **Real spaced-retrieval engine (SM-2).** The flashcard deck is now a proper
  "due today" queue over your one-breath summaries, quiz questions, and glossary
  terms — cards are seeded as you complete lessons, new cards enter at a daily cap
  so the queue never floods, four grades (Again/Hard/Good/Easy) schedule by your
  own performance, and the number of cards due is surfaced in the nav and on the
  home hero so returning learners get pulled back into the loop.
- **The essential path (core spine).** A curated 16-lesson fast track — one pivotal
  lesson from every part of the course — with its own page (`#spine`), a home-hero
  banner, and "★ essential" tags in the track view, so 88 lessons feel finishable.
- **Milestone celebrations.** One-time toasts for your first lesson, each phase,
  the essential path, streak marks (3/7/30 days), and 25/50/100% completion.

### Verified (checked 2026-08-01 against Anthropic's pages)
- **Plans:** Free $0 · Pro $20/mo ($17 annual) · Max 5× from $100/mo · Max 20× from
  $200/mo · Team $25/seat ($20 annual), Premium seat $125 ($100 annual) ·
  Enterprise $20/seat self-serve or custom.
- **Frontier models:** Claude **Fable 5** (`claude-fable-5`, flagship, GA 2026-06-09),
  **Opus 5**, **Sonnet 5**, **Haiku 4.5**.
- **API (per 1M tokens):** Fable 5 $10/$50 · Opus 5 $5/$25 · Sonnet 5 $3/$15
  (introductory $2/$10 through 2026-08-31) · Haiku 4.5 $1/$5.
- **Limits:** up to 1,000,000-token context (frontier models; Haiku 4.5 is 200k);
  usage metered in 5-hour rolling sessions.
- Corrected model lineup away from third-party "Opus 4.8/Sonnet 4.6" figures, which
  were already stale versus Anthropic's official models page.

## 2026-07-22

### Added
- **AI tutor / grader loop** on every lab — a copy-paste grading rubric prompt and a
  Socratic "coach me when I'm stuck" prompt, turning each lab into produce → grade →
  revise.
- **Durable progress**: one-click Export / Restore of all progress as a JSON backup.
- **Real PWA**: web manifest, offline service worker, installable icons.
- **"Continue where you left off"** now resumes at your last lesson everywhere, and
  the streak counter also credits reading and flashcard days (not just completions).

## 2026-07-21

### Added
- Initial release: 88 lessons across 14 tracks, interactive labs, verified SVG
  diagrams, glossary, cheat sheets, interview bank, and flashcards.
