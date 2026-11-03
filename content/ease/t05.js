/* Pass 2 — Track 5 (Cowork). Mode names (Manual / Auto / Skip) and features
   are as taught in the lessons (pass-1 verified). */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 5.1 ---------- */
(function(){
  var s=VZ.scene(400,250,"Chat gives advice for you to act on; Cowork plans and does the work itself");
  s.text(100,14,"CHAT","sm h");s.text(300,14,"COWORK","sm h");
  var a1=s.box(14,28,172,48,"You ask",null,"b"),a2=s.box(14,98,172,48,"Claude advises",null,"t"),a3=s.box(14,168,172,56,"You do the work","copy, paste, save","r");
  s.link(a1,a2);s.link(a2,a3);
  var b1=s.box(214,28,172,48,"You give an outcome",null,"b"),b2=s.box(214,98,172,48,"Claude plans + acts","files, docs, web","a"),b3=s.box(214,168,172,56,"Finished work","you review it","e");
  s.link(b1,b2);s.link(b2,b3);
  E["5.1"]={
    plain:"<p>In a normal chat, Claude gives advice and you do the work. <b>Cowork</b> flips that. You describe the result you want, and Claude plans the steps and does them: it works with your files, writes documents and researches.</p><p>The work keeps running on Anthropic's servers even if you close your laptop. Your job changes from doing to managing: give a clear brief, then check the result.</p>",
    map:[["A friend giving advice on the phone","Chat"],["A friend who comes over and tidies with you","Cowork"],["Saying which room to tidy","The outcome you describe"],["Checking the room after","Reviewing the finished work"]],
    breaks:"A friend in your room can see what matters to you. Cowork only reaches the folders and tools you grant, and it only knows your standards if you write them down.",
    viz:{svg:s.svg(),cap:"Same start, different finish: in chat the last box is your work; in Cowork it's your review."},
    line:"Chat tells you what to do; Cowork does it and hands you the result to check."
  };
})();

/* ---------- 5.2 ---------- */
var M52=[["Manual","you approve every action","b"],["Auto","runs, with safety checks","g"],["Skip","no checks at all","r"]];
function v52(k){
  var s=VZ.scene(400,236,"Actions pass through a gate that depends on the permission mode");
  var c=s.box(14,24,110,70,"Claude's\nnext action",null,"a");
  var g=s.box(150,24,110,70,["You approve","Safety check","No gate"][k],["each step","checks run first","straight through"][k],M52[k][2]);
  var f=s.box(286,24,100,70,"Your folder","only the ones\nyou granted","t");
  s.link(c,g);s.link(g,f,null,{dash:k===2?1:0});
  s.text(200,114,"MODE: "+M52[k][0].toUpperCase()+" · "+M52[k][1],"sm h");
  var u=["first runs, anything you can't undo","trusted, reversible tasks","throwaway copies only"];
  s.box(14,128,372,44,"Use it for: "+u[k],null,"n",{rx:8});
  s.text(200,200,"Outside the granted folders, nothing is reachable in any mode.","sm");
  return s.svg();
}
E["5.2"]={
  plain:"<p>Before Cowork starts, you decide two things. First, which folders it may use. It can't touch anything else.</p><p>Second, the <b>permission mode</b>. <b>Manual</b> means you approve every action. <b>Auto</b> means it works on its own, with safety checks. <b>Skip</b> means no checks at all.</p><p>Match the mode to how easy the work is to undo. Then watch its plan and progress, and step in if it drifts.</p>",
  map:[["The cupboards you say it may open","The folders you grant"],["«Ask me before you throw anything away»","Manual mode"],["«Go ahead, with safety checks on»","Auto mode"],["«Do whatever you like»","Skip mode"]],
  breaks:"A helper in your house can wander into other rooms. Cowork can't reach folders you didn't grant, but anything inside a granted folder is fair game, so grant narrowly.",
  viz:{cap:"Slide through the three modes and watch the gate change. The folder fence stays the same in every mode."},
  play:{t:"Pick a permission mode",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Mode: <b id="l52">Manual</b></label><input type="range" id="r52" min="0" max="2" step="1" value="0"><div id="v52"></div>';
    var r=root.querySelector("#r52");function draw(){var k=+r.value;root.querySelector("#l52").textContent=M52[k][0];root.querySelector("#v52").innerHTML=v52(k);}
    r.addEventListener("input",draw);draw();}},
  line:"Show Cowork which folders it may use, and choose how often it must ask before acting."
};

/* ---------- 5.3 ---------- */
(function(){
  var s=VZ.scene(400,266,"Three folder-scale patterns: extract, transform, organise");
  [["EXTRACT","500 receipts","one table","b","g"],["TRANSFORM","every file","new format","t","v"],["ORGANISE","messy folder","named system","a","e"]].forEach(function(p,i){
    var y=18+i*80;s.text(14,y+8,p[0],"sm h","start");
    var a=s.box(14,y+18,150,48,p[1],null,p[3]),b=s.box(236,y+18,150,48,p[2],null,p[4]);s.link(a,b,"Cowork");});
  s.text(200,258,"each run: a contract, a quarantine for odd files, a receipt","sm");
  E["5.3"]={
    plain:"<p>Most useful Cowork jobs are one of three kinds.</p><p><b>Extract</b>: pull the same facts out of many files into one table, like amounts from 500 receipts. <b>Transform</b>: turn every file into a new format. <b>Organise</b>: sort a messy folder into a clear system.</p><p>For each one, say exactly what you want, put odd files aside instead of guessing, and ask for a report of what it did.</p>",
    map:[["The messy drawer of receipts","A folder of files"],["Sorting into monthly envelopes","Organise"],["The list of totals","Extract into one table"],["A «can't read this one» pile","The quarantine folder"],["Checking a few at random","Spot-checking the receipt"]],
    breaks:"You'd notice a smudged receipt. Cowork might read a smudged number wrongly and carry on, which is why the quarantine and random spot checks matter.",
    viz:{svg:s.svg(),cap:"Three shapes cover most file work. The footer is the safety habit for all three."},
    line:"Cowork can pull facts out, change formats, or tidy folders, and you spot-check its work."
  };
})();

/* ---------- 5.4 ---------- */
(function(){
  var s=VZ.fan({t:"Your brief",s:"audience, structure,\nsources",tone:"a"},[
    {t:"Word doc",s:"real headings, styles",tone:"b"},{t:"Excel sheet",s:"live formulas",tone:"e"},{t:"PowerPoint deck",s:"argument first",tone:"v"}
  ],{w:400,bh:52,gy:14,kw:150,cw:124,sh:76,merge:{t:"You sign off",s:"check, then send",tone:"g"},aria:"One brief produces a document, a sheet and a deck, which you sign off"});
  E["5.4"]={
    plain:"<p>Cowork can make real office files: Word documents with proper headings, Excel sheets with working formulas, and PowerPoint decks.</p><p>The quality depends on your brief. Say who it's for, how it should be structured, and which sources to use.</p><p>Then you check it before it goes anywhere. Ask for formulas, not typed-in numbers, so the sheet still works when the data changes.</p>",
    map:[["The teacher's rough notes","Your brief and sources"],["The class monitor","Cowork"],["Handout, marks sheet, slide show","Doc, spreadsheet, deck"],["The teacher checking before parents' day","Your sign-off"]],
    breaks:"A monitor copies the teacher's numbers. Cowork may fill a gap with something plausible, so check every number against the source.",
    viz:{svg:s.svg(),cap:"One brief, three real office files, one sign-off step before anything leaves your hands."},
    line:"Give Cowork a clear brief and it makes real documents, sheets and slides for you to check."
  };
})();

/* ---------- 5.5 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Schedule fires",s:"Monday 08:00",tone:"b"},
    {t:"Task runs",s:"safe permissions",tone:"a"},
    {t:"Receipt",s:"what it did, what\nit set aside",tone:"g"},
    {t:"You review",s:"a quick weekly look",tone:"e"}
  ],{w:400,h:290,bw:144,bh:64,stepped:true,center:"next week,\nsame again",aria:"A scheduled task loop"});
  E["5.5"]={
    plain:"<p>Once a Cowork task works well, you can put it on a <b>schedule</b>. It then runs by itself, like a weekly report every Monday at 8.</p><p>Because nobody is watching, be stricter. Give it the safest permissions, have it set odd cases aside instead of guessing, and ask it to leave a short report of what it did.</p><p>Then glance at those reports regularly.</p>",
    map:[["The alarm clock","The schedule"],["Doing the job when it rings","The task running"],["The note left on your desk","The run receipt"]],
    breaks:"An alarm clock does the same thing every time. A scheduled task meets new files each week, so it can meet a case it was never tested on. That's why it needs receipts.",
    viz:{svg:s.svg(),cap:"Scheduled work is a loop you don't watch, so the receipt and review steps carry the safety.",
      steps:["The schedule fires at the time you set.","The task runs with conservative permissions.","It leaves a receipt: what it did and what it set aside.","You review the receipt; then the loop waits for next time."]},
    line:"Put proven tasks on a timer, and read the note they leave each time."
  };
})();

/* ---------- 5.6 ---------- */
function v56(n){
  var kids=[];for(var i=0;i<n;i++)kids.push({t:"Sub-agent "+(i+1),s:n>4?null:["research A","research B","draft part 1","draft part 2","check facts","format"][i],tone:"t"});
  return VZ.fan({t:"Lead agent",s:"splits the job",tone:"a"},kids,{w:400,h:300,bh:Math.min(48,(300-28-(n-1)*12)/n),gy:12,kw:120,cw:100,merge:{t:"Lead merges",s:"one result",tone:"g"},aria:"A lead agent fans a job out to sub-agents and merges the results"}).svg();
}
E["5.6"]={
  plain:"<p>As you use Cowork more, organise it. A <b>Project</b> gives a stream of work its own files and standing instructions. Written house rules save you repeating yourself.</p><p>For big jobs, Cowork can use <b>sub-agents</b>. These are helpers that each take one part of the job, work separately, and hand back results. The main agent then joins them together.</p>",
  map:[["The group project","A big Cowork task"],["The kid who hands out roles","The lead agent"],["Each teammate with one job","A sub-agent"],["Putting the poster together","The lead merging results"]],
  breaks:"Teammates chat while they work. Sub-agents usually don't see each other's work, so split the job into parts that don't depend on each other.",
  viz:{cap:"Slide the number of sub-agents. Each works on its own part with a fresh, focused context; the lead joins the pieces."},
  play:{t:"Fan out a big job",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Sub-agents: <b id="l56">3</b></label><input type="range" id="r56" min="1" max="6" step="1" value="3"><div id="v56"></div>';
    var r=root.querySelector("#r56");function draw(){root.querySelector("#l56").textContent=r.value;root.querySelector("#v56").innerHTML=v56(+r.value);}
    r.addEventListener("input",draw);draw();}},
  line:"Give big jobs to a team of helpers, each doing one part, and let the lead put it together."
};
})();
