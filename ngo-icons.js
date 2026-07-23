(function(){
function put(id,svg){
  var b=document.getElementById(id);
  if(!b)return;
  var d=b.querySelector('.fb-nav-icon');
  if(!d)return;
  d.innerHTML=svg;
  d.style.background='transparent';
}
var W='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
var I={
'fnav-ngo-home':W+'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
'fnav-ngo-missing':W+'<circle cx="10" cy="8" r="4"/><path d="M3 21v-1a7 7 0 0 1 11-5.7"/><path d="M17.5 14.5a2.3 2.3 0 0 1 4 1.5c0 1.5-2 2-2 3.2"/><path d="M19.5 21.5v.01"/></svg>',
'fnav-ngo-rescue':W+'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21"/></svg>',
'fnav-ngo-cases':W+'<path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
'fnav-ngo-resolved':W+'<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>',
'fnav-ngo-volunteers':W+'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 13.6A6.5 6.5 0 0 1 21.5 20"/></svg>',
'fnav-ngo-shelter':W+'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
'fnav-ngo-analytics':W+'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
'fnav-ngo-alerts':W+'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
'fnav-ngo-collab':W+'<path d="M21 12a9 9 0 0 1-13 8l-5 1 1.4-4.2A9 9 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>',
'fnav-ngo-reports':W+'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>',
'fnav-ngo-bulk':W+'<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/></svg>'
};
function header(){
  var H='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;">';
  document.querySelectorAll('.fb-ham').forEach(function(el){
    if(!el.querySelector('svg')){
      el.insertAdjacentHTML('afterbegin',H+'<path d="M4 6h16M4 12h16M4 18h16"/></svg>');
    }
  });
  document.querySelectorAll('.fb-gov-emblem').forEach(function(el){
    if(!el.querySelector('svg')){
      el.insertAdjacentHTML('afterbegin',H+'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3"/></svg>');
    }
  });
  document.querySelectorAll('.fb-bell-btn').forEach(function(el){
    if(!el.querySelector('svg')){
      el.insertAdjacentHTML('afterbegin',H+'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>');
    }
  });
}
function go(){for(var k in I)put(k,I[k]);header();}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',go);}else{go();}
})();
