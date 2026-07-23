#!/usr/bin/env python3
# FindBack -- fix: push block QR string ke andar ghus gaya tha
# Usage: python3 fix_push.py index.html
import sys, shutil

path = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
src = open(path, encoding='utf-8').read()

BROKEN = '  var html=\'<html><head><title>FindBack QR Tag</title></head><body style="text-align:center;padding:20px;font-family:sans-serif;"><div style="border:3px solid #E8722A;border-radius:16px;padding:20px;display:inline-block;"><h2 style="color:#E8722A;">FindBack Tag</h2><img src="QRURL" style="width:180px;height:180px;"><h3>ITEM</h3>NAMEMSG<p style="font-size:12px;color:#E8722A;">Scan to contact owner</p></div>\n<script>\nwindow.registerPushToken=async function(){\n  try{\n    if(!(\'serviceWorker\' in navigator)||!window._currentUser)return;\n    const reg=await navigator.serviceWorker.register(\'/firebase-messaging-sw.js\');\n    const perm=await Notification.requestPermission();\n    if(perm!==\'granted\')return;\n    const m=await import(\'https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js\');\n    const messaging=m.getMessaging();\n    const token=await m.getToken(messaging,{vapidKey:\'BNAbA8bcnpqUFf8XUtFsCKWsMRRAjL9q3A9pkkBd21G3quPEx2MyD_bNsp3TmQgD0jZv_Zq2SBWRbKDq_I1lsTs\',serviceWorkerRegistration:reg});\n    if(!token)return;\n    const fs=await import(\'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js\');\n    await fs.setDoc(fs.doc(window._db,\'users\',window._currentUser.uid),{fcmToken:token},{merge:true});\n    console.log(\'FCM token saved\');\n    m.onMessage(messaging,function(p){if(window.toast)window.toast((p.notification&&p.notification.title)||\'Naya message\');});\n  }catch(e){console.warn(\'push err\',e);}\n};\n</script>\n\\n</body></html>\';'
FIXED_QR = '  var html=\'<html><head><title>FindBack QR Tag</title></head><body style="text-align:center;padding:20px;font-family:sans-serif;"><div style="border:3px solid #E8722A;border-radius:16px;padding:20px;display:inline-block;"><h2 style="color:#E8722A;">FindBack Tag</h2><img src="QRURL" style="width:180px;height:180px;"><h3>ITEM</h3>NAMEMSG<p style="font-size:12px;color:#E8722A;">Scan to contact owner</p></div></body></html>\';'
PUSH = "window.registerPushToken=async function(){\n  try{\n    if(!('serviceWorker' in navigator)||!window._currentUser)return;\n    const reg=await navigator.serviceWorker.register('/firebase-messaging-sw.js');\n    const perm=await Notification.requestPermission();\n    if(perm!=='granted')return;\n    const m=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');\n    const messaging=m.getMessaging();\n    const token=await m.getToken(messaging,{vapidKey:'BNAbA8bcnpqUFf8XUtFsCKWsMRRAjL9q3A9pkkBd21G3quPEx2MyD_bNsp3TmQgD0jZv_Zq2SBWRbKDq_I1lsTs',serviceWorkerRegistration:reg});\n    if(!token)return;\n    const fs=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');\n    await fs.setDoc(fs.doc(window._db,'users',window._currentUser.uid),{fcmToken:token},{merge:true});\n    console.log('FCM token saved');\n    m.onMessage(messaging,function(p){if(window.toast)window.toast((p.notification&&p.notification.title)||'Naya message');});\n  }catch(e){console.warn('push err',e);}\n};"

ANCHOR = "  setTimeout(function(){w.print();},300);\n};\n"

if BROKEN not in src:
    if PUSH in src and BROKEN not in src:
        print("Lagta hai patch pehle se laga hua hai. Kuch nahi badla.")
    else:
        print("ABORT: broken block nahi mila. File badli nahi.")
    sys.exit(1)

if src.count(BROKEN) != 1:
    print("ABORT: broken block", src.count(BROKEN), "baar mila (1 chahiye)")
    sys.exit(1)

# 1) QR string ko wapas jodo
src = src.replace(BROKEN, FIXED_QR, 1)

# 2) push function ko printQR ke BAAD daalo (usi script block me)
if src.count(ANCHOR) != 1:
    print("ABORT: anchor", src.count(ANCHOR), "baar mila (1 chahiye)")
    sys.exit(1)

src = src.replace(ANCHOR, ANCHOR + "\n" + PUSH + "\n", 1)

shutil.copy(path, path + '.bak_qrfix')
open(path, 'w', encoding='utf-8').write(src)

print("OK  -- QR string jud gayi")
print("OK  -- registerPushToken sahi jagah pe")
print()
print("Backup :", path + '.bak_qrfix')
print("Patched:", path)
