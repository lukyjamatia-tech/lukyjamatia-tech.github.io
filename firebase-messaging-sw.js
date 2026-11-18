importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCH1s6Cf2Zx2CZVv5HUUu2P7TwHEqoxWW8",
  projectId: "findback-app-34e4f",
  messagingSenderId: "504207496092",
  appId: "1:504207496092:web:b9d6918639ed23ddad6e59"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  if (payload.notification) return; // FCM already shows these; avoid duplicates
  const d = payload.data || {};
  self.registration.showNotification(d.title || 'FindBack', {
    body: d.body || 'You have a new message',
    icon: 'https://findback.org/icon-192.png',
    badge: 'https://findback.org/icon-192.png',
    data: d
  });
});

self.addEventListener('notificationclick', function(e) {
  const d = e.notification.data || {};
  if (d.FCM_MSG) return; // FCM handles clicks on its own notifications
  e.notification.close();
  const url = d.url || d.link || 'https://findback.org/';
  e.waitUntil(clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(list) {
    for (const c of list) { if (c.url.indexOf('findback.org') !== -1 && 'focus' in c) return c.focus(); }
    return clients.openWindow(url);
  }));
});
