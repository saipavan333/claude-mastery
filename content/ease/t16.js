/* Pass 2 — Track 16 (The 2026 Frontier). Features described as in the
   lessons (pass-1 verified); progressive Skill loading per 16.4. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 16.1 ---------- */
(function(){
  var s=VZ.scene(400,236,"Before: three separate places. After: one app where chat, Cowork, Docs and Slides meet");
  s.text(100,14,"BEFORE","sm h");s.text(300,14,"NOW","sm h");
  ["Chat","Cowork","Docs / Slides"].forEach(function(t,i){s.box(14,28+i*62,150,48,t,null,["b","t","g"][i])});
  var one=s.box(214,28,172,172,"",null,"a");
  s.text(300,48,"ONE CONVERSATION","sm c");
  [["Think (chat)","b"],["Do (Cowork)","t"],["Make (Docs, Slides)","g"]].forEach(function(p,i){s.box(226,62+i*46,148,40,p[0],null,p[1],{rx:8})});
  s.path("M168 114 H210",{});
  E["16.1"]={
    plain:"<p>Since September 2026, Claude's chat and Cowork are one app. Claude Docs, Slides and Design also work right inside a conversation.</p><p>So you can think something through, have Claude do the work, and get a polished document or deck, all in one place.</p><p>The old question «which part of Claude do I open?» mostly goes away.</p>",
    map:[["A phone that replaced the camera and music player","One app replacing three places"],["Switching apps","Switching surfaces (mostly gone)"]],
    breaks:"A phone camera is the same camera everywhere. Some Claude features still differ by plan or platform, so check what your plan includes.",
    viz:{svg:s.svg(),cap:"Three places folded into one conversation."},
    line:"Chat, Cowork, Docs and Slides now live together in one Claude app."
  };
})();

/* ---------- 16.2 ---------- */
(function(){
  var s=VZ.scene(400,262,"Rebuilt Projects: parallel threads on their own branches, all sharing one memory and library");
  var mem=s.box(100,14,200,56,"Shared memory","every thread reads + writes","v");
  var T=["Thread A","Thread B","Thread C"].map(function(t,i){return s.box(14+i*128,110,116,56,t,"own branch","b")});
  T.forEach(function(t){s.link(t,mem,null,{bend:0});});
  var lib=s.box(100,200,200,50,"Project library","files + artifacts","g");
  T.forEach(function(t){s.link(t,lib)});
  E["16.2"]={
    plain:"<p>Projects were rebuilt for long, multi-part work. A Project now holds several <b>threads</b>, and each thread is its own Claude Code cloud session working on its own branch.</p><p>All threads share one <b>memory</b>, so you don't re-explain the background. A <b>library</b> collects the files and artifacts they produce.</p>",
    map:[["A group project with a shared notebook","A Project with shared memory"],["Each student's own draft","A thread on its own branch"],["The class folder of finished work","The project library"]],
    breaks:"Students can talk across the table. Threads coordinate only through the shared memory, so write decisions down there.",
    viz:{svg:s.svg(),cap:"Threads work in parallel; memory above and the library below are shared by all."},
    line:"A rebuilt Project runs several Claude threads at once, all sharing one memory."
  };
})();

/* ---------- 16.3 ---------- */
(function(){
  var s=VZ.scene(400,240,"Claude in Chrome: web content passes through safety classifiers before Claude acts");
  var pg=s.box(14,24,120,60,"Web page","untrusted text","g"),cl=s.box(150,24,110,60,"Safety\nclassifiers",null,"r"),c=s.box(276,24,110,60,"Claude acts","click, type","a");
  s.link(pg,cl);s.link(cl,c);
  s.box(14,116,372,48,"You: approve payments, sends and deletes",null,"b",{rx:8});
  s.path("M331 86 V112",{});
  s.text(200,196,"acting on untrusted pages = inside the lethal trifecta","sm h");
  s.text(200,218,"the guardrails are part of the product","sm");
  E["16.3"]={
    plain:"<p>Claude in Chrome is now generally available on all paid plans. It can run multi-step web tasks in a real browser for you: navigating, clicking and typing.</p><p>Web pages are untrusted, and some try to trick AI. So Chrome has built-in safety checks against those tricks.</p><p>You still approve anything that pays, sends or deletes.</p>",
    map:[["A trusted errand runner","Claude in Chrome"],["A guard at the door checking notes","Safety classifiers"],["You signing the cheque","Approving irreversible steps"]],
    breaks:"A door guard catches most fake notes, not all. Classifiers reduce risk but don't remove it, so your approvals stay important.",
    viz:{svg:s.svg(),cap:"Page content is screened before Claude acts; consequential actions still come to you."},
    line:"Claude in Chrome runs web errands for you, with safety checks and your sign-off on risky steps."
  };
})();

/* ---------- 16.4 ---------- */
(function(){
  var s=VZ.scene(400,262,"Progressive loading of an Agent Skill: metadata always, instructions on trigger, scripts when needed");
  var L=[["1 · Metadata","name + description","always loaded","g"],["2 · Instructions","the SKILL.md body","on a match","a"],["3 · Scripts + files","run in a container","only if needed","v"]];
  L.forEach(function(p,i){s.box(14+i*20,14+i*76,240-i*20,62,p[0],p[1],p[3],{step:i});s.text(270,45+i*76,p[2],"sm","start",{step:i});});
  E["16.4"]={
    plain:"<p>An <b>Agent Skill</b> is a folder with a SKILL.md file: a name, a description of when to use it, and instructions. It can also hold scripts and reference files.</p><p>Claude loads it in stages. It always sees the name and description, reads the full instructions only when a request matches, and runs scripts only if needed.</p><p>You build it once and it works in the app, Claude Code and the API (uploaded through the Skills API).</p>",
    map:[["A recipe card's title","The Skill's name and description"],["Reading the whole card","Loading the instructions"],["Getting out the special tools","Running the bundled scripts"]],
    breaks:"You pick a recipe by reading titles yourself. Claude decides from the description alone, so write it to say exactly when the Skill applies.",
    viz:{svg:s.svg(),cap:"Three levels, loaded only as deep as the task needs. This keeps many Skills cheap to have installed.",
      steps:["Always loaded: just the name and description.","When a request matches, Claude reads the full SKILL.md instructions.","Only if needed, it runs the bundled scripts in a code-execution container."]},
    line:"A Skill loads in layers: its title always, its instructions when needed, its tools when used."
  };
})();

/* ---------- 16.5 ---------- */
(function(){
  var s=VZ.scene(400,250,"Files API: upload once, reuse the file_id across many requests");
  var up=s.box(14,20,120,56,"Upload once","invoice.pdf","g"),fid=s.box(160,20,96,56,"file_id",null,"a");
  s.link(up,fid);
  var R=["Extract fields","Check totals","Match to PO"].map(function(t,i){var b=s.box(282,14+i*50,104,40,t,null,"b",{rx:8});s.link(fid,b);return b});
  s.box(14,184,372,50,"Structured, reconciled data out (JSON)","no re-sending the bytes each call","e",{rx:8});
  E["16.5"]={
    plain:"<p>The <b>Files API</b> lets you upload a document once and get back an ID, called a <code>file_id</code>. Later requests just use the ID instead of sending the whole file again.</p><p>Combined with Claude's ability to read PDFs and images, this powers a document agent. It reads invoices, contracts or forms and returns clean, structured data.</p>",
    map:[["Leaving a book at the library desk","Uploading the file"],["The ticket you get back","The file_id"],["Showing the ticket instead of carrying the book","Referencing the file_id in requests"]],
    breaks:"A library ticket lasts as long as the library keeps the book. Uploaded files are stored separately and you manage and delete them, so plan where they live.",
    viz:{svg:s.svg(),cap:"One upload, many requests: each step points at the same file_id."},
    line:"Upload a document once, then refer to it by its ID in every request."
  };
})();

/* ---------- 16.6 ---------- */
(function(){
  var s=VZ.scene(400,250,"A vertical agent: generic Claude pre-wired into one industry's tools and workflows");
  var g=s.box(14,90,110,60,"Claude","general skills","a");
  var v=s.box(150,40,236,160,"",null,"g");
  s.text(268,58,"ONE INDUSTRY, PRE-WIRED","sm h");
  [["Its tools","connectors"],["Its workflows","skills"],["Its rules","guardrails"]].forEach(function(p,i){s.box(166,72+i*42,204,36,p[0]+" · "+p[1],null,["b","v","r"][i],{rx:8})});
  s.link(g,v);
  s.text(200,228,"the money concentrates here, not in generic chat","sm h");
  E["16.6"]={
    plain:"<p>In 2026 Anthropic released several industry packages, for sales, financial advisers, small businesses and teachers.</p><p>They show where applied AI earns money: not generic chat, but agents already connected to one industry's tools, workflows and rules.</p><p>This lesson shows how to package and sell a vertical agent of your own.</p>",
    map:[["A general doctor","Generic Claude"],["A specialist with the right equipment","A vertical agent"],["The clinic's own instruments","The industry's tools and connectors"]],
    breaks:"A specialist has years of training. A vertical agent is only as expert as the workflows and checks you build in, so test it with real users from that industry.",
    viz:{svg:s.svg(),cap:"The same Claude, wrapped in one industry's tools, workflows and rules."},
    line:"Package Claude for one industry, wired to its tools, and sell that."
  };
})();
})();
