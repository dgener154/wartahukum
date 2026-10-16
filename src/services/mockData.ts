import {
  Article,
  ArticleCategory,
  MediaSettings,
  StaticPage,
  AgendaItem,
  GalleryItem,
  User,
  ActivityLog,
  BreakingNewsItem,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'Dr. Hendra Gunawan, S.H., M.H.',
    email: 'admin@wartahukum.id',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Pemimpin Redaksi & Penanggung Jawab WARTA HUKUM. Praktisi hukum dan jurnalisme investigasi.',
    phone: '+62 811 9900 1122',
    active: true,
    createdAt: '2026-01-01T08:00:00Z',
  },
  {
    id: 'user-redaksi-1',
    name: 'Bambang Prasetyo, S.H.',
    email: 'redaksi@wartahukum.id',
    role: 'REDAKSI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Wartawan Investigasi & Tim Redaksi Hukum Nasional.',
    phone: '+62 813 4455 6677',
    active: true,
    createdAt: '2026-01-15T09:30:00Z',
  },
  {
    id: 'user-redaksi-2',
    name: 'Siti Rahmawati, S.H.',
    email: 'siti.redaksi@wartahukum.id',
    role: 'REDAKSI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Jurnalis Investigasi & Koresponden Redaksi Wilayah Jawa Barat.',
    phone: '+62 812 7788 9900',
    active: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
];

export const INITIAL_CATEGORIES: ArticleCategory[] = [
  { id: 'cat-hukum', name: 'Hukum', slug: 'hukum', description: 'Ulasan peraturan, yurisprudensi, dan dinamika hukum nasional.', color: '#ef4444', order: 1, active: true, iconName: 'Scale' },
  { id: 'cat-kriminal', name: 'Kriminal', slug: 'kriminal', description: 'Peliputan kasus pidana dan penegakan ketertiban masyarakat.', color: '#f97316', order: 2, active: true, iconName: 'ShieldAlert' },
  { id: 'cat-politik', name: 'Politik', slug: 'politik', description: 'Dinamika regulasi ketatanegaraan, parlemen, dan pemilu.', color: '#eab308', order: 3, active: true, iconName: 'Landmark' },
  { id: 'cat-nasional', name: 'Nasional', slug: 'nasional', description: 'Kabar penting peristiwa berskala nasional dari Sabang sampai Merauke.', color: '#22c55e', order: 4, active: true, iconName: 'Globe' },
  { id: 'cat-daerah', name: 'Daerah', slug: 'daerah', description: 'Sorotan regulasi, perda, dan kasus hukum dari berbagai penjuru daerah.', color: '#06b6d4', order: 5, active: true, iconName: 'MapPin' },
  { id: 'cat-pemerintahan', name: 'Pemerintahan', slug: 'pemerintahan', description: 'Kebijakan kementerian, aparatur sipil, dan tata kelola kenegaraan.', color: '#3b82f6', order: 6, active: true, iconName: 'Building2' },
  { id: 'cat-peradilan', name: 'Peradilan', slug: 'peradilan', description: 'Jalannya persidangan, putusan Mahkamah Agung, MK, dan pengadilan negeri.', color: '#6366f1', order: 7, active: true, iconName: 'Gavel' },
  { id: 'cat-kejaksaan', name: 'Kejaksaan', slug: 'kejaksaan', description: 'Kinerja Korps Adhyaksa dalam penuntutan dan pemulihan aset negara.', color: '#8b5cf6', order: 8, active: true, iconName: 'Briefcase' },
  { id: 'cat-kepolisian', name: 'Kepolisian', slug: 'kepolisian', description: 'Tindakan presisi Polri dalam penyelidikan dan pelayanan hukum.', color: '#ec4899', order: 9, active: true, iconName: 'BadgeCheck' },
  { id: 'cat-korupsi', name: 'Korupsi', slug: 'korupsi', description: 'Pengawasan tindak pidana korupsi, OTT KPK, dan audit kerugian negara.', color: '#dc2626', order: 10, active: true, iconName: 'AlertTriangle' },
  { id: 'cat-ekonomi-bisnis', name: 'Ekonomi dan Bisnis', slug: 'ekonomi-dan-bisnis', description: 'Kepastian hukum investasi, sengketa niaga, dan perbankan.', color: '#059669', order: 11, active: true, iconName: 'TrendingUp' },
  { id: 'cat-sosial', name: 'Sosial', slug: 'sosial', description: 'Keadilan sosial, advokasi masyarakat marginal, dan hak asasi manusia.', color: '#0891b2', order: 12, active: true, iconName: 'Users' },
  { id: 'cat-pendidikan', name: 'Pendidikan', slug: 'pendidikan', description: 'Hukum dan regulasi tata kelola sekolah, guru, dan pendidikan nasional.', color: '#7c3aed', order: 13, active: true, iconName: 'GraduationCap' },
  { id: 'cat-peristiwa', name: 'Peristiwa', slug: 'peristiwa', description: 'Kilas kejadian faktual yang menyita perhatian masyarakat.', color: '#db2777', order: 14, active: true, iconName: 'Zap' },
  { id: 'cat-opini', name: 'Opini', slug: 'opini', description: 'Analisis akademisi, pandangan praktisi, dan telaah kritis hukum.', color: '#b45309', order: 15, active: true, iconName: 'BookOpen' },
  { id: 'cat-investigasi', name: 'Investigasi', slug: 'investigasi', description: 'Laporan mendalam berbasis fakta dokumen dan verifikasi lintas sumber.', color: '#4338ca', order: 16, active: true, iconName: 'Search' },
  { id: 'cat-nasional-update', name: 'Nasional Update', slug: 'nasional-update', description: 'Perkembangan cepat situasi terkini dari seluruh wilayah Nusantara.', color: '#0284c7', order: 17, active: true, iconName: 'BellRing' },
];

export const INITIAL_SETTINGS: MediaSettings = {
  name: 'WARTA HUKUM',
  tagline: 'Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya',
  legalEntityName: 'PT WARTA MEDIA HUKUM NUSANTARA',
  companyRegistrationNote: 'Badan hukum pers berbadan hukum resmi Republik Indonesia. Pengelolaan dokumen legal diverifikasi berkala oleh Manajemen Redaksi.',
  editorInChief: 'Dr. Hendra Gunawan, S.H., M.H.',
  editorialAddress: 'Gedung Pers Kebon Sirih Lt. 4, Jl. Kebon Sirih No. 34, Gambir, Jakarta Pusat 10110',
  email: 'redaksi@wartahukum.id',
  phone: '+62 21 385 4920',
  whatsapp: '+62 812 8899 7722',
  complaintsEmail: 'pengaduan@wartahukum.id',
  socialLinks: {
    facebook: 'https://facebook.com/wartahukum.official',
    twitter: 'https://twitter.com/wartahukum_id',
    instagram: 'https://instagram.com/wartahukum_id',
    youtube: 'https://youtube.com/@wartahukum_id',
    tiktok: 'https://tiktok.com/@wartahukum',
  },
  copyright: '© 2026 WARTA HUKUM. Seluruh Hak Cipta Dilindungi Undang-Undang.',
  rainbowIntensity: 'medium',
  enableTicker: true,
  tickerCustomText: '🔴 BREAKING NEWS • WARTA HUKUM — Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya. Mengawal Kebenaran, Menyuarakan Keadilan, Menyajikan Informasi untuk Indonesia.',
  homeArticlesLimit: 9,
  seoDefaultTitle: 'WARTA HUKUM — Portal Berita Digital Hukum, Kriminal, dan Peradilan Indonesia',
  seoDefaultDescription: 'Portal berita online terdepan menyajikan kabar hukum terverifikasi, peradilan, korupsi, kepolisian, kejaksaan, opini pakar hukum, dan dinamika daerah.',
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-001',
    title: 'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Tata Niaga Komoditas',
    slug: 'kejaksaan-agung-sita-aset-1-2-triliun-tipikor-komoditas',
    summary: 'Tim Penyidik Jampidsus Kejaksaan Agung kembali menyita sejumlah aset properti dan rekening bank terkait pengusutan perkara dugaan tindak pidana korupsi tata kelola komoditas nasional.',
    content: `
      <p class="mb-4"><strong>JAKARTA</strong> — Tim Penyidik Jaksa Agung Muda Bidang Tindak Pidana Khusus (Jampidsus) Kejaksaan Agung kembali menyita aset bernilai ekonomis tinggi senilai Rp 1,2 triliun dalam rangka penyidikan dugaan tindak pidana korupsi tata niaga komoditas strategis nasional.</p>
      
      <p class="mb-4">Kepala Pusat Penerangan Hukum Kejaksaan Agung memaparkan bahwa aset yang disita berupa sertifikat hak milik atas lahan industri seluas 14 hektare, unit fasilitas pengolahan, serta pemblokiran dana di belasan rekening giro bank nasional.</p>

      <blockquote class="p-4 my-6 bg-slate-100 rounded-xl border border-slate-200 text-slate-800 italic">
        "Langkah penelusuran aset (asset tracing) dilakukan secara intensif bekerja sama dengan PPATK. Fokus penegakan hukum tipikor saat ini adalah pemulihan kerugian kas negara secara maksimal demi rasa keadilan masyarakat," tegas perwakilan Kejaksaan Agung.
      </blockquote>

      <h3 class="text-xl font-bold mt-6 mb-3 text-slate-900">Pemulihan Kerugian Keuangan Negara</h3>
      <p class="mb-4">Seluruh aset yang disita kini dititipkan di bawah pengawasan Badan Pemulihan Aset Kejaksaan RI untuk dijaga nilai ekonomisnya hingga putusan pengadilan berkekuatan hukum tetap (inkracht).</p>
    `,
    categoryId: 'cat-kejaksaan',
    categoryName: 'Kejaksaan',
    tags: ['Kejaksaan Agung', 'Jampidsus', 'Aset Tracing', 'Korupsi', 'Tipikor Komoditas'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Selatan' },
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
    caption: 'Simbol timbangan keadilan dan penegakan hukum dalam pengusutan perkara tindak pidana korupsi.',
    imageCredit: 'Dokumentasi Puspenkum Kejaksaan Agung',
    authorId: 'user-redaksi-1',
    authorName: 'Bambang Trihatmojo, S.H., M.H.',
    authorRole: 'REDAKSI',
    editorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    createdAt: '2026-10-13T09:30:00Z',
    updatedAt: '2026-10-13T09:30:00Z',
    publishedAt: '2026-10-13T09:30:00Z',
    status: 'published',
    seoTitle: 'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Tipikor Komoditas',
    seoDescription: 'Jampidsus Kejaksaan Agung sita aset properti dan rekening Rp 1,2 Triliun terkait dugaan tipikor tata niaga komoditas.',
    isFeatured: true,
    isBreaking: true,
    isPinnedHero: true,
    viewsCount: 5420,
    readTimeMinutes: 4,
  },
  {
    id: 'art-002',
    title: 'Kejaksaan Agung Sita Aset Rp 420 Miliar Terkait Perkara Dugaan Penyimpangan Tata Niaga Komoditas',
    slug: 'kejaksaan-agung-sita-aset-420-miliar-tata-niaga-komoditas',
    summary: 'Tim Penyidik Jampidsus Kejaksaan Agung melakukan penyitaan sejumlah aset tanah, pabrik, dan rekening giro milik korporasi tersangka guna pemulihan kerugian keuangan negara.',
    content: `
      <p class="mb-4"><strong>JAKARTA</strong> — Tim Penyidik Jaksa Agung Muda Bidang Tindak Pidana Khusus (Jampidsus) Kejaksaan Agung kembali menyita aset bernilai ekonomis tinggi senilai Rp 420 miliar dalam rangka penyidikan dugaan tindak pidana korupsi tata niaga komoditas strategis.</p>
      
      <p class="mb-4">Kepala Pusat Penerangan Hukum Kejagung memaparkan bahwa aset yang disita berupa sertifikat hak milik atas lahan industri seluas 14 hektare, 3 unit fasilitas pengolahan, serta pemblokiran dana di belasan rekening bank nasional.</p>

      <h3 class="text-xl font-bold mt-6 mb-3 text-slate-900">Pemulihan Kerugian Keuangan Negara</h3>
      <p class="mb-4">Langkah penelusuran aset (<em>asset tracing</em>) dilakukan secara intensif bekerja sama dengan Pusat Pelaporan dan Analisis Transaksi Keuangan (PPATK). Kejaksaan menegaskan fokus penegakan hukum tipikor saat ini tidak hanya pemidanaan badan, melainkan pengembalian kerugian kas negara secara maksimal.</p>

      <p class="mb-4">Seluruh aset yang disita kini dititipkan di bawah pengawasan Badan Pemulihan Aset Kejaksaan RI untuk dijaga nilai ekonomisnya hingga putusan pengadilan berkekuatan hukum tetap (<em>inkracht</em>).</p>
    `,
    categoryId: 'cat-kejaksaan',
    categoryName: 'Kejaksaan',
    tags: ['Kejaksaan Agung', 'Jampidsus', 'Aset Tracing', 'Korupsi', 'Pemulihan Aset'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Selatan' },
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Penyidik Jampidsus saat menyegel berkas dan dokumen transaksi di lokasi penyidikan.',
    imageCredit: 'Dokumentasi Puspenkum Kejaksaan Agung',
    authorId: 'user-admin-1',
    authorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    authorRole: 'ADMIN',
    editorName: 'Hendra Gunawan',
    createdAt: '2026-10-14T03:15:00Z',
    updatedAt: '2026-10-14T04:00:00Z',
    publishedAt: '2026-10-14T04:00:00Z',
    status: 'published',
    seoTitle: 'Kejagung Sita Aset 420 Miliar Dugaan Korupsi Komoditas',
    seoDescription: 'Jampidsus Kejaksaan Agung sita pabrik dan rekening bernilai Rp 420 Miliar terkait penyidikan korupsi komoditas.',
    isFeatured: true,
    isBreaking: false,
    viewsCount: 2950,
    readTimeMinutes: 3,
  },
  {
    id: 'art-003',
    title: 'KPK Gelar Operasi Tangkap Tangan di Wilayah Jawa Timur Terkait Dugaan Suap Pengadaan Infrastruktur',
    slug: 'kpk-operasi-tangkap-tangan-jawa-timur-infrastruktur-2026',
    summary: 'Komisi Pemberantasan Korupsi mengamankan lima orang terperiksa termasuk oknum pejabat dinas pekerjaan umum dan pihak rekanan swasta berserta barang bukti uang tunai.',
    content: `
      <p class="mb-4"><strong>SURABAYA</strong> — Komisi Pemberantasan Korupsi (KPK) mengonfirmasi pelaksanaan kegiatan tangkap tangan di salah satu kabupaten di Jawa Timur pada Selasa malam. Dalam giat tersebut, tim penyelidik mengamankan sejumlah pihak dan menyita barang bukti uang tunai rupiah dan valuta asing.</p>

      <p class="mb-4">Juru Bicara Penindakan KPK menyatakan bahwa pihak-pihak yang diamankan saat ini sedang menjalani pemeriksaan intensif di Mapolda Jawa Timur sebelum diterbangkan ke Gedung Merah Putih KPK Jakarta untuk penentuan status hukum dalam batas waktu 1x24 jam.</p>

      <blockquote class="p-4 my-6 bg-slate-100 rounded-xl border border-slate-200 text-slate-800 italic">
        "Kami menghimbau seluruh pihak untuk mengedepankan asas praduga tak bersalah. Kronologi lengkap, nominal barang bukti, serta konstruksi perkara akan kami paparkan secara rinci dalam konferensi pers resmi," ujar Juru Bicara KPK.
      </blockquote>
    `,
    categoryId: 'cat-korupsi',
    categoryName: 'Korupsi',
    tags: ['KPK', 'OTT', 'Jawa Timur', 'Suap Proyek', 'Korupsi'],
    location: { province: 'Jawa Timur', city: 'Surabaya' },
    coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gedung Komisi Pemberantasan Korupsi di kawasan Kuningan, Jakarta Selatan.',
    imageCredit: 'Arsip Liputan WARTA HUKUM',
    authorId: 'user-redaksi-2',
    authorName: 'Siti Rahmawati, S.H.',
    authorRole: 'REDAKSI',
    editorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    createdAt: '2026-10-14T02:00:00Z',
    updatedAt: '2026-10-14T02:45:00Z',
    publishedAt: '2026-10-14T02:45:00Z',
    status: 'published',
    seoTitle: 'OTT KPK di Jawa Timur Amankan Pejabat Dinas PU',
    seoDescription: 'KPK lakukan tangkap tangan di Jawa Timur amankan 5 orang terkait suap pengadaan proyek infrastruktur.',
    isFeatured: true,
    isBreaking: true,
    viewsCount: 4120,
    readTimeMinutes: 3,
  },
  {
    id: 'art-004',
    title: 'Bareskrim Polri Bongkar Jaringan Sindikat Judi Online Internasional Lintas Negara Beromzet Ratusan Miliar',
    slug: 'bareskrim-polri-bongkar-jaringan-judi-online-internasional',
    summary: 'Direktorat Tindak Pidana Siber Bareskrim Polri menetapkan 12 tersangka operator dan fasilitator pembayaran server luar negeri yang menyasar masyarakat luas.',
    content: `
      <p class="mb-4"><strong>JAKARTA</strong> — Direktorat Tindak Pidana Siber Bareskrim Polri menggelar rilis pengungkapan sindikat perjudian daring internasional yang mengoperasikan portal judi dengan kedok game ketangkasan dan investasi digital.</p>
      
      <p class="mb-4">Direktur Tindak Pidana Siber menyampaikan bahwa pengungkapan ini merupakan buah dari penelusuran rekam jejak digital serta pemblokiran lebih dari 1.200 rekening bank penampung yang disamarkan menggunakan identitas palsu.</p>

      <p class="mb-4">Para tersangka dijerat dengan Pasal 45 ayat (2) jo Pasal 27 ayat (2) UU ITE, serta Pasal 3, 4, dan 5 UU Tindak Pidana Pencucian Uang (TPPU) dengan ancaman pidana maksimal 20 tahun penjara.</p>
    `,
    categoryId: 'cat-kepolisian',
    categoryName: 'Kepolisian',
    tags: ['Bareskrim', 'Siber Polri', 'Judi Online', 'TPPU', 'Kriminal'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Selatan' },
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Barang bukti perangkat server, laptop, dan buku rekening penampung diperlihatkan di Bareskrim Polri.',
    imageCredit: 'Divisi Humas Polri',
    authorId: 'user-admin-1',
    authorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    authorRole: 'ADMIN',
    editorName: 'Hendra Gunawan',
    createdAt: '2026-10-13T14:30:00Z',
    updatedAt: '2026-10-13T16:00:00Z',
    publishedAt: '2026-10-13T16:00:00Z',
    status: 'published',
    isFeatured: false,
    viewsCount: 1890,
    readTimeMinutes: 3,
  },
  {
    id: 'art-005',
    title: 'Menata Regulasi Perlindungan Guru dalam Menjalankan Profesi Pendidik Sesuai UU No. 14 Tahun 2005',
    slug: 'menata-regulasi-perlindungan-guru-dalam-profesi-pendidik',
    summary: 'Guru memerlukan kepastian jaminan perlindungan hukum saat mendisiplinkan siswa dalam koridor etika pendidikan agar tidak mudah dikriminalisasi oleh laporan sepihak.',
    content: `
      <p class="mb-4">Perdebatan mengenai batas disiplin pendidik di lingkungan sekolah kerap menyeret guru ke meja aparat penegak hukum. Padahal, Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen Pasal 39 secara tegas mengamanatkan bahwa pemerintah dan masyarakat wajib memberikan perlindungan hukum, profesi, serta keselamatan bagi para pendidik.</p>

      <p class="mb-4">Sangat diperlukan harmonisasi memorandum of understanding (MoU) antara Kementerian Pendidikan, Kepolisian Negara Republik Indonesia, dan organisasi profesi guru di tingkat daerah. Upaya penegakan disiplin edukatif yang proporsional tidak dapat serta-merta dipandang sebagai tindak pidana kekerasan jika tidak menimbulkan luka fisik atau trauma psikis berat.</p>

      <p class="mb-4">Sekolah harus memiliki Dewan Pertimbangan Disiplin Internal yang beranggotakan perwakilan guru, komite sekolah, dan psikolog anak guna memediasi sengketa antara orang tua dan pendidik sebelum perkara melompat ke ranah kepolisian.</p>
    `,
    categoryId: 'cat-pendidikan',
    categoryName: 'Pendidikan',
    tags: ['Guru', 'Perlindungan Profesi', 'Pendidikan', 'Hukum Sekolah'],
    location: { province: 'Jawa Barat', city: 'Bandung' },
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Suasana ruang kelas dan interaksi pendidik bersama para siswa.',
    imageCredit: 'Dokumentasi Warta Hukum',
    authorId: 'user-redaksi-1',
    authorName: 'Ahmad Fauzi, S.Pd., S.H.',
    authorRole: 'REDAKSI',
    editorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    createdAt: '2026-10-13T10:00:00Z',
    updatedAt: '2026-10-13T12:00:00Z',
    publishedAt: '2026-10-13T12:00:00Z',
    status: 'published',
    isOpinion: true,
    opinionAuthorBio: 'Ahmad Fauzi, S.Pd., S.H. adalah pemerhati hukum pendidikan dan guru madrasah aliyah di Jawa Barat.',
    viewsCount: 2240,
    readTimeMinutes: 4,
  },
  {
    id: 'art-006',
    title: 'Pengadilan Tipikor Bandung Vonis Mantan Pejabat Pengadaan 6 Tahun Penjara Terkait Mark-up Pengadaan Lahan',
    slug: 'pengadilan-tipikor-bandung-vonis-mantan-pejabat-pengadaan-6-tahun',
    summary: 'Majelis hakim menyatakan terdakwa terbukti secara sah dan meyakinkan bersalah melanggar Pasal 2 ayat (1) UU Tindak Pidana Korupsi serta membebankan uang pengganti kerugian negara.',
    content: `
      <p class="mb-4"><strong>BANDUNG</strong> — Majelis Hakim Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Bandung menjatuhkan vonis 6 tahun kurungan penjara dan denda Rp 300 juta subsider 4 bulan kurungan terhadap mantan pejabat pembuat komitmen (PPK) proyek pengadaan lahan fasilitas umum.</p>

      <p class="mb-4">Ketua Majelis Hakim dalam amar putusannya menyatakan perbuatan terdakwa telah mencederai kepercayaan publik dan menguntungkan korporasi perantara dengan nilai selisih appraisal tanah yang tidak wajar.</p>

      <p class="mb-4">Terdakwa juga diwajibkan membayar uang pengganti sebesar Rp 3,2 miliar dalam kurun waktu satu bulan sejak putusan berkekuatan hukum tetap, atau harta bendanya akan disita dan dilelang oleh jaksa eksekutor.</p>
    `,
    categoryId: 'cat-daerah',
    categoryName: 'Daerah',
    tags: ['Bandung', 'Jawa Barat', 'Tipikor', 'Vonis Hakim', 'Pengadaan Lahan'],
    location: { province: 'Jawa Barat', city: 'Bandung' },
    coverImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gedung Pengadilan Negeri / Tipikor Bandung saat sidang putusan berlangsung.',
    imageCredit: 'Liputan Biro Daerah Jawa Barat',
    authorId: 'user-redaksi-2',
    authorName: 'Siti Rahmawati, S.H.',
    authorRole: 'REDAKSI',
    editorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    createdAt: '2026-10-12T15:00:00Z',
    updatedAt: '2026-10-12T16:30:00Z',
    publishedAt: '2026-10-12T16:30:00Z',
    status: 'published',
    viewsCount: 1650,
    readTimeMinutes: 3,
  },
  {
    id: 'art-007',
    title: 'Urgensi Reformasi Hukum Acara Pidana: Menegakkan Due Process of Law di Era Digital',
    slug: 'urgensi-reformasi-hukum-acara-pidana-due-process-of-law-2026',
    summary: 'KUHAP yang berlaku sejak 1981 memerlukan pembaharuan mendasar untuk mengakomodasi bukti digital, penyadapan berstandar izin hakim, dan penguatan lembaga praperadilan.',
    content: `
      <p class="mb-4">Kitab Undang-Undang Hukum Acara Pidana (KUHAP) warisan tahun 1981 merupakan mahakarya sejarah hukum nasional yang kala itu menjunjung tinggi hak asasi tersangka. Namun setelah lebih dari empat dekade, lansekap kejahatan dan alat bukti telah bergeser radikal menuju ranah digital.</p>

      <p class="mb-4">Dalam perkara modern, jejak digital forensic, transaksi kripto, dan komunikasi terenkripsi sering kali menjadi inti pembuktian. Ketidakjelasan standar penyitaan data awan (<em>cloud storage</em>) dalam KUHAP acap kali memicu silang sengketa yuridis di ruang sidang praperadilan.</p>

      <p class="mb-4">Pembaharuan RUU KUHAP mendesak untuk disahkan oleh DPR dan Pemerintah dengan mengintegrasikan konsep <em>judicial scrutiny</em>: setiap tindakan penegak hukum yang berpotensi membatasi hak asasi warga negara (seperti penggeledahan digital dan penahanan) harus melalui pengawasan hakim komisaris yang independen.</p>
    `,
    categoryId: 'cat-opini',
    categoryName: 'Opini',
    tags: ['Opini Hukum', 'KUHAP', 'Due Process of Law', 'Hak Asasi', 'Digital Forensic'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Pusat' },
    coverImage: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Telaah kritis atas kitab hukum dan dinamika yurisprudensi peradilan Indonesia.',
    imageCredit: 'WARTA HUKUM Dokumentasi',
    authorId: 'user-admin-1',
    authorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    authorRole: 'ADMIN',
    editorName: 'Hendra Gunawan',
    createdAt: '2026-10-12T08:00:00Z',
    updatedAt: '2026-10-12T09:00:00Z',
    publishedAt: '2026-10-12T09:00:00Z',
    status: 'published',
    isOpinion: true,
    opinionAuthorBio: 'Dr. Hendra Gunawan, S.H., M.H. adalah Dosen Hukum Acara Pidana dan Pemimpin Redaksi WARTA HUKUM.',
    viewsCount: 3100,
    readTimeMinutes: 5,
  },
  {
    id: 'art-008',
    title: 'Investigasi Khusus: Jalur Gelap Tambang Ilegal di Kawasan Hutan Lindung Sumatera Utara',
    slug: 'investigasi-jalur-gelap-tambang-ilegal-hutan-lindung-sumut',
    summary: 'Penelusuran tim investigasi WARTA HUKUM menemukan ratusan alat berat beroperasi tanpa IUP resmi di zona konservasi, diduga melibatkan oknum lintas instansi.',
    content: `
      <p class="mb-4"><strong>MEDAN</strong> — Di balik lebatnya vegetasi hutan lindung di kawasan pegunungan Sumatera Utara, suara deru mesin ekskavator memecah keheningan rimba sejak fajar menyingsing. Selama dua pekan, tim investigasi WARTA HUKUM menelusuri rantai pasok dan modus operandi penambangan galian C dan mineral ilegal tanpa Izin Usaha Pertambangan (IUP).</p>

      <p class="mb-4">Modus yang digunakan adalah manipulasi surat jalan angkut komoditas dengan mencatut izin operasional perusahaan lain yang telah mati izinnya. Truk-truk bertonase berat bebas melintasi pos retribusi jalan kabupaten tanpa penindakan tegas.</p>

      <p class="mb-4">Kerusakan hidrologis telah memicu ancaman longsor bagi empat desa di hilir sungai. Dinas Lingkungan Hidup dan Kehutanan bersama Balai Gakkum KLHK menyatakan telah mengidentifikasi titik koordinat dan segera melancarkan operasi penegakan hukum terpadu bersama aparat penegak hukum.</p>
    `,
    categoryId: 'cat-investigasi',
    categoryName: 'Investigasi',
    tags: ['Investigasi', 'Tambang Ilegal', 'Sumatera Utara', 'Hutan Lindung', 'Gakkum'],
    location: { province: 'Sumatera Utara', city: 'Medan' },
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    caption: 'Jejak eksploitasi lahan di kawasan penyangga hutan lindung yang didokumentasikan tim investigasi.',
    imageCredit: 'Tim Investigasi WARTA HUKUM',
    authorId: 'user-admin-1',
    authorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    authorRole: 'ADMIN',
    editorName: 'Hendra Gunawan',
    createdAt: '2026-10-11T13:00:00Z',
    updatedAt: '2026-10-11T14:30:00Z',
    publishedAt: '2026-10-11T14:30:00Z',
    status: 'published',
    isFeatured: true,
    viewsCount: 5210,
    readTimeMinutes: 5,
  },
  {
    id: 'art-009',
    title: 'Polda Bali Gagalkan Penyelundupan Satwa Dilindungi Melalui Pelabuhan Gilimanuk Menuju Jawa',
    slug: 'polda-bali-gagalkan-penyelundupan-satwa-dilindungi-gilimanuk',
    summary: 'Petugas gabungan menyita puluhan ekor burung langka dan penyu hijau yang disembunyikan dalam bus antarkota tanpa dokumen karantina.',
    content: `
      <p class="mb-4"><strong>JEMBRANA</strong> — Personel Polsek Kawasan Pelabuhan Gilimanuk bersama Direktorat Polairud Polda Bali menggagalkan upaya penyelundupan puluhan ekor satwa langka dilindungi undang-undang yang hendak diseberangkan menuju Pulau Jawa.</p>

      <p class="mb-4">Saat penggeledahan bagasi kendaraan bus malam, petugas mendapati boks kardus berisi burung kakaktua jambul kuning dan beberapa keranjang penyu hijau dalam kondisi lemas.</p>

      <p class="mb-4">Pelaku diduga melanggar Pasal 40 ayat (2) jo Pasal 21 ayat (2) UU No. 5 Tahun 1990 tentang Konservasi Sumber Daya Alam Hayati dan Ekosistemnya, dengan ancaman pidana penjara paling lama 5 tahun dan denda paling banyak Rp 100 juta.</p>
    `,
    categoryId: 'cat-daerah',
    categoryName: 'Daerah',
    tags: ['Bali', 'Gilimanuk', 'Satwa Dilindungi', 'Polri', 'Konservasi'],
    location: { province: 'Bali', city: 'Jembrana' },
    coverImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Kawasan pesisir pelabuhan penyeberangan Gilimanuk saat patroli laut terpadu digelar.',
    imageCredit: 'Humas Polda Bali',
    authorId: 'user-redaksi-1',
    authorName: 'Ahmad Fauzi, S.Pd., S.H.',
    authorRole: 'REDAKSI',
    editorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    createdAt: '2026-10-10T09:00:00Z',
    updatedAt: '2026-10-10T10:15:00Z',
    publishedAt: '2026-10-10T10:15:00Z',
    status: 'published',
    viewsCount: 1420,
    readTimeMinutes: 3,
  },
  {
    id: 'art-010',
    title: 'Draf RUU Perampasan Aset Kembali Masuk Prioritas Prolegnas: Publik Desak Segera Disahkan',
    slug: 'draf-ruu-perampasan-aset-prioritas-prolegnas-2026',
    summary: 'Koalisi Masyarakat Sipil Anti-Korupsi menyuarakan pentingnya instrumen Non-Conviction Based Asset Forfeiture untuk merampas kekayaan haram hasil kejahatan.',
    content: `
      <p class="mb-4"><strong>JAKARTA</strong> — Tekanan publik agar Dewan Perwakilan Rakyat dan Pemerintah segera mengesahkan Rancangan Undang-Undang tentang Perampasan Aset Tindak Pidana kian menguat. RUU ini dinilai sebagai senjata paling ampuh untuk memiskinkan koruptor, bandar narkotika, dan pelaku kejahatan keuangan.</p>

      <p class="mb-4">Konsep <em>Non-Conviction Based</em> (NCB) memungkinkan negara merampas aset yang diduga kuat berasal dari tindak pidana tanpa harus menunggu putusan pemidanaan orangnya, khususnya apabila tersangka melarikan diri, meninggal dunia, atau identitas pemilik aset disamarkan.</p>
    `,
    categoryId: 'cat-politik',
    categoryName: 'Politik',
    tags: ['Prolegnas', 'RUU Perampasan Aset', 'DPR RI', 'Korupsi', 'Reformasi'],
    location: { province: 'DKI Jakarta', city: 'Jakarta Pusat' },
    coverImage: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gedung Parlemen Senayan saat rapat pembahasan agenda legislasi nasional.',
    imageCredit: 'Dokumentasi Warta Hukum',
    authorId: 'user-admin-1',
    authorName: 'Dr. Hendra Gunawan, S.H., M.H.',
    authorRole: 'ADMIN',
    editorName: 'Hendra Gunawan',
    createdAt: '2026-10-09T11:00:00Z',
    updatedAt: '2026-10-09T11:45:00Z',
    publishedAt: '2026-10-09T11:45:00Z',
    status: 'published',
    viewsCount: 2890,
    readTimeMinutes: 4,
  },
  // Contributor drafts / in-review items to showcase editorial workflow
  {
    id: 'art-011',
    title: 'Tinjauan Yuridis Terhadap Penahanan Ijazah oleh Perusahaan Swasta di Wilayah Tangerang',
    slug: 'tinjauan-yuridis-penahanan-ijazah-karyawan-tangerang',
    summary: 'Praktik penahanan ijazah asli oleh pemberi kerja kerap membelenggu pekerja dan berpotensi bertentangan dengan norma hukum ketenagakerjaan dan KUHP.',
    content: `
      <p class="mb-4">Praktik penahanan ijazah asli milik calon pekerja di sejumlah sektor usaha di kawasan industri Tangerang kembali menuai keluhan. Meski sering dicantumkan dalam klausul kontrak kerja, penahanan dokumen pribadi berpotensi melanggar hak asasi bekerja dan dapat dikualifikasikan sebagai penggelapan hak milik apabila pekerja telah menyelesaikan kewajiban kontraknya.</p>
      <p class="mb-4">Disnaker Banten diharapkan memperketat pengawasan dan menerbitkan surat edaran larangan penahanan ijazah secara menyeluruh.</p>
    `,
    categoryId: 'cat-hukum',
    categoryName: 'Hukum',
    tags: ['Ketenagakerjaan', 'Ijazah', 'Hukum Perburuhan', 'Tangerang'],
    location: { province: 'Banten', city: 'Tangerang' },
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Pemberkasan dokumen kontrak kerja ketenagakerjaan.',
    imageCredit: 'Arsip Kontributor',
    authorId: 'user-redaksi-1',
    authorName: 'Ahmad Fauzi, S.Pd., S.H.',
    authorRole: 'REDAKSI',
    createdAt: '2026-10-14T01:00:00Z',
    updatedAt: '2026-10-14T01:30:00Z',
    publishedAt: null,
    status: 'submitted',
    editorNotes: 'Mohon tinjau apakah terdapat preseden putusan pengadilan hubungan industrial (PHI) terlampir.',
    viewsCount: 0,
    readTimeMinutes: 3,
  },
  {
    id: 'art-012',
    title: 'Kasus Sengketa Tanah Ulayat di Minangkabau: Titik Temu Antara Hukum Adat dan Pendaftaran Sertifikat Tanah',
    slug: 'sengketa-tanah-ulayat-hukum-adat-sertifikat',
    summary: 'Analisis mengenai perlindungan hak komunal tanah adat dalam pendaftaran tanah sistematis lengkap (PTSL) di Sumatera Barat.',
    content: `
      <p class="mb-4">Tanah ulayat merupakan harta pusaka tinggi yang dikuasai oleh ninik mamak dan kaum adat secara turun temurun di Minangkabau. Program sertifikasi tanah dari BPN sering menghadapi dinamika karena sertifikat perseorangan dapat berbenturan dengan filosofi kepemilikan komunal.</p>
    `,
    categoryId: 'cat-opini',
    categoryName: 'Opini',
    tags: ['Tanah Adat', 'Minangkabau', 'PTSL', 'Agraria'],
    location: { province: 'Sumatera Barat', city: 'Padang' },
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hamparan perkampungan adat dan lahan pertanian di Sumatera Barat.',
    imageCredit: 'WARTA HUKUM Daerah',
    authorId: 'user-redaksi-1',
    authorName: 'Ahmad Fauzi, S.Pd., S.H.',
    authorRole: 'REDAKSI',
    createdAt: '2026-10-13T08:00:00Z',
    updatedAt: '2026-10-13T09:15:00Z',
    publishedAt: null,
    status: 'needs_revision',
    editorNotes: 'Redaksi: Perjelas rujukan Perda Sumatera Barat tentang Tanah Ulayat dan tambahkan konfirmasi dari pihak Kanreg BPN setempat.',
    rejectionReason: 'Perlu penguatan sumber primer dan rujukan regulasi daerah.',
    viewsCount: 0,
    readTimeMinutes: 4,
  },
];

export const INITIAL_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 'bn-1',
    title: 'Mahkamah Agung Terbitkan Surat Edaran Restorative Justice Perkara Ringan di Seluruh Pengadilan Negeri',
    articleId: 'art-001',
    priority: 'urgent',
    active: true,
    createdAt: '2026-10-14T05:30:00Z',
  },
  {
    id: 'bn-2',
    title: 'Kejaksaan Agung Sita Aset Rp 420 Miliar Terkait Perkara Dugaan Korupsi Tata Niaga Komoditas',
    articleId: 'art-002',
    priority: 'high',
    active: true,
    createdAt: '2026-10-14T04:00:00Z',
  },
  {
    id: 'bn-3',
    title: 'KPK Amankan 5 Terperiksa Termasuk Pejabat Dinas PU dalam OTT di Jawa Timur',
    articleId: 'art-003',
    priority: 'urgent',
    active: true,
    createdAt: '2026-10-14T02:45:00Z',
  },
];

export const INITIAL_AGENDAS: AgendaItem[] = [
  {
    id: 'age-01',
    title: 'Sidang Pembacaan Tuntutan Perkara Tipikor Proyek Fasilitas Pendidikan',
    date: '2026-10-16',
    time: '09:00 WIB',
    location: 'Ruang Sidang Utama Kusumah Atmadja, Pengadilan Tipikor Jakarta Pusat',
    description: 'Jaksa Penuntut Umum Kejaksaan Agung membacakan amar tuntutan pidana terhadap tiga terdakwa kasus dugaan korupsi pengadaan perangkat edukasi.',
    organizer: 'Pengadilan Negeri Jakarta Pusat',
    status: 'upcoming',
    isPublic: true,
    createdBy: 'user-admin-1',
    createdByName: 'Dr. Hendra Gunawan, S.H., M.H.',
  },
  {
    id: 'age-02',
    title: 'Konferensi Pers Capaian Pemulihan Aset Keuangan Negara Triwulan III',
    date: '2026-10-17',
    time: '14:00 WIB',
    location: 'Sasana Pradata Gedung Utama Kejaksaan Agung RI, Kebayoran Baru',
    description: 'Penyampaian data resmi nilai pengembalian kerugian negara dan lelang barang rampasan korupsi.',
    organizer: 'Puspenkum Kejaksaan Agung RI',
    status: 'upcoming',
    isPublic: true,
    createdBy: 'user-admin-1',
    createdByName: 'Dr. Hendra Gunawan, S.H., M.H.',
  },
  {
    id: 'age-03',
    title: 'Seminar Nasional: Perlindungan Hukum Tenaga Pendidik & Implementasi UU Guru',
    date: '2026-10-20',
    time: '08:30 WIB',
    location: 'Auditorium Mochtar Kusumaatmadja, Fakultas Hukum Universitas Padjadjaran, Bandung',
    description: 'Diskusi publik menghadirkan akademisi hukum, perwakilan Kompolnas, dan PGRI membahas mekanisme mediasi edukatif di sekolah.',
    organizer: 'Pusat Studi Kebijakan Hukum Pendidikan & FH Unpad',
    status: 'upcoming',
    isPublic: true,
    createdBy: 'user-redaksi-1',
    createdByName: 'Ahmad Fauzi, S.Pd., S.H.',
  },
  {
    id: 'age-04',
    title: 'Uji Publik Rancangan Peraturan Daerah tentang Bantuan Hukum Warga Kurang Mampu',
    date: '2026-10-22',
    time: '10:00 WIB',
    location: 'Gedung DPRD Provinsi Jawa Barat, Jl. Diponegoro No. 27, Bandung',
    description: 'Penyampaian masukan dari LBH, universitas, dan organisasi kemasyarakatan terkait alokasi anggaran bantuan hukum cuma-cuma (pro bono).',
    organizer: 'Bapemperda DPRD Jawa Barat',
    status: 'upcoming',
    isPublic: true,
    createdBy: 'user-redaksi-2',
    createdByName: 'Siti Rahmawati, S.H.',
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Suasana Ruang Sidang Pengadilan Tinggi Tata Usaha Negara',
    type: 'photo',
    albumName: 'Dokumentasi Persidangan Peradilan',
    mediaUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Majelis hakim memeriksa bukti dokumen dalam sidang sengketa perizinan pertambangan.',
    photographerCredit: 'Foto: Prasetyo Utomo / WARTA HUKUM',
    date: '2026-10-12',
    category: 'Peradilan',
  },
  {
    id: 'gal-02',
    title: 'Konferensi Pers Pengungkapan Sindikat Penipuan Transaksi Keuangan Digital',
    type: 'photo',
    albumName: 'Penegakan Hukum Kepolisian',
    mediaUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Penyidik memperlihatkan barang bukti gadget, kartu akses, dan berkas mutasi rekening perbankan.',
    photographerCredit: 'Foto: Bayu Dewantara / WARTA HUKUM',
    date: '2026-10-11',
    category: 'Kepolisian',
  },
  {
    id: 'gal-03',
    title: 'Pemandangan Gedung Mahkamah Konstitusi Republik Indonesia di Medan Merdeka Barat',
    type: 'photo',
    albumName: 'Lembaga Negara',
    mediaUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gedung Mahkamah Konstitusi saat persidangan pengujian materiil undang-undang digelar terbuka untuk umum.',
    photographerCredit: 'Foto: Humas Mahkamah Konstitusi',
    date: '2026-10-08',
    category: 'Nasional',
  },
  {
    id: 'gal-04',
    title: 'Dokumentasi Khusus: Investigasi Penegakan Hukum Lingkungan di Kawasan Hutan Konservasi',
    type: 'photo',
    albumName: 'Liputan Investigasi Khusus',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    caption: 'Penyidik PNS Gakkum KLHK memasang garis penyegelan di lokasi bukaan lahan tak berizin.',
    photographerCredit: 'Foto: Tim Investigasi WARTA HUKUM',
    date: '2026-10-06',
    category: 'Investigasi',
  },
];

export const INITIAL_STATIC_PAGES: StaticPage[] = [
  {
    id: 'page-pedoman-media-siber',
    slug: 'pedoman-media-siber',
    title: 'Pedoman Pemberitaan Media Siber (Cyber Media Guidelines)',
    subtitle: 'Standar etika jurnalistik digital sesuai Peraturan Dewan Pers Nomor 1/Peraturan-DP/III/2012',
    content: `
      <h3>1. Ruang Lingkup</h3>
      <p>Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers. WARTA HUKUM berkomitmen penuh menjalankan pedoman ini dalam setiap peliputan dan penerbitan berita.</p>

      <h3>2. Verifikasi dan Keberimbangan Berita</h3>
      <p>Pada prinsipnya setiap berita harus melalui verifikasi. Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan (<em>cover both sides</em>).</p>
      <p>Dalam hal berita mengandung dugaan tindak pidana, WARTA HUKUM menegakkan asas praduga tak bersalah (<em>presumption of innocence</em>), tidak menyajikan vonis sepihak, dan wajib mencantumkan status hukum resmi perkara.</p>

      <h3>3. Isi Buatan Pengguna (User Generated Content)</h3>
      <p>Komentar dan opini pembaca wajib mematuhi ketentuan perundang-undangan dan tidak memuat ujaran kebencian, fitnah, diskriminasi SARA, atau konten asusila. Redaksi berhak menyunting atau menghapus materi yang melanggar hukum.</p>

      <h3>4. Ralat, Koreksi, dan Hak Jawab</h3>
      <p>Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers. Koreksi dilakukan dengan menyertakan tautan atau catatan pada berita yang diralat.</p>
    `,
    lastUpdated: '2026-10-01T00:00:00Z',
  },
  {
    id: 'page-hak-jawab',
    slug: 'hak-jawab-dan-koreksi',
    title: 'Kebijakan Hak Jawab dan Koreksi Berita',
    subtitle: 'Mekanisme pengajuan tanggapan, sanggahan, dan perbaikan fakta jurnalistik',
    content: `
      <h3>Ketentuan Hak Jawab</h3>
      <p>Hak Jawab adalah hak seseorang atau sekelompok orang untuk memberikan tanggapan atau sanggahan terhadap pemberitaan berupa fakta yang merugikan nama baiknya. Hak Jawab dilayani secara proporsional dan tidak dipungut biaya apa pun.</p>

      <h3>Tata Cara Pengajuan</h3>
      <p>1. Pengajuan Hak Jawab atau Hak Koreksi dapat dikirimkan secara tertulis melalui surat elektronik resmi redaksi: <strong>redaksi@wartahukum.id</strong> atau <strong>pengaduan@wartahukum.id</strong>.</p>
      <p>2. Cantumkan tautan (URL) berita yang dipersoalkan, paragraf spesifik, serta dokumen atau bukti otentik yang mendukung sanggahan.</p>
      <p>3. Sertakan identitas resmi pemohon (KTP/Paspor atau surat kuasa khusus jika diwakili oleh penasihat hukum).</p>
      <p>4. Redaksi WARTA HUKUM akan memverifikasi dan menindaklanjuti permohonan selambat-lambatnya dalam waktu 2x24 jam kerja sesuai ketentuan Dewan Pers.</p>
    `,
    lastUpdated: '2026-10-01T00:00:00Z',
  },
  {
    id: 'page-redaksi',
    slug: 'susunan-redaksi-manajemen',
    title: 'Dewan Redaksi dan Manajemen Perusahaan',
    subtitle: 'Penanggung jawab hukum, pemimpin redaksi, dan struktur organisasi portal berita',
    content: `
      <h3>Badan Hukum Perusahaan Pers</h3>
      <p>Diterbitkan oleh: <strong>PT WARTA MEDIA HUKUM NUSANTARA</strong><br />
      Surat Keputusan Pengesahan Badan Hukum Kementerian Hukum dan HAM Republik Indonesia.<br />
      NPWP dan Dokumen Perizinan Berusaha Terverifikasi Resmi.</p>

      <h3>Penanggung Jawab & Pemimpin Redaksi</h3>
      <p><strong>Dr. Hendra Gunawan, S.H., M.H.</strong><br />
      (Wartawan Utama & Praktisi Hukum)</p>

      <h3>Dewan Penasihat Hukum & Etika</h3>
      <p>Prof. Dr. Suryadi Wiryadinata, S.H., LL.M.<br />
      Dra. Nurul Hidayati, M.Si.</p>

      <h3>Redaktur Pelaksana & Investigasi</h3>
      <p>M. Rizky Ramadhan, S.Sos.<br />
      Siti Rahmawati, S.H. (Koordinator Liputan Daerah Jawa Barat)</p>

      <h3>Koordinator Bidang Pendidikan & Sosial</h3>
      <p>Ahmad Fauzi, S.Pd., S.H.</p>

      <h3>Alamat Kantor Redaksi</h3>
      <p>Gedung Pers Kebon Sirih Lt. 4, Jl. Kebon Sirih No. 34, Gambir, Jakarta Pusat 10110<br />
      Telepon: +62 21 385 4920 | WhatsApp Redaksi: +62 812 8899 7722<br />
      Surel Resmi: <strong>redaksi@wartahukum.id</strong></p>
    `,
    lastUpdated: '2026-10-01T00:00:00Z',
  },
  {
    id: 'page-kontak-pengaduan',
    slug: 'kontak-dan-pengaduan-pembaca',
    title: 'Kontak Redaksi dan Pengaduan Pembaca',
    subtitle: 'Saluran resmi komunikasi publik, informasi narasumber, dan pengaduan etika',
    content: `
      <p>WARTA HUKUM senantiasa terbuka menerima kritik, saran konstruktif, pengaduan pemberitaan, maupun informasi awal liputan investigasi publik.</p>
      
      <h3>Saluran Kontak Cepat</h3>
      <ul>
        <li><strong>Email Redaksi:</strong> redaksi@wartahukum.id</li>
        <li><strong>Email Pengaduan:</strong> pengaduan@wartahukum.id</li>
        <li><strong>Hotline / WhatsApp Redaksi:</strong> +62 812 8899 7722</li>
        <li><strong>Telepon Kantor:</strong> +62 21 385 4920</li>
      </ul>

      <h3>Perlindungan Kerahasiaan Narasumber</h3>
      <p>Sesuai Pasal 4 ayat (4) Undang-Undang Nomor 40 Tahun 1999 tentang Pers, wartawan mempunyai Hak Tolak untuk melindungi identitas narasumber yang tidak bersedia diketahui identitasnya demi alasan keamanan dan keselamatan diri.</p>
    `,
    lastUpdated: '2026-10-01T00:00:00Z',
  },
  {
    id: 'page-kebijakan-privasi',
    slug: 'kebijakan-privasi',
    title: 'Kebijakan Privasi & Ketentuan Penggunaan',
    subtitle: 'Prinsip perlindungan data pribadi pengunjung dan transparansi pengelolaan informasi',
    content: `
      <h3>1. Data yang Dikumpulkan</h3>
      <p>WARTA HUKUM menghargai privasi setiap pembaca. Kami hanya mencatat informasi teknis non-pribadi (seperti cookies peramban untuk kenyamanan membaca dan pengaturan ukuran font) serta alamat email bagi pembaca yang secara sukarela mendaftar buletin berita harian.</p>

      <h3>2. Penggunaan Data Surel</h3>
      <p>Alamat email yang didaftarkan untuk Newsletter hanya digunakan untuk pengiriman ringkasan berita pilihan dan tidak akan diperjualbelikan kepada pihak ketiga mana pun.</p>

      <h3>3. Hak Cipta Karya Jurnalistik</h3>
      <p>Seluruh materi artikel, foto, grafis, dan video di situs WARTA HUKUM dilindungi undang-undang hak cipta. Pengutipan diperkenankan maksimal 250 karakter dengan wajib mencantumkan kredit dan tautan aktif menuju artikel sumber.</p>
    `,
    lastUpdated: '2026-10-01T00:00:00Z',
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    userId: 'user-admin-1',
    userName: 'Dr. Hendra Gunawan, S.H., M.H.',
    userRole: 'ADMIN',
    action: 'PUBLISH_ARTICLE',
    details: 'Menerbitkan berita utama "Mahkamah Agung Terbitkan Surat Edaran Restorative Justice"',
    timestamp: '2026-10-14T05:30:00Z',
  },
  {
    id: 'act-2',
    userId: 'user-admin-1',
    userName: 'Dr. Hendra Gunawan, S.H., M.H.',
    userRole: 'ADMIN',
    action: 'UPDATE_BREAKING_NEWS',
    details: 'Menambahkan item breaking news penanganan perkara korupsi komoditas Jampidsus',
    timestamp: '2026-10-14T04:05:00Z',
  },
  {
    id: 'act-3',
    userId: 'user-redaksi-1',
    userName: 'Ahmad Fauzi, S.Pd., S.H.',
    userRole: 'REDAKSI',
    action: 'SUBMIT_ARTICLE',
    details: 'Mengajukan draf artikel "Tinjauan Yuridis Terhadap Penahanan Ijazah Karyawan" untuk ditinjau Admin',
    timestamp: '2026-10-14T01:30:00Z',
  },
  {
    id: 'act-4',
    userId: 'user-admin-1',
    userName: 'Dr. Hendra Gunawan, S.H., M.H.',
    userRole: 'ADMIN',
    action: 'SYSTEM_SETTINGS',
    details: 'Memperbarui konfigurasi running ticker teks berita berjalan utama',
    timestamp: '2026-10-13T22:10:00Z',
  },
];
