/* Pass 2 — Track 13 (Get Hired). Salary figures and exam fees were not
   re-verified in pass 1, so the simple layer quotes none. */
(function(){
var E=window.EASE, VZ=window.VZ;

/* ---------- 13.1 ---------- */
(function(){
  var s=VZ.scene(400,250,"What employers pay a premium for: four applied skills combined");
  var k=[["Build","agents, apps, APIs","b"],["Operate","run it every day","t"],["Verify","evals, checks","g"],["Secure","injection, privilege","r"]];
  var B=k.map(function(p,i){return s.box(14+(i%2)*200,14+Math.floor(i/2)*76,186,62,p[0],p[1],p[2])});
  var r=s.box(100,176,200,58,"AI-native role","the premium sits here","a");
  B.forEach(function(b){s.link(b,r)});
  E["13.1"]={
    plain:"<p>Companies now hire for AI-native roles, like AI engineer, automation specialist and AI operator. These roles pay a premium.</p><p>Employers increasingly care about applied skill more than theory: can you <b>build</b> with AI, <b>run</b> it day to day, <b>check</b> it works, and keep it <b>secure</b>? Those four are what this course trains.</p><p>The detailed pay data is under «Going deeper».</p>",
    map:[["Colleges opening new seats","Companies creating AI roles"],["The subjects they want","Build, operate, verify, secure"],["Choosing your stream","Choosing which role to aim for"]],
    breaks:"College seats are announced once a year. The AI job market shifts every few months, so check current postings before you plan.",
    viz:{svg:s.svg(),cap:"Each skill alone is common. All four together is the scarce profile."},
    line:"Employers pay most for people who can build, run, check and secure AI systems."
  };
})();

/* ---------- 13.2 ---------- */
(function(){
  var s=VZ.scene(400,236,"Certificates open the door; the portfolio gets you picked");
  var c=s.box(14,24,150,64,"Certificate","proves you passed\na test","v");
  var p=s.box(14,130,150,64,"Portfolio","proves you can\ndo the work","e");
  var d=s.box(220,24,166,64,"Gets you noticed","screening, HR","b"),h=s.box(220,130,166,64,"Gets you hired","the final decision","a");
  s.link(c,d);s.link(p,h);s.link(c,h,null,{dash:1});
  s.text(200,222,"a complement, never a replacement","sm h");
  E["13.2"]={
    plain:"<p>Anthropic offers a ladder of Claude certifications, from foundation level up to professional.</p><p>A certificate is a useful signal and a good study goal. But it only proves you passed a test.</p><p>Employers still want to see real work. So treat certificates as an extra on top of a portfolio, never as a replacement for one.</p>",
    map:[["The swimming certificate","A Claude certification"],["The coach watching you swim","An employer looking at your projects"],["Getting into the pool","Getting past screening"]],
    breaks:"A swimming test checks the same skill a coach wants. Exams check knowledge; jobs need judgement on messy, real problems, which only a portfolio shows.",
    viz:{svg:s.svg(),cap:"The solid arrows show what each one is good for. The dashed line is a weak link."},
    line:"A certificate gets you noticed, but your real projects get you hired."
  };
})();

/* ---------- 13.3 ---------- */
(function(){
  var s=VZ.flow([
    {t:"Problem",s:"who hurt, how much",tone:"r"},
    {t:"What you built",s:"the design, in brief",tone:"a"},
    {t:"Result",s:"a number or a demo",tone:"e"},
    {t:"What it shows",s:"the skill behind it",tone:"v"}
  ],{cols:2,bh:62,gy:30,stepped:true,aria:"Each portfolio project told as a four-part story"});
  E["13.3"]={
    plain:"<p>A <b>portfolio</b> is a small collection of real projects you've built and can show.</p><p>Tell each one as a short story: the problem, what you built, the result, and what it shows about you.</p><p>Make it easy to check: a live demo, the code, or a short video. In this field, showing beats claiming.</p>",
    map:[["Working models on the table","Shipped projects you can demo"],["A poster that says «good at science»","A CV line with no proof"],["Explaining your model to the judges","The problem-built-result story"]],
    breaks:"Judges at a fair stop at every stall. Employers skim, so lead each project with the result in one line.",
    viz:{svg:s.svg(),cap:"Every project page follows the same four beats.",
      steps:["The problem: who had it and what it cost them.","What you built, in a few sentences.","The result: a number, a before-and-after, or a live demo.","What it shows: the skill an employer is buying."]},
    line:"Show real projects as stories: the problem, what you built, and what happened."
  };
})();

/* ---------- 13.4 ---------- */
(function(){
  var s=VZ.cycle([
    {t:"Research",s:"company + role",tone:"b"},
    {t:"Tailor",s:"CV + letter, your voice",tone:"a"},
    {t:"Practise",s:"mock interviews",tone:"v"},
    {t:"Track",s:"pipeline, follow-ups",tone:"g"}
  ],{w:400,h:290,bw:150,bh:62,stepped:true,center:"Claude helps,\nyou decide",aria:"A job search run with Claude"});
  E["13.4"]={
    plain:"<p>Use the AI you've learned to run a better job search.</p><p>Claude can research a company, help tailor your CV to each role, run practice interviews, and help you keep track of every application.</p><p>Keep it in your own voice, and check every fact it writes about you. The way you use AI to job-hunt is itself a demo of your skill.</p>",
    map:[["A study partner","Claude"],["Quizzing you","Mock interviews"],["Spotting weak answers","Feedback on your CV and answers"],["You writing the final answer","Your own voice and facts"]],
    breaks:"A study partner knows you. Claude may invent achievements that sound good, so never send anything about yourself you haven't checked.",
    viz:{svg:s.svg(),cap:"A four-step loop for every application.",
      steps:["Research the company and the role.","Tailor your CV and letter, in your own voice.","Practise the interview with Claude asking hard questions.","Track every application and follow up."]},
    line:"Let Claude help you research, tailor and practise, but keep every word true and yours."
  };
})();

/* ---------- 13.5 ---------- */
(function(){
  var s=VZ.scene(400,236,"Interviews reward demonstrated work and explained judgement");
  var q=s.box(14,20,150,56,"«Why did you\ndo it this way?»",null,"b");
  var a=s.box(214,20,172,56,"Your real project","show, don't claim","e");
  s.link(q,a);
  [["Reliability","how you tested it"],["Security","what could break"],["Economics","what it costs to run"]].forEach(function(p,i){s.box(14+i*128,112,116,62,p[0],p[1],["g","r","v"][i])});
  s.text(200,206,"the judgement theory-only candidates can't show","sm h");
  E["13.5"]={
    plain:"<p>In an AI interview, claiming skill isn't enough. Show it, by walking through a real project.</p><p>The best answers explain your choices: how you tested it, what could go wrong and how you guarded against that, and what it costs to run.</p><p>Prepare with Claude, but answer as yourself.</p>",
    map:[["The viva","The interview"],["«Why did you do it this way?»","Questions about your design choices"],["The student who built it","The candidate with a real project"]],
    breaks:"A viva examiner knows the syllabus. Interviewers vary a lot, so ask what matters to them and connect your answers to it.",
    viz:{svg:s.svg(),cap:"The question leads to your real project; the three boxes are the judgement that wins the offer."},
    line:"Win interviews by showing a real project and explaining why you built it that way."
  };
})();
})();
