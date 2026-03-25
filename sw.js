// FindBack S1 — Service Worker
// Version: 1.0.0
var CACHE_NAME = 'findback-s1-v1';
var STATIC_ASSETS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap'
];

// ── INSTALL ──
self.addEventListener('install', function(e){
  console.log('[SW] Installing FindBack SW...');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(function(err){
        console.warn('[SW] Cache addAll partial fail:', err);
      });
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE ──
self.addEventListener('activate', function(e){
  console.log('[SW] Activating FindBack SW...');
  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(name){
          return name !== CACHE_NAME;
        }).map(function(name){
          console.log('[SW] Deleting old cache:', name);
          return caches.delete(name);
        })
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});

// ── FETCH — Network First, Cache Fallback ──
self.addEventListener('fetch', function(e){
  // Skip non-GET and Firebase/API requests
  if(e.request.method !== 'GET') return;
  var url = e.request.url;
  if(url.includes('firebasejs') || url.includes('googleapis.com/firestore') || 
     url.includes('api.anthropic.com') || url.includes('firebaseapp.com') ||
     url.includes('qrserver.com') || url.includes('wa.me') ||
     url.includes('chrome-extension')) return;

  // For HTML pages — network first
  if(e.request.headers.get('accept') && e.request.headers.get('accept').includes('text/html')){
    e.respondWith(
      fetch(e.request).then(function(response){
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(e.request, clone); });
        return response;
      }).catch(function(){
        return caches.match(e.request).then(function(cached){
          return cached || caches.match('/index.html');
        });
      })
    );
    return;
  }

  // For other assets — cache first
  e.respondWith(
    caches.match(e.request).then(function(cached){
      if(cached) return cached;
      return fetch(e.request).then(function(response){
        if(!response || response.status !== 200 || response.type === 'opaque') return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(e.request, clone); });
        return response;
      }).catch(function(){ return cached; });
    })
  );
});

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', function(e){
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) { data = {title:'FindBack Alert', body: e.data ? e.data.text() : 'Naya post aaya!'}; }
  
  var title = data.title || '🔔 FindBack Alert';
  var options = {
    body: data.body || 'Tumhare area mein naya post aaya!',
    icon: data.icon || 'https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=FindBack&color=E8722A&bgcolor=111111',
    badge: data.badge || 'https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=FindBack&color=E8722A&bgcolor=111111',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/', postId: data.postId || null },
    actions: [
      { action: 'view', title: '👁️ Dekho' },
      { action: 'dismiss', title: 'Ignore' }
    ],
    requireInteraction: false,
    silent: false
  };
  
  e.waitUntil(self.registration.showNotification(title, options));
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) ? e.notification.data.url : '/';
  
  if(e.action === 'dismiss') return;
  
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList){
      // If app is open, focus it
      for(var i = 0; i < clientList.length; i++){
        var client = clientList[i];
        if(client.url.includes(self.location.origin) && 'focus' in client){
          return client.focus();
        }
      }
      // Otherwise open new window
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── BACKGROUND SYNC (for offline posts) ──
self.addEventListener('sync', function(e){
  if(e.tag === 'sync-posts'){
    console.log('[SW] Background sync: posts');
  }
});

// ── MESSAGE from app ──
self.addEventListener('message', function(e){
  if(e.data && e.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
  if(e.data && e.data.type === 'SEND_ALERT'){
    // App told SW to show notification
    var opts = {
      body: e.data.body || 'Alert!',
      icon: 'https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=FindBack&color=E8722A&bgcolor=111111',
      vibrate: [200, 100, 200],
      data: { url: '/' }
    };
    self.registration.showNotification(e.data.title || '🔔 FindBack', opts);
  }
});

console.log('[SW] FindBack Service Worker loaded ✅');
