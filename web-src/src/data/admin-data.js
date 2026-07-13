import { experienceData, educationData, certTagsAdmin, contactInfo } from './common-data.js';

export const adminData = {
  role: "admin",
  meta: {
    title: "Faizal Dwi Al Farizi — Administrasi & IT Support Specialist",
    description: "Portofolio profesional Faizal Dwi Al Farizi, staf administrasi dan inventory (pemula/career switcher) yang memadukan keahlian spreadsheets (Microsoft Excel & Google Sheets) dengan dukungan IT Support."
  },
  navLinks: [
    { label: "home", href: "#hero" },
    { label: "tentang", href: "#about" },
    { label: "skills", href: "#skills" },
    { label: "riwayat", href: "#experience" },
    { label: "layanan", href: "#services" },
    { label: "projects", href: "#projects" },
    { label: "sertifikat", href: "#sertifikat" },
    { label: "kontak", href: "#contact" }
  ],
  hero: {
    badge: "Administrasi, Inventory & IT Support Specialist",
    title: ["Faizal Dwi", "Al Farizi"],
    roleCmd: "run administration --mode=inventory",
    desc: "Staf Administrasi & Inventory pemula (career switcher) yang berdedikasi tinggi. Mengombinasikan keahlian pengolahan data spreadsheets (Microsoft Excel & Google Sheets) dengan pemahaman dasar IT Support untuk efisiensi operasional kantor dan gudang.",
    hud: {
      system: "ONLINE",
      netsec: "✓ SECURE",
      ip: "192.168.1.174",
      solved: "100%"
    },
    terminal: {
      title: "faizal@portfolio ~ profile.json",
      diagnosticScript: "./excel_and_system_audit.sh --mode=active",
      diagnosticTitle: "Memulai verifikasi integritas data & kesiapan sistem IT...",
      diagnosticLines: [
        { text: "$ ./excel_and_system_audit.sh --mode=active", type: "cmd", delay: 200 },
        { text: "Memulai verifikasi integritas data & kesiapan sistem IT...", type: "info", delay: 600 },
        { text: '[EXCEL] Memeriksa tautan workbook & data sheet... <span class="term-success">[ OK ]</span>', type: "info", delay: 800 },
        { text: '[EXCEL] Validasi formula VLOOKUP, INDEX/MATCH, Pivot Table... <span class="term-success">[ VALID ]</span>', type: "info", delay: 600 },
        { text: '[STOCK] Sinkronisasi data stok fisik vs arsip digital... <span class="term-success">[ 100% MATCH ]</span>', type: "info", delay: 1000 },
        { text: '[CPU] Pemindaian core prosesor PC Admin... <span class="term-success">[ OK ]</span>', type: "info", delay: 600 },
        { text: '[PRINTER] Memeriksa koneksi sharing printer & LAN... <span class="term-success">[ ONLINE ]</span>', type: "info", delay: 900 },
        { text: '[BACKUP] Verifikasi skema backup data arsip otomatis... <span class="term-success">[ SECURE ]</span>', type: "info", delay: 800 },
        { text: '<span class="term-success" style="font-weight:bold;">Integritas data Excel & sistem IT 100% optimal! Seluruh tes berhasil dilalui.</span>', type: "success", delay: 800 }
      ],
      profile: {
        comment: "// Faizal Dwi Al Farizi — Administration & IT Profile",
        name: "Faizal Dwi Al Farizi",
        roles: ["Admin Inventory/Gudang", "Data Entry", "IT Support"],
        location: "Sukoharjo, Indonesia",
        skills: {
          spreadsheets: ["Excel", "Google Sheets"],
          it_support: ["PC Troubleshooting", "OS Install", "Printer Sharing", "Data Entry"]
        },
        experience: "Entry Level (Career Switcher)",
        available: true
      }
    }
  },
  about: {
    label: "01 — tentang",
    title: "Siapa Saya?",
    desc: "Staf Administrasi & Inventory pemula dengan pemahaman IT Support dan pengolahan data spreadsheets.",
    intro: "Halo! Saya Faizal Dwi Al Farizi, lulusan Teknik Rekayasa Perangkat Lunak (D4 RPL) dan Teknik Komputer & Jaringan (SMK TKJ). Karena kondisi tertentu, saya memutuskan untuk beralih arah karir (career switcher) menjadi seorang staf Administrasi, Data Entry, atau Admin Gudang/Inventory. Meskipun tergolong pemula di bidang administrasi profesional, saya memiliki modal tekad kuat, kemudahan belajar, serta pemahaman mendalam dalam pengolahan data spreadsheets (Microsoft Excel & Google Sheets) beserta kesiapan menangani infrastruktur IT kantor.",
    quote: '"Akurasi Data & Solusi IT Terpadu — Administrasi Efisien, Inventarisasi Rapi."',
    photoInfo: {
      role: "ADMIN & IT SUPPORT",
      exp: "ENTRY LEVEL"
    },
    cards: [
      {
        icon: "📊",
        title: "Excel & Spreadsheets",
        text: "Pengolahan data cepat, penggunaan formula spreadsheets (VLOOKUP, IF, dll), Pivot Table, chart visual, dan rekapitulasi data harian."
      },
      {
        icon: "📦",
        title: "Admin Gudang & Stok",
        text: "Pencatatan stok masuk dan keluar, stock opname fisik vs digital, pemantauan stok minimum, dan kerapian dokumen inventaris."
      },
      {
        icon: "💻",
        title: "IT Support & Setup",
        text: "Instalasi OS Windows/Linux, setup aplikasi kerja, sharing printer kantor, troubleshooting PC, dan bantuan teknis bagi karyawan."
      },
      {
        icon: "📁",
        title: "Data Entry & Archive",
        text: "Penginputan data transaksi secara berkala dengan presisi tinggi, digitalisasi dokumen, and penataan folder arsip yang rapi."
      }
    ]
  },
  skills: {
    label: "02 — keahlian",
    title: "Admin & IT Support Skills",
    desc: "Kombinasi keahlian pengolahan data spreadsheets dan dukungan teknis perangkat IT.",
    categories: [
      {
        icon: "📊",
        title: "Administration & Excel Skills",
        items: [
          { name: "Microsoft Excel (Formula, Pivot, Chart)", pct: 90 },
          { name: "Google Sheets (Spreadsheets)", pct: 88 },
          { name: "Microsoft Word & PowerPoint", pct: 85 },
          { name: "Data Entry & Clerical Support", pct: 80 },
          { name: "Typing Speed & Accuracy", pct: 80 }
        ]
      },
      {
        icon: "💻",
        title: "IT Support & Inventory Systems",
        items: [
          { name: "Hardware & Software Troubleshooting", pct: 85 },
          { name: "OS Installation & Office App Setup", pct: 90 },
          { name: "Inventory & Stock Monitoring", pct: 80 },
          { name: "Technical Helpdesk & Remote Support", pct: 80 },
          { name: "Basic Networking (LAN, Printer Setup)", pct: 75 }
        ]
      }
    ]
  },
  services: {
    label: "04 — layanan",
    title: "Admin & IT Support Services",
    desc: "Layanan profesional terpadu yang saya tawarkan untuk menunjang kelancaran administrasi dan operasional bisnis Anda.",
    list: [
      {
        type: "ADMINISTRATION",
        typeClass: "text-accent2",
        icon: "bi bi-file-earmark-spreadsheet",
        iconColor: "var(--accent)",
        name: "Excel & Data Entry",
        desc: "Input data operasional harian, perapian database manual, formula kustom Excel/Sheets untuk otomasi hitungan, dan template pelaporan terstruktur."
      },
      {
        type: "INVENTORY",
        typeClass: "text-accent",
        icon: "bi bi-box-seam",
        iconColor: "var(--accent2)",
        name: "Manajemen Stok & Gudang",
        desc: "Pencatatan mutasi barang masuk/keluar, stock opname fisik vs digital, pelabelan barang inventaris, serta pengawasan level stok minimum."
      },
      {
        type: "IT SUPPORT",
        typeClass: "text-accent",
        icon: "bi bi-pc-display",
        iconColor: "var(--accent)",
        name: "Instalasi & Setup Office App",
        desc: "Instalasi OS Windows/Linux, setup Microsoft Office & Google Workspace, serta troubleshoot PC karyawan agar operasional kantor berjalan lancar."
      },
      {
        type: "DIGITAL ARCHIVE",
        typeClass: "text-accent2",
        icon: "bi bi-folder-check",
        iconColor: "var(--accent2)",
        name: "Arsip Digital & Backup Data",
        desc: "Penyusunan sistem folder arsip digital yang rapi, pengelompokan berkas penting kantor, serta skema backup data rutin."
      },
      {
        type: "IT HELPDESK",
        typeClass: "text-accent",
        icon: "bi bi-telephone-inbound",
        iconColor: "var(--accent)",
        name: "Dukungan Teknis & Remote Help",
        desc: "Pecahkan masalah error program kantor dengan cepat dari jarak jauh menggunakan AnyDesk/TeamViewer atau bantuan on-site langsung."
      },
      {
        type: "COMPLIANCE",
        typeClass: "text-accent2",
        icon: "bi bi-check2-square",
        iconColor: "var(--accent2)",
        name: "Administrasi Umum & SOP",
        desc: "Dukungan administrasi harian, pembuatan surat standar, pengarsipan fisik, dan penyusunan SOP penginputan data untuk menghindari kesalahan."
      }
    ]
  },
  experience: experienceData,
  education: educationData,
  certTags: certTagsAdmin,
  contact: contactInfo
};
