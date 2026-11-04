/* Pass 2 — Track 8 (MCP). Protocol shape (tools/list, tools/call, stdio vs
   remote with OAuth) and the mcp 2.x SDK as verified in pass 1 (8.4 ran under
   mcp 2.3.0). The lethal trifecta follows the lesson's own framing. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 8.1 ---------- */
function mn81(m,n,mcp){
  var s=VZ.scene(400,250,"Without MCP every app needs a custom connector to every tool; with MCP each side builds one adapter");
  var gap=Math.min(40,200/Math.max(m,n));
  var A=[],T=[];
  for(var i=0;i<m;i++)A.push({x:14,y:20+i*gap,w:90,h:Math.min(30,gap-6),cx:59,cy:20+i*gap+Math.min(30,gap-6)/2});
  for(var j=0;j<n;j++)T.push({x:296,y:20+j*gap,w:90,h:Math.min(30,gap-6),cx:341,cy:20+j*gap+Math.min(30,gap-6)/2});
  if(mcp){var hub={x:160,y:90,w:80,h:56,cx:200,cy:118};
    A.forEach(function(a){s.path("M104 "+a.cy+" L160 118",{noarrow:1})});T.forEach(function(t){s.path("M240 118 L296 "+t.cy,{noarrow:1})});
    s.box(160,90,80,56,"MCP","one standard","a");}
  else A.forEach(function(a){T.forEach(function(t){s.path("M104 "+a.cy+" L296 "+t.cy,{noarrow:1,tone:"r"})})});
  A.forEach(function(a,i){s.box(a.x,a.y,a.w,a.h,"AI app "+(i+1),null,"b",{rx:6})});
  T.forEach(function(t,j){s.box(t.x,t.y,t.w,t.h,"Tool "+(j+1),null,"g",{rx:6})});
  s.text(200,238,(mcp?(m+n)+" adapters (M + N)":(m*n)+" custom connectors (M × N)"),"sm h");
  return s.svg();
}
E["8.1"]={
  plain:"<p>AI apps are more useful when they can reach your tools, like a calendar, a database or GitHub. Before, every app needed its own custom connection to every tool.</p><p>The <b>Model Context Protocol (MCP)</b> is one shared standard for those connections. A tool offers itself once through a small program called an <b>MCP server</b>. Any AI app that speaks MCP, called a <b>client</b>, can then use it.</p><p>Anthropic released it as an open standard, and other AI companies adopted it too.</p>",
  map:[["A gadget","A tool or data source (GitHub, a database)"],["The USB-C plug on the gadget","The MCP server"],["The USB-C port on the laptop","The MCP client inside the AI app"],["One cable standard for everything","The protocol"]],
  breaks:"A USB-C cable just carries power and data. An MCP server also describes its tools in words that the AI reads and acts on, so a badly written or hostile description changes what the AI does.",
  viz:{cap:"Slide the number of apps and tools. Without a standard the wires multiply; with MCP each side builds one adapter."},
  play:{t:"Count the connectors",inFig:1,build:function(root){
    var mcp=0;root.innerHTML='<label class="sm">AI apps: <b id="m81">3</b></label><input type="range" id="r81a" min="1" max="5" value="3"><label class="sm">Tools: <b id="n81">4</b></label><input type="range" id="r81b" min="1" max="5" value="4"><button class="wbtn" id="b81">Switch MCP on</button><div id="v81"></div>';
    var a=root.querySelector("#r81a"),b=root.querySelector("#r81b"),bt=root.querySelector("#b81");
    function draw(){root.querySelector("#m81").textContent=a.value;root.querySelector("#n81").textContent=b.value;bt.textContent=mcp?"Switch MCP off":"Switch MCP on";root.querySelector("#v81").innerHTML=mn81(+a.value,+b.value,mcp);}
    a.addEventListener("input",draw);b.addEventListener("input",draw);bt.addEventListener("click",function(){mcp=mcp?0:1;draw()});draw();}},
  line:"MCP is one standard plug, so any AI app can use any tool that offers it."
};

/* ---------- 8.2 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Who made it?",s:"official, known, or\na stranger",tone:"g"},
    {t:"What can it reach?",s:"read its tools\nand permissions",tone:"b"},
    {t:"Connect narrowly",s:"least access,\none folder / scope",tone:"a"},
    {t:"Test on safe data",s:"calibrate before\nyou rely on it",tone:"e"}
  ],{cols:2,bh:72,gy:32,stepped:true,aria:"Checks before and after connecting an MCP server"});
  E["8.2"]={
    plain:"<p>Adding an MCP server is easy: one command, or a few clicks in the app. The care is in what you do around that step.</p><p>Before connecting, check who made it and what it will be able to reach. When connecting, give it the least access that does the job. After connecting, test it on harmless data before you trust it with real work.</p><p>A server is code with reach into your accounts, so treat it like installing software.</p>",
    map:[["A stranger's pen drive","An unknown MCP server"],["Checking where it came from","Source trust"],["Only opening one folder from it","Least-privilege configuration"],["Trying it on a spare computer","Testing on safe data first"]],
    breaks:"A pen drive just holds files. A server keeps running and can change what it does in an update, so re-check servers you rely on from time to time.",
    viz:{svg:s.svg(),cap:"Two checks before you connect, two after. The connection itself is the easy part.",
      steps:["Check the source: official, a known vendor, or an unknown author?","Read what tools it exposes and what accounts it can touch.","Connect with the narrowest access that does the job.","Try it on harmless data and see how it behaves before relying on it."]},
    line:"Check where an MCP server came from and what it can touch before you plug it in."
  };
})();

/* ---------- 8.3 ---------- */
(function(){
  var s=VZ.scene(400,250,"Local MCP servers run on your machine over stdio; remote servers run as hosted services with OAuth sign-in");
  s.text(100,14,"LOCAL","sm h");s.text(300,14,"REMOTE","sm h");
  var c1=s.box(14,28,172,46,"Claude app",null,"b"),l=s.box(14,112,172,60,"Server on\nyour computer","talks over stdio","g");
  s.link(c1,l);s.text(100,196,"data stays on your machine","sm");
  var c2=s.box(214,28,172,46,"Claude app",null,"b"),r=s.box(214,112,172,60,"Vendor's server","over HTTPS","v");
  s.link(c2,r,"OAuth sign-in",{lx:2});s.text(300,196,"data passes through the vendor","sm");
  s.box(14,214,372,30,"Find both in registries; vet remote ones",null,"n",{rx:8});
  E["8.3"]={
    plain:"<p>Some MCP servers run on your own computer. Others are <b>remote</b>: a company runs them online, and you sign in to them, usually with OAuth (the «Sign in with Google» kind of login).</p><p>Remote servers connect Claude to online services like project trackers and CRMs. They also mean your data passes through that company's systems.</p><p>You find servers in registries and directories. Judge a remote one the way you'd judge any vendor.</p>",
    map:[["An app store","An MCP registry or directory"],["Reviews and permissions on the listing","What a server says it can do"],["An app that needs your account","A remote server with OAuth sign-in"]],
    breaks:"An app store checks apps before listing them. Directories vary in how much they check, so the listing alone isn't proof a server is safe.",
    viz:{svg:s.svg(),cap:"Same protocol, two homes. Where the server runs decides where your data goes."},
    line:"Remote MCP servers are online services you sign into, so judge them like any company you share data with."
  };
})();

/* ---------- 8.4 ---------- */
(function(){
  var s=VZ.scene(400,276,"Anatomy of a small MCP server and how Claude Code calls it");
  var f=s.box(14,14,180,110,"server.py","a function\n+ typed inputs (schema)\n+ a clear description","g",{step:0});
  var srv=s.box(230,30,156,64,"MCPServer","lists tools, runs them","a",{step:1});
  s.link(f,srv,"@tool",{step:1});
  var add=s.box(14,152,180,56,"claude mcp add","--transport stdio","b",{step:2});
  var cc=s.box(230,152,156,56,"Claude Code","sees the tools","t",{step:3});
  s.link(add,cc,null,{step:2});s.link(cc,srv,"tools/call",{step:3,bend:30});
  s.box(14,232,372,36,"Result comes back · Claude uses it in its answer",null,"e",{step:4,rx:8});
  E["8.4"]={
    plain:"<p>An MCP server is a small program. With the official Python SDK, each tool is just a function, the types of its inputs, and a short description.</p><p>You register the server with Claude Code using <code>claude mcp add</code>. Claude then sees your tools and can call them when they help.</p><p>The description matters most. It's how Claude decides when and how to use the tool.</p>",
    map:[["Your gadget","A system you own, like an expenses file"],["The plug you build","Your MCP server"],["The labels on its buttons","Tool names and descriptions"],["Plugging it in","claude mcp add"]],
    breaks:"Button labels are read by people who can ask questions. Claude only has your description, so vague wording leads to wrong calls.",
    viz:{svg:s.svg(),cap:"From a Python function to a tool Claude can call. Step through the path.",
      steps:["You write a function, give its inputs types, and describe it in plain words.","The SDK's MCPServer turns that into a tool it can list and run.","You register the server with claude mcp add.","Claude Code sees the tool and calls it when it helps (a tools/call request).","The result goes back to Claude, which uses it in its answer."]},
    line:"An MCP server is a few described functions that any AI can call."
  };
})();

/* ---------- 8.5 ---------- */
var T85=[["Private data","your email, files","b"],["Untrusted content","web pages, emails","g"],["A way out","send, post, fetch a URL","v"]];
function tri85(on){
  var s=VZ.scene(400,250,"The lethal trifecta: private data, untrusted content and a way out");
  var pos=[[130,14],[14,150],[246,150]];
  var B=T85.map(function(t,i){return s.box(pos[i][0],pos[i][1],140,62,t[0],t[1],on[i]?t[2]:"n",{cls:on[i]?"":"off"})});
  var all=on[0]&&on[1]&&on[2];
  s.path("M150 78 L96 146",{noarrow:1,dash:!(on[0]&&on[1])});s.path("M250 78 L304 146",{noarrow:1,dash:!(on[0]&&on[2])});s.path("M156 181 H244",{noarrow:1,dash:!(on[1]&&on[2])});
  s.box(140,104,120,36,all?"DANGER":"contained",null,all?"r":"e",{rx:8});
  return s.svg();
}
E["8.5"]={
  plain:"<p><b>Prompt injection</b> is when text hidden in something Claude reads, like a web page or an email, tries to give it orders.</p><p>It gets truly dangerous when one agent has all three of these at once: access to your private data, exposure to untrusted content, and a way to send things out. Together they're called the <b>lethal trifecta</b>.</p><p>The best defence is to remove one of the three. Where you can't, add approvals and limits, and assume injection will happen.</p>",
  map:[["The house keys","Private data the agent can read"],["Letters from strangers","Untrusted content (pages, emails, files)"],["A phone to call out","A way to send data away (email, web requests)"],["The tricky letter","A prompt injection"]],
  breaks:"A sensible helper might spot a suspicious letter. A model can't reliably tell instructions from data, so don't rely on it noticing the trick.",
  viz:{cap:"Toggle the three powers. The agent is only in the danger zone when all three are on together."},
  play:{t:"Break the trifecta",inFig:1,build:function(root){
    var on=[1,1,1];root.innerHTML='<div id="b85" style="display:flex;flex-wrap:wrap;gap:6px"></div><div id="v85"></div><div class="vpout" id="o85"></div>';
    var bx=root.querySelector("#b85");
    T85.forEach(function(t,i){var b=document.createElement("button");b.className="wbtn";b.addEventListener("click",function(){on[i]=on[i]?0:1;draw()});bx.appendChild(b)});
    function draw(){[].forEach.call(bx.children,function(b,i){b.textContent=(on[i]?"Remove ":"Add ")+T85[i][0].toLowerCase()});
      root.querySelector("#v85").innerHTML=tri85(on);var all=on[0]&&on[1]&&on[2];
      root.querySelector("#o85").innerHTML=all?"<b>All three present.</b> One poisoned web page could tell the agent to send your private data out.":"<b>Trifecta broken.</b> An injection can still cause trouble, but it can't both reach your secrets and send them away.";}
    draw();}},
  line:"Never give one AI your secrets, strangers' text and a way to send things out, all at once."
};
})();
