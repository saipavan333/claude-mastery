/* Claude Mastery — service worker. Offline-first app shell + runtime cache.
   Bump CACHE when any precached asset changes so clients pull the new copy. */
var CACHE = "cm-v4-2026-08-01";

/* App shell — resolved relative to the SW's location, so subpath hosting
   (e.g. GitHub Pages /claude-mastery/) works without edits. */
var SHELL = [
  ".", "index.html", "styles.css", "app.js", "curriculum.js",
  "manifest.json",
  "content/track01.js","content/track02.js","content/track03.js","content/track04.js",
  "content/track05.js","content/track06.js","content/track07.js","content/track08.js",
  "content/track09.js","content/track10.js","content/track11.js","content/track12.js",
  "content/track13.js","content/track14.js",
  "content/diagrams.js","content/widgets.js","content/glossary.js",
  "content/cheatsheets.js","content/interview.js","content/facts.js",
  "icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","icons/apple-touch-icon.png",
  "assistant-config.js","gd-assistant.js","gd-extras.js","gd-assistant.css","gd-extras.css","assistant-data.js"
];

/* Precache resiliently: one missing asset must not fail the whole install. */
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.allSettled(SHELL.map(function(u){
        return fetch(new Request(u, {cache:"reload"}))
          .then(function(r){ if(r && (r.ok || r.type==="opaque")) return c.put(u, r); })
          .catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

/* Drop old versions on activate. */
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* Let the page trigger an immediate update. */
self.addEventListener("message", function(e){
  if(e.data==="skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  var url = new URL(req.url);
  var sameOrigin = (url.origin === self.location.origin);

  /* SPA navigations → network-first, fall back to cached shell (offline). */
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(r){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put("index.html", copy); });
        return r;
      }).catch(function(){
        return caches.match("index.html").then(function(m){ return m || caches.match("."); });
      })
    );
    return;
  }

  /* Same-origin assets → cache-first, then network (and cache it). */
  if(sameOrigin){
    e.respondWith(
      caches.match(req).then(function(hit){
        if(hit) return hit;
        return fetch(req).then(function(r){
          if(r && r.ok){ var copy=r.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
          return r;
        }).catch(function(){ return hit; });
      })
    );
    return;
  }

  /* Cross-origin (fonts, CDNs) → stale-while-revalidate. */
  e.respondWith(
    caches.match(req).then(function(hit){
      var net = fetch(req).then(function(r){
        if(r && (r.ok || r.type==="opaque")){ var copy=r.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
        return r;
      }).catch(function(){ return hit; });
      return hit || net;
    })
  );
});
