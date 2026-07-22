/* Diagrams — inline, self-contained SVGs keyed by lesson id.
   Shape: DIAGRAMS[id] = {svg, cap}. Rendered inside <figure class="diagram">.
   Ember Loom palette; every label sized to fit its box (no overflow). */
window.DIAGRAMS = {};
(function(){
var D = window.DIAGRAMS;
var F = "font-family:'Inter',system-ui,sans-serif";

/* 1.1 — next-token prediction */
D["1.1"] = { cap:"Claude generates language by predicting the next token, appending it, and repeating — pattern completion, not lookup.",
 svg:`<svg viewBox="0 0 720 300" role="img" style="${F}">
  <rect width="720" height="300" fill="#171310"/>
  <text x="30" y="40" fill="#b8a894" font-size="14">Your text so far</text>
  ${["The","cat","sat","on","the"].map((w,i)=>`<g><rect x="${28+i*74}" y="55" width="66" height="34" rx="9" fill="#2e241d" stroke="#4a3a2c"/><text x="${61+i*74}" y="78" fill="#f2e8dd" font-size="15" text-anchor="middle">${w}</text></g>`).join("")}
  <path d="M400 72 H452" stroke="#ff8a54" stroke-width="2" marker-end="url(#a11)"/>
  <defs><marker id="a11" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#ff8a54"/></marker></defs>
  <rect x="456" y="45" width="120" height="90" rx="14" fill="#241d18" stroke="#ff8a54" stroke-width="1.5"/>
  <text x="516" y="85" fill="#ffb454" font-size="17" text-anchor="middle" font-weight="700">Claude</text>
  <text x="516" y="107" fill="#b8a894" font-size="12" text-anchor="middle">predicts next</text>
  <text x="590" y="40" fill="#b8a894" font-size="14">Probabilities</text>
  ${[["mat 62%",0.62,"#4fd6b5"],["rug 23%",0.23,"#6aa8ff"],["floor 9%",0.09,"#b79cff"]].map((r,i)=>`<text x="590" y="${64+i*34}" fill="${r[2]}" font-size="12.5" font-weight="700">${r[0]}</text><rect x="590" y="${70+i*34}" width="112" height="8" rx="4" fill="#2e241d"/><rect x="590" y="${70+i*34}" width="${(112*r[1]).toFixed(0)}" height="8" rx="4" fill="${r[2]}"/>`).join("")}
  <path d="M516 135 V175 H120 V95" fill="none" stroke="#8a7c6a" stroke-width="1.6" stroke-dasharray="5 5" marker-end="url(#a11)"/>
  <text x="360" y="205" fill="#b8a894" font-size="13" text-anchor="middle">pick the token &#8594; append it &#8594; feed back &#8594; repeat, one token at a time</text>
 </svg>` };

/* 1.2 — context window */
D["1.2"] = { cap:"The context window is Claude's finite working memory — everything it can see at once, measured in tokens.",
 svg:`<svg viewBox="0 0 720 300" role="img" style="${F}">
  <rect width="720" height="300" fill="#171310"/>
  <rect x="40" y="45" width="470" height="210" rx="16" fill="#1b1613" stroke="#4a3a2c"/>
  <text x="52" y="35" fill="#b8a894" font-size="14">Context window (finite token budget)</text>
  ${[["System prompt","#ff8a54",40],["Your files / context","#ffd24d",64],["Conversation so far","#4fd6b5",56],["Your new message","#6aa8ff",34]].map((r,i,arr)=>{var y=57+arr.slice(0,i).reduce((s,x)=>s+x[2]+6,0);return `<rect x="52" y="${y}" width="446" height="${r[2]}" rx="8" fill="${r[1]}22" stroke="${r[1]}"/><text x="66" y="${y+r[2]/2+5}" fill="#f2e8dd" font-size="14">${r[0]}</text>`;}).join("")}
  <rect x="540" y="45" width="150" height="210" rx="12" fill="#241d18" stroke="#4a3a2c"/>
  <text x="615" y="72" fill="#ffb454" font-size="13" text-anchor="middle" font-weight="700">Watch out</text>
  <text x="615" y="100" fill="#b8a894" font-size="12" text-anchor="middle">Too much</text>
  <text x="615" y="118" fill="#b8a894" font-size="12" text-anchor="middle">irrelevant</text>
  <text x="615" y="136" fill="#b8a894" font-size="12" text-anchor="middle">material can</text>
  <text x="615" y="154" fill="#b8a894" font-size="12" text-anchor="middle">dilute focus.</text>
  <text x="615" y="188" fill="#4fd6b5" font-size="12" text-anchor="middle">Put the right</text>
  <text x="615" y="206" fill="#4fd6b5" font-size="12" text-anchor="middle">things in,</text>
  <text x="615" y="224" fill="#4fd6b5" font-size="12" text-anchor="middle">not everything.</text>
 </svg>` };

/* 1.3 — model family */
D["1.3"] = { cap:"The Claude family trades capability against cost and speed. Match the tier to the task instead of always reaching for the biggest.",
 svg:`<svg viewBox="0 0 720 300" role="img" style="${F}">
  <rect width="720" height="300" fill="#171310"/>
  ${[["Haiku","fastest &#183; cheapest","high-volume, simpler tasks","#4fd6b5",70,150],["Sonnet","balanced workhorse","most everyday tasks","#ffb454",130,215],["Opus","most capable","the hardest reasoning","#b79cff",190,280]].map((r,i)=>`
   <rect x="40" y="${60+i*70}" width="${r[5]}" height="52" rx="10" fill="${r[3]}22" stroke="${r[3]}"/>
   <text x="58" y="${82+i*70}" fill="${r[3]}" font-size="17" font-weight="700">${r[0]}</text>
   <text x="58" y="${101+i*70}" fill="#b8a894" font-size="12">${r[1]}</text>
   <text x="${60+r[5]+18}" y="${90+i*70}" fill="#f2e8dd" font-size="13">${r[2]}</text>`).join("")}
  <text x="40" y="285" fill="#8a7c6a" font-size="12">&#8592; cheaper / faster &#160;&#160;&#160;&#160;&#160;&#160; more capable / costlier &#8594;</text>
 </svg>` };

/* 1.6 — verify loop */
D["1.6"] = { cap:"The truth discipline: never trust unverified factual output. Check it, then rely on it — or correct it.",
 svg:`<svg viewBox="0 0 720 260" role="img" style="${F}">
  <rect width="720" height="260" fill="#171310"/>
  <rect x="40" y="90" width="140" height="70" rx="12" fill="#241d18" stroke="#ff8a54"/><text x="110" y="130" fill="#ffb454" font-size="15" text-anchor="middle" font-weight="700">Claude output</text>
  <path d="M180 125 H250" stroke="#ff8a54" stroke-width="2" marker-end="url(#a16)"/>
  <defs><marker id="a16" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#ff8a54"/></marker></defs>
  <polygon points="330,90 400,125 330,160 260,125" fill="#241d18" stroke="#ffd24d"/><text x="330" y="122" fill="#ffd24d" font-size="13" text-anchor="middle" font-weight="700">Verify</text><text x="330" y="139" fill="#b8a894" font-size="11" text-anchor="middle">facts?</text>
  <path d="M400 125 H470" stroke="#7dd97a" stroke-width="2" marker-end="url(#a16b)"/>
  <defs><marker id="a16b" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#7dd97a"/></marker></defs>
  <rect x="470" y="90" width="150" height="70" rx="12" fill="#7dd97a22" stroke="#7dd97a"/><text x="545" y="123" fill="#7dd97a" font-size="14" text-anchor="middle" font-weight="700">Trust &amp; use</text><text x="545" y="143" fill="#b8a894" font-size="11" text-anchor="middle">checks out</text>
  <path d="M330 160 V210 H110 V160" fill="none" stroke="#ff7a9c" stroke-width="1.8" stroke-dasharray="5 5" marker-end="url(#a16c)"/>
  <defs><marker id="a16c" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#ff7a9c"/></marker></defs>
  <text x="220" y="203" fill="#ff7a9c" font-size="12" text-anchor="middle">wrong &#8594; correct &amp; re-check</text>
 </svg>` };

/* 2.1 — prompt anatomy */
D["2.1"] = { cap:"A complete prompt: task, context, examples, format, and constraints — each part removes a way the output could go wrong.",
 svg:`<svg viewBox="0 0 720 300" role="img" style="${F}">
  <rect width="720" height="300" fill="#171310"/>
  ${[["Task","what you want done","#ff8a54"],["Context","audience, purpose, background","#ffd24d"],["Examples","show the pattern (few-shot)","#4fd6b5"],["Format","JSON / table / template","#6aa8ff"],["Constraints","length, tone, must / must-not","#b79cff"]].map((r,i)=>`
   <rect x="60" y="${30+i*50}" width="600" height="42" rx="9" fill="${r[2]}18" stroke="${r[2]}"/>
   <text x="78" y="${56+i*50}" fill="${r[2]}" font-size="15" font-weight="700">${r[0]}</text>
   <text x="210" y="${56+i*50}" fill="#f2e8dd" font-size="13">${r[1]}</text>`).join("")}
 </svg>` };

/* 3.1 — prompt chaining */
D["3.1"] = { cap:"Prompt chaining: split a complex task into focused stages, each verifiable, each feeding the next.",
 svg:`<svg viewBox="0 0 720 220" role="img" style="${F}">
  <rect width="720" height="220" fill="#171310"/>
  ${[["Extract","#ff8a54"],["Structure","#ffd24d"],["Draft","#4fd6b5"],["Verify","#7dd97a"]].map((r,i)=>`
   <rect x="${30+i*172}" y="70" width="140" height="80" rx="12" fill="${r[1]}1e" stroke="${r[1]}"/>
   <text x="${100+i*172}" y="115" fill="${r[1]}" font-size="16" text-anchor="middle" font-weight="700">${r[0]}</text>
   <text x="${100+i*172}" y="136" fill="#b8a894" font-size="11" text-anchor="middle">stage ${i+1}</text>
   ${i<3?`<path d="M${170+i*172} 110 H${202+i*172}" stroke="#8a7c6a" stroke-width="2" marker-end="url(#a31)"/>`:""}`).join("")}
  <defs><marker id="a31" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#8a7c6a"/></marker></defs>
  <text x="360" y="185" fill="#b8a894" font-size="13" text-anchor="middle">each stage does one job well &#8594; reliable output on complex work</text>
 </svg>` };

/* 8.1 — MCP */
D["8.1"] = { cap:"MCP is the USB-C of AI: one standard connecting an MCP client (Claude) to servers that expose tools and data.",
 svg:`<svg viewBox="0 0 720 280" role="img" style="${F}">
  <rect width="720" height="280" fill="#171310"/>
  <rect x="40" y="105" width="150" height="70" rx="12" fill="#241d18" stroke="#ff8a54"/><text x="115" y="135" fill="#ffb454" font-size="15" text-anchor="middle" font-weight="700">Claude</text><text x="115" y="155" fill="#b8a894" font-size="11" text-anchor="middle">MCP client</text>
  <line x1="190" y1="140" x2="300" y2="140" stroke="#4fd6b5" stroke-width="2.5"/><text x="245" y="130" fill="#4fd6b5" font-size="12" text-anchor="middle">MCP</text>
  <rect x="300" y="105" width="150" height="70" rx="12" fill="#241d18" stroke="#4fd6b5"/><text x="375" y="135" fill="#4fd6b5" font-size="14" text-anchor="middle" font-weight="700">MCP server</text><text x="375" y="155" fill="#b8a894" font-size="11" text-anchor="middle">exposes tools</text>
  ${[["Database","#6aa8ff",40],["Your API","#ffd24d",110],["Files","#b79cff",180]].map(r=>`<rect x="510" y="${r[2]}" width="160" height="52" rx="10" fill="${r[1]}1e" stroke="${r[1]}"/><text x="590" y="${r[2]+31}" fill="${r[1]}" font-size="14" text-anchor="middle" font-weight="700">${r[0]}</text>`).join("")}
  ${[66,136,206].map(y=>`<path d="M450 140 C480 140 480 ${y} 508 ${y}" fill="none" stroke="#8a7c6a" stroke-width="1.8" marker-end="url(#a81)"/>`).join("")}
  <defs><marker id="a81" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#8a7c6a"/></marker></defs>
  <text x="360" y="255" fill="#b8a894" font-size="12" text-anchor="middle">build a server once &#8594; it works with any MCP client</text>
 </svg>` };

/* 8.5 — lethal trifecta */
D["8.5"] = { cap:"The lethal trifecta: private data + untrusted content + an outbound channel. Remove any one leg to break the risk.",
 svg:`<svg viewBox="0 0 720 320" role="img" style="${F}">
  <rect width="720" height="320" fill="#171310"/>
  <circle cx="290" cy="150" r="105" fill="#ff8a5426" stroke="#ff8a54"/>
  <circle cx="430" cy="150" r="105" fill="#6aa8ff26" stroke="#6aa8ff"/>
  <circle cx="360" cy="240" r="105" fill="#b79cff26" stroke="#b79cff"/>
  <text x="248" y="120" fill="#ffb454" font-size="13" text-anchor="middle" font-weight="700">Private</text><text x="248" y="137" fill="#ffb454" font-size="13" text-anchor="middle" font-weight="700">data</text>
  <text x="472" y="120" fill="#6aa8ff" font-size="13" text-anchor="middle" font-weight="700">Untrusted</text><text x="472" y="137" fill="#6aa8ff" font-size="13" text-anchor="middle" font-weight="700">content</text>
  <text x="360" y="268" fill="#b79cff" font-size="13" text-anchor="middle" font-weight="700">Outbound</text><text x="360" y="285" fill="#b79cff" font-size="13" text-anchor="middle" font-weight="700">channel</text>
  <text x="360" y="170" fill="#ff7a9c" font-size="13" text-anchor="middle" font-weight="700">data</text><text x="360" y="187" fill="#ff7a9c" font-size="13" text-anchor="middle" font-weight="700">theft</text>
 </svg>` };

/* 9.1 — API request/response */
D["9.1"] = { cap:"An API call: your code sends messages (plus a system prompt) to Claude; Claude returns a completion your code uses.",
 svg:`<svg viewBox="0 0 720 240" role="img" style="${F}">
  <rect width="720" height="240" fill="#171310"/>
  <rect x="40" y="80" width="170" height="80" rx="12" fill="#241d18" stroke="#6aa8ff"/><text x="125" y="112" fill="#6aa8ff" font-size="15" text-anchor="middle" font-weight="700">Your code</text><text x="125" y="133" fill="#b8a894" font-size="11" text-anchor="middle">sends a request</text>
  <path d="M210 105 H500" stroke="#ff8a54" stroke-width="2" marker-end="url(#a91)"/><text x="355" y="96" fill="#ff8a54" font-size="12" text-anchor="middle">messages + system prompt</text>
  <path d="M500 140 H210" stroke="#4fd6b5" stroke-width="2" marker-end="url(#a91b)"/><text x="355" y="160" fill="#4fd6b5" font-size="12" text-anchor="middle">completion (text / JSON)</text>
  <defs><marker id="a91" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#ff8a54"/></marker><marker id="a91b" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#4fd6b5"/></marker></defs>
  <rect x="500" y="80" width="170" height="80" rx="12" fill="#241d18" stroke="#ff8a54"/><text x="585" y="112" fill="#ffb454" font-size="15" text-anchor="middle" font-weight="700">Claude API</text><text x="585" y="133" fill="#b8a894" font-size="11" text-anchor="middle">Messages endpoint</text>
  <text x="360" y="205" fill="#8a7c6a" font-size="12" text-anchor="middle">stateless: you send the whole conversation each call</text>
 </svg>` };

/* 9.4 — tool use loop */
D["9.4"] = { cap:"Tool use gives Claude hands: it requests a tool call, your code runs it, and the result feeds back until Claude can answer.",
 svg:`<svg viewBox="0 0 720 260" role="img" style="${F}">
  <rect width="720" height="260" fill="#171310"/>
  <rect x="60" y="100" width="150" height="70" rx="12" fill="#241d18" stroke="#ff8a54"/><text x="135" y="132" fill="#ffb454" font-size="14" text-anchor="middle" font-weight="700">Claude</text><text x="135" y="152" fill="#b8a894" font-size="11" text-anchor="middle">wants a tool</text>
  <path d="M210 120 H300" stroke="#ffd24d" stroke-width="2" marker-end="url(#a94)"/><text x="255" y="110" fill="#ffd24d" font-size="11" text-anchor="middle">call + args</text>
  <rect x="300" y="100" width="150" height="70" rx="12" fill="#241d18" stroke="#6aa8ff"/><text x="375" y="132" fill="#6aa8ff" font-size="14" text-anchor="middle" font-weight="700">Your tool</text><text x="375" y="152" fill="#b8a894" font-size="11" text-anchor="middle">runs, returns</text>
  <path d="M450 150 C520 150 520 205 300 205 C180 205 180 172 180 172" fill="none" stroke="#4fd6b5" stroke-width="2" marker-end="url(#a94b)"/><text x="360" y="223" fill="#4fd6b5" font-size="11" text-anchor="middle">result feeds back</text>
  <defs><marker id="a94" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#ffd24d"/></marker><marker id="a94b" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#4fd6b5"/></marker></defs>
  <path d="M510 135 H600" stroke="#7dd97a" stroke-width="2" marker-end="url(#a94c)"/>
  <defs><marker id="a94c" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#7dd97a"/></marker></defs>
  <rect x="600" y="100" width="90" height="70" rx="12" fill="#7dd97a22" stroke="#7dd97a"/><text x="645" y="140" fill="#7dd97a" font-size="13" text-anchor="middle" font-weight="700">Answer</text>
 </svg>` };

/* 9.6 — caching economics */
D["9.6"] = { cap:"Prompt caching bills you full price for a large unchanging prefix once, then a fraction on reuse — a steep discount at scale.",
 svg:`<svg viewBox="0 0 720 240" role="img" style="${F}">
  <rect width="720" height="240" fill="#171310"/>
  <text x="60" y="45" fill="#b8a894" font-size="13">Without caching (every call pays full price)</text>
  ${[0,1,2,3].map(i=>`<rect x="${60+i*70}" y="60" width="56" height="46" rx="7" fill="#ff7a9c33" stroke="#ff7a9c"/><text x="${88+i*70}" y="88" fill="#ff7a9c" font-size="13" text-anchor="middle" font-weight="700">$$$</text>`).join("")}
  <text x="60" y="150" fill="#b8a894" font-size="13">With caching (pay once, then a fraction)</text>
  <rect x="60" y="165" width="56" height="46" rx="7" fill="#ff7a9c33" stroke="#ff7a9c"/><text x="88" y="193" fill="#ff7a9c" font-size="13" text-anchor="middle" font-weight="700">$$$</text>
  ${[1,2,3].map(i=>`<rect x="${60+i*70}" y="177" width="56" height="22" rx="6" fill="#7dd97a33" stroke="#7dd97a"/><text x="${88+i*70}" y="193" fill="#7dd97a" font-size="12" text-anchor="middle" font-weight="700">$</text>`).join("")}
  <text x="400" y="120" fill="#4fd6b5" font-size="13">Best when many calls</text><text x="400" y="140" fill="#4fd6b5" font-size="13">share the same big context.</text>
 </svg>` };

/* 10.1 — agent loop */
D["10.1"] = { cap:"An agent is a goal plus a loop: think, act with a tool, observe the result, decide the next step — until done.",
 svg:`<svg viewBox="0 0 720 300" role="img" style="${F}">
  <rect width="720" height="300" fill="#171310"/>
  <rect x="300" y="30" width="130" height="56" rx="12" fill="#ff8a541e" stroke="#ff8a54"/><text x="365" y="64" fill="#ffb454" font-size="15" text-anchor="middle" font-weight="700">Think</text>
  <rect x="520" y="130" width="130" height="56" rx="12" fill="#ffd24d1e" stroke="#ffd24d"/><text x="585" y="164" fill="#ffd24d" font-size="15" text-anchor="middle" font-weight="700">Act (tool)</text>
  <rect x="300" y="220" width="130" height="56" rx="12" fill="#4fd6b51e" stroke="#4fd6b5"/><text x="365" y="254" fill="#4fd6b5" font-size="15" text-anchor="middle" font-weight="700">Observe</text>
  <rect x="80" y="130" width="130" height="56" rx="12" fill="#b79cff1e" stroke="#b79cff"/><text x="145" y="158" fill="#b79cff" font-size="14" text-anchor="middle" font-weight="700">Decide</text><text x="145" y="175" fill="#b8a894" font-size="11" text-anchor="middle">next / done?</text>
  <path d="M430 62 C500 70 520 100 560 128" fill="none" stroke="#8a7c6a" stroke-width="2" marker-end="url(#a101)"/>
  <path d="M560 186 C520 215 460 235 432 244" fill="none" stroke="#8a7c6a" stroke-width="2" marker-end="url(#a101)"/>
  <path d="M300 250 C220 240 190 210 165 188" fill="none" stroke="#8a7c6a" stroke-width="2" marker-end="url(#a101)"/>
  <path d="M150 130 C165 95 220 70 298 60" fill="none" stroke="#8a7c6a" stroke-width="2" marker-end="url(#a101)"/>
  <defs><marker id="a101" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#8a7c6a"/></marker></defs>
  <text x="365" y="158" fill="#8a7c6a" font-size="12" text-anchor="middle">repeat until</text><text x="365" y="175" fill="#8a7c6a" font-size="12" text-anchor="middle">the goal is met</text>
 </svg>` };

/* 10.2 — workflow patterns */
D["10.2"] = { cap:"Compose deliberately: chain steps in sequence, route inputs to the right handler, or orchestrate parallel work.",
 svg:`<svg viewBox="0 0 720 250" role="img" style="${F}">
  <rect width="720" height="250" fill="#171310"/>
  <text x="120" y="40" fill="#ff8a54" font-size="14" text-anchor="middle" font-weight="700">Chain</text>
  ${[0,1,2].map(i=>`<rect x="${60+i*46}" y="70" width="36" height="30" rx="6" fill="#ff8a541e" stroke="#ff8a54"/>${i<2?`<path d="M${96+i*46} 85 H${104+i*46}" stroke="#8a7c6a" stroke-width="1.6"/>`:""}`).join("")}
  <text x="360" y="40" fill="#ffd24d" font-size="14" text-anchor="middle" font-weight="700">Route</text>
  <rect x="300" y="60" width="46" height="30" rx="6" fill="#ffd24d1e" stroke="#ffd24d"/>
  ${[0,1,2].map(i=>`<rect x="380" y="${50+i*34}" width="46" height="26" rx="6" fill="#ffd24d1e" stroke="#ffd24d"/><path d="M346 75 L378 ${63+i*34}" stroke="#8a7c6a" stroke-width="1.4"/>`).join("")}
  <text x="600" y="40" fill="#4fd6b5" font-size="14" text-anchor="middle" font-weight="700">Orchestrate</text>
  <rect x="577" y="55" width="46" height="28" rx="6" fill="#4fd6b51e" stroke="#4fd6b5"/>
  ${[0,1,2].map(i=>`<rect x="${540+i*40}" y="120" width="34" height="26" rx="6" fill="#4fd6b51e" stroke="#4fd6b5"/><path d="M600 83 L${557+i*40} 118" stroke="#8a7c6a" stroke-width="1.4"/>`).join("")}
  <rect x="577" y="175" width="46" height="26" rx="6" fill="#4fd6b533" stroke="#4fd6b5"/>
  ${[0,1,2].map(i=>`<path d="M${557+i*40} 146 L600 173" stroke="#8a7c6a" stroke-width="1.4"/>`).join("")}
  <text x="360" y="235" fill="#b8a894" font-size="12" text-anchor="middle">prefer the simplest structure that solves the problem</text>
 </svg>` };

/* 11.4 — pricing models */
D["11.4"] = { cap:"Three pricing models. Value-based project and retainer pricing capture AI's speed as margin; hourly gives it away.",
 svg:`<svg viewBox="0 0 720 230" role="img" style="${F}">
  <rect width="720" height="230" fill="#171310"/>
  ${[["Hourly","paid per hour","speed cuts your pay","#ff7a9c"],["Project","paid per outcome","speed is your margin","#ffd24d"],["Retainer","paid monthly","stable, compounding","#7dd97a"]].map((r,i)=>`
   <rect x="${40+i*225}" y="50" width="200" height="120" rx="14" fill="${r[3]}18" stroke="${r[3]}"/>
   <text x="${140+i*225}" y="90" fill="${r[3]}" font-size="17" text-anchor="middle" font-weight="700">${r[0]}</text>
   <text x="${140+i*225}" y="118" fill="#f2e8dd" font-size="13" text-anchor="middle">${r[1]}</text>
   <text x="${140+i*225}" y="142" fill="#b8a894" font-size="12" text-anchor="middle">${r[2]}</text>`).join("")}
  <text x="360" y="200" fill="#4fd6b5" font-size="13" text-anchor="middle">price on the value delivered, not the minutes spent</text>
 </svg>` };

/* 14.1 — the five capstones */
D["14.1"] = { cap:"The five capstones build from personal leverage to shipped product to income — each a portfolio-grade proof.",
 svg:`<svg viewBox="0 0 720 210" role="img" style="${F}">
  <rect width="720" height="210" fill="#171310"/>
  ${[["A","Automation suite","#4fd6b5"],["B","Document pipeline","#ffd24d"],["C","MCP + code","#ff8a54"],["D","API product","#6aa8ff"],["E","Income launch","#b79cff"]].map((r,i)=>`
   <rect x="${24+i*138}" y="70" width="122" height="72" rx="12" fill="${r[2]}1e" stroke="${r[2]}"/>
   <text x="${85+i*138}" y="104" fill="${r[2]}" font-size="20" text-anchor="middle" font-weight="700">${r[0]}</text>
   <text x="${85+i*138}" y="126" fill="#f2e8dd" font-size="11.5" text-anchor="middle">${r[1]}</text>`).join("")}
  ${[0,1,2,3].map(i=>`<path d="M${146+i*138} 106 H${162+i*138}" stroke="#8a7c6a" stroke-width="1.8" marker-end="url(#a141)"/>`).join("")}
  <defs><marker id="a141" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#8a7c6a"/></marker></defs>
  <text x="360" y="180" fill="#b8a894" font-size="12" text-anchor="middle">operator &#8594; builder &#8594; earner</text>
 </svg>` };

})();
