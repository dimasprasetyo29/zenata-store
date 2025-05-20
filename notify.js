export function loadNotifyView(container) {
  container.innerHTML = ''; // Kosongkan konten sebelumnya
  container.classList.remove('hidden');
  container.classList.add('grid');

  const kritikSaran = generateNotifications('Kritik & Saran', 12);
  const permintaanPesanan = generateNotifications('Permintaan Pesanan', 14);

  const allNotifications = [...kritikSaran, ...permintaanPesanan];

  allNotifications.forEach((notif, index) => {
    const card = document.createElement('div');
    card.className = `
      bg-gray-800 p-4 rounded-xl shadow-md transform scale-95 opacity-0 
      animate-fade-in-up animation-delay-${index * 50}
    `;
    card.innerHTML = `
      <h3 class="text-lg font-bold text-cyan-400">${notif.category}</h3>
      <p class="text-sm text-gray-300 mt-1">${notif.message}</p>
      <span class="text-xs text-gray-500 block mt-2">${notif.time}</span>
    `;
    container.appendChild(card);
  });
}

function generateNotifications(category, count) {
  const messages = {
    'Kritik & Saran': [
      "Tolong tambahkan opsi warna lebih banyak.",
      "Tampilan mobile kurang responsif.",
      "Minta fitur wishlist.",
      "Berat saat loading pertama.",
      "Butuh konfirmasi ulang saat checkout.",
      "Dark mode mantap!",
      "Gambar produk kurang jelas.",
      "Fitur filter agak membingungkan.",
      "Percepat proses login.",
      "Sertakan panduan ukuran.",
      "Live chat sangat membantu.",
      "Logo agak terlalu kecil."
    ],
    'Permintaan Pesanan': [
      "Ingin pre-order sepatu model X.",
      "Tambahkan stok baju hijau L.",
      "Ada diskon untuk pembelian banyak?",
      "Kapan restock jaket hitam?",
      "Bisa custom warna?",
      "Mau pesan 10 item untuk event.",
      "Apakah bisa COD?",
      "Minta invoice manual.",
      "Percepat pengiriman ke daerah saya.",
      "Barang bisa dibungkus kado?",
      "Mau repeat order bulan depan.",
      "Bisa gabungkan dua pesanan saya?",
      "Apakah ada garansi produk?",
      "Minta varian ukuran anak-anak."
    ]
  };

  const now = new Date();
  return Array.from({ length: count }).map((_, i) => ({
    category,
    message: messages[category][i % messages[category].length],
    time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} WIB`
  }));
}
