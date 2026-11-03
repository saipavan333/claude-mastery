/* Pass 2 — Track 2 (Prompting Foundations). Effort levels (low, medium, high,
   xhigh, max) and adaptive thinking as taught and verified in pass 1 (9.2,
   glossary; models overview checked 2026-11-03). No invented numbers. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 2.1 ---------- */
var P21=[["Role","who Claude should be","a"],["Context","background it can't guess","g"],["Task","the one job, as a verb","t"],["Constraints","limits and must-nots","r"],["Format","the shape of the answer","b"],["Examples","one good sample","v"]];
function sk21(on){
  var s=VZ.scene(400,348,"Six parts of a prompt stacked into one message, flowing into the answer");
  s.text(104,14,"YOUR PROMPT","sm h");
  P21.forEach(function(p,i){var lit=on==null||on[i];
    s.box(14,26+i*44,180,38,p[0],null,lit?p[2]:"n",{step:on==null?i:null,cls:lit?"":"off"});
    s.text(206,26+i*44+19,lit?p[1]:"missing","sm","start");});
  s.box(14,306,180,36,"Claude's answer",null,"e");
  s.path("M104 286 V302",{});
  return s.svg();
}
E["2.1"]={
  plain:"<p>A prompt is the message you send Claude. Good prompts usually have the same six parts: a <b>role</b>, some <b>context</b>, the <b>task</b>, any <b>constraints</b>, the <b>format</b> you want, and an <b>example</b>.</p><p>Short questions can skip most of them. But when an answer disappoints, one of the six is almost always missing.</p><p>So you don't guess. You find the missing part, add it, and try again.</p>",
  map:[["Who the class is","Context"],["What the lesson is","Task"],["What «done» looks like","Format (and an example)"],["What to avoid","Constraints"],["«You're covering for the maths teacher»","Role"]],
  breaks:"A substitute teacher can ask the class questions. Claude only knows what is in your message, so anything you leave out it fills with a guess.",
  viz:{svg:sk21(null),cap:"The six parts stack into one message. Step through them to see what each one adds.",
    steps:["Role: tell Claude who to be, such as «a senior tax accountant».","Context: the facts it can't guess, such as who reads this and why.","Task: one clear job, starting with a verb.","Constraints: limits like length, tone and things to avoid.","Format: the exact shape you want back, like a table or three bullets.","Examples: one sample of a good answer. This often helps more than all the rest."]},
  play:{t:"Build a prompt, part by part",build:function(root){
    var on=[0,0,1,0,0,0];
    root.innerHTML='<div class="wrow" id="b21" style="display:flex;flex-wrap:wrap;gap:6px"></div><div id="v21"></div><div class="vpout" id="o21"></div>';
    var bx=root.querySelector("#b21"),miss=["Without a role you get a generic voice.","Without context Claude guesses who it's for.","","Without constraints it may run long or off-tone.","Without a format you'll reshape the answer yourself.","Without an example the style is Claude's guess, not yours."];
    P21.forEach(function(p,i){var b=document.createElement("button");b.className="wbtn";b.textContent=p[0];b.addEventListener("click",function(){if(i===2)return;on[i]=on[i]?0:1;draw()});bx.appendChild(b)});
    function draw(){root.querySelector("#v21").innerHTML=sk21(on);
      [].forEach.call(bx.children,function(b,i){b.style.borderColor=on[i]?"var(--ember)":"";b.style.color=on[i]?"var(--ember2)":""});
      var m=miss.filter(function(x,i){return x&&!on[i]});
      root.querySelector("#o21").innerHTML=m.length?"<b>Likely weak spots:</b> "+m.join(" "):"<b>All six parts present.</b> If the answer still disappoints, change one part at a time and rerun.";}
    draw();}},
  line:"A great prompt says who to be, what you know, what to do, the limits, the shape, and shows one example."
};

/* ---------- 2.2 ---------- */
(function(){
  var s=VZ.scene(400,250,"A vague prompt leads to a generic answer; a clear prompt leads to the exact answer");
  var v=s.box(14,30,170,70,"«Make it better»","vague, an adjective","r"),vg=s.box(216,30,170,70,"Generic answer","Claude guesses","n");
  s.link(v,vg,"guess");
  var c=s.box(14,140,170,92,"«Cut to 150 words,\nfor CFOs, keep the\n3 numbers»","exact, measurable","e"),cg=s.box(216,150,170,70,"The answer\nyou meant","nothing to guess","t");
  s.link(c,cg,"follow");
  s.text(200,124,"same model, different sentence","sm");
  E["2.2"]={
    plain:"<p>Claude does what you say, not what you meant. Vague words like «better» or «short» force it to guess.</p><p>So say exactly what you want. Use numbers instead of adjectives. Say what to do rather than only what not to do. Mention who the answer is for and why.</p><p>A good test: would a smart new colleague, who knows nothing about your project, understand your message?</p>",
    map:[["«Get snacks»","A vague prompt"],["Chips you didn't want","A generic answer"],["«Two packets of salted peanuts, under ₹50»","A precise, measurable instruction"],["The shop near the gate","Context that removes guessing"]],
    breaks:"A friend shares your taste and history. Claude starts each chat knowing nothing about you, so you need even more detail than you'd give a friend.",
    viz:{svg:s.svg(),cap:"The model is the same in both rows. Only the sentence changed, and with it how much Claude had to guess."},
    line:"Say exactly what you want, with numbers, as if briefing a smart stranger."
  };
})();

/* ---------- 2.3 ---------- */
(function(){
  var s=VZ.scene(400,270,"Example pairs teach a pattern that Claude continues for a new input");
  s.text(110,14,"EXAMPLES YOU SHOW","sm h");
  [["Input A","Output A"],["Input B","Output B"]].forEach(function(p,i){var y=26+i*62;var a=s.box(14,y,86,48,p[0],null,"b",{step:i}),b=s.box(124,y,86,48,p[1],null,"g",{step:i});s.link(a,b,null,{step:i});});
  var pat=s.box(250,50,136,64,"Pattern","same shape, tone,\njudgement","v",{step:2});
  s.path("M212 76 H246",{step:2});s.path("M212 112 Q232 100 246 96",{step:2});
  var n=s.box(14,170,110,56,"New input",null,"b",{step:3}),o=s.box(250,170,136,56,"New output","in the same shape","e",{step:3});
  s.link(n,o,"continue",{step:3});s.link(pat,o,null,{step:3,dash:1});
  E["2.3"]={
    plain:"<p>Describing what you want is hard. Showing it is easy. If you give Claude one to five examples of «this input gives this output», it copies the pattern.</p><p>This works because Claude is a pattern-continuing machine. An example <i>is</i> a pattern.</p><p>Vary what the examples say, but keep their shape the same. Leave examples out when you want fresh, original ideas, because Claude will copy them too closely.</p>",
    map:[["The teacher's finished drawing","Your example output"],["Everyone's work looking closer to it","Claude matching format and tone"],["Copying the drawing too closely","Examples leaking into creative work"]],
    breaks:"Students know the example is only a guide. Claude may copy small quirks, like the length or a favourite word, so pick examples you'd be happy to see repeated.",
    viz:{svg:s.svg(),cap:"Pairs of examples become a pattern; a new input comes out in the same shape.",
      steps:["You show the first example: an input and the output you want.","A second example with different content but the same shape.","Claude picks up the pattern: structure, tone and judgement.","For a new input, it continues the pattern and answers in the same shape."]},
    line:"Show Claude one good example and it will copy the pattern."
  };
})();

/* ---------- 2.4 ---------- */
(function(){
  var s=VZ.scene(400,262,"XML tags fence the parts of a prompt and label the parts of the answer");
  s.text(100,14,"PROMPT","sm h");s.text(300,14,"ANSWER","sm h");
  var a=s.box(14,26,172,44,"<contract>","the text to read","g"),b=s.box(14,80,172,44,"<instructions>","what to do with it","b"),c=s.box(14,134,172,44,"<format>","tags you want back","v");
  var r1=s.box(214,40,172,44,"<summary>",null,"t"),r2=s.box(214,96,172,44,"<risks>",null,"r");
  s.path("M188 102 H210",{});s.path("M188 156 Q200 140 210 128",{dash:1});
  var p=s.box(108,204,184,48,"Your code or template","finds each tag","e");
  s.link(r2,p,"parse");
  E["2.4"]={
    plain:"<p>You can tell Claude exactly what shape the answer should take: a table, three bullets, 150 words, or a set of headed sections.</p><p><b>XML tags</b> help with this. They are labels in angle brackets, like <code>&lt;contract&gt;</code> … <code>&lt;/contract&gt;</code>. In your prompt they fence off each part, so Claude never mixes up your instructions with the document. In the answer they label each part, so you or your code can find it.</p>",
    map:[["A form with boxes","An output format"],["«Name: ___»","A labelled section like &lt;summary&gt;"],["A blank page","No format given"]],
    breaks:"A paper form stops you writing outside the box. Tags only ask; Claude almost always follows them, but if the shape must be exact for code, use structured outputs (Lesson 9.5).",
    viz:{svg:s.svg(),cap:"Tags fence the inputs on the left and label the outputs on the right, so a person or a program can pick out each part."},
    line:"Draw the boxes you want filled, and Claude fills them."
  };
})();

/* ---------- 2.5 ---------- */
var LV=["low","medium","high","xhigh","max"];
function think25(k){
  var s=VZ.scene(400,214,"A question goes through a thinking block whose size grows with effort, then to the answer");
  var q=s.box(14,70,92,60,"Question",null,"b");
  var w=60+k*36,t=s.box(130,100-(28+k*8),w,56+k*16,"Thinking","rough paper","v");
  var a=s.box(130+w+28>300?306:130+w+28,70,80,60,"Answer",null,"e");
  s.link(q,t);s.link(t,a);
  s.text(200,196,k==null?"":"effort: "+LV[k],"sm h");
  return s.svg();
}
E["2.5"]={
  plain:"<p>Some questions need working out, like a maths problem with several steps. Claude does better on those if it «thinks» before it answers.</p><p>On today's models this is built in. It's called <b>adaptive thinking</b>: Claude decides how much to think for each question. You steer it with an <b>effort</b> setting, from low to max.</p><p>More effort means better answers on hard problems, but slower and more costly ones. For easy questions, low effort is fine.</p>",
  map:[["Rough paper in a maths test","Thinking tokens Claude writes before its answer"],["Deciding how much working to show","Adaptive thinking"],["The teacher saying «take your time on this one»","The effort setting"]],
  breaks:"You can always skip rough paper for 2 + 3. On Opus 5.5 and Fable 5.1 thinking can't be switched off; you only steer how hard Claude tries.",
  viz:{svg:think25(1),cap:"Before answering, Claude can write private working (thinking). The effort setting steers how much. Drag the slider below to see the trade."},
  play:{t:"Turn the effort dial",build:function(root){
    root.innerHTML='<label class="sm">Effort: <b id="l25">medium</b></label><input type="range" id="r25" min="0" max="4" step="1" value="1"><div id="v25"></div><div class="vpout" id="o25"></div>';
    var r=root.querySelector("#r25"),txt=["Quick and cheap. Good for lookups, rewrites and classification.","A balanced middle. It is the default on Opus 5.5 and Haiku 5.5.","More careful work on multi-step problems. It is the default on Sonnet 5.5 and Fable 5.1.","Very thorough. Worth it for hard reasoning where a mistake is expensive.","The most thinking the model will do. Slowest and costliest; save it for the hardest problems."];
    function draw(){var k=+r.value;root.querySelector("#l25").textContent=LV[k];root.querySelector("#v25").innerHTML=think25(k);
      root.querySelector("#o25").innerHTML="<b>"+LV[k]+":</b> "+txt[k]+" Thinking tokens are billed as output, so more thinking costs more.";}
    r.addEventListener("input",draw);draw();}},
  line:"For hard problems let Claude think first, and turn effort up only when the problem deserves it."
};

/* ---------- 2.6 ---------- */
(function(){
  var s=VZ.scene(400,262,"A system prompt sits above the conversation and shapes every turn");
  var sp=s.box(14,14,372,56,"System prompt = the role card","who Claude is · rules · what good looks like","a");
  ["You: question 1","Claude: answer 1","You: question 2","Claude: answer 2"].forEach(function(t,i){var b=s.box(i%2?96:14,90+i*40,200,32,t,null,i%2?"t":"b",{rx:8});});
  s.path("M320 72 V244",{dash:1});s.text(332,160,"applies\nto every\nturn","sm","start");
  E["2.6"]={
    plain:"<p>A <b>system prompt</b> is a standing instruction. It sits above the whole conversation and shapes every reply, not just the next one.</p><p>It usually says who Claude should be, what rules it must follow and what good work looks like. In the chat app you can open with a role line. In Projects it is the custom instructions. In Claude Code it is the CLAUDE.md file, and in the API it is the <code>system</code> field.</p>",
    map:[["The role card a student gets","The system prompt"],["Playing the king for the whole play","The role lasting every turn"],["The script lines in each scene","Your individual messages"]],
    breaks:"An actor never forgets the role. In a very long chat, early instructions get less attention, so restate key rules or put them in a Project or CLAUDE.md.",
    viz:{svg:s.svg(),cap:"Your messages come and go; the system prompt sits above all of them and frames each answer."},
    line:"The system prompt is the role card Claude keeps for the whole conversation."
  };
})();

/* ---------- 2.7 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Draft",s:"Claude's first try",tone:"b"},
    {t:"Judge it",s:"what's right, wrong?",tone:"g"},
    {t:"Feedback",s:"keep X · change Y\nbecause Z",tone:"a"},
    {t:"Redraft",s:"one change at a time",tone:"t"}
  ],{w:400,h:290,bw:142,bh:62,stepped:true,center:"chat getting\nmuddled? summarise\nand restart",aria:"The iteration loop: draft, judge, feedback, redraft"});
  E["2.7"]={
    plain:"<p>Your first prompt rarely gives the perfect answer, and that's normal. The skill is fixing it fast.</p><p>Tell Claude exactly what to keep, what to change and why. Change one thing at a time so you know what worked.</p><p>If a long chat gets muddled, don't keep patching it. Ask for a summary, start a fresh chat, and paste the summary in.</p>",
    map:[["First sketch","Claude's first draft"],["«Bigger sun, darker trees»","Specific feedback: keep, change, because"],["Redrawing","Asking for a revision"],["Starting on clean paper","Summarise and open a new chat"]],
    breaks:"Paper doesn't get worse the more you erase. A chat does: after many rounds of corrections it carries old, wrong drafts around, so a fresh start often beats a tenth fix.",
    viz:{svg:s.svg(),cap:"Iteration is a loop. Each lap should change one thing for a stated reason.",
      steps:["Claude gives a first draft. Treat it as an opening bid.","Look at it: which parts are right and which are off?","Give precise feedback: keep this, change that, because of this reason.","Claude redrafts. Go round again until it's right, or restart if the chat is muddled."]},
    line:"Treat the first answer as a draft, give exact feedback, and restart when the chat gets messy."
  };
})();
})();
