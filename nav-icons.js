(function () {
  var map = [
    ['dashboard', 'ti-layout-dashboard'],
    ['fir', 'ti-file-description'],
    ['missing', 'ti-user-search'],
    ['all case', 'ti-folders'],
    ['resolved', 'ti-circle-check'],
    ['alert', 'ti-bell'],
    ['analytic', 'ti-chart-bar'],
    ['fraud', 'ti-shield-lock'],
    ['collab', 'ti-users'],
    ['export', 'ti-download'],
    ['bulk', 'ti-upload']
  ];
  function paint() {
    var els = document.querySelectorAll('.fb-nav-icon');
    els.forEach(function (el) {
      if (el.getAttribute('data-ic')) return;
      var t = (el.parentNode.textContent || '').toLowerCase();
      var ic = 'ti-point';
      for (var i = 0; i < map.length; i++) {
        if (t.indexOf(map[i][0]) > -1) { ic = map[i][1]; break; }
      }
      el.setAttribute('data-ic', '1');
      el.innerHTML = '<i class="ti ' + ic + '"></i>';
      el.style.cssText = 'background:transparent;border:0;font-size:20px;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px';
    });
    return els.length;
  }
  var n = 0;
  var t = setInterval(function () {
    paint();
    if (++n > 60) clearInterval(t);
  }, 500);
})();
