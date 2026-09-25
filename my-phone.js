/* FindBack - My Phone (standalone module) - English / Hindi
   Sirf window._auth, window._db aur <div id="fb-myphone"> use karta hai.
   Data sirf "my_phones/<uid>" mein. Baaki kuch nahi chhoota. */
(function () {
  var FB_VER = '10.12.0';
  var ROOT_ID = 'fb-myphone';
  var COL = 'my_phones';
  var LINK_LOCK = 'https://www.google.com/android/find';
  var LINK_LOCK2 = 'https://www.android.com/lock';
  var LINK_CEIR = 'https://sancharsaathi.gov.in/';

  /* Site ki language pata karna. Zaroorat ho to sirf yeh function badlein. */
  function getLang() {
    var c = [safeLS('fb_lang'), window.currentLang, window.lang, window._lang, window.appLang,
      safeLS('lang'), safeLS('fb_lang'), safeLS('language'), document.documentElement.lang];
    for (var i = 0; i < c.length; i++) {
      if (c[i]) return /^hi/i.test(String(c[i])) ? 'hi' : 'en';
    }
    return 'en';
  }
  function safeLS(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var T = {
    en: {
      title: 'My Phone', sub: 'Fill this once. It will help if your phone is ever lost.',
      model: 'Phone model', imei1: 'IMEI 1', imei2: 'IMEI 2 (if dual SIM)', pn: 'This phone\'s number',
      bn: 'Family member\'s number', be: 'Family member\'s email', bill: 'Phone bill (photo, optional)',
      save: 'Save', saving: 'Saving...', cancel: 'Cancel', edit: 'Edit',
      h_model: ['How to find the model?', ['Open Settings', 'Tap "About phone" at the bottom', 'You will see "Model name", e.g. Samsung A15']],
      h_imei: ['How to find the IMEI?', ['Open the phone dialer (call app)', 'Type <b>*#06#</b> (no need to press call)', 'The 15-digit IMEI appears; dual SIM phones show two', 'Or go to Settings > About phone > IMEI', 'It is also printed on the phone box sticker and the bill']],
      h_imei2: ['What is IMEI 2?', ['Dual SIM phones have two IMEIs. Dialling *#06# shows both. If only one appears, leave this box empty.']],
      h_pn: ['How to find your number?', ['Settings > About phone > Status (or SIM status)', 'Look for "My phone number"', 'If it is not shown, call someone and check your number on their phone']],
      h_bn: ['Why is this needed?', ['If your phone is lost, alerts and the CEIR OTP will come to this number, since your own phone will not be with you. Use a trusted family member\'s number.']],
      h_be: ['Why is this needed?', ['If your phone is lost, FindBack will send an alert to this email so your family knows right away.']],
      h_bill: ['Why the bill?', ['CEIR asks for the phone bill when blocking the IMEI. Take a photo now so you don\'t have to search for it later.']],
      e_req: 'Model, IMEI 1, this phone\'s number and family member\'s number are required.',
      e_i1: 'IMEI 1 is not valid. Dial *#06# and check again.', e_i2: 'IMEI 2 is not valid.',
      e_num: 'Phone numbers must be 10 digits.', e_mail: 'Email is not valid.',
      e_save: 'Could not save. Check your internet and try again.', e_upd: 'Could not update. Try again.',
      e_load: 'My Phone could not load. Refresh the page.', e_copy: 'Could not copy. Select the message and copy it yourself.',
      login: 'Log in to register your phone.', loading: 'Loading...',
      safe: 'Safe', lost: 'Lost', backup: 'Backup', lostBtn: 'Phone lost', two: 'Do these 2 things:',
      lock: '1. Lock the phone', msgNote: 'Put this in the lock screen message:', copy: 'Copy message', copied: 'Copied',
      newPh: 'New phone (Android 15+)? Lock it with just the number at', ceir: '2. Block IMEI (CEIR)',
      ceirNote: function (d) { return 'For CEIR: IMEI 1 ' + d.imei1 + (d.imei2 ? ', IMEI 2 ' + d.imei2 : '') + ', number ' + d.phoneNo + '. Get the OTP on your family member\'s number.'; },
      found: 'Found it', undo: 'Cancel (pressed by mistake)', ceirHow: 'On that site, tap "Block your lost / stolen mobile handset".', confirm: 'Is your phone really lost?',
      foundMsg: 'Great! If you blocked the IMEI, remember to unblock it on CEIR.',
      lockMsg: function (n) { return 'Please return this phone, reward offered. Call: ' + n + ' | findback.org'; }
    },
    hi: {
      title: 'मेरा फ़ोन', sub: 'इसे सिर्फ़ एक बार भरें। फ़ोन खोने पर यही जानकारी काम आएगी।',
      model: 'फ़ोन मॉडल', imei1: 'IMEI 1', imei2: 'IMEI 2 (डुअल सिम हो तो)', pn: 'इस फ़ोन का नंबर',
      bn: 'परिवार के सदस्य का नंबर', be: 'परिवार के सदस्य का ईमेल', bill: 'फ़ोन का बिल (फ़ोटो, वैकल्पिक)',
      save: 'सेव करें', saving: 'सेव हो रहा है...', cancel: 'रद्द करें', edit: 'बदलें',
      h_model: ['मॉडल कैसे देखें?', ['सेटिंग्स खोलें', 'सबसे नीचे "About phone" दबाएँ', 'वहाँ "Model name" लिखा होगा, जैसे Samsung A15']],
      h_imei: ['IMEI कैसे ढूँढें?', ['फ़ोन का डायलर (कॉल वाला ऐप) खोलें', '<b>*#06#</b> टाइप करें, कॉल दबाने की ज़रूरत नहीं', 'स्क्रीन पर 15 अंकों का IMEI दिखेगा, डुअल सिम में दो', 'या सेटिंग्स > About phone > IMEI', 'या फ़ोन के डिब्बे के स्टिकर या बिल पर भी लिखा होता है']],
      h_imei2: ['IMEI 2 क्या है?', ['डुअल सिम फ़ोन में दो IMEI होते हैं। *#06# डायल करने पर दोनों एक साथ दिखते हैं। एक ही दिखे तो यह बॉक्स खाली छोड़ दें।']],
      h_pn: ['अपना नंबर कैसे देखें?', ['सेटिंग्स > About phone > Status (या SIM status)', 'वहाँ "My phone number" दिखेगा', 'न दिखे तो किसी को कॉल करके उनके फ़ोन पर अपना नंबर देख लें']],
      h_bn: ['यह क्यों चाहिए?', ['फ़ोन खोने पर अलर्ट और CEIR का OTP इसी नंबर पर आएगा, क्योंकि आपका फ़ोन आपके पास नहीं होगा। परिवार के किसी भरोसेमंद व्यक्ति का नंबर डालें।']],
      h_be: ['यह क्यों चाहिए?', ['फ़ोन खोने पर FindBack का अलर्ट इस ईमेल पर जाएगा, ताकि परिवार को तुरंत पता चल सके।']],
      h_bill: ['बिल क्यों?', ['CEIR पर IMEI ब्लॉक करते समय फ़ोन का बिल माँगा जाता है। अभी फ़ोटो खींचकर रख लें, बाद में ढूँढना नहीं पड़ेगा।']],
      e_req: 'मॉडल, IMEI 1, इस फ़ोन का नंबर और परिवार के सदस्य का नंबर ज़रूरी है।',
      e_i1: 'IMEI 1 सही नहीं है। *#06# डायल करके दोबारा देखें।', e_i2: 'IMEI 2 सही नहीं है।',
      e_num: 'फ़ोन नंबर 10 अंकों का होना चाहिए।', e_mail: 'ईमेल सही नहीं है।',
      e_save: 'सेव नहीं हुआ। इंटरनेट देखें और दोबारा कोशिश करें।', e_upd: 'अपडेट नहीं हुआ। दोबारा कोशिश करें।',
      e_load: 'मेरा फ़ोन लोड नहीं हुआ। पेज रिफ़्रेश करें।', e_copy: 'कॉपी नहीं हुआ। संदेश को खुद चुनकर कॉपी करें।',
      login: 'अपना फ़ोन रजिस्टर करने के लिए पहले लॉगिन करें।', loading: 'लोड हो रहा है...',
      safe: 'सुरक्षित', lost: 'खोया', backup: 'बैकअप', lostBtn: 'फ़ोन खो गया', two: 'ये 2 काम करें:',
      lock: '1. फ़ोन लॉक करें', msgNote: 'लॉक स्क्रीन संदेश में यह डालें:', copy: 'संदेश कॉपी करें', copied: 'कॉपी हो गया',
      newPh: 'नया फ़ोन (Android 15+)? सिर्फ़ नंबर से लॉक करें:', ceir: '2. IMEI ब्लॉक करें (CEIR)',
      ceirNote: function (d) { return 'CEIR के लिए: IMEI 1 ' + d.imei1 + (d.imei2 ? ', IMEI 2 ' + d.imei2 : '') + ', नंबर ' + d.phoneNo + '। OTP परिवार के सदस्य के नंबर पर लें।'; },
      found: 'मिल गया', undo: 'रद्द करें (गलती से दबाया)', ceirHow: 'उस साइट पर "Block your lost / stolen mobile handset" दबाएँ।', confirm: 'क्या आपका फ़ोन सच में खो गया है?',
      foundMsg: 'बधाई! अगर IMEI ब्लॉक किया था तो CEIR पर अनब्लॉक करना न भूलें।',
      lockMsg: function (n) { return 'कृपया यह फ़ोन लौटाएँ, इनाम मिलेगा। कॉल करें: ' + n + ' | findback.org'; }
    }
  };
  var L = 'en';
  function t(k) { return T[L][k]; }

  var css = '#fb-myphone .mp{font-family:inherit;border:1px solid #d7dbe0;border-radius:14px;padding:16px;background:#fff;color:#1d2330;max-width:480px;margin:12px auto;box-sizing:border-box}' +
    '#fb-myphone .mp.safe{border-color:#2e9e5b}#fb-myphone .mp.lost{border-color:#d33b3b}' +
    '#fb-myphone .mp h3{margin:0 0 4px;font-size:17px}#fb-myphone .mp .sub{margin:0 0 8px;font-size:13px;color:#5b6472}' +
    '#fb-myphone .mp label{display:block;font-size:13px;color:#5b6472;margin:10px 0 4px}' +
    '#fb-myphone .mp input{width:100%;box-sizing:border-box;height:42px;border:1px solid #c9ced6;border-radius:8px;padding:0 10px;font-size:15px}' +
    '#fb-myphone .mp .btn{display:block;width:100%;min-height:46px;margin-top:10px;border-radius:10px;border:1px solid #c9ced6;background:#fff;font-size:15px;font-weight:600;cursor:pointer;text-align:center;text-decoration:none;line-height:46px;color:#1d2330;box-sizing:border-box}' +
    '#fb-myphone .mp .pri{background:#1f6fd1;border-color:#1f6fd1;color:#fff}#fb-myphone .mp .red{border-color:#d33b3b;color:#d33b3b}#fb-myphone .mp .grn{border-color:#2e9e5b;color:#2e9e5b}' +
    '#fb-myphone .mp .err{color:#d33b3b;font-size:13px;min-height:18px;margin-top:6px}' +
    '#fb-myphone .mp .row{border-top:1px solid #eceff3;padding:8px 0;font-size:14px}' +
    '#fb-myphone .mp .badge{float:right;font-size:12px;padding:3px 10px;border-radius:8px}' +
    '#fb-myphone .mp .bs{background:#e3f4ea;color:#1e6e3f}#fb-myphone .mp .bl{background:#fbe5e5;color:#9b2323}' +
    '#fb-myphone .mp .note{font-size:12px;color:#5b6472;margin-top:8px}#fb-myphone .mp img{max-width:100%;border-radius:8px;margin-top:6px}' +
    '#fb-myphone .mp details{margin-top:6px;font-size:13px;background:#f3f6fa;border-radius:8px;padding:6px 10px}' +
    '#fb-myphone .mp summary{cursor:pointer;color:#1f6fd1;font-weight:600}' +
    '#fb-myphone .mp details ol,#fb-myphone .mp details p{margin:6px 0 2px;padding-left:18px;color:#3a4250;line-height:1.5}' +
    '#fb-myphone .mp details p{padding-left:0}';

  var FS, root, uid, data = null, view = '', draft = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function hint(k) {
    var h = t(k), s = h[1];
    return '<details><summary>' + h[0] + '</summary>' +
      (s.length > 1 ? '<ol><li>' + s.join('</li><li>') + '</li></ol>' : '<p>' + s[0] + '</p>') + '</details>';
  }
  function luhn(n) {
    var s = 0;
    for (var i = 0; i < 15; i++) {
      var d = +n[14 - i];
      if (i % 2) { d *= 2; if (d > 9) d -= 9; }
      s += d;
    }
    return s % 10 === 0;
  }
  function tail(s) { return s ? '••••' + String(s).slice(-4) : '-'; }

  function compress(file) {
    return new Promise(function (res, rej) {
      var r = new FileReader();
      r.onload = function () {
        var img = new Image();
        img.onload = function () {
          var MAX = 600, w = img.width, h = img.height;
          if (w > MAX || h > MAX) { var k = MAX / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
          var c = document.createElement('canvas'); c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          res(c.toDataURL('image/jpeg', 0.6));
        };
        img.onerror = rej; img.src = r.result;
      };
      r.onerror = rej; r.readAsDataURL(file);
    });
  }

  function save(patch) {
    data = Object.assign({}, data || {}, patch, { updatedAt: Date.now() });
    return FS.setDoc(FS.doc(window._db, COL, uid), data);
  }

  function renderMsg(k) { view = 'msg:' + k; root.innerHTML = '<div class="mp"><h3>' + t('title') + '</h3><p class="sub">' + t(k) + '</p></div>'; }

  function renderForm() {
    view = 'form';
    var d = draft || data || {};
    draft = null;
    root.innerHTML = '<div class="mp"><h3>' + t('title') + '</h3><p class="sub">' + t('sub') + '</p>' +
      '<label>' + t('model') + '</label><input id="mp-m" value="' + esc(d.model) + '" placeholder="Samsung A15">' + hint('h_model') +
      '<label>' + t('imei1') + '</label><input id="mp-i1" inputmode="numeric" maxlength="15" value="' + esc(d.imei1) + '">' + hint('h_imei') +
      '<label>' + t('imei2') + '</label><input id="mp-i2" inputmode="numeric" maxlength="15" value="' + esc(d.imei2) + '">' + hint('h_imei2') +
      '<label>' + t('pn') + '</label><input id="mp-pn" inputmode="tel" value="' + esc(d.phoneNo) + '">' + hint('h_pn') +
      '<label>' + t('bn') + '</label><input id="mp-bn" inputmode="tel" value="' + esc(d.backupNo) + '">' + hint('h_bn') +
      '<label>' + t('be') + '</label><input id="mp-be" type="email" value="' + esc(d.backupEmail) + '">' + hint('h_be') +
      '<label>' + t('bill') + '</label><input id="mp-bill" type="file" accept="image/*" style="height:auto;padding:8px">' + hint('h_bill') +
      (data && data.bill ? '<img src="' + data.bill + '" alt="">' : '') +
      '<div class="err" id="mp-err"></div>' +
      '<button class="btn pri" id="mp-save">' + t('save') + '</button>' +
      (data ? '<button class="btn" id="mp-cancel">' + t('cancel') + '</button>' : '') + '</div>';

    var err = root.querySelector('#mp-err');
    root.querySelectorAll('input').forEach(function (x) { x.oninput = function () { err.textContent = ''; }; });
    if (data) root.querySelector('#mp-cancel').onclick = renderCard;

    root.querySelector('#mp-save').onclick = function () {
      var v = readForm();
      if (!v.model || !v.imei1 || !v.phoneNo || !v.backupNo) { err.textContent = t('e_req'); return; }
      if (!/^\d{15}$/.test(v.imei1) || !luhn(v.imei1)) { err.textContent = t('e_i1'); return; }
      if (v.imei2 && (!/^\d{15}$/.test(v.imei2) || !luhn(v.imei2))) { err.textContent = t('e_i2'); return; }
      if (!/^\+?\d{10,13}$/.test(v.phoneNo.replace(/\s/g, '')) || !/^\+?\d{10,13}$/.test(v.backupNo.replace(/\s/g, ''))) { err.textContent = t('e_num'); return; }
      if (v.backupEmail && !/^\S+@\S+\.\S+$/.test(v.backupEmail)) { err.textContent = t('e_mail'); return; }
      var btn = root.querySelector('#mp-save'); btn.disabled = true; btn.textContent = t('saving');
      var f = root.querySelector('#mp-bill').files[0];
      (f ? compress(f) : Promise.resolve(data && data.bill || '')).then(function (bill) {
        v.bill = bill; v.status = (data && data.status) || 'safe';
        return save(v);
      }).then(renderCard).catch(function (e) {
        console.log('my-phone save', e);
        btn.disabled = false; btn.textContent = t('save'); err.textContent = t('e_save');
      });
    };
  }

  function readForm() {
    var g = function (id) { var e = root.querySelector(id); return e ? e.value.trim() : ''; };
    return { model: g('#mp-m'), imei1: g('#mp-i1'), imei2: g('#mp-i2'), phoneNo: g('#mp-pn'), backupNo: g('#mp-bn'), backupEmail: g('#mp-be') };
  }

  function renderCard() {
    view = 'card';
    var d = data, lost = d.status === 'lost', msg = t('lockMsg')(d.backupNo);
    var h = '<div class="mp ' + (lost ? 'lost' : 'safe') + '">' +
      '<span class="badge ' + (lost ? 'bl">' + t('lost') : 'bs">' + t('safe')) + '</span>' +
      '<h3>' + esc(d.model) + '</h3><p class="sub">IMEI ' + tail(d.imei1) + (d.imei2 ? ' / ' + tail(d.imei2) : '') + '</p>' +
      '<div class="row">' + t('backup') + ': ' + esc(d.backupNo) + '</div>';
    if (!lost) {
      h += '<button class="btn red" id="mp-lost">' + t('lostBtn') + '</button><button class="btn" id="mp-edit">' + t('edit') + '</button>';
    } else {
      h += '<p class="sub" style="margin-top:10px">' + t('two') + '</p>' +
        '<a class="btn" href="' + LINK_LOCK + '" target="_blank" rel="noopener">' + t('lock') + '</a>' +
        '<div class="note">' + t('msgNote') + '</div><div class="row">' + esc(msg) + '</div>' +
        '<button class="btn" id="mp-copy">' + t('copy') + '</button>' +
        '<div class="note">' + t('newPh') + ' <a href="' + LINK_LOCK2 + '" target="_blank" rel="noopener">android.com/lock</a></div>' +
        '<a class="btn" href="' + LINK_CEIR + '" target="_blank" rel="noopener">' + t('ceir') + '</a>' +
        '<div class="note">' + esc(t('ceirHow')) + '</div>' + '<div class="note">' + esc(t('ceirNote')(d)) + '</div>' +
        '<button class="btn grn" id="mp-found">' + t('found') + '</button>' + '<button class="btn" id="mp-undo">' + t('undo') + '</button>';
    }
    h += '<div class="err" id="mp-err"></div></div>';
    root.innerHTML = h;

    var err = root.querySelector('#mp-err');
    var setStatus = function (s, after) {
      save({ status: s, lostAt: s === 'lost' ? Date.now() : null }).then(after).catch(function (e) {
        console.log('my-phone status', e); err.textContent = t('e_upd');
      });
    };
    if (!lost) {
      root.querySelector('#mp-edit').onclick = renderForm;
      root.querySelector('#mp-lost').onclick = function () { if (confirm(t('confirm'))) setStatus('lost', renderCard); };
    } else {
      root.querySelector('#mp-copy').onclick = function () {
        var b = this;
        (navigator.clipboard ? navigator.clipboard.writeText(msg) : Promise.reject()).then(function () {
          b.textContent = t('copied');
        }).catch(function () { err.textContent = t('e_copy'); });
      };
      root.querySelector('#mp-undo').onclick = function () { setStatus('safe', renderCard); };
      root.querySelector('#mp-found').onclick = function () {
        setStatus('safe', function () { renderCard(); alert(t('foundMsg')); });
      };
    }
  }

  function rerender() {
    if (view === 'form') { draft = readForm(); renderForm(); }
    else if (view === 'card') renderCard();
    else if (view.indexOf('msg:') === 0) renderMsg(view.slice(4));
  }

  function start() {
    root = document.getElementById(ROOT_ID);
    if (!root || !window._auth || !window._db) { setTimeout(start, 400); return; }
    L = getLang();
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    setInterval(function () { var n = getLang(); if (n !== L) { L = n; rerender(); } }, 1000);
    import('https://www.gstatic.com/firebasejs/' + FB_VER + '/firebase-firestore.js').then(function (m) {
      FS = m;
      window._auth.onAuthStateChanged(function (u) {
        if (!u) { uid = null; data = null; renderMsg('login'); return; }
        uid = u.uid;
        renderMsg('loading');
        FS.getDoc(FS.doc(window._db, COL, uid)).then(function (s) {
          data = s.exists() ? s.data() : null;
          data ? renderCard() : renderForm();
        }).catch(function (e) { console.log('my-phone load', e); renderMsg('e_load'); });
      });
    }).catch(function (e) { console.log('my-phone import', e); });
  }
  start();
})();
