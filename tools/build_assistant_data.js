// Regenerates assistant-data.js (the "Ask AI" helper's lesson + glossary index)
// from curriculum.js, content/track*.js and content/glossary.js.
// usage: node tools/build_assistant_data.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = { window: {}, console }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'curriculum.js'), 'utf8'), ctx);
ctx.PB = ctx.window.PB;
fs.readdirSync(path.join(ROOT, 'content')).filter(f => /^track\d+\.js$/.test(f)).sort()
  .forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, 'content', f), 'utf8'), ctx));
vm.runInContext(fs.readFileSync(path.join(ROOT, 'content', 'glossary.js'), 'utf8'), ctx);
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const lessons = [];
ctx.window.TRACKS.forEach(t => t.lessons.forEach(m => {
  const L = ctx.window.LESSONS[m.id] || {};
  lessons.push({ f: m.id, t: m.title, tn: t.title, k: String(t.n),
    x: (L.secs || []).map(s => strip(s.h)).join(' · '), s: strip(L.sub) });
}));
const glossary = (ctx.window.GLOSSARY || []).map(g => ({ term: g.t, desc: strip(g.d) }));
fs.writeFileSync(path.join(ROOT, 'assistant-data.js'), 'window.GD_ASSIST=' + JSON.stringify({ lessons, glossary }) + ';\n');
console.log('assistant-data.js:', lessons.length, 'lessons,', glossary.length, 'terms');
