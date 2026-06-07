self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){ });
self.addEventListener('push', function(e){
  var d = {}; try { d = e.data ? e.data.json() : {}; } catch (err) { d = { title: 'Carnes & Sons', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Carnes & Sons', { body: d.body || '', icon: 'icon.svg', badge: 'icon.svg', data: { url: d.url || 'index.html' }, tag: d.tag || undefined, renotify: true }));
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || 'index.html';
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(function(cs){ for (var i=0;i<cs.length;i++){ if (cs[i].url.indexOf('index.html') > -1) return cs[i].focus(); } return self.clients.openWindow(url); }));
});
