var FB_C={brown:'#8B5E3C',bhura:'#8B5E3C',black:'#2F2F2F',kala:'#2F2F2F',kaala:'#2F2F2F',white:'#9AA0A6',safed:'#9AA0A6',grey:'#78808A',gray:'#78808A',red:'#D14343',lal:'#D14343',laal:'#D14343',blue:'#2F6FD0',neela:'#2F6FD0',green:'#2E9E5B',hara:'#2E9E5B',yellow:'#D9A21B',peela:'#D9A21B',orange:'#E07A2F',pink:'#D45C93',gulabi:'#D45C93',purple:'#7B52C4',golden:'#B8912F',gold:'#B8912F',silver:'#8E99A4',maroon:'#8C2F3E',cream:'#B9A88A',beige:'#B9A88A',navy:'#2A3E6B'};
var FB_I={
wallet:'<rect x="2.5" y="6" width="19" height="13" rx="2.5"/><path d="M2.5 10h19"/><circle cx="17" cy="14.5" r="1.4"/>',
phone:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
keys:'<circle cx="7" cy="12" r="3.5"/><path d="M10.5 12H21"/><path d="M17 12v3.5"/><path d="M20 12v2.5"/>',
bag:'<path d="M5 9h14v10.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/>',
document:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/>',
idcard:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.2"/><path d="M14 10h4"/><path d="M14 14h4"/>',
card:'<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19"/><path d="M6 15h4"/>',
money:'<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><circle cx="12" cy="12" r="2.8"/>',
laptop:'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
watch:'<circle cx="12" cy="12" r="5"/><path d="M9 7.2V3h6v4.2"/><path d="M9 16.8V21h6v-4.2"/>',
glasses:'<circle cx="6.5" cy="14" r="3.4"/><circle cx="17.5" cy="14" r="3.4"/><path d="M9.9 14h4.2"/><path d="M3.1 11.5 5.2 8"/><path d="M20.9 11.5 18.8 8"/>',
audio:'<path d="M4 15.5V12a8 8 0 0 1 16 0v3.5"/><rect x="2" y="14" width="4.5" height="7" rx="2"/><rect x="17.5" y="14" width="4.5" height="7" rx="2"/>',
jewel:'<circle cx="12" cy="14.5" r="5.5"/><path d="M9 6.5 12 3l3 3.5"/><path d="M9 6.5h6"/>',
umbrella:'<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v7a2.5 2.5 0 0 0 5 0"/>',
book:'<path d="M5.5 4h11a2 2 0 0 1 2 2v14h-11a2 2 0 0 1-2-2z"/><path d="M18.5 16h-11a2 2 0 0 0-2 2"/>',
bottle:'<path d="M10 2.5h4v3l1.4 2.4a4 4 0 0 1 .6 2.1v9.5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10a4 4 0 0 1 .6-2.1L10 5.5z"/><path d="M8 13h8"/>',
vehicle:'<circle cx="6" cy="17" r="3.4"/><circle cx="18" cy="17" r="3.4"/><path d="M6 17l4.5-8H15l3 8"/>',
luggage:'<rect x="4.5" y="7" width="15" height="12.5" rx="2"/><path d="M9.5 7V4h5v3"/>',
clothing:'<path d="M8 3.5l4 2 4-2 5 3-2 4-2-1v11H7v-11l-2 1-2-4z"/>',
person:'<circle cx="12" cy="8" r="4"/><path d="M4.5 21c1-4.2 4-6.5 7.5-6.5s6.5 2.3 7.5 6.5"/>',
box:'<path d="M3 8l9-4.8L21 8v8l-9 4.8L3 16z"/><path d="M3 8l9 4.8L21 8"/><path d="M12 12.8V20.8"/>'};
var FB_M={wallet:'wallet',purse:'wallet',mobile:'phone',phone:'phone',smartphone:'phone',tablet:'phone',key:'keys',bag:'bag',backpack:'bag',handbag:'bag',document:'document',certificate:'document',marksheet:'document',passport:'document',aadhaar:'idcard',aadhar:'idcard',pan:'idcard',id:'idcard',voter:'idcard',licence:'idcard',license:'idcard',atm:'card',debit:'card',credit:'card',sim:'card',cash:'money',money:'money',laptop:'laptop',computer:'laptop',earphone:'audio',headphone:'audio',earbud:'audio',watch:'watch',spectacle:'glasses',glass:'glasses',sunglass:'glasses',jewel:'jewel',ring:'jewel',chain:'jewel',ornament:'jewel',umbrella:'umbrella',book:'book',notebook:'book',diary:'book',bottle:'bottle',tiffin:'bottle',vehicle:'vehicle',bike:'vehicle',cycle:'vehicle',scooter:'vehicle',car:'vehicle',luggage:'luggage',suitcase:'luggage',trolley:'luggage',cloth:'clothing',jacket:'clothing',shoe:'clothing',person:'person',child:'person',people:'person',chabi:'keys',chashma:'glasses',juta:'clothing',chappal:'clothing',sandal:'clothing',batua:'wallet',paisa:'money',ghadi:'watch',kitab:'book',gaadi:'vehicle',bicycle:'vehicle',earring:'jewel',necklace:'jewel',bangle:'jewel',payal:'jewel'};
function fbColor(t){if(!t)return '#7A828C';var w=String(t).toLowerCase().split(/[^a-z\u0900-\u097F]+/);for(var i=0;i<w.length;i++){if(FB_C[w[i]])return FB_C[w[i]];}return '#7A828C';}
function fbKey(c){if(!c)return 'box';var k=String(c).toLowerCase().trim();if(FB_M[k])return FB_M[k];for(var m in FB_M){if(k.indexOf(m)>-1)return FB_M[m];}return 'box';}
window.fbPh=function(cat,txt,h,sz){h=h||110;sz=sz||44;var k=fbKey(cat);if(k==='box')k=fbKey(txt||'');var c=fbColor((cat||'')+' '+(txt||''));var lbl=h>=80?'<span style="font-size:10px;color:#6B7280;margin-top:5px;">No photo available</span>':'';return '<div style="height:'+h+'px;width:100%;background:#f3f4f6;display:flex;flex-direction:column;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" fill="none" stroke="'+c+'" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(FB_I[k]||FB_I.box)+'</svg>'+lbl+'</div>';};
FB_I.shoe='<path d="M3 17v-6h3l2.5-2.5L11 11h4.5a6.5 6.5 0 0 1 6.5 6v1H4a1 1 0 0 1-1-1Z"/><path d="M7 11v2.5"/><path d="M11 11v2.5"/><path d="M15 12.5v2"/>';
FB_M.shoe='shoe';FB_M.shoes='shoe';FB_M.sandal='shoe';FB_M.slipper='shoe';FB_M.boot='shoe';FB_M.juta='shoe';FB_M.chappal='shoe';FB_M.sneaker='shoe';
(function(){function setMax(){var t=new Date();var d=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');document.querySelectorAll('input[type="date"]').forEach(function(el){el.setAttribute('max',d);});}
document.addEventListener('DOMContentLoaded',setMax);setInterval(setMax,2000);})();
document.addEventListener('change',function(e){var el=e.target;if(!el||el.type!=='date'||!el.value)return;var t=new Date();t.setHours(23,59,59,999);if(new Date(el.value)>t){el.value='';alert('Future date not allowed');}},true);
