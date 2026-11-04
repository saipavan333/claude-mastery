/* Pass 2 — Track 7 (Claude Code). Hook event names, exit-2 blocking,
   /rewind, /compact and permission modes are the ones the lessons teach
   (7.5 "Under the hood" checked against code.claude.com on 2026-11-03). */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 7.1 ---------- */
(function(){
  var s=VZ.fan({t:"Claude Code",s:"an agent in\nyour project",tone:"a"},[
    {t:"Read files",s:"the whole project",tone:"b"},{t:"Edit files",s:"shows you the diff",tone:"t"},
    {t:"Run commands",s:"tests, scripts, tools",tone:"g"},{t:"Use git",s:"save and undo work",tone:"v"}
  ],{w:400,bh:52,gy:12,kw:190,cw:124,sh:80,aria:"Claude Code reaches files, commands and git in your project"});
  E["7.1"]={
    plain:"<p><b>Claude Code</b> is Claude working directly inside a project folder on a computer. It runs in the terminal, a desktop app, VS Code or the web.</p><p>It can read files, change them, run commands and check its own work. You approve what it does.</p><p>You don't need to be a programmer. Anything that lives in files, like data, documents or websites, is fair game.</p>",
    map:[["The toolbox","Your project folder"],["Opening drawers","Reading files"],["Using the tools","Running commands"],["Building the thing","Editing files and testing them"]],
    breaks:"A helper in a toolbox can't break the house. Claude Code can run real commands on your computer, so read what it plans to run before you approve.",
    viz:{svg:s.svg(),cap:"Four kinds of reach, all inside the folder you started it in."},
    line:"Claude Code is Claude with hands inside your project: it reads, edits, runs and checks."
  };
})();

/* ---------- 7.2 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"You brief",s:"goal + limits",tone:"b"},
    {t:"It plans",s:"the steps it will take",tone:"v"},
    {t:"You approve",s:"yes / no / change",tone:"r"},
    {t:"It acts",s:"edits, runs commands",tone:"a"},
    {t:"You read diffs",s:"what exactly changed",tone:"g"}
  ],{w:400,h:320,bw:130,bh:58,stepped:true,center:"small steps,\nevery lap",aria:"The Claude Code session loop"});
  E["7.2"]={
    plain:"<p>A Claude Code session is a loop. You say what you want, it suggests a plan, and you approve. It makes changes and runs commands, then you look at exactly what changed, called the <b>diff</b>.</p><p>Start it in the right folder, ask for a plan first, and keep each step small. Those habits stop most mistakes before they happen.</p>",
    map:[["Explaining the experiment","Your brief"],["The partner suggesting a step","Claude's plan"],["Saying yes or no","Approving the action"],["Writing it up together","Reviewing the diff and moving on"]],
    breaks:"A lab partner remembers yesterday. A new Claude Code session starts fresh, which is why the next lesson's CLAUDE.md file exists.",
    viz:{svg:s.svg(),cap:"Five beats, repeated. The two red and gold beats are yours.",
      steps:["You describe the goal and any limits.","Claude proposes a plan.","You approve, refuse or adjust it.","It edits files and runs commands.","You read the diff, then go round again."]},
    line:"Brief it, check its plan, approve, and read exactly what it changed."
  };
})();

/* ---------- 7.3 ---------- */
(function(){
  var s=VZ.scene(400,234,"CLAUDE.md is read at the start of every session, so each session begins briefed");
  var f=s.box(14,20,170,110,"CLAUDE.md","what this is · commands\nconventions · rules\n«never touch originals/»","g");
  var s1=s.box(230,14,156,44,"Session Monday",null,"b"),s2=s.box(230,72,156,44,"Session Tuesday",null,"b"),s3=s.box(230,130,156,44,"Session next month",null,"b");
  [s1,s2,s3].forEach(function(x){s.link(f,x)});
  s.box(14,190,372,36,"Same mistake twice? Add a line to the file.",null,"n",{rx:8});
  E["7.3"]={
    plain:"<p>Each new Claude Code session starts knowing nothing about your project. <b>CLAUDE.md</b> fixes that.</p><p>It's a plain text file in your project that Claude Code reads at the start of every session. It says what the project is, which commands to use, your house rules and what never to touch.</p><p>When Claude makes the same mistake twice, add a line to the file.</p>",
    map:[["The note on the classroom door","CLAUDE.md"],["Every helper reads it first","Read at every session start"],["«Never touch the fish tank»","A rule like «never edit originals/»"]],
    breaks:"A door note is read once and remembered. Claude reads CLAUDE.md as instructions, not as a lock; for rules that must never break, use a hook (Lesson 7.5).",
    viz:{svg:s.svg(),cap:"One file, read at the start of every session, so none of them starts cold."},
    line:"CLAUDE.md is the note Claude reads first, every time it walks into your project."
  };
})();

/* ---------- 7.4 ---------- */
(function(){
  var s=VZ.scene(400,240,"Checkpoints are saved before each change, and rewind returns to any of them");
  s.path("M20 70 H380",{noarrow:1});
  ["start","edit 1","edit 2","edit 3","edit 4"].forEach(function(t,i){var x=30+i*84;
    s.raw('<circle cx="'+x+'" cy="70" r="9" class="vzdot'+(i===4?' bad':'')+'" style="fill:'+(i===4?'var(--rose)':'var(--teal)')+'"/>');s.text(x,46,t,"sm");});
  s.text(366,96,"broke it","sm");
  s.path("M366 108 Q280 150 198 82",{tone:"a"});s.label(290,150,"/rewind",{});
  var m=["Ask first","Plan only","Auto-accept"];
  s.text(200,186,"AUTONOMY DIAL (PERMISSION MODES)","sm h");
  m.forEach(function(t,i){s.box(14+i*128,198,116,34,t,null,["b","v","a"][i],{rx:8})});
  E["7.4"]={
    plain:"<p>Claude Code has three kinds of controls.</p><p><b>Slash commands</b> are typed shortcuts like <code>/help</code>, <code>/context</code> or <code>/compact</code>. <b>Permission modes</b> set how much it may do without asking: ask first, plan only, or accept edits automatically.</p><p><b>Checkpoints</b> are saved before each change. If a step goes wrong, <code>/rewind</code> takes you back.</p>",
    map:[["Controller buttons","Slash commands"],["Difficulty setting","Permission mode"],["Save points","Checkpoints"],["Loading a save","/rewind"]],
    breaks:"A game save restores everything. A checkpoint covers Claude's file edits; things that left your computer, like a deployed site or a sent message, don't come back.",
    viz:{svg:s.svg(),cap:"Top: a save point before every edit, and /rewind jumps back. Bottom: how much freedom each mode gives."},
    line:"Use shortcuts to steer, modes to set freedom, and checkpoints to undo."
  };
})();

/* ---------- 7.5 hooks ---------- */
var H75=[["SessionStart","session opens","b"],["UserPromptSubmit","you send a message","v"],["PreToolUse","before a tool runs · can block","r"],["Tool runs","edit, bash, …","a"],["PostToolUse","after the tool","g"],["Stop","Claude finishes","t"]];
function v75(k,risky){
  var s=VZ.scene(400,352,"Hook events firing in order during one turn; PreToolUse can block a risky tool call");
  H75.forEach(function(h,i){var y=10+i*57,blocked=risky&&i>=3&&k>=2,on=i===k;
    var b=s.box(14,y,220,46,h[0],h[1],blocked&&(i===3||i===4)?"n":h[2],{cls:on?"cur":""});
    if(on)s.raw('<rect x="10" y="'+(y-4)+'" width="228" height="54" rx="12" style="fill:none;stroke:var(--ink);stroke-width:2.2"/>');
    if(i<H75.length-1)s.path("M124 "+(y+47)+" V"+(y+55),{});});
  if(risky&&k>=2){s.box(256,112,130,74,"exit 2 →\nblocked","reason shown\nto Claude","r");s.path("M236 136 H252",{});}
  else if(k>=2)s.box(256,112,130,74,"exit 0 →\nallowed","tool may run","e");
  else s.box(256,112,130,74,"hook waits","for PreToolUse","n");
  s.text(320,214,risky?"«rm -rf originals»":"«edit work/a.csv»","sm");
  return s.svg();
}
E["7.5"]={
  plain:"<p>Claude Code can be extended three ways.</p><p><b>Skills</b> are saved procedures it uses when a job matches. <b>Sub-agents</b> are helpers it sends off on side tasks, like a search or a review, so the main session stays tidy.</p><p><b>Hooks</b> are your own scripts that run at fixed moments, such as just before a tool runs. A hook always runs, so it can enforce a rule. For example, it can block any command that touches your original files.</p>",
  map:[["Recipe cards","Skills"],["Apprentices sent on errands","Sub-agents"],["The saw's safety switch","A hook (for example PreToolUse)"],["The switch cutting power","The hook exiting with code 2 to block"]],
  breaks:"A safety switch can't be talked round. A hook can't either, but it only catches what its script checks for; a command that sneaks past the pattern gets through.",
  viz:{cap:"Step through one turn. Toggle the risky command and watch the PreToolUse hook stop the tool from running."},
  play:{t:"Fire the hooks",inFig:1,build:function(root){
    var k=0,risky=1;root.innerHTML='<button class="wbtn" id="n75">Next event ▶</button> <button class="wbtn" id="t75">Make it safe</button><div id="v75"></div><div class="vpout" id="o75"></div>';
    function msg(){if(risky&&k>=3)return "<b>Blocked.</b> The PreToolUse script matched «originals» and exited with code 2, so the tool never ran and Claude was told why.";
      return "<b>"+H75[k][0]+":</b> "+H75[k][1]+".";}
    function draw(){root.querySelector("#v75").innerHTML=v75(Math.min(k,risky?2:5),risky);root.querySelector("#o75").innerHTML=msg();root.querySelector("#t75").textContent=risky?"Make it safe":"Make it risky";}
    root.querySelector("#n75").addEventListener("click",function(){k=(k+1)%(risky?4:6);draw()});
    root.querySelector("#t75").addEventListener("click",function(){risky=risky?0:1;k=0;draw()});draw();}},
  line:"Skills are recipes, sub-agents are helpers, and hooks are safety switches that always fire."
};

/* ---------- 7.6 ---------- */
(function(){
  var s=VZ.fan({t:"You, directing",s:"one repo",tone:"a"},[
    {t:"Session A",s:"worktree: fix-login",tone:"b"},{t:"Session B",s:"worktree: new-report",tone:"t"},{t:"Session C",s:"worktree: docs",tone:"v"}
  ],{w:400,bh:54,gy:14,kw:156,cw:110,merge:{t:"You review\n+ merge",s:"one at a time",tone:"g"},aria:"Parallel Claude Code sessions, each in its own git worktree, reviewed and merged"});
  E["7.6"]={
    plain:"<p>You can run several Claude Code sessions at once. Each one works in its own copy of the project, called a <b>git worktree</b>, so they don't trip over each other.</p><p>Long jobs can run in the background, on a schedule, or in the cloud while your laptop sleeps.</p><p>Your role becomes the director: hand out jobs, then review and merge each result.</p>",
    map:[["Three washing machines","Three parallel sessions"],["Each load in its own drum","Each session in its own worktree"],["Coming back when they beep","Reviewing each finished branch"]],
    breaks:"Clean laundry never clashes. Two sessions can change the same file in different ways, and you have to sort that out when you merge.",
    viz:{svg:s.svg(),cap:"Parallel sessions in separate worktrees; you are the bottleneck on purpose, at the review."},
    line:"Run several Claude sessions side by side, each in its own copy, and review each one."
  };
})();

/* ---------- 7.7 ---------- */
(function(){
  var s=VZ.fan({t:"Same powers",s:"read · transform\nrun · repeat",tone:"a"},[
    {t:"Data",s:"clean 40 CSVs",tone:"b"},{t:"Documents",s:"PDF → report pipeline",tone:"g"},{t:"Media",s:"resize, convert",tone:"v"},
    {t:"Housekeeping",s:"rename, back up",tone:"t"},{t:"Research",s:"compile, cite",tone:"e"}
  ],{w:400,bh:46,gy:10,kw:200,cw:124,sh:80,aria:"Claude Code's powers applied to five non-coding territories"});
  E["7.7"]={
    plain:"<p>Claude Code isn't only for software. The same powers work on anything stored in files.</p><p>It can clean a pile of spreadsheets, turn PDFs into a report, convert images, tidy folders, or gather research into one document.</p><p>It does this by using free tools on your computer and writing small scripts. You describe the result and check it.</p>",
    map:[["The handyman","Claude Code"],["Sorting, fixing, building","Data, documents, media, housekeeping, research"],["The handyman's toolbox","Command-line tools and small scripts"]],
    breaks:"A handyman asks before throwing things out. Claude Code will run what you approve, so for anything irreversible, work on a copy first.",
    viz:{svg:s.svg(),cap:"«Code» was just the first customer. Every territory here is files plus repetition."},
    line:"Claude Code is a handyman for any job made of files, not just code."
  };
})();

/* ---------- 7.8 ---------- */
(function(){
  var s=VZ.scene(400,260,"The pro loop: plan, build, verify, commit, with a failed check looping back to build");
  var p=s.box(14,20,170,56,"Plan","before any edit","v",{step:0}),b=s.box(216,20,170,56,"Build","small, reviewed steps","a",{step:1});
  var v=s.box(216,128,170,56,"Verify","tests, receipts","r",{step:2}),c=s.box(14,128,170,56,"Commit","small, described","e",{step:3});
  s.link(p,b,null,{step:1});s.link(b,v,null,{step:2});s.link(v,c,"pass",{step:3});
  s.path("M386 156 Q398 100 386 60",{dash:1,tone:"r",step:2});s.text(372,104,"fail","sm","end");
  s.path("M99 186 V232 H301 V188",{dash:1,step:3});s.label(200,232,"next feature",{step:3});
  E["7.8"]={
    plain:"<p>Professionals use Claude Code in one steady loop: <b>plan</b>, <b>build</b>, <b>verify</b>, <b>commit</b>.</p><p>Plan before any edits, and build in small steps you can review. Verify with real checks, like running the tests. Then commit, which means saving a described snapshot in git.</p><p>If a check fails, go back to build. Never skip verify because the code «looks right».</p>",
    map:[["Plan the experiment","Plan"],["Build the setup","Build"],["Test it","Verify"],["Write it up for the judges","Commit with a clear message"]],
    breaks:"A science-fair write-up happens once. In git, every small commit is a save point you can return to, so many small commits beat one big one.",
    viz:{svg:s.svg(),cap:"Four beats; the red dashed path is the honest one: a failed check sends you back to build.",
      steps:["Plan: agree the approach before touching files.","Build: small changes, each diff read.","Verify: run the tests or checks. If they fail, back to build.","Commit: save a small, described snapshot, then start the next feature."]},
    line:"Plan, build, test, then save, and go back if the test fails."
  };
})();
})();
