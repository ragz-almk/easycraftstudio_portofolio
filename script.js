// --- DATA PROJECTS ---
// Ini adalah "Database" sederhana (Array of Objects). 
// Berisi daftar nama proyek, kategori, dan link gambar-gambarnya.
const projects = [
    {
        id: 14,
        title: "The Celestial Hub",
        category: "Server Spawn",
        images: [
            "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
        ]
    },
    {
        id: 13,
        title: "Dragon's Peak Castle",
        category: "Medieval Structure",
        images: [
            "https://images.unsplash.com/photo-1533158326339-b10c3c6f4771?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599695679905-3e9a72138a0f?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1626079678835-02758eb09355?q=80&w=1600&auto=format&fit=crop"
        ]
    },
    // (Kamu bisa melanjutkan menambahkan daftar project 1 hingga 12 di sini seperti di kode aslimu)
    // Untuk mempersingkat contoh ini, formatnya sama persis seperti di atas.
];

// --- RENDER GRID (MEMUNCULKAN GAMBAR KE HTML) ---
// JavaScript mencari elemen dengan id 'project-grid' di HTML
const projectGrid = document.getElementById('project-grid');

// JavaScript melakukan perulangan (loop) untuk setiap data proyek di atas
projects.forEach(project => {
    // Membuat wadah 'div' baru untuk setiap gambar
    const card = document.createElement('div');
    card.className = "group relative cursor-pointer overflow-hidden rounded-sm";
    
    // Memberikan perintah: jika gambar diklik, jalankan fungsi openLightbox
    card.onclick = () => openLightbox(project.id);
    
    // Memasukkan struktur HTML ke dalam wadah 'div' tadi secara otomatis
    card.innerHTML = `
        <div class="aspect-[4/3] w-full overflow-hidden bg-neutral-800">
            <img src="${project.images[0]}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">${project.category}</p>
                <h3 class="text-2xl font-bold text-white group-hover:text-brand-orange transition-colors">${project.title}</h3>
                <div class="h-[1px] w-0 group-hover:w-full bg-brand-orange mt-4 transition-all duration-500"></div>
                <p class="text-neutral-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Click to view ${project.images.length} photos</p>
            </div>
        </div>
    `;
    
    // Menambahkan 'div' yang sudah jadi ke dalam halaman HTML utama
    projectGrid.appendChild(card);
});

// --- LIGHTBOX LOGIC (LOGIKA POP-UP GAMBAR) ---
// Variabel untuk melacak proyek dan urutan gambar mana yang sedang dibuka
let currentProject = null;
let currentImageIndex = 0;

// Menghubungkan variabel JS dengan elemen di HTML
const lightbox = document.getElementById('lightbox');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalCounter = document.getElementById('modal-counter');
const thumbnailStrip = document.getElementById('thumbnail-strip');

// Fungsi untuk membuka pop-up gambar
function openLightbox(projectId) {
    // Mencari data proyek berdasarkan ID yang diklik
    currentProject = projects.find(p => p.id === projectId);
    currentImageIndex = 0; // Mulai dari gambar pertama (index 0)
    
    updateLightboxContent(); // Memperbarui teks dan gambar
    
    lightbox.classList.remove('hidden'); // Menampilkan pop-up
    setTimeout(() => {
        lightbox.classList.remove('opacity-0'); // Membuat animasi perlahan muncul
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Mengunci layar agar tidak bisa di-scroll ke bawah
}

// Fungsi untuk menutup pop-up gambar
function closeLightbox() {
    lightbox.classList.add('opacity-0'); // Membuat animasi memudar
    setTimeout(() => {
        lightbox.classList.add('hidden'); // Menyembunyikan pop-up sepenuhnya
        currentProject = null;
    }, 300);
    document.body.style.overflow = 'auto'; // Mengembalikan layar agar bisa di-scroll
}

// Fungsi untuk mengganti isi pop-up (gambar, judul, halaman)
function updateLightboxContent() {
    if (!currentProject) return;

    modalImg.src = currentProject.images[currentImageIndex];
    modalTitle.innerText = currentProject.title;
    modalDesc.innerText = currentProject.category;
    modalCounter.innerText = `${currentImageIndex + 1} / ${currentProject.images.length}`;

    // Memperbarui deretan thumbnail kecil di bawah
    thumbnailStrip.innerHTML = '';
    currentProject.images.forEach((img, index) => {
        const thumb = document.createElement('div');
        // Memberi kotak oranye pada thumbnail yang sedang aktif
        thumb.className = `h-full aspect-square overflow-hidden cursor-pointer border-2 transition-all ${index === currentImageIndex ? 'border-brand-orange opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`;
        thumb.innerHTML = `<img src="${img}" class="w-full h-full object-cover">`;
        thumb.onclick = (e) => {
            e.stopPropagation(); 
            currentImageIndex = index; // Ganti gambar sesuai thumbnail yang diklik
            updateLightboxContent();
        };
        thumbnailStrip.appendChild(thumb);
    });
}

// Fungsi tombol 'Selanjutnya' (Next)
function nextImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    updateLightboxContent();
}

// Fungsi tombol 'Sebelumnya' (Previous)
function prevImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateLightboxContent();
}

// --- EVENT LISTENERS (PENDENGAR AKSI PENGGUNA) ---

// Mendengarkan tombol pada keyboard
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') closeLightbox(); // Tutup jika tekan tombol Esc
    if (e.key === 'ArrowRight') nextImage(); // Next jika tekan Panah Kanan
    if (e.key === 'ArrowLeft') prevImage();  // Prev jika tekan Panah Kiri
});

// Menutup pop-up jika pengguna klik area hitam di luar gambar
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('flex-1')) {
        closeLightbox();
    }
});
        
// --- FITUR SWIPE (USAP) UNTUK MOBILE ---
let touchstartX = 0;
let touchendX = 0;

// Mendeteksi posisi x (horizontal) saat jari pertama kali menyentuh layar
lightbox.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

// Mendeteksi posisi x saat jari dilepas dari layar, lalu mengeksekusi fungsi geser
lightbox.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleSwipeGesture();
}, false);

// Fungsi logika penentu arah usapan
function handleSwipeGesture() {
    // Jarak minimal usapan (50 pixel) agar ketidaksengajaan tersentuh tidak mengganti gambar
    const swipeThreshold = 50; 
    
    // Jika posisi akhir lebih kecil dari posisi awal dikurangi jarak minimal (Artinya geser ke KIRI)
    if (touchendX < touchstartX - swipeThreshold) {
        nextImage(); // Panggil fungsi gambar selanjutnya
    }
    
    // Jika posisi akhir lebih besar dari posisi awal ditambah jarak minimal (Artinya geser ke KANAN)
    if (touchendX > touchstartX + swipeThreshold) {
        prevImage(); // Panggil fungsi gambar sebelumnya
    }
});
