(function(){
  var CID = "504207496092-i84girvj2q3ft9rs31kp71vfn41sg2te.apps.googleusercontent.com";
  var inited = false;

  async function onCred(res){
    try{
      var m = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
      var c = m.GoogleAuthProvider.credential(res.credential);
      await m.signInWithCredential(window._auth, c);
      location.reload();
    }catch(e){ alert("GIS fail: "+(e.code||e.message)); }
  }

  function init(){
    if(inited) return true;
    if(!(window.google && google.accounts && google.accounts.id && window._auth)) return false;
    google.accounts.id.initialize({client_id: CID, callback: onCred});
    inited = true;
    return true;
  }

  function swap(){
    if(!init()) return;
    var bs = document.querySelectorAll('button[onclick*="doGoogleLogin"]:not([data-gis])');
    for(var i=0;i<bs.length;i++){
      var b = bs[i];
      b.setAttribute("data-gis","1");
      var d = document.createElement("div");
      d.style.cssText = "display:flex;justify-content:center;margin:8px 0";
      b.parentNode.insertBefore(d, b);
      b.style.display = "none";
      google.accounts.id.renderButton(d, {theme:"outline", size:"large", width:280});
    }
  }

  setInterval(swap, 1000);
  document.addEventListener("click", function(){ setTimeout(swap, 300); }, true);
})();
