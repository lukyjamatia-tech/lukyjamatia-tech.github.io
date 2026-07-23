#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# FindBack: Fraud reason ko Fraud Monitor ke card pe hi dikhana
# Usage: cd ~/findback && python3 apply-fraud-card-reason.py

import shutil

FILE = 'index.html'

NEW_SEG = ("'</div>"
           "<div class=\"fb-row-preview\" style=\"color:#dc2626;font-weight:700;margin-top:2px;\">"
           "&#9888; '+window._fbFraudReasons(p).join(' &middot; ')+'"
           "</div></div>'")

def main():
    with open(FILE, encoding='utf-8') as f:
        s = f.read()

    if 'fb-row-preview" style="color:#dc2626' in s:
        print('SKIP: card reason pehle se laga hai.')
        return

    i = s.find('fraudPosts.map(function(p){')
    if i == -1:
        print('ERROR: fraud card template nahi mila.')
        return
    j = s.find("}).join('')", i)
    if j == -1:
        print('ERROR: template ka end nahi mila.')
        return

    seg = s[i:j]
    old = "'</div></div>'"
    if old not in seg:
        print('ERROR: preview line ka end nahi mila. Kuch nahi badla.')
        return

    shutil.copyfile(FILE, FILE + '.pre-cardreason')

    seg2 = seg.replace(old, NEW_SEG, 1)
    s = s[:i] + seg2 + s[j:]

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(s)

    print('DONE! Fraud card pe ab reason dikhega (Contact ke neeche, laal me).')
    print('Backup: index.html.pre-cardreason')

if __name__ == '__main__':
    main()
