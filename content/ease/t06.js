/* Pass 2 — Track 6 (Claude in Your Tools). Chrome GA on paid plans
   (pass-1 verified, claude.com blog 26 Aug 2026). */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 6.1 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Read the page",s:"what's on screen",tone:"b"},
    {t:"Decide a step",s:"click, type, scroll",tone:"a"},
    {t:"Act",s:"in your browser",tone:"t"},
    {t:"Check result",s:"new page state",tone:"g"}
  ],{w:400,h:290,bw:140,bh:60,stepped:true,center:"pay, send, delete?\nyou confirm first",aria:"The browser agent loop with a human stop before irreversible steps"});
  E["6.1"]={
    plain:"<p><b>Claude in Chrome</b> is a browser extension. Claude can see the web page you're on, click, type and fill in forms.</p><p>It's great for boring web chores, like copying details from many pages or filling the same form again and again.</p><p>Websites can contain hidden text that tries to trick it. So keep it away from sensitive sites, and always confirm before it pays, sends or deletes anything.</p>",
    map:[["The careful older cousin","Claude in Chrome"],["Sitting next to them","You watching the session"],["Stopping them before «Pay»","Confirming irreversible steps yourself"]],
    breaks:"Your cousin won't obey a sign on the website saying «ignore your instructions». Claude can be fooled by text like that on a page, which is why you stay in charge of risky clicks.",
    viz:{svg:s.svg(),cap:"Claude works the page in a loop of read, decide, act, check. The centre is your rule for anything that can't be undone.",
      steps:["Claude reads what's on the page right now.","It decides the next small step: a click, some typing, a scroll.","It does the step in your browser.","It looks at the new page and goes round again. Before paying, sending or deleting, you confirm."]},
    line:"Claude in Chrome can click and type on websites for you, but you approve anything that can't be undone."
  };
})();

/* ---------- 6.2 ---------- */
(function(){
  var s=VZ.scene(400,240,"Claude for Excel answers with cell citations and edits formulas inside the workbook");
  var q=s.box(14,20,150,56,"«Why is Q3\nmargin low?»",null,"b");
  var c=s.box(14,96,150,72,"Claude in\nthe workbook","reads every sheet","a");
  var g=s.box(200,14,186,150,"",null,"n");
  ["B4  Revenue","B9  Costs ← cited","C12 =B4-B9","D3  #REF! fixed"].forEach(function(t,i){s.box(212,26+i*34,162,28,t,null,i===1?"g":i===3?"r":"t",{rx:6})});
  s.link(q,c);s.path("M166 132 H196",{});
  s.box(14,186,372,40,"Answer with cell citations; edits tracked",null,"e",{rx:8});
  E["6.2"]={
    plain:"<p><b>Claude for Excel</b> is an add-in that works inside your spreadsheet.</p><p>Ask a question and it answers with links to the exact cells it used. It can explain a formula, find errors, and build or change a model, and it shows you what it changed.</p><p>The spreadsheet stays a real spreadsheet, so you can check every number.</p>",
    map:[["A calculator that reads the whole sheet","Claude for Excel"],["Pointing at the mark it used","A cell citation"],["Writing the formula for you","Building formulas in the grid"]],
    breaks:"A calculator never misunderstands the question. Claude can pick the wrong column or range, so follow its cell citations and check the logic.",
    viz:{svg:s.svg(),cap:"The question goes in, Claude works in the grid, and the answer points back to the cells it used."},
    line:"Claude for Excel answers questions about your sheet and shows which cells it used."
  };
})();

/* ---------- 6.3 ---------- */
(function(){
  var s=VZ.scene(400,236,"Claude in a shared channel summarises a thread and drafts a reply, visible to the team");
  ["Asha: deadline moved?","Ben: client wants v2","Chen: who owns QA?","… 40 more messages"].forEach(function(t,i){s.box(14,16+i*40,176,32,t,null,i===3?"n":"b",{rx:8})});
  var c=s.box(214,16,172,56,"@Claude","summarise + draft","a");
  var o=s.box(214,96,172,70,"Summary +\ndrafted reply","seen by the team","e");
  s.path("M192 80 H210",{});s.link(c,o);
  s.text(200,206,"shared room = team rules on what to ask and share","sm");
  E["6.3"]={
    plain:"<p>Claude can join your team's tools, like Slack and Microsoft 365. There it can summarise a long thread, draft a reply, or answer from your team's documents.</p><p>The difference from private chat is that others can see it. So agree as a team what's fine to ask Claude, and what should stay private.</p>",
    map:[["The helper sitting in the class group chat","Claude in Slack or Teams"],["Catching you up on 50 messages","A thread summary"],["The shared notebook","Team documents it can read"]],
    breaks:"A classmate knows which jokes not to repeat to the teacher. Claude follows permissions, not social sense, so the team's norms have to say what's off limits.",
    viz:{svg:s.svg(),cap:"Mention Claude in the thread and its summary or draft lands where everyone can see it."},
    line:"In Slack or Microsoft 365, Claude helps the whole team, so the team sets the rules."
  };
})();

/* ---------- 6.4 ---------- */
var S64=[["A conversation or idea","Chat app","think, write, decide","b"],["Files on your computer","Cowork","delegate file chores","t"],["A code project","Claude Code","build and fix software","a"],["Websites","Claude in Chrome","web errands","g"],["A spreadsheet","Claude for Excel","work inside the grid","e"],["Your team's chat","Slack / M365","shared help","v"],["Your own product","API","software for others","r"]];
function v64(k){
  var s=VZ.scene(400,250,"Route a task to a surface by where the work lives");
  s.text(100,14,"WHERE THE WORK LIVES","sm h");s.text(316,14,"SURFACE","sm h");
  S64.forEach(function(r,i){var on=i===k,y=26+i*32;
    s.box(14,y,190,26,r[0],null,on?r[3]:"n",{rx:6});s.box(246,y,140,26,r[1],null,on?r[3]:"n",{rx:6});
    if(on)s.path("M206 "+(y+13)+" H242",{});});
  return s.svg();
}
E["6.4"]={
  plain:"<p>Claude lives in many places, so the first step is choosing the right one. Ask where the work lives: in a chat, in files, in code, on websites, in a spreadsheet or in your team's chat.</p><p>Then ask whether you're thinking with Claude or handing work over, whether it's a one-off or repeats, and how much damage a mistake could do.</p><p>Big jobs often use several surfaces in a row.</p>",
  map:[["Hammer, scissors, glue","Chat, Cowork, Code, Chrome …"],["Picking the tool by the job","Routing by where the work lives"],["A craft project using several tools","A pipeline across surfaces"]],
  breaks:"Tools in a box don't overlap much. Claude's surfaces do, so two choices can both work; pick the one that touches the work most directly.",
  viz:{cap:"Pick where the work lives and see which surface fits. Composition (several in a row) is common for real jobs."},
  play:{t:"Route a task",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">The work lives in: <select id="s64" class="wbtn"></select></label><div id="v64"></div><div class="vpout" id="o64"></div>';
    var sel=root.querySelector("#s64");S64.forEach(function(r,i){var o=document.createElement("option");o.value=i;o.textContent=r[0];sel.appendChild(o)});
    function draw(){var k=+sel.value;root.querySelector("#v64").innerHTML=v64(k);root.querySelector("#o64").innerHTML="<b>"+S64[k][1]+":</b> "+S64[k][2]+". Then ask: one-off or repeating, and what's the blast radius if it goes wrong?";}
    sel.addEventListener("change",draw);draw();}},
  line:"Pick the Claude that sits where the work already lives."
};
})();
