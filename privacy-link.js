/* FindBack: small Privacy Policy + Delete account links in Profile.
   Standalone - placed right after the Wallet help card (#fb-helplinks),
   falls back to #fb-myphone. Follows the site's EN/HI toggle (fb_lang). */
(function () {
  var T = {
    en: { p: "Privacy Policy", d: "Delete account" },
    hi: { p: "गोपनीयता नीति", d: "अकाउंट हटाएँ" }
  };
  function lang() {
    try { return localStorage.getItem("fb_lang") === "hi" ? "hi" : "en"; }
    catch (e) { return "en"; }
  }
  function render(el) {
    var l = lang();
    if (el.getAttribute("data-lang") === l) return;
    el.setAttribute("data-lang", l);
    var s = 'style="color:inherit;text-decoration:underline"';
    el.innerHTML =
      '<a href="/privacy" ' + s + '>' + T[l].p + '</a>' +
      ' &nbsp;·&nbsp; ' +
      '<a href="/delete-account" ' + s + '>' + T[l].d + '</a>';
  }
  var tries = 0;
  function place() {
    if (document.getElementById("fb-privacylink")) return true;
    var anchor = document.getElementById("fb-helplinks");
    if (!anchor && tries > 20) anchor = document.getElementById("fb-myphone");
    if (!anchor || !anchor.parentNode) return false;
    var el = document.createElement("div");
    el.id = "fb-privacylink";
    el.style.cssText = "margin:8px 0 16px;text-align:center;font-size:13px;opacity:.8";
    anchor.parentNode.insertBefore(el, anchor.nextSibling);
    render(el);
    setInterval(function () { render(el); }, 1000);
    return true;
  }
  var iv = setInterval(function () {
    tries++;
    if (place() || tries > 120) clearInterval(iv);
  }, 500);
})();
