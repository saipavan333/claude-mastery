/* Pass 2 — Track 4 (Claude App Mastery). Feature descriptions follow the
   lessons' own pass-1 verified text; no new prices or limits. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 4.1 ---------- */
(function(){
  var s=VZ.scene(400,232,"One account across web, desktop and mobile, with settings that shape every chat");
  var acc=s.box(130,14,140,52,"Your account","chats, Projects, settings","a");
  var w=s.box(14,110,116,52,"Web","any browser","b"),d=s.box(142,110,116,52,"Desktop","PC or Mac app","t"),m=s.box(270,110,116,52,"Mobile","voice, camera","g");
  s.link(acc,w);s.link(acc,d);s.link(acc,m);
  s.box(14,180,372,44,"Set preferences once → better chats everywhere",null,"v",{rx:8});
  E["4.1"]={
    plain:"<p>The Claude app runs in a web browser, as a desktop program and on your phone. It's the same Claude and the same account on all three.</p><p>Each one is good at different things. The phone has voice and the camera; the computer is better for long work with files.</p><p>Spend ten minutes in Settings once. Choices like your preferred style then improve every chat after that.</p>",
    map:[["One phone","One Claude account"],["Torch, scanner, translator you never found","Features like styles, voice input and file upload"],["Setting your ringtone once","Setting preferences once in Settings"]],
    breaks:"A phone's features are all in one device. Some Claude features exist on one platform and not another, so check where a feature lives before you hunt for it.",
    viz:{svg:s.svg(),cap:"Everything hangs off one account; each platform adds its own strengths."},
    line:"It's one Claude on web, desktop and phone, and a few settings make all of them better."
  };
})();

/* ---------- 4.2 ---------- */
(function(){
  var s=VZ.scene(400,254,"A Project combines instructions and knowledge, which every chat inside it uses");
  var pj=s.box(14,14,372,108,"",null,"a");
  s.text(200,32,"PROJECT: «Client Acme»","sm h");
  var ins=s.box(30,48,160,60,"Instructions","how to behave here","v"),kn=s.box(210,48,160,60,"Knowledge","files Claude can use","g");
  var c1=s.box(14,170,116,48,"Chat 1",null,"b"),c2=s.box(142,170,116,48,"Chat 2",null,"b"),c3=s.box(270,170,116,48,"Chat 3",null,"b");
  [c1,c2,c3].forEach(function(c){s.path("M"+c.cx+" 124 V166",{})});
  s.text(200,238,"every chat starts already briefed","sm");
  E["4.2"]={
    plain:"<p>A <b>Project</b> is a workspace for one client, subject or recurring job.</p><p>It has two parts. <b>Instructions</b> tell Claude how to behave in this Project. <b>Knowledge</b> is the files you upload for Claude to use.</p><p>Every new chat inside the Project starts with both, so you stop explaining the same background again and again.</p>",
    map:[["A labelled binder","A Project"],["The instructions sheet at the front","Project instructions"],["The notes inside","Uploaded knowledge files"],["Opening the binder for a new lesson","Starting a new chat in the Project"]],
    breaks:"A binder's pages never change on their own. If a fact in your knowledge files goes out of date, every chat keeps using the old one until you replace the file.",
    viz:{svg:s.svg(),cap:"Instructions and knowledge sit at the Project level; every chat inside inherits both."},
    line:"A Project is a labelled binder, so Claude already knows the background when you open it."
  };
})();

/* ---------- 4.3 ---------- */
(function(){
  var s=VZ.scene(400,250,"Three layers of what Claude knows about you, and the controls you hold");
  var L=[["This chat","what you said here","b"],["Project context","instructions + files you chose","g"],["Memory","facts it carries across chats","v"]];
  L.forEach(function(l,i){s.box(14,14+i*62,250,52,l[0],l[1],l[2]);});
  var c=s.box(284,40,102,120,"Your\ncontrols","view · edit\nturn off ·\nincognito","a");
  s.path("M266 164 H282",{});
  s.text(140,218,"memory is a convenience, not the source of truth","sm");
  E["4.3"]={
    plain:"<p>Claude can remember facts about you between chats, like your job or the style you like. This is called <b>memory</b>.</p><p>It's different from a Project, where you choose exactly which files and instructions Claude sees.</p><p>You can view what Claude remembers, edit it, turn memory off, or use an incognito chat that isn't remembered. Keep important facts in documents you control, not only in memory.</p>",
    map:[["The class teacher","Claude with memory switched on"],["Remembering you like cricket examples","A saved preference"],["The teacher's notebook","Your memory, which you can view"],["Erasing a page","Editing or deleting a memory"]],
    breaks:"A teacher's memory is fuzzy but always on. Claude's memory is a setting: you can switch it off, and incognito chats aren't added to it.",
    viz:{svg:s.svg(),cap:"Three layers people confuse. Only the bottom one follows you across chats by itself, and you hold its controls."},
    line:"Claude can remember you between chats, and you decide what it keeps."
  };
})();

/* ---------- 4.4 ---------- */
function v44(code){
  var s=VZ.scene(400,214,"Reading a file with the model's eyes versus running code on it");
  var f=s.box(14,80,96,56,"sales.csv","2,000 rows","g");
  var r=s.box(150,code?24:80,110,56,code?"Writes code":"Reads it",code?"Python":"eyes only",code?"t":"b");
  var o=s.box(296,code?24:80,90,56,code?"Exact\nanswer":"Estimate",null,code?"e":"r");
  s.link(f,r);s.link(r,o);
  if(code){var x=s.box(150,130,110,48,"Runs it","real maths","t");s.link(r,x);s.link(x,o);}
  s.text(200,200,code?"counting and maths: let it compute":"good for meaning, risky for totals","sm");
  return s.svg();
}
E["4.4"]={
  plain:"<p>You can give Claude PDFs, images, screenshots and spreadsheets. It reads text and pictures directly, much like a person would.</p><p>For numbers there's a better way. The <b>analysis tool</b> lets Claude write and run real code on your file, so totals and averages are calculated, not guessed.</p><p>The rule: use Claude's eyes for meaning and judgement, and code for counting and maths.</p>",
  map:[["A classmate reading the timetable photo","Claude reading an image"],["Adding up marks in your head","Reading numbers by eye"],["Using a calculator","The analysis tool running code"]],
  breaks:"A classmate's eyes rarely misread a printed number. Claude can misread a blurry scan or a dense table, so check key numbers it reads from images.",
  viz:{svg:v44(true),cap:"Toggle between eyes and code: for a total over 2,000 rows you want the code path."},
  play:{t:"Eyes or code?",inFig:1,build:function(root){
    var c=1;root.innerHTML='<button class="wbtn" id="b44">Use eyes only</button><div id="v44"></div><div class="vpout" id="o44"></div>';
    function draw(){root.querySelector("#v44").innerHTML=v44(c);root.querySelector("#b44").textContent=c?"Use eyes only":"Use the analysis tool";
      root.querySelector("#o44").innerHTML=c?"<b>Code path:</b> Claude writes a short program, runs it, and reports the computed total. You can read the code.":"<b>Eyes only:</b> fine for «what's the trend?», risky for «what's the exact total?».";}
    root.querySelector("#b44").addEventListener("click",function(){c=c?0:1;draw()});draw();}},
  line:"Claude can read your files, and it should run code whenever the answer is a number."
};

/* ---------- 4.5 ---------- */
(function(){
  var s=VZ.flow([
    {t:"You describe it",s:"«a quiz with a timer»",tone:"b"},
    {t:"Claude builds it",s:"code, doc or diagram",tone:"a"},
    {t:"It runs beside\nthe chat",s:"the artifact panel",tone:"t"},
    {t:"You ask for\nchanges",s:"«make the timer red»",tone:"g"},
    {t:"Share a link",s:"publish when ready",tone:"e"}
  ],{cols:2,bh:62,gy:30,stepped:true,aria:"How an artifact is made, changed and shared"});
  E["4.5"]={
    plain:"<p>An <b>artifact</b> is a real thing Claude makes for you, shown in a panel next to the chat. It can be a document, a diagram, or a small working app or game.</p><p>You change it by asking in plain words. When you're happy, you can publish it and share a link.</p><p>Some artifacts can even call Claude from inside themselves, so the little app has its own brain.</p>",
    map:[["Describing the toy you want","Your prompt"],["The helper building it on the table","Claude generating the artifact"],["Playing with it straight away","The live preview panel"],["«Make the wheels bigger»","Asking for an edit"]],
    breaks:"A toy on the table is yours to keep forever. An artifact is a small hosted page; it isn't a full app with your own server, database or app-store listing.",
    viz:{svg:s.svg(),cap:"From a sentence to a working thing, then round the edit loop until it's ready to share.",
      steps:["You describe what you want in one or two sentences.","Claude writes it: code, a document or a diagram.","It appears live in a panel beside the chat.","You ask for changes in plain words and it updates.","When it's good, you publish it and share the link."]},
    line:"Describe a thing, and Claude builds a working version you can change and share."
  };
})();

/* ---------- 4.6 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Your brief",s:"question, scope, sources",tone:"a"},
    {t:"Search",s:"many queries",tone:"b"},
    {t:"Read + compare",s:"cross-check sources",tone:"g"},
    {t:"Cited report",s:"each claim linked",tone:"e"}
  ],{w:400,h:290,bw:146,bh:62,stepped:true,center:"you audit\nthe citations",aria:"Research mode: brief, search, read, report"});
  E["4.6"]={
    plain:"<p><b>Research mode</b> sends Claude off to search the web and your connected sources by itself, for several minutes.</p><p>It reads many pages, compares them, and comes back with a report where each claim links to its source.</p><p>The better your brief, the better the report. And you still check the important citations yourself.</p>",
    map:[["The librarian","Research mode"],["Going through many books","Searching and reading many sources"],["Sticky notes on each fact","Citations in the report"],["You checking the sticky notes","Auditing the sources"]],
    breaks:"A librarian only brings real books. A cited link can still be misread or summarised wrongly, so open the sources behind any claim you'll rely on.",
    viz:{svg:s.svg(),cap:"Research mode runs the search-and-read loop for you; the audit at the end is still your job.",
      steps:["You write a brief: the question, what's in scope, and what sources you trust.","Claude runs many searches on its own.","It reads the results and compares what different sources say.","It writes a report with each claim linked to a source, and you check the ones that matter."]},
    line:"Research mode reads many sources for you and shows where each fact came from."
  };
})();

/* ---------- 4.7 ---------- */
(function(){
  var s=VZ.scene(400,244,"Connectors let Claude reach your tools within the permissions you grant");
  var c=s.box(14,92,100,60,"Claude",null,"a");
  var g=s.box(150,92,100,60,"Permission\ngate","you choose","r");
  var tools=[["Gmail","b"],["Drive","g"],["Calendar","t"],["Team tools","v"]];
  var T=tools.map(function(t,i){return s.box(290,14+i*56,96,44,t[0],null,t[1])});
  s.link(c,g);T.forEach(function(t){s.link(g,t)});
  s.text(200,232,"read is common; acting (send, edit) needs more care","sm");
  E["4.7"]={
    plain:"<p>A <b>connector</b> lets Claude look inside your real tools, like Gmail, Google Drive, your calendar or team apps.</p><p>Instead of copying and pasting, you can say «find last week's invoice email» and Claude looks it up.</p><p>You decide which tools to connect and what Claude may do there. Reading is lower risk than letting it send or change things.</p>",
    map:[["A key to the notice board and library","A connector"],["Which rooms the key opens","The permissions you grant"],["Looking, not rearranging","Read-only access"]],
    breaks:"A key only opens doors. A connected tool can also contain text written by strangers, such as an email, that tries to give Claude orders. Lesson 8.5 covers this.",
    viz:{svg:s.svg(),cap:"Every connector passes through the permissions you set. Grant the least access that does the job."},
    line:"Connectors let Claude look things up in your own tools, but only where you let it."
  };
})();

/* ---------- 4.8 ---------- */
(function(){
  var s=VZ.scene(400,244,"Skills: Claude reads only short descriptions until a task matches, then loads the full skill");
  var cards=[["invoice-checker","«check invoices…»"],["brand-voice","«write in our voice…»"],["weekly-report","«build the Monday report…»"]];
  s.text(112,14,"DESCRIPTIONS (ALWAYS SEEN)","sm h");
  var C=cards.map(function(c,i){return s.box(14,26+i*50,196,42,c[0],c[1],i===2?"g":"n",{step:i===2?1:0})});
  var t=s.box(250,22,136,64,"Task arrives","«make the Monday\nreport»","b",{step:0});
  var full=s.box(230,134,156,88,"Full SKILL.md\nloaded","steps, files,\nscripts","g",{step:2});
  s.path("M300 88 Q290 147 214 147",{step:1});s.label(262,128,"match",{step:1});s.link(C[2],full,null,{step:2});
  s.box(14,190,196,40,"Claude follows it",null,"e",{step:3,rx:8});s.link(full,{x:14,y:190,w:196,h:40,cx:112,cy:210},null,{step:3});
  E["4.8"]={
    plain:"<p>A <b>Skill</b> is a saved set of instructions for one kind of job, like «check an invoice» or «write in our brand voice». It is a folder with a file called SKILL.md, plus any extra files or scripts.</p><p>Claude keeps only each Skill's short description in mind. When a task matches a description, it opens the full Skill and follows it.</p><p>So you write your procedure once, and Claude uses it whenever it fits.</p>",
    map:[["The drawer of recipe cards","Your installed Skills"],["The title on each card","The Skill's description"],["Pulling out the matching card","Loading the full SKILL.md"],["Following the recipe step by step","Claude applying the Skill"]],
    breaks:"You pick a recipe card yourself. Claude picks Skills by matching the description, so a vague description means the Skill fires at the wrong time or not at all.",
    viz:{svg:s.svg(),cap:"Descriptions are cheap to keep in view; the full Skill loads only when a task matches.",
      steps:["A task arrives. Claude can see every Skill's short description.","It matches the task to the «weekly-report» description.","Only now does it load that Skill's full instructions and files.","It follows the Skill's steps to do the job."]},
    line:"A Skill is a recipe card Claude pulls out only when the job matches."
  };
})();
})();
