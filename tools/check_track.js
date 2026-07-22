// usage: node tools/check_track.js content/trackNN.js
const fs=require('fs');
global.window={};
eval(fs.readFileSync('curriculum.js','utf8'));
global.PB=window.PB; // browser globals shim
const file=process.argv[2];
eval(fs.readFileSync(file,'utf8'));
const L=window.LESSONS,ids=Object.keys(L);
let issues=[];
ids.forEach(id=>{const l=L[id];
 (l.quiz||[]).forEach((q,i)=>{
   if(q.a==null||q.a<0||q.a>=q.opts.length)issues.push(id+' q'+(i+1)+' bad answer idx');
   if(!q.why||q.why.length!==q.opts.length)issues.push(id+' q'+(i+1)+' why/opts mismatch');
 });
 ['sub','breath','hook','secs','quiz','prac','recap','bridge'].forEach(k=>{if(!l[k])issues.push(id+' missing '+k)});
 if(!l.mistakes||l.mistakes.length<3)issues.push(id+' <3 mistakes');
 if((l.quiz||[]).length<3)issues.push(id+' <3 quiz');
 if((l.prac||[]).length<2)issues.push(id+' <2 practice');
 // raw < eating text: strip valid tags then look for <letter
 const html=[l.hook,(l.secs||[]).map(s=>s.b).join(''),l.worked&&l.worked.html,l.lab&&l.lab.html,(l.mistakes||[]).join(''),l.recap,l.bridge,l.deep].join(' ');
 const stripped=String(html).replace(/<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*?)?\/?>/g,'');
 const bad=stripped.match(/<[A-Za-z\/]/g);
 if(bad)issues.push(id+' raw < risk: '+bad.length+' spots');
});
console.log(file+': '+ids.length+' lessons');
if(issues.length){console.log('ISSUES:\n'+issues.join('\n'));process.exit(1)}
console.log('INTEGRITY OK');
