/* Pass 2 — Track 9 (The Claude API). Prices are the pass-1 verified list
   prices (platform.claude.com/docs/en/about-claude/pricing, checked
   2026-11-03), per million tokens:
     Sonnet 5.5  input $2 · 5-min cache write $2.50 · cache read $0.10 · output $10
     Opus 5.5    input $4 · output $20     Haiku 5.5 (prompts ≤100k) input $0.10 · output $0.50
   NOTE: the claude-api skill's cached Sonnet 5.5 cache-read figure ($0.20)
   is stale; the live pricing page says $0.10 and that is what we use. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 9.1 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Your code",s:"model + messages\n+ max_tokens",tone:"b"},
    {t:"Anthropic API",s:"checks your key,\nruns the model",tone:"a"},
    {t:"Response (JSON)",s:"content blocks,\nstop_reason, usage",tone:"g"},
    {t:"Your code again",s:"joins the text blocks,\nlogs the tokens",tone:"e"}
  ],{cols:2,bh:76,gy:32,stepped:true,aria:"An API request and response"});
  E["9.1"]={
    plain:"<p>The <b>API</b> (application programming interface) lets your own program talk to Claude. There's no chat window. Your code sends a request and gets an answer back as data.</p><p>A request names the model, includes your messages, and sets a limit on the answer's length. It also carries your secret <b>API key</b>, which proves the request is yours.</p><p>You pay for the tokens you send and receive, and the response tells you exactly how many.</p>",
    map:[["Posting a letter","Sending a request"],["The stamp","Your API key"],["The reply letter","The JSON response"],["The postage bill","Token usage you pay for"]],
    breaks:"A letter's stamp costs the same whatever you write. With the API, longer messages and longer answers cost more, every single time.",
    viz:{svg:s.svg(),cap:"One round trip. The response is data, so your code decides what happens next.",
      steps:["Your code builds a request: which model, the messages, and max_tokens.","The API checks your key and runs the model.","It returns JSON: a list of content blocks, why it stopped, and the token counts.","Your code joins the text blocks (a thinking block can come first) and records the usage."]},
    line:"The API lets your code send Claude a message and get the answer back as data."
  };
})();

/* ---------- 9.2 ---------- */
(function(){
  var s=VZ.scene(400,270,"Each call resends the whole conversation as a list of messages, with the system prompt alongside");
  s.box(14,14,372,40,"system: «You are a patient maths tutor»",null,"a",{rx:8});
  var msgs=[["user","What is 7 × 8?","b"],["assistant","56","t"],["user","And 7 × 9?","b"]];
  msgs.forEach(function(m,i){s.box(i%2?120:14,66+i*44,266,36,m[0]+": "+m[1],null,m[2],{rx:8})});
  s.box(14,206,170,48,"Call 3 sends\nall of this",null,"g");
  var st=s.box(216,206,170,48,"Streamed reply","«63» arrives live","e");
  s.path("M186 230 H212",{});
  E["9.2"]={
    plain:"<p>The API doesn't remember past calls. To hold a conversation, your code sends the whole chat every time, as a list of <b>messages</b> marked «user» or «assistant».</p><p>Standing instructions go in a separate <b>system</b> field. <b>Streaming</b> lets the answer arrive word by word, so users aren't left waiting.</p><p>A few settings tune the call, like <code>max_tokens</code> and <code>effort</code>. Older settings, temperature and prefilling the reply, are rejected by current models.</p>",
    map:[["Re-reading the whole letter chain before replying","Resending all messages each call"],["The house rules pinned above the desk","The system field"],["Reading a reply as it's typed","Streaming"]],
    breaks:"A pen pal remembers earlier letters. The API remembers nothing, so long chats get more expensive each turn because you resend everything.",
    viz:{svg:s.svg(),cap:"The third call carries the system prompt and all three messages. The reply streams back in pieces."},
    line:"Each API call sends the whole conversation, because the API itself remembers nothing."
  };
})();

/* ---------- 9.3 ---------- */
(function(){
  var s=VZ.scene(400,240,"Images and PDFs go into the same message as text; Claude reads them; code does the maths");
  var im=s.box(14,14,150,50,"Image","base64, URL or file","g"),pdf=s.box(14,80,150,50,"PDF","text + page images","v"),tx=s.box(14,146,150,50,"Your question",null,"b");
  var c=s.box(200,62,96,86,"Claude",null,"a");
  [im,pdf,tx].forEach(function(b){s.link(b,c)});
  var o=s.box(318,62,70,86,"JSON",null,"e");s.link(c,o);
  s.text(200,222,"read with eyes · compute totals with code","sm");
  E["9.3"]={
    plain:"<p>Through the API, Claude can read images and PDFs, not just text. You attach them to a message next to your question.</p><p>A PDF is read both as text and as page pictures, so tables and charts count too. That turns jobs like «read 500 invoices» into a program.</p><p>The same rule as in the app applies: Claude's eyes for reading, code for the maths.</p>",
    map:[["Showing someone a photo and asking about it","An image block plus a text question"],["Handing over a printed report","A PDF document block"],["Doing the sums on a calculator","Computing totals in code"]],
    breaks:"A person squints harder at a blurry photo. Claude may just misread it, so check numbers from low-quality scans.",
    viz:{svg:s.svg(),cap:"Pictures, documents and questions travel together in one message; the answer comes back as data."},
    line:"Claude can read pictures and PDFs through the API, so reading jobs become programs."
  };
})();

/* ---------- 9.4 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Claude",s:"«I need get_weather»",tone:"a"},
    {t:"stop_reason:\ntool_use",s:"structured request",tone:"g"},
    {t:"Your code runs it",s:"calls the real API",tone:"b"},
    {t:"tool_result",s:"sent back to Claude",tone:"t"}
  ],{w:400,h:300,bw:150,bh:66,stepped:true,center:"until Claude\nanswers in words",aria:"The tool-use loop between Claude and your code"});
  E["9.4"]={
    plain:"<p><b>Tool use</b> lets Claude ask your program to do things, like look up the weather or save a record.</p><p>You describe each tool: its name, what it does, and its inputs. When Claude needs one, it stops and sends a structured request. Your code runs the real function and sends the result back, and Claude carries on.</p><p>Claude never runs anything itself: your code stays in charge.</p>",
    map:[["Asking a friend to check the train times","Claude requesting a tool"],["The friend actually checking","Your code running the function"],["The friend telling you the answer","The tool_result message"]],
    breaks:"A friend can decide not to help. Your code always decides too, but only if you write the checks: validate inputs before running anything that changes data.",
    viz:{svg:s.svg(),cap:"The loop runs until Claude has what it needs and answers in plain words.",
      steps:["Claude decides it needs a tool and says which one, with inputs.","The response stops with stop_reason «tool_use».","Your code checks the inputs and runs the real function.","You send a tool_result back; Claude continues, maybe calling another tool."]},
    line:"Claude asks for a tool, your code runs it, and Claude uses the result."
  };
})();

/* ---------- 9.5 ---------- */
(function(){
  var s=VZ.scene(400,256,"Structured outputs: a JSON schema constrains the answer; check stop_reason first");
  var sc=s.box(14,14,160,96,"JSON schema","vendor: string\ntotal: number\nadditionalProperties:\nfalse","v");
  var c=s.box(214,30,172,60,"Claude","must fit the schema","a");
  s.link(sc,c);
  var ok=s.box(214,130,172,64,"Valid JSON","parse, no guessing","e"),bad=s.box(14,130,160,64,"refusal or\nmax_tokens","shape may break","r");
  s.link(c,ok,"end_turn");s.link(c,bad,"check first",{bend:18});
  s.text(200,222,"the schema guarantees shape, not truth","sm h");
  E["9.5"]={
    plain:"<p>Programs need answers in an exact shape, usually <b>JSON</b>: labelled fields like <code>{\"total\": 412.5}</code>.</p><p><b>Structured outputs</b> let you give Claude a schema, a description of the fields and their types. The answer is then forced to match it, so your code can read it without guessing.</p><p>Two catches. If Claude refuses or runs out of room, the shape can break, so check why it stopped first. And a correct shape doesn't mean correct facts.</p>",
    map:[["The printed form","The JSON schema"],["Each labelled box","A required field with a type"],["The pen that can only write in boxes","Constrained decoding that forces the shape"]],
    breaks:"A form physically stops you writing outside the box. A schema does too, except when Claude refuses or hits max_tokens, and it never checks that what's written is true.",
    viz:{svg:s.svg(),cap:"The schema fixes the shape. Your code checks stop_reason before trusting it."},
    line:"Give Claude a JSON schema and the answer comes back in exactly that shape."
  };
})();

/* ---------- 9.6 cache hit vs miss ---------- */
var P96={base:2,write:2.5,read:0.1};
function v96(mode){
  var tok=100000,c={none:tok*P96.base/1e6,miss:tok*P96.write/1e6,hit:tok*P96.read/1e6};
  var s=VZ.scene(400,262,"Cost of a 100,000-token prefix with no cache, a cache miss and a cache hit on Sonnet 5.5");
  s.text(200,14,"COST OF A 100,000-TOKEN PREFIX · SONNET 5.5","sm h");
  [["No cache","none","n",P96.base],["Miss (write)","miss","g",P96.write],["Hit (read)","hit","e",P96.read]].forEach(function(r,i){var y=34+i*44,on=r[1]===mode;
    s.text(14,y+13,r[0],on?"tx b":"sm","start");s.bar(130,y,180,26,c[r[1]]/c.miss,on?r[2]:"n");s.text(320,y+13,"$"+c[r[1]].toFixed(2),on?"tx b":"sm","start");});
  var req=s.box(14,176,110,48,"Request","same prefix","b"),cache=s.box(150,176,110,48,mode==="hit"?"Found in cache":mode==="miss"?"Not cached yet":"No cache",mode==="hit"?"read for 5%":mode==="miss"?"store it, 1.25×":"full price",mode==="hit"?"e":mode==="miss"?"g":"n");
  var m=s.box(286,176,100,48,"Model",null,"a");s.link(req,cache);s.link(cache,m);
  s.text(200,248,"cache lives 5 minutes by default (1 hour option, 2× write)","sm");
  return s.svg();
}
E["9.6"]={
  plain:"<p>Many apps send the same long beginning on every call: a big system prompt, a document, some examples. <b>Prompt caching</b> stores that beginning so later calls don't pay full price for it.</p><p>The first call writes it to the cache and costs a little extra. Later calls that reuse it within a few minutes read it for a small fraction of the price. On Sonnet 5.5 and Opus 5.5 that's 5% of the normal input price.</p><p>The <b>Batch API</b> is a separate saving: send non-urgent requests together and pay half price.</p>",
  map:[["One copy kept in the class library","The cached prefix"],["Everyone reading that copy instead of buying one","Later calls reading the cache at 5%"],["Buying the first copy","The cache write (1.25× on the first call)"]],
  breaks:"A library copy stays on the shelf. A cached prefix expires after 5 minutes without use (or 1 hour if you pay for that), and it only works for calls in your own workspace. It also only matches from the very start: change one word early in the prompt and everything after that word is a fresh, full-price write.",
  viz:{cap:"Switch between the three cases. The prices are Sonnet 5.5 list prices per million tokens: input $2, cache write $2.50, cache read $0.10."},
  play:{t:"Cache hit or miss?",inFig:1,build:function(root){
    var modes=["none","miss","hit"],k=2;root.innerHTML='<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="wbtn" data-m="0">No cache</button><button class="wbtn" data-m="1">First call (miss)</button><button class="wbtn" data-m="2">Repeat call (hit)</button></div><div id="v96"></div><div class="vpout" id="o96"></div>';
    var msg=["Every call pays the full $2 per million tokens for the prefix.","The first call pays 1.25× to write the prefix into the cache ($2.50 per million).","Calls within the cache lifetime read the prefix at $0.10 per million, 5% of the input price."];
    function draw(){root.querySelector("#v96").innerHTML=v96(modes[k]);root.querySelector("#o96").innerHTML="<b>"+["No cache","Miss","Hit"][k]+":</b> "+msg[k];
      [].forEach.call(root.querySelectorAll("[data-m]"),function(b){b.style.borderColor=+b.dataset.m===k?"var(--ember)":""});}
    [].forEach.call(root.querySelectorAll("[data-m]"),function(b){b.addEventListener("click",function(){k=+b.dataset.m;draw()})});draw();}},
  line:"Caching lets you pay once for a long, repeated start and almost nothing for it after."
};

/* ---------- 9.7 model mix ---------- */
var M97={s:{i:2,o:10},h:{i:0.1,o:0.5}};
function v97(pct){
  var IN=2000,OUT=500,N=1000,cs=(IN*M97.s.i+OUT*M97.s.o)/1e6,ch=(IN*M97.h.i+OUT*M97.h.o)/1e6;
  var allS=N*cs,mix=N*(pct/100*ch+(1-pct/100)*cs);
  var s=VZ.scene(400,214,"Routing a share of simple calls to Haiku lowers cost per thousand calls");
  s.text(200,14,"1,000 CALLS · 2,000 TOKENS IN, 500 OUT EACH","sm h");
  s.text(14,47,"All Sonnet 5.5","sm","start");s.bar(130,34,180,26,1,"t");s.text(320,47,"$"+allS.toFixed(2),"tx b","start");
  s.text(14,91,"Your mix","sm","start");s.bar(130,78,180,26,mix/allS,"e");s.text(320,91,"$"+mix.toFixed(2),"tx b","start");
  s.box(14,128,180,40,"Sonnet 5.5 "+(100-pct)+"%",null,"t",{rx:6});
  s.box(206,128,180,40,"Haiku 5.5 "+pct+"%",null,"g",{rx:6});
  s.text(200,196,"only route calls Haiku passes your eval on (Lesson 3.6)","sm");
  return s.svg();
}
E["9.7"]={
  plain:"<p>An AI product makes money only if each user costs less than they pay. <b>Cost engineering</b> is designing for that on purpose.</p><p>The biggest lever is the model mix. Send each task to the cheapest model that does it well, often Haiku for simple sorting and Sonnet for real thinking. Then trim tokens, cache repeated text and batch what can wait.</p><p>Do the sum before you build, not after the bill arrives.</p>",
  map:[["Sending letters by post vs courier","Haiku vs Sonnet per task"],["Only using courier when it must arrive tomorrow","Routing only hard tasks to the bigger model"],["Writing shorter letters","Trimming tokens per call"]],
  breaks:"A post office always delivers. A cheaper model sometimes gets the task wrong, so a mix only saves money if you've tested the cheap path.",
  viz:{cap:"Slide how many calls go to Haiku. List prices per million tokens: Sonnet 5.5 $2 in / $10 out; Haiku 5.5 $0.10 in / $0.50 out (prompts up to 100k tokens)."},
  play:{t:"Mix your models",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Calls sent to Haiku: <b id="l97">60%</b></label><input type="range" id="r97" min="0" max="100" step="10" value="60"><div id="v97"></div>';
    var r=root.querySelector("#r97");function draw(){root.querySelector("#l97").textContent=r.value+"%";root.querySelector("#v97").innerHTML=v97(+r.value);}
    r.addEventListener("input",draw);draw();}},
  line:"Use the cheapest model that does each job well, and do the maths before you build."
};

/* ---------- 9.8 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Prompt",s:"tested on an eval",tone:"v"},
    {t:"API call",s:"model chosen for cost",tone:"a"},
    {t:"Tools / vision",s:"real data in",tone:"b"},
    {t:"Structured output",s:"JSON your code trusts",tone:"g"},
    {t:"Checks + logs",s:"stop_reason, usage",tone:"r"},
    {t:"Simple UI",s:"someone can use it",tone:"e"}
  ],{cols:2,bh:58,gy:28,aria:"The parts of a small shipped API product"});
  E["9.8"]={
    plain:"<p>This lesson puts the whole track together into one small, real product.</p><p>You start with a prompt you've tested, call the API with a sensibly priced model, bring in real data through tools or images, get structured answers back, check and log every call, and put a simple screen on top.</p><p>Small is fine. Complete is the point.</p>",
    map:[["Building a go-kart","Shipping a mini-product"],["Engine, wheels, brakes, seat","Prompt, API, tools, structured output, checks, UI"],["A test drive","Verifying with real inputs"]],
    breaks:"A go-kart is finished once built. A product needs watching after launch: costs, errors and model updates all change over time.",
    viz:{svg:s.svg(),cap:"Six parts, each from an earlier lesson in this track, joined into one working thing."},
    line:"Join the track's pieces into one small product that someone can actually use."
  };
})();
})();
