/* ============================================================================
   LIVING CURRENCY ENGINE  —  every volatile fact in one place.
   The #current page and each lesson's "Verified" badge read from here.
   When a price, model, or limit changes: edit the value + its asOf date here,
   add a line to CHANGELOG.md, and the whole course updates itself.
   Last full review: 2026-10-23. Sources are Anthropic's own pages (below).
   ============================================================================ */
window.FACTS = {
  reviewed: "2026-10-23",     // date this file was last checked end-to-end
  staleDays: 120,             // a fact older than this is auto-flagged "review due"
  sources: {
    pricing: "https://claude.com/pricing",
    models:  "https://platform.claude.com/docs/en/models/overview",
    docs:    "https://docs.claude.com",
    code:    "https://docs.claude.com/en/docs/claude-code/overview"
  },
  // how the guarantee works — shown at the top of the Current facts page
  promise: "Every price, model name, and limit in this course lives in one file, each stamped with the date it was last checked against Anthropic's own pages. Anything past its review window is flagged automatically — so the course tells on itself the moment it starts to age.",
  groups: [
    { id:"plans", title:"Plans & pricing", icon:"💳", items:[
      {k:"free",  label:"Free",        value:"$0",                        asOf:"2026-10-23", src:"pricing", note:"Chat, web search, file creation, code execution, memory, connectors, Artifacts — and now Claude Docs, Slides & Design too (they left beta for every plan). Lowest usage tier."},
      {k:"pro",   label:"Pro",         value:"$20/mo · $17/mo annual",    asOf:"2026-10-23", src:"pricing", note:"Adds Claude Code, Cowork (merged with chat), Projects, Research, more models, Chrome & Microsoft 365 extensions."},
      {k:"max5",  label:"Max 5×",      value:"from $100/mo",              asOf:"2026-10-23", src:"pricing", note:"~5× Pro usage, higher output limits, priority in high traffic, early access — plus monthly Claude API credits for running your own apps/agents."},
      {k:"max20", label:"Max 20×",     value:"from $200/mo",              asOf:"2026-10-23", src:"pricing", note:"~20× Pro usage per 5-hour window; includes the monthly API credits."},
      {k:"team",  label:"Team",        value:"$25/seat/mo · $20 annual",  asOf:"2026-10-23", src:"pricing", note:"Premium seat $125/mo ($100 annual). Enterprise search, SSO, admin controls, monthly API credits; no training on your data by default."},
      {k:"ent",   label:"Enterprise",  value:"$20/seat billed annually · usage scales", asOf:"2026-10-23", src:"pricing", note:"Spend limits, role-based access, SCIM, audit logs, compliance API, custom retention, HIPAA-ready option."}
    ]},
    { id:"models", title:"Frontier model lineup", icon:"🧠", items:[
      {k:"opus55",  label:"Claude Opus 5.5",  value:"claude-opus-5-5 — start here",   asOf:"2026-10-23", src:"models", note:"Anthropic's default for most work: long-running agentic coding and knowledge work, a step-change over Opus 5 — and now cheaper at $4/$20. 1M-token context, 128k max output, adaptive thinking. Released 2026-09-22."},
      {k:"fable51", label:"Claude Fable 5.1",  value:"claude-fable-5-1 — most capable", asOf:"2026-10-23", src:"models", note:"The premium top tier for demanding reasoning and long-horizon agentic work — reach for it when Opus 5.5 at higher effort still falls short. 1M context, 128k output. Its security-hardened sibling, Mythos 5.1, powers Claude Security via trusted access."},
      {k:"sonnet55",label:"Claude Sonnet 5.5", value:"claude-sonnet-5-5",             asOf:"2026-10-23", src:"models", note:"The best balance of speed and intelligence — a faster, lower-cost complement to Opus 5.5, and genuinely agentic. 1M context, 128k output. Released 2026-09-28. The everyday default."},
      {k:"haiku55", label:"Claude Haiku 5.5",  value:"claude-haiku-5-5 — fastest & cheapest", asOf:"2026-10-23", src:"models", note:"The cheapest, fastest, most capable small model — high-volume classification, extraction, routing, summarization, and subagent work. Now 1M context (up from 200k) and ~75% cheaper than Haiku 4.5, with an adjustable effort setting. Released 2026-10-07."}
    ]},
    { id:"api", title:"API price · per million tokens", icon:"🔌", items:[
      {k:"api_opus",  label:"Opus 5.5",   value:"$4 in · $20 out",  asOf:"2026-10-23", src:"models", note:"Down from Opus 5's $5 / $25. A Fast mode runs $8 / $40 for latency-critical agentic work."},
      {k:"api_fable", label:"Fable 5.1",  value:"$10 in · $50 out", asOf:"2026-10-23", src:"models", note:"The premium tier; cache reads are an ultra-low 0.025× of base input — long agent runs get dramatically cheaper on cache."},
      {k:"api_sonnet",label:"Sonnet 5.5", value:"$2 in · $10 out",  asOf:"2026-10-23", src:"models", note:"Cache reads were just cut to $0.10 / MTok (from $0.20)."},
      {k:"api_haiku", label:"Haiku 5.5",  value:"from $0.10 in · $0.50 out", asOf:"2026-10-23", src:"models", note:"For prompts up to 100k tokens (≈90% of Haiku requests); $0.50 / $2.50 above that. Roughly 75% cheaper than Haiku 4.5 — the volume workhorse."}
    ]},
    { id:"surfaces", title:"Surfaces, tools & limits", icon:"🧰", items:[
      {k:"code",    label:"Claude Code",         value:"Included from Pro up",                     asOf:"2026-10-23", src:"code",    note:"Agentic coding in terminal, IDE, desktop and cloud — now with Code Review (GA) and mods."},
      {k:"cowork",  label:"Cowork + chat",       value:"One app",                                 asOf:"2026-10-23", src:"pricing", note:"Cowork and chat are a single app; escalate from a question to agentic work on your files in one thread."},
      {k:"makers",  label:"Docs · Slides · Design", value:"GA on every plan, incl. Free (2026-10)", asOf:"2026-10-23", src:"docs", note:"Left beta in October — produce polished documents, decks and visuals right inside a conversation."},
      {k:"dash",    label:"Dashboards & Motion",  value:"Beta (2026-10)",                          asOf:"2026-10-23", src:"docs",    note:"Dashboards connect live data (BigQuery, Snowflake…); Motion generates animated explainers."},
      {k:"chrome",  label:"Claude in Chrome",     value:"GA · all paid plans",                     asOf:"2026-10-23", src:"docs",    note:"Autonomous in-browser actions with safety classifiers and prompt-injection defenses."},
      {k:"agentapi",label:"Agent APIs (GA)",      value:"Computer Use · Skills · Files",           asOf:"2026-10-23", src:"docs",    note:"Production agents drive a computer / browser, load custom Skills, and store documents via the Files API."},
      {k:"projects",label:"Projects (rebuilt)",   value:"Parallel threads · shared memory · libraries", asOf:"2026-10-23", src:"docs", note:"Long-running work: run threads in parallel, share memory across them, and reuse a project library."},
      {k:"context", label:"Context window",       value:"Up to 1,000,000 tokens",                  asOf:"2026-10-23", src:"models",  note:"Every current model — Opus 5.5, Fable 5.1, Sonnet 5.5 and now Haiku 5.5 — carries the full 1M-token window."},
      {k:"session", label:"Usage window",         value:"5-hour rolling sessions",                 asOf:"2026-10-23", src:"pricing", note:"Limits reset per 5-hour window; exact message counts vary with conversation length and complexity."}
    ]}
  ]
};
