#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# FindBack: Fraud reason display in case detail view
# Usage: cd ~/findback && python3 apply-fraud-reason.py

import shutil

FILE = 'index.html'

ANCHOR = "return window._fbFraudNames.indexOf(name) >= 0 || window._fbFraudConts.indexOf(cont) >= 0;\n};"

REASONS_FN = """

window._fbFraudReasons = function(p) {
  var r = [];
  var name = (p.authorName||'').toLowerCase().trim();
  var cont = (p.contact||'').replace(/\\D/g,'').slice(-10);
  if(window._fbFraudNames.indexOf(name) >= 0) r.push('Yehi naam kai alag posts me use hua hai');
  if(window._fbFraudConts.indexOf(cont) >= 0) r.push('Yehi contact number kai alag posts me use hua hai');
  return r;
};"""

OLD_PILL = "typePill + (isFraud?' <span class=\"fp fp-fraud\"> Fraud</span>':'')"

NEW_PILL = ("typePill + (isFraud?' <span class=\"fp fp-fraud\"> Fraud</span>"
            "<div style=\"margin-top:6px;font-size:12px;font-weight:600;color:#dc2626;\">"
            "&#9888; '+window._fbFraudReasons(p).join(' &middot; ')+'</div>':'')")

def main():
    with open(FILE, encoding='utf-8') as f:
        s = f.read()

    if '_fbFraudReasons' in s:
        print('SKIP: reasons function pehle se hai.')
        return

    if ANCHOR not in s:
        print('ERROR: _fbIsFraud anchor nahi mila. Kuch nahi badla.')
        return
    if OLD_PILL not in s:
        print('ERROR: detail pill expression nahi mila. Kuch nahi badla.')
        return

    shutil.copyfile(FILE, FILE + '.pre-fraudreason')

    s = s.replace(ANCHOR, ANCHOR + REASONS_FN, 1)
    s = s.replace(OLD_PILL, NEW_PILL, 1)

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(s)

    print('DONE! Fraud reason ab case detail me dikhega.')
    print('Backup: index.html.pre-fraudreason')

if __name__ == '__main__':
    main()
