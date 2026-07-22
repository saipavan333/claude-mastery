/* =====================================================================
   CLAUDE MASTERY — app.js
   Single-page engine: router, sidebar, Ember Loom hero, lesson renderer,
   quiz engine, widgets, glossary tooltips, cheatsheets, interview bank,
   flashcards (Leitner), progress, search palette, read-aloud.
   All state in localStorage under "cm:".
   ===================================================================== */
(function(){
"use strict";
/* ---------- helpers ---------- */
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function LSget(k,d){try{var v=localStorage.getItem("cm:"+k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function LSset(k,v){try{localStorage.setItem("cm:"+k,JSON.stringify(v))}catch(e){}}
var TRACKS=window.TRACKS||[], LESSONS=window.LESSONS||{}, DIAGRAMS=window.DIAGRAMS||{},
    WIDGETS=window.WIDGETS||{}, GLOSSARY=window.GLOSSARY||[], CHEATSHEETS=window.CHEATSHEETS||[],
    INTERVIEW=window.INTERVIEW||[];
var FLAT=[]; TRACKS.forEach(function(t){t.lessons.forEach(function(l){FLAT.push({tid:t.id,tn:t.n,ttitle:t.title,phase:t.phase,level:t.level,id:l.id,title:l.title,min:l.min})})});
function lessonIndex(id){for(var i=0;i<FLAT.length;i++)if(FLAT[i].id===id)return i;return -1}
function doneSet(){return LSget("done",{})}
function isDone(id){return !!doneSet()[id]}
function trackOf(id){return TRACKS.find(function(t){return t.lessons.some(function(l){return l.id===id})})}
function pct(n,d){return d?Math.round(100*n/d):0}
function trackDone(t){var d=doneSet(),c=0;t.lessons.forEach(function(l){if(d[l.id])c++});return c}
function totalDone(){var d=doneSet(),c=0;FLAT.forEach(function(l){if(d[l.id])c++});return c}
function todayStr(){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function logStudyDay(){var days=LSget("days",[]);var t=todayStr();if(days.indexOf(t)<0){days.push(t);LSset("days",days)}}
function streak(){var days=LSget("days",[]);if(!days.length)return 0;var set={},i;days.forEach(function(d){set[d]=1});
  var n=0,cur=new Date();if(!set[todayStr()]){cur.setDate(cur.getDate()-1)}
  for(i=0;i<3650;i++){var k=cur.getFullYear()+"-"+String(cur.getMonth()+1).padStart(2,"0")+"-"+String(cur.getDate()).padStart(2,"0");
    if(set[k]){n++;cur.setDate(cur.getDate()-1)}else break}
  return n}

/* ---------- sidebar ---------- */
function renderSide(){
  var d=doneSet();
  var h='<div class="brand"><div class="mark">C</div><div><b>Claude Mastery</b><small>Zero → Operator</small></div></div>';
  h+='<div class="chips">'+
     '<a class="chip" href="#home">⌂ Home</a>'+
     '<a class="chip" href="#start">▶ Start here</a>'+
     '<a class="chip" href="#labs">🔬 Labs</a>'+
     '<a class="chip" href="#progress">📈 Progress</a>'+
     '<a class="chip" href="#glossary">📖 Glossary</a>'+
     '<a class="chip" href="#cheats">⚡ Cheat sheets</a>'+
     '<a class="chip" href="#interview">🎤 Interview</a>'+
     '<a class="chip" href="#cards">🃏 Flashcards</a></div>';
  var curPhase="";
  TRACKS.forEach(function(t){
    if(t.phase!==curPhase){curPhase=t.phase;
      var ph=(window.COURSE.phases||[]).find(function(p){return p.id===curPhase});
      h+='<div class="side-h">Phase '+curPhase+' · '+esc(ph?ph.name:"")+'</div>';}
    var c=trackDone(t),tot=t.lessons.length;
    h+='<a class="tlink" data-t="'+t.id+'" href="#track/'+t.id+'"><span class="ico">'+t.icon+'</span>'+
       '<span class="tt"><b>'+t.n+'. '+esc(t.title)+'</b>'+
       '<span class="tbar"><i style="width:'+pct(c,tot)+'%"></i></span></span>'+
       '<span class="phase-tag">'+c+'/'+tot+'</span></a>';
  });
  h+='<div class="side-h">Built with love · v'+esc(window.COURSE.version)+'</div>';
  $("#side").innerHTML=h;
}

/* ---------- Ember Loom hero canvas (self-healing) ---------- */
function emberLoom(canvas){
  if(!canvas) return;
  var ctx=canvas.getContext("2d"),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2);
  var parts=[],threads=[],mouse={x:-9999,y:-9999},raf=null,running=false,t0=0;
  var COLS=["#ff8a54","#ffb454","#ffd24d","#ff9d6b","#4fd6b5","#b79cff"];
  function measure(){
    var r=canvas.getBoundingClientRect();
    if(r.width<2||r.height<2)return false;
    var w=Math.round(r.width*dpr),hh=Math.round(r.height*dpr);
    if(w!==W||hh!==H){W=w;H=hh;canvas.width=W;canvas.height=H;init()}
    return true;
  }
  function init(){
    threads=[];parts=[];
    var n=7;
    for(var i=0;i<n;i++){
      threads.push({cy:H*(0.30+0.42*i/(n-1)),A:H*(0.055+0.05*Math.sin(i*2.1)),
        k:(2.2+0.7*(i%3))*Math.PI*2/W,ph:i*1.3,sp:0.00022+0.00007*(i%4),col:COLS[i%COLS.length]});
    }
    var pn=Math.round(Math.min(150,Math.max(60,W/14)));
    for(var j=0;j<pn;j++){
      parts.push({th:j%threads.length,x:Math.random()*W,v:(0.6+Math.random()*1.1)*dpr,
        r:(0.9+Math.random()*1.7)*dpr,tw:Math.random()*Math.PI*2});
    }
  }
  function yOf(th,x,t){return th.cy+th.A*Math.sin(th.k*x+th.ph+t*th.sp*1000)}
  function frame(ts){
    raf=requestAnimationFrame(frame);
    if(!measure())return;
    if(!t0)t0=ts;var t=(ts-t0)/1000;
    ctx.fillStyle="rgba(18,14,11,0.22)";ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation="lighter";
    // faint woven threads
    threads.forEach(function(th,ii){
      ctx.beginPath();
      for(var x=0;x<=W;x+=14*dpr){var y=yOf(th,x,t);x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}
      ctx.strokeStyle=th.col;ctx.globalAlpha=0.05+0.02*Math.sin(t+ii);ctx.lineWidth=1*dpr;ctx.stroke();
    });
    ctx.globalAlpha=1;
    parts.forEach(function(p){
      var th=threads[p.th];
      p.x+=p.v;if(p.x>W+20){p.x=-10;p.th=(p.th+1)%threads.length}
      var y=yOf(th,p.x,t);
      var dx=p.x-mouse.x,dy=y-mouse.y,dd=dx*dx+dy*dy,R=90*dpr;
      if(dd<R*R){var d=Math.sqrt(dd)||1,f=(R-d)/R;y+=dy/d*f*26*dpr;p.x+=dx/d*f*4}
      var a=0.55+0.45*Math.sin(t*3+p.tw);
      ctx.beginPath();ctx.arc(p.x,y,p.r,0,7);
      ctx.fillStyle=th.col;ctx.globalAlpha=0.32*a;
      ctx.shadowColor=th.col;ctx.shadowBlur=10*dpr;ctx.fill();
      ctx.shadowBlur=0;ctx.globalAlpha=1;
    });
    ctx.globalCompositeOperation="source-over";
  }
  function start(){if(running)return;running=true;t0=0;raf=requestAnimationFrame(frame)}
  function stop(){running=false;if(raf)cancelAnimationFrame(raf);raf=null}
  canvas.addEventListener("pointermove",function(e){var r=canvas.getBoundingClientRect();
    mouse.x=(e.clientX-r.left)*dpr;mouse.y=(e.clientY-r.top)*dpr});
  canvas.addEventListener("pointerleave",function(){mouse.x=-9999;mouse.y=-9999});
  if(window.ResizeObserver){new ResizeObserver(function(){measure()}).observe(canvas)}
  window.addEventListener("pageshow",function(){stop();start()});
  document.addEventListener("visibilitychange",function(){document.hidden?stop():start()});
  start();
  return stop;
}
var heroStop=null;

/* ---------- reveal on scroll ---------- */
var revObs=("IntersectionObserver" in window)?new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");revObs.unobserve(e.target)}})
},{threshold:0.06}):null;
function reveal(root){if(!revObs)return;$$(".rv",root).forEach(function(el){revObs.observe(el)})}

/* ---------- HOME ---------- */
function widgetCount(){var c=0;Object.keys(WIDGETS).forEach(function(k){c++});return c}
function renderHome(){
  if(heroStop){heroStop();heroStop=null}
  var v=$("#view");
  var h='<section id="hero"><canvas id="loom"></canvas><div class="hero-in">'+
    '<span class="kicker">Verified against official docs · July 2026</span>'+
    '<h1>Master <span class="gx">Claude</span>.<br>Then get paid for it.</h1>'+
    '<p class="sub">The complete operator’s course: how Claude works, prompting craft, the app, Cowork, Claude Code, MCP, the API, agents — and three full tracks on turning the skill into income. Plain English. Interactive labs. Real 2026 numbers.</p>'+
    '<div class="hero-cta"><a class="btn pri" href="#start">Start Lesson 1 →</a>'+
    '<a class="btn ghost" href="#labs">🔬 Play with the labs</a>'+
    '<a class="btn ghost" href="#track/t11">💼 The money tracks</a></div>'+
    '<div class="stats"><div class="stat"><b>'+FLAT.length+'</b><span>Lessons</span></div>'+
    '<div class="stat"><b>'+TRACKS.length+'</b><span>Tracks</span></div>'+
    '<div class="stat"><b>'+widgetCount()+'</b><span>Interactive labs</span></div>'+
    '<div class="stat"><b>'+INTERVIEW.length+'</b><span>Interview Qs</span></div>'+
    '<div class="stat"><b>'+GLOSSARY.length+'</b><span>Glossary terms</span></div></div>'+
    '</div></section>';
  h+='<div class="wide home-sec"><h2>The road, phase by phase</h2>'+
     '<p class="lead">Five phases, each standing on the one before it. Foundations give you the mental model; the craft makes you dangerous; power-user and builder phases give you the tools; the operator phase turns it all into income.</p>';
  (window.COURSE.phases||[]).forEach(function(p,pi){
    h+='<div class="phase rv"><div class="pnum">'+p.id+'</div><div><h3>'+esc(p.name)+'</h3><p>'+esc(p.blurb)+'</p></div></div><div class="tgrid">';
    TRACKS.filter(function(t){return t.phase===p.id}).forEach(function(t){
      var c=trackDone(t);
      h+='<a class="tcard rv" href="#track/'+t.id+'"><div class="top"><span class="ico">'+t.icon+'</span>'+
        '<div><h4>'+t.n+'. '+esc(t.title)+'</h4><span class="meta">'+t.lessons.length+' lessons · <span class="lvl '+t.level+'">'+t.level+'</span></span></div></div>'+
        '<p>'+esc(t.blurb)+'</p><div class="tbar"><i style="width:'+pct(c,t.lessons.length)+'%"></i></div></a>';
    });
    h+='</div>';
  });
  h+='<div class="callout gold rv" style="margin-top:30px"><b>How to use this course.</b> 30–45 focused minutes a day. Read the lesson, play the lab, do the “Do it for real” exercise in actual Claude, answer the quiz, mark complete. The flashcards deck resurfaces what you learned right before you’d forget it. Skipping the real-tool exercises is the one way to fail this course.</div>';
  h+='</div>';
  v.innerHTML=h;
  heroStop=emberLoom($("#loom"));
  reveal(v);
}

/* ---------- TRACK PAGE ---------- */
function renderTrack(tid){
  var t=TRACKS.find(function(x){return x.id===tid});if(!t)return renderHome();
  var ph=(window.COURSE.phases||[]).find(function(p){return p.id===t.phase});
  var v=$("#view"),d=doneSet();
  var h='<div class="wrap"><div class="crumb"><a href="#home">Home</a> › Phase '+t.phase+' · '+esc(ph?ph.name:"")+'</div>'+
    '<div class="page-h"><h1>'+t.icon+'  Track '+t.n+': '+esc(t.title)+' <span class="lvl '+t.level+'">'+t.level+'</span></h1>'+
    '<p>'+esc(t.blurb)+'</p></div>';
  h+='<div>';
  t.lessons.forEach(function(l,i){
    var done=d[l.id];
    h+='<a class="tcard rv" style="margin:10px 0;display:flex;gap:14px;align-items:center" href="#lesson/'+l.id+'">'+
      '<span class="ico" style="flex:none">'+(done?"✅":(i+1))+'</span>'+
      '<div style="flex:1"><h4 style="margin:0">'+l.id+' · '+esc(l.title)+'</h4>'+
      '<span class="meta">~'+l.min+' min'+(done?' · completed':'')+'</span></div><span style="color:var(--ember)">→</span></a>';
  });
  var cs=CHEATSHEETS.find(function(c){return c.tid===tid});
  if(cs)h+='<div class="callout tip" style="margin-top:20px"><b>⚡ Track cheat sheet:</b> everything from this track on one card — <a href="#cheats/'+tid+'">open it</a>.</div>';
  h+='</div></div>';
  v.innerHTML=h;reveal(v);
}

/* ---------- LESSON ---------- */
function pblock(label,text,kind){
  return '<div class="pblock '+(kind||"")+'"><div class="ph"><span>'+esc(label)+'</span></div><pre>'+esc(text)+'</pre><button class="copybtn">copy</button></div>';
}
window.PB=pblock; // content files may use
/* Optional per-lesson video. Set L.video = {embed:"<iframe-src>"} for a hosted
   embed (Bunny Stream / YouTube / Vimeo), OR {file:"media/x.mp4", poster:"..."}
   for a self-hosted file. cap = short caption. Renders responsive 16:9, no overflow. */
function videoBlock(v){
  if(!v)return "";
  var inner;
  if(v.embed){ inner='<div class="lv-frame"><iframe src="'+v.embed+'" loading="lazy" title="lesson video" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;fullscreen" allowfullscreen></iframe></div>'; }
  else if(v.file){ inner='<video class="lv-vid" controls playsinline preload="none"'+(v.poster?' poster="'+v.poster+'"':'')+'><source src="'+v.file+'"></video>'; }
  else return "";
  return '<figure class="lessonvideo rv">'+inner+(v.cap?'<figcaption><span class="lv-tag">▶ WATCH</span><span>'+esc(v.cap)+'</span></figcaption>':'')+'</figure>';
}
function renderLesson(id){
  var L=LESSONS[id],meta=FLAT[lessonIndex(id)];
  if(!L||!meta)return renderHome();
  var t=trackOf(id);
  var v=$("#view");
  var h='<div class="wrap"><article class="lesson">';
  h+='<div class="crumb"><a href="#home">Home</a> › <a href="#track/'+t.id+'">Track '+t.n+': '+esc(t.title)+'</a> › '+id+'</div>';
  h+='<div class="lesson-h"><h1>'+esc(meta.title)+'</h1><p class="sub">'+(L.sub||"")+'</p>'+
     '<div class="meta-row"><span class="pill">Track '+t.n+' · Lesson '+id+'</span><span class="pill">~'+meta.min+' min</span>'+
     '<span class="pill"><span class="lvl '+t.level+'">'+t.level+'</span></span>'+
     (L.asOf?'<span class="pill">📅 facts as of July 2026</span>':'')+'</div></div>';
  if(L.breath)h+='<div class="breath rv"><b>In one breath:</b> '+L.breath+'</div>';
  if(L.hook)h+='<div class="sec rv">'+L.hook+'</div>';
  if(L.video)h+=videoBlock(L.video);
  var D=DIAGRAMS[id];
  if(D)h+='<figure class="diagram rv">'+D.svg+(D.cap?'<figcaption>'+D.cap+'</figcaption>':'')+'</figure>';
  (L.secs||[]).forEach(function(s){h+='<div class="sec rv"><h2>'+esc(s.h)+'</h2>'+s.b+'</div>'});
  var W=WIDGETS[id];
  if(W)h+='<div class="widget rv" id="wmount"><div class="wh"><b>'+esc(W.t)+'</b><span class="tag">INTERACTIVE LAB</span></div>'+
       '<div class="wbody"><p class="wguide">'+ (W.guide||"") +'</p><div id="wroot"></div>'+(W.note?'<p class="wnote">'+W.note+'</p>':'')+'</div></div>';
  if(L.worked)h+='<div class="worked rv"><div class="wkh">'+esc(L.worked.t||"Worked example — narrated")+'</div><div class="wkb">'+L.worked.html+'</div></div>';
  if(L.lab)h+='<div class="dolab rv"><div class="dh"><b>🛠 Do it for real</b><span class="where">'+esc(L.lab.where||"Claude")+'</span></div>'+
       '<div class="db">'+L.lab.html+(L.lab.expect?'<div class="expect"><b>You’ll know it worked when:</b> '+L.lab.expect+'</div>':'')+'</div></div>';
  if(L.mistakes&&L.mistakes.length){h+='<div class="mist rv"><div class="mh">Where people go wrong</div><ul>';
    L.mistakes.forEach(function(m){h+='<li>'+m+'</li>'});h+='</ul></div>'}
  if(L.quiz&&L.quiz.length){h+='<div class="quiz rv"><div class="qh">✅ Check yourself</div>';
    L.quiz.forEach(function(q,qi){h+='<div class="qitem" data-q="'+qi+'"><div class="qq">'+(qi+1)+'. '+q.q+'</div>';
      q.opts.forEach(function(o,oi){h+='<button class="qopt" data-o="'+oi+'">'+o+'</button><div class="qwhy" data-w="'+oi+'">'+((q.why&&q.why[oi])||"")+'</div>'});
      h+='</div>'});
    h+='<div class="qscore" id="qscore"></div></div>'}
  if(L.prac&&L.prac.length){h+='<div class="prac rv"><div class="sec"><h2>Practice</h2></div>';
    L.prac.forEach(function(p){h+='<details><summary><span class="tag-p '+(p.tag||"warm")+'">'+
      (p.tag==="stretch"?"STRETCH":p.tag==="transfer"?"TRANSFER":"WARM-UP")+'</span>'+p.q+'</summary><div class="sol">'+p.sol+'</div></details>'});
    h+='</div>'}
  if(L.recap)h+='<div class="recap rv"><b>Pocket recap:</b> '+L.recap+'</div>';
  if(L.review)h+='<div class="callout note rv"><b>🔁 Quick rewind:</b> '+L.review+'</div>';
  if(L.deep)h+='<details class="deep rv"><summary>Deep dive — for the curious</summary><div class="deepb">'+L.deep+'</div></details>';
  // done bar + nav
  var idx=lessonIndex(id),prev=FLAT[idx-1],next=FLAT[idx+1];
  h+='<div class="donebar"><button class="btn pri" id="doneBtn">'+(isDone(id)?"✓ Completed":"Mark complete")+'</button>'+
     '<span class="msg" id="doneMsg">'+(isDone(id)?"Logged. Streak: "+streak()+" day"+(streak()===1?"":"s")+" 🔥":"Finish the quiz, do the real-tool exercise, then mark it.")+'</span></div>';
  if(L.bridge)h+='<div class="bridge rv"><b>Next up:</b> '+L.bridge+'</div>';
  h+='<div class="lnav">'+
     (prev?'<a href="#lesson/'+prev.id+'"><small>← Previous</small>'+prev.id+' '+esc(prev.title)+'</a>':'<span style="flex:1"></span>')+
     (next?'<a class="nxt" href="#lesson/'+next.id+'"><small>Next →</small>'+next.id+' '+esc(next.title)+'</a>':'')+
     '</div>';
  h+='</article></div><div id="ra-float"><button class="btn ghost" id="raBtn">🔊 Listen</button></div>';
  v.innerHTML=h;
  // wire quiz
  var answered={},correct=0,total=(L.quiz||[]).length;
  $$(".qitem",v).forEach(function(qi){
    var qn=+qi.getAttribute("data-q"),q=L.quiz[qn];
    $$(".qopt",qi).forEach(function(btn){
      btn.addEventListener("click",function(){
        if(answered[qn]!=null)return;
        var oi=+btn.getAttribute("data-o");answered[qn]=oi;
        $$(".qopt",qi).forEach(function(b,bi){
          if(bi===q.a)b.classList.add("right");
          else if(bi===oi)b.classList.add("wrong");
        });
        var wc=$('.qwhy[data-w="'+q.a+'"]',qi);if(wc)wc.classList.add("show");
        if(oi!==q.a){var ww=$('.qwhy[data-w="'+oi+'"]',qi);if(ww)ww.classList.add("show")}
        else correct++;
        if(Object.keys(answered).length===total){
          var sc=$("#qscore");if(sc)sc.innerHTML="Score: <b>"+correct+"/"+total+"</b>"+(correct===total?" — flawless. 🏅":" — re-read the “why” notes above, they’re the real lesson.");
          var m=LSget("quiz",{});var best=Math.max(m[id]||0,Math.round(100*correct/total));m[id]=best;LSset("quiz",m);
        }
      });
    });
  });
  // copy buttons
  $$(".copybtn",v).forEach(function(b){b.addEventListener("click",function(){
    var pre=$("pre",b.parentElement);if(!pre)return;
    var txt=pre.textContent;
    (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(function(){b.textContent="copied ✓";b.classList.add("ok");
      setTimeout(function(){b.textContent="copy";b.classList.remove("ok")},1600)},function(){
      var ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();
      try{document.execCommand("copy")}catch(e){}document.body.removeChild(ta);
      b.textContent="copied ✓";setTimeout(function(){b.textContent="copy"},1600)});
  })});
  // widget
  if(W){try{W.build($("#wroot"))}catch(e){var wr=$("#wroot");if(wr)wr.innerHTML='<p class="wnote">This lab needs a modern browser with canvas support. ('+esc(e.message)+')</p>'}}
  // done button
  $("#doneBtn").addEventListener("click",function(){
    var d=doneSet();
    if(d[id]){delete d[id]}else{d[id]=1;logStudyDay()}
    LSset("done",d);renderSide();
    this.textContent=d[id]?"✓ Completed":"Mark complete";
    $("#doneMsg").textContent=d[id]?("Logged. Streak: "+streak()+" day"+(streak()===1?"":"s")+" 🔥"):"Finish the quiz, do the real-tool exercise, then mark it.";
  });
  glossTips(v);
  readAloud(v);
  reveal(v);
}

/* ---------- glossary tooltips (first occurrence per term) ---------- */
function glossTips(root){
  var art=$("article.lesson",root);if(!art||!GLOSSARY.length)return;
  var byLen=GLOSSARY.slice().sort(function(a,b){return b.t.length-a.t.length});
  var wrapped={};
  var SKIP={A:1,BUTTON:1,CODE:1,PRE:1,H1:1,H2:1,H3:1,H4:1,SCRIPT:1,STYLE:1,SUMMARY:1,KBD:1,SVG:1,TEXTAREA:1};
  function skip(el){
    for(var e=el.parentElement;e;e=e.parentElement){
      if(SKIP[e.tagName])return true;
      // SVG elements report lowercase tagName ("svg","text","tspan") and cannot host an HTML <span>;
      // skip anything inside a diagram figure or SVG so tooltip-wrapping never corrupts diagram text.
      if(e.tagName&&e.tagName.toLowerCase()==="svg")return true;
      if(typeof SVGElement!=="undefined"&&e instanceof SVGElement)return true;
      var c=e.className;if(typeof c==="string"&&/(widget|quiz|pblock|gloss|breath|copybtn|diagram)/.test(c))return true;
      if(e===art)break;
    }
    return false;
  }
  var walker=document.createTreeWalker(art,NodeFilter.SHOW_TEXT,null);
  var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(function(nd){
    if(skip(nd))return;
    byLen.forEach(function(g,gi){
      if(wrapped[gi])return;
      var re=new RegExp("\\b("+g.t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"s?)\\b","i");
      var m=nd.nodeValue&&nd.nodeValue.match(re);
      if(m&&nd.parentNode){
        var i=m.index,txt=nd.nodeValue;
        var span=document.createElement("span");span.className="gloss";span.setAttribute("data-gi",gi);span.tabIndex=0;
        span.textContent=m[1];
        var after=document.createTextNode(txt.slice(i+m[1].length));
        nd.nodeValue=txt.slice(0,i);
        nd.parentNode.insertBefore(span,nd.nextSibling);
        span.parentNode.insertBefore(after,span.nextSibling);
        wrapped[gi]=1;
      }
    });
  });
  var tip=$("#gtip"),pinned=false;
  function show(span){
    var g=GLOSSARY[+span.getAttribute("data-gi")];if(!g)return;
    tip.innerHTML="<b>"+esc(g.t)+"</b>"+esc(g.d)+'<a class="glink" href="#glossary/'+encodeURIComponent(g.t)+'">Open in glossary →</a>';
    tip.style.display="block";
    var r=span.getBoundingClientRect(),tw=Math.min(340,window.innerWidth-24);
    tip.style.maxWidth=tw+"px";
    var x=Math.min(Math.max(12,r.left),window.innerWidth-tw-12);
    var y=r.bottom+10;if(y+tip.offsetHeight>window.innerHeight-10)y=r.top-tip.offsetHeight-10;
    tip.style.left=x+"px";tip.style.top=Math.max(8,y)+"px";
  }
  function hide(){if(!pinned){tip.style.display="none"}}
  $$(".gloss",art).forEach(function(sp){
    sp.addEventListener("mouseenter",function(){if(!pinned)show(sp)});
    sp.addEventListener("mouseleave",hide);
    sp.addEventListener("focus",function(){show(sp)});
    sp.addEventListener("blur",hide);
    sp.addEventListener("click",function(e){e.stopPropagation();pinned=true;show(sp)});
  });
  document.addEventListener("click",function(){pinned=false;tip.style.display="none"});
  window.addEventListener("scroll",function(){pinned=false;tip.style.display="none"},{passive:true});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"){pinned=false;tip.style.display="none"}});
}

/* ---------- read aloud ---------- */
function readAloud(root){
  var btn=$("#raBtn",root.parentElement||document);if(!btn)btn=$("#raBtn");
  if(!btn)return;
  if(!("speechSynthesis" in window)){btn.style.display="none";return}
  var speaking=false,queue=[],qi=0,keep=null;
  function collect(){
    var art=$("article.lesson");var els=[];
    $$(".breath, .sec p, .sec li, .wkb .nar, .recap, .mist li",art).forEach(function(el){
      if(el.closest(".widget,.quiz,.pblock,pre"))return;
      var t=el.textContent.replace(/\s+/g," ").trim();
      if(t.length>8)els.push({el:el,t:t});
    });
    return els;
  }
  function stop(){speaking=false;window.speechSynthesis.cancel();if(keep)clearInterval(keep);
    $$(".rd-on").forEach(function(e){e.classList.remove("rd-on")});btn.textContent="🔊 Listen"}
  function speakNext(){
    if(!speaking||qi>=queue.length){stop();return}
    var it=queue[qi];
    $$(".rd-on").forEach(function(e){e.classList.remove("rd-on")});
    it.el.classList.add("rd-on");
    try{it.el.scrollIntoView({behavior:"smooth",block:"center"})}catch(e){}
    var sentences=it.t.match(/[^.!?]+[.!?]*/g)||[it.t];
    var si=0;
    function nextSentence(){
      if(!speaking)return;
      if(si>=sentences.length){qi++;speakNext();return}
      var u=new SpeechSynthesisUtterance(sentences[si].trim());
      u.rate=1.0;u.onend=function(){si++;nextSentence()};u.onerror=function(){si++;nextSentence()};
      window.speechSynthesis.speak(u);
    }
    nextSentence();
  }
  btn.addEventListener("click",function(){
    if(speaking){stop();return}
    queue=collect();qi=0;speaking=true;btn.textContent="⏹ Stop";
    keep=setInterval(function(){if(speaking&&window.speechSynthesis.paused)window.speechSynthesis.resume();
      if(speaking)window.speechSynthesis.resume()},9000);
    speakNext();
  });
}

/* ---------- LABS HUB ---------- */
function renderLabs(){
  var v=$("#view");
  var h='<div class="wide"><div class="page-h"><h1>🔬 Interactive Labs</h1>'+
  '<p>Every lab lives inside its lesson — this is the map. Each one lets you <em>move the levers yourself</em>: tokens, context, prompts, costs, agent loops. Playing for two minutes beats reading for twenty.</p></div><div class="lab-grid">';
  FLAT.forEach(function(l){
    var W=WIDGETS[l.id];if(!W)return;
    h+='<a class="lab-card rv" href="#lesson/'+l.id+'"><b>'+esc(W.t)+'</b><p>'+esc(W.short||W.guide.replace(/<[^>]+>/g,"").slice(0,110))+'…</p>'+
       '<span class="in">In lesson '+l.id+' · '+esc(l.title)+'</span></a>';
  });
  h+='</div></div>';
  v.innerHTML=h;reveal(v);
}

/* ---------- GLOSSARY ---------- */
function renderGlossary(q){
  var v=$("#view");
  var h='<div class="wrap"><div class="page-h"><h1>📖 Glossary</h1><p>Every term the course uses, in plain English. These same definitions power the dotted-underline tooltips inside lessons.</p></div>'+
  '<div class="searchbar"><input id="gq" type="text" placeholder="Search '+GLOSSARY.length+' terms…" value="'+esc(q||"")+'"></div><div id="glist"></div></div>';
  v.innerHTML=h;
  function draw(){
    var s=($("#gq").value||"").toLowerCase();
    var out="";
    GLOSSARY.slice().sort(function(a,b){return a.t.localeCompare(b.t)}).forEach(function(g){
      if(s&&(g.t+" "+g.d).toLowerCase().indexOf(s)<0)return;
      out+='<div class="gterm"><b>'+esc(g.t)+'</b><span class="k">'+esc(g.k||"")+'</span><p>'+esc(g.d)+'</p></div>';
    });
    $("#glist").innerHTML=out||'<p style="color:var(--mut)">No matches.</p>';
  }
  $("#gq").addEventListener("input",draw);draw();
}

/* ---------- CHEATSHEETS ---------- */
function renderCheats(focus){
  var v=$("#view");
  var h='<div class="wide"><div class="page-h"><h1>⚡ Cheat Sheets</h1><p>One dense card per track. Each links back to its track; every track page links here. Print any card — the chrome disappears on paper.</p>'+
  '<button class="btn ghost" onclick="window.print()">🖨 Print</button></div><div class="cs-grid">';
  CHEATSHEETS.forEach(function(c){
    h+='<div class="cs-card rv" id="cs-'+c.tid+'"><div class="csh"><b>'+esc(c.title)+'</b><a href="#track/'+c.tid+'">track →</a></div>';
    c.items.forEach(function(it){h+='<div class="cs-item"><code>'+esc(it[0])+'</code><span>'+esc(it[1])+'</span></div>'});
    h+='</div>';
  });
  h+='</div></div>';
  v.innerHTML=h;reveal(v);
  if(focus){var el=$("#cs-"+focus);if(el)setTimeout(function(){el.scrollIntoView({behavior:"smooth",block:"start"})},60)}
}

/* ---------- INTERVIEW BANK ---------- */
function renderInterview(){
  var v=$("#view");
  var h='<div class="wrap"><div class="page-h"><h1>🎤 Interview Bank</h1><p>'+INTERVIEW.length+' real-world questions across the whole course — the kind asked in AI-native job interviews and by paying clients. Try to answer out loud before opening the solution.</p></div>'+
  '<div class="filt"><button class="wbtn on" data-f="all">All</button><button class="wbtn" data-f="easy">Easy</button>'+
  '<button class="wbtn" data-f="med">Medium</button><button class="wbtn" data-f="hard">Hard</button></div><div id="iqlist"></div></div>';
  v.innerHTML=h;
  var cur="all";
  function draw(){
    var out="";
    INTERVIEW.forEach(function(q){
      if(cur!=="all"&&q.d!==cur)return;
      out+='<details class="iq"><summary><span class="diff '+q.d+'">'+q.d.toUpperCase()+'</span>'+esc(q.q)+'</summary><div class="ans">'+q.a+'</div></details>';
    });
    $("#iqlist").innerHTML=out;
  }
  $$(".filt .wbtn",v).forEach(function(b){b.addEventListener("click",function(){
    $$(".filt .wbtn",v).forEach(function(x){x.classList.remove("on")});b.classList.add("on");
    cur=b.getAttribute("data-f");draw();
  })});
  draw();
}

/* ---------- FLASHCARDS (Leitner-lite) ---------- */
function buildDeck(){
  var deck=[];
  FLAT.forEach(function(l){var L=LESSONS[l.id];if(L&&L.breath)deck.push({id:"L"+l.id,f:"In one breath — "+l.title+"?",b:L.breath.replace(/<[^>]+>/g,"")})});
  GLOSSARY.forEach(function(g,i){deck.push({id:"G"+i,f:g.t,b:g.d})});
  return deck;
}
function renderCards(){
  var v=$("#view");
  var deck=buildDeck();
  var st=LSget("cards",{}); // id -> {box, due}
  var now=Date.now(),day=864e5;
  var due=deck.filter(function(c){var s=st[c.id];return !s||s.due<=now});
  due.sort(function(){return Math.random()-0.5});
  var h='<div class="wrap"><div class="page-h"><h1>🃏 Flashcards</h1><p>Spaced repetition over every lesson’s one-breath summary and every glossary term. Cards you nail come back later; cards you miss come back tomorrow.</p></div>'+
  '<div class="fc-meta" id="fcmeta"></div><div class="fc-stage"><div class="fc-card" id="fcard">'+
  '<div class="fc-face front"><span class="fcm">question — click to flip</span><div id="fcf"></div></div>'+
  '<div class="fc-face back"><span class="fcm">answer</span><div id="fcb"></div></div></div></div>'+
  '<div class="fc-btns"><button class="btn ghost" id="fAgain">↩ Again (tomorrow)</button><button class="btn pri" id="fGood">✓ Got it</button></div></div>';
  v.innerHTML=h;
  var i=0,flipped=false;
  var card=$("#fcard");
  function draw(){
    if(!due.length||i>=due.length){
      $("#fcmeta").textContent="Deck clear for now — come back tomorrow. 🌙";
      card.style.display="none";$("#fAgain").style.display="none";$("#fGood").style.display="none";return;
    }
    var c=due[i];
    $("#fcf").textContent=c.f;$("#fcb").textContent=c.b;
    $("#fcmeta").textContent="Card "+(i+1)+" of "+due.length+" due";
    flipped=false;card.classList.remove("flip");
  }
  card.addEventListener("click",function(){flipped=!flipped;card.classList.toggle("flip",flipped)});
  function grade(good){
    var c=due[i];var s=st[c.id]||{box:0};
    if(good){s.box=Math.min(4,(s.box||0)+1)}else{s.box=0}
    var waits=[1,3,7,21,60];
    s.due=now+waits[s.box]*day;
    st[c.id]=s;LSset("cards",st);
    i++;draw();
  }
  $("#fGood").addEventListener("click",function(){grade(true)});
  $("#fAgain").addEventListener("click",function(){grade(false)});
  draw();
}

/* ---------- PROGRESS ---------- */
function renderProgress(){
  var v=$("#view");
  var done=totalDone(),tot=FLAT.length,p=pct(done,tot);
  var qm=LSget("quiz",{}),qn=Object.keys(qm).length,qavg=0;
  Object.keys(qm).forEach(function(k){qavg+=qm[k]});qavg=qn?Math.round(qavg/qn):0;
  var circ=2*Math.PI*70;
  var h='<div class="wrap"><div class="page-h"><h1>📈 Your Progress</h1><p>All progress lives in this browser (localStorage) — private to you.</p></div>'+
  '<div class="ring-wrap"><div class="ring"><svg width="170" height="170"><circle cx="85" cy="85" r="70" fill="none" stroke="#33281f" stroke-width="14"/>'+
  '<circle cx="85" cy="85" r="70" fill="none" stroke="url(#gr)" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+circ+'" stroke-dashoffset="'+(circ*(1-p/100))+'"/>'+
  '<defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a54"/><stop offset="1" stop-color="#ffd24d"/></linearGradient></defs></svg>'+
  '<div class="pc">'+p+'%</div></div>'+
  '<div class="pstat"><div><b>'+done+' / '+tot+'</b><span>  lessons complete</span></div>'+
  '<div><b>'+streak()+' 🔥</b><span>  day streak</span></div>'+
  '<div><b>'+qavg+'%</b><span>  average quiz score ('+qn+' quizzes)</span></div></div></div>';
  h+='<div style="margin:20px 0">';
  TRACKS.forEach(function(t){
    var c=trackDone(t);
    h+='<div class="trow"><span class="nm">'+t.icon+' '+t.n+'. '+esc(t.title)+'</span>'+
       '<span class="tbar"><i style="width:'+pct(c,t.lessons.length)+'%"></i></span><span class="ct">'+c+'/'+t.lessons.length+'</span></div>';
  });
  h+='</div>';
  if(p===100)h+='<div class="callout gold"><b>🏆 Course complete.</b> You are now, verifiably, in the top fraction of a percent of Claude users on Earth. Go to Track 14’s Capstone E and launch. The world does not need you to be ready; it needs you to ship.</div>';
  else{var nxt=FLAT.find(function(l){return !isDone(l.id)});
    if(nxt)h+='<div class="callout tip"><b>Next up:</b> <a href="#lesson/'+nxt.id+'">'+nxt.id+' · '+esc(nxt.title)+'</a></div>'}
  h+='</div>';
  v.innerHTML=h;
}

/* ---------- START HERE ---------- */
function renderStart(){
  var v=$("#view");
  var h='<div class="wrap"><div class="page-h"><h1>▶ Start Here</h1><p>Your first 20 minutes, minute by minute. No decisions to make — just follow.</p></div>'+
  '<div class="sec"><ul>'+
  '<li><b>Minute 0–1:</b> Bookmark this page. Seriously — do it now.</li>'+
  '<li><b>Minute 1–4:</b> Open the <a href="#lesson/1.2">Tokens &amp; Context lab</a> and drag the sliders. Don’t read the lesson yet — just play.</li>'+
  '<li><b>Minute 4–16:</b> Read <a href="#lesson/1.1">Lesson 1.1 — What Claude Actually Is</a>. Take the quiz. Mark complete.</li>'+
  '<li><b>Minute 16–19:</b> Do lesson 1.1’s “Do it for real” exercise in an actual Claude tab.</li>'+
  '<li><b>Minute 19–20:</b> Open <a href="#cards">Flashcards</a>, answer whatever is due (today: 1 card). Stop. You’re done for day one.</li></ul>'+
  '<div class="callout gold"><b>The daily loop:</b> one lesson → its lab → its real-tool exercise → quiz → mark complete → flashcards due that day. 30–45 minutes. Miss a day? Just continue — the streak counter forgives what matters: coming back.</div>'+
  '<div class="callout note"><b>Five rules.</b> 1) Do the real-tool exercises — reading about Claude without using Claude is how you stay average. 2) Wrong quiz answers are the course working, not failing. 3) One lesson per sitting beats four lessons on Sunday. 4) The money tracks (11–13) will tempt you to skip ahead — the people who make money are the ones who didn’t. 5) When a fact might have changed after July 2026, the lesson tells you exactly where to check.</div>'+
  '</div></div>';
  v.innerHTML=h;
}

/* ---------- COMMAND PALETTE ---------- */
function palette(){
  var pal=$("#pal"),inp=$("#pal-in"),res=$("#pal-res"),idx=[],sel=0;
  FLAT.forEach(function(l){idx.push({t:l.id+" · "+l.title,s:"Track "+l.tn,href:"#lesson/"+l.id})});
  GLOSSARY.forEach(function(g){idx.push({t:g.t,s:"glossary",href:"#glossary/"+encodeURIComponent(g.t)})});
  CHEATSHEETS.forEach(function(c){idx.push({t:c.title,s:"cheat sheet",href:"#cheats/"+c.tid})});
  [["Labs hub","#labs"],["Progress","#progress"],["Interview bank","#interview"],["Flashcards","#cards"],["Start here","#start"]].forEach(function(x){idx.push({t:x[0],s:"page",href:x[1]})});
  function open(){pal.classList.add("open");inp.value="";draw("");inp.focus()}
  function close(){pal.classList.remove("open")}
  function draw(q){
    q=q.toLowerCase();sel=0;
    var out="",n=0;
    idx.forEach(function(it){
      if(n>=14)return;
      if(!q||it.t.toLowerCase().indexOf(q)>=0){out+='<a class="pal-it'+(n===0?" sel":"")+'" href="'+it.href+'">'+esc(it.t)+'<small>'+esc(it.s)+'</small></a>';n++}
    });
    res.innerHTML=out||'<div class="pal-it">No matches</div>';
  }
  inp.addEventListener("input",function(){draw(inp.value)});
  inp.addEventListener("keydown",function(e){
    var items=$$(".pal-it",res);
    if(e.key==="ArrowDown"){sel=Math.min(items.length-1,sel+1)}
    else if(e.key==="ArrowUp"){sel=Math.max(0,sel-1)}
    else if(e.key==="Enter"){if(items[sel]&&items[sel].href){location.hash=items[sel].getAttribute("href");close()}return}
    else return;
    e.preventDefault();
    items.forEach(function(it,i){it.classList.toggle("sel",i===sel)});
    if(items[sel])items[sel].scrollIntoView({block:"nearest"});
  });
  res.addEventListener("click",function(){setTimeout(close,30)});
  document.addEventListener("keydown",function(e){
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();pal.classList.contains("open")?close():open()}
    if(e.key==="Escape")close();
  });
  pal.addEventListener("click",function(e){if(e.target===pal)close()});
}

/* ---------- reading progress bar + keyboard nav ---------- */
window.addEventListener("scroll",function(){
  var b=$("#rbar i");if(!b)return;
  var h=document.documentElement;
  var p=(h.scrollTop)/(h.scrollHeight-h.clientHeight||1);
  b.style.width=Math.min(100,Math.max(0,p*100))+"%";
},{passive:true});
document.addEventListener("keydown",function(e){
  if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;
  var m=location.hash.match(/^#lesson\/(.+)$/);if(!m)return;
  var i=lessonIndex(m[1]);
  if(e.key==="ArrowRight"&&FLAT[i+1])location.hash="#lesson/"+FLAT[i+1].id;
  if(e.key==="ArrowLeft"&&FLAT[i-1])location.hash="#lesson/"+FLAT[i-1].id;
});

/* ---------- burger ---------- */
$("#burger").addEventListener("click",function(){$("#side").classList.toggle("open");$("#scrim").classList.toggle("on")});
$("#scrim").addEventListener("click",function(){$("#side").classList.remove("open");$("#scrim").classList.remove("on")});

/* ---------- router ---------- */
function route(){
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  $("#side").classList.remove("open");$("#scrim").classList.remove("on");
  var h=location.hash||"#home";
  var mm;
  window.scrollTo(0,0);
  if(h==="#home"||h==="#")renderHome();
  else if(h==="#start")renderStart();
  else if(h==="#labs")renderLabs();
  else if(h==="#progress")renderProgress();
  else if(h==="#interview")renderInterview();
  else if(h==="#cards")renderCards();
  else if((mm=h.match(/^#track\/(t\d+)$/)))renderTrack(mm[1]);
  else if((mm=h.match(/^#lesson\/([\d.]+)$/)))renderLesson(mm[1]);
  else if((mm=h.match(/^#glossary(?:\/(.*))?$/)))renderGlossary(decodeURIComponent(mm[1]||""));
  else if((mm=h.match(/^#cheats(?:\/(t\d+))?$/)))renderCheats(mm[1]);
  else renderHome();
  // active sidebar link
  var tid=null;
  if((mm=h.match(/^#track\/(t\d+)$/)))tid=mm[1];
  if((mm=h.match(/^#lesson\/([\d.]+)$/))){var t=trackOf(mm[1]);if(t)tid=t.id}
  $$(".tlink").forEach(function(a){a.classList.toggle("act",a.getAttribute("data-t")===tid)});
}
window.addEventListener("hashchange",route);

/* ---------- boot ---------- */
renderSide();
palette();
route();
})();
