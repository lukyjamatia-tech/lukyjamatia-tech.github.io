(function(){
  var box;
  function show(m){
    if(!box){
      box=document.createElement('pre');
      box.style.cssText='position:fixed;left:0;right:0;bottom:0;max-height:45vh;overflow:auto;z-index:2147483647;background:#000;color:#0f0;font:11px monospace;padding:8px;margin:0;white-space:pre-wrap';
      (document.body||document.documentElement).appendChild(box);
    }
    box.textContent += m + '\n\n';
  }
  window.onerror=function(msg,src,l,c,e){show('ERROR: '+msg+'\n@ '+src+':'+l+':'+c+'\n'+((e&&e.stack)||''));};
  window.addEventListener('unhandledrejection',function(ev){
    var r=ev.reason; show('PROMISE: '+((r&&(r.stack||r.message))||r));
  });
  var ce=console.error;
  console.error=function(){show('console.error: '+[].slice.call(arguments).map(String).join(' '));ce.apply(console,arguments);};
})();
