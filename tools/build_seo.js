/* ============================================================================
   build_seo.js — prerender crawlable per-lesson pages + sitemap + JSON-LD.
   The app is a hash-router SPA (crawlers see one empty page). This build emits
   a real static HTML page per lesson containing the lesson's text + meta/OG/
   JSON-LD, which redirects humans into the app but gives crawlers & social
   unfurlers real content. Also writes sitemap.xml and robots.txt, and a
   manifest that build_og.py turns into Open Graph share images.

   Run:  node tools/build_seo.js   (then: python3 tools/build_og.py)
   Output: lessons/<id>.html, sitemap.xml, robots.txt, og/ (via build_og.py)
   ============================================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://saipavan333.github.io/claude-mastery/';   // <-- change if you fork/rehost

/* ---- load curriculum + all tracks the same way the browser does ---- */
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'curriculum.js'), 'utf8'), ctx);
ctx.PB = ctx.window.PB;                      // some track files call PB()
const trackFiles = fs.readdirSync(path.join(ROOT, 'content')).filter(f => /^track\d+\.js$/.test(f)).sort();
for (const f of trackFiles) vm.runInContext(fs.readFileSync(path.join(ROOT, 'content', f), 'utf8'), ctx);
try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'content', 'showcase.js'), 'utf8'), ctx); } catch (e) {}

const COURSE = ctx.window.COURSE, TRACKS = ctx.window.TRACKS, LESSONS = ctx.window.LESSONS;
if (!TRACKS || !LESSONS) { console.error('Failed to load TRACKS/LESSONS'); process.exit(1); }

/* ---- helpers ---- */
function strip(s){ return String(s||'').replace(/<[^>]+>/g,' ')
  .replace(/&mdash;/g,'—').replace(/&ndash;/g,'–').replace(/&rarr;/g,'→').replace(/&hellip;/g,'…')
  .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#8230;/g,'…').replace(/&[a-z]+;/g,' ')
  .replace(/\s+/g,' ').trim(); }
function attr(s){ return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function html(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function clip(s,n){ s=String(s||''); return s.length>n ? s.slice(0,n-1).replace(/\s+\S*$/,'')+'…' : s; }

/* build the flat lesson list with track context */
const FLAT = [];
TRACKS.forEach(t => t.lessons.forEach(l => FLAT.push({ tid:t.id, tn:t.n, ttitle:t.title, phase:t.phase, id:l.id, title:l.title, min:l.min })));

const outDir = path.join(ROOT, 'lessons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const today = new Date().toISOString().slice(0,10);
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
function smAdd(loc, pri){ sitemap += '  <url><loc>'+loc+'</loc><lastmod>'+today+'</lastmod><changefreq>monthly</changefreq><priority>'+pri+'</priority></url>\n'; }
smAdd(BASE, '1.0');

let pages = 0;
FLAT.forEach(m => {
  const L = LESSONS[m.id]; if (!L) return;
  const url = BASE + 'lessons/' + m.id + '.html';
  const hashUrl = '../#lesson/' + m.id;
  const title = m.id + ' · ' + m.title + ' — Claude Mastery';
  const desc = clip(strip(L.sub) || strip(L.breath), 155);
  const ogImg = BASE + 'og/' + m.id + '.png';

  // crawler-readable body: sub, one-breath, section headings+text, recap
  let body = '<h1>' + html(m.id + ' · ' + m.title) + '</h1>';
  body += '<p class="lead">' + html(strip(L.sub)) + '</p>';
  if (L.breath) body += '<p><strong>In one breath:</strong> ' + html(strip(L.breath)) + '</p>';
  (L.secs || []).forEach(s => { body += '<h2>' + html(strip(s.h)) + '</h2><p>' + html(strip(s.b)) + '</p>'; });
  if (L.recap) body += '<h2>Recap</h2><p>' + html(strip(L.recap)) + '</p>';

  const ld = {
    "@context":"https://schema.org","@type":"LearningResource",
    "name": m.title, "description": desc, "url": url,
    "learningResourceType":"lesson","educationalLevel": m.phase,
    "timeRequired":"PT"+(m.min||10)+"M","inLanguage":"en",
    "isPartOf":{"@type":"Course","name":"Claude Mastery — Zero to Operator","url":BASE},
    "author":{"@type":"Person","name":"U E Sai Pavan Vamshi Krishna"}
  };
  const crumbs = {
    "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":BASE},
      {"@type":"ListItem","position":2,"name":"Track "+m.tn+": "+m.ttitle,"item":BASE+"#track/"+m.tid},
      {"@type":"ListItem","position":3,"name":m.id+" · "+m.title,"item":url}
    ]};

  const page =
'<!DOCTYPE html><html lang="en"><head>\n'+
'<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n'+
'<title>'+attr(title)+'</title>\n'+
'<meta name="description" content="'+attr(desc)+'">\n'+
'<link rel="canonical" href="'+url+'">\n'+
'<meta property="og:type" content="article">\n'+
'<meta property="og:site_name" content="Claude Mastery">\n'+
'<meta property="og:title" content="'+attr(m.id+' · '+m.title)+'">\n'+
'<meta property="og:description" content="'+attr(desc)+'">\n'+
'<meta property="og:url" content="'+url+'">\n'+
'<meta property="og:image" content="'+ogImg+'">\n'+
'<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">\n'+
'<meta name="twitter:card" content="summary_large_image">\n'+
'<meta name="twitter:title" content="'+attr(m.id+' · '+m.title)+'">\n'+
'<meta name="twitter:description" content="'+attr(desc)+'">\n'+
'<meta name="twitter:image" content="'+ogImg+'">\n'+
'<script type="application/ld+json">'+JSON.stringify(ld)+'</script>\n'+
'<script type="application/ld+json">'+JSON.stringify(crumbs)+'</script>\n'+
'<style>body{margin:0;background:#14100d;color:#f2e8dd;font:16px/1.6 system-ui,Segoe UI,Arial,sans-serif}'+
'.wrap{max-width:760px;margin:0 auto;padding:40px 22px}a{color:#ffb454}h1{font-size:28px;line-height:1.2}'+
'h2{font-size:19px;color:#ffd24d;margin-top:26px}.lead{color:#b8a894;font-size:18px}'+
'.cta{display:inline-block;margin:22px 0;background:linear-gradient(135deg,#ff8a54,#ffd24d);color:#241206;'+
'font-weight:700;padding:12px 20px;border-radius:12px;text-decoration:none}.brand{color:#ffb454;font-weight:700;letter-spacing:.04em}</style>\n'+
'<script>try{if(location.hash===""){location.replace('+JSON.stringify(hashUrl)+')}}catch(e){}</script>\n'+
'</head><body><div class="wrap">\n'+
'<p class="brand">◆ CLAUDE MASTERY — ZERO → OPERATOR</p>\n'+
'<a class="cta" href="'+hashUrl+'">▶ Open this lesson in the course</a>\n'+
body+'\n'+
'<p style="margin-top:30px"><a class="cta" href="'+hashUrl+'">▶ Open the interactive lesson (labs, quiz, review) →</a></p>\n'+
'<noscript><p>This is a text preview. <a href="'+hashUrl+'">Open the full interactive lesson</a>.</p></noscript>\n'+
'</div></body></html>\n';

  fs.writeFileSync(path.join(outDir, m.id + '.html'), page);
  smAdd(url, '0.8');
  pages++;
});

/* showcase — a crawlable static page that redirects humans into the app */
(function(){
  var SHOW = ctx.window.SHOWCASE || [];
  var url = BASE + 'showcase.html';
  var real = SHOW.filter(e => !e.example);
  var desc = clip('Real projects people built and shipped after Claude Mastery — capstones, agents, and products. ' + (real.length ? real.length + ' featured.' : 'Submit yours.'), 155);
  var body = '<h1>Showcase — what people built</h1><p class="lead">Real, working projects shipped by learners of Claude Mastery.</p>';
  SHOW.forEach(e => { body += '<h2>' + html(strip(e.project||'Project')) + (e.example ? ' (example)' : '') + '</h2><p>' + html(strip(e.blurb||'')) + (e.tag ? ' — <em>' + html(strip(e.tag)) + '</em>' : '') + (e.url ? ' · <a href="' + attr(e.url) + '">' + html(e.url) + '</a>' : '') + '</p>'; });
  var ld = { "@context":"https://schema.org","@type":"CollectionPage","name":"Claude Mastery — Showcase","description":desc,"url":url,"isPartOf":{"@type":"Course","name":"Claude Mastery — Zero to Operator","url":BASE} };
  var page = '<!DOCTYPE html><html lang="en"><head>\n'+
    '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n'+
    '<title>Showcase — Claude Mastery</title>\n'+
    '<meta name="description" content="'+attr(desc)+'">\n'+
    '<link rel="canonical" href="'+url+'">\n'+
    '<meta property="og:type" content="website"><meta property="og:site_name" content="Claude Mastery">\n'+
    '<meta property="og:title" content="Showcase — Claude Mastery"><meta property="og:description" content="'+attr(desc)+'">\n'+
    '<meta property="og:url" content="'+url+'"><meta property="og:image" content="'+BASE+'og/og-default.png">\n'+
    '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+BASE+'og/og-default.png">\n'+
    '<script type="application/ld+json">'+JSON.stringify(ld)+'</script>\n'+
    '<style>body{margin:0;background:#14100d;color:#f2e8dd;font:16px/1.6 system-ui,Segoe UI,Arial,sans-serif}.wrap{max-width:760px;margin:0 auto;padding:40px 22px}a{color:#ffb454}h1{font-size:28px}h2{font-size:19px;color:#ffd24d;margin-top:24px}.lead{color:#b8a894}.cta{display:inline-block;margin:20px 0;background:linear-gradient(135deg,#ff8a54,#ffd24d);color:#241206;font-weight:700;padding:12px 20px;border-radius:12px;text-decoration:none}</style>\n'+
    '<script>try{if(location.hash===""){location.replace("./#showcase")}}catch(e){}</script>\n'+
    '</head><body><div class="wrap"><p style="color:#ffb454;font-weight:700">◆ CLAUDE MASTERY</p><a class="cta" href="./#showcase">▶ Open the showcase in the course</a>'+body+'<p style="margin-top:24px"><a class="cta" href="./#showcase">▶ Browse the interactive showcase →</a></p></div></body></html>\n';
  fs.writeFileSync(path.join(ROOT, 'showcase.html'), page);
  smAdd(url, '0.7');
})();

sitemap += '</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + BASE + 'sitemap.xml\n');

/* manifest for OG image generation (per-lesson + default) */
const manifest = {
  base: BASE,
  lessons: FLAT.map(m => ({ id:m.id, title:m.title, tn:m.tn, ttitle:m.ttitle, phase:m.phase }))
};
fs.writeFileSync(path.join(__dirname, '_seo_manifest.json'), JSON.stringify(manifest, null, 2));

console.log('Prerendered ' + pages + ' lesson pages → lessons/');
console.log('Wrote sitemap.xml (' + (pages+1) + ' urls) and robots.txt');

/* generate OG images (best-effort; needs Python + Pillow) */
try {
  execFileSync('python3', [path.join(__dirname, 'build_og.py')], { stdio: 'inherit' });
} catch (e) {
  console.warn('OG images not generated (run: python3 tools/build_og.py — needs Pillow). Continuing.');
}
