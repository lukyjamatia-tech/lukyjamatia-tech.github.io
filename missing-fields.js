// missing-fields.js — FindBack
// Missing form extra fields: age, gender, police complaint no.
// Also relabels the existing Identification Mark field for Missing posts.
// Standalone: index.html only needs the script tag + two small hooks
// (window.fbMissingExtra in the post save, window.fbMissingDesc in post details).
(function () {
  'use strict';

  function hi() { try { return localStorage.getItem('fb_lang') === 'hi'; } catch (e) { return false; } }
  function T(en, h) { return hi() ? h : en; }
  function el(id) { return document.getElementById(id); }
  function optTag() { return ' <span style="font-size:11px;color:var(--text-muted);">(' + T('Optional', 'वैकल्पिक') + ')</span>'; }
  function clean(s) { return String(s || '').replace(/[<>]/g, '').trim().slice(0, 100); }
  function isMissingType(t) { return t === 'missing' || t === 'person'; }

  var origLabel = null;

  // Insert the extra fields right after the Identification Mark group (once)
  function ensureFields() {
    if (el('missing-extra-group')) return true;
    var anchor = el('id-mark-group');
    if (!anchor || !anchor.parentNode) return false;
    var box = document.createElement('div');
    box.id = 'missing-extra-group';
    box.style.display = 'none';
    box.innerHTML =
      '<div class="form-group"><label id="mx-age-l"></label>' +
        '<input type="number" id="m-age" min="0" max="120" inputmode="numeric"></div>' +
      '<div class="form-group"><label id="mx-gender-l"></label>' +
        '<select id="m-gender"><option value=""></option><option value="male"></option>' +
        '<option value="female"></option><option value="other"></option></select></div>' +
      '<div class="form-group"><label id="mx-comp-l"></label>' +
        '<input type="text" id="m-complaint" maxlength="60"></div>';
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    return true;
  }

  function setLabels() {
    var a = el('mx-age-l'), g = el('mx-gender-l'), c = el('mx-comp-l');
    if (a) a.innerHTML = T('Age', 'उम्र') + optTag();
    if (g) g.innerHTML = T('Gender', 'लिंग') + optTag();
    if (c) c.innerHTML = T('Police complaint / FIR no.', 'पुलिस शिकायत / FIR नंबर') + optTag();
    var s = el('m-gender');
    if (s && s.options.length === 4) {
      s.options[0].text = T('-- Select --', '-- चुनें --');
      s.options[1].text = T('Male', 'पुरुष');
      s.options[2].text = T('Female', 'महिला');
      s.options[3].text = T('Other', 'अन्य');
    }
    var ci = el('m-complaint');
    if (ci) ci.placeholder = T('e.g. GD/FIR no. and police station', 'जैसे GD/FIR नंबर और थाना');
  }

  function clearFields() {
    ['m-age', 'm-gender', 'm-complaint'].forEach(function (id) { var x = el(id); if (x) x.value = ''; });
  }

  // Show/hide based on the current modal type
  function apply(typeArg) {
    if (!ensureFields()) return;
    var m = isMissingType(typeArg) ? typeArg : window.currentModal;
    var box = el('missing-extra-group');
    var im = el('id-mark-group');
    var lab = im ? im.querySelector('label') : null;
    var inp = el('m-id-mark');
    if (lab && origLabel === null) origLabel = lab.innerHTML;

    if (isMissingType(m)) {
      setLabels();
      box.style.display = 'block';
      if (im) im.style.display = 'block';
      if (lab) lab.innerHTML = T('Identification: height, clothes, marks', 'पहचान: कद, कपड़े, निशान') + optTag();
      if (inp) {
        if (inp.dataset.ph0 === undefined) inp.dataset.ph0 = inp.placeholder || '';
        inp.placeholder = T('e.g. 5 ft, blue shirt, mole on left cheek', 'जैसे 5 फ़ुट, नीली शर्ट, बाएँ गाल पर तिल');
      }
    } else {
      box.style.display = 'none';
      clearFields();
      if (lab && origLabel !== null) lab.innerHTML = origLabel;
      if (inp && inp.dataset.ph0 !== undefined) inp.placeholder = inp.dataset.ph0;
    }
  }

  // Called from the post save in index.html — returns {} for non-Missing posts
  window.fbMissingExtra = function () {
    if (!isMissingType(window.currentModal)) return {};
    var o = {};
    var a = parseInt((el('m-age') || {}).value, 10);
    if (a >= 0 && a <= 120) o.age = a;
    var g = (el('m-gender') || {}).value;
    if (g === 'male' || g === 'female' || g === 'other') o.gender = g;
    var c = clean((el('m-complaint') || {}).value);
    if (c) o.complaintNo = c;
    return o;
  };

  // Called from post details in index.html — extra lines for descText
  window.fbMissingDesc = function (p) {
    if (!p) return '';
    var gmap = { male: T('Male', 'पुरुष'), female: T('Female', 'महिला'), other: T('Other', 'अन्य') };
    var s = '';
    if (typeof p.age === 'number') s += '\n ' + T('Age', 'उम्र') + ': ' + p.age;
    if (gmap[p.gender]) s += '\n ' + T('Gender', 'लिंग') + ': ' + gmap[p.gender];
    if (p.complaintNo) s += '\n ' + T('Police complaint', 'पुलिस शिकायत') + ': ' + clean(p.complaintNo);
    return s;
  };

  // Wrap the existing global functions (they are defined later by index.html's module code)
  function wrap(name, mode) {
    var f = window[name];
    if (typeof f !== 'function') return false;
    if (f._fbMx) return true;
    var w = function () {
      var r = f.apply(this, arguments);
      try {
        if (mode === 'open') apply(arguments[0]);
        else if (mode === 'cat') apply(null);
        else if (mode === 'close') clearFields();
      } catch (e) { console.log('missing-fields:', e); }
      return r;
    };
    w._fbMx = true;
    window[name] = w;
    return true;
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries++;
    ensureFields();
    wrap('openModal', 'open');
    wrap('onModalCategoryChange', 'cat');
    wrap('closeModal', 'close');
    if (tries > 40) clearInterval(timer); // keep re-checking for ~10s in case functions are reassigned
  }, 250);
})();
