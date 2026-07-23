import io
s=io.open('index.html',encoding='utf-8').read()
if 'registerPushToken' in s:
    print('ALREADY ADDED - skip'); raise SystemExit
fn='''
<script>
window.registerPushToken=async function(){
  try{
    if(!('serviceWorker' in navigator)||!window._currentUser)return;
    const reg=await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const perm=await Notification.requestPermission();
    if(perm!=='granted')return;
    const m=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');
    const messaging=m.getMessaging();
    const token=await m.getToken(messaging,{vapidKey:'BNAbA8bcnpqUFf8XUtFsCKWsMRRAjL9q3A9pkkBd21G3quPEx2MyD_bNsp3TmQgD0jZv_Zq2SBWRbKDq_I1lsTs',serviceWorkerRegistration:reg});
    if(!token)return;
    const fs=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    await fs.setDoc(fs.doc(window._db,'users',window._currentUser.uid),{fcmToken:token},{merge:true});
    console.log('FCM token saved');
    m.onMessage(messaging,function(p){if(window.toast)window.toast((p.notification&&p.notification.title)||'Naya message');});
  }catch(e){console.warn('push err',e);}
};
</script>
'''
s=s.replace('</body>', fn+'\\n</body>', 1)
io.open('index.html','w',encoding='utf-8').write(s)
print('DONE - registerPushToken added')
