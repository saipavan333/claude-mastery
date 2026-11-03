/* Pass 2 — Track 1 (How Claude Works): plain opening, everyday picture with a
   part-by-part map, a mechanism diagram, and "Try it" interactives.
   Facts used here come from the pass-1 verified set (models overview + pricing
   pages, checked 2026-11-03): 1M-token window on every current model,
   ~1.8 tokens per English word on the current tokenizer, list prices per
   million tokens. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 1.1 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Read the text\nso far",s:"all tokens so far",tone:"b"},
    {t:"Score every\nnext token",s:"mat 62% · rug 23% …",tone:"a"},
    {t:"Pick one",s:"usually a likely one",tone:"g"},
    {t:"Add it to\nthe text",s:"…then go round again",tone:"t"}
  ],{w:480,h:310,bh:68,stepped:true,center:"one token\nper lap",aria:"The next-token loop: read, score, pick, append, repeat"});
  E["1.1"]={
    plain:"<p>Claude is a computer program that writes by guessing. It reads your words, then guesses the next small piece of text. It adds that piece and guesses again, thousands of times a second.</p><p>It learned to guess well by reading a huge amount of human writing. Then people trained it to be helpful, honest and careful.</p><p>The big idea: Claude does not look answers up. It makes each answer fresh, so it can be brilliant and sometimes wrong in the same sentence.</p>",
    map:[["The friend who read every library book","The model, trained on a huge slice of human writing"],["Making up a new story word by word","Generating one token at a time"],["Picking the word that sounds most right","Choosing from probabilities for the next token"],["A made-up «fact» that sounds right","A hallucination"]],
    breaks:"A friend remembers which book a fact came from. Claude usually can't: it stores patterns, not a list of sources, unless you give it the source.",
    viz:{svg:s.svg(),cap:"The whole engine is one loop. Claude reads everything so far, scores every possible next token, picks one, appends it, and goes round again.",
      steps:["Claude reads every token you sent plus everything it has written so far.","It gives every possible next token a probability. «mat» might get 62%, «rug» 23%.","It picks one. Most of the time a likely one, sometimes a less likely one, which is why two answers to the same prompt differ.","The chosen token is added to the text, and the loop runs again until the answer is finished."]},
    line:"Claude writes by guessing the next word over and over, so it invents answers instead of looking them up."
  };
})();

/* ---------- 1.2 ---------- */
(function(){
  var W=480,s=VZ.scene(W,250,"A context window filling with system prompt, files, chat history, the new message and the answer");
  s.text(W/2,16,"ONE CONTEXT WINDOW · 1,000,000 TOKENS","sm h");
  var segs=[["System\nprompt",0.13,"a"],["Your files",0.28,"g"],["Chat so far",0.27,"t"],["New\nmsg",0.1,"b"],["Answer",0.14,"v"]],x=14,tot=W-28;
  segs.forEach(function(g,i){var w=tot*g[1];s.box(x,36,w-3,70,g[0],null,g[2],{rx:6});x+=w;});
  s.raw('<rect class="k-n" x="'+(14+tot*0.92)+'" y="36" width="'+(tot*0.08-1)+'" height="70" rx="6" style="fill:none;stroke:var(--dim);stroke-dasharray:4 4"/>');
  s.text(14+tot*0.96,71,"free","sm");
  s.box(14,146,140,64,"«The cat sat»","3 words",'n');
  s.box(170,146,140,64,"Cut into tokens","3 words ≈ 5 tokens","b");
  s.box(326,146,140,64,"Each token\ntakes room","and is billed","a");
  s.link({x:14,y:146,w:140,h:64,cx:84,cy:178},{x:170,y:146,w:140,h:64,cx:240,cy:178},"cut up");
  s.link({x:170,y:146,w:140,h:64,cx:240,cy:178},{x:326,y:146,w:140,h:64,cx:396,cy:178});
  s.text(W/2,232,"≈ 1.8 tokens per English word on today's models","sm");
  E["1.2"]={
    plain:"<p>Claude does not read whole words. It cuts text into small pieces called <b>tokens</b>. On today's models one English word is about 1.8 tokens.</p><p>Everything Claude can see at one moment sits in its <b>context window</b>. That means your message, the whole chat, any files, and the answer it is writing.</p><p>The window is big (one million tokens on current models) but it is not endless. When it fills up, old material drops out and answers get worse. That is why long chats seem to «forget».</p>",
    map:[["The desk","The context window"],["Lego bricks","Tokens"],["How many bricks fit on the desk","The token limit (1M on current models)"],["Clearing the desk and starting a fresh page","Starting a new chat with a summary"]],
    breaks:"A real desk keeps what you put on it. When Claude's window is crowded, it can still «see» everything but pays less attention to the middle, so a full desk hurts quality before it overflows.",
    viz:{svg:s.svg(),cap:"Top: every part of the job shares one window. Bottom: text is cut into tokens before it goes in, and each token takes room."},
    play:{t:"Fill the context window",build:function(root){
      root.innerHTML='<label class="sm">Pages of PDF attached: <b id="p12a">40</b></label><input type="range" id="r12a" min="0" max="1500" step="10" value="40">'+
        '<label class="sm">Back-and-forth turns in the chat: <b id="p12b">30</b></label><input type="range" id="r12b" min="0" max="400" step="5" value="30">'+
        '<div id="v12"></div><div class="vpout" id="o12"></div><p class="wnote">Assumptions, shown so you can check them: a page ≈ 500 words, a turn (your message + reply) ≈ 300 words, 1.8 tokens per word, a 3,000-token system prompt, a 2,000-token answer.</p>';
      var a=root.querySelector("#r12a"),b=root.querySelector("#r12b");
      function draw(){var pages=+a.value,turns=+b.value,sys=3000,files=pages*500*1.8,chat=turns*300*1.8,ans=2000,used=sys+files+chat+ans,cap=1e6;
        root.querySelector("#p12a").textContent=pages;root.querySelector("#p12b").textContent=turns;
        var s=VZ.scene(480,104,"window fill"),x=10,tw=460,parts=[[sys,"a"],[files,"g"],[chat,"t"],[ans,"v"]],scale=Math.max(used,cap);
        s.raw('<rect x="10" y="20" width="460" height="40" rx="8" style="fill:var(--bg3);stroke:var(--line2)"/>');
        parts.forEach(function(p){var w=tw*p[0]/scale;if(w>0.5)s.raw('<rect class="k-'+p[1]+'" x="'+x.toFixed(1)+'" y="20" width="'+w.toFixed(1)+'" height="40" style="stroke-width:1"/>');x+=w;});
        var capx=10+tw*cap/scale;s.raw('<path class="vza k-r" d="M'+capx.toFixed(1)+' 12 V68"/>');s.text(Math.min(capx,440),80,"1M limit","sm");
        s.text(12,94,"orange system · gold files · teal chat · violet answer","sm","start");
        root.querySelector("#v12").innerHTML=s.svg();
        var pct=used/cap*100;
        root.querySelector("#o12").innerHTML="Used: <b>"+Math.round(used).toLocaleString()+" tokens</b> ("+pct.toFixed(1)+"% of 1M). "+(used>cap?"<b>Over the limit</b>: this will not fit. Summarise or split the files.":pct>50?"It fits, but a crowded window hides details in the middle. Trim what the task doesn't need.":"Plenty of room.");}
      a.addEventListener("input",draw);b.addEventListener("input",draw);draw();}},
    line:"Claude reads in small pieces called tokens, and only so many fit on its desk at once."
  };
})();

/* ---------- 1.3 ---------- */
(function(){
  var W=480,s=VZ.scene(W,262,"Output price per million tokens for each current model, and the selection rule");
  s.text(W/2,16,"OUTPUT PRICE PER 1M TOKENS (API LIST PRICE)","sm h");
  var rows=[["Haiku 5.5","$0.50*",0.5,"e"],["Sonnet 5.5","$10",10,"t"],["Opus 5.5","$20",20,"a"],["Fable 5.1","$50",50,"v"]];
  rows.forEach(function(r,i){var y=34+i*34;s.text(14,y+11,r[0],"tx b","start");s.bar(110,y,300,22,Math.max(r[2]/50,0.012),r[3]);s.text(420,y+11,r[1],"tx","start");});
  var a=s.box(14,182,140,50,"Start: Sonnet","the workhorse","t"),b=s.box(326,182,140,50,"Escalate","Opus, then Fable","a"),c=s.box(170,182,140,50,"Descend","Haiku for volume","e");
  s.link(a,b,"high stakes or it fails",{bend:-34,ly:-6});s.link(a,c,"simple + many");
  s.text(W/2,252,"* Haiku 5.5 price for prompts up to 100k tokens","sm");
  E["1.3"]={
    plain:"<p>Claude is not one model. It is a family of four, and they differ in brains, speed and price.</p><p><b>Haiku</b> is small, fast and cheap. <b>Sonnet</b> is the everyday workhorse. <b>Opus</b> is the flagship for serious work. <b>Fable</b> is the premium top tier for the hardest long jobs.</p><p>Choosing well matters because the top model can cost 100 times more per word than the cheapest. Most work belongs on Sonnet.</p>",
    map:[["Cycle","Haiku: quick, cheap trips in large numbers"],["Scooter","Sonnet: the everyday ride"],["Bus","Opus: carries the heavy load"],["Chartered coach","Fable: the rare, long, demanding trip"],["Fitting the vehicle to the trip","Matching the model to the task's stakes and volume"]],
    breaks:"Vehicles keep the same speed for every rider. Models don't: you can also turn up a model's thinking effort, so a cheaper model that thinks harder sometimes beats a bigger one.",
    viz:{svg:s.svg(),cap:"Bars are to scale (list prices from the pricing page, checked 3 Nov 2026). The rule below them is the habit: start on Sonnet, escalate on stakes, descend for volume."},
    line:"Pick the smallest Claude that does the job well, and step up only when the job is hard or important."
  };
})();

/* ---------- 1.4 ---------- */
(function(){
  var s=VZ.fan({t:"The same\nClaude models",s:"one family",tone:"a"},[
    {t:"Chat app",s:"talk, write, analyse"},{t:"Cowork",s:"works on your folders"},{t:"Claude Code",s:"your code + terminal"},
    {t:"Chrome",s:"clicks and types on sites"},{t:"Excel",s:"inside the workbook"},{t:"Slack / M365",s:"your team's chat + docs"},{t:"API + Agent SDK",s:"software you build",tone:"b"}
  ],{w:480,bh:46,gy:6,kw:190,cw:130,aria:"One family of models reaching seven surfaces"});
  E["1.4"]={
    plain:"<p>Claude lives in several places. There is a chat app, a coworker mode called Cowork, a coding tool called Claude Code, a Chrome extension, an Excel add-in, Slack and Microsoft 365, and the API for programmers.</p><p>The brain is the same everywhere. What changes is what Claude can touch: your files, your browser, your code, or your team's chat.</p><p>If a task feels clumsy, you are probably in the wrong place.</p>",
    map:[["One person","One family of Claude models"],["Different uniforms","Different surfaces (app, Cowork, Code, Chrome …)"],["The tools a uniform comes with","What a surface can reach: files, browser, terminal, workbook"]],
    breaks:"A person in a new uniform keeps their memories. Claude doesn't carry a chat from the app into Claude Code by itself; each surface starts with what you give it there.",
    viz:{svg:s.svg(),cap:"One brain, many bodies. Each arrow is a surface, and the small text says what that surface lets Claude touch."},
    line:"Claude is one brain that works in many places, and you pick the place by what it needs to touch."
  };
})();

/* ---------- 1.5 ---------- */
(function(){
  var W=480,s=VZ.scene(W,262,"The plan ladder from Free to Enterprise, and the separate API meter");
  var steps=[["Free","$0 · to learn","n"],["Pro","~$17–20/mo","t"],["Max","$100/mo","g"],["Ultra","$200/mo","a"],["Team · Ent.","per seat","v"]];
  var B=steps.map(function(p,i){return s.box(14+i*72,170-i*34,104,48,p[0],p[1],p[2]);});
  for(var i=1;i<B.length;i++)s.path("M"+(B[i-1].x+B[i-1].w-30)+" "+(B[i-1].y-2)+" V"+(B[i].y+B[i].h/2),{});
  s.text(150,232,"climb only when you hit the ceiling of your rung","sm");
  var api=s.box(330,196,136,52,"API meter","pay per token","b");
  s.text(398,182,"separate bill","sm");
  E["1.5"]={
    plain:"<p>You can use Claude for free, or pay monthly for more. The paid plans are Pro, Max, Ultra, and Team or Enterprise for companies.</p><p>Each step up gives you more usage before you hit a limit. Bigger plans also add features, and Max, Ultra and Team include some API credits.</p><p>The API is different. It is a meter for software you build, and you pay for exactly the tokens your app uses.</p>",
    map:[["Free data pack","Free plan with capped usage"],["Monthly pack","Pro"],["Big pack for all-day streaming","Max and Ultra"],["A family or office plan","Team and Enterprise"],["A prepaid meter for one device","The API, billed per token"]],
    breaks:"A data pack counts megabytes. Claude counts tokens, and Cowork or Claude Code burn far more tokens per task than chat, so the same plan runs out faster when Claude does more work.",
    viz:{svg:s.svg(),cap:"Each rung holds more usage than the one below (prices from claude.com/pricing, checked 3 Nov 2026). The API is a separate meter, not a rung."},
    line:"Pay for the smallest plan whose limit you actually hit, and remember the API is a separate meter."
  };
})();

/* ---------- 1.6 ---------- */
(function(){
  function grid(hl){
    var W=480,s=VZ.scene(W,270,"Triage grid: what being wrong costs versus whether you can check it");
    s.text(282,14,"Can you easily check it?","sm h");
    s.text(196,34,"Yes","sm");s.text(368,34,"No","sm");
    s.text(40,96,"Low\ncost","sm");s.text(40,192,"High\ncost","sm");
    s.text(14,144,"If wrong","sm h","start");
    var cells=[["Green","use freely","e",0,0],["Yellow","spot-check key claims","g",1,0],["Red","verify each fact\n(it is quick)","r",0,1],["Red","primary source,\nevery fact","r",1,1]];
    cells.forEach(function(c,i){s.box(112+c[3]*172,50+c[4]*96,164,88,c[0],c[1],c[2],{cls:hl===i?"hl":""});});
    if(hl!=null)s.raw('<rect x="'+(108+cells[hl][3]*172)+'" y="'+(46+cells[hl][4]*96)+'" width="172" height="96" rx="13" style="fill:none;stroke:var(--ink);stroke-width:2.5"/>');
    return s.svg();
  }
  E["1.6"]={
    plain:"<p>Claude sometimes says things that are false, in the same confident voice it uses for true things. This is called a <b>hallucination</b>.</p><p>It happens because Claude builds answers from patterns instead of looking them up. You can't switch it off, but you can make it harmless.</p><p>The trick is to sort every answer by two questions. What would it cost if this were wrong? Can I check it easily? Then you check the risky ones against a real source.</p>",
    map:[["The confident classmate","Claude"],["«Show me where it says that»","Asking for sources and quotes"],["The textbook","A primary source you check yourself"],["Your exam notes","Anything you publish, send or act on"]],
    breaks:"A classmate who is guessing often sounds unsure. Claude's tone gives no warning, so confidence tells you nothing about truth.",
    viz:{svg:VZ.flow([
        {t:"Claude answers",s:"fluent, maybe false",tone:"n"},
        {t:"Triage",s:"cost if wrong?\ncan I check it?",tone:"g"},
        {t:"Force evidence",s:"sources, quotes,\nconfidence",tone:"b"},
        {t:"Verify red facts",s:"against a\nprimary source",tone:"r"},
        {t:"Use it",s:"publish, send, act",tone:"e"}
      ],{cols:2,bh:62,gy:34,stepped:true,aria:"The verification pipeline from answer to use"}).svg(),
      cap:"The habit as a pipeline. Green answers skip straight to use; red ones go through every box.",
      steps:["Claude writes an answer. It reads the same whether it is true or invented.","You sort it in two seconds: what would being wrong cost, and can you check it?","For anything that matters, ask for sources, exact quotes and how sure it is.","Check every load-bearing fact in a red answer against the original source.","Only then does it go into the email, the report or the decision."]},
    play:{t:"Triage an answer",build:function(root){
      root.innerHTML='<label class="sm">What would being wrong cost? <b id="c16a">low</b></label><input type="range" id="r16a" min="0" max="1" step="1" value="0">'+
      '<label class="sm">Can you check it easily? <b id="c16b">yes</b></label><input type="range" id="r16b" min="0" max="1" step="1" value="0"><div id="v16"></div><div class="vpout" id="o16"></div>';
      var a=root.querySelector("#r16a"),b=root.querySelector("#r16b"),msg=["A brainstorm or a draft. Use it freely; mistakes are cheap and easy to see.","A summary of a document you gave it. Spot-check the claims that matter.","Costly but checkable, like a number in a client email. Check each fact you will act on.","A legal, medical or money claim you can't easily check. Verify every load-bearing fact against a primary source, or don't use it."];
      function draw(){var cost=+a.value,chk=+b.value,i=cost*2+chk;root.querySelector("#c16a").textContent=cost?"high":"low";root.querySelector("#c16b").textContent=chk?"no":"yes";
        root.querySelector("#v16").innerHTML=grid(i);root.querySelector("#o16").innerHTML="<b>"+["Green","Yellow","Red","Red"][i]+":</b> "+msg[i];}
      a.addEventListener("input",draw);b.addEventListener("input",draw);draw();}},
    line:"Claude can sound sure and still be wrong, so check anything that would hurt if it were false."
  };
})();
})();
