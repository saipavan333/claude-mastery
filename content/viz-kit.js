/* Viz kit (pass 2, 2026-11-04): a tiny scene builder for mechanism diagrams.
   Every diagram is plain inline SVG with a viewBox and width:100%, coloured
   only through CSS classes that read the course's CSS variables (styles.css,
   ".vz" rules), so nothing is hard-coded to one theme.
   Usage:  var s=VZ.scene(480,260,"aria label");
           var a=s.box(20,20,120,56,"Title","small sub","t");
           var b=s.box(200,20,120,56,"Next");  s.link(a,b,"label");
           s.svg()  -> "<svg ...>...</svg>"
   Boxes/links/labels can carry {step:n}; the lesson renderer turns any
   diagram whose spec has steps:[...] into a Prev/Next stepper.
   window.EASE[id] = {plain, an, map, breaks, viz:{svg,cap,steps}, play, line}
   is filled by content/ease/tNN.js and rendered by app.js. */
window.EASE = window.EASE || {};
window.VZ = (function(){
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
  function st(o){return (o&&o.step!=null)?' data-step="'+o.step+'"':''}
  var uid=0;
  function scene(W,H,label){
    var parts=[],id="m"+(++uid)+Math.floor(Math.random()*1e4);
    var S={W:W,H:H,id:id};
    /* multi-line text: lines split on \n, centred block around y */
    S.text=function(x,y,str,cls,anchor,o){
      var lines=String(str).split("\n"),lh=(cls&&cls.indexOf("sm")>=0)?15:18;
      var y0=y-(lines.length-1)*lh/2;
      parts.push('<text class="'+(cls||"tx")+'" x="'+x+'" y="'+y0+'" text-anchor="'+(anchor||"middle")+'" dominant-baseline="middle"'+st(o)+'>'+
        lines.map(function(l,i){return '<tspan x="'+x+'" dy="'+(i?lh:0)+'">'+esc(l)+'</tspan>'}).join("")+'</text>');
      return S;
    };
    S.box=function(x,y,w,h,title,sub,tone,o){
      o=o||{};
      var b={x:x,y:y,w:w,h:h,cx:x+w/2,cy:y+h/2};
      parts.push('<g class="vzb k-'+(tone||"n")+(o.cls?" "+o.cls:"")+'"'+st(o)+'><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(o.rx!=null?o.rx:10)+'"/>');
      var tl=String(title||"").split("\n").length, sl=sub?String(sub).split("\n").length:0;
      var blockH=tl*18+(sl?sl*15+4:0), top=b.cy-blockH/2;
      if(title)S.text(b.cx,top+tl*9,title,"tx b");
      if(sub)S.text(b.cx,top+tl*18+4+sl*7.5,sub,"sm");
      parts.push('</g>');
      return b;
    };
    /* point where the ray from the box centre toward (tx,ty) leaves the box */
    function edge(b,tx,ty,pad){
      var dx=tx-b.cx,dy=ty-b.cy;if(!dx&&!dy)return {x:b.cx,y:b.cy};
      var sx=dx?(b.w/2+pad)/Math.abs(dx):1e9,sy=dy?(b.h/2+pad)/Math.abs(dy):1e9,k=Math.min(sx,sy);
      return {x:b.cx+dx*k,y:b.cy+dy*k};
    }
    S.link=function(a,b,label,o){
      o=o||{};
      var p=edge(a,b.cx,b.cy,3),q=edge(b,a.cx,a.cy,5);
      var d,lx,ly;
      if(o.bend){var mx=(p.x+q.x)/2,my=(p.y+q.y)/2,nx=-(q.y-p.y),ny=q.x-p.x,len=Math.hypot(nx,ny)||1;
        var cx=mx+nx/len*o.bend,cy=my+ny/len*o.bend;d="M"+p.x.toFixed(1)+" "+p.y.toFixed(1)+" Q"+cx.toFixed(1)+" "+cy.toFixed(1)+" "+q.x.toFixed(1)+" "+q.y.toFixed(1);
        lx=(p.x+2*cx+q.x)/4;ly=(p.y+2*cy+q.y)/4;}
      else{d="M"+p.x.toFixed(1)+" "+p.y.toFixed(1)+" L"+q.x.toFixed(1)+" "+q.y.toFixed(1);lx=(p.x+q.x)/2;ly=(p.y+q.y)/2;}
      S.path(d,o);
      if(label)S.label(lx+(o.lx||0),ly+(o.ly||0),label,o);
      return S;
    };
    S.path=function(d,o){o=o||{};
      parts.push('<path class="vza'+(o.dash?" dash":"")+(o.tone?" k-"+o.tone:"")+'" d="'+d+'"'+(o.noarrow?'':' marker-end="url(#'+id+'h)"')+st(o)+'/>');return S;};
    /* small label with a background chip so it stays readable over lines */
    S.label=function(x,y,str,o){o=o||{};
      var lines=String(str).split("\n"),w=Math.max.apply(null,lines.map(function(l){return l.length}))*6.6+12,h=lines.length*15+6;
      parts.push('<g class="vzl"'+st(o)+'><rect x="'+(x-w/2).toFixed(1)+'" y="'+(y-h/2).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h+'" rx="6"/>');
      S.text(x,y,str,"sm l");parts.push('</g>');return S;};
    S.bar=function(x,y,w,h,frac,tone,o){
      parts.push('<g class="vzbar k-'+(tone||"t")+'"'+st(o)+'><rect class="tr" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+Math.min(6,h/2)+'"/><rect class="fl" x="'+x+'" y="'+y+'" width="'+Math.max(0,w*Math.min(1,frac)).toFixed(1)+'" height="'+h+'" rx="'+Math.min(6,h/2)+'"/></g>');return S;};
    S.raw=function(s){parts.push(s);return S;};
    S.svg=function(){
      return '<svg class="vz" viewBox="0 0 '+W+' '+H+'" style="max-width:'+Math.round(W*1.3)+'px" role="img" aria-label="'+esc(label||"diagram")+'"><defs><marker id="'+id+'h" viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="8" refY="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="vzh"/></marker></defs>'+parts.join("")+'</svg>';
    };
    return S;
  }
  /* boustrophedon flow: steps [{t,s,tone}] in rows of `cols`, row 2 runs right-to-left
     so every arrow joins neighbours. opts: {cols,w,bh,gap,title,loop:"label"} */
  function flow(steps,o){
    o=o||{};var cols=o.cols||2,W=o.w||400,gx=o.gap||34,gy=o.gy||40,bh=o.bh||64,m=14,top=o.title?34:14;
    var bw=(W-2*m-(cols-1)*gx)/cols,rows=Math.ceil(steps.length/cols),H=top+rows*bh+(rows-1)*gy+(o.loop?44:14);
    var s=scene(W,H,o.aria||o.title||"flow"),B=[];
    if(o.title)s.text(W/2,18,o.title,"sm h");
    steps.forEach(function(p,i){var r=Math.floor(i/cols),c=i%cols;if(r%2)c=cols-1-c;
      B.push(s.box(m+c*(bw+gx),top+r*(bh+gy),bw,bh,p.t,p.s,p.tone||"n",{step:o.stepped?i:null}));});
    for(var i=1;i<B.length;i++)s.link(B[i-1],B[i],steps[i].via||null,{step:o.stepped?i:null});
    if(o.loop){var a=B[B.length-1],b=B[0],y=H-16;
      s.path("M"+a.cx+" "+(a.y+a.h+3)+" V"+y+" H"+(b.x-6>m?b.cx:b.cx)+" V"+(b.y+b.h+5),{dash:1,step:o.stepped?steps.length:null});
      if(B.length<=cols){/* single row: loop runs under the boxes */}
      s.label(W/2,y,o.loop,{step:o.stepped?steps.length:null});}
    s.boxes=B;return s;
  }
  /* cycle: boxes around an ellipse, arrows between neighbours, optional centre */
  function cycle(steps,o){
    o=o||{};var W=o.w||400,H=o.h||300,bw=o.bw||128,bh=o.bh||58,cx=W/2,cy=H/2,rx=(W-bw)/2-14,ry=(H-bh)/2-12;
    var s=scene(W,H,o.aria||"cycle"),B=[],n=steps.length;
    steps.forEach(function(p,i){var a=-Math.PI/2+i*2*Math.PI/n;
      B.push(s.box(cx+rx*Math.cos(a)-bw/2,cy+ry*Math.sin(a)-bh/2,bw,bh,p.t,p.s,p.tone||"n",{step:o.stepped?i:null}));});
    B.forEach(function(b,i){var nb=B[(i+1)%n];s.link(b,nb,steps[(i+1)%n].via||null,{bend:o.bend!=null?o.bend:-22,step:o.stepped?(i+1)%n:null});});
    if(o.center)s.text(cx,cy,o.center,"sm c");
    s.boxes=B;return s;
  }
  /* fan: one source box on the left/top, many targets, optional merge box */
  function fan(src,kids,o){
    o=o||{};var W=o.w||400,n=kids.length,bh=o.bh||48,gy=o.gy||12,H=Math.max(o.h||0,n*bh+(n-1)*gy+28);
    var s=scene(W,H,o.aria||"fan"),cw=o.cw||128;
    var A=s.box(12,(o.sh?H/2-o.sh/2:H/2-32),cw,o.sh||64,src.t,src.s,src.tone||"a");
    var mid=o.merge?(W-cw)/2:W-12-(o.kw||150),kw=o.kw||150,K=[];
    kids.forEach(function(k,i){var y=14+i*(bh+gy);K.push(s.box(mid,y,kw,bh,k.t,k.s,k.tone||"t",{step:o.stepped?i:null}));s.link(A,K[i],k.via||null,{step:o.stepped?i:null});});
    var M=null;if(o.merge){M=s.box(W-12-cw,H/2-32,cw,64,o.merge.t,o.merge.s,o.merge.tone||"g",{step:o.stepped?n:null});K.forEach(function(k){s.link(k,M,null,{step:o.stepped?n:null})});}
    s.src=A;s.kids=K;s.merge=M;return s;
  }
  return {scene:scene,flow:flow,cycle:cycle,fan:fan,esc:esc};
})();
