# WARTA HUKUM — Portal Berita Digital Profesional

Portal media berita digital modern **WARTA HUKUM** menyajikan informasi hukum, peradilan, kriminal, kepolisian, kejaksaan, korupsi, politik kenegaraan, daerah, ekonomi, sosial, pendidikan, investigasi, dan opini pakar terpercaya Indonesia.

---

## 🌟 Fitur Utama Website

1. **Identitas & Branding Media Resmi**:
   - Logo resmi timbangan keadilan dengan sentuhan emas dan aksen pelangi.
   - Tagline dinamis: *"Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya"*.
   - Informasi badan hukum pers (*PT WARTA MEDIA HUKUM NUSANTARA*), susunan redaksi, kontak pengaduan, dan nomor kontak resmi.
2. **Desain Modern Rainbow Gradient Card**:
   - Perpaduan estetika kartu bergradasi pelangi halus (merah, jingga, kuning, hijau, biru, nila, ungu) pada bingkai kartu, label kategori, tombol aksi, dan highlight.
   - Tipografi editorial elegan (*Playfair Display* untuk judul headline, *Plus Jakarta Sans* untuk isi teks, *JetBrains Mono* untuk waktu/angka tabular).
   - Kontras tinggi dan pemenuhan aksesibilitas visual WCAG.
3. **Running Text / Ticker Breaking News**:
   - Posisi: Tepat di atas menu kartu kategori berita pada halaman utama.
   - Animasi CSS `linear` dengan putaran perulangan tak berujung (*seamless infinite loop*) tanpa jeda atau sentakan.
   - Teks resmi:
     `🔴 BREAKING NEWS • WARTA HUKUM — Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya. Mengawal Kebenaran, Menyuarakan Keadilan, Menyajikan Informasi untuk Indonesia.`
4. **Struktur Halaman Beranda Komprehensif**:
   - **Top Bar**: Penunjuk hari & tanggal otomatis (WIB / Asia/Jakarta), sorotan berita, tautan media sosial, pencarian cepat, tombol Masuk Redaksi.
   - **Header Utama**: Logo, navigasi 17 kanal berita, pencarian instan, tombol agenda & galeri, menu drawer responsif untuk perangkat bergerak (HP).
   - **Menu Kartu Kategori Berita**: 17 kanal kategori (Hukum, Kriminal, Politik, Nasional, Daerah, Pemerintahan, Peradilan, Kejaksaan, Kepolisian, Korupsi, Ekonomi dan Bisnis, Sosial, Pendidikan, Peristiwa, Opini, Investigasi, Nasional Update).
   - **Hero Slider & Sidebar Terpopuler**: Carousel berita utama foto berukuran besar dengan navigasi geser otomatis/manual serta indeks berita terpopuler dengan jumlah pembaca riil.
   - **Berita Terbaru**: Tata letak grid berita terkini dengan pagination dinamis.
   - **Kanal Liputan Khusus**: Tab segmentasi rubrik (Hukum & Peradilan, Kriminal & Kepolisian, Kejaksaan, Korupsi & Investigasi, Politik & Pemerintahan).
   - **Berita Daerah**: Filter wilayah berdasarkan Provinsi dan Kota/Kabupaten.
   - **Opini & Analisis Hukum**: Kanal artikel ilmiah, opini pakar, dan telaah akademisi hukum dengan profil penulis dan penanda khusus opini.
   - **Agenda Persidangan & Media**: Kalender agenda sidang terbuka pengadilan negeri/tipikor, seminar hukum, dan konferensi pers.
   - **Galeri Foto & Video Jurnalistik**: Dokumentasi visual peristiwa dengan tampilan Lightbox interaktif, takarir (caption), dan kredit fotografer.
   - **Buletin / Newsletter**: Formulir berlangganan buletin berita tervalidasi.
   - **Footer Portal**: Informasi badan hukum, Dewan Redaksi, Pedoman Media Siber Dewan Pers, Hak Jawab & Koreksi, Kontak Pengaduan, dan hak cipta.
5. **Halaman Detail Berita Ramah SEO**:
   - Jalur breadcrumb, kategori, headline bertingkat, ringkasan (lead), nama penulis dan editor, tanggal publikasi serta waktu baca.
   - Foto jurnalistik dominan dengan caption dan kredit sumber.
   - Pengatur ukuran huruf baca (*A- / A / A+*).
   - Tombol berbagi media sosial (WhatsApp, Facebook, Twitter/X, Salin Tautan).
   - Tag artikel dan rekomendasi berita terkait.
6. **Sistem Autentikasi & Hak Akses Bertingkat (RBAC)**:
   - **ADMIN (Akses Penuh)**: Mengelola dashboard, seluruh artikel, persetujuan dan revisi naskah, kategori, breaking news, slider, berita daerah, galeri foto, agenda, manajemen pengguna, halaman statis, profil media, dan audit log aktivitas.
   - **GURU (Kontributor Berita Terbatas)**: Menulis naskah berita, menyimpan draf, mengajukan artikel ke Redaksi, membuat agenda, melihat catatan revisi dari Pemimpin Redaksi, serta mengelola profil akun sendiri.

---

## 🔑 Akun Bawaan untuk Pengujian Sistem

Sistem dilengkapi tombol *"Akses Cepat Pengujian Peran"* pada jendela login atau dapat masuk menggunakan kredensial:

| Peran (Role) | Alamat Email | Kata Sandi | Wewenang |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@wartahukum.id` | `admin123` | Akses Penuh ke seluruh modul redaksi, persetujuan artikel, dan konfigurasi |
| **GURU (Kontributor)** | `kontributor@wartahukum.id` | `guru123` | Akses Kontributor: Tulis berita, ajukan draf, pantau revisi editor |

---

## 🛠️ Alur Editorial Naskah Berita

1. **Kontributor Guru** menulis berita baru dan mengunggah materi foto serta informasi narasumber.
2. Naskah dapat disimpan sebagai **Draf** atau langsung dikirimkan (**Diajukan**) ke Dewan Redaksi.
3. **Admin / Pemimpin Redaksi** membuka menu *Persetujuan Artikel* untuk memverifikasi akurasi fakta, sumber informasi, dan kepatuhan kode etik jurnalistik.
4. Admin dapat:
   - **Setujui & Terbitkan**: Naskah langsung berstatus *Published* dan tampil pada portal berita publik.
   - **Minta Revisi**: Admin menyematkan catatan editor spesifik kepada kontributor untuk disempurnakan.
   - **Tolak / Arsipkan**: Bila naskah tidak memenuhi asas jurnalistik.

---

## 🚀 Panduan Menjalankan & Deployment

### Menjalankan di Lingkungan Lokal
```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Akses melalui peramban
http://localhost:3000
```

### Membangun Versi Produksi
```bash
npm run build
```
Folder hasil kompilasi `/dist` siap diunggah ke penyedia hosting statis atau CDN modern seperti Cloud Run, Vercel, Firebase Hosting, atau server Nginx.
