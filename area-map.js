/* FindBack - Area Map: posts grouped State > District.
   Standalone file. index.html only calls window.fbAreaMap() from renderMapPins().
   Reads window._allPosts (fields used: id, type, item, loc, state, district, createdAt). */
(function () {
  'use strict';

  var STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Chandigarh', 'Puducherry', 'Andaman and Nicobar Islands', 'Lakshadweep',
    'Dadra and Nagar Haveli and Daman and Diu'];
  var ALIAS = {
    'new delhi': 'Delhi', 'nct of delhi': 'Delhi', 'tamilnadu': 'Tamil Nadu', 'orissa': 'Odisha',
    'uttaranchal': 'Uttarakhand', 'pondicherry': 'Puducherry', 'jammu & kashmir': 'Jammu and Kashmir',
    'j&k': 'Jammu and Kashmir', 'up': 'Uttar Pradesh', 'mp': 'Madhya Pradesh', 'wb': 'West Bengal',
    'andaman and nicobar': 'Andaman and Nicobar Islands', 'chattisgarh': 'Chhattisgarh'
  };
  var STATE_BY_KEY = {};
  STATES.forEach(function (s) { STATE_BY_KEY[s.toLowerCase()] = s; });

  var TXT = {
    en: {
      search: 'Search your city or district', all: 'All', lost: 'Lost', found: 'Found', missing: 'Missing',
      state: 'state', states: 'states', post: 'post', posts: 'posts', district: 'district', districts: 'districts',
      yours: 'YOUR AREA', pin: 'Set as my area', unpin: 'Remove my area', other: 'Other',
      noarea: 'Area not written', none: 'No posts yet', empty: 'No posts here yet. Try another filter or area.'
    },
    hi: {
      search: 'अपना शहर या ज़िला खोजें', all: 'सभी', lost: 'खोया', found: 'मिला', missing: 'लापता',
      state: 'राज्य', states: 'राज्य', post: 'पोस्ट', posts: 'पोस्ट', district: 'ज़िला', districts: 'ज़िले',
      yours: 'आपका क्षेत्र', pin: 'इसे मेरा क्षेत्र बनाएं', unpin: 'मेरा क्षेत्र हटाएं', other: 'अन्य',
      noarea: 'क्षेत्र नहीं लिखा', none: 'अभी कोई पोस्ट नहीं', empty: 'यहाँ अभी कोई पोस्ट नहीं। दूसरा फ़िल्टर या क्षेत्र आज़माएं।'
    }
  };
  var COL = {
    all: { bg: '#EDEDED', fg: '#1A1A1A' },
    lost: { bg: '#FEE2E2', fg: '#B91C1C' },
    found: { bg: '#D1FAE5', fg: '#047857' },
    missing: { bg: '#FEF3C7', fg: '#92400E' }
  };
  var PIN_KEY = 'fb_map_state';
  var ui = { filter: 'all', q: '', open: {} };

  function t() {
    var l = 'en';
    try { l = window.APP_LANG || localStorage.getItem('fb_lang') || 'en'; } catch (e) {}
    return l === 'hi' ? TXT.hi : TXT.en;
  }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cap(s) { s = String(s || '').trim(); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function stateName(s) {
    var k = String(s || '').trim().toLowerCase().replace(/\.+$/, '');
    return STATE_BY_KEY[k] || ALIAS[k] || '';
  }
  function getPin() { try { return localStorage.getItem(PIN_KEY) || ''; } catch (e) { return ''; } }
  function setPin(v) { try { if (v) localStorage.setItem(PIN_KEY, v); else localStorage.removeItem(PIN_KEY); } catch (e) {} }

  /* "Malom market, Imphal East, Manipur" -> {state:'Manipur', district:'Imphal East', spot:'Malom market'} */
  function where(p) {
    var parts = String(p.loc || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    var state = stateName(p.state) || cap(p.state);
    var district = cap(p.district);
    if (parts.length) {
      var last = parts[parts.length - 1];
      if (!state && stateName(last)) { state = stateName(last); parts.pop(); }
      else if (state && (stateName(last) === state || last.toLowerCase() === state.toLowerCase())) { parts.pop(); }
    }
    if (district) {
      parts = parts.filter(function (x) { return x.toLowerCase() !== district.toLowerCase(); });
    } else if (parts.length) {
      district = cap(parts.pop());
    }
    return { state: state, district: district, spot: parts.join(', ') };
  }
  function ago(p) {
    var c = p.createdAt, ms = 0;
    if (c) {
      if (typeof c.toMillis === 'function') ms = c.toMillis();
      else if (typeof c.seconds === 'number') ms = c.seconds * 1000;
      else if (typeof c === 'number') ms = c;
      else { var d = Date.parse(c); if (!isNaN(d)) ms = d; }
    }
    if (!ms) return '';
    var s = (Date.now() - ms) / 1000;
    if (s < 0) return '';
    if (s < 3600) return Math.max(1, Math.floor(s / 60)) + 'm';
    if (s < 86400) return Math.floor(s / 3600) + 'h';
    if (s < 604800) return Math.floor(s / 86400) + 'd';
    if (s < 2592000) return Math.floor(s / 604800) + 'w';
    return Math.floor(s / 2592000) + 'mo';
  }
  function typeOf(p) { return p.type === 'found' || p.type === 'missing' ? p.type : 'lost'; }
  function num(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  function draw(root) {
    var L = t();
    var q = ui.q.trim().toLowerCase();
    var all = (window._allPosts || []).filter(function (p) { return p && p.loc; }).map(function (p) {
      var w = where(p);
      return { p: p, type: typeOf(p), state: w.state, district: w.district, spot: w.spot };
    });
    var byQ = all.filter(function (r) {
      if (!q) return true;
      return (r.p.loc + ' ' + r.state + ' ' + r.district).toLowerCase().indexOf(q) !== -1;
    });
    function cnt(type) { return byQ.filter(function (r) { return r.type === type; }).length; }

    /* filter tiles */
    var tiles = [['all', L.all, byQ.length], ['lost', L.lost, cnt('lost')], ['found', L.found, cnt('found')], ['missing', L.missing, cnt('missing')]];
    root.querySelector('#fbam-tiles').innerHTML = tiles.map(function (x) {
      var c = COL[x[0]], on = ui.filter === x[0];
      return '<button type="button" data-f="' + x[0] + '" aria-pressed="' + on + '" style="flex:1;min-width:0;min-height:60px;padding:6px 2px;border-radius:12px;border:2px solid ' + (on ? c.fg : 'transparent') + ';background:' + c.bg + ';color:' + c.fg + ';font-family:inherit;cursor:pointer;">' +
        '<div style="font-size:19px;font-weight:700;line-height:1.2;">' + x[2] + '</div>' +
        '<div style="font-size:12px;font-weight:600;">' + esc(x[1]) + '</div></button>';
    }).join('');

    /* group: state -> district -> posts */
    var shown = byQ.filter(function (r) { return ui.filter === 'all' || r.type === ui.filter; });
    var groups = {};
    shown.forEach(function (r) {
      var sk = (r.state || '~other').toLowerCase();
      var dk = (r.district || '~none').toLowerCase();
      if (!groups[sk]) groups[sk] = { key: sk, name: r.state, n: 0, lost: 0, found: 0, missing: 0, d: {} };
      var g = groups[sk];
      if (!g.d[dk]) g.d[dk] = { name: r.district, rows: [] };
      g.d[dk].rows.push(r); g.n++; g[r.type]++;
    });
    var pin = getPin();
    var alerts = (window._areaAlerts || []).map(function (a) { return String(a.area || '').toLowerCase(); }).filter(Boolean);
    function near(g) {
      if (pin) return g.key === pin;
      if (g.key === '~other') return false;
      return alerts.some(function (a) {
        if (g.key.indexOf(a) !== -1) return true;
        return Object.keys(g.d).some(function (dk) { return dk.indexOf(a) !== -1; });
      });
    }
    var list = Object.keys(groups).map(function (k) { var g = groups[k]; g.near = near(g); return g; });
    list.sort(function (a, b) {
      if (a.near !== b.near) return a.near ? -1 : 1;
      if ((a.key === '~other') !== (b.key === '~other')) return a.key === '~other' ? 1 : -1;
      return b.n - a.n;
    });

    root.querySelector('#fbam-sum').textContent = shown.length
      ? num(list.length, L.state, L.states) + ' • ' + num(shown.length, L.post, L.posts) : '';

    var box = root.querySelector('#fbam-list');
    if (!all.length) { box.innerHTML = '<div style="text-align:center;padding:48px 16px;color:var(--text-muted);">' + esc(L.none) + '</div>'; return; }
    if (!list.length) { box.innerHTML = '<div style="text-align:center;padding:28px 16px;border:1.5px dashed var(--border);border-radius:14px;color:var(--text-muted);font-size:14px;">' + esc(L.empty) + '</div>'; return; }

    box.innerHTML = list.map(function (g, i) {
      var open = q ? true : (ui.open[g.key] === undefined ? (g.near || i === 0) : ui.open[g.key]);
      var parts = [];
      ['lost', 'found', 'missing'].forEach(function (k) { if (g[k]) parts.push(g[k] + ' ' + L[k].toLowerCase()); });
      var dkeys = Object.keys(g.d).sort(function (a, b) { return g.d[b].rows.length - g.d[a].rows.length; });
      var head = '<button type="button" data-s="' + esc(g.key) + '" data-open="' + (open ? 1 : 0) + '" aria-expanded="' + open + '" style="width:100%;min-height:60px;padding:10px 14px;border:0;background:transparent;display:flex;align-items:center;gap:10px;text-align:left;font-family:inherit;color:inherit;cursor:pointer;">' +
        '<span style="flex:1;min-width:0;">' +
        '<span style="font-family:\'Sora\',sans-serif;font-size:15px;font-weight:700;">' + esc(g.name || L.other) + '</span>' +
        (g.near ? ' <span style="background:#1A1A1A;color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:7px;vertical-align:middle;">' + esc(L.yours) + '</span>' : '') +
        '<span style="display:block;font-size:12px;color:var(--text-muted);margin-top:2px;">' + esc(num(dkeys.length, L.district, L.districts) + ' • ' + parts.join(' • ')) + '</span></span>' +
        '<span style="background:#C2500F;color:#fff;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;">' + g.n + '</span>' +
        '<span aria-hidden="true" style="font-size:12px;color:var(--text-muted);">' + (open ? '&#9650;' : '&#9660;') + '</span></button>';
      var body = '';
      if (open) {
        body = '<div style="padding:0 14px 12px;">' + dkeys.map(function (dk) {
          var d = g.d[dk];
          return '<div style="border-top:1px solid var(--border);padding-top:10px;margin-top:10px;">' +
            '<div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:8px;"><span style="font-size:14px;font-weight:700;">' + esc(d.name || L.noarea) + '</span>' +
            '<span style="font-size:12px;color:var(--text-muted);">' + esc(num(d.rows.length, L.post, L.posts)) + '</span></div>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;">' + d.rows.map(function (r) {
              var c = COL[r.type], a = ago(r.p), item = cap(r.p.item) || '?';
              if (item.length > 26) item = item.slice(0, 25) + '…';
              return '<button type="button" data-id="' + esc(r.p.id) + '" title="' + esc(r.p.loc) + '" style="min-height:40px;padding:4px 12px;border:0;border-radius:20px;background:' + c.bg + ';color:' + c.fg + ';font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;">' +
                '<span style="font-size:10px;letter-spacing:.3px;">' + esc(L[r.type].toUpperCase()) + '</span> ' + esc(item) +
                (a ? ' <span style="font-weight:400;">• ' + a + '</span>' : '') + '</button>';
            }).join('') + '</div></div>';
        }).join('') +
          (g.key !== '~other' ? '<button type="button" data-pin="' + esc(g.key) + '" style="margin-top:12px;min-height:40px;padding:0;border:0;background:transparent;color:#C2500F;font-family:inherit;font-size:13px;font-weight:600;text-decoration:underline;cursor:pointer;">' + esc(pin === g.key ? L.unpin : L.pin) + '</button>' : '') +
          '</div>';
      }
      return '<div style="border:1.5px solid var(--border);border-radius:14px;margin-bottom:10px;background:white;overflow:hidden;">' + head + body + '</div>';
    }).join('');
  }

  window.fbAreaMap = function () {
    var root = document.getElementById('map-posts-list');
    if (!root) return;
    if (!root.querySelector('#fbam-list')) {
      root.innerHTML =
        '<input id="fbam-q" type="search" autocomplete="off" aria-label="' + esc(t().search) + '" placeholder="' + esc(t().search) + '" style="width:100%;box-sizing:border-box;height:46px;padding:0 14px;margin-bottom:12px;border:1.5px solid var(--border);border-radius:12px;font-size:15px;font-family:inherit;outline:none;background:white;">' +
        '<div id="fbam-tiles" style="display:flex;gap:8px;margin-bottom:14px;"></div>' +
        '<div id="fbam-sum" style="font-family:\'Sora\',sans-serif;font-size:14px;font-weight:700;margin-bottom:10px;"></div>' +
        '<div id="fbam-list" style="padding-bottom:120px;"></div>';
      root.querySelector('#fbam-q').value = ui.q;
    }
    if (!root._fbam) {
      root._fbam = true;
      root.addEventListener('input', function (e) {
        if (e.target && e.target.id === 'fbam-q') { ui.q = e.target.value; draw(root); }
      });
      root.addEventListener('click', function (e) {
        var el = e.target.closest ? e.target.closest('[data-f],[data-s],[data-id],[data-pin]') : null;
        if (!el || !root.contains(el)) return;
        if (el.hasAttribute('data-f')) { ui.filter = el.getAttribute('data-f'); draw(root); }
        else if (el.hasAttribute('data-s')) { ui.open[el.getAttribute('data-s')] = el.getAttribute('data-open') !== '1'; draw(root); }
        else if (el.hasAttribute('data-pin')) { var k = el.getAttribute('data-pin'); setPin(getPin() === k ? '' : k); draw(root); }
        else if (el.hasAttribute('data-id')) { if (typeof window.openDetail === 'function') window.openDetail(el.getAttribute('data-id')); }
      });
    }
    draw(root);
  };
})();
