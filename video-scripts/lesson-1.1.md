# Video script — Lesson 1.1: What Claude Actually Is

**Target length:** ~2 min 30 sec · **Format:** avatar intro → screen/animation → avatar close · **Tools:** HeyGen (avatar), OBS (screen), Clipchamp/DaVinci (stitch)

This is both the script for your first flagship video **and** a reusable template — the beat structure (hook → concept → demo → payoff → bridge) works for any lesson. Narration is written to be spoken; paste it straight into HeyGen or read it into a mic. Keep the pace calm and confident.

---

### Beat 1 — Avatar hook (0:00–0:25)

**On screen:** HeyGen avatar, centered. Lower-third title fades in: *"What Claude Actually Is · Lesson 1.1"*.

**Narration:**
> "In 2026, two people sit down with the exact same AI. One gets a mediocre paragraph and walks away calling it a toy. The other gets a week of work done before lunch. Same tool. Same subscription. Same day. The difference isn't the tool — it's the mental model of the person driving it. So let's install the right one, because everything else you'll learn stands on it."

**Production note:** this is your highest-energy moment. If the avatar feels stiff, record just this line in your own voice over a title card instead.

---

### Beat 2 — The core idea, on the animation (0:25–1:15)

**On screen:** cut to a screen-recording of the course's own **next-token prediction diagram** in lesson 1.1. Let the "The cat sat on the ___" tokens and the probability bars (mat 62%, rug 23%, floor 9%) be visible. Slowly zoom toward the probability bars as you talk.

**Narration:**
> "Here's what Claude actually is: a prediction engine. It read an enormous slice of human writing — books, code, conversations — and learned one skill astonishingly well: given the text so far, predict the next chunk. That's a token, roughly three-quarters of a word.
>
> Watch. Given 'the cat sat on the,' it doesn't *look up* an answer. It weighs the odds of every possible next token — 'mat' is likely, 'rug' less so, 'banana' almost never — picks one, appends it, and repeats. One token at a time, that's how every answer you've ever gotten from Claude was built."

**Production note:** if you have the lesson open, you can literally screen-record the diagram; it animates on load. Narrate over it live in OBS.

---

### Beat 3 — Why it matters (the payoff) (1:15–1:55)

**On screen:** optional quick cut to a live Claude window (OBS capture) — type a prompt, show it answering. Or stay on the diagram.

**Narration:**
> "Two consequences fall out of this, and they explain almost everything.
>
> First: Claude *generates*, it doesn't retrieve. It's writing a fresh, plausible answer every time — which is why it can be brilliantly creative, and also why it can state something false with total confidence. That's called a hallucination, and it's why verifying matters.
>
> Second: it was trained not just to predict, but to be helpful, honest, and harmless. So it's a prediction engine pointed at being genuinely useful to you — not a search engine, not a database. Once you hold that picture, good prompting stops being magic and starts being obvious."

---

### Beat 4 — Avatar close + bridge (1:55–2:30)

**On screen:** back to the HeyGen avatar. Lower-third: *"Next: Tokens & Context — the physics of Claude."*

**Narration:**
> "So that's the mental model: Claude is a prediction engine that learned from human writing and was trained to be helpful, honest, and harmless — generating answers fresh, every single time, instead of looking them up. Hold onto that. In the next lesson we'll make it concrete with tokens and context — the physics that governs everything Claude can do. See you there."

**End card:** course logo + "Claude Mastery — Zero to Operator."

---

## Shot list (what to capture in OBS)

1. **Avatar clips** (HeyGen): Beat 1 and Beat 4 — generate as two short clips from the narration above.
2. **Diagram screen-record:** open lesson 1.1 in the running site, record the next-token prediction diagram (it animates on load); do a slow zoom to the probability bars.
3. **Optional live demo:** a real Claude window answering a short prompt, for Beat 3.
4. **Title cards / lower-thirds:** add in Clipchamp or DaVinci — lesson title, the "next up" bridge, the end card.

## Assembly (Clipchamp or DaVinci, free)

1. Lay down Beat 1 avatar → Beat 2 diagram → Beat 3 demo → Beat 4 avatar in sequence.
2. Add lower-third titles and a soft music bed (keep it under the voice, ~15% volume).
3. Export 1080p MP4.
4. Upload to **YouTube unlisted**, copy the **embed** URL, and add it to the lesson:

```js
// in content/track01.js, inside L["1.1"] = { ... }
  video: {
    embed: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    cap: "Watch: how Claude predicts the next token (2 min)"
  },
```

Reload the site — the player appears right under the lesson's hook. Done.

---

## Reusable beat template (for any lesson)

- **Hook (20–25s, avatar):** the lesson's `hook` — the tension or "why care."
- **Concept (40–50s, animation/screen):** the core idea on the lesson's diagram or widget.
- **Payoff (30–40s, demo):** why it matters, ideally on a live Claude demo.
- **Close + bridge (20–30s, avatar):** the lesson's `recap` + `bridge` line.

Every lesson already contains these exact pieces (`hook`, `breath`, `recap`, `bridge`) in its content file — so scripting the next video is mostly lifting those lines and reading them well.
