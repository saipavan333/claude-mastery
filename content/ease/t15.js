/* Pass 2 — Track 15 (Agent Build-Alongs). Agent shapes as built in each
   lesson; the price ranges stay in the lessons (not re-verified in pass 1). */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 15.1 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Spec",s:"one recurring job,\nwhat «done» means",tone:"b"},
    {t:"Architect",s:"workflow or agent?\nwhich tools?",tone:"v"},
    {t:"Build",s:"smallest version\nthat works",tone:"a"},
    {t:"Guard",s:"limits, approvals,\nevals",tone:"r"},
    {t:"Package",s:"demo, price,\nreport",tone:"e"}
  ],{cols:2,bh:70,gy:28,stepped:true,aria:"The money-agent arc: spec, architect, build, guard, package"});
  E["15.1"]={
    plain:"<p>A <b>money-making agent</b> does one valuable job again and again, mostly without supervision. Examples: sorting incoming emails, writing a weekly report, answering customers.</p><p>Businesses don't pay for «AI». They pay for the result and for being able to trust it.</p><p>Every agent in this track follows the same five steps: spec, architect, build, guard, package.</p>",
    map:[["A trusted shop assistant","The agent"],["Their one daily job","The recurring task"],["Their wages","Your setup fee and monthly retainer"],["The manager's spot checks","Guards and reports"]],
    breaks:"A shop assistant notices when something odd happens. An agent only notices what you designed it to check, so the guard step can't be skipped.",
    viz:{svg:s.svg(),cap:"Five steps from idea to something you can sell. Every build-along that follows walks the same arc.",
      steps:["Spec: pick one recurring job and define what «done» looks like.","Architect: decide workflow or agent, and which tools it needs.","Build the smallest version that does the job.","Guard it: limits, human approvals and evals.","Package it: a demo, a price and a report the buyer can read."]},
    line:"A money agent does one job reliably, and you sell the trust as much as the work."
  };
})();

/* ---------- 15.2 ---------- */
var K152=[["Hot lead","CRM row +\ndraft reply","e"],["Support","draft reply","b"],["Spam","archive","n"],["Urgent","alert the team","r"]];
function v152(k){
  var s=VZ.scene(400,236,"The triage agent classifies each email, extracts a record, drafts a reply, and a human approves every send");
  var m=s.box(14,20,100,66,"New email",null,"b"),c=s.box(140,20,110,66,"Classify",K152[k][0],"a");
  var a=s.box(276,20,110,66,"Action",K152[k][1],K152[k][2]);
  s.link(m,c);s.link(c,a);
  var h=s.box(140,120,246,56,"Human approves","nothing is sent automatically","r");s.link(a,h);
  s.text(200,206,"the approval gate is what makes it safe to sell","sm h");
  return s.svg();
}
E["15.2"]={
  plain:"<p>This agent watches an email inbox. For each new message it decides what kind it is: a hot sales lead, a support question, spam, or something urgent.</p><p>It drafts a fitting reply, copies lead details into a spreadsheet or CRM (customer system), and alerts the team when it's urgent.</p><p>It never sends anything itself. A person approves every reply, which is why businesses trust it.</p>",
  map:[["A school office clerk sorting post","The triage agent"],["Piles: parents, suppliers, junk","The categories"],["The head teacher signing letters","The human approval"]],
  breaks:"A clerk can phone and ask what a letter means. The agent only has the email text, so unclear messages should be flagged, not guessed.",
  viz:{cap:"Pick a kind of email and watch the action change. The approval gate stays in every case."},
  play:{t:"Triage an email",inFig:1,build:function(root){
    var k=0;root.innerHTML='<div style="display:flex;gap:6px;flex-wrap:wrap" id="b152"></div><div id="v152"></div>';
    var bx=root.querySelector("#b152");K152.forEach(function(p,i){var b=document.createElement("button");b.className="wbtn";b.textContent=p[0];b.addEventListener("click",function(){k=i;draw()});bx.appendChild(b)});
    function draw(){[].forEach.call(bx.children,function(b,i){b.style.borderColor=i===k?"var(--ember)":""});root.querySelector("#v152").innerHTML=v152(k);}
    draw();}},
  line:"The triage agent sorts email and drafts replies, but a person approves every send."
};

/* ---------- 15.3 ---------- */
(function(){
  var s=VZ.fan({t:"One long piece",s:"post, transcript\nor talk",tone:"a"},[
    {t:"LinkedIn post",tone:"b"},{t:"X thread",tone:"t"},{t:"Newsletter section",tone:"v"},{t:"SEO snippets",tone:"g"}
  ],{w:400,bh:42,gy:12,kw:150,cw:120,sh:80,merge:{t:"Review folder",s:"never auto-posted",tone:"r"},aria:"One long piece becomes four platform pieces, delivered to a review folder"});
  E["15.3"]={
    plain:"<p>This agent takes one long piece of content, like a blog post or a talk transcript, and turns it into a week of shorter pieces for different platforms.</p><p>It follows a saved voice guide so everything sounds like the author, and it sticks strictly to what the source says.</p><p>Results go to a review folder. Nothing is posted automatically.</p>",
    map:[["One big cake cut into slices","One long piece split into posts"],["Different plates for different guests","Different formats per platform"],["The family recipe","The voice guide"]],
    breaks:"Cake slices are all the same cake. A rewritten post can quietly add a claim the source never made, so check facts against the original.",
    viz:{svg:s.svg(),cap:"One source in, four platform pieces out, all stopping at a human review."},
    line:"Turn one long piece into many short ones in the author's voice, and review before posting."
  };
})();

/* ---------- 15.4 ---------- */
(function(){
  var s=VZ.scene(400,270,"The research agent: schedule, sweep, dedupe against memory, verify, brief");
  var st=[["7am trigger","every weekday","b"],["Sweep sources","your curated list","a"],["Dedupe","already reported?","v"],["Verify + cite","every claim","r"],["Briefing","what changed, why","e"]];
  var B=st.map(function(p,i){return s.box(14,14+i*50,200,42,p[0],p[1],p[2],{step:i})});
  for(var i=1;i<B.length;i++)s.link(B[i-1],B[i],null,{step:i});
  var mem=s.box(256,100,130,60,"Memory","items sent before","g",{step:2});
  s.link(B[2],mem,"check",{step:2});
  E["15.4"]={
    plain:"<p>This agent runs by itself on a schedule, for example every weekday at 7am.</p><p>It checks a list of sources you chose, skips anything it already reported (it keeps a memory of past items), checks and cites every claim, and sends a short briefing on what changed and why it matters.</p><p>Accuracy is the product, so verifying comes before writing.</p>",
    map:[["A morning newspaper boy","The scheduled run"],["Only bringing today's news","Deduping against memory"],["Quoting the source","Citing every claim"]],
    breaks:"A newspaper is checked by editors. Your agent's briefing is only as accurate as its verify step, so test that step hardest.",
    viz:{svg:s.svg(),cap:"Five stages; the memory check is what stops it repeating yesterday's news.",
      steps:["The schedule fires at 7am.","It sweeps your list of trusted sources.","It checks memory and drops anything it has already reported.","It verifies each claim and attaches a citation.","It sends a short briefing: what changed and why it matters."]},
    line:"The research agent checks your sources each morning and reports only new, verified news."
  };
})();

/* ---------- 15.5 ---------- */
function v155(c){
  var s=VZ.scene(400,246,"Support agent: retrieve passages, answer with a citation, and escalate when confidence is low");
  var q=s.box(14,20,100,52,"Customer\nquestion",null,"b"),r=s.box(136,20,120,52,"Find passages","in the help docs","g"),a=s.box(278,20,108,52,"Draft answer","+ citation","a");
  s.link(q,r);s.link(r,a);
  var hi=c>=70;
  var out=s.box(hi?214:14,124,172,62,hi?"Human approves\nthe draft":"Escalate\nto a person",hi?"confident, grounded":"unsure or sensitive",hi?"e":"r");
  s.link(a,out);
  s.text(200,222,"confidence "+c+"% · threshold 70% (example)","sm h");
  return s.svg();
}
E["15.5"]={
  plain:"<p>This agent answers customer questions using only the company's own help documents.</p><p>First it finds the passages that match the question. This is called <b>RAG</b> (retrieval-augmented generation). Then it writes an answer based only on those passages and cites them.</p><p>It also judges how sure it is. If it's unsure, or the topic is sensitive, it hands the question to a person.</p>",
  map:[["A librarian who only answers from the shelf","Grounded answers from the help docs"],["Pointing to the page","The citation"],["«Let me get my manager»","Escalation"]],
  breaks:"A librarian knows when a book is outdated. The agent trusts whatever is in the help docs, so stale docs produce confident, wrong answers.",
  viz:{cap:"Slide the agent's confidence. Below the threshold it escalates instead of drafting. The 70% threshold is an example you would tune."},
  play:{t:"Answer or escalate?",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Agent confidence: <b id="l155">85%</b></label><input type="range" id="r155" min="0" max="100" step="5" value="85"><div id="v155"></div>';
    var r=root.querySelector("#r155");function draw(){root.querySelector("#l155").textContent=r.value+"%";root.querySelector("#v155").innerHTML=v155(+r.value);}
    r.addEventListener("input",draw);draw();}},
  line:"The support agent answers only from the company's docs and hands hard cases to a person."
};

/* ---------- 15.6 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Lead with\nthe outcome",s:"not «AI»",tone:"b"},
    {t:"Demo on\ntheir data",s:"proof, not slides",tone:"a"},
    {t:"Setup +\nretainer",s:"priced on value",tone:"g"},
    {t:"Deliver with\na report",s:"trust you can see",tone:"e"},
    {t:"Expand",s:"next agent, same\ncustomer",tone:"v"}
  ],{w:400,h:330,bw:130,bh:72,stepped:true,center:"one account\ngrows",aria:"The sales motion for agents"});
  E["15.6"]={
    plain:"<p>Selling an agent is different from selling a one-off job. You're selling a capability the buyer has to trust every day.</p><p>So start with the result it delivers. Show a demo on the buyer's own data. Charge a setup fee plus a monthly fee for monitoring. Send regular reports so trust is visible.</p><p>Win your first client in a business you know, then add more agents for the same client.</p>",
    map:[["A gardener with a monthly contract","An agent on a retainer"],["Showing them a trimmed hedge first","A demo on their own data"],["The monthly visit report","The agent's performance report"],["Adding the lawn next season","Expanding with another agent"]],
    breaks:"A gardener's work is visible from the window. An agent's work is invisible unless you report it, so the report is part of the product.",
    viz:{svg:s.svg(),cap:"The motion is a loop: each happy account leads to the next agent.",
      steps:["Lead with the result the buyer cares about.","Prove it with a demo on their own data.","Price it as setup plus a monthly retainer, based on value.","Deliver with guardrails and a regular report.","Expand inside the same account with the next agent."]},
    line:"Sell the result, prove it on their data, and report every month so they keep trusting it."
  };
})();
})();
