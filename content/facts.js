/* ============================================================================
   LIVING CURRENCY ENGINE  —  every volatile fact in one place.
   The #current page and each lesson's "Verified" badge read from here.
   When a price, model, or limit changes: edit the value + its asOf date here,
   add a line to CHANGELOG.md, and the whole course updates itself.
   Last full review: 2026-09-22. Sources are Anthropic's own pages (below).
   ============================================================================ */
window.FACTS = {
  reviewed: "2026-09-22",     // date this file was last checked end-to-end
  staleDays: 120,             // a fact older than this is auto-flagged "review due"
  sources: {
    pricing: "https://claude.com/pricing",
    models:  "https://platform.claude.com/docs/en/about-claude/models/overview",
    docs:    "https://docs.claude.com",
    code:    "https://docs.claude.com/en/docs/claude-code/overview"
  },
  // how the guarantee works — shown at the top of the Current facts page
  promise: "Every price, model name, and limit in this course lives in one file, each stamped with the date it was last checked against Anthropic's own pages. Anything past its review window is flagged automatically — so the course tells on itself the moment it starts to age.",
  groups: [
    { id:"plans", title:"Plans & pricing", icon:"💳", items:[
      {k:"free",  label:"Free",        value:"$0",                        asOf:"2026-09-22", src:"pricing", note:"Chat, web search, file creation, code execution, memory, connectors, Artifacts. Lowest usage tier."},
      {k:"pro",   label:"Pro",         value:"$20/mo · $17/mo annual",    asOf:"2026-09-22", src:"pricing", note:"Adds Claude Code, Cowork (now merged with chat), Docs / Slides / Design, Projects, Research, more models, Chrome & Microsoft 365 extensions."},
      {k:"max5",  label:"Max 5×",      value:"from $100/mo",              asOf:"2026-09-22", src:"pricing", note:"~5× Pro usage per 5-hour session, higher output limits, priority in high traffic, early access to new features."},
      {k:"max20", label:"Max 20×",     value:"from $200/mo",              asOf:"2026-09-22", src:"pricing", note:"~20× Pro usage per 5-hour session."},
      {k:"team",  label:"Team",        value:"$25/seat/mo · $20 annual",  asOf:"2026-09-22", src:"pricing", note:"Premium seat $125/mo ($100 annual). Enterprise search, SSO, admin controls; no training on your data by default."},
      {k:"ent",   label:"Enterprise",  value:"$20/seat billed annually · usage scales", asOf:"2026-09-22", src:"pricing", note:"Spend limits, role-based access, SCIM, audit logs, compliance API, custom retention, HIPAA-ready option."}
    ]},
    { id:"models", title:"Frontier model lineup", icon:"🧠", items:[
      {k:"opus5",   label:"Claude Opus 5",   value:"claude-opus-5 — start here",     asOf:"2026-09-22", src:"models", note:"Anthropic's default flagship for most work: complex agentic coding and enterprise reasoning — a step-change over Opus 4.8. 1M-token context, 128k max output. Released 2026-07-24."},
      {k:"fable51", label:"Claude Fable 5.1", value:"claude-fable-5-1 — most capable", asOf:"2026-09-22", src:"models", note:"The premium top tier for demanding reasoning and long-horizon agentic work — reach for it when Opus 5 at higher effort still falls short. 1M context, 128k output. Released 2026-09-01."},
      {k:"mythos51",label:"Claude Mythos 5.1",value:"claude-mythos-5-1 — trusted access", asOf:"2026-09-22", src:"models", note:"Fable 5.1's sibling, with safeguards tuned for cybersecurity and the life sciences, available through Anthropic's trusted-access programs. Same 1M context / 128k output."},
      {k:"sonnet5", label:"Claude Sonnet 5",  value:"claude-sonnet-5",                asOf:"2026-09-22", src:"models", note:"The fast, cost-efficient agentic workhorse — makes plans, uses tools, runs autonomously. 1M context, 128k output. Released 2026-06-30. The everyday default."},
      {k:"haiku45", label:"Claude Haiku 4.5", value:"claude-haiku-4-5",               asOf:"2026-09-22", src:"models", note:"Fastest and cheapest — high-volume classification, extraction, and latency-sensitive work. 200k context, 64k output."}
    ]},
    { id:"api", title:"API price · per million tokens", icon:"🔌", items:[
      {k:"api_fable", label:"Fable 5.1 / Mythos 5.1", value:"$10 in · $50 out", asOf:"2026-09-22", src:"models", note:"1-hour cache write $20; cache reads just $0.25 (an ultra-low 0.025×) — long agent runs get dramatically cheaper on cache."},
      {k:"api_opus",  label:"Opus 5",   value:"$5 in · $25 out",  asOf:"2026-09-22", src:"models", note:"Cache write $10 (1h), cache read $0.50. The sensible default for production agents."},
      {k:"api_sonnet",label:"Sonnet 5", value:"$2 in · $10 out",  asOf:"2026-09-22", src:"models", note:"Down from Sonnet 4.6's $3 / $15 — the introductory price is now standard."},
      {k:"api_haiku", label:"Haiku 4.5", value:"$1 in · $5 out",  asOf:"2026-09-22", src:"models", note:"Prompt caching and the Batch API cut real cost further."}
    ]},
    { id:"surfaces", title:"Surfaces, tools & limits", icon:"🧰", items:[
      {k:"code",     label:"Claude Code",      value:"Included from Pro up",                     asOf:"2026-09-22", src:"code",    note:"Agentic coding in the terminal and IDE."},
      {k:"cowork",   label:"Cowork + chat",    value:"One app (merged 2026-09)",                asOf:"2026-09-22", src:"pricing", note:"Cowork and chat are now a single app, with Claude Docs & Slides (beta) and in-conversation Design alongside file / task automation."},
      {k:"chrome",   label:"Claude in Chrome", value:"GA · all paid plans (2026-08)",           asOf:"2026-09-22", src:"docs",    note:"Autonomous in-browser actions with safety classifiers and prompt-injection defenses."},
      {k:"agentapi", label:"Agent APIs (GA)",  value:"Computer Use · Skills · Files (2026-08)", asOf:"2026-09-22", src:"docs",    note:"Production agents can drive a computer / browser, load custom Skills, and store documents via the Files API."},
      {k:"projects", label:"Projects (rebuilt)",value:"Parallel threads · shared memory · libraries (2026-09)", asOf:"2026-09-22", src:"docs", note:"Redesigned for long-running work: run threads in parallel, share memory across them, and reuse project libraries."},
      {k:"context",  label:"Context window",   value:"Up to 1,000,000 tokens",                 asOf:"2026-09-22", src:"models",  note:"Frontier models (Opus 5, Fable / Mythos 5.1, Sonnet 5). Haiku 4.5 is 200k."},
      {k:"session",  label:"Usage window",     value:"5-hour rolling sessions",                asOf:"2026-09-22", src:"pricing", note:"Limits reset per 5-hour window; exact message counts vary with conversation length and complexity."}
    ]}
  ]
};
