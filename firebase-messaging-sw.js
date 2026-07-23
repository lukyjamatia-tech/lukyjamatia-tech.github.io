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
  const title = (payload.notification && payload.notification.title) || 'FindBack';
  const options = {
    body: (payload.notification && payload.notification.body) || 'Naya message aaya hai',
    icon: 'https://findback.org/icon-192.png',
    badge: 'https://findback.org/icon-192.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});
