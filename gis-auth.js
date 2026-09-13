(function(){
  var CLIENT_ID = "504207496092-i84girvj2q3ft9rs31kp71vfn41sg2te.apps.googleusercontent.com";

  function ready(){
    return window.google && google.accounts && google.accounts.id && window._auth;
  }

  async function onCredential(res){
    try{
      var m = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
      var cred = m.GoogleAuthProvider.credential(res.credential);
      await m.signInWithCredential(window._auth, cred);
      if(window.toast) toast("Login successful");
    }catch(e){
      alert("GIS: " + (e.code || "") + " " + (e.message || e));
    }
  }

  function mount(){
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: onCredential,
      auto_select: false
    });
    var btns = document.querySelectorAll('button[onclick*="doGoogleLogin"]');
    btns.forEach(function(b, i){
      var d = document.createElement("div");
      d.id = "gisBtn" + i;
      d.style.display = "flex";
      d.style.justifyContent = "center";
      b.parentNode.insertBefore(d, b);
      b.style.display = "none";
      google.accounts.id.renderButton(d, {
        theme: "outline", size: "large", width: 300, text: "continue_with"
      });
    });
  }

  var tries = 0;
  var t = setInterval(function(){
    if(ready()){ clearInterval(t); try{ mount(); }catch(e){ alert("mount: "+e.message); } }
    else if(++tries > 60){ clearInterval(t); }
  }, 500);
})();
