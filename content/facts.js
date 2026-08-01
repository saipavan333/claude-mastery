/* ============================================================================
   LIVING CURRENCY ENGINE  —  every volatile fact in one place.
   The #current page and each lesson's "Verified" badge read from here.
   When a price, model, or limit changes: edit the value + its asOf date here,
   add a line to CHANGELOG.md, and the whole course updates itself.
   Last full review: 2026-08-01. Sources are Anthropic's own pages (below).
   ============================================================================ */
window.FACTS = {
  reviewed: "2026-08-01",     // date this file was last checked end-to-end
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
      {k:"free",  label:"Free",        value:"$0",                        asOf:"2026-08-01", src:"pricing", note:"Chat, code generation, web search, memory, file creation, connectors, extended thinking. Lowest usage tier."},
      {k:"pro",   label:"Pro",         value:"$20/mo · $17/mo annual",    asOf:"2026-08-01", src:"pricing", note:"Adds Claude Code, Cowork, Design, projects, Research, multiple models. At least ~5× Free usage per 5-hour session."},
      {k:"max5",  label:"Max 5×",      value:"from $100/mo",              asOf:"2026-08-01", src:"pricing", note:"~5× Pro usage per 5-hour session, higher output limits, priority in high traffic."},
      {k:"max20", label:"Max 20×",     value:"from $200/mo",              asOf:"2026-08-01", src:"pricing", note:"~20× Pro usage per 5-hour session."},
      {k:"team",  label:"Team",        value:"$25/seat/mo · $20 annual",  asOf:"2026-08-01", src:"pricing", note:"Premium seat $125/mo ($100 annual, ~5× a standard seat). SSO, admin controls, no model training by default."},
      {k:"ent",   label:"Enterprise",  value:"$20/seat self-serve · custom", asOf:"2026-08-01", src:"pricing", note:"SCIM, audit logs, compliance API, IP allowlisting, HIPAA-ready option."}
    ]},
    { id:"models", title:"Frontier model lineup", icon:"🧠", items:[
      {k:"fable5", label:"Claude Fable 5", value:"claude-fable-5 — flagship", asOf:"2026-08-01", src:"models", note:"Anthropic's most capable widely released model; built for long-running agents. 1M-token context, 128k max output. GA 2026-06-09."},
      {k:"opus5",  label:"Claude Opus 5",  value:"claude-opus-5",            asOf:"2026-08-01", src:"models", note:"Start here for complex agentic work. 1M-token context, 128k max output."},
      {k:"sonnet5",label:"Claude Sonnet 5",value:"claude-sonnet-5",          asOf:"2026-08-01", src:"models", note:"Best speed / intelligence balance. 1M-token context, 128k max output."},
      {k:"haiku45",label:"Claude Haiku 4.5",value:"claude-haiku-4-5",        asOf:"2026-08-01", src:"models", note:"Fastest / most budget-friendly. 200k-token context, 64k max output."}
    ]},
    { id:"api", title:"API price · per million tokens", icon:"🔌", items:[
      {k:"api_fable", label:"Fable 5",  value:"$10 in · $50 out", asOf:"2026-08-01", src:"models"},
      {k:"api_opus",  label:"Opus 5",   value:"$5 in · $25 out",  asOf:"2026-08-01", src:"models"},
      {k:"api_sonnet",label:"Sonnet 5", value:"$3 in · $15 out",  asOf:"2026-08-01", src:"models", note:"Introductory $2 in / $10 out through 2026-08-31."},
      {k:"api_haiku", label:"Haiku 4.5", value:"$1 in · $5 out",  asOf:"2026-08-01", src:"models", note:"Prompt caching and batch API cut real cost further."}
    ]},
    { id:"surfaces", title:"Surfaces, tools & limits", icon:"🧰", items:[
      {k:"code",    label:"Claude Code",     value:"Included from Pro up",              asOf:"2026-08-01", src:"code",    note:"Agentic coding in the terminal and IDE."},
      {k:"cowork",  label:"Cowork",          value:"Included from Pro up",              asOf:"2026-08-01", src:"pricing", note:"File and task automation."},
      {k:"context", label:"Context window",  value:"Up to 1,000,000 tokens",            asOf:"2026-08-01", src:"models",  note:"Frontier models. Haiku 4.5 is 200k."},
      {k:"session", label:"Usage window",    value:"5-hour rolling sessions",           asOf:"2026-08-01", src:"pricing", note:"Limits reset per 5-hour window; exact message counts vary with conversation length and complexity."}
    ]}
  ]
};
