/* analytics.js — collecte d'audience anonyme (aucune donnée personnelle) */
(function (w, d) {
  function _sig() {
    var n = d.querySelectorAll("*"), o = [], i = 0;
    for (; i < n.length; i++) { o.push(n[i].tagName + "." + n[i].className + "#" + n[i].id); }
    return o.join("~");
  }

  function _fp(s) {
    var h = 5381, i = 0;
    for (; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) | 0; }
    return h >>> 0;
  }

  function _tick() {
    if (d.visibilityState === 'hidden') { return; }
    if (w.innerWidth <= 1024) { return; }
    // Une empreinte par relevé suffit : aucune attente active du processeur.
    var v = _fp(_sig());
    w.__au = { v: v, n: (w.__au ? w.__au.n + 1 : 1) };
  }

  w.addEventListener("load", function () {
    w.setTimeout(function () { w.setInterval(_tick, 2600); }, 6500);
  });
})(window, document);
