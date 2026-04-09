/* FindBack Dashboard Fix — dashboard-fix.js
   
   HOW TO USE:
   1. GitHub pe nayi file banao: dashboard-fix.js
   2. Is poore content ko paste karo
   3. Commit karo
   4. index.html mein </body> se pehle yeh line add karo:
      <script src="dashboard-fix.js"></script>
   
   BAS! Koi aur change nahi karna.
*/

(function() {
  'use strict';

  /* ── 1. CSS INJECT ── */
  var style = document.createElement('style');
  style.textContent = [
    '.fb-shell{display:flex!important;min-height:calc(100vh - 56px - 92px)!important;overflow:visible!important;align-items:flex-start!important;}',
    '.fb-list-area{flex:1;overflow-y:auto!important;min-height:300px!important;}',
    '#page-ngo.active{background:#f4f6f9!important;position:relative;z-index:10;}',
    '.fb-shell{display:flex!important;min-height:calc(100vh - 56px - 92px)!important;overflow:visible!important;align-items:flex-start!important;}',
    '.fb-sb-overlay.fb-open{display:block!important;position:fixed!important;inset:0!important;z-index:149!important;background:rgba(0,0,0,0.5)!important;}',
    '.fb-gov-topbar{flex-wrap:nowrap!important;overflow:hidden;}',
    '.fb-gov-logo{min-width:0;flex:1;}',
    '.fb-gov-title{font-size:12px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.fb-gov-actions{flex-shrink:0;gap:4px!important;}',
    '.fb-role-chip{display:none!important;}',
    '.fb-dash-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 14px 18px;}',
    '@media(max-width:650px){.fb-dash-stat-grid{grid-template-columns:repeat(2,1fr);}}',
    '.fb-dash-stat-card{border-radius:12px;padding:16px 14px;color:#fff;position:relative;overflow:hidden;}',
    '.fb-dash-stat-card::after{content:"";position:absolute;right:-18px;top:-18px;width:64px;height:64px;background:rgba(255,255,255,.09);border-radius:50%;}',
    '.dsc-icon{font-size:20px;margin-bottom:8px;}',
    '.dsc-val{font-family:"Sora",sans-serif;font-size:26px;font-weight:800;line-height:1;}',
    '.dsc-lbl{font-size:11px;opacity:.85;margin-top:4px;font-weight:600;}',
    '.dsc-chg{margin-top:10px;font-size:10px;background:rgba(255,255,255,.18);display:inline-block;padding:2px 8px;border-radius:20px;font-weight:600;}',
    '.dsc-blue{background:linear-gradient(135deg,#2563eb,#3b82f6);box-shadow:0 4px 14px rgba(37,99,235,.25);}',
    '.dsc-green{background:linear-gradient(135deg,#059669,#10b981);box-shadow:0 4px 14px rgba(5,150,105,.25);}',
    '.dsc-orange{background:linear-gradient(135deg,#d97706,#f59e0b);box-shadow:0 4px 14px rgba(217,119,6,.25);}',
    '.dsc-purple{background:linear-gradient(135deg,#7c3aed,#a78bfa);box-shadow:0 4px 14px rgba(124,58,237,.25);}',
    '.fb-dash-two-col{display:grid;grid-template-columns:1fr 240px;gap:14px;margin:0 14px 20px;}',
    '@media(max-width:900px){.fb-dash-two-col{grid-template-columns:1fr;}}',
    '.fb-dash-card{background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.fb-dash-card-head{padding:11px 14px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;}',
    '.dch-title{font-size:13px;font-weight:700;color:#1e293b;}',
    '.dch-action{font-size:11px;color:#e8722a;cursor:pointer;font-weight:600;}',
    '.fb-dash-table{width:100%;border-collapse:collapse;font-size:11px;}',
    '.fb-dash-table th{padding:7px 12px;text-align:left;font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase;background:#f8fafc;border-bottom:1px solid #e2e8f0;}',
    '.fb-dash-table td{padding:9px 12px;border-bottom:1px solid #f1f5f9;color:#475569;vertical-align:middle;}',
    '.fb-dash-table tr:last-child td{border-bottom:none;}',
    '.fb-dash-table tr:hover td{background:#fafbfd;cursor:pointer;}',
    '.fb-dash-table td strong{color:#1e293b;font-size:12px;}',
    '.fb-dash-mini-stat{padding:12px 14px;display:flex;align-items:center;gap:11px;border-bottom:1px solid #f1f5f9;}',
    '.fb-dash-mini-stat:last-child{border-bottom:none;}',
    '.fb-dash-mini-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}',
    '.fb-dash-mini-icon.red{background:#fee2e2;}',
    '.fb-dash-mini-icon.green{background:#dcfce7;}',
    '.fb-dash-mini-icon.yellow{background:#fef3c7;}',
    '.fb-dash-mini-icon.blue{background:#dbeafe;}',
    '.fb-dash-mini-val{font-size:18px;font-weight:800;font-family:"Sora",sans-serif;color:#1e293b;}',
    '.fb-dash-mini-lbl{font-size:10px;color:#94a3b8;margin-top:1px;font-weight:600;}',
    '.fb-dash-alert-item{padding:10px 14px;display:flex;gap:9px;align-items:flex-start;border-bottom:1px solid #f1f5f9;}',
    '.fb-dash-alert-item:last-child{border-bottom:none;}',
    '.fb-dash-alert-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:3px;}',
    '.fb-dash-alert-dot.red{background:#ef4444;}',
    '.fb-dash-alert-dot.yellow{background:#f59e0b;}',
    '.fb-dash-alert-txt{font-size:11px;line-height:1.5;color:#475569;}',
    '.fb-dash-alert-time{font-size:10px;color:#94a3b8;margin-top:2px;}'
  ].join('');
  document.head.appendChild(style);

  /* ── 2. DASHBOARD RENDERER ── */
  window.ngoRenderDashHome = function() {
    var listEl = document.getElementById('fb-email-list');
    if (!listEl) return;

    var local = window._getLocalPosts ? window._getLocalPosts() : (window._allPosts || []);
    var lost    = local.filter(function(p){ return p.type === 'lost'; }).length;
    var found   = local.filter(function(p){ return p.type === 'found'; }).length;
    var missing = local.filter(function(p){ return p.type === 'missing'; }).length;
    var solved  = local.filter(function(p){ return p.status === 'resolved'; }).length;
    var pending = local.filter(function(p){ return !p.firHidden && (!p.firStatus || p.firStatus === 'pending'); }).length;

    var recent = local.slice(0, 6);

    function typePill(p) {
      if (p.type === 'lost')    return '<span style="background:#fee2e2;color:#dc2626;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">😟 Lost</span>';
      if (p.type === 'found')   return '<span style="background:#dcfce7;color:#16a34a;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">🎉 Found</span>';
      return '<span style="background:#fef3c7;color:#d97706;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">⚠️ Missing</span>';
    }

    function statusPill(p) {
      if (p.status === 'resolved')     return '<span style="background:#dcfce7;color:#16a34a;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">✅ Solved</span>';
      if (p.firStatus === 'accepted')  return '<span style="background:#dbeafe;color:#1d4ed8;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">✅ Accepted</span>';
      if (p.firStatus === 'rejected')  return '<span style="background:#fee2e2;color:#dc2626;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">❌ Rejected</span>';
      return '<span style="background:#f3e8ff;color:#7e22ce;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;">⏳ Pending</span>';
    }

    var tableRows = recent.map(function(p) {
      var d = (p.createdAt && p.createdAt.seconds)
        ? new Date(p.createdAt.seconds * 1000).toLocaleDateString('en-IN')
        : (p.date || '—');
      var loc = (p.loc || '—');
      if (loc.length > 20) loc = loc.substring(0, 18) + '…';
      return '<tr onclick="fbOpenDetail(\'' + p.id + '\')" style="cursor:pointer;">'
        + '<td><strong>' + (p.item || '—') + '</strong></td>'
        + '<td>' + typePill(p) + '</td>'
        + '<td>' + loc + '</td>'
        + '<td>' + d + '</td>'
        + '<td>' + statusPill(p) + '</td>'
        + '</tr>';
    }).join('');

    var alertPosts = local
      .filter(function(p){ return !p.firHidden && (!p.firStatus || p.firStatus === 'pending'); })
      .slice(0, 3);

    var alertItems = alertPosts.length
      ? alertPosts.map(function(p, i) {
          var colors = ['red', 'yellow', 'red'];
          return '<div class="fb-dash-alert-item">'
            + '<div class="fb-dash-alert-dot ' + colors[i] + '"></div>'
            + '<div><div class="fb-dash-alert-txt">' + (p.item || 'New case') + ' — ' + (p.loc || '—') + '</div>'
            + '<div class="fb-dash-alert-time">⏳ Pending review</div></div></div>';
        }).join('')
      : '<div style="padding:16px;text-align:center;font-size:11px;color:#94a3b8;">No pending alerts</div>';

    listEl.innerHTML =
      /* STAT CARDS */
      '<div class="fb-dash-stat-grid">'
      + '<div class="fb-dash-stat-card dsc-blue"><div class="dsc-icon">🔍</div><div class="dsc-val">' + lost + '</div><div class="dsc-lbl">Lost Cases</div><div class="dsc-chg">' + pending + ' pending</div></div>'
      + '<div class="fb-dash-stat-card dsc-green"><div class="dsc-icon">✅</div><div class="dsc-val">' + found + '</div><div class="dsc-lbl">Items Found</div><div class="dsc-chg">Active reports</div></div>'
      + '<div class="fb-dash-stat-card dsc-orange"><div class="dsc-icon">👤</div><div class="dsc-val">' + missing + '</div><div class="dsc-lbl">Missing Persons</div><div class="dsc-chg">Open alerts</div></div>'
      + '<div class="fb-dash-stat-card dsc-purple"><div class="dsc-icon">🏅</div><div class="dsc-val">' + solved + '</div><div class="dsc-lbl">Cases Solved</div><div class="dsc-chg">This district</div></div>'
      + '</div>'

      /* TWO COL */
      + '<div class="fb-dash-two-col">'

      /* TABLE */
      + '<div class="fb-dash-card">'
      + '<div class="fb-dash-card-head"><div class="dch-title">📋 Recent Cases</div>'
      + '<div class="dch-action" onclick="fbSwitchNav(\'fir\',null)">View All →</div></div>'
      + '<table class="fb-dash-table"><thead><tr>'
      + '<th>Item</th><th>Type</th><th>Location</th><th>Date</th><th>Status</th>'
      + '</tr></thead><tbody>'
      + (tableRows || '<tr><td colspan="5" style="text-align:center;padding:20px;color:#94a3b8;">No cases yet</td></tr>')
      + '</tbody></table></div>'

      /* RIGHT PANEL */
      + '<div style="display:flex;flex-direction:column;gap:12px;">'

      /* QUICK STATS */
      + '<div class="fb-dash-card">'
      + '<div class="fb-dash-card-head"><div class="dch-title">📊 Quick Stats</div></div>'
      + '<div class="fb-dash-mini-stat"><div class="fb-dash-mini-icon red">🔴</div><div><div class="fb-dash-mini-val">' + lost + '</div><div class="fb-dash-mini-lbl">Total Lost</div></div></div>'
      + '<div class="fb-dash-mini-stat"><div class="fb-dash-mini-icon green">🟢</div><div><div class="fb-dash-mini-val">' + found + '</div><div class="fb-dash-mini-lbl">Total Found</div></div></div>'
      + '<div class="fb-dash-mini-stat"><div class="fb-dash-mini-icon yellow">🟡</div><div><div class="fb-dash-mini-val">' + missing + '</div><div class="fb-dash-mini-lbl">Missing</div></div></div>'
      + '<div class="fb-dash-mini-stat"><div class="fb-dash-mini-icon blue">🔵</div><div><div class="fb-dash-mini-val">' + solved + '</div><div class="fb-dash-mini-lbl">Solved</div></div></div>'
      + '</div>'

      /* ALERTS */
      + '<div class="fb-dash-card">'
      + '<div class="fb-dash-card-head"><div class="dch-title">🔔 Alerts</div>'
      + '<div class="dch-action" onclick="fbSwitchNav(\'alerts\',null)">View All</div></div>'
      + alertItems
      + '</div>'

      + '</div></div>';
  };

  /* ── 3. OVERRIDE ngoLoadDashboard ── */
  window.ngoLoadDashboard = function() {
    var local = window._getLocalPosts ? window._getLocalPosts() : (window._allPosts || []);
    var el = function(id){ return document.getElementById(id); };
    if (el('ngo-stat-lost'))     el('ngo-stat-lost').textContent     = local.filter(function(p){ return p.type === 'lost'; }).length;
    if (el('ngo-stat-found'))    el('ngo-stat-found').textContent    = local.filter(function(p){ return p.type === 'found'; }).length;
    if (el('ngo-stat-missing'))  el('ngo-stat-missing').textContent  = local.filter(function(p){ return p.type === 'missing'; }).length;
    if (el('ngo-stat-resolved')) el('ngo-stat-resolved').textContent = local.filter(function(p){ return p.status === 'resolved'; }).length;

    if (!window._fbCurrentNav || window._fbCurrentNav === 'home') {
      window.ngoRenderDashHome();
    } else {
      window.fbRenderEmailList && window.fbRenderEmailList();
    }
  };

  /* ── 4. AUTO-HOOK: refresh dashboard when posts load ── */
  var _origRenderAll = window._renderAll;
  Object.defineProperty(window, '_renderAll', {
    set: function(fn) { _origRenderAll = fn; },
    get: function() {
      return function() {
        if (_origRenderAll) _origRenderAll();
        var db = document.getElementById('ngo-dashboard');
        if (db && db.style.display !== 'none') {
          window.ngoLoadDashboard && window.ngoLoadDashboard();
        }
      };
    }
  });

  console.log('✅ FindBack Dashboard Fix loaded');

  /* Fix: sidebar open hone pe background scroll band karo */
  var _origToggle = window.fbToggleSidebar;
  window.fbToggleSidebar = function() {
    if(_origToggle) _origToggle();
    var sb = document.getElementById('fb-sb');
    if(sb && sb.classList.contains('fb-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  window.fbCloseSidebar = function() {
    var sb = document.getElementById('fb-sb');
    var ov = document.getElementById('fb-sb-overlay');
    if(sb) sb.classList.remove('fb-open');
    if(ov) ov.classList.remove('fb-open');
    document.body.style.overflow = '';
  };
})();

