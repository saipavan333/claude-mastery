/* Pass 2 — Track 3 (Advanced Prompting). Prefill status (400 on current
   models) follows the pass-1 verified fix (Opus 5.5 migration guide). */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 3.1 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Research",s:"find the facts",tone:"b"},
    {t:"Check",s:"you review the facts",tone:"g"},
    {t:"Outline",s:"facts → structure",tone:"t"},
    {t:"Draft",s:"structure → prose",tone:"a"},
    {t:"Critic",s:"fresh eyes, find flaws",tone:"r"},
    {t:"Final",s:"fix and ship",tone:"e"}
  ],{cols:2,bh:58,gy:30,stepped:true,aria:"A prompt chain: each step's output feeds the next"});
  E["3.1"]={
    plain:"<p>If you ask Claude for five things in one message, you usually get five average things. <b>Prompt chaining</b> splits the job into steps.</p><p>Each step is its own prompt that does one thing well. Its answer becomes the input to the next step.</p><p>Between steps you can check the work, so mistakes get caught early instead of spreading through everything.</p>",
    map:[["Wash rice, fry onions, cook meat, layer, steam","Separate prompts, one job each"],["Fried onions going into the next pot","One step's output becoming the next step's input"],["Tasting before you layer","A checkpoint where you review"]],
    breaks:"In a kitchen, a bad onion is obvious. In a chain, a wrong fact in step 1 can look fine and quietly spoil every later step, so put a checkpoint right after the facts.",
    viz:{svg:s.svg(),cap:"A typical chain. Each box is a separate prompt; arrows carry its output to the next. The check after research is the most valuable stop.",
      steps:["Step 1 gathers the facts and nothing else.","You (or a prompt) check the facts before anything is built on them.","Step 2 turns facts into an outline.","Step 3 writes prose from the outline.","Step 4 is a critic in a fresh chat that only hunts for flaws.","The last step fixes what the critic found."]},
    line:"Break a big job into small prompts, and pass each answer to the next one."
  };
})();

/* ---------- 3.2 ---------- */
function lc32(bottom){
  var s=VZ.scene(400,262,"Placement in a long prompt: documents first, question last");
  s.text(200,14,bottom?"GOOD: DOCUMENTS FIRST, QUESTION LAST":"RISKY: QUESTION FIRST, THEN 300 PAGES","sm h");
  var y=28;
  function q(){return s.box(60,y,280,40,"Your question + rules",null,"a");}
  if(!bottom){q();y+=48;}
  ["<doc 1> contract","<doc 2> emails","<doc 3> invoices"].forEach(function(d,i){s.box(60,y,280,40,d,null,"g");y+=46;});
  if(bottom){var a=s.box(60,y,280,40,"Question last: quote, then answer",null,"a");y+=48;}
  else{s.box(60,y,280,40,"(question is now far away)",null,"n");y+=48;}
  s.text(200,y+8,bottom?"the question sits right before the answer":"the rules are a long way back","sm");
  return s.svg();
}
E["3.2"]={
  plain:"<p>Claude can read about a million tokens at once, which is roughly several long books.</p><p>Big inputs still need care. Put the documents at the top and your question at the bottom. Wrap each document in a labelled tag. Ask Claude to quote the exact lines it relies on before it answers.</p><p>These habits make it far less likely that a detail on page 300 gets missed or invented.</p>",
  map:[["The book on the table","Documents placed first"],["Sticky note on top","The question placed last"],["Chapter tabs","Labelled tags like &lt;doc 1&gt;"],["Pointing at the sentence","Quoting before concluding"]],
  breaks:"You can flip back to a page any time. Claude reads everything at once and pays uneven attention, so a buried fact can be missed even though it is technically «in view».",
  viz:{svg:lc32(true),cap:"Same documents, same question; only the order changed. Use the button to compare."},
  play:{t:"Move the question",inFig:1,build:function(root){
    var b=1;root.innerHTML='<button class="wbtn" id="b32">Put the question first</button><div id="v32"></div><div class="vpout" id="o32"></div>';
    function draw(){root.querySelector("#v32").innerHTML=lc32(b);root.querySelector("#b32").textContent=b?"Put the question first":"Put the question last";
      root.querySelector("#o32").innerHTML=b?"<b>Recommended:</b> long material on top, question and rules at the bottom, right before Claude starts writing.":"<b>Risky:</b> the instructions are far from where Claude starts writing, so they can get less attention.";}
    root.querySelector("#b32").addEventListener("click",function(){b=b?0:1;draw()});draw();}},
  line:"With a huge document, put it first, ask last, and make Claude quote what it uses."
};

/* ---------- 3.3 ---------- */
(function(){
  var s=VZ.scene(400,258,"Shaping the start of an answer with instructions or structured outputs, not prefill");
  var a=s.box(14,24,170,62,"«Begin directly\nwith the table»","an instruction","b"),b=s.box(216,24,170,62,"Answer starts\nwhere you said","no preamble","t");
  s.link(a,b);
  var c=s.box(14,112,170,62,"JSON schema","structured outputs","v"),d=s.box(216,112,170,62,"Valid JSON","your code parses it","e");
  s.link(c,d);
  var p=s.box(14,196,170,50,"API prefill","old trick","r"),x=s.box(216,196,170,50,"400 error","on current models","r");
  s.link(p,x,null,{dash:1});
  E["3.3"]={
    plain:"<p>The first words of an answer steer everything after them. So it pays to control how Claude's answer starts.</p><p>In chat, just say it: «Begin directly with the table.» When a program needs an exact shape, like JSON, use <b>structured outputs</b> on the API: you give a schema and the answer must match it.</p><p>An older trick was to «prefill», writing the first words of Claude's reply yourself. Current models reject that on the API with an error.</p>",
    map:[["A fill-in-the-blank worksheet","An extraction contract or schema"],["«Start your answer with: The result is»","An instruction about how to begin"],["Boxes on the sheet","Required fields in the output"]],
    breaks:"A worksheet can't stop a student leaving a box empty. Claude can also refuse or run out of room, so code should check why it stopped before trusting the shape.",
    viz:{svg:s.svg(),cap:"Two ways that work today (top) and the old prefill trick that current models reject (bottom)."},
    line:"Tell Claude exactly how to start and what boxes to fill, and use a schema when a program reads the answer."
  };
})();

/* ---------- 3.4 ---------- */
(function(){
  var s=VZ.scene(400,286,"Three layers of defence against hallucination, from prompt to verification");
  var L=[["Layer 1 · shrink the surface","answer only from the supplied text","b"],["Layer 2 · make doubt speakable","«say I don't know» · cite · confidence","g"],["Layer 3 · verify adversarially","a fresh chat hunts for errors","r"]];
  var B=L.map(function(l,i){return s.box(14,14+i*76,372,60,l[0],l[1],l[2],{step:i});});
  s.link(B[0],B[1],null,{step:1});s.link(B[1],B[2],null,{step:2});
  s.box(120,246,160,32,"Safer answer",null,"e",{step:3,rx:8});s.path("M200 236 V242",{step:3});
  E["3.4"]={
    plain:"<p>You can't stop hallucinations completely, but you can build prompts that make them rare and easy to spot.</p><p>Do it in layers. First, tell Claude to answer only from the text you supplied. Second, give it permission to say «I don't know» and ask it to cite where each claim came from. Third, have a fresh chat check the answer for mistakes.</p><p>Use more layers when the stakes are higher.</p>",
    map:[["Showing your sources","Citations to the supplied text"],["Double-checking measurements","A fresh-context checker"],["«We are not sure»","Explicit permission to say I don't know"]],
    breaks:"A science fair judge is a different person. A Claude checker shares the same blind spots as the writer, so for high stakes the final check should still be a human against the source.",
    viz:{svg:s.svg(),cap:"Each layer catches what the one above misses. Step through them.",
      steps:["Shrink the space for invention: answer only from these documents.","Make doubt easy to say: allow «I don't know», demand a citation and a confidence label.","Check in a fresh chat whose only job is to find errors.","The result is an answer whose weak spots are visible."]},
    line:"Make Claude stick to your sources, admit doubt, and get checked by fresh eyes."
  };
})();

/* ---------- 3.5 ---------- */
(function(){
  var s=VZ.scene(400,238,"A template with slots is filled with values to make a ready prompt");
  var t=s.box(14,18,200,96,"Template","«Summarise {doc} for\n{audience} in {n} bullets»","g");
  var v=s.box(14,140,200,80,"This week's values","doc = Q3 report\naudience = board · n = 5","b");
  var p=s.box(250,70,136,90,"Ready prompt",null,"a");
  s.link(t,p,"fill");s.link(v,p);
  s.text(318,190,"run it,\nsave what wins","sm");
  E["3.5"]={
    plain:"<p>When a prompt works well, don't throw it away. Turn it into a <b>template</b>.</p><p>A template is a saved prompt with blanks, like <code>{audience}</code> or <code>{document}</code>. Next time you only fill in the blanks.</p><p>Keep a small library of your best ones. When a template fails, fix the template itself, so every future use gets the fix.</p>",
    map:[["The invitation layout","The fixed wording of the template"],["Name, date and place","The variable slots"],["A drawer of good invitations","Your template library"]],
    breaks:"An invitation never needs updating. Templates do: models change, and a template that won last year should be re-tested now and then.",
    viz:{svg:s.svg(),cap:"The craft is frozen in the template; only the slot values change each time."},
    line:"Save your best prompts with blanks, and just fill the blanks next time."
  };
})();

/* ---------- 3.6 ---------- */
var R36={v1:[1,1,0,1,1,1,0,1,1,0,1,1,1,0,1],v2:[1,1,1,1,0,1,1,1,1,1,1,0,1,1,1]};
function ev36(v){
  var s=VZ.scene(400,190,"Fifteen test cases, pass or fail, for two prompt versions");
  s.text(200,14,"15 REAL TEST INPUTS · PROMPT "+v.toUpperCase(),"sm h");
  R36[v].forEach(function(ok,i){var x=14+(i%8)*47,y=30+Math.floor(i/8)*58;var reg=v==="v2"&&R36.v1[i]&&!ok;
    s.box(x,y,42,46,ok?"✓":"✗","#"+(i+1),ok?"e":(reg?"r":"n"));});
  var p=R36[v].reduce(function(a,b){return a+b},0);
  s.text(200,166,"passed "+p+" of 15"+(v==="v2"?" · red = worked in v1, broke in v2":""),"sm");
  return s.svg();
}
E["3.6"]={
  plain:"<p>When you change a prompt, how do you know it got better? Trying it once proves very little.</p><p>An <b>eval</b> is a small, fixed set of real test inputs, each with a note on what a good answer looks like. Run every version of your prompt on the same set and compare.</p><p>Look at each item, not just the total. A higher score can hide things that used to work and now break.</p>",
  map:[["The practice test","The eval set"],["The answer key","Written expectations for each input"],["Checking your study method","Comparing prompt versions on the same set"]],
  breaks:"A practice test has one right answer per question. Many prompt outputs have several good answers, so a grader (often Claude with a strict rubric) has to judge them. That grader has biases of its own: it tends to favour longer answers, the answer it reads first, and its own style. Check a sample of its grades by hand.",
  viz:{svg:ev36("v1"),cap:"One square per test input. Switch versions: the total goes up, but look at which squares turned red. (The pass/fail pattern is an illustration.)"},
  play:{t:"Compare two prompt versions",inFig:1,build:function(root){
    var v="v2";root.innerHTML='<button class="wbtn" id="b36">Show v1</button><div id="v36"></div><div class="vpout" id="o36"></div>';
    function draw(){root.querySelector("#v36").innerHTML=ev36(v);root.querySelector("#b36").textContent=v==="v2"?"Show v1":"Show v2";
      root.querySelector("#o36").innerHTML=v==="v2"?"<b>v2 passes 13, up from 11.</b> But items 5 and 12 broke. Read those two before you ship v2.":"<b>v1 passes 11 of 15.</b> This is your baseline.";}
    root.querySelector("#b36").addEventListener("click",function(){v=v==="v2"?"v1":"v2";draw()});draw();}},
  line:"Test every prompt change on the same set of real examples, and look at each one."
};

/* ---------- 3.7 ---------- */
(function(){
  var s=VZ.fan({t:"Your task",s:"what went wrong?",tone:"a"},[
    {t:"Clarity",s:"vague? state it exactly",tone:"t"},{t:"Structure",s:"messy? examples, tags",tone:"b"},
    {t:"Reasoning",s:"wrong logic? think, chain",tone:"v"},{t:"Truth",s:"invented? ground, cite",tone:"r"},{t:"Iteration",s:"close? feedback, template",tone:"g"}
  ],{w:400,bh:46,gy:10,kw:220,cw:120,aria:"Five families of prompt patterns, chosen by what went wrong"});
  E["3.7"]={
    plain:"<p>This lesson collects 25 prompts that work, grouped into five families: clarity, structure, reasoning, truth and iteration.</p><p>You don't memorise them. When an answer disappoints, ask what went wrong, open the matching family, and copy the pattern.</p>",
    map:[["The recipe book","The pattern library"],["The page for dal","One named pattern"],["Sections: starters, mains, sweets","The five families"]],
    breaks:"A recipe gives the same dish every time. A prompt pattern still needs your details filled in, and results vary with the task.",
    viz:{svg:s.svg(),cap:"Pick the family by the symptom, then raid that page of the library."},
    line:"When a prompt fails, name the problem and grab the pattern that fixes it."
  };
})();
})();
