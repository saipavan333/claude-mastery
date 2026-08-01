/* ============================================================================
   showcase.js — the community showcase (curated, static, no backend).

   HOW TO ADD A SUBMISSION (owner workflow):
   1. A learner submits via the button on the #showcase page (opens a GitHub
      issue on your repo — or swap SHOWCASE_SUBMIT below for a Google Form/Tally).
   2. Review it. If it's good, add an entry to the SHOWCASE array below.
   3. Commit + push (and `npm run build` to refresh the crawlable showcase.html).

   Entry fields: { name, project, blurb, url, tag, example? }
   - name    : the builder's name (or handle)
   - project : the project title
   - blurb   : one sentence on what it does / which capstone it came from
   - url     : link to the live thing or repo (omit for none)
   - tag     : a short category, e.g. "Agent · Services", "Automation", "Product"
   - example : true for the seed placeholders below — delete these once real
               submissions come in.
   ============================================================================ */

/* Where the "Submit yours" button points. Default: a pre-filled GitHub issue on
   this repo. Swap for a Google Form / Tally URL if you prefer. */
window.SHOWCASE_SUBMIT = "https://github.com/saipavan333/claude-mastery/issues/new?labels=showcase&title=Showcase%20submission&body=Your%20name%3A%0AProject%20title%3A%0AOne-line%20description%3A%0ALink%20(live%20app%20or%20repo)%3A%0ACategory%20(e.g.%20Agent%2FAutomation%2FProduct)%3A%0AWhich%20capstone%20or%20track%20it%20came%20from%3A";

/* Seed entries — clearly marked examples so the gallery isn't empty on day one.
   Replace them with real submissions as they arrive. */
window.SHOWCASE = [
  { name:"Example — your name here", project:"Inbox & Lead-Triage Agent for a real-estate team",
    blurb:"Reads every inbound message, drafts the right reply for a human to approve, and logs each lead to a sheet. Built from Track 15.",
    url:"", tag:"Agent · Services", example:true },
  { name:"Example — your name here", project:"Client-Ready Document Pipeline",
    blurb:"Turns a folder of messy client files into clean, consistently formatted reports on a schedule. Capstone B.",
    url:"", tag:"Automation", example:true },
  { name:"Example — your name here", project:"Micro-SaaS on the Claude API",
    blurb:"A tiny paid tool with honest unit economics — API cost kept well under price. Capstone D.",
    url:"", tag:"Product", example:true }
];
