import io, sys
PATH='index.html'
s=io.open(PATH,encoding='utf-8').read(); orig=s
def rep(old,new,label,expect=1):
    global s
    c=s.count(old)
    if c!=expect:
        print('ABORT: "%s" mila %d baar (chahiye %d). Kuch nahi badla.'%(label,c,expect)); sys.exit(1)
    s=s.replace(old,new); print('OK:',label)
old3='onerror="this.outerHTML=\'<div style=\\"height:220px;width:100%;background:#f3f4f6;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:64px;\\"></div>\'"'
new3='onerror="this.onerror=null;this.outerHTML=\'<div style=height:220px;width:100%;background:#f3f4f6;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:64px;></div>\'"'
rep(old3,new3,'#3 image leak fix')
old1a="document.getElementById('detail-poster-contact').textContent=p.contact||'No contact';"
new1a="document.getElementById('detail-poster-contact').textContent=window._currentUser?(p.contact||'No contact'):'Login karke dekhein';"
rep(old1a,new1a,'#1 contact text gate')
old1b="  let btns='';\n  if(phone.length>=10){"
new1b=("  let btns='';\n"
       "  if(!window._currentUser){btns+=`<button onclick=\"document.getElementById('login-required-modal').style.display='flex'\" style=\"display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;background:#111;color:white;border:none;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;width:100%;\">Login karke contact dekhein</button>`;}\n"
       "  else if(phone.length>=10){")
rep(old1b,new1b,'#1 contact buttons gate')
if s!=orig:
    io.open(PATH,'w',encoding='utf-8').write(s); print('\nDONE - teeno patch lag gaye.')
