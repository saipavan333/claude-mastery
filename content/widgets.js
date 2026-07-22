/* Interactive Labs — keyed by lesson id.
   Shape: WIDGETS[id] = {t, short, guide, note, build(root)}.
   build() populates the given element with a live, interactive widget.
   Pure DOM/SVG (scales without distortion); no external deps, no storage. */
window.WIDGETS = {};
(function(){
var W = window.WIDGETS;
function el(tag, attrs, html){ var e=document.createElement(tag); if(attrs)for(var k in attrs)e.setAttribute(k,attrs[k]); if(html!=null)e.innerHTML=html; return e; }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

/* ---------------- 1.1 Temperature sampler ---------------- */
W["1.1"] = {
 t:"Temperature: watch the dice reshape",
 short:"Slide temperature and see how Claude's next-token odds sharpen or flatten — then sample.",
 guide:"Claude picks the next token from a set of <b>probabilities</b>. <b>Temperature</b> reshapes those odds: low makes the top choice near-certain (focused, repeatable), high flattens them (varied, creative). Slide it, then hit Sample a few times.",
 note:"Low temperature for facts and format-critical work; higher for brainstorming and variety. Same idea everywhere Claude generates.",
 build:function(root){
   var base=[["mat",0.60,"#4fd6b5"],["rug",0.22,"#6aa8ff"],["floor",0.10,"#b79cff"],["couch",0.05,"#ffd24d"],["banana",0.03,"#ff7a9c"]];
   var wrap=el("div"); root.appendChild(wrap);
   var bars=el("div",{style:"display:flex;flex-direction:column;gap:8px;margin:4px 0 14px"}); wrap.appendChild(bars);
   var rowEls=base.map(function(b){
     var row=el("div",{style:"display:flex;align-items:center;gap:10px"});
     var lab=el("div",{style:"width:74px;color:var(--ink);font-size:13px;font-family:var(--mono)"},b[0]);
     var track=el("div",{style:"flex:1;height:22px;background:#20191a;border-radius:6px;overflow:hidden;border:1px solid var(--line)"});
     var fill=el("div",{style:"height:100%;width:0;background:"+b[2]+";transition:width .25s"});
     var pct=el("div",{style:"width:52px;text-align:right;color:var(--mut);font-size:12px"},"");
     track.appendChild(fill); row.appendChild(lab); row.appendChild(track); row.appendChild(pct); bars.appendChild(row);
     return {fill:fill,pct:pct};
   });
   var ctr=el("div",{class:"wrow"}); wrap.appendChild(ctr);
   ctr.appendChild(el("label",null,"Temperature <b id='tv' style='color:var(--ember2);margin-left:6px'>0.7</b>"));
   var sl=el("input",{type:"range",min:"1",max:"150",value:"70"}); ctr.appendChild(sl);
   var sample=el("button",{class:"wbtn"},"🎲 Sample"); ctr.appendChild(sample);
   var out=el("div",{style:"margin-top:12px;font-size:14px;color:var(--mut)"},"Adjusted odds shown above. Sampling picks one token, weighted by these odds."); wrap.appendChild(out);
   function recompute(){
     var T=(+sl.value)/100;
     var tv=document.getElementById("tv"); if(tv)tv.textContent=T.toFixed(2);
     var adj=base.map(function(b){ return Math.pow(b[1], 1/Math.max(0.05,T)); });
     var sum=adj.reduce(function(a,c){return a+c;},0);
     var probs=adj.map(function(a){return a/sum;});
     rowEls.forEach(function(r,i){ r.fill.style.width=(probs[i]*100).toFixed(1)+"%"; r.pct.textContent=(probs[i]*100).toFixed(1)+"%"; });
     return probs;
   }
   sl.addEventListener("input",recompute);
   sample.addEventListener("click",function(){
     var probs=recompute(); var r=0; try{r=(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296);}catch(e){r=(new Date().getTime()%1000)/1000;}
     var acc=0,pick=0; for(var i=0;i<probs.length;i++){acc+=probs[i]; if(r<=acc){pick=i;break;}}
     out.innerHTML="Sampled: <b style='color:"+base[pick][2]+"'>"+base[pick][0]+"</b> &#8212; at low temperature you'll land on <b>mat</b> almost every time; at high temperature the surprises appear.";
     rowEls.forEach(function(rr,i){ rr.fill.style.outline = i===pick?"2px solid var(--ink)":"none"; });
   });
   recompute();
 }
};

/* ---------------- 1.2 Tokenizer + context meter ---------------- */
W["1.2"] = {
 t:"Tokenizer: see your words become tokens",
 short:"Type text and watch it break into approximate tokens — the unit Claude actually counts.",
 guide:"Claude reads in <b>tokens</b> (~3/4 of a word). Type below to see an approximate tokenization and count. Notice common words are one token while rare or long words split into several.",
 note:"This is an approximation for intuition; real tokenization varies. The point: think in tokens, because limits and pricing are counted in them.",
 build:function(root){
   var wrap=el("div"); root.appendChild(wrap);
   var ta=el("textarea",{rows:"3",style:"width:100%;resize:vertical"},"The cat sat on the antidisestablishmentarianism mat."); wrap.appendChild(ta);
   var stat=el("div",{class:"wrow",style:"margin:12px 0"}); wrap.appendChild(stat);
   var pills=el("div",{style:"display:flex;flex-wrap:wrap;gap:5px;margin-top:6px"}); wrap.appendChild(pills);
   var cols=["#ff8a54","#ffd24d","#4fd6b5","#6aa8ff","#b79cff"];
   function approxTokens(text){
     var raw=text.replace(/\s+/g," ").trim(); if(!raw)return [];
     var words=raw.split(/(\s+|[.,;:!?()'"-])/).filter(function(s){return s&&s.trim().length;});
     var toks=[];
     words.forEach(function(w){
       if(/^[.,;:!?()'"-]$/.test(w)){ toks.push(w); return; }
       // long words split roughly every ~4-5 chars
       if(w.length<=5){ toks.push(w); }
       else { for(var i=0;i<w.length;i+=4){ toks.push(w.slice(i,i+4)); } }
     });
     return toks;
   }
   function draw(){
     var toks=approxTokens(ta.value);
     var words=(ta.value.trim().match(/\S+/g)||[]).length;
     stat.innerHTML="<label>~<b style='color:var(--ember2)'>"+toks.length+"</b> tokens</label>"+
       "<label><b style='color:var(--teal)'>"+words+"</b> words</label>"+
       "<label><b style='color:var(--mut)'>"+ta.value.length+"</b> chars</label>"+
       "<label style='color:var(--dim)'>&#8776; "+(toks.length/Math.max(1,words)).toFixed(2)+" tokens/word</label>";
     pills.innerHTML="";
     toks.slice(0,120).forEach(function(t,i){
       var c=cols[i%cols.length];
       pills.appendChild(el("span",{style:"font-family:var(--mono);font-size:12.5px;padding:2px 7px;border-radius:6px;background:"+c+"22;border:1px solid "+c+";color:var(--ink)"}, t.replace(/</g,"&lt;")));
     });
     if(toks.length>120)pills.appendChild(el("span",{style:"color:var(--dim);font-size:12px;align-self:center"},"+"+(toks.length-120)+" more"));
   }
   ta.addEventListener("input",draw); draw();
 }
};

/* ---------------- 1.3 Model chooser ---------------- */
W["1.3"] = {
 t:"Pick the right brain",
 short:"Set task difficulty, volume, and priority — get the model tier a pro would reach for.",
 guide:"There's no single best model &#8212; there's the <b>right tier for the job</b>. Set the dials and see which Claude tier fits, and why.",
 note:"The real skill is matching tier to task: do not pay Opus prices for Haiku work, and do not send the hardest reasoning to the cheapest model.",
 build:function(root){
   var wrap=el("div"); root.appendChild(wrap);
   function seg(label,opts,id){
     var row=el("div",{class:"wrow"}); row.appendChild(el("label",null,label));
     var box=el("div",{style:"display:flex;gap:6px",id:id});
     opts.forEach(function(o,i){ var b=el("button",{class:"wbtn"+(i===1?" on":""),"data-v":o},o); box.appendChild(b); });
     row.appendChild(box); wrap.appendChild(row); return box;
   }
   var diff=seg("Task difficulty","Simple,Medium,Hard".split(","),"d1");
   var vol=seg("Volume","Low,High".split(","),"d2");
   var prio=seg("Priority","Cost,Balanced,Quality".split(","),"d3");
   var out=el("div",{style:"margin-top:14px;padding:14px 16px;border-radius:12px;border:1px solid var(--line2);background:var(--bg1)"}); wrap.appendChild(out);
   function val(box){ var b=box.querySelector(".on"); return b?b.getAttribute("data-v"):null; }
   [diff,vol,prio].forEach(function(box){ box.querySelectorAll(".wbtn").forEach(function(b){ b.addEventListener("click",function(){ box.querySelectorAll(".wbtn").forEach(function(x){x.classList.remove("on");}); b.classList.add("on"); decide(); }); }); });
   function decide(){
     var d=val(diff),v=val(vol),p=val(prio);
     var score=(d==="Hard"?2:d==="Medium"?1:0)+(p==="Quality"?1.5:p==="Balanced"?0.5:0)-(v==="High"&&p==="Cost"?1:0);
     var m,c,why;
     if(score>=2.2){ m="Opus"; c="#b79cff"; why="the reasoning is hard and quality matters most &#8212; worth the higher cost and slower speed."; }
     else if(score>=0.8){ m="Sonnet"; c="#ffb454"; why="a balanced task &#8212; strong capability without top-tier cost. The everyday default."; }
     else { m="Haiku"; c="#4fd6b5"; why="simpler and/or high-volume &#8212; fast and cheap is the smart call; save the big models for hard work."; }
     if(d==="Hard"&&m==="Haiku"){ m="Sonnet"; c="#ffb454"; why="hard tasks need real capability &#8212; step up from Haiku even on a budget."; }
     out.innerHTML="<div style='font-size:15px'>Reach for <b style='color:"+c+";font-size:18px'>"+m+"</b></div>"+
       "<div style='color:var(--mut);font-size:13.5px;margin-top:6px'>Because "+why+"</div>";
   }
   decide();
 }
};

/* ---------------- 9.6 Cost & caching calculator ---------------- */
W["9.6"] = {
 t:"Unit-economics & caching calculator",
 short:"Plug in calls and tokens; see monthly cost and how prompt caching slashes it.",
 guide:"Products live or die on <b>unit economics</b>. Enter your usage and an illustrative price, then see monthly cost &#8212; and how <b>prompt caching</b> a large shared prefix changes the math.",
 note:"Rates here are illustrative sliders for intuition, not official prices &#8212; always verify current pricing before you rely on numbers.",
 build:function(root){
   var wrap=el("div"); root.appendChild(wrap);
   function num(label,val,id,step){ var row=el("div",{class:"wrow"}); row.appendChild(el("label",null,label)); var inp=el("input",{type:"number",value:val,id:id,min:"0",step:step||"1",style:"width:120px"}); row.appendChild(inp); wrap.appendChild(row); return inp; }
   var calls=num("Calls per day","2000","c_calls");
   var inTok=num("Input tokens / call","1500","c_in");
   var cacheTok=num("...of which cacheable (shared prefix)","1100","c_cache");
   var outTok=num("Output tokens / call","400","c_out");
   var rowP=el("div",{class:"wrow"}); rowP.appendChild(el("label",null,"Illustrative rate ($ / million tokens)"));
   var inRate=el("input",{type:"number",value:"3",id:"c_ir",step:"0.5",style:"width:90px"}); var outRate=el("input",{type:"number",value:"15",id:"c_or",step:"0.5",style:"width:90px"});
   rowP.appendChild(el("span",{style:"color:var(--mut);font-size:12px"},"in")); rowP.appendChild(inRate);
   rowP.appendChild(el("span",{style:"color:var(--mut);font-size:12px"},"out")); rowP.appendChild(outRate); wrap.appendChild(rowP);
   var out=el("div",{style:"margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:10px"}); wrap.appendChild(out);
   function card(title,val,c){ return "<div style='padding:12px 14px;border-radius:12px;border:1px solid "+c+";background:"+c+"14'><div style='color:var(--mut);font-size:12px'>"+title+"</div><div style='color:"+c+";font-size:20px;font-weight:700;margin-top:3px'>"+val+"</div></div>"; }
   function money(x){ return "$"+(x>=1000?(x/1000).toFixed(1)+"k":x.toFixed(2)); }
   function calc(){
     var C=+calls.value||0, I=+inTok.value||0, K=clamp(+cacheTok.value||0,0,I), O=+outTok.value||0, IR=+inRate.value||0, OR=+outRate.value||0;
     var perCallNoCache=(I*IR + O*OR)/1e6;
     // cached input billed at ~10% (illustrative)
     var perCallCache=((I-K)*IR + K*IR*0.1 + O*OR)/1e6;
     var mNo=perCallNoCache*C*30, mYes=perCallCache*C*30;
     var save=mNo>0?(1-mYes/mNo)*100:0;
     out.innerHTML=card("Per call (no cache)",money(perCallNoCache)+"",  "#ff7a9c")+
       card("Per call (cached)",money(perCallCache),"#7dd97a")+
       card("Monthly (no cache)",money(mNo),"#ff7a9c")+
       card("Monthly (cached)",money(mYes),"#7dd97a");
     wrap.querySelector("#saveline")&&wrap.removeChild(wrap.querySelector("#saveline"));
     var sv=el("div",{id:"saveline",style:"margin-top:12px;font-size:14px;color:var(--teal)"},"Caching the shared prefix cuts about <b>"+save.toFixed(0)+"%</b> of monthly spend here. That percentage is often the difference between a viable product and a money-loser.");
     wrap.appendChild(sv);
   }
   [calls,inTok,cacheTok,outTok,inRate,outRate].forEach(function(i){ i.addEventListener("input",calc); });
   calc();
 }
};

/* ---------------- 10.1 Agent loop stepper ---------------- */
W["10.1"] = {
 t:"Step through the agent loop",
 short:"Advance a live agent one step at a time: think, act, observe, decide — until the goal is met.",
 guide:"An agent is a <b>goal plus a loop</b>. Press Step to advance it through think &#8594; act &#8594; observe &#8594; decide, and watch it work toward a goal (here: find a customer's latest order).",
 note:"Real agents run this loop automatically. The engineering that matters is bounding it, verifying results, and gating consequential actions.",
 build:function(root){
   var wrap=el("div"); root.appendChild(wrap);
   var nodes=[["Think","#ff8a54"],["Act","#ffd24d"],["Observe","#4fd6b5"],["Decide","#b79cff"]];
   var svg='<svg viewBox="0 0 520 120" style="width:100%;height:auto">';
   nodes.forEach(function(n,i){ svg+='<g id="wn'+i+'"><rect x="'+(20+i*126)+'" y="35" width="104" height="50" rx="12" fill="'+n[1]+'1e" stroke="'+n[1]+'"/><text x="'+(72+i*126)+'" y="65" fill="'+n[1]+'" font-size="15" text-anchor="middle" font-weight="700" font-family="Inter,sans-serif">'+n[0]+'</text></g>'; if(i<3)svg+='<path d="M'+(124+i*126)+' 60 H'+(142+i*126)+'" stroke="#8a7c6a" stroke-width="2"/>'; });
   svg+='</svg>';
   var stage=el("div",null,svg); wrap.appendChild(stage);
   var log=el("div",{style:"margin-top:12px;min-height:96px;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:#0e0b09;font-family:var(--mono);font-size:12.5px;color:var(--ink);line-height:1.7"}); wrap.appendChild(log);
   var ctr=el("div",{class:"wrow"}); var step=el("button",{class:"wbtn"},"▶ Step"); var reset=el("button",{class:"wbtn"},"↺ Reset"); ctr.appendChild(step); ctr.appendChild(reset); wrap.appendChild(ctr);
   var script=[
     [0,"Goal: find customer #4021's latest order. I need to look it up."],
     [1,"Calling tool get_orders(customer=4021)..."],
     [2,"Tool returned 3 orders; latest is #A-902, placed 2 days ago."],
     [3,"I have the order. Goal not fully done &#8212; user also asked for its status."],
     [0,"I still need the shipping status of #A-902."],
     [1,"Calling tool get_status(order=A-902)..."],
     [2,"Tool returned: shipped, arriving tomorrow."],
     [3,"Goal met. I can now answer the user. ✓ Done."]
   ];
   var i=0;
   function highlight(idx){ nodes.forEach(function(n,k){ var g=document.getElementById("wn"+k); if(g){ g.querySelector("rect").setAttribute("stroke-width", k===idx?"3":"1"); g.style.filter=k===idx?"drop-shadow(0 0 6px "+n[1]+")":"none"; } }); }
   function render(){ log.innerHTML=script.slice(0,i).map(function(s){ return "<div><span style='color:"+nodes[s[0]][1]+"'>"+nodes[s[0]][0].toUpperCase()+"</span> &#8212; "+s[1]+"</div>"; }).join("")||"<span style='color:var(--dim)'>Press Step to run the agent.</span>"; if(i>0)highlight(script[i-1][0]); else highlight(-1); }
   step.addEventListener("click",function(){ if(i<script.length){ i++; render(); } });
   reset.addEventListener("click",function(){ i=0; render(); });
   render();
 }
};

/* ---------------- 11.4 Pricing model comparator ---------------- */
W["11.4"] = {
 t:"Hourly vs project vs retainer",
 short:"See why AI-speed delivery makes value-based pricing beat hourly for the same work.",
 guide:"AI makes you fast &#8212; which <b>helps or hurts</b> depending on how you price. Set how long a deliverable takes you and what it's worth, and compare monthly income across pricing models.",
 note:"The lesson in numbers: when AI makes delivery fast, hourly pricing gives the value away; value-based project and retainer pricing capture your speed as margin.",
 build:function(root){
   var wrap=el("div"); root.appendChild(wrap);
   function rng(label,min,max,val,id,fmt){ var row=el("div",{class:"wrow"}); var lab=el("label",null,label+" <b id='"+id+"v' style='color:var(--ember2);margin-left:6px'></b>"); var inp=el("input",{type:"range",min:min,max:max,value:val,id:id}); row.appendChild(lab); row.appendChild(inp); wrap.appendChild(row); inp._fmt=fmt; return inp; }
   var hrs=rng("Hours per deliverable",0.5,20,3,"p_h",function(v){return v+" h";});
   hrs.step="0.5";
   var rate=rng("Your hourly rate",20,250,75,"p_r",function(v){return "$"+v;});
   rate.step="5";
   var value=rng("Client value per deliverable",100,5000,900,"p_v",function(v){return "$"+v;});
   value.step="50";
   var perMonth=rng("Deliverables per month",1,40,12,"p_n",function(v){return ""+v;});
   var out=el("div",{style:"margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px"}); wrap.appendChild(out);
   var note=el("div",{style:"margin-top:12px;font-size:13.5px;color:var(--mut)"}); wrap.appendChild(note);
   function card(t,v,c,sub){ return "<div style='padding:12px 14px;border-radius:12px;border:1px solid "+c+";background:"+c+"14'><div style='color:var(--mut);font-size:12px'>"+t+"</div><div style='color:"+c+";font-size:19px;font-weight:700;margin-top:3px'>$"+v.toLocaleString()+"</div><div style='color:var(--dim);font-size:11px;margin-top:2px'>"+sub+"</div></div>"; }
   function upd(){
     [hrs,rate,value,perMonth].forEach(function(i){ var b=document.getElementById(i.id+"v"); if(b)b.textContent=i._fmt(+i.value); });
     var h=+hrs.value,r=+rate.value,v=+value.value,n=+perMonth.value;
     var hourly=Math.round(h*r*n);
     var project=Math.round(v*0.5*n); // value-priced at ~50% of value delivered
     var retainer=Math.round(v*0.5*n*1.15); // retainer premium for commitment/stability
     out.innerHTML=card("Hourly",hourly,"#ff7a9c",r+"/h &#215; "+h+"h &#215; "+n)+
       card("Project (value-based)",project,"#ffd24d","~50% of value &#215; "+n)+
       card("Retainer",retainer,"#7dd97a","project + stability premium");
     var faster=project>hourly;
     note.innerHTML=faster
       ? "At this speed, <b style='color:var(--teal)'>value-based pricing earns more</b> &#8212; because you're paid for the outcome, not the few hours it takes. Your speed becomes margin."
       : "Here hourly happens to win &#8212; usually because the work is slow or the value is low. As you get faster (or the value rises), value-based pricing pulls ahead. That's the AI-speed advantage.";
   }
   [hrs,rate,value,perMonth].forEach(function(i){ i.addEventListener("input",upd); });
   upd();
 }
};

})();
