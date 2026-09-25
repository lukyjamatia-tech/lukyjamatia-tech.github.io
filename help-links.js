/* FindBack: help-links.js
   Adds a small "Wallet or documents lost?" card right below the My Phone card in Profile.
   Standalone: needs only <div id="fb-myphone"> to exist. Touches nothing else. */
(function () {
  var T = {
    en: { title: "Lost your wallet or documents?", sub: "Step-by-step: block cards, lock Aadhaar, get duplicates", btn: "See what to do" },
    hi: { title: "पर्स या दस्तावेज़ खो गए?", sub: "स्टेप-बाय-स्टेप: कार्ड ब्लॉक, आधार लॉक, डुप्लीकेट", btn: "क्या करें, देखें" }
  };
  function lang() {
    try { return localStorage.getItem("fb_lang") === "hi" ? "hi" : "en"; } catch (e) { return "en"; }
  }
  var shown = null;
  function render(card) {
    var l = lang();
    if (l === shown) return;
    shown = l;
    var t = T[l];
    card.innerHTML =
      '<div style="font-weight:700;font-size:16px;margin-bottom:4px">' + t.title + '</div>' +
      '<div style="font-size:14px;opacity:.75;margin-bottom:10px">' + t.sub + '</div>' +
      '<a href="/help/wallet" style="display:inline-block;padding:8px 14px;border-radius:8px;' +
      'background:#16324F;color:#fff;text-decoration:none;font-size:14px">' + t.btn + '</a>';
  }
  function init() {
    var anchor = document.getElementById("fb-myphone");
    if (!anchor || document.getElementById("fb-helplinks")) return;
    var card = document.createElement("div");
    card.id = "fb-helplinks";
    card.style.cssText = "margin:12px 0;padding:14px;border:1px solid rgba(128,128,128,.3);border-radius:12px";
    anchor.parentNode.insertBefore(card, anchor.nextSibling);
    render(card);
    setInterval(function () { render(card); }, 1000); /* follows the site's EN/HI toggle */
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
