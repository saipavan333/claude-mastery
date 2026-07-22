# Adding Videos to Claude Mastery — a free-first production guide

This guide is tailored to the choices you made: **screen-recorded demos + animated explainers + a cinematic intro**, fronted by an **AI avatar (face + voice)**, starting with **a few flagship videos**, on a **free-first budget** — and running on **Windows**.

The course is already **video-ready**: each lesson can hold a video, and the app renders it in a clean, responsive 16:9 player. You just produce the clips and drop them in (see the last section). Everything below is the *how*.

> A note on the numbers here: free-tier limits and prices change often. The figures below are approximate for 2026 — confirm the current limits on each tool's own site before you commit, the same way the course itself stamps facts "as of July 2026."

## The honest trade-off, and how the plan resolves it

A polished AI avatar (HeyGen) is not free at volume — its free tier is watermarked and capped at a few short videos a month. That normally conflicts with "free-first." What rescues it is your *other* choice: **starting with just a few flagship videos.** A handful of short avatar clips fits inside HeyGen's free tier. So the free-first pilot works precisely because it's small. If you later decide to put an avatar on many lessons, budget about **$29/month** (HeyGen Creator) at that point — not before.

## The three video types, and the free way to make each

### 1. Screen-recorded product demos (the highest-value type)

Showing the real Claude app, Cowork, Claude Code, and MCP in action is where the actual teaching happens. This is entirely free on Windows.

- **Capture:** **OBS Studio** (free, open-source, Windows). Record your screen at 1080p while you drive Claude through the exact task the lesson teaches. Keep clips short and focused — one idea per clip.
- **Polish (optional, free):** **Clipchamp** ships with Windows 11 (trim, captions, zoom) — enough for basic cleanup. **DaVinci Resolve** (free) is the step up if you want real editing.
- **Tip:** zoom in on what matters. Viewers can't read tiny UI. Record at a comfortable pace, then speed up dead time in editing.

### 2. Animated concept explainers (nearly free — reuse what you already have)

Your course *already contains* animated explainers: the SVG diagrams (next-token prediction, the agent loop, MCP wiring, the lethal trifecta) and the interactive widgets (temperature sampler, tokenizer, cost calculator, agent-loop stepper). Don't rebuild them — **screen-record them.**

- Open the relevant lesson, **record the diagram/widget with OBS** while you move the levers (slide the temperature, step the agent loop, type into the tokenizer), and narrate what's happening.
- The result is an on-brand animated explainer at zero extra production cost, and it doubles as a demo of the course itself.
- For fancier motion graphics later, **Canva** (free tier) or **DaVinci Resolve** can add titles and transitions — but the built-in animations are already the hard part.

### 3. The cinematic intro (one short clip)

You wanted a short sizzle for the landing page. Two free-ish paths:

- **Free and on-brand (recommended):** screen-record your existing **woven-thread hero animation** (the canvas on the home page) in OBS, add your title text and a music bed in Clipchamp/DaVinci. It already looks cinematic and it's 100% free.
- **AI-generated:** **Kling** and **Luma Dream Machine** offer free daily credits — enough for a few short generated clips if you want AI b-roll. Expect trial-and-error and possible watermarks on free tiers. Reserve this for one 10–15s hero shot; don't spend real effort here.

## The avatar (your narrator's face + voice)

- **Tool:** **HeyGen** free tier. Pick a stock avatar, paste your script, and it generates a talking-head clip that speaks your words. Use it for **intros/outros** and the flagship lessons — a face at the start, then cut to the screen demo.
- **Free-tier reality:** roughly a few short videos per month, 720p, watermarked (verify current limits). That's fine for the pilot. If you outgrow it, HeyGen Creator is ~$29/mo, or drop the avatar and narrate screen demos with a voiceover instead.
- **Voiceover-only alternative (also free):** if the avatar's free limits pinch, narrate with **ElevenLabs** free tier (~10 minutes of very natural speech per month) or record your own voice into OBS. You keep the avatar for the intro and use voiceover for the body — a common, cost-smart pattern.

## Free hosting (don't put video files in the Git repo)

GitHub Pages has file-size and bandwidth limits, so **do not commit 88 MP4s.** For a free-first pilot:

- **YouTube — unlisted** (recommended free option): upload each clip as *unlisted* (not public, not searchable), copy its **embed URL**, and paste it into the lesson (below). Free, unlimited, reliable, and the app embeds a clean player. Trade-off: a small YouTube logo and "suggested videos" at the end.
- **Vimeo** free/basic: cleaner player, stricter free storage limits.
- **A few small files only:** if you have just one or two short clips, you *can* self-host them — put the `.mp4` in a `media/` folder in the repo and reference it as a file (below). Keep each under ~50 MB and the total modest.
- **When you scale/monetize:** **Bunny Stream** or **Cloudflare Stream** (~$1–5/mo) give an ad-free, branded player without repo bloat. Worth it once the course earns.

## How to add a video to a lesson (the integration is already built)

Each lesson lives in `content/trackNN.js` as `L["x.y"] = { ... }`. Add a `video` field. Two forms:

**A hosted embed (YouTube unlisted / Vimeo / Bunny / Cloudflare):**

```js
L["1.1"] = {
  sub: "...",
  video: {
    embed: "https://www.youtube.com/embed/VIDEO_ID",
    cap: "Watch: how Claude predicts the next token (3 min)"
  },
  breath: "...",
  // ...the rest of the lesson unchanged
};
```

Use the **embed** URL (`youtube.com/embed/VIDEO_ID`), not the normal watch link. For Vimeo use `player.vimeo.com/video/ID`; Bunny/Cloudflare give you an embed URL directly.

**A self-hosted file (for one or two small clips):**

```js
  video: {
    file: "media/lesson-1.1.mp4",
    poster: "media/lesson-1.1.jpg",   // optional thumbnail
    cap: "Watch: the next-token demo"
  },
```

Put the file in a `media/` folder next to `index.html`. The player renders a native `<video>` with controls.

The player appears right under the lesson's opening hook, in a responsive 16:9 frame with a "▶ WATCH" caption — no other change needed. Lessons without a `video` field simply don't show one, so you can add them one at a time.

## The recommended free-first pilot (do this first)

1. Pick **two flagship lessons** — suggested: **1.1 "What Claude Actually Is"** (a foundational concept) and **5.1 "From Chatbot to Coworker"** (a wow-factor demo).
2. For each: record a **HeyGen** avatar intro (~20s), then an **OBS** screen segment (the demo or the lesson's own animation), and stitch them in **Clipchamp/DaVinci**.
3. Upload each as **YouTube unlisted**, copy the embed URL, and add the `video` field to that lesson.
4. Watch them in the running site, judge the workflow, then decide whether to scale.

Total cash cost of that pilot: **$0.** Time is the real cost — budget an afternoon per polished flagship video the first time, faster after.

## When to spend money

Only after the pilot proves the format is worth it:

- **HeyGen Creator (~$29/mo)** — if you want an avatar on many lessons (removes watermark, more minutes).
- **ElevenLabs Creator (~$22/mo)** — if you narrate a lot and want the most natural voice without an avatar.
- **Bunny/Cloudflare Stream (~$1–5/mo)** — ad-free branded hosting once you scale past a handful of videos or start charging for the course.

Everything before that point is free. Start with the pilot, keep the money in your pocket until the videos have earned it.
