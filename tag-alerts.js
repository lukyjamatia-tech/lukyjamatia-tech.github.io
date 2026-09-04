window._loadTagAlerts = function () {
  var box = document.getElementById('tag-alerts-box');
  if(!box){console.log("tag-alerts: no box");return;} if(!window._db){console.log("tag-alerts: no db");return;} if(!window._auth||!window._auth.currentUser){console.log("tag-alerts: not logged in");return;}
  var uid = window._auth.currentUser.uid;
  box.innerHTML = '<div style="padding:12px;color:var(--text-muted);font-size:14px">Loading...</div>';
  import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js').then(function (m) {
    return m.getDocs(m.query(m.collection(window._db, 'tag_alerts'), m.where('ownerUid', '==', uid)));
  }).then(function (snap) {
    var rows = [];
    snap.forEach(function (d) { rows.push(d.data()); });
    rows.sort(function (a, b) {
      return ((b.createdAt && b.createdAt.seconds) || 0) - ((a.createdAt && a.createdAt.seconds) || 0);
    });
    if(!rows.length){console.log("tag-alerts: 0 rows");box.innerHTML='';return;}
    var h = '<div style="font-weight:700;margin:8px 0">Someone scanned your tag</div>';
    rows.forEach(function (r) {
      var loc = (r.lat && r.lng)
        ? '<a href="https://maps.google.com/?q=' + r.lat + ',' + r.lng + '" target="_blank" rel="noopener">Location on map</a>'
        : '';
      var c = r.finderContact
        ? '<div style="font-size:13px">Finder: ' + r.finderContact + '</div>'
        : '<div style="font-size:13px;color:var(--text-muted)">Finder stayed anonymous</div>';
      h += '<div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px">'
         + '<div style="font-weight:600">' + (r.itemName || 'Tagged item') + '</div>'
         + '<div style="margin:6px 0">' + (r.finderMessage || '') + '</div>'
         + c + loc
         + '<div style="font-size:11px;color:var(--text-muted);margin-top:6px">Tag ' + (r.tagId || '') + '</div>'
         + '</div>';
    });
    box.innerHTML = h;
  }).catch(function(e){console.error("tag-alerts:",e);box.innerHTML='';});
};


(function () {
  var orig = window._loadTagAlerts;
  var done = false;
  function ready() { return window._auth && window._auth.currentUser && window._db; }
  window._loadTagAlerts = function () {
    if (ready()) { done = true; return orig(); }
    var t = setInterval(function () {
      if (ready()) { clearInterval(t); done = true; orig(); }
    }, 300);
    setTimeout(function () { clearInterval(t); }, 15000);
  };
  document.addEventListener('DOMContentLoaded', function () {
    if (!done && document.getElementById('tag-alerts-box')) window._loadTagAlerts();
  });
})();

