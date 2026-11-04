/* Phone legibility for lesson diagrams (pass-2 review, Nov 2026).
 * The older 720-unit figures shrink to about 340 px on a 390 px phone, so their
 * 11-15 unit labels render at 5-7 px. For every SVG in the lesson: if a label would
 * render under FLOOR px, raise the small labels to FLOOR in place, but only when that
 * moves no label out of its box, onto another label or out of the picture. If it
 * would, keep the drawing as drawn and let it scroll sideways at the width where the
 * smallest label is FLOOR px, with a "swipe" cue. Re-runs after every route change,
 * when an interactive redraws its picture, and on resize. Desktop is untouched:
 * nothing there renders under the floor. Same method as Gradient Descent's gd-legible.js.
 */
(function () {
  "use strict";
  var FLOOR = 9.1; // a hair over 9 px so rounding never lands under it
  function restore(t) {
    if (t.dataset.fs0 == null) return;
    t.style.fontSize = t.dataset.fs0;
    delete t.dataset.fs0;
  }
  function legible(svg) {
    var vb = svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width || svg.closest("header,nav,button,.logo")) return;
    var texts = Array.prototype.filter.call(svg.querySelectorAll("text"), function (t) { return t.textContent.trim(); });
    texts.forEach(restore);
    var wrap = svg.parentNode && svg.parentNode.classList && svg.parentNode.classList.contains("lg-scroll") ? svg.parentNode : null;
    if (wrap) { svg.style.minWidth = ""; wrap.classList.remove("lg-scrolling"); }
    var w = svg.getBoundingClientRect().width;
    if (!w || !texts.length) return;
    var need = FLOOR / (w / vb.width);
    var fs = function (t) { return parseFloat(getComputedStyle(t).fontSize); };
    var small = texts.filter(function (t) { return fs(t) < need - 0.01; });
    if (!small.length) return;
    var rects = Array.prototype.map.call(svg.querySelectorAll("rect"), function (r) { try { return r.getBBox(); } catch (e) { return null; } })
      .filter(function (b) { return b && b.width > 4 && b.height > 4 && b.width < vb.width * 0.98; });
    var inside = function (a, r) { return a.x >= r.x + 1.5 && a.y >= r.y - 0.5 && a.x + a.width <= r.x + r.width - 1.5 && a.y + a.height <= r.y + r.height + 0.5; };
    var hit = function (a, b) { return Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x) > 1 && Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) > 1; };
    var outOf = function (b) { return b.x < vb.x - 0.5 || b.x + b.width > vb.x + vb.width + 0.5 || b.y < vb.y - 0.5 || b.y + b.height > vb.y + vb.height + 0.5; };
    var bb = function (t) { try { return t.getBBox(); } catch (e) { return { x: 0, y: 0, width: 0, height: 0 }; } };
    var b0 = texts.map(bb);
    small.forEach(function (t) { t.dataset.fs0 = t.style.fontSize || ""; t.style.fontSize = need.toFixed(2) + "px"; });
    var b1 = texts.map(bb);
    var bad = false;
    for (var i = 0; i < texts.length && !bad; i++) {
      if (outOf(b1[i]) && !outOf(b0[i])) bad = true;
      for (var k = 0; k < rects.length && !bad; k++) if (inside(b0[i], rects[k]) && !inside(b1[i], rects[k])) bad = true;
      for (var j = i + 1; j < texts.length && !bad; j++) if (hit(b1[i], b1[j]) && !hit(b0[i], b0[j])) bad = true;
    }
    if (!bad) return;
    // bigger labels would collide: undo, and let the drawing scroll sideways instead
    small.forEach(restore);
    var minFs = Math.min.apply(null, texts.map(fs));
    var box = wrap;
    if (!box) {
      box = document.createElement("div");
      box.className = "lg-scroll";
      svg.parentNode.insertBefore(box, svg);
      box.appendChild(svg);
    }
    box.classList.add("lg-scrolling");
    svg.style.minWidth = Math.ceil((vb.width * FLOOR) / minFs) + "px";
  }
  var view = null, mo = null, timer = 0;
  function all() {
    var root = view || document.body;
    Array.prototype.forEach.call(root.querySelectorAll("svg[viewBox]"), legible);
    if (mo) mo.takeRecords(); // drop the records our own edits made
  }
  function soon() { clearTimeout(timer); timer = setTimeout(all, 60); }
  window.addEventListener("load", function () {
    view = document.getElementById("view");
    all();
    if (view && window.MutationObserver) {
      mo = new MutationObserver(soon);
      mo.observe(view, { childList: true, subtree: true, characterData: true });
    }
  });
  window.addEventListener("resize", soon);
  window.CMLegible = all; // for the QA driver
})();
