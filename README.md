# Claude Mastery — Zero to Operator

The complete, hands-on course on Claude, built to take you from no prior knowledge to genuine mastery — and then to income. Plain English, world-class visuals, interactive labs, and real 2026 numbers.

It is a single-page web app with **no build step and no dependencies**. Open it in a browser and it runs.

## What is inside

- **88 lessons** across **14 tracks** and **5 phases** (Foundations → The Craft → Power User → Builder → Operator).
- **6 interactive labs** — a temperature sampler, a tokenizer, a model chooser, a unit-economics/caching calculator, an agent-loop stepper, and a pricing comparator. You move the levers yourself.
- **15 inline diagrams** — next-token prediction, the context window, the model family, the agent loop, MCP wiring, the lethal trifecta, tool-use, caching economics, and more.
- **215-term glossary** that also powers the dotted-underline **tooltips** inside every lesson (first occurrence of each term is linked automatically).
- **14 cheat sheets** — one dense, printable card per track, two-way linked to the tracks.
- **29 interview questions** (easy / medium / hard) with full model answers — the kind asked in AI-native job interviews and by paying clients.
- **Flashcards** with a Leitner spaced-repetition schedule (1 / 3 / 7 / 21 / 60 days).
- **Read-aloud** (Listen button), a **command palette** search (Ctrl/⌘-K), a **progress ring**, streaks, and a phase-by-phase **roadmap**.

Every lesson follows the same deep structure: a one-breath summary, a hook, teaching sections, a narrated worked example, a "do it for real" lab, common mistakes, a self-check quiz, graduated practice (warm-up / transfer / stretch), a pocket recap, a spaced-review callback, and a deep-dive for the curious.

Phases D and E include hands-on money content and five portfolio-grade **capstones**: a personal automation suite, a client-ready document pipeline, an MCP server, a deployable API micro-product, and a 30-day income launch plan.

## Running it locally

No install needed — just open `index.html`. If your browser blocks the local script loads when opened as a file, serve the folder over HTTP instead:

```
python3 -m http.server 8080
# then visit http://localhost:8080
```

(The scripts load in order via relative paths, so any static file server works.)

## Deploying

See `DEPLOY.md` for step-by-step GitHub Pages instructions (the whole thing is static, so it deploys as-is).

## Project structure

```
index.html            # loads everything, in order
styles.css            # the "Ember Loom" design system (dark, warm, no build)
curriculum.js         # single source of truth: phases, tracks, lesson list, PB() helper
app.js                # the engine: router, sidebar, hero animation, lesson renderer,
                       # quiz, tooltips, flashcards, read-aloud, search, progress
content/
  track01..track14.js # the 88 lessons (one file per track)
  diagrams.js         # inline SVG diagrams, keyed by lesson id
  widgets.js          # interactive labs, keyed by lesson id
  glossary.js         # 215 terms (definitions + tooltip source)
  cheatsheets.js      # one reference card per track
  interview.js        # the interview bank
tools/
  check_track.js      # integrity checker for the lesson content
```

## Verifying content integrity

A small checker validates every lesson (required fields, quiz answer indices, no broken markup):

```
node tools/check_track.js content/track01.js      # one track
npm run verify                                     # all tracks
```

## A note on facts

Fast-moving facts (prices, plans, salary ranges, certifications, the product surface) are stamped **"as of July 2026"** in the lessons and were verified against official documentation at build time. Markets and products move — verify current specifics at the source before you rely on a number. The interactive calculators use clearly-labeled *illustrative* rates for intuition, not official pricing.

## Design

The look is a custom theme called **Ember Loom** — deep espresso background, warm ember / amber / gold accents with teal and violet counterpoints, and a self-healing woven-thread hero animation. Dark, colorful, and readable, with no white or pale chrome.

Built to be the best course on Claude in the world. Learn it end to end, do the labs, ship the capstones, and go earn.
