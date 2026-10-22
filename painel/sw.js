// Painel: guarda só a página (página, ponte, ícones e manifesto). O painel e os dados vêm sempre frescos do Google.
var VERSAO = 'tg-painel-3';
var ARQUIVOS = ['./', 'index.html', '../ponte.js', 'manifest.webmanifest', 'icones/icone-192.png', 'icones/icone-512.png', 'icones/apple-180.png', 'icones/favicon-32.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSAO).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k.indexOf('tg-painel-') === 0 && k !== VERSAO; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  // primeiro a rede (pra pegar sempre a versão nova da casca); sem rede, a cópia guardada
  e.respondWith(fetch(e.request).then(function (r) {
    var cp = r.clone();
    caches.open(VERSAO).then(function (c) { c.put(e.request, cp); });
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('index.html'); });
  }));
});
