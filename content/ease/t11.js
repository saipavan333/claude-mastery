/* Pass 2 — Track 11 (Freelancing & Services). Market rates in 11.1 were not
   re-verified in pass 1, so the simple layer uses no market numbers; the one
   worked figure (11.4) is labelled as an example. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 11.1 ---------- */
(function(){
  var s=VZ.scene(400,262,"Four service categories, with income rising as you sell outcomes and trust rather than tasks");
  var q=[["Automation","b","one zap","a workflow\nthat runs"],["Content","g","one post","a monthly\nengine"],["Consulting","v","one call","a trained\nteam"],["Development","a","one script","a working\nproduct"]];
  s.text(200,14,"SAME CATEGORY, DIFFERENT PRICE","sm h");
  q.forEach(function(c,i){var x=14+i*96;s.text(x+44,34,c[0],"tx b");
    var o=s.box(x,48,88,66,c[3],null,c[1]),t=s.box(x,166,88,44,c[2],null,"n");s.link(t,o);});
  s.text(200,232,"top row: outcomes clients trust · bottom row: tasks","sm");
  s.text(200,250,"income rises as you move up","sm h");
  E["11.1"]={
    plain:"<p>Claude skills turn into income through four kinds of service: <b>automation</b>, <b>content and document work</b>, <b>consulting</b> (teaching teams to use AI), and <b>development</b>.</p><p>Pay ranges hugely, from cheap one-off tasks to well-paid monthly contracts. The pattern is simple: people pay more for a result they trust than for hours of work.</p><p>The precise rates are in «Going deeper».</p>",
    map:[["Checking which street has thirsty people","Finding where demand is"],["Counting the other stands","Seeing the competition"],["Choosing lemonade or cookies","Picking one service category"]],
    breaks:"Lemonade demand is easy to see on a hot day. Demand for AI services shifts quickly as tools change, so re-check what buyers pay for every few months.",
    viz:{svg:s.svg(),cap:"Four categories. Inside each, the move from selling tasks to selling outcomes is what raises income."},
    line:"People pay most for a result they trust, so sell outcomes, not hours."
  };
})();

/* ---------- 11.2 ---------- */
(function(){
  var s=VZ.scene(400,232,"A productized offer: I turn X into Y for Z in T for P");
  var parts=[["I turn","X","messy invoices","b"],["into","Y","a clean monthly report","g"],["for","Z","small clinics","v"],["in","T","48 hours","t"],["for","P","a fixed price","a"]];
  parts.forEach(function(p,i){var y=14+i*42;s.text(14,y+17,p[0],"sm","start");s.box(70,y,60,34,p[1],null,p[3],{rx:8});s.text(144,y+17,p[2],"tx","start");});
  s.text(200,224,"one buyer, one outcome, one price: easy to find and say yes to","sm");
  E["11.2"]={
    plain:"<p>«I can do anything with AI» is hard to buy. A <b>productized service</b> is one specific result, for one kind of buyer, at a set price.</p><p>Fill in one sentence: I turn <b>X</b> into <b>Y</b> for <b>Z</b>, in <b>T</b> time, for <b>P</b>. For example: I turn messy invoices into a clean monthly report for small clinics, in 48 hours, for a fixed price.</p><p>Offers like that sell faster and are easier to repeat.</p>",
    map:[["A stall with no sign","«I do everything»"],["«Birthday cards in 24 hours»","A productized offer"],["People remembering the stall","Buyers recognising and referring you"]],
    breaks:"A stall's sign can stay the same for years. Your offer should change when buyers keep asking for something slightly different.",
    viz:{svg:s.svg(),cap:"The five blanks of a productized offer, filled in with an example."},
    line:"Sell one clear result to one kind of buyer at one price."
  };
})();

/* ---------- 11.3 ---------- */
(function(){
  var s=VZ.fan({t:"Your offer",s:"proof-led profile",tone:"a"},[
    {t:"Upwork",s:"volume, first reviews",tone:"b"},{t:"Fiverr",s:"small packaged gigs",tone:"g"},
    {t:"LinkedIn",s:"higher-value buyers",tone:"v"},{t:"Direct outreach",s:"best conversion",tone:"e"}
  ],{w:400,bh:52,gy:12,kw:200,cw:124,sh:74,aria:"Four channels to find clients"});
  E["11.3"]={
    plain:"<p>Clients come from three places. Freelance marketplaces like <b>Upwork</b> and <b>Fiverr</b> give you volume and your first reviews. <b>LinkedIn</b> reaches bigger buyers. <b>Direct outreach</b>, contacting a business yourself, wins the most work and is the most ignored.</p><p>Everywhere, lead with the buyer's problem and proof you've solved it, not a list of your skills.</p>",
    map:[["A busy fair","Upwork"],["A small-craft corner","Fiverr"],["A notice board where people know you","LinkedIn"],["Knocking on a shop's door","Direct outreach"]],
    breaks:"At a fair, people walk past your stall by chance. Online, platforms rank profiles, so reviews and a specific offer matter more than being there.",
    viz:{svg:s.svg(),cap:"One offer, four channels; the bottom one is the most ignored and often the best."},
    line:"Show your offer where buyers look, and lead with their problem."
  };
})();

/* ---------- 11.4 ---------- */
function v114(h){
  var rate=60,price=600,hourly=rate*h;
  var s=VZ.scene(400,214,"As you get faster, hourly pay falls while a project price stays the same");
  s.text(200,14,"EXAMPLE: $60/HOUR vs A $600 PROJECT PRICE","sm h");
  s.text(14,50,"Hourly","tx b","start");s.bar(100,37,200,26,hourly/600,"r");s.text(308,50,"$"+hourly,"tx b","start");
  s.text(14,94,"Project","tx b","start");s.bar(100,81,200,26,1,"e");s.text(308,94,"$"+price,"tx b","start");
  s.text(200,134,"hours to deliver with Claude: "+h,"sm");
  s.text(200,160,"per hour on the project: $"+Math.round(price/h),"tx b");
  s.text(200,192,"charge for the outcome, not the minutes","sm h");
  return s.svg();
}
E["11.4"]={
  plain:"<p>If you charge by the hour, getting faster with Claude means earning less. That's backwards.</p><p>Instead, price the <b>outcome</b>: what the result is worth to the client. Use a fixed project price for a defined job, a monthly retainer for ongoing work, and hourly only when nothing else fits.</p><p>Then every hour Claude saves you becomes your margin.</p>",
  map:[["The birthday card","The deliverable"],["Charging by the minute","Hourly pricing"],["Charging per card","Project pricing"],["A card every month for the same family","A retainer"]],
  breaks:"A card's value is easy to agree on. A business outcome's value needs a conversation about what it saves or earns the client, which is a skill in itself.",
  viz:{cap:"Slide the hours it takes you. The example numbers are for illustration only."},
  play:{t:"Get faster, earn less?",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Hours to deliver: <b id="l114">10</b></label><input type="range" id="r114" min="1" max="10" value="10"><div id="v114"></div>';
    var r=root.querySelector("#r114");function draw(){root.querySelector("#l114").textContent=r.value;root.querySelector("#v114").innerHTML=v114(+r.value);}
    r.addEventListener("input",draw);draw();}},
  line:"Charge for the finished result, so working faster earns you more, not less."
};

/* ---------- 11.5 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Onboard",s:"a template form",tone:"b"},
    {t:"Produce",s:"your skills + templates",tone:"a"},
    {t:"QA",s:"checklist, verify facts",tone:"r"},
    {t:"Deliver",s:"with a short summary",tone:"e"},
    {t:"Improve",s:"fix the template",tone:"g"}
  ],{cols:2,bh:58,gy:28,stepped:true,loop:"each project faster",aria:"A repeatable delivery system"});
  E["11.5"]={
    plain:"<p>Doing great client work once is luck. Doing it every time takes a <b>system</b>.</p><p>Use the same steps for every project: a standard way to start, a production routine built on your templates and skills, a quality checklist, and a clear handover.</p><p>After each project, improve one template. Work gets faster and better, and happy clients send referrals.</p>",
    map:[["The fixed sandwich routine","Your delivery pipeline"],["Checking each sandwich","The QA checklist"],["A good sandwich even on a busy day","Consistent quality under pressure"]],
    breaks:"Sandwich orders are nearly identical. Client projects vary, so the system needs a step for spotting what's unusual about this one.",
    viz:{svg:s.svg(),cap:"Five steps per project; the improve step feeds the next one.",
      steps:["Onboard every client with the same form and kickoff.","Produce with your saved templates, skills and workflows.","Check against a QA list; verify every fact.","Deliver with a short note on what was done.","Fix one template with what you learned."]},
    line:"Use the same steps every time and improve them after each job."
  };
})();

/* ---------- 11.6 ---------- */
(function(){
  var s=VZ.scene(400,240,"Scaling a practice: hours, retainers, a niche, then leverage");
  var st=[["Hours","capped by\nyour time","n"],["Retainers","regular\nincome","b"],["A niche","proof\ncompounds","v"],["Leverage","systems,\npeople","e"]];
  var B=st.map(function(p,i){return s.box(14+i*100,164-i*46,86,68,p[0],p[1],p[2])});
  for(var i=1;i<B.length;i++)s.link(B[i-1],B[i]);
  s.text(14,22,"↗ income less tied to your hours","sm h","start");
  E["11.6"]={
    plain:"<p>A freelancer's income is capped by their hours. To grow past that, add steps one at a time.</p><p>First, <b>retainers</b>: clients who pay every month, which gives you a steady base. Then a <b>niche</b>, one industry where your proof builds on itself. Then <b>leverage</b>: systems, other people, or a product, so income isn't tied to your own time.</p>",
    map:[["One lemonade stand","Solo freelancing"],["Regular customers every weekend","Retainers"],["Three stands run by friends","Subcontractors"],["Your recipe card","Your documented system"]],
    breaks:"Friends running stands just follow the recipe. People you hire need training and checking, so quality control becomes your new job.",
    viz:{svg:s.svg(),cap:"Each step up relies less on your personal hours."},
    line:"Grow from selling hours to steady clients, a niche, and systems that work without you."
  };
})();

/* ---------- 11.7 ---------- */
(function(){
  var s=VZ.scene(400,230,"Client trust stands on three pillars");
  s.box(14,14,372,40,"Client trust",null,"a",{rx:8});
  [["Agreement","scope, deliverables,\npayment","b"],["Data care","what you upload,\nwhere it goes","g"],["Disclosure","what AI did,\nits limits","v"]].forEach(function(p,i){s.box(14+i*128,70,116,96,p[0],p[1],p[2])});
  s.box(14,182,372,38,"Protects both sides when something goes wrong",null,"n",{rx:8});
  E["11.7"]={
    plain:"<p>Clients hand you real business information, so trust is the whole job.</p><p>It rests on three things. A clear written <b>agreement</b>: what you'll deliver, by when, and how you get paid. Careful <b>data handling</b>: know what you upload to AI tools and where it goes. Honest <b>disclosure</b>: tell clients where AI was used and what its limits are.</p>",
    map:[["Agreeing who fixes a puncture","Scope and responsibilities"],["When the bike comes back","Deadlines and deliverables"],["Not lending the bike to others","Not sharing client data"]],
    breaks:"Borrowing a bike is a casual promise. A client contract can be enforced, and data rules may be set by law, so get real templates rather than improvising.",
    viz:{svg:s.svg(),cap:"Three pillars hold up the trust; together they also protect you in a dispute."},
    line:"Write down the deal, guard client data, and be honest about using AI."
  };
})();
})();
