/* ============================================================================
   LIVING CURRENCY ENGINE  —  every volatile fact in one place.
   The #current page and each lesson's "Verified" badge read from here.
   When a price, model, or limit changes: edit the value + its asOf date here,
   add a line to CHANGELOG.md, and the whole course updates itself.
   Last full review: 2026-11-03. Sources are Anthropic's own pages (below).
   ============================================================================ */
window.FACTS = {
  reviewed: "2026-11-03",     // date this file was last checked end-to-end
  staleDays: 120,             // a fact older than this is auto-flagged "review due"
  sources: {
    pricing: "https://claude.com/pricing",
    models:  "https://platform.claude.com/docs/en/models/overview",
    docs:    "https://docs.claude.com",
    code:    "https://code.claude.com/docs/en/overview",
    news:    "https://www.anthropic.com/news",
    mcp:     "https://py.sdk.modelcontextprotocol.io/v2/migration/"
  },
  // how the guarantee works — shown at the top of the Current facts page
  promise: "Every price, model name, and limit in this course lives in one file, each stamped with the date it was last checked against Anthropic's own pages. Anything past its review window is flagged automatically — so the course tells on itself the moment it starts to age.",
  groups: [
    { id:"plans", title:"Plans & pricing", icon:"💳", items:[
      {k:"free",  label:"Free",        value:"$0",                        asOf:"2026-11-03", src:"pricing", note:"Chat, web search, file creation, code execution, memory, connectors, Artifacts — plus Claude Docs, Slides & Design. No Claude Code, Cowork or Chrome. Lowest usage tier."},
      {k:"pro",   label:"Pro",         value:"$20/mo · $17/mo annual",    asOf:"2026-11-03", src:"pricing", note:"Adds Claude Code, Cowork (hand off and schedule tasks), Projects, Dashboards (beta), Claude Science, more models, Chrome & Microsoft 365. Fable usable via usage credits. No monthly API credits."},
      {k:"max5",  label:"Max",         value:"$100/mo",                   asOf:"2026-11-03", src:"pricing", note:"5× Pro usage every 5 hours and every week, Fable included up to half the weekly limit, priority at high traffic, early access — plus $100/month of Claude API credits."},
      {k:"max20", label:"Ultra",       value:"$200/mo",                   asOf:"2026-11-03", src:"pricing", note:"Replaces the old Max 20× tier: no 5-hour limit (verified accounts), 10× Pro usage every week, $200/month of API credits."},
      {k:"team",  label:"Team",        value:"$25/seat/mo · $20 annual",  asOf:"2026-11-03", src:"pricing", note:"2–150 seats. Premium seat $125/mo ($100 annual), 5× a standard seat. Claude Code + Cowork, Motion & Dashboards (beta), Claude Tag, admin/security controls, up to $500/month pooled API credits."},
      {k:"ent",   label:"Enterprise",  value:"$20/seat billed annually + usage at API rates", asOf:"2026-11-03", src:"pricing", note:"20-seat minimum. Spend limits, role-based access, SCIM, audit logs, Compliance API, custom retention, IP allowlisting, HIPAA-ready option, Claude Security (beta)."}
    ]},
    { id:"models", title:"Frontier model lineup", icon:"🧠", items:[
      {k:"opus55",  label:"Claude Opus 5.5",  value:"claude-opus-5-5 — start here",   asOf:"2026-11-03", src:"models", note:"Anthropic's default for most work: long-running agentic coding and knowledge work, a step-change over Opus 5 — and now cheaper at $4/$20. 1M-token context, 128k max output, adaptive thinking. Released 2026-09-22."},
      {k:"fable51", label:"Claude Fable 5.1",  value:"claude-fable-5-1 — most capable", asOf:"2026-11-03", src:"models", note:"The premium top tier for demanding reasoning and long-horizon agentic work — reach for it when Opus 5.5 at higher effort still falls short. 1M context, 128k output. Its sibling Mythos 5.1 is limited-availability (trusted access) and not in the general lineup."},
      {k:"sonnet55",label:"Claude Sonnet 5.5", value:"claude-sonnet-5-5",             asOf:"2026-11-03", src:"models", note:"The best balance of speed and intelligence — a faster, lower-cost complement to Opus 5.5, and genuinely agentic. 1M context, 128k output. Released 2026-09-28. The everyday default."},
      {k:"haiku55", label:"Claude Haiku 5.5",  value:"claude-haiku-5-5 — fastest & cheapest", asOf:"2026-11-03", src:"models", note:"The cheapest, fastest, most capable small model — high-volume classification, extraction, routing, summarization, and subagent work. Now 1M context (up from 200k) and ~75% cheaper than Haiku 4.5, with an adjustable effort setting. Released 2026-10-07."}
    ]},
    { id:"api", title:"API price · per million tokens", icon:"🔌", items:[
      {k:"api_opus",  label:"Opus 5.5",   value:"$4 in · $20 out",  asOf:"2026-11-03", src:"models", note:"Down from Opus 5's $5 / $25. Cache reads $0.20 (0.05×). Fast mode (Claude API only) runs $8 / $40. Default effort is medium; thinking cannot be switched off."},
      {k:"api_fable", label:"Fable 5.1",  value:"$10 in · $50 out", asOf:"2026-11-03", src:"models", note:"The premium tier; cache reads are an ultra-low 0.025× of base input — long agent runs get dramatically cheaper on cache."},
      {k:"api_sonnet",label:"Sonnet 5.5", value:"$2 in · $10 out",  asOf:"2026-11-03", src:"models", note:"Cache reads $0.10 / MTok (0.05× of input). Default effort high."},
      {k:"api_haiku", label:"Haiku 5.5",  value:"from $0.10 in · $0.50 out", asOf:"2026-11-03", src:"models", note:"For prompts up to 100k tokens; $0.50 / $2.50 above that. Anthropic: 90% cheaper than Haiku 4.5 up to 100k tokens, 50% cheaper above, ~75% averaged across workloads. Default effort medium."}
    ]},
    { id:"surfaces", title:"Surfaces, tools & limits", icon:"🧰", items:[
      {k:"code",    label:"Claude Code",         value:"Included from Pro up",                     asOf:"2026-11-03", src:"code",    note:"Agentic coding in terminal, IDE, desktop and cloud. Skills, subagents, hooks and plugins (a plugin with a JavaScript hooks module is a «mod»). Code Review for GitHub PRs on Team and Enterprise; /code-review on any plan."},
      {k:"cowork",  label:"Cowork + chat",       value:"One app",                                 asOf:"2026-11-03", src:"pricing", note:"Cowork and chat are a single app; escalate from a question to agentic work on your files in one thread."},
      {k:"makers",  label:"Docs · Slides · Design", value:"GA on every plan, incl. Free (2026-10)", asOf:"2026-11-03", src:"docs", note:"Left beta in October — produce polished documents, decks and visuals right inside a conversation."},
      {k:"dash",    label:"Dashboards & Motion",  value:"Beta (2026-10)",                          asOf:"2026-11-03", src:"docs",    note:"Dashboards (beta, from Pro) connect live data; Motion (beta) is listed on Team plans."},
      {k:"chrome",  label:"Claude in Chrome",     value:"GA · all paid plans",                     asOf:"2026-11-03", src:"docs",    note:"Autonomous in-browser actions with safety classifiers and prompt-injection defenses."},
      {k:"agentapi",label:"Agent APIs (GA)",      value:"Computer Use · Skills · Files",           asOf:"2026-11-03", src:"docs",    note:"Production agents drive a computer / browser, load custom Skills, and store documents via the Files API (Files and Skills need no beta header)."},
      {k:"apiver",  label:"API version",          value:"2026-10-21",                             asOf:"2026-11-03", src:"docs",    note:"Default in Python SDK 2.0+ / TypeScript SDK 1.0+. Removes temperature, top_p and top_k (a 400 on every model). Assistant prefill is already a 400 on every current model."},
      {k:"skillstd",label:"Agent Skills standard", value:"Donated to the Agentic AI Foundation (2026-10-22)", asOf:"2026-11-03", src:"news", note:"Anthropic handed the open SKILL.md standard (agentskills.io) to the Linux Foundation's AAIF, alongside MCP. Existing SKILL.md files keep working."},
      {k:"mcpsdk",  label:"MCP Python SDK",       value:"mcp 2.x (2.3.0)",                         asOf:"2026-11-03", src:"mcp",     note:"FastMCP was renamed MCPServer (from mcp.server.mcpserver import MCPServer); the old mcp.server.fastmcp import fails on 2.x."},
      {k:"projects",label:"Projects (rebuilt)",   value:"Parallel threads · shared memory · libraries", asOf:"2026-10-23", src:"docs", note:"Long-running work: run threads in parallel, share memory across them, and reuse a project library."},
      {k:"context", label:"Context window",       value:"Up to 1,000,000 tokens",                  asOf:"2026-11-03", src:"models",  note:"Every current model — Opus 5.5, Fable 5.1, Sonnet 5.5 and Haiku 5.5 — carries the full 1M-token window, ≈555k words on the current tokenizer (older models fit ≈750k)."},
      {k:"session", label:"Usage window",         value:"5-hour rolling sessions",                 asOf:"2026-11-03", src:"pricing", note:"Limits reset per 5-hour window plus a weekly cap; exact message counts vary with conversation length and complexity. Ultra removes the 5-hour limit for verified accounts."}
    ]}
  ]
};
