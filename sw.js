// Menginstal Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Berhasil di-install');
});

// Syarat minimal agar Chrome memunculkan tombol "Install"
self.addEventListener('fetch', (e) => {
    // Membiarkan browser mengambil data seperti biasa
});
