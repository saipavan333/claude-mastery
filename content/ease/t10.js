/* Pass 2 — Track 10 (Agents). pass@k / pass^k formulas as checked in the
   pass-1 review (independent runs assumed). Pattern names follow the lesson. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 10.1 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Think",s:"what's the next step?",tone:"v"},
    {t:"Tool call",s:"search, read, run",tone:"a"},
    {t:"Result",s:"what came back",tone:"g"},
    {t:"Done?",s:"no → think again",tone:"b"}
  ],{w:400,h:290,bw:144,bh:62,stepped:true,center:"goal",aria:"The agent loop: think, call a tool, read the result, decide"});
  E["10.1"]={
    plain:"<p>An <b>agent</b> is Claude running in a loop toward a goal. It thinks about the next step, uses a tool, looks at the result, and decides what to do next. It repeats until the job is done.</p><p>So an agent isn't a smarter model. It's the same model with tools and a loop around it.</p><p>Building good agents is mostly about control: which tools it gets, when it must stop, and when it must ask you.</p>",
    map:[["The robot vacuum's goal: a clean floor","The agent's goal"],["Looking around","Reading the latest result"],["Moving, bumping, turning","Calling a tool and adjusting"],["Docking when the floor is clean","Stopping when done"]],
    breaks:"A vacuum can only bump into furniture. An agent's tools can send email or delete files, so a wrong turn can cost far more; that's why limits and stop rules matter.",
    viz:{svg:s.svg(),cap:"Think → tool call → result → think, until the goal is met. Step through one lap.",
      steps:["Claude thinks about the goal and picks the next step.","It calls a tool: a search, a file read, a command.","The tool's result comes back into its context.","It checks: done? If not, it thinks again with the new information."]},
    line:"An agent is Claude in a loop: think, use a tool, look, repeat until done."
  };
})();

/* ---------- 10.2 ---------- */
var P102=[
 ["Chaining","fixed steps in order",function(s){var a=s.box(14,70,100,50,"Step 1",null,"b"),b=s.box(150,70,100,50,"Step 2",null,"b"),c=s.box(286,70,100,50,"Step 3",null,"e");s.link(a,b);s.link(b,c);}],
 ["Routing","a classifier picks one path",function(s){var r=s.box(14,70,100,50,"Router",null,"a");[["Billing",14],["Tech",70],["Other",126]].forEach(function(p){var b=s.box(250,p[1],136,44,p[0]+" prompt",null,"t");s.link(r,b)});}],
 ["Parallel","split, run at once, combine",function(s){var a=s.box(14,70,90,50,"Split",null,"a"),m=s.box(296,70,90,50,"Combine",null,"g");[14,70,126].forEach(function(y,i){var b=s.box(150,y,100,44,"Part "+(i+1),null,"t");s.link(a,b);s.link(b,m)});}],
 ["Orchestrator","a lead plans workers on the fly",function(s){var o=s.box(14,70,110,50,"Orchestrator","decides tasks","a");[14,70,126].forEach(function(y,i){var b=s.box(270,y,116,44,"Worker "+(i+1),null,"v");s.link(o,b);s.link(b,o,null,{bend:16,dash:1})});}],
 ["Evaluator","write, grade, rewrite",function(s){var g=s.box(40,70,130,50,"Generator",null,"b"),e=s.box(230,70,130,50,"Evaluator","grades vs rubric","r");s.link(g,e,"draft",{bend:-26});s.link(e,g,"feedback",{bend:-26});}]
];
function v102(k){var s=VZ.scene(400,200,"Workflow pattern: "+P102[k][0]);P102[k][2](s);s.text(200,188,P102[k][0].toUpperCase()+": "+P102[k][1],"sm h");return s.svg();}
E["10.2"]={
  plain:"<p>Most useful AI systems aren't free-roaming agents. They're <b>workflows</b>: fixed plans you design, with Claude doing each step.</p><p>There are five common shapes: <b>chaining</b> runs steps in order, <b>routing</b> sends each input down the right path, and <b>parallel</b> runs parts at once. An <b>orchestrator</b> splits work among workers, and an <b>evaluator</b> grades a draft and sends it back for fixes.</p><p>Use the simplest shape that works, and reach for a full agent only when no fixed plan will do.</p>",
  map:[["A kitchen line with fixed stations","A workflow"],["Each station's job","One prompt or model call"],["The head chef handing out dishes by plan","Orchestrator-workers"],["A cook who tastes and decides the next step","An agent"]],
  breaks:"In a kitchen, stations can shout to each other. In a workflow, steps only share what you pass along, so design what each step hands to the next.",
  viz:{cap:"Pick a pattern and watch the shape change. Every one keeps you in control of the plan."},
  play:{t:"Five workflow shapes",inFig:1,build:function(root){
    var k=0;root.innerHTML='<div id="b102" style="display:flex;flex-wrap:wrap;gap:6px"></div><div id="v102"></div>';
    var bx=root.querySelector("#b102");
    P102.forEach(function(p,i){var b=document.createElement("button");b.className="wbtn";b.textContent=p[0];b.addEventListener("click",function(){k=i;draw()});bx.appendChild(b)});
    function draw(){[].forEach.call(bx.children,function(b,i){b.style.borderColor=i===k?"var(--ember)":""});root.querySelector("#v102").innerHTML=v102(k);}
    draw();}},
  line:"Build from simple fixed patterns first, and use a free agent only when you must."
};

/* ---------- 10.3 ---------- */
(function(){
  var s=VZ.scene(400,250,"The Agent SDK packages the Claude Code harness as a library inside your app");
  var app=s.box(14,14,372,222,"",null,"n");
  s.text(200,32,"YOUR APP (Python or TypeScript)","sm h");
  var sdk=s.box(30,46,340,140,"",null,"a");
  s.text(200,64,"AGENT SDK = the Claude Code harness","sm c");
  [["Agent loop","b"],["Built-in tools","t"],["Sub-agents","v"],["Hooks","r"],["Permissions","g"],["MCP","e"]].forEach(function(p,i){s.box(44+(i%3)*108,80+Math.floor(i/3)*50,100,40,p[0],null,p[1],{rx:8})});
  s.box(30,196,340,32,"Your prompt, your tools, your rules",null,"b",{rx:8});
  E["10.3"]={
    plain:"<p>The <b>Agent SDK</b> (software development kit) is the engine of Claude Code, packaged as a library for Python and TypeScript.</p><p>It gives your own program the agent loop, built-in tools like reading files and running commands, sub-agents, hooks, permissions and MCP.</p><p>So you don't rebuild the loop yourself. You add your prompt, your tools and your rules, and run it inside your app.</p>",
    map:[["A ready-made engine","The SDK's agent loop and tools"],["The car you put it in","Your application"],["Your steering and brakes","Your prompt, tools, hooks and permissions"]],
    breaks:"An engine works the same in any car. Your agent's behaviour depends heavily on the prompt and tools you give it, so the SDK doesn't make a good agent by itself.",
    viz:{svg:s.svg(),cap:"The SDK sits inside your app and brings Claude Code's machinery with it."},
    line:"The Agent SDK lets you put Claude Code's engine inside your own app."
  };
})();

/* ---------- 10.4 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Define once",s:"model, prompt,\ntools, MCP, skills",tone:"a"},
    {t:"Start a session",s:"one API call",tone:"b"},
    {t:"Runs on\nAnthropic",s:"no servers for you",tone:"v"},
    {t:"Results out",s:"webhooks, memory,\nschedules",tone:"e"}
  ],{cols:2,bh:76,gy:32,stepped:true,aria:"Managed Agents: define, start, run hosted, get results"});
  E["10.4"]={
    plain:"<p>With <b>Managed Agents</b>, Anthropic runs your agent for you. You don't rent or maintain any servers.</p><p>You define the agent once: the model, its instructions, its tools and skills. Then you start a session with one API call, and it runs on Anthropic's machines.</p><p>It can keep memory between sessions, run on a schedule, and tell your system when it's done.</p>",
    map:[["A fully staffed rented workshop","Managed Agents"],["Your job sheet","The agent definition"],["Booking a slot","Starting a session"],["The call when it's ready","A webhook"]],
    breaks:"You can walk into a rented workshop and watch. A managed agent runs out of sight, so logging and review steps are how you see what it did.",
    viz:{svg:s.svg(),cap:"Define it once, start it with an API call, and collect the results.",
      steps:["You define the agent: model, prompt, tools, MCP servers, skills.","Your code starts a session with one API call.","It runs on Anthropic's infrastructure while you do other things.","Results come back through webhooks, memory stores or scheduled runs."]},
    line:"Managed Agents let Anthropic run your agent, so you don't need servers."
  };
})();

/* ---------- 10.5 pass@k vs pass^k ---------- */
function v105(p,k){
  var at=1-Math.pow(1-p,k),hat=Math.pow(p,k);
  var s=VZ.scene(400,212,"pass at k versus pass to the power k for a given per-run success rate");
  s.text(200,14,"ONE RUN SUCCEEDS "+Math.round(p*100)+"% · "+k+" RUNS","sm h");
  s.text(14,47,"pass@"+k,"tx b","start");s.bar(100,34,210,26,at,"e");s.text(318,47,(at*100).toFixed(at>0.999?3:1)+"%","tx b","start");
  s.text(14,91,"pass^"+k,"tx b","start");s.bar(100,78,210,26,hat,"r");s.text(318,91,(hat*100).toFixed(1)+"%","tx b","start");
  s.text(200,132,"pass@k: at least one of k tries works (fine if you can pick the best)","sm");
  s.text(200,154,"pass^k: all k tries work (what users feel, run after run)","sm");
  s.text(200,186,"assumes runs are independent","sm");
  return s.svg();
}
E["10.5"]={
  plain:"<p>An agent you can't trust is just automated risk, and <b>reliability</b> is how you earn trust.</p><p>Test it on a fixed set of real tasks (an <b>eval</b>). Add <b>guardrails</b> (hard rules it can't break) and checks that catch mistakes. And put a person at the few points where human judgement really matters.</p><p>One number trips people up: an agent that succeeds 90% of the time fails often when it runs many times in a row.</p>",
  map:[["The driving test","Evals"],["The seatbelt","Guardrails"],["The adult in the passenger seat","A human approval step"],["Passing the test once vs driving safely every day","pass@k vs pass^k"]],
  breaks:"A driver who passes the test keeps the skill. An agent's success rate can drift when the model, tools or inputs change, so evals have to run again.",
  viz:{cap:"Slide the per-run success rate and the number of runs. pass^k falls fast, which is why 90% isn't good enough for daily use."},
  play:{t:"Reliability over many runs",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Success on one run: <b id="p105">90%</b></label><input type="range" id="r105a" min="50" max="99" value="90"><label class="sm">Runs (k): <b id="k105">5</b></label><input type="range" id="r105b" min="1" max="20" value="5"><div id="v105"></div>';
    var a=root.querySelector("#r105a"),b=root.querySelector("#r105b");
    function draw(){root.querySelector("#p105").textContent=a.value+"%";root.querySelector("#k105").textContent=b.value;root.querySelector("#v105").innerHTML=v105(a.value/100,+b.value);}
    a.addEventListener("input",draw);b.addEventListener("input",draw);draw();}},
  line:"Test agents, give them hard limits, and keep a human where judgement matters."
};

/* ---------- 10.6 ---------- */
(function(){
  var s=VZ.scene(400,260,"Agent security: a sandbox limits blast radius, least-privilege tools, and a human hinge on consequential actions");
  var sb=s.box(14,14,250,230,"",null,"n");
  s.text(139,32,"SANDBOX (limited blast radius)","sm h");
  var ag=s.box(64,48,150,48,"Agent",null,"a");
  var t1=s.box(30,124,100,40,"read docs",null,"t",{rx:8}),t2=s.box(148,124,100,40,"draft reply",null,"t",{rx:8});
  s.link(ag,t1);s.link(ag,t2);
  s.box(30,184,218,44,"only the tools it needs",null,"n",{rx:8});
  var h=s.box(290,48,96,62,"Human\nhinge","approve","r"),out=s.box(290,150,96,62,"Send /\npay",null,"v");
  s.link(ag,h);s.link(h,out);
  E["10.6"]={
    plain:"<p>An agent that reads untrusted content and has tools is a target. Hidden text can try to hijack it.</p><p>So design as if it will be tricked. Run it in a <b>sandbox</b>, a fenced-off space where mistakes can't spread. Give it only the tools it needs, called <b>least privilege</b>. And make a person approve anything consequential, like sending money or email.</p>",
    map:[["Only the keys to the rooms they need","Least-privilege tools"],["No master key","No broad credentials"],["A note slipped under the door","A prompt injection"],["Checking with you before opening the safe","A human approval step"]],
    breaks:"A helper might recognise a forged note. An agent often can't, so the defence has to be in the design, not in hoping it notices.",
    viz:{svg:s.svg(),cap:"Inside the fence the agent can only do small, safe things. Anything that leaves the fence passes a human."},
    line:"Give an agent only the keys it needs, fence it in, and approve its big moves yourself."
  };
})();
})();
