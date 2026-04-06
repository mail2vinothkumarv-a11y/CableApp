// Vignesh Cables Service Worker v4.0
const CACHE = 'vc-v4';
const ASSETS = ['/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('script.google.com') || e.request.url.includes('googleapis') || e.request.url.includes('cdnjs')) {
    e.respondWith(fetch(e.request).catch(()=>new Response('{"status":"offline"}',{headers:{'Content-Type':'application/json'}})));
    return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));return r;})));
});
