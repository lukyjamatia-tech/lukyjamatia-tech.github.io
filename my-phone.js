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
  /* Laptop: official pages only. */
  var LL_MS = 'https://account.microsoft.com/devices';
  var LL_APPLE = 'https://www.icloud.com/find';
  var LL_GOOGLE = 'https://myaccount.google.com/device-activity';
  var LL_PW = 'https://passwords.google.com/';
  var OSES = ['win', 'mac', 'cb', 'other'];
  /* Vehicles: official numbers and pages only. */
  var VTYPES = ['car', 'bike', 'scooter', 'other'], VMAX = 5;
  var VL_DP = 'https://digitalpolice.gov.in/';
  /* Bank cards: only bank name, last 4 digits and the bank helpline are kept. Never the full number. */
  var CKINDS = ['credit', 'debit'], CMAX = 5;
  /* Extra steps after a phone is lost. Only official pages and numbers are used here. */
  var STEPS = [
    { k: 'sim', links: [
      ['l_jio', 'https://www.jio.com/selfcare/lost-login/'],
      ['l_airtel', 'tel:18001034444'],
      ['l_vi', 'https://www.myvi.in/block-your-sim'],
      ['l_bsnl', 'https://www.bsnl.co.in/customer-care.html']] },
    { k: 'bank', links: [
      ['l_1930', 'tel:1930'],
      ['l_cyber', 'https://cybercrime.gov.in/'],
      ['l_phonepe', 'https://www.phonepe.com/contact-us/'],
      ['l_gpay', 'https://support.google.com/pay/india']] },
    { k: 'wa', links: [['l_wa', 'https://faq.whatsapp.com/']] },
    { k: 'google', links: [['l_google', 'https://myaccount.google.com/device-activity']] },
    { k: 'police', links: [] }
  ];

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
      ct: 'My Cards', csub: 'Save the bank helpline now. It is printed on the card, so it goes away with the card.', cadd: 'Add a card',
      cwarn: 'Never type the full card number, expiry date, CVV or PIN here. FindBack does not need them.',
      ckind: 'Card type', ck_credit: 'Credit card', ck_debit: 'Debit (ATM) card', cbank: 'Bank name', clast: 'Last 4 digits of the card', chelp: 'Bank helpline number',
      h_chelp: ['Where is the helpline number?', ['It is printed on the back of the card', 'It is also in the bank app and on the bank website']],
      ce_req: 'Bank name and the last 4 digits are required.', ce_last: 'Type only the last 4 digits, not the full card number.',
      cend: 'Card ending',
      cready: 'Get ready now, before it is lost',
      cready_l: ['Turn on SMS or app alerts for every payment', 'Set a low daily limit, and turn off international use if you do not need it', 'Never share your OTP, PIN or CVV with anyone, not even someone who says they are from the bank'],
      clostBtn: 'Card lost', cconfirm: 'Is your card really lost?', cdo: 'Do these, in this order:',
      cs_block: ['1. Block the card now', 'Call your bank and ask them to block this card, or block it yourself in the bank app.'],
      cs_txn: ['2. Check recent payments', 'Look at your SMS, the bank app or the statement. Tell the bank about any payment you did not make. RBI rules protect you best when you report within 3 working days.'],
      cs_fraud: ['3. If money has gone', 'Call 1930 at once and file a complaint on cybercrime.gov.in.'],
      cs_new: ['4. Ask for a new card', 'Ask the bank for a replacement card. Then update the new card wherever the old one was saved for automatic payments.'],
      cs_police: ['5. Report to the police', 'If the card was stolen with a wallet or bag, file a report and keep a copy.'],
      cl_call: 'Call the bank:', cfoundMsg: 'Good. If you already blocked the card, ask your bank whether it can be used again.',
      cremove: 'Remove this card', crmconfirm: 'Remove this card from the list?',
      n_title: 'Note', n_since: 'Reported here on', n_done: 'Done so far', n_left: 'Still to do', n_all: 'All steps are done.', done: 'I have done this',
      vt: 'My Vehicle', vsub: 'Fill this once. It will help if your car or bike is ever stolen.', vadd: 'Add a vehicle',
      vtype: 'Type', vt_car: 'Car', vt_bike: 'Bike', vt_scooter: 'Scooter', vt_other: 'Other',
      vreg: 'Vehicle number', vch: 'Chassis number', ven: 'Engine number', vins: 'Insurance company', vpol: 'Policy number', vrc: 'RC photo (optional)',
      h_vnum: ['Where are the chassis and engine numbers?', ['Both are printed on your RC (registration certificate)', 'They are also on the insurance policy']],
      h_vrc: ['Why the RC photo?', ['If the vehicle is stolen with the RC inside, you will still have a copy for the police and the insurance company.']],
      ve_req: 'Vehicle number is required.',
      vready: 'Get ready now, before it is stolen',
      vready_l: ['Do not keep the original RC and insurance papers inside the vehicle', 'Use a steering lock or disc lock, and park where there is light', 'A GPS tracker is the only way to find a stolen vehicle from far away', 'Keep both keys safe; the insurance company asks for them'],
      vlostBtn: 'Vehicle stolen', vconfirm: 'Is your vehicle really stolen?', stolen: 'Stolen', vdo: 'Do these, in this order:',
      vs_pol: ['1. Call the police now', 'Call 112 or go to the nearest police station and file an FIR.'],
      vs_ins: ['2. Tell your insurance company', 'Call the helpline printed on your policy today. They ask for the FIR copy, the RC and the keys.'],
      vs_tag: ['3. Block FASTag', 'Ask the bank that issued your FASTag to block it, or call 1033. Otherwise toll can keep getting charged to you.'],
      vs_rto: ['4. Inform the RTO', 'Give your RTO a written note with the FIR copy, so the vehicle cannot be transferred to someone else.'],
      vs_post: ['5. Post it on FindBack', 'Post it as a Lost item with the vehicle number, so people nearby can look out for it.'],
      vl_112: 'Call 112', vl_dp: 'State police citizen portals', vl_1033: 'Call 1033', vl_post: 'Post as Lost',
      vfoundMsg: 'Great! Tell the police and your insurance company that it has been found.',
      vremove: 'Remove this vehicle', vrmconfirm: 'Remove this vehicle from the list?',
      lt: 'My Laptop', lsub: 'Fill this once. It will help if your laptop is ever lost or stolen.', ladd: 'Add my laptop',
      lmodel: 'Laptop model', lserial: 'Serial number', los: 'System', os_win: 'Windows', os_mac: 'Mac', os_cb: 'Chromebook', os_other: 'Other',
      lbill: 'Laptop bill (photo, optional)',
      h_lmodel: ['How to find the model?', ['Look at the sticker under the laptop, or on the box', 'Windows: Settings > System > About', 'Mac: Apple menu > About This Mac']],
      h_lserial: ['How to find the serial number?', ['It is printed on the sticker under the laptop, next to "S/N" or "Serial"', 'It is also on the box and on the bill', 'Mac: Apple menu > About This Mac']],
      h_lbill: ['Why the bill?', ['The police and the insurance company ask for the bill and the serial number. Take a photo now.']],
      le_req: 'Laptop model and serial number are required.',
      ready: 'Get ready now, before it is lost',
      ready_win: ['Turn on "Find my device": Settings > Privacy & security > Find my device', 'Turn on device encryption: Settings > Privacy & security > Device encryption', 'Use a password or PIN to sign in'],
      ready_mac: ['Turn on Find My: System Settings > your name > iCloud > Find My Mac', 'Turn on FileVault: System Settings > Privacy & Security > FileVault', 'Use a login password'],
      ready_cb: ['A Chromebook is already tied to your Google Account', 'Use a strong Google password and turn on 2-Step Verification'],
      ready_other: ['Use a strong login password', 'Turn on disk encryption if your system has it', 'Keep a copy of important files somewhere else'],
      llostBtn: 'Laptop lost', lconfirm: 'Is your laptop really lost?', ldo: 'Do these:',
      ls_lock: '1. Find and lock it',
      ls_lock_win: 'Open your Microsoft account, choose the laptop, open "Find my device" and tap Lock. This works only if Find my device was turned on earlier.',
      ls_lock_mac: 'Open iCloud Find Devices, choose the Mac and mark it as lost. This works only if Find My was turned on earlier.',
      ls_lock_cb: 'Open your Google Account, choose the Chromebook under "Your devices" and tap Sign out.',
      ls_lock_other: 'If your laptop has a find-my-device service, use it to lock the laptop.',
      ls_acc: ['2. Sign the laptop out of your accounts', 'Open your Google Account, choose the laptop under "Your devices" and tap Sign out. Then change the passwords of your email and bank accounts.'],
      ls_pass: ['3. Change saved passwords', 'Passwords saved in the browser can be read on the laptop. Change the important ones first: email, bank, social media.'],
      ls_work: ['4. Tell your office or college', 'If the laptop was given by your office or college, tell their IT team now so they can block it.'],
      ls_police: ['5. Report to the police', 'File a report with the laptop model and serial number. Insurance also asks for this report.'],
      ll_ms: 'Microsoft: find my device', ll_apple: 'Apple: Find Devices', ll_pw: 'Google Password Manager',
      lfoundMsg: 'Great! Remember to unlock it and sign in again.',
      more: 'Then stop these too:', how: 'How to do it',
      s_sim: ['3. Block your SIM', 'A thief can put your SIM in another phone and receive your OTPs. Ask your SIM company to block it and give you a new SIM with the same number.'],
      s_bank: ['4. Stop UPI and bank access', 'Call your bank and ask them to block UPI and mobile banking for this number. If money has already gone, call 1930 at once.'],
      s_wa: ['5. Take back WhatsApp', 'Put your new SIM (same number) in another phone and register WhatsApp again. It will stop working on the lost phone.'],
      s_google: ['6. Sign the lost phone out of Google', 'Open your Google Account, choose the lost phone under "Your devices" and tap Sign out. Then change your password.'],
      s_police: ['7. Report to the police', 'File a lost-phone report at the police station or on your state police website. CEIR asks for a copy of it when you block the IMEI.'],
      l_jio: 'Jio: lost SIM page', l_airtel: 'Airtel: call 1800-103-4444', l_vi: 'Vi: block your SIM', l_bsnl: 'BSNL: customer care',
      l_1930: 'Call 1930 (cyber fraud helpline)', l_cyber: 'cybercrime.gov.in', l_phonepe: 'PhonePe help', l_gpay: 'Google Pay help',
      l_wa: 'WhatsApp Help Center', l_google: 'Open Google Account',
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
      ct: 'मेरे कार्ड', csub: 'बैंक का हेल्पलाइन नंबर अभी सेव कर लें। वह कार्ड पर छपा होता है, इसलिए कार्ड के साथ ही चला जाता है।', cadd: 'कार्ड जोड़ें',
      cwarn: 'यहाँ पूरा कार्ड नंबर, एक्सपायरी, CVV या PIN कभी न लिखें। FindBack को इनकी ज़रूरत नहीं है।',
      ckind: 'कार्ड का प्रकार', ck_credit: 'क्रेडिट कार्ड', ck_debit: 'डेबिट (ATM) कार्ड', cbank: 'बैंक का नाम', clast: 'कार्ड के आख़िरी 4 अंक', chelp: 'बैंक का हेल्पलाइन नंबर',
      h_chelp: ['हेल्पलाइन नंबर कहाँ मिलेगा?', ['यह कार्ड के पीछे छपा होता है', 'यह बैंक के ऐप और वेबसाइट पर भी होता है']],
      ce_req: 'बैंक का नाम और आख़िरी 4 अंक ज़रूरी हैं।', ce_last: 'सिर्फ़ आख़िरी 4 अंक लिखें, पूरा कार्ड नंबर नहीं।',
      cend: 'कार्ड के आख़िरी अंक',
      cready: 'खोने से पहले अभी तैयारी करें',
      cready_l: ['हर भुगतान के लिए SMS या ऐप अलर्ट चालू रखें', 'रोज़ की सीमा कम रखें, और ज़रूरत न हो तो अंतरराष्ट्रीय उपयोग बंद रखें', 'OTP, PIN या CVV किसी को न बताएँ, चाहे वह ख़ुद को बैंक का कर्मचारी ही क्यों न कहे'],
      clostBtn: 'कार्ड खो गया', cconfirm: 'क्या आपका कार्ड सच में खो गया है?', cdo: 'ये काम इसी क्रम में करें:',
      cs_block: ['1. अभी कार्ड ब्लॉक करवाएँ', 'अपने बैंक को कॉल करके यह कार्ड ब्लॉक करवाएँ, या बैंक के ऐप में ख़ुद ब्लॉक करें।'],
      cs_txn: ['2. हाल के भुगतान देखें', 'SMS, बैंक ऐप या स्टेटमेंट देखें। जो भुगतान आपने नहीं किया, उसकी सूचना बैंक को दें। RBI के नियमों में सबसे ज़्यादा सुरक्षा तब मिलती है जब आप 3 कार्य दिवसों के अंदर सूचना दें।'],
      cs_fraud: ['3. अगर पैसा निकल गया है', 'तुरंत 1930 पर कॉल करें और cybercrime.gov.in पर शिकायत दर्ज करें।'],
      cs_new: ['4. नया कार्ड माँगें', 'बैंक से नया कार्ड माँगें। फिर जहाँ-जहाँ पुराना कार्ड अपने-आप भुगतान के लिए सेव था, वहाँ नया कार्ड डालें।'],
      cs_police: ['5. पुलिस में रिपोर्ट करें', 'अगर कार्ड बटुए या बैग के साथ चोरी हुआ है, तो रिपोर्ट दर्ज कराएँ और उसकी कॉपी रखें।'],
      cl_call: 'बैंक को कॉल करें:', cfoundMsg: 'ठीक है। अगर कार्ड ब्लॉक करवा चुके हैं, तो बैंक से पूछें कि वह दोबारा चलेगा या नहीं।',
      cremove: 'यह कार्ड हटाएँ', crmconfirm: 'क्या यह कार्ड सूची से हटाना है?',
      n_title: 'नोट', n_since: 'यहाँ दर्ज किया:', n_done: 'अब तक हुआ', n_left: 'अभी बाक़ी', n_all: 'सब काम हो गए।', done: 'यह कर लिया',
      vt: 'मेरा वाहन', vsub: 'इसे सिर्फ़ एक बार भरें। गाड़ी चोरी होने पर यही जानकारी काम आएगी।', vadd: 'वाहन जोड़ें',
      vtype: 'प्रकार', vt_car: 'कार', vt_bike: 'बाइक', vt_scooter: 'स्कूटर', vt_other: 'अन्य',
      vreg: 'गाड़ी का नंबर', vch: 'चेसिस नंबर', ven: 'इंजन नंबर', vins: 'बीमा कंपनी', vpol: 'पॉलिसी नंबर', vrc: 'RC की फ़ोटो (वैकल्पिक)',
      h_vnum: ['चेसिस और इंजन नंबर कहाँ मिलेंगे?', ['दोनों आपकी RC (रजिस्ट्रेशन सर्टिफ़िकेट) पर लिखे होते हैं', 'ये बीमा पॉलिसी पर भी होते हैं']],
      h_vrc: ['RC की फ़ोटो क्यों?', ['अगर गाड़ी RC समेत चोरी हो जाए, तो पुलिस और बीमा कंपनी को देने के लिए आपके पास कॉपी रहेगी।']],
      ve_req: 'गाड़ी का नंबर ज़रूरी है।',
      vready: 'चोरी से पहले अभी तैयारी करें',
      vready_l: ['असली RC और बीमा के काग़ज़ गाड़ी के अंदर न रखें', 'स्टीयरिंग लॉक या डिस्क लॉक लगाएँ, और रोशनी वाली जगह पर खड़ी करें', 'चोरी हुई गाड़ी को दूर से ढूँढने का एकमात्र तरीका GPS ट्रैकर है', 'दोनों चाबियाँ सँभालकर रखें; बीमा कंपनी इन्हें माँगती है'],
      vlostBtn: 'वाहन चोरी हो गया', vconfirm: 'क्या आपका वाहन सच में चोरी हुआ है?', stolen: 'चोरी', vdo: 'ये काम इसी क्रम में करें:',
      vs_pol: ['1. अभी पुलिस को कॉल करें', '112 पर कॉल करें या नज़दीकी थाने जाकर FIR दर्ज कराएँ।'],
      vs_ins: ['2. बीमा कंपनी को बताएँ', 'आज ही पॉलिसी पर छपे हेल्पलाइन नंबर पर कॉल करें। वे FIR की कॉपी, RC और चाबियाँ माँगते हैं।'],
      vs_tag: ['3. FASTag ब्लॉक करवाएँ', 'जिस बैंक ने FASTag दिया है उससे ब्लॉक करवाएँ, या 1033 पर कॉल करें। वरना टोल आपके खाते से कटता रह सकता है।'],
      vs_rto: ['4. RTO को सूचना दें', 'अपने RTO को FIR की कॉपी के साथ लिखित सूचना दें, ताकि गाड़ी किसी और के नाम न हो सके।'],
      vs_post: ['5. FindBack पर पोस्ट करें', 'गाड़ी के नंबर के साथ Lost पोस्ट डालें, ताकि आस-पास के लोग नज़र रख सकें।'],
      vl_112: '112 पर कॉल करें', vl_dp: 'राज्य पुलिस के नागरिक पोर्टल', vl_1033: '1033 पर कॉल करें', vl_post: 'Lost पोस्ट डालें',
      vfoundMsg: 'बधाई! पुलिस और बीमा कंपनी को बताना न भूलें कि गाड़ी मिल गई है।',
      vremove: 'यह वाहन हटाएँ', vrmconfirm: 'क्या यह वाहन सूची से हटाना है?',
      lt: 'मेरा लैपटॉप', lsub: 'इसे सिर्फ़ एक बार भरें। लैपटॉप खोने या चोरी होने पर यही जानकारी काम आएगी।', ladd: 'मेरा लैपटॉप जोड़ें',
      lmodel: 'लैपटॉप मॉडल', lserial: 'सीरियल नंबर', los: 'सिस्टम', os_win: 'Windows', os_mac: 'Mac', os_cb: 'Chromebook', os_other: 'अन्य',
      lbill: 'लैपटॉप का बिल (फ़ोटो, वैकल्पिक)',
      h_lmodel: ['मॉडल कैसे देखें?', ['लैपटॉप के नीचे लगे स्टिकर या डिब्बे पर देखें', 'Windows: Settings > System > About', 'Mac: Apple menu > About This Mac']],
      h_lserial: ['सीरियल नंबर कैसे ढूँढें?', ['यह लैपटॉप के नीचे स्टिकर पर "S/N" या "Serial" के आगे लिखा होता है', 'यह डिब्बे और बिल पर भी होता है', 'Mac: Apple menu > About This Mac']],
      h_lbill: ['बिल क्यों?', ['पुलिस और बीमा कंपनी बिल और सीरियल नंबर माँगती हैं। अभी फ़ोटो खींच लें।']],
      le_req: 'लैपटॉप मॉडल और सीरियल नंबर ज़रूरी हैं।',
      ready: 'खोने से पहले अभी तैयारी करें',
      ready_win: ['"Find my device" चालू करें: Settings > Privacy & security > Find my device', 'डिवाइस एन्क्रिप्शन चालू करें: Settings > Privacy & security > Device encryption', 'साइन इन के लिए पासवर्ड या PIN रखें'],
      ready_mac: ['Find My चालू करें: System Settings > आपका नाम > iCloud > Find My Mac', 'FileVault चालू करें: System Settings > Privacy & Security > FileVault', 'लॉगिन पासवर्ड रखें'],
      ready_cb: ['Chromebook पहले से आपके Google Account से जुड़ा होता है', 'मज़बूत Google पासवर्ड रखें और 2-Step Verification चालू करें'],
      ready_other: ['मज़बूत लॉगिन पासवर्ड रखें', 'अगर आपके सिस्टम में डिस्क एन्क्रिप्शन है तो चालू करें', 'ज़रूरी फ़ाइलों की एक कॉपी कहीं और रखें'],
      llostBtn: 'लैपटॉप खो गया', lconfirm: 'क्या आपका लैपटॉप सच में खो गया है?', ldo: 'ये काम करें:',
      ls_lock: '1. ढूँढें और लॉक करें',
      ls_lock_win: 'अपना Microsoft account खोलें, लैपटॉप चुनें, "Find my device" खोलें और Lock दबाएँ। यह तभी काम करेगा जब Find my device पहले से चालू था।',
      ls_lock_mac: 'iCloud Find Devices खोलें, Mac चुनें और उसे खोया हुआ (lost) चिह्नित करें। यह तभी काम करेगा जब Find My पहले से चालू था।',
      ls_lock_cb: 'अपना Google Account खोलें, "Your devices" में Chromebook चुनें और Sign out दबाएँ।',
      ls_lock_other: 'अगर आपके लैपटॉप में डिवाइस ढूँढने की सेवा है, तो उससे लैपटॉप लॉक करें।',
      ls_acc: ['2. लैपटॉप को अपने अकाउंट से साइन आउट करें', 'अपना Google Account खोलें, "Your devices" में लैपटॉप चुनें और Sign out दबाएँ। फिर ईमेल और बैंक के पासवर्ड बदलें।'],
      ls_pass: ['3. सेव किए हुए पासवर्ड बदलें', 'ब्राउज़र में सेव पासवर्ड लैपटॉप पर पढ़े जा सकते हैं। पहले ज़रूरी वाले बदलें: ईमेल, बैंक, सोशल मीडिया।'],
      ls_work: ['4. दफ़्तर या कॉलेज को बताएँ', 'अगर लैपटॉप दफ़्तर या कॉलेज का दिया हुआ है, तो उनकी IT टीम को अभी बताएँ ताकि वे उसे ब्लॉक कर सकें।'],
      ls_police: ['5. पुलिस में रिपोर्ट करें', 'लैपटॉप के मॉडल और सीरियल नंबर के साथ रिपोर्ट दर्ज करें। बीमा के लिए भी यही रिपोर्ट माँगी जाती है।'],
      ll_ms: 'Microsoft: डिवाइस ढूँढें', ll_apple: 'Apple: Find Devices', ll_pw: 'Google Password Manager',
      lfoundMsg: 'बधाई! लैपटॉप अनलॉक करके दोबारा साइन इन करना न भूलें।',
      more: 'फिर ये भी रोकें:', how: 'कैसे करें',
      s_sim: ['3. सिम ब्लॉक करवाएँ', 'चोर आपका सिम दूसरे फ़ोन में डालकर आपके OTP पा सकता है। अपनी सिम कंपनी से सिम ब्लॉक करवाएँ और उसी नंबर का नया सिम लें।'],
      s_bank: ['4. UPI और बैंक रोकें', 'अपने बैंक को फ़ोन करके इस नंबर की UPI और मोबाइल बैंकिंग बंद करवाएँ। अगर पैसा निकल चुका है तो तुरंत 1930 पर कॉल करें।'],
      s_wa: ['5. WhatsApp वापस लें', 'नया सिम (वही नंबर) किसी दूसरे फ़ोन में डालकर WhatsApp दोबारा रजिस्टर करें। खोए फ़ोन पर वह बंद हो जाएगा।'],
      s_google: ['6. खोए फ़ोन को Google से साइन आउट करें', 'अपना Google Account खोलें, "Your devices" में खोया फ़ोन चुनें और Sign out दबाएँ। फिर पासवर्ड बदलें।'],
      s_police: ['7. पुलिस में रिपोर्ट करें', 'थाने में या अपने राज्य की पुलिस वेबसाइट पर फ़ोन खोने की रिपोर्ट दर्ज करें। CEIR पर IMEI ब्लॉक करते समय इसकी कॉपी माँगी जाती है।'],
      l_jio: 'Jio: खोए सिम का पेज', l_airtel: 'Airtel: 1800-103-4444 पर कॉल करें', l_vi: 'Vi: सिम ब्लॉक करें', l_bsnl: 'BSNL: कस्टमर केयर',
      l_1930: '1930 पर कॉल करें (साइबर ठगी हेल्पलाइन)', l_cyber: 'cybercrime.gov.in', l_phonepe: 'PhonePe सहायता', l_gpay: 'Google Pay सहायता',
      l_wa: 'WhatsApp सहायता केंद्र', l_google: 'Google Account खोलें',
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
    '#fb-myphone .mp details p{padding-left:0}' +
    '#fb-myphone .mp select{width:100%;box-sizing:border-box;height:42px;border:1px solid #c9ced6;border-radius:8px;padding:0 10px;font-size:15px;background:#fff;color:#1d2330}' +
    '#fb-myphone .mp .st{border-top:1px solid #eceff3;padding:10px 0 4px}' +
    '#fb-myphone .mp .nt{background:#fff8e6;border:1px solid #f0dca8;border-radius:10px;padding:10px 12px;margin:10px 0 4px;font-size:13px;line-height:1.5;color:#3a4250}' +
    '#fb-myphone .mp .nt b{display:block;font-size:14px;color:#1d2330}' +
    '#fb-myphone .mp .warn{background:#fbe5e5;color:#7a1c1c;border-radius:8px;padding:8px 10px;font-size:13px;font-weight:600;margin:6px 0 2px}' +
    '#fb-myphone .mp .nt ul{margin:2px 0 6px;padding-left:18px}' +
    '#fb-myphone .mp .nt .d{color:#1e6e3f;font-weight:600}' +
    '#fb-myphone .mp .nt ul.d{font-weight:400}' +
    '#fb-myphone .mp .nt span{color:#5b6472;font-weight:400}' +
    '#fb-myphone .mp .st label{display:flex;align-items:center;gap:10px;margin:0;font-size:15px;font-weight:600;color:#1d2330;min-height:32px;cursor:pointer}' +
    '#fb-myphone .mp .st input{width:22px;height:22px;flex:none;padding:0;margin:0}' +
    '#fb-myphone .mp .st.ok label{color:#1e6e3f}' +
    '#fb-myphone .mp .st details .btn{margin-top:8px;font-size:14px;min-height:42px;line-height:42px;text-decoration:none;color:#1d2330}';

  var FS, host, root, lroot, vroot, croot, uid, data = null, view = '', draft = null, lview = '', ldraft = null, vform = null, vdraft = null, vshown = false, cform = null, cdraft = null, cshown = false;
  function hasPhone() { return !!(data && data.imei1); }

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
  function when(ms) {
    if (!ms || ms === true) return '';
    try { return new Date(ms).toLocaleString(L === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }); }
    catch (e) { return ''; }
  }
  /* The note on a lost item: when it was reported, what is ticked (with time), what is left. */
  function noteHtml(lostAt, items, checks) {
    checks = checks || {};
    var done = items.filter(function (x) { return !!checks[x.k]; }), left = items.filter(function (x) { return !checks[x.k]; });
    var li = function (x, withTime) {
      var w = withTime ? when(checks[x.k]) : '';
      return '<li>' + esc(x.title) + (w ? ' <span>(' + esc(w) + ')</span>' : '') + '</li>';
    };
    return '<b>' + t('n_title') + '</b>' + (when(lostAt) ? '<div>' + t('n_since') + ' ' + esc(when(lostAt)) + '</div>' : '') +
      '<div class="d">' + t('n_done') + ': ' + done.length + ' / ' + items.length + '</div>' +
      (done.length ? '<ul class="d">' + done.map(function (x) { return li(x, true); }).join('') + '</ul>' : '') +
      (left.length ? '<div>' + t('n_left') + ':</div><ul>' + left.map(function (x) { return li(x, false); }).join('') + '</ul>' : '<div class="d">' + t('n_all') + '</div>');
  }
  function phoneItems() {
    return [{ k: 'lock', title: t('lock') }, { k: 'ceir', title: t('ceir') }].concat(STEPS.map(function (s) { return { k: s.k, title: t('s_' + s.k)[0] }; }));
  }
  function tickRow(attr, k, on, extra) {
    return '<div class="st' + (on ? ' ok' : '') + '" style="border-top:0;padding-top:4px"><label><input type="checkbox" ' + attr + '="' + k + '"' + (extra || '') + (on ? ' checked' : '') + '>' + t('done') + '</label></div>';
  }

  function compress(file, max) {
    return new Promise(function (res, rej) {
      var r = new FileReader();
      r.onload = function () {
        var img = new Image();
        img.onload = function () {
          var MAX = max || 600, w = img.width, h = img.height;
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

  function renderMsg(k) {
    view = 'msg:' + k; root.innerHTML = '<div class="mp"><h3>' + t('title') + '</h3><p class="sub">' + t(k) + '</p></div>';
    if (lroot) { lview = ''; lroot.innerHTML = ''; }
    if (vroot) { vshown = false; vform = null; vroot.innerHTML = ''; }
    if (croot) { cshown = false; cform = null; croot.innerHTML = ''; }
  }

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
      (hasPhone() ? '<button class="btn" id="mp-cancel">' + t('cancel') + '</button>' : '') + '</div>';

    var err = root.querySelector('#mp-err');
    root.querySelectorAll('input').forEach(function (x) { x.oninput = function () { err.textContent = ''; }; });
    if (hasPhone()) root.querySelector('#mp-cancel').onclick = renderCard;

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
      var pc = d.lostChecks || {};
      h += '<div class="nt"></div>' +
        '<p class="sub" style="margin-top:10px">' + t('two') + '</p>' +
        '<a class="btn" href="' + LINK_LOCK + '" target="_blank" rel="noopener">' + t('lock') + '</a>' +
        '<div class="note">' + t('msgNote') + '</div><div class="row">' + esc(msg) + '</div>' +
        '<button class="btn" id="mp-copy">' + t('copy') + '</button>' +
        '<div class="note">' + t('newPh') + ' <a href="' + LINK_LOCK2 + '" target="_blank" rel="noopener">android.com/lock</a></div>' +
        tickRow('data-ck', 'lock', !!pc.lock) +
        '<a class="btn" href="' + LINK_CEIR + '" target="_blank" rel="noopener">' + t('ceir') + '</a>' +
        '<div class="note">' + esc(t('ceirHow')) + '</div>' + '<div class="note">' + esc(t('ceirNote')(d)) + '</div>' +
        tickRow('data-ck', 'ceir', !!pc.ceir) +
        '<p class="sub" style="margin-top:14px">' + t('more') + '</p>' +
        STEPS.map(function (s) {
          var tx = t('s_' + s.k), on = !!(d.lostChecks && d.lostChecks[s.k]);
          return '<div class="st' + (on ? ' ok' : '') + '"><label><input type="checkbox" data-ck="' + s.k + '"' + (on ? ' checked' : '') + '>' + esc(tx[0]) + '</label>' +
            '<details><summary>' + t('how') + '</summary><p>' + esc(tx[1]) + '</p>' +
            s.links.map(function (l) {
              return '<a class="btn" href="' + l[1] + '"' + (l[1].indexOf('tel:') === 0 ? '' : ' target="_blank" rel="noopener"') + '>' + esc(t(l[0])) + '</a>';
            }).join('') + '</details></div>';
        }).join('') +
        '<button class="btn grn" id="mp-found">' + t('found') + '</button>' + '<button class="btn" id="mp-undo">' + t('undo') + '</button>';
    }
    h += '<div class="err" id="mp-err"></div></div>';
    root.innerHTML = h;

    var err = root.querySelector('#mp-err');
    var setStatus = function (s, after) {
      save({ status: s, lostAt: s === 'lost' ? Date.now() : null, lostChecks: {} }).then(after).catch(function (e) {
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
      var pnote = function (ck) { root.querySelector('.nt').innerHTML = noteHtml(data.lostAt, phoneItems(), ck); };
      pnote(data.lostChecks);
      root.querySelectorAll('[data-ck]').forEach(function (c) {
        c.onchange = function () {
          var ck = Object.assign({}, data.lostChecks || {});
          ck[c.getAttribute('data-ck')] = c.checked ? Date.now() : false;
          c.closest('.st').classList.toggle('ok', c.checked);
          pnote(ck);
          save({ lostChecks: ck }).catch(function (e) { console.log('my-phone check', e); err.textContent = t('e_upd'); });
        };
      });
      root.querySelector('#mp-undo').onclick = function () { setStatus('safe', renderCard); };
      root.querySelector('#mp-found').onclick = function () {
        setStatus('safe', function () { renderCard(); alert(t('foundMsg')); });
      };
    }
  }

  /* ---------- My Laptop: second card, kept in the same document under "laptop" ---------- */
  function lap() { return (data && data.laptop) || null; }
  function saveLap(patch) { return save({ laptop: Object.assign({}, lap() || {}, patch) }); }
  function renderLap() { if (!lroot) return; if (lap()) renderLapCard(); else renderLapIntro(); }

  function renderLapIntro() {
    lview = 'lintro';
    lroot.innerHTML = '<div class="mp"><h3>' + t('lt') + '</h3><p class="sub">' + t('lsub') + '</p>' +
      '<button class="btn" id="lp-add">' + t('ladd') + '</button></div>';
    lroot.querySelector('#lp-add').onclick = renderLapForm;
  }

  function readLapForm() {
    var g = function (id) { var e = lroot.querySelector(id); return e ? e.value.trim() : ''; };
    return { model: g('#lp-m'), serial: g('#lp-s'), os: g('#lp-os') || 'win' };
  }

  function renderLapForm() {
    lview = 'lform';
    var cur = lap(), l = ldraft || cur || {};
    ldraft = null;
    lroot.innerHTML = '<div class="mp"><h3>' + t('lt') + '</h3><p class="sub">' + t('lsub') + '</p>' +
      '<label>' + t('lmodel') + '</label><input id="lp-m" value="' + esc(l.model) + '" placeholder="HP 15s">' + hint('h_lmodel') +
      '<label>' + t('lserial') + '</label><input id="lp-s" value="' + esc(l.serial) + '" autocapitalize="characters">' + hint('h_lserial') +
      '<label>' + t('los') + '</label><select id="lp-os">' + OSES.map(function (o) {
        return '<option value="' + o + '"' + ((l.os || 'win') === o ? ' selected' : '') + '>' + t('os_' + o) + '</option>';
      }).join('') + '</select>' +
      '<label>' + t('lbill') + '</label><input id="lp-bill" type="file" accept="image/*" style="height:auto;padding:8px">' + hint('h_lbill') +
      (cur && cur.bill ? '<img src="' + cur.bill + '" alt="">' : '') +
      '<div class="err" id="lp-err"></div>' +
      '<button class="btn pri" id="lp-save">' + t('save') + '</button><button class="btn" id="lp-cancel">' + t('cancel') + '</button></div>';

    var err = lroot.querySelector('#lp-err');
    lroot.querySelectorAll('input').forEach(function (x) { x.oninput = function () { err.textContent = ''; }; });
    lroot.querySelector('#lp-cancel').onclick = renderLap;
    lroot.querySelector('#lp-save').onclick = function () {
      var v = readLapForm();
      if (!v.model || !v.serial) { err.textContent = t('le_req'); return; }
      var btn = this; btn.disabled = true; btn.textContent = t('saving');
      var f = lroot.querySelector('#lp-bill').files[0];
      (f ? compress(f) : Promise.resolve(cur && cur.bill || '')).then(function (bill) {
        v.bill = bill; v.status = (cur && cur.status) || 'safe';
        return saveLap(v);
      }).then(renderLap).catch(function (e) {
        console.log('my-laptop save', e);
        btn.disabled = false; btn.textContent = t('save'); err.textContent = t('e_save');
      });
    };
  }

  function lapSteps(l) {
    var os = OSES.indexOf(l.os) === -1 ? 'win' : l.os;
    var lock = { win: [['ll_ms', LL_MS]], mac: [['ll_apple', LL_APPLE]], cb: [['l_google', LL_GOOGLE]], other: [['ll_ms', LL_MS], ['ll_apple', LL_APPLE]] }[os];
    return [
      { k: 'lock', title: t('ls_lock'), text: t('ls_lock_' + os), links: lock },
      { k: 'acc', title: t('ls_acc')[0], text: t('ls_acc')[1], links: [['l_google', LL_GOOGLE]] },
      { k: 'pass', title: t('ls_pass')[0], text: t('ls_pass')[1], links: [['ll_pw', LL_PW]] },
      { k: 'work', title: t('ls_work')[0], text: t('ls_work')[1], links: [] },
      { k: 'police', title: t('ls_police')[0], text: t('ls_police')[1] + ' ' + t('lserial') + ': ' + l.serial, links: [] }
    ];
  }

  function renderLapCard() {
    lview = 'lcard';
    var l = lap(), lost = l.status === 'lost', os = OSES.indexOf(l.os) === -1 ? 'win' : l.os;
    var h = '<div class="mp ' + (lost ? 'lost' : 'safe') + '">' +
      '<span class="badge ' + (lost ? 'bl">' + t('lost') : 'bs">' + t('safe')) + '</span>' +
      '<h3>' + esc(l.model) + '</h3><p class="sub">' + t('lserial') + ' ' + esc(tail(l.serial)) + '</p>';
    if (!lost) {
      h += '<details><summary>' + t('ready') + '</summary><ol><li>' + t('ready_' + os).join('</li><li>') + '</li></ol></details>' +
        '<button class="btn red" id="lp-lost">' + t('llostBtn') + '</button><button class="btn" id="lp-edit">' + t('edit') + '</button>';
    } else {
      h += '<div class="nt"></div><p class="sub" style="margin-top:10px">' + t('ldo') + '</p>' +
        lapSteps(l).map(function (s) {
          var on = !!(l.checks && l.checks[s.k]);
          return '<div class="st' + (on ? ' ok' : '') + '"><label><input type="checkbox" data-lck="' + s.k + '"' + (on ? ' checked' : '') + '>' + esc(s.title) + '</label>' +
            '<details><summary>' + t('how') + '</summary><p>' + esc(s.text) + '</p>' +
            s.links.map(function (x) { return '<a class="btn" href="' + x[1] + '" target="_blank" rel="noopener">' + esc(t(x[0])) + '</a>'; }).join('') +
            '</details></div>';
        }).join('') +
        '<button class="btn grn" id="lp-found">' + t('found') + '</button><button class="btn" id="lp-undo">' + t('undo') + '</button>';
    }
    h += '<div class="err" id="lp-err"></div></div>';
    lroot.innerHTML = h;

    var err = lroot.querySelector('#lp-err');
    var setS = function (s, after) {
      saveLap({ status: s, lostAt: s === 'lost' ? Date.now() : null, checks: {} }).then(after).catch(function (e) {
        console.log('my-laptop status', e); err.textContent = t('e_upd');
      });
    };
    if (!lost) {
      lroot.querySelector('#lp-edit').onclick = renderLapForm;
      lroot.querySelector('#lp-lost').onclick = function () { if (confirm(t('lconfirm'))) setS('lost', renderLap); };
    } else {
      var lnote = function (ck) { lroot.querySelector('.nt').innerHTML = noteHtml(lap().lostAt, lapSteps(lap()), ck); };
      lnote(l.checks);
      lroot.querySelectorAll('[data-lck]').forEach(function (c) {
        c.onchange = function () {
          var ck = Object.assign({}, lap().checks || {});
          ck[c.getAttribute('data-lck')] = c.checked ? Date.now() : false;
          c.closest('.st').classList.toggle('ok', c.checked);
          lnote(ck);
          saveLap({ checks: ck }).catch(function (e) { console.log('my-laptop check', e); err.textContent = t('e_upd'); });
        };
      });
      lroot.querySelector('#lp-undo').onclick = function () { setS('safe', renderLap); };
      lroot.querySelector('#lp-found').onclick = function () { setS('safe', function () { renderLap(); alert(t('lfoundMsg')); }); };
    }
  }

  /* ---------- My Vehicle: up to 5 cars / bikes / scooters (RC photos are kept small so five fit in one document), kept in the same document under "vehicles" ---------- */
  function vehs() { return (data && data.vehicles) || []; }
  function setVeh(i, patch) { var a = vehs().slice(); a[i] = Object.assign({}, a[i] || {}, patch); return save({ vehicles: a }); }
  function renderVeh() { if (!vroot) return; vshown = true; if (vform !== null) renderVehForm(vform); else renderVehList(); }

  function vehSteps(v) {
    var ids = t('vreg') + ': ' + v.reg + (v.chassis ? '; ' + t('vch') + ': ' + v.chassis : '') + (v.engine ? '; ' + t('ven') + ': ' + v.engine : '');
    var ins = (v.insurer ? ' ' + t('vins') + ': ' + v.insurer : '') + (v.policy ? '; ' + t('vpol') + ': ' + v.policy : '');
    return [
      { k: 'pol', tx: t('vs_pol'), extra: ' ' + ids, links: [['vl_112', 'tel:112'], ['vl_dp', VL_DP]] },
      { k: 'ins', tx: t('vs_ins'), extra: ins, links: [] },
      { k: 'tag', tx: t('vs_tag'), extra: '', links: [['vl_1033', 'tel:1033']] },
      { k: 'rto', tx: t('vs_rto'), extra: '', links: [] },
      { k: 'post', tx: t('vs_post'), extra: '', links: [], post: true }
    ];
  }

  function vehItems(v) { return vehSteps(v).map(function (s) { return { k: s.k, title: s.tx[0] }; }); }

  function vehCard(v, i) {
    var lost = v.status === 'lost', ty = VTYPES.indexOf(v.type) === -1 ? 'other' : v.type;
    var h = '<div class="mp ' + (lost ? 'lost' : 'safe') + '">' +
      '<span class="badge ' + (lost ? 'bl">' + t('stolen') : 'bs">' + t('safe')) + '</span>' +
      '<h3>' + esc(v.reg) + '</h3><p class="sub">' + t('vt_' + ty) + (v.chassis ? ' · ' + t('vch') + ' ' + esc(tail(v.chassis)) : '') + '</p>';
    if (!lost) {
      h += '<details><summary>' + t('vready') + '</summary><ol><li>' + t('vready_l').join('</li><li>') + '</li></ol></details>' +
        '<button class="btn red" data-va="lost" data-i="' + i + '">' + t('vlostBtn') + '</button>' +
        '<button class="btn" data-va="edit" data-i="' + i + '">' + t('edit') + '</button>';
    } else {
      h += '<div class="nt" data-vnote="' + i + '">' + noteHtml(v.lostAt, vehItems(v), v.checks) + '</div>' +
        '<p class="sub" style="margin-top:10px">' + t('vdo') + '</p>' +
        vehSteps(v).map(function (s) {
          var on = !!(v.checks && v.checks[s.k]);
          return '<div class="st' + (on ? ' ok' : '') + '"><label><input type="checkbox" data-vck="' + s.k + '" data-i="' + i + '"' + (on ? ' checked' : '') + '>' + esc(s.tx[0]) + '</label>' +
            '<details><summary>' + t('how') + '</summary><p>' + esc(s.tx[1] + s.extra) + '</p>' +
            s.links.map(function (x) {
              return '<a class="btn" href="' + x[1] + '"' + (x[1].indexOf('tel:') === 0 ? '' : ' target="_blank" rel="noopener"') + '>' + esc(t(x[0])) + '</a>';
            }).join('') +
            (s.post ? '<button class="btn" data-va="post" data-i="' + i + '">' + t('vl_post') + '</button>' : '') +
            '</details></div>';
        }).join('') +
        '<button class="btn grn" data-va="found" data-i="' + i + '">' + t('found') + '</button>' +
        '<button class="btn" data-va="undo" data-i="' + i + '">' + t('undo') + '</button>';
    }
    return h + '<div class="err" data-verr="' + i + '"></div></div>';
  }

  function renderVehList() {
    var a = vehs();
    var h = a.map(vehCard).join('');
    if (!a.length) {
      h += '<div class="mp"><h3>' + t('vt') + '</h3><p class="sub">' + t('vsub') + '</p><button class="btn" data-va="add">' + t('vadd') + '</button></div>';
    } else if (a.length < VMAX) {
      h += '<div class="mp"><button class="btn" data-va="add" style="margin-top:0">' + t('vadd') + '</button></div>';
    }
    vroot.innerHTML = h;

    var errOf = function (i) { return vroot.querySelector('[data-verr="' + i + '"]'); };
    var setS = function (i, s, after) {
      setVeh(i, { status: s, lostAt: s === 'lost' ? Date.now() : null, checks: {} }).then(after).catch(function (e) {
        console.log('my-vehicle status', e); var x = errOf(i); if (x) x.textContent = t('e_upd');
      });
    };
    vroot.querySelectorAll('[data-va]').forEach(function (b) {
      var act = b.getAttribute('data-va'), i = +b.getAttribute('data-i');
      b.onclick = function () {
        if (act === 'add') { vform = vehs().length; renderVeh(); }
        else if (act === 'edit') { vform = i; renderVeh(); }
        else if (act === 'lost') { if (confirm(t('vconfirm'))) setS(i, 'lost', renderVeh); }
        else if (act === 'undo') setS(i, 'safe', renderVeh);
        else if (act === 'found') setS(i, 'safe', function () { renderVeh(); alert(t('vfoundMsg')); });
        else if (act === 'post') { if (typeof window.openModal === 'function') window.openModal('lost'); }
      };
    });
    vroot.querySelectorAll('[data-vck]').forEach(function (c) {
      c.onchange = function () {
        var i = +c.getAttribute('data-i'), ck = Object.assign({}, vehs()[i].checks || {});
        ck[c.getAttribute('data-vck')] = c.checked ? Date.now() : false;
        c.closest('.st').classList.toggle('ok', c.checked);
        var nt = vroot.querySelector('[data-vnote="' + i + '"]');
        if (nt) nt.innerHTML = noteHtml(vehs()[i].lostAt, vehItems(vehs()[i]), ck);
        setVeh(i, { checks: ck }).catch(function (e) { console.log('my-vehicle check', e); var x = errOf(i); if (x) x.textContent = t('e_upd'); });
      };
    });
  }

  function readVehForm() {
    var g = function (id) { var e = vroot.querySelector(id); return e ? e.value.trim() : ''; };
    return { type: g('#vh-t') || 'car', reg: g('#vh-r').toUpperCase(), chassis: g('#vh-c').toUpperCase(), engine: g('#vh-e').toUpperCase(), insurer: g('#vh-in'), policy: g('#vh-p') };
  }

  function renderVehForm(i) {
    var cur = vehs()[i] || null, v = vdraft || cur || {};
    vdraft = null;
    vroot.innerHTML = '<div class="mp"><h3>' + t('vt') + '</h3><p class="sub">' + t('vsub') + '</p>' +
      '<label>' + t('vtype') + '</label><select id="vh-t">' + VTYPES.map(function (o) {
        return '<option value="' + o + '"' + ((v.type || 'car') === o ? ' selected' : '') + '>' + t('vt_' + o) + '</option>';
      }).join('') + '</select>' +
      '<label>' + t('vreg') + '</label><input id="vh-r" value="' + esc(v.reg) + '" placeholder="TR 01 AB 1234" autocapitalize="characters">' +
      '<label>' + t('vch') + '</label><input id="vh-c" value="' + esc(v.chassis) + '" autocapitalize="characters">' +
      '<label>' + t('ven') + '</label><input id="vh-e" value="' + esc(v.engine) + '" autocapitalize="characters">' + hint('h_vnum') +
      '<label>' + t('vins') + '</label><input id="vh-in" value="' + esc(v.insurer) + '">' +
      '<label>' + t('vpol') + '</label><input id="vh-p" value="' + esc(v.policy) + '">' +
      '<label>' + t('vrc') + '</label><input id="vh-rc" type="file" accept="image/*" style="height:auto;padding:8px">' + hint('h_vrc') +
      (cur && cur.rc ? '<img src="' + cur.rc + '" alt="">' : '') +
      '<div class="err" id="vh-err"></div>' +
      '<button class="btn pri" id="vh-save">' + t('save') + '</button><button class="btn" id="vh-cancel">' + t('cancel') + '</button>' +
      (cur ? '<button class="btn red" id="vh-del">' + t('vremove') + '</button>' : '') + '</div>';

    var err = vroot.querySelector('#vh-err');
    vroot.querySelectorAll('input').forEach(function (x) { x.oninput = function () { err.textContent = ''; }; });
    var back = function () { vform = null; renderVeh(); };
    vroot.querySelector('#vh-cancel').onclick = back;
    if (cur) vroot.querySelector('#vh-del').onclick = function () {
      if (!confirm(t('vrmconfirm'))) return;
      var a = vehs().slice(); a.splice(i, 1);
      save({ vehicles: a }).then(back).catch(function (e) { console.log('my-vehicle remove', e); err.textContent = t('e_upd'); });
    };
    vroot.querySelector('#vh-save').onclick = function () {
      var x = readVehForm();
      if (!x.reg) { err.textContent = t('ve_req'); return; }
      var btn = this; btn.disabled = true; btn.textContent = t('saving');
      var f = vroot.querySelector('#vh-rc').files[0];
      (f ? compress(f, 720) : Promise.resolve(cur && cur.rc || '')).then(function (rc) {
        x.rc = rc; x.status = (cur && cur.status) || 'safe';
        return setVeh(i, x);
      }).then(back).catch(function (e) {
        console.log('my-vehicle save', e);
        btn.disabled = false; btn.textContent = t('save'); err.textContent = t('e_save');
      });
    };
  }

  /* ---------- My Cards: up to 5 bank cards. Only bank, last 4 digits and helpline are stored. ---------- */
  function cards() { return (data && data.cards) || []; }
  function setCard(i, patch) { var a = cards().slice(); a[i] = Object.assign({}, a[i] || {}, patch); return save({ cards: a }); }
  function renderCards() { if (!croot) return; cshown = true; if (cform !== null) renderCardForm(cform); else renderCardList(); }
  function telOf(n) { return String(n || '').replace(/[^\d+]/g, ''); }

  function cardSteps(c) {
    var tel = telOf(c.helpline);
    return [
      { k: 'block', tx: t('cs_block'), extra: ' ' + t('cend') + ' ' + c.last4 + '.', links: tel ? [[t('cl_call') + ' ' + c.helpline, 'tel:' + tel]] : [] },
      { k: 'txn', tx: t('cs_txn'), extra: '', links: [] },
      { k: 'fraud', tx: t('cs_fraud'), extra: '', links: [[t('l_1930'), 'tel:1930'], [t('l_cyber'), 'https://cybercrime.gov.in/']] },
      { k: 'new', tx: t('cs_new'), extra: '', links: [] },
      { k: 'police', tx: t('cs_police'), extra: '', links: [] }
    ];
  }
  function cardItems(c) { return cardSteps(c).map(function (s) { return { k: s.k, title: s.tx[0] }; }); }

  function cardCard(c, i) {
    var lost = c.status === 'lost', kind = CKINDS.indexOf(c.kind) === -1 ? 'debit' : c.kind;
    var h = '<div class="mp ' + (lost ? 'lost' : 'safe') + '">' +
      '<span class="badge ' + (lost ? 'bl">' + t('lost') : 'bs">' + t('safe')) + '</span>' +
      '<h3>' + esc(c.bank) + '</h3><p class="sub">' + t('ck_' + kind) + ' · ' + t('cend') + ' ' + esc(c.last4) + '</p>';
    if (!lost) {
      h += '<details><summary>' + t('cready') + '</summary><ol><li>' + t('cready_l').join('</li><li>') + '</li></ol></details>' +
        '<button class="btn red" data-ca="lost" data-i="' + i + '">' + t('clostBtn') + '</button>' +
        '<button class="btn" data-ca="edit" data-i="' + i + '">' + t('edit') + '</button>';
    } else {
      h += '<div class="nt" data-cnote="' + i + '">' + noteHtml(c.lostAt, cardItems(c), c.checks) + '</div>' +
        '<p class="sub" style="margin-top:10px">' + t('cdo') + '</p>' +
        cardSteps(c).map(function (s) {
          var on = !!(c.checks && c.checks[s.k]);
          return '<div class="st' + (on ? ' ok' : '') + '"><label><input type="checkbox" data-cck="' + s.k + '" data-i="' + i + '"' + (on ? ' checked' : '') + '>' + esc(s.tx[0]) + '</label>' +
            '<details' + (s.k === 'block' ? ' open' : '') + '><summary>' + t('how') + '</summary><p>' + esc(s.tx[1] + s.extra) + '</p>' +
            s.links.map(function (x) {
              return '<a class="btn" href="' + esc(x[1]) + '"' + (x[1].indexOf('tel:') === 0 ? '' : ' target="_blank" rel="noopener"') + '>' + esc(x[0]) + '</a>';
            }).join('') + '</details></div>';
        }).join('') +
        '<button class="btn grn" data-ca="found" data-i="' + i + '">' + t('found') + '</button>' +
        '<button class="btn" data-ca="undo" data-i="' + i + '">' + t('undo') + '</button>';
    }
    return h + '<div class="err" data-cerr="' + i + '"></div></div>';
  }

  function renderCardList() {
    var a = cards();
    var h = a.map(cardCard).join('');
    if (!a.length) {
      h += '<div class="mp"><h3>' + t('ct') + '</h3><p class="sub">' + t('csub') + '</p><button class="btn" data-ca="add">' + t('cadd') + '</button></div>';
    } else if (a.length < CMAX) {
      h += '<div class="mp"><button class="btn" data-ca="add" style="margin-top:0">' + t('cadd') + '</button></div>';
    }
    croot.innerHTML = h;

    var errOf = function (i) { return croot.querySelector('[data-cerr="' + i + '"]'); };
    var setS = function (i, s, after) {
      setCard(i, { status: s, lostAt: s === 'lost' ? Date.now() : null, checks: {} }).then(after).catch(function (e) {
        console.log('my-card status', e); var x = errOf(i); if (x) x.textContent = t('e_upd');
      });
    };
    croot.querySelectorAll('[data-ca]').forEach(function (b) {
      var act = b.getAttribute('data-ca'), i = +b.getAttribute('data-i');
      b.onclick = function () {
        if (act === 'add') { cform = cards().length; renderCards(); }
        else if (act === 'edit') { cform = i; renderCards(); }
        else if (act === 'lost') { if (confirm(t('cconfirm'))) setS(i, 'lost', renderCards); }
        else if (act === 'undo') setS(i, 'safe', renderCards);
        else if (act === 'found') setS(i, 'safe', function () { renderCards(); alert(t('cfoundMsg')); });
      };
    });
    croot.querySelectorAll('[data-cck]').forEach(function (c) {
      c.onchange = function () {
        var i = +c.getAttribute('data-i'), ck = Object.assign({}, cards()[i].checks || {});
        ck[c.getAttribute('data-cck')] = c.checked ? Date.now() : false;
        c.closest('.st').classList.toggle('ok', c.checked);
        var nt = croot.querySelector('[data-cnote="' + i + '"]');
        if (nt) nt.innerHTML = noteHtml(cards()[i].lostAt, cardItems(cards()[i]), ck);
        setCard(i, { checks: ck }).catch(function (e) { console.log('my-card check', e); var x = errOf(i); if (x) x.textContent = t('e_upd'); });
      };
    });
  }

  function readCardForm() {
    var g = function (id) { var e = croot.querySelector(id); return e ? e.value.trim() : ''; };
    return { kind: g('#cd-k') || 'debit', bank: g('#cd-b'), last4: g('#cd-l'), helpline: g('#cd-h') };
  }

  function renderCardForm(i) {
    var cur = cards()[i] || null, c = cdraft || cur || {};
    cdraft = null;
    croot.innerHTML = '<div class="mp"><h3>' + t('ct') + '</h3><p class="sub">' + t('csub') + '</p>' +
      '<div class="warn">' + t('cwarn') + '</div>' +
      '<label>' + t('ckind') + '</label><select id="cd-k">' + CKINDS.map(function (o) {
        return '<option value="' + o + '"' + ((c.kind || 'debit') === o ? ' selected' : '') + '>' + t('ck_' + o) + '</option>';
      }).join('') + '</select>' +
      '<label>' + t('cbank') + '</label><input id="cd-b" value="' + esc(c.bank) + '" placeholder="SBI">' +
      '<label>' + t('clast') + '</label><input id="cd-l" inputmode="numeric" maxlength="4" value="' + esc(c.last4) + '" placeholder="1234">' +
      '<label>' + t('chelp') + '</label><input id="cd-h" inputmode="tel" maxlength="20" value="' + esc(c.helpline) + '">' + hint('h_chelp') +
      '<div class="err" id="cd-err"></div>' +
      '<button class="btn pri" id="cd-save">' + t('save') + '</button><button class="btn" id="cd-cancel">' + t('cancel') + '</button>' +
      (cur ? '<button class="btn red" id="cd-del">' + t('cremove') + '</button>' : '') + '</div>';

    var err = croot.querySelector('#cd-err');
    croot.querySelectorAll('input').forEach(function (x) { x.oninput = function () { err.textContent = ''; }; });
    var back = function () { cform = null; renderCards(); };
    croot.querySelector('#cd-cancel').onclick = back;
    if (cur) croot.querySelector('#cd-del').onclick = function () {
      if (!confirm(t('crmconfirm'))) return;
      var a = cards().slice(); a.splice(i, 1);
      save({ cards: a }).then(back).catch(function (e) { console.log('my-card remove', e); err.textContent = t('e_upd'); });
    };
    croot.querySelector('#cd-save').onclick = function () {
      var x = readCardForm();
      if (!x.bank || !x.last4) { err.textContent = t('ce_req'); return; }
      if (!/^\d{4}$/.test(x.last4)) { err.textContent = t('ce_last'); return; }
      /* a long run of digits in any box looks like a full card number: refuse to save it */
      if (telOf(x.helpline).replace('+', '').length > 13 || /\d{12,}/.test(x.bank.replace(/[\s-]/g, ''))) { err.textContent = t('ce_last'); return; }
      var btn = this; btn.disabled = true; btn.textContent = t('saving');
      x.status = (cur && cur.status) || 'safe';
      setCard(i, x).then(back).catch(function (e) {
        console.log('my-card save', e);
        btn.disabled = false; btn.textContent = t('save'); err.textContent = t('e_save');
      });
    };
  }

  function rerender() {
    if (view === 'form') { draft = readForm(); renderForm(); }
    else if (view === 'card') renderCard();
    else if (view.indexOf('msg:') === 0) renderMsg(view.slice(4));
    if (lview === 'lform') { ldraft = readLapForm(); renderLapForm(); }
    else if (lview) renderLap();
    if (vshown) { if (vform !== null) vdraft = readVehForm(); renderVeh(); }
    if (cshown) { if (cform !== null) cdraft = readCardForm(); renderCards(); }
  }

  function start() {
    host = document.getElementById(ROOT_ID);
    if (!host || !window._auth || !window._db) { setTimeout(start, 400); return; }
    host.innerHTML = '<div></div><div></div><div></div><div></div>';
    root = host.children[0]; lroot = host.children[1]; vroot = host.children[2]; croot = host.children[3];
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
          hasPhone() ? renderCard() : renderForm();
          renderLap();
          renderVeh();
          renderCards();
        }).catch(function (e) { console.log('my-phone load', e); renderMsg('e_load'); });
      });
    }).catch(function (e) { console.log('my-phone import', e); });
  }
  start();
})();
