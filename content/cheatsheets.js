/* Cheat Sheets — one dense reference card per track.
   Shape: {tid, title, items:[[code/key, description]]}. Two-way linked:
   each card links to its track; each track page links here. */
window.CHEATSHEETS = [
{tid:"t1", title:"Track 1 — How Claude Works", items:[
  ["LLM = next-token predictor","Claude generates by predicting one token at a time — powerful pattern completion, not a database lookup."],
  ["token ~= 3/4 word","Everything (limits, price) is counted in tokens, not words. ~750 words per 1,000 tokens."],
  ["context window","Claude's working memory — all it can see at once. Long but finite; large context can dilute focus."],
  ["Haiku / Sonnet / Opus","Fast+cheap / balanced / most capable. Match the model to the task's difficulty and volume."],
  ["knowledge cutoff","No built-in facts after its training date — use search or provide sources for anything newer."],
  ["hallucination is real","Models state false things confidently. Never trust unverified factual output.","risk"],
  ["verify everything factual","Cross-check names, numbers, citations, and quotes before relying on them. The pro habit."],
  ["temperature 0 to 1","Low = focused/consistent, high = varied/creative. Lower for facts, higher for brainstorming."],
  ["surfaces","App, Cowork, Chrome, Excel, Code, API — the same brain in many places. Pick the right one per job."],
  ["plans","Free, Pro, Max, Team, Enterprise — differ by usage, features, and admin controls."]
]},
{tid:"t2", title:"Track 2 — Prompting Foundations", items:[
  ["clarity beats cleverness","Say exactly what you want. Ambiguity is the top cause of bad output."],
  ["give context","Audience, purpose, constraints, background — Claude cannot read your mind, so tell it."],
  ["show, do not tell","A few examples (few-shot) shape format and style better than paragraphs of rules."],
  ["control the format","Ask for JSON, a table, a template, bullet or prose — state it explicitly."],
  ["XML tags","Wrap sections in tags to separate instructions, context, and examples cleanly."],
  ["let it think","For hard tasks, ask Claude to reason step by step before answering."],
  ["system prompt = role + rules","Set who Claude is and the standing rules once, for the whole conversation."],
  ["iterate","The conversation is the prompt. Refine with feedback rather than restarting."],
  ["positive instructions","Say what TO do, not just what to avoid — 'write 3 concise bullets' beats 'do not ramble'."],
  ["the anatomy","Task + context + examples + format + constraints = a complete, reliable prompt."]
]},
{tid:"t3", title:"Track 3 — Advanced Prompting", items:[
  ["prompt chaining","Split a big task into steps, each a focused prompt feeding the next. Divide and conquer."],
  ["long context: put the ask last","With big documents, place the question after the material; reference sections explicitly."],
  ["prefilling","Start Claude's reply to force a format (e.g. open a JSON brace) or steer the beginning."],
  ["structured extraction","Ask for named fields as JSON to pull data cleanly out of messy text."],
  ["hallucination defenses","Allow 'I do not know', ground in sources, ask for quotes+citations, verify."],
  ["templates","Turn a proven prompt into a reusable fill-in-the-slots template. Build once, run forever."],
  ["evals","Test prompts on real examples with known-good answers — measure, do not guess."],
  ["golden set","A fixed set of test cases you re-run to catch regressions when you change a prompt."],
  ["pattern library","Keep your best prompts organized and reusable — your personal toolkit compounds."],
  ["think like an engineer","Prompts are components to test, version, and improve — not one-off magic spells."]
]},
{tid:"t4", title:"Track 4 — Claude App Mastery", items:[
  ["Projects","Bundle instructions + files + knowledge into a reusable specialist for a recurring purpose."],
  ["project instructions","Set standing rules once so every chat in the project follows them."],
  ["memory","Where enabled, Claude recalls details across chats — less repeating yourself."],
  ["files & analysis","Upload documents, images, data; Claude reads and reasons over them."],
  ["artifacts","Standalone outputs (docs, apps, diagrams) in their own editable panel."],
  ["Research mode","Searches many sources, returns a cited synthesized report."],
  ["connectors","Plug Claude into your tools (Drive, Slack, etc.) to work on your real data."],
  ["Skills","Package your way of doing a task so Claude repeats it consistently, every time."],
  ["depth over novelty","Most users use 10% of the app — Projects + Skills + connectors are the leverage."]
]},
{tid:"t5", title:"Track 5 — Cowork", items:[
  ["chatbot to coworker","Give folders, permissions, and an outcome; get finished work back."],
  ["the task loop","Cowork plans, acts, checks, and iterates toward the goal you set."],
  ["permissions","Grant only the access the task needs — least privilege from the start."],
  ["file automation","Organize, rename, extract, transform files across a folder in one task."],
  ["office on autopilot","Generate docs, sheets, and decks from your inputs and templates."],
  ["scheduled tasks","Make work run on a cadence (a Monday report) without you starting it."],
  ["sub-agents","Spin off focused helpers for sub-tasks, keeping the main work clean."],
  ["instructions & projects","Reusable context so Cowork does recurring work your way."],
  ["verify unattended output","Even scheduled work needs a periodic spot-check — automation is not blind trust.","risk"],
  ["biggest non-coder leverage","Cowork turns outcomes into finished work — the largest jump for non-programmers."]
]},
{tid:"t6", title:"Track 6 — Claude in Your Tools", items:[
  ["Claude for Chrome","Sees and acts on web pages — research, fill forms, pull data, automate flows."],
  ["Claude for Excel","Reads and builds spreadsheets with real understanding of your data."],
  ["Claude in Slack","Bring Claude into team chat for quick answers and summaries where work happens."],
  ["Microsoft 365","Claude alongside your documents and email in the Microsoft stack."],
  ["surface picker","Match the job to the surface: files -> Cowork, web -> Chrome, data -> Excel, build -> Code/API."],
  ["embedded beats copy-paste","Claude where the work already lives saves the round-trip and keeps context."],
  ["right tool, right job","No single surface wins everything — fluency is knowing which to reach for."]
]},
{tid:"t7", title:"Track 7 — Claude Code", items:[
  ["agentic workhorse","Plans, edits files, runs commands, and ships — in terminal, desktop, or web."],
  ["non-coders welcome","Great for files, research, and ops, not only code."],
  ["CLAUDE.md","Tell it your project's conventions and rules so it works your way."],
  ["slash commands","Trigger predefined workflows with /commands."],
  ["modes & checkpoints","Switch working modes; roll back to a checkpoint to experiment safely."],
  ["Skills","Package specialized capabilities for consistent reuse."],
  ["sub-agents","Delegate focused sub-tasks to keep the main context clean."],
  ["hooks","Auto-run scripts at set points (e.g. before commit) to enforce your rules."],
  ["parallel sessions","Run several sessions at once for independent tasks."],
  ["the pro loop","Plan -> build -> verify -> commit. Verification is not optional."]
]},
{tid:"t8", title:"Track 8 — MCP", items:[
  ["MCP = USB-C for AI","One open standard to connect Claude to any tool or data source."],
  ["server / client","Server exposes tools; client (Code, desktop app) connects and calls them."],
  ["tool descriptions rule","Claude uses tools based on their descriptions — write them precisely."],
  ["transport","stdio for local servers; remote over the network for shared ones."],
  ["use servers safely","Vet what you connect; grant least privilege; understand what a tool can do."],
  ["build your own","Expose your data or actions as an MCP server — often with Claude Code's help."],
  ["registries","Discover and share MCP servers through directories."],
  ["lethal trifecta","Private data + untrusted content + outbound channel = injection/exfiltration risk.","risk"],
  ["break the chain","Remove any one leg of the trifecta to neutralize the risk."],
  ["least privilege","Give a server only the access it needs — read-only if it only reads."]
]},
{tid:"t9", title:"Track 9 — The Claude API", items:[
  ["from user to builder","The API lets your own code send messages to Claude and build products."],
  ["Messages API","Send a list of user/assistant messages; get Claude's reply."],
  ["system prompt","Set role and rules for the whole request, separate from messages."],
  ["streaming","Receive tokens as generated for snappy, live interfaces."],
  ["vision & PDFs","Pass images and documents; Claude reads charts, screenshots, and files."],
  ["tool use","Define functions Claude can call, then feed results back — giving it hands."],
  ["structured output","Constrain replies to a schema so your code gets reliable JSON."],
  ["prompt caching","Reuse unchanging prompt prefixes for a large discount on repeated context."],
  ["batch","Submit many requests asynchronously for a big price cut when speed is not critical."],
  ["cost engineering","Right model + caching + batching + tight tokens = economics that work."],
  ["model mix","Cheap models for easy steps, capable ones for hard steps."],
  ["keep keys secret","Never expose your API key in client code or a public repo.","risk"]
]},
{tid:"t10", title:"Track 10 — Agents", items:[
  ["agent = goal + loop","Think, act with a tool, observe, repeat until the goal is met."],
  ["workflows vs agents","Fixed workflows are predictable; open agents are flexible. Prefer the simplest that works."],
  ["patterns","Chain, route, parallelize, orchestrate — compose steps deliberately."],
  ["Agent SDK","Build agents on the same engine that powers Claude Code, as a library."],
  ["Managed Agents","Anthropic-hosted agents in a sandbox — agentic behavior without running servers."],
  ["reliability","Evals + guardrails + human-in-the-loop turn a demo into a product."],
  ["human-in-the-loop","Gate consequential actions behind human approval."],
  ["agent security","Injection-aware, sandboxed, least-privilege — actions raise the stakes.","risk"],
  ["start simple","Add autonomy only when a simpler, more controllable design cannot do the job."]
]},
{tid:"t11", title:"Track 11 — Money I: Freelancing", items:[
  ["opportunity map","Real 2026 demand: automation, content, document, and analysis services."],
  ["productize one outcome","Sell a specific named result with set scope and price, not vague 'AI help'."],
  ["platforms","Upwork, Fiverr, LinkedIn — lead with a clear offer and real samples."],
  ["pricing: value not time","Price on the outcome's worth to the client; your speed is margin, not a discount."],
  ["hourly / project / retainer","Retainers give stable recurring income; aim to move clients there."],
  ["delivery system","A repeatable pipeline delivers great work fast — consistency is the product."],
  ["quality gate","Verify every deliverable against the input before sending. Protects your reputation.","risk"],
  ["freelancer to agency","Systematize and add people to scale beyond your own hours."],
  ["trust: contracts + disclosure","Clear scope, honest AI disclosure, careful data handling keep clients."],
  ["proof beats credentials","Samples and results win work — a proof-gated field favors demonstrable ability."]
]},
{tid:"t12", title:"Track 12 — Money II: Products", items:[
  ["micro-SaaS","A small, focused API-powered product with recurring revenue, often built solo."],
  ["validate first","Confirm people will pay before building fully — kill bad ideas cheaply."],
  ["unit economics","Know cost per use (mostly tokens) vs price. Cost below price = viable.","risk"],
  ["caching + model mix","Cut per-use cost so the margin works at scale."],
  ["build lean","Ship an MVP, learn from real users, iterate — Claude is your team."],
  ["sell skills & MCP servers","Package and sell reusable capabilities, plugins, and servers."],
  ["content leverage: honest","Content can attract buyers but is slow and uncertain — no guaranteed virality."],
  ["anti-hype","Most 'easy AI money' claims fail. Real products take real work and validation."],
  ["distribution is the hard part","Building is easy now; getting users is the actual challenge — plan for it."]
]},
{tid:"t13", title:"Track 13 — Money III: Get Hired", items:[
  ["AI-native market (2026)","AI engineer, automation specialist, applied-AI roles pay a premium and are in demand."],
  ["employers want applied skills","Build + reliable + secure + ROI beats pure ML theory for most roles."],
  ["the scarce gap","Between theory-only and hype-only sits the applied builder-operator — that is you."],
  ["certifications","Anthropic's ladder (~$99-175) is a useful complement to a portfolio, never a replacement."],
  ["portfolio proves it","Shipped, real work is your strongest asset — capstones are portfolio gold."],
  ["AI-native [your field]","Domain expertise + AI is a scarce, valued position — do not abandon your field."],
  ["job-hunt with Claude","Use Claude for targeting, applications, outreach, and interview prep."],
  ["interviews: show, do not tell","Demonstrate applied capability and judgment; discuss reliability and security."],
  ["level honestly","Target roles your proof supports; land, deliver, grow."]
]},
{tid:"t14", title:"Track 14 — Capstones", items:[
  ["A: automation suite","3-5 repeatable automations + a Skill + a scheduled task. Reclaim your time; prove operator skill."],
  ["B: document pipeline","One input->output transformation, templated with a quality gate. Your first sellable service."],
  ["C: MCP server + code","Build a useful server, wire it in, use it in a workflow — securely. Operator to builder."],
  ["D: API micro-product","Ship one small function live: usable, economical, reliable, secure. Flagship portfolio piece."],
  ["E: 30-day income launch","Package -> get visible -> engage -> close. Real first step, Claude as co-pilot."],
  ["consistency & verification","Every capstone: repeatable process + a verification step. Reliability is the value."],
  ["honest economics","For the product, know cost per use and that the margin works — the maturity signal."],
  ["engineering > the AI call","What makes a product is the reliability, economics, and security around the model call."],
  ["momentum over perfection","Ship, get visible, iterate from reality. The first step is the one most people skip."],
  ["never stop learning","The durable edge is continuing to learn and build as the field moves."]
]}
];
