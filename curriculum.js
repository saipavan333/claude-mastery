/* =============================================================
   CLAUDE MASTERY — Zero to Operator
   curriculum.js — the dependency-ordered roadmap (single source of truth)
   Phases: A Foundations → B The Craft → C Power User → D Builder → E Operator
   Levels: L1 Foundation · L2 Practitioner · L3 Expert
   Verified against official docs July 2026. Course content stamps
   fast-moving facts with "as of July 2026".
   ============================================================= */
/* Helper available to all content files (loaded first): renders an
   escaped prompt/code block with header label + copy button. */
window.PB = function(label, text, kind){
  var esc = function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};
  return '<div class="pblock '+(kind||"")+'"><div class="ph"><span>'+esc(label)+
         '</span></div><pre>'+esc(text)+'</pre><button class="copybtn">copy</button></div>';
};
window.LESSONS = window.LESSONS || {};

window.COURSE = {
  name: "Claude Mastery",
  tagline: "Zero to Operator — the complete course on Claude",
  version: "1.0 · July 2026",
  phases: [
    { id: "A", name: "Foundations", blurb: "How Claude actually works — the mental model everything else stands on." },
    { id: "B", name: "The Craft", blurb: "Prompting: the highest-leverage skill of the decade." },
    { id: "C", name: "Power User", blurb: "The app, Cowork, Chrome, Excel — Claude everywhere you work." },
    { id: "D", name: "Builder", blurb: "Claude Code, MCP, the API, agents — build things that run without you." },
    { id: "E", name: "Operator", blurb: "Turn skill into income: services, products, jobs — with receipts." }
  ]
};

window.TRACKS = [
  { id: "t1", n: 1, phase: "A", icon: "◉", level: "L1",
    title: "How Claude Works",
    blurb: "What an LLM really is, tokens and context, the model family, the surface map, plans, and the truth discipline that separates pros from tourists.",
    lessons: [
      { id: "1.1", title: "What Claude Actually Is", min: 14 },
      { id: "1.2", title: "Tokens & Context: The Physics of Claude", min: 16 },
      { id: "1.3", title: "The Model Family: Picking the Right Brain", min: 14 },
      { id: "1.4", title: "The Map: Every Place Claude Lives", min: 12 },
      { id: "1.5", title: "Plans & Pricing: What's Worth Paying For", min: 12 },
      { id: "1.6", title: "The Truth Discipline: Hallucination & Verification", min: 15 }
    ]},
  { id: "t2", n: 2, phase: "B", icon: "✍", level: "L1",
    title: "Prompting Foundations",
    blurb: "The anatomy of a great prompt. Clarity, context, examples, format control, roles, and iteration — the 20% that gives you 80% of the power.",
    lessons: [
      { id: "2.1", title: "The Anatomy of a Great Prompt", min: 16 },
      { id: "2.2", title: "Be Clear, Be Direct: The Golden Rules", min: 13 },
      { id: "2.3", title: "Show, Don't Tell: The Power of Examples", min: 14 },
      { id: "2.4", title: "Controlling the Output: Formats & XML Tags", min: 14 },
      { id: "2.5", title: "Let Claude Think: Reasoning & Extended Thinking", min: 14 },
      { id: "2.6", title: "System Prompts & Roles: Casting the Actor", min: 13 },
      { id: "2.7", title: "Iteration: The Conversation Is the Prompt", min: 12 }
    ]},
  { id: "t3", n: 3, phase: "B", icon: "⚡", level: "L2",
    title: "Advanced Prompting",
    blurb: "Chaining, long-context strategy, structured extraction, hallucination defenses, reusable templates, and evaluating prompts like an engineer.",
    lessons: [
      { id: "3.1", title: "Prompt Chaining: Divide and Conquer", min: 15 },
      { id: "3.2", title: "Long-Context Mastery: 200K Tokens Without Tears", min: 15 },
      { id: "3.3", title: "Prefilling & Structured Extraction", min: 14 },
      { id: "3.4", title: "Hallucination Defenses: Engineering for Truth", min: 15 },
      { id: "3.5", title: "Prompt Templates: Build Once, Run Forever", min: 13 },
      { id: "3.6", title: "Evals: Testing Prompts Like an Engineer", min: 15 },
      { id: "3.7", title: "The Pattern Library: 25 Battle-Tested Prompts", min: 18 }
    ]},
  { id: "t4", n: 4, phase: "C", icon: "🗂", level: "L2",
    title: "Claude App Mastery",
    blurb: "Projects, memory, files, artifacts, Research, connectors, and Skills — the app most people use at 10% of its depth.",
    lessons: [
      { id: "4.1", title: "The Tour Most Users Never Take", min: 12 },
      { id: "4.2", title: "Projects: Your Team of Specialists", min: 15 },
      { id: "4.3", title: "Memory: What Claude Remembers", min: 12 },
      { id: "4.4", title: "Files & Analysis: Documents, Images, Data", min: 14 },
      { id: "4.5", title: "Artifacts: From Sentence to Software", min: 15 },
      { id: "4.6", title: "Research Mode: Cited Reports on Demand", min: 13 },
      { id: "4.7", title: "Connectors: Claude Inside Your Tools", min: 13 },
      { id: "4.8", title: "Skills: Teaching Claude Your Way", min: 15 }
    ]},
  { id: "t5", n: 5, phase: "C", icon: "🤝", level: "L2",
    title: "Cowork: Your AI Coworker",
    blurb: "Anthropic's agentic workspace: give Claude folders, permissions, and outcomes — get back finished work. The biggest leverage jump for non-coders.",
    lessons: [
      { id: "5.1", title: "From Chatbot to Coworker", min: 13 },
      { id: "5.2", title: "First Session: Folders, Permissions, the Task Loop", min: 15 },
      { id: "5.3", title: "File Automation: Organize, Extract, Transform", min: 15 },
      { id: "5.4", title: "Office on Autopilot: Docs, Sheets, Decks", min: 14 },
      { id: "5.5", title: "Scheduled Tasks: Work That Runs Without You", min: 13 },
      { id: "5.6", title: "Power Patterns: Projects, Instructions, Sub-agents", min: 15 }
    ]},
  { id: "t6", n: 6, phase: "C", icon: "🧩", level: "L2",
    title: "Claude in Your Tools",
    blurb: "Chrome, Excel, Slack, Microsoft 365 — Claude embedded where the work already happens, and how to choose the right surface for any job.",
    lessons: [
      { id: "6.1", title: "Claude for Chrome: A Browser That Works for You", min: 14 },
      { id: "6.2", title: "Claude for Excel: Spreadsheets With a Brain", min: 14 },
      { id: "6.3", title: "Claude in Slack & Microsoft 365", min: 12 },
      { id: "6.4", title: "The Surface Picker: Right Tool, Right Job", min: 12 }
    ]},
  { id: "t7", n: 7, phase: "D", icon: "⌨", level: "L2",
    title: "Claude Code",
    blurb: "The agentic workhorse: terminal, desktop, and web. Steering with CLAUDE.md, skills, hooks, sub-agents, checkpoints — and yes, non-coders belong here too.",
    lessons: [
      { id: "7.1", title: "What Claude Code Is (Non-Coders Welcome)", min: 14 },
      { id: "7.2", title: "First Session: Install, Talk, Approve, Ship", min: 16 },
      { id: "7.3", title: "CLAUDE.md & Steering: Teach It Your Project", min: 15 },
      { id: "7.4", title: "Slash Commands, Modes & Checkpoints", min: 14 },
      { id: "7.5", title: "Skills, Sub-agents & Hooks", min: 16 },
      { id: "7.6", title: "Parallel Sessions & Background Work", min: 13 },
      { id: "7.7", title: "Beyond Code: Files, Research, Ops", min: 13 },
      { id: "7.8", title: "The Pro Loop: Plan → Build → Verify → Commit", min: 15 }
    ]},
  { id: "t8", n: 8, phase: "D", icon: "🔌", level: "L2",
    title: "MCP: The USB-C of AI",
    blurb: "The Model Context Protocol — how Claude plugs into anything. Using servers safely, the remote ecosystem, building your own, and the security you must know.",
    lessons: [
      { id: "8.1", title: "What MCP Is & Why Everyone Adopted It", min: 14 },
      { id: "8.2", title: "Using MCP Servers & Connectors Safely", min: 14 },
      { id: "8.3", title: "The Ecosystem: Remote MCP & Registries", min: 12 },
      { id: "8.4", title: "Build Your First MCP Server", min: 18 },
      { id: "8.5", title: "MCP Security: Injection & the Lethal Trifecta", min: 15 }
    ]},
  { id: "t9", n: 9, phase: "D", icon: "⚙", level: "L2",
    title: "The Claude API",
    blurb: "From app user to builder: Messages, vision, tool use, structured outputs, caching, batches — and the cost engineering that makes products profitable.",
    lessons: [
      { id: "9.1", title: "From App to API: Your First Request", min: 16 },
      { id: "9.2", title: "Messages: Conversations, Systems, Streaming", min: 15 },
      { id: "9.3", title: "Vision & PDFs: Claude Reads Everything", min: 13 },
      { id: "9.4", title: "Tool Use: Giving Claude Hands", min: 17 },
      { id: "9.5", title: "Structured Outputs: JSON You Can Trust", min: 13 },
      { id: "9.6", title: "Caching & Batches: The 90% Discount", min: 15 },
      { id: "9.7", title: "Cost Engineering: Model Mix & Token Budgets", min: 14 },
      { id: "9.8", title: "Ship It: A Real Mini-Product, End to End", min: 18 }
    ]},
  { id: "t10", n: 10, phase: "D", icon: "🤖", level: "L3",
    title: "Agents",
    blurb: "The agent loop, Anthropic's workflow patterns, the Agent SDK, Managed Agents, and the reliability + security engineering that separates demos from products.",
    lessons: [
      { id: "10.1", title: "What an Agent Actually Is", min: 14 },
      { id: "10.2", title: "Workflow Patterns: Chain, Route, Orchestrate", min: 16 },
      { id: "10.3", title: "The Agent SDK: Claude Code as a Library", min: 16 },
      { id: "10.4", title: "Managed Agents: Agents Without Servers", min: 13 },
      { id: "10.5", title: "Reliability: Evals, Guardrails, Human-in-the-Loop", min: 15 },
      { id: "10.6", title: "Agent Security: Injection, Sandboxes, Least Privilege", min: 15 }
    ]},
  { id: "t11", n: 11, phase: "E", icon: "💼", level: "L2",
    title: "Money I: Freelancing & Services",
    blurb: "The opportunity map with real 2026 rates, productized offers, platform playbooks, pricing, delivery systems, and the road from gigs to agency retainers.",
    lessons: [
      { id: "11.1", title: "The Opportunity Map (Real 2026 Numbers)", min: 16 },
      { id: "11.2", title: "Your Offer: Productize One Outcome", min: 15 },
      { id: "11.3", title: "Platform Playbook: Upwork, Fiverr, LinkedIn", min: 16 },
      { id: "11.4", title: "Pricing: Hourly, Project, Retainer", min: 14 },
      { id: "11.5", title: "The Delivery System: Great Work, Fast", min: 15 },
      { id: "11.6", title: "Freelancer to Agency: Retainers & Scale", min: 14 },
      { id: "11.7", title: "Client Trust: Contracts, Data, Disclosure", min: 13 }
    ]},
  { id: "t12", n: 12, phase: "E", icon: "🚀", level: "L3",
    title: "Money II: Products & Content",
    blurb: "Micro-SaaS on the API with honest unit economics, selling skills and MCP servers, content leverage — and the anti-hype chapter nobody else will teach you.",
    lessons: [
      { id: "12.1", title: "Micro-SaaS: Idea → Validation", min: 15 },
      { id: "12.2", title: "Unit Economics: API Cost vs Price", min: 15 },
      { id: "12.3", title: "Build & Launch Lean (Claude as Your Team)", min: 16 },
      { id: "12.4", title: "Selling Skills, Plugins & MCP Servers", min: 13 },
      { id: "12.5", title: "Content Leverage: The Honest Picture", min: 14 },
      { id: "12.6", title: "Anti-Hype: What Fails & Why", min: 13 }
    ]},
  { id: "t13", n: 13, phase: "E", icon: "🎯", level: "L2",
    title: "Money III: Get Hired",
    blurb: "The AI-native job market with 2026 salary data, Anthropic's certification ladder, a portfolio with receipts, and job-hunting with Claude as your edge.",
    lessons: [
      { id: "13.1", title: "The AI-Native Job Market (2026 Data)", min: 14 },
      { id: "13.2", title: "Certifications: Anthropic's Ladder", min: 13 },
      { id: "13.3", title: "A Portfolio That Proves It", min: 15 },
      { id: "13.4", title: "Job-Hunting With Claude", min: 14 },
      { id: "13.5", title: "Interviews: Land the Offer", min: 15 }
    ]},
  { id: "t14", n: 14, phase: "E", icon: "🏆", level: "L3",
    title: "Capstones",
    blurb: "Five portfolio-grade builds: a personal automation suite, a client-ready pipeline, an MCP server, a deployable API product, and your 30-day income launch plan.",
    lessons: [
      { id: "14.1", title: "Capstone A: Personal Automation Suite", min: 25 },
      { id: "14.2", title: "Capstone B: Client-Ready Document Pipeline", min: 25 },
      { id: "14.3", title: "Capstone C: MCP Server + Code Workflow", min: 30 },
      { id: "14.4", title: "Capstone D: Deployable API Micro-Product", min: 30 },
      { id: "14.5", title: "Capstone E: Your 30-Day Income Launch", min: 20 }
    ]}
];
