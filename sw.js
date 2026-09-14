// Peta Kesehatan Unit - Service Worker
// Aplikasi ini butuh koneksi internet (Firebase real-time, Google Drive),
// jadi service worker ini SENGAJA tidak melakukan caching agresif -
// tujuannya cuma supaya syarat "installable PWA" terpenuhi (harus ada
// service worker terdaftar), bukan untuk mode offline penuh.
const VERSION = 'pkm-sw-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first sederhana: selalu coba ambil versi terbaru dari server dulu.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
