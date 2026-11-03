/* Pass 2 — Track 14 (Capstones). Architecture pictures of each build; no new facts. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 14.1 ---------- */
(function(){
  var s=VZ.scene(400,256,"Personal automation suite: four automations, one Skill and one schedule");
  var sch=s.box(14,14,170,50,"Scheduled task","Monday 08:00","b"),sk=s.box(216,14,170,50,"Your Skill","house rules","v");
  var A=[["Inbox triage","g"],["Weekly report","a"],["File organiser","t"],["Research digest","e"]].map(function(p,i){return s.box(14+(i%2)*202,96+Math.floor(i/2)*62,170,48,p[0],null,p[1])});
  s.link(sch,A[1]);s.link(sk,A[0],null,{dash:1});s.link(sk,A[3],null,{dash:1});
  s.box(14,226,372,26,"Each one leaves a receipt you can check",null,"n",{rx:8});
  E["14.1"]={
    plain:"<p>This first capstone is a set of small automations for your own life or work.</p><p>You build four: sorting your inbox, a weekly report, a file organiser and a research digest. You also write one Skill with your rules, and put one task on a schedule.</p><p>Together they prove you can make Claude do real work on its own, not just answer questions.</p>",
    map:[["A household of small helpers","Four automations"],["The house rule sheet on the fridge","Your Skill"],["The Monday alarm","The scheduled task"]],
    breaks:"Household helpers notice when something's off. Your automations only notice what you tell them to check, so each needs a receipt you read.",
    viz:{svg:s.svg(),cap:"The schedule triggers the report; the Skill's rules shape the others (dashed)."},
    line:"Build a few small helpers that do real chores for you on their own."
  };
})();

/* ---------- 14.2 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Raw input",s:"transcript, export,\nrough brief",tone:"n"},
    {t:"Template prompt",s:"tested on an eval",tone:"v"},
    {t:"Draft",s:"report, deck, proposal",tone:"a"},
    {t:"QA checklist",s:"facts, format, tone",tone:"r"},
    {t:"Client-ready",s:"same quality\nevery time",tone:"e"}
  ],{cols:2,bh:70,gy:28,stepped:true,aria:"A client-ready document pipeline"});
  E["14.2"]={
    plain:"<p>This capstone builds a pipeline that turns messy raw material into a polished document for a client.</p><p>Raw input goes in, like a meeting transcript or a data export. A tested template prompt makes a draft. A checklist catches mistakes. Out comes a report, deck or proposal of the same quality every time.</p><p>That repeatable quality is exactly what clients pay for.</p>",
    map:[["A bakery's recipe and checks","Your template and QA checklist"],["Flour, eggs, sugar","Raw input files"],["The same good cake every day","Consistent client-ready output"]],
    breaks:"Flour is the same every bag. Client inputs vary wildly, so the pipeline needs a step that flags input it can't handle well.",
    viz:{svg:s.svg(),cap:"Five stages; the QA checklist is what makes it sellable.",
      steps:["Messy input arrives: a transcript, an export, a brief.","A template prompt, already tested on examples, takes it.","Claude produces a draft deliverable.","A QA checklist checks facts, format and tone.","The client gets the same quality every time."]},
    line:"Turn messy input into a polished document the same reliable way every time."
  };
})();

/* ---------- 14.3 ---------- */
(function(){
  var s=VZ.scene(400,240,"Capstone C: your MCP server inside a Claude Code workflow, with security checks");
  var data=s.box(14,20,120,60,"Your data\nor tool",null,"g"),srv=s.box(150,20,110,60,"Your MCP\nserver",null,"a"),cc=s.box(276,20,110,60,"Claude Code",null,"b");
  s.link(data,srv);s.link(srv,cc);
  var loop=["plan","build","verify","commit"].map(function(t,i){return s.box(14+i*96,116,86,40,t,null,"t",{rx:8})});
  for(var i=1;i<4;i++)s.link(loop[i-1],loop[i]);
  s.path("M331 82 V112",{});
  s.box(14,184,372,44,"Security: least access · no trifecta · tested inputs",null,"r",{rx:8});
  E["14.3"]={
    plain:"<p>In this capstone you build a working MCP server that connects Claude to something useful, like your own data or a tool you use.</p><p>Then you plug it into Claude Code and use it in a real build, following the plan, build, verify, commit loop.</p><p>Security is part of the grade: give it the least access it needs, and never combine private data, untrusted content and a way out.</p>",
    map:[["Making your own plug","Building the MCP server"],["Plugging it into the workshop","Adding it to Claude Code"],["Using it on a real job","The plan-build-verify-commit workflow"]],
    breaks:"A plug either fits or doesn't. A server can work and still be unsafe, so testing what it refuses matters as much as what it does.",
    viz:{svg:s.svg(),cap:"Top: the plumbing. Middle: the workflow it serves. Bottom: the rules it must keep."},
    line:"Build your own MCP plug, use it in a real build, and keep it safe."
  };
})();

/* ---------- 14.4 ---------- */
(function(){
  var s=VZ.scene(400,252,"Capstone D: a deployed API micro-product and the checks around it");
  var u=s.box(14,20,90,56,"User",null,"b"),ui=s.box(126,20,110,56,"Simple UI",null,"t"),api=s.box(258,20,128,56,"Claude API","structured output","a");
  s.link(u,ui);s.link(ui,api);
  [["Unit economics","9.6, 9.7","g"],["Reliability","evals, 10.5","v"],["Security","10.6","r"]].forEach(function(p,i){var b=s.box(14+i*128,120,116,60,p[0],p[1],p[2]);s.path("M"+b.cx+" 116 V82",{dash:1})});
  s.box(14,206,372,36,"Live on the internet: the strongest portfolio piece",null,"e",{rx:8});
  E["14.4"]={
    plain:"<p>This is the flagship capstone: a small product, live on the internet, built on the Claude API.</p><p>It needs a simple screen, answers in a reliable structured shape, costs that make sense per user, tests that prove it works, and protection against misuse.</p><p>It's the single strongest piece you can show an employer or client.</p>",
    map:[["Opening a real shop","Deploying a live product"],["Checking the till adds up","Unit economics"],["Safety inspection","Reliability and security checks"]],
    breaks:"A shop can close for the night. A live product runs all the time and can be found by anyone, so monitoring and limits aren't optional.",
    viz:{svg:s.svg(),cap:"The request path on top; the three disciplines that hold it up underneath."},
    line:"Ship a small, real AI product that's cheap to run, reliable and safe."
  };
})();

/* ---------- 14.5 ---------- */
var P145={freelance:["pick one\noffer","post it on\n2 platforms","5 direct\npitches","first paid\njob"],product:["ask 10\nbuyers","build the\nsmallest\nversion","launch to\nthe yeses","first\npaying user"],job:["polish 3\nprojects","tailor 10\napplications","mock\ninterviews","interviews\nbooked"]};
function v145(k){
  var s=VZ.scene(400,214,"A 30-day plan in four weekly milestones for the chosen path");
  s.text(200,14,"YOUR 30 DAYS · "+k.toUpperCase()+" PATH","sm h");
  var B=P145[k].map(function(t,i){var b=s.box(14+i*96,40,90,96,"Week "+(i+1),t,["b","v","a","e"][i]);return b});
  for(var i=1;i<4;i++)s.link(B[i-1],B[i]);
  s.text(200,170,"the plan ends with a real action, not more study","sm h");
  return s.svg();
}
E["14.5"]={
  plain:"<p>The last capstone turns learning into earning. You pick one path: freelancing, a product, or a job.</p><p>Then you make a 30-day plan with one milestone each week, and use Claude as your co-pilot to keep going.</p><p>The plan must end with a real action: an offer posted, a product listed, or applications sent.</p>",
  map:[["A month-long training plan","Your 30-day plan"],["Weekly targets","Four milestones"],["Race day","The first real action"]],
  breaks:"A training plan can be repeated next month. Your first offer or launch teaches you things no plan can, so expect to rewrite weeks 3 and 4.",
  viz:{cap:"Pick a path and see its four weekly milestones."},
  play:{t:"Choose your path",inFig:1,build:function(root){
    var ks=["freelance","product","job"],k=0;root.innerHTML='<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="wbtn" data-k="0">Freelance</button><button class="wbtn" data-k="1">Product</button><button class="wbtn" data-k="2">Job</button></div><div id="v145"></div>';
    function draw(){root.querySelector("#v145").innerHTML=v145(ks[k]);[].forEach.call(root.querySelectorAll("[data-k]"),function(b){b.style.borderColor=+b.dataset.k===k?"var(--ember)":""});}
    [].forEach.call(root.querySelectorAll("[data-k]"),function(b){b.addEventListener("click",function(){k=+b.dataset.k;draw()})});draw();}},
  line:"Pick one path and take a real step toward income within 30 days."
};
})();
