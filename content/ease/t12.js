/* Pass 2 — Track 12 (Products & Content). The only price used is the
   verified Sonnet 5.5 list price ($2 in / $10 out per million tokens);
   hosting cost in 12.2 is a labelled assumption. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 12.1 ---------- */
(function(){
  var s=VZ.flow([
    {t:"A pain you've seen",s:"ideally from client work",tone:"b"},
    {t:"Narrow it",s:"one buyer, one job",tone:"v"},
    {t:"Ask for money",s:"pre-sell or a deposit",tone:"a"},
    {t:"Enough yeses?",s:"no → change the idea",tone:"r"},
    {t:"Only now: build",s:"the smallest version",tone:"e"}
  ],{cols:2,bh:60,gy:28,stepped:true,aria:"Validate a micro-SaaS idea before building it"});
  E["12.1"]={
    plain:"<p>A <b>micro-SaaS</b> is a small online product (software as a service) that solves one specific problem for one group of people.</p><p>The common mistake is building first. Instead, check that people will pay before you write any code. Ask them, show a simple page, or take a deposit.</p><p>The best ideas often come from a service you've already done for clients several times.</p>",
    map:[["Asking 10 classmates first","Validating demand"],["«Would you pay ₹20?»","Testing the price"],["Baking 100 cupcakes","Building the product"]],
    breaks:"Classmates who say «yes» to be nice still might not buy. Words are weak evidence; a payment or a deposit is the real test.",
    viz:{svg:s.svg(),cap:"Validation comes before building; a «no» at step 4 sends you back to reshape the idea.",
      steps:["Start from a painful problem you've actually seen.","Narrow it to one kind of buyer and one job.","Ask for real money: a pre-sale or a deposit.","Not enough yeses? Change the idea, not the marketing.","Only now build the smallest version that delivers the result."]},
    line:"Check that people will pay before you build anything."
  };
})();

/* ---------- 12.2 ---------- */
function v122(price,calls){
  var perCall=(2000*2+500*10)/1e6,host=0.5,cost=calls*perCall+host,margin=price-cost;
  var s=VZ.scene(400,224,"Unit economics per user per month: price versus API cost plus hosting");
  s.text(200,14,"ONE USER, ONE MONTH","sm h");
  var mx=Math.max(price,cost,1);
  s.text(14,47,"Price","tx b","start");s.bar(100,34,200,26,price/mx,"e");s.text(308,47,"$"+price.toFixed(2),"tx b","start");
  s.text(14,91,"Cost","tx b","start");s.bar(100,78,200,26,cost/mx,"r");s.text(308,91,"$"+cost.toFixed(2),"tx b","start");
  s.box(14,124,372,48,margin>=0?"Margin $"+margin.toFixed(2)+" ("+Math.round(margin/price*100)+"%)":"Loss of $"+(-margin).toFixed(2)+" per user",null,margin>=price*0.6?"e":margin>=0?"g":"r",{rx:8});
  s.text(200,196,calls+" calls × $"+perCall.toFixed(3)+" (Sonnet 5.5, 2k in / 500 out) + $0.50 hosting","sm");
  return s.svg();
}
E["12.2"]={
  plain:"<p>A product is only a business if each customer pays more than they cost you. That is called <b>unit economics</b>.</p><p>For an AI product, the cost is mostly API calls, plus hosting. Heavy users can cost far more than light ones.</p><p>Work out cost per user before you build. If the margin is thin, use the cost tricks from Lesson 9.7, or raise the price to match the value.</p>",
  map:[["Cost to make one cupcake","API + hosting cost per user"],["Selling price","Subscription price"],["Selling more at a loss","Growth that makes losses bigger"]],
  breaks:"Every cupcake costs about the same. AI users don't: one heavy user can use many times more tokens than a light one, so model your heaviest users too.",
  viz:{cap:"Slide the price and how heavily one user uses the product. API cost uses Sonnet 5.5 list prices; the $0.50 hosting figure is an assumption."},
  play:{t:"Does one user make money?",inFig:1,build:function(root){
    root.innerHTML='<label class="sm">Price per month: <b id="p122">$10</b></label><input type="range" id="r122a" min="2" max="40" value="10"><label class="sm">Calls per user per month: <b id="c122">300</b></label><input type="range" id="r122b" min="20" max="3000" step="20" value="300"><div id="v122"></div>';
    var a=root.querySelector("#r122a"),b=root.querySelector("#r122b");
    function draw(){root.querySelector("#p122").textContent="$"+a.value;root.querySelector("#c122").textContent=b.value;root.querySelector("#v122").innerHTML=v122(+a.value,+b.value);}
    a.addEventListener("input",draw);b.addEventListener("input",draw);draw();}},
  line:"Make sure each customer pays more than they cost you before you grow."
};

/* ---------- 12.3 ---------- */
(function(){
  var s=VZ.fan({t:"You",s:"the boss",tone:"a"},[
    {t:"Builder",s:"Claude Code",tone:"b"},{t:"Brain",s:"the Claude API",tone:"v"},{t:"Designer + writer",s:"Claude in chat",tone:"g"},{t:"Tester",s:"evals + checks",tone:"r"}
  ],{w:400,bh:50,gy:12,kw:150,cw:110,merge:{t:"Smallest\nproduct",s:"launch, learn",tone:"e"},aria:"Claude plays many roles in a lean build"});
  E["12.3"]={
    plain:"<p>Build the smallest product that delivers the one result people said they'd pay for. Leave everything else out.</p><p>Claude can play most of the team: Claude Code builds it, the API is its brain, chat helps with design and words, and tests check it. You stay the boss who decides.</p><p>Launch early to the people who said yes, and improve based on how they actually use it.</p>",
    map:[["A small team with many roles","Claude as builder, writer, tester"],["The boss","You, making the decisions"],["A first version of the stall","The minimum product"]],
    breaks:"A real teammate tells you when your idea is bad. Claude tends to go along with your plan, so ask it directly to argue against your choices.",
    viz:{svg:s.svg(),cap:"You decide; Claude fills the roles; the output is the smallest thing worth launching."},
    line:"Build the smallest useful version with Claude as your team, then learn from real users."
  };
})();

/* ---------- 12.4 ---------- */
(function(){
  var s=VZ.scene(400,240,"Three packaged forms of expertise you can sell: skills, plugins and MCP servers");
  var k=[["Skill","your procedure\n(the rule book)","g"],["Plugin","a bundle to install\n(the box)","b"],["MCP server","a tool connection\n(the special dice)","v"]];
  var B=k.map(function(p,i){return s.box(14+i*128,20,116,90,p[0],p[1],p[2])});
  var buy=s.box(110,170,180,56,"Buyers install it","your judgement, reused","e");
  B.forEach(function(b){s.link(b,buy)});
  E["12.4"]={
    plain:"<p>You don't have to build a whole app to sell your expertise. You can package it smaller.</p><p>A <b>Skill</b> holds your procedure. A <b>plugin</b> bundles things for easy install. An <b>MCP server</b> connects Claude to a tool or data source.</p><p>You build it once, and many people can install and use it.</p>",
    map:[["The rule book","A Skill"],["The box it all comes in","A plugin"],["The special dice","An MCP server"],["Selling the game to many families","Many buyers installing it"]],
    breaks:"A board game doesn't change after you sell it. Skills and servers depend on tools and APIs that change, so plan for updates and support.",
    viz:{svg:s.svg(),cap:"Three packages, one idea: encode your judgement once and let it be installed many times."},
    line:"Package what you know into a Skill, plugin or MCP server and sell it many times."
  };
})();

/* ---------- 12.5 ---------- */
(function(){
  var s=VZ.scene(400,230,"Most creators get modest audiences; content compounds slowly into trust and leads");
  s.text(200,14,"HOW AUDIENCES USUALLY SPREAD (SHAPE ONLY)","sm h");
  var h=[150,80,48,30,20,13,9,6];
  h.forEach(function(v,i){s.raw('<rect class="k-'+(i<1?"g":"t")+'" x="'+(30+i*44)+'" y="'+(180-v)+'" width="34" height="'+v+'" rx="4" style="stroke-width:1"/>')});
  s.text(52,196,"a few","sm");s.text(300,196,"most creators","sm");
  s.text(200,220,"plan for the honest middle, not the lucky top","sm h");
  E["12.5"]={
    plain:"<p>Sharing what you know, through posts, videos or guides, builds an audience. That makes selling everything else easier, because people already trust you.</p><p>It works, but it's real work that grows slowly. A few creators get huge audiences; most get modest ones.</p><p>So treat content as a way to earn trust and leads, not as easy passive income.</p>",
    map:[["A stall at a giant fair","Posting content"],["The few stalls with crowds","The rare viral creators"],["Steady regular visitors","A modest, loyal audience that buys"]],
    breaks:"Fair visitors forget a stall by next year. Good content keeps working for years, which is why it compounds if you keep at it.",
    viz:{svg:s.svg(),cap:"The shape, not real data: a tall head and a long, modest tail where most creators live."},
    line:"Content builds trust slowly, so treat it as steady work, not a lottery ticket."
  };
})();

/* ---------- 12.6 ---------- */
(function(){
  var s=VZ.scene(400,256,"What fails versus what works in making money with AI");
  s.text(100,14,"USUALLY FAILS","sm h");s.text(300,14,"USUALLY WORKS","sm h");
  var L6=["Get-rich-quick","Build it and they come","Commodity work","«Passive» income"].map(function(t,i){return s.box(14,28+i*54,160,44,t,null,"r",{rx:8})});
  ["A real problem","People who pay","Checked quality","Honest value"].forEach(function(t,i){var b=s.box(226,28+i*54,160,44,t,null,"e",{rx:8});s.link(L6[i],b,"swap");});
  E["12.6"]={
    plain:"<p>Most «make money with AI» promises fail in predictable ways: get-rich-quick schemes, products nobody asked for, cheap work anyone can do, and the dream of income for no effort.</p><p>What works is plain: solve a real problem for people who pay, check the quality, and be honest about the value. That's what this course trains.</p>",
    map:[["The twenty quiet failures","Common AI money schemes"],["Studying why they failed","Learning the failure patterns"],["The famous project","The rare success the hype shows"]],
    breaks:"School projects fail with little cost. Business failures cost money and time, so the lesson is worth more here.",
    viz:{svg:s.svg(),cap:"Left column: the hype patterns. Right: the boring things that keep paying."},
    line:"Skip the hype; solve real problems for people who pay."
  };
})();
})();
