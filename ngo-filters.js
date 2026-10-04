/* FindBack Partner Portal - make the State / Station filters actually filter.
   Standalone file, loaded after everything else. It does not change any existing function body:
   it wraps window._getLocalPosts and window.ngoLoadDashboard, and defines window.fbApplyFilters,
   which the State / Station / Location dropdowns already call but which did not exist.

   Rule: a chosen State or Station narrows the WHOLE dashboard (cards, list, side numbers).
   "Location type" (Railway / Airport / Police) only decides which station list is offered;
   on its own it hides nothing, because ordinary posts do not record a location type. */
(function () {
  'use strict';

  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/&/g, ' and ').replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function filt() { return window.FB_LOC_FILTER || { type: 'all', state: 'all', station: 'all' }; }
  function isSet(v) { return v && v !== 'all'; }

  /* "Karimganj Town PS" -> "karimganj town"; "Guwahati Junction" -> "guwahati" */
  function stationCore(name) {
    return norm(name)
      .replace(/\b(police station|railway station|international airport|p s|ps|thana|junction|jn|airport|terminal|cantt)\b/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  /* For a police station, the district it belongs to (from the app's own station list). */
  function districtOfStation(state, station) {
    var data = (window.INDIA_POLICE_DATA || {})[state] || {};
    var found = '';
    Object.keys(data).some(function (d) {
      if ((data[d] || []).indexOf(station) !== -1) { found = d; return true; }
      return false;
    });
    return found;
  }

  function matches(p) {
    var f = filt();
    if (isSet(f.state)) {
      var st = norm(f.state);
      if (norm(p.state).indexOf(st) === -1 && norm(p.loc).indexOf(st) === -1) return false;
    }
    if (isSet(f.station)) {
      var hay = norm((p.district || '') + ' ' + (p.loc || ''));
      var keys = [];
      var core = stationCore(f.station);
      if (core) keys.push(core);
      if (f.type === 'police' && isSet(f.state)) {
        var d = norm(districtOfStation(f.state, f.station));
        if (d) keys.push(d);
      }
      var hit = keys.some(function (k) { return k && hay.indexOf(k) !== -1; });
      if (!hit) return false;
    }
    return true;
  }

  /* 1. Scope every dashboard view to the chosen state / station. */
  var origLocal = window._getLocalPosts;
  window._getLocalPosts = function () {
    var posts = origLocal ? origLocal() : (window._allPosts || []);
    var f = filt();
    if (!isSet(f.state) && !isSet(f.station)) return posts;
    return posts.filter(matches);
  };

  function listFilterOn() {
    var f = window._fbFilters || {};
    return isSet(f.type) || isSet(f.status) || isSet(f.date) || isSet(f.fraud);
  }
  function onHome() { return !window._fbCurrentNav || window._fbCurrentNav === 'home'; }
  function setCount(n) {
    var rc = document.getElementById('fb-result-ct');
    if (rc) rc.innerHTML = '<b>' + n + '</b> cases';
  }

  /* 2. On the Dashboard tab: cards when no list filter is chosen, otherwise the filtered list
        (before, the cards came back by themselves and ignored the chosen filters). */
  var origLoad = window.ngoLoadDashboard;
  window.ngoLoadDashboard = function () {
    if (origLoad) origLoad.apply(this, arguments);
    if (onHome()) {
      if (listFilterOn()) { if (window.fbRenderEmailList) window.fbRenderEmailList(); }
      else setCount(window._getLocalPosts().length);
    }
  };

  /* 3. The function the State / Station / Location dropdowns call. */
  window.fbApplyFilters = function () {
    document.querySelectorAll('.fb-dd-menu').forEach(function (m) { m.classList.remove('fb-dd-show'); });
    document.querySelectorAll('.fb-dd-btn').forEach(function (b) { b.classList.remove('fb-dd-open'); });
    var tab = window._fbCurrentNav || 'home';
    if (tab === 'resolved' || tab === 'alerts') {
      var btn = document.querySelector('.fb-nav-item.fb-active, .fb-nav-item.fb-ngo-active');
      if (window.fbSwitchNav) window.fbSwitchNav(tab, btn, window._fbRole === 'ngo' ? 'ngo' : undefined);
      return;
    }
    if (window.ngoLoadDashboard) window.ngoLoadDashboard();
    if (!onHome() && window.fbRenderEmailList) window.fbRenderEmailList();
  };
})();
