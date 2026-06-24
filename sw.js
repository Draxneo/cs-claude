// Carnes & Sons PWA service worker — versioned cache + network-first so updates apply.
var V='2.45.0';var CACHE='cs-'+V;var CORE=['index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(CORE).catch(function(){});}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('message',function(e){if(e.data==='skipWaiting')self.skipWaiting();});
self.addEventListener('fetch',function(e){
  var req=e.request;if(req.method!=='GET')return;var url;try{url=new URL(req.url);}catch(_){return;}
  if(url.origin!==location.origin)return; // only manage our own static files
  // Only cache GOOD responses (ok + 200 + same-origin basic). Caching a transient 404/500/redirect
  // used to poison the app shell forever ("stuck on an old/broken screen" until Force update).
  // Offline fallback to index.html ONLY for page navigations — a failed image/audio request must
  // fail cleanly, not render an HTML document as a broken blob.
  e.respondWith(fetch(req).then(function(r){if(r&&r.ok&&r.status===200&&r.type==='basic'){var rc=r.clone();caches.open(CACHE).then(function(c){c.put(req,rc);});}return r;}).catch(function(){return caches.match(req).then(function(m){if(m)return m;if(req.mode==='navigate')return caches.match('index.html');return Response.error();});}));
});
// PUSH: one push drives BOTH "live while open" and "buzz while closed".
// - If an app window is open & in front of the user (focused/visible): postMessage every
//   client a 'sms-refresh' so the open list/thread updates INSTANTLY, and SKIP the banner
//   (no need to buzz the thing he's already looking at).
// - If no focused window (phone locked / app backgrounded / closed): show the notification.
// Backend (twilio-webhook) sends one push per inbound text, tag="sms-<phone>" so repeats in
// the same thread collapse onto one banner instead of stacking.
self.addEventListener('push',function(e){
  var d={};try{d=e.data?e.data.json():{};}catch(err){d={title:'Carnes & Sons',body:e.data?e.data.text():''};}
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    var focused=false;
    for(var i=0;i<cs.length;i++){
      if(cs[i].focused||cs[i].visibilityState==='visible')focused=true;
      try{cs[i].postMessage({type:'sms-refresh',tag:d.tag||null});}catch(_e){}
    }
    if(focused)return; // app is open in front of the user -> it refreshes itself, no buzz needed
    return self.registration.showNotification(d.title||'Carnes & Sons',{body:d.body||'',icon:'icon.svg',badge:'icon.svg',data:{url:d.url||'index.html'},tag:d.tag||undefined,renotify:true});
  }));
});
self.addEventListener('notificationclick',function(e){e.notification.close();var url=(e.notification.data&&e.notification.data.url)||'index.html';e.waitUntil(self.clients.matchAll({type:'window'}).then(function(cs){for(var i=0;i<cs.length;i++){if(cs[i].url.indexOf('/cs-claude/')>-1)return cs[i].focus();}return self.clients.openWindow(url);}));});
