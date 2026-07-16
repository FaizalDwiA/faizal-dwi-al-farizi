import { experienceData, educationData, certTags, contactInfo } from './common-data.js';

export const itData = {
  role: "user",
  meta: {
    title: "Faizal Dwi Al Farizi — IT Hardware & Software Specialist",
    description: "Portofolio profesional Faizal Dwi Al Farizi, spesialis dukungan IT Support (troubleshooting, perakitan, servis komputer/laptop) dan Fullstack Web Developer (Laravel, React, CodeIgniter)."
  },
  navLinks: [
    { label: "home", href: "#hero" },
    { label: "tentang", href: "#about" },
    { label: "skills", href: "#skills" },
    { label: "riwayat", href: "#experience" },
    { label: "spesialisasi", href: "#services" },
    { label: "projects", href: "#projects" },
    { label: "sertifikat", href: "#sertifikat" },
    { label: "kontak", href: "#contact" }
  ],
  hero: {
    badge: "IT Hardware & Software Specialist",
    title: ["Faizal Dwi", "Al Farizi"],
    roleCmd: "run service --mode=unified",
    desc: "Saya menyediakan layanan pembuatan website/software (Fullstack Developer) serta dukungan teknis IT, perakitan, troubleshooting hardware komputer, jaringan, dan audit sistem (IT Support). Setiap masalah teknis dijamin selesai tuntas.",
    hud: {
      system: "ONLINE",
      netsec: "✓ SECURE",
      ip: "192.168.1.174",
      solved: "100%"
    },
    terminal: {
      title: "faizal@portfolio ~ profile.json",
      diagnosticScript: "./system_diagnostics.sh --mode=unified",
      diagnosticTitle: "Memulai verifikasi integritas sistem & server local...",
      diagnosticLines: [
        { text: "$ ./system_diagnostics.sh --mode=unified", type: "cmd", delay: 200 },
        { text: "Memulai verifikasi integritas sistem & server local...", type: "info", delay: 600 },
        { text: '[PORT] Memeriksa status server lokal dev... <span class="term-success">[ 1174 ONLINE ]</span>', type: "info", delay: 800 },
        { text: '[FIREBASE] Sinkronisasi database & security rules... <span class="term-success">[ SECURE ]</span>', type: "info", delay: 600 },
        { text: '[COMPILER] Memeriksa dependensi package... <span class="term-success">[ 0 VULNERABILITIES ]</span>', type: "info", delay: 1000 },
        { text: '[CPU] Pemindaian core prosesor PC Developer... <span class="term-success">[ OK ]</span>', type: "info", delay: 600 },
        { text: '[CLEANUP] Pembersihan file temporer & build cache... <span class="term-success">[ DONE ]</span>', type: "info", delay: 900 },
        { text: '<span class="term-success" style="font-weight:bold;">Sistem dan server pengembang 100% optimal! Seluruh tes berhasil dilalui.</span>', type: "success", delay: 800 }
      ],
      profile: {
        comment: "// Faizal Dwi Al Farizi — Unified IT Profile",
        name: "Faizal Dwi Al Farizi",
        roles: ["Fullstack Developer", "IT Support"],
        location: "Sukoharjo, Indonesia",
        skills: {
          software: ["Laravel", "React", "CI", "Python", "MySQL"],
          hardware: ["Repair", "OS Install", "Network", "IT Audit"]
        },
        experience: "5+ years",
        available: true
      }
    }
  },
  about: {
    label: "01 — tentang",
    title: "Siapa Saya?",
    desc: "Spesialis IT Rekayasa Perangkat Lunak dan Dukungan Sistem hardware & software.",
    intro: "Halo! Saya Faizal Dwi Al Farizi, seorang spesialis IT Rekayasa Perangkat Lunak dan Dukungan Sistem berbasis di Sukoharjo, Indonesia. Saya memulai perjalanan di dunia IT sejak 2019 melalui pendidikan Teknik Komputer & Jaringan (SMK TKJ) dan Teknik Rekayasa Perangkat Lunak (D4 RPL). Saya berpengalaman melakukan perbaikan perangkat keras, audit operasional sistem IT di CV. Rosin, hingga membangun berbagai sistem absensi modern dan aplikasi web enterprise.",
    quote: '"Unified IT Hardware & Software Solutions — ada kendala pasti beres dan selesai tuntas."',
    photoInfo: {
      role: "IT HARDWARE/SOFT",
      exp: "5+ YEARS"
    },
    cards: [
      {
        icon: "🖥️",
        title: "Fullstack Web Dev",
        text: "Pembuatan website & aplikasi web responsif menggunakan React, Laravel, CodeIgniter, Python, dan database relasional."
      },
      {
        icon: "🔧",
        title: "IT Hardware & Repair",
        text: "Servis & perakitan PC/Laptop sesuai kebutuhan, pemeliharaan fisik komponen, penggantian sparepart, dan troubleshoot kerusakan."
      },
      {
        icon: "💾",
        title: "OS & System Config",
        text: "Instalasi Windows/Linux, setup driver, konfigurasi BIOS/partisi, serta backup data rutin dan manajemen server lokal."
      },
      {
        icon: "🛡️",
        title: "IT Compliance & Audit",
        text: "Audit operasional IT, monitoring kestabilan sistem, remote desktop helpdesk (AnyDesk/TeamViewer), dan pelatihan pengguna."
      }
    ]
  },
  skills: {
    label: "02 — keahlian",
    title: "Tech Stack & Support Skills",
    desc: "Kombinasi keahlian pemrograman perangkat lunak dan dukungan teknis sistem hardware.",
    categories: [
      {
        icon: "🖥️",
        title: "Software & Web Development",
        items: [
          { name: "PHP / Laravel / CodeIgniter", pct: 85 },
          { name: "JavaScript / React / HTML5 / CSS3", pct: 90 },
          { name: "Python (Scripting & Automation)", pct: 82 },
          { name: "Database (MySQL / PostgreSQL)", pct: 80 },
          { name: "Git & GitHub Version Control", pct: 80 }
        ]
      },
      {
        icon: "🔧",
        title: "IT Support & Hardware Systems",
        items: [
          { name: "Hardware Troubleshooting & Repair", pct: 88 },
          { name: "OS Installation (Windows/Linux) & BIOS", pct: 90 },
          { name: "System Security (Antivirus & Malware Cleanup)", pct: 85 },
          { name: "IT Auditing, Monitoring & Helpdesk", pct: 82 },
          { name: "Basic Networking (LAN, Wi-Fi Setup)", pct: 75 }
        ]
      }
    ]
  },
  services: {
    label: "04 — spesialisasi",
    title: "Spesialisasi & Solusi IT",
    desc: "Solusi dan spesialisasi profesional terpadu yang saya sediakan untuk menunjang operasional digital bisnis Anda.",
    list: [
      {
        type: "IT SOFTWARE",
        typeClass: "text-accent2",
        icon: "bi bi-code-slash",
        iconColor: "var(--accent)",
        name: "Web & App Development",
        desc: "Pembuatan sistem absensi, profil web bisnis, aplikasi e-kinerja, automation script, integrasi API, dan sistem dashboard kustom."
      },
      {
        type: "IT HARDWARE",
        typeClass: "text-accent",
        icon: "bi bi-tools",
        iconColor: "var(--accent2)",
        name: "Servis & Perakitan Komputer",
        desc: "Troubleshooting komponen PC/Laptop, penggantian sparepart (RAM, SSD, dll), pembersihan fisik debu/pasta, dan perakitan PC sesuai budget."
      },
      {
        type: "IT SOFTWARE",
        typeClass: "text-accent",
        icon: "bi bi-window",
        iconColor: "var(--accent)",
        name: "Instalasi & Troubleshooting OS",
        desc: "Instalasi Windows 10/11 atau Linux original, konfigurasi driver perangkat keras, partisi disk, dan pemasangan software produktivitas kerja."
      },
      {
        type: "IT SYSTEMS",
        typeClass: "text-accent2",
        icon: "bi bi-server",
        iconColor: "var(--accent2)",
        name: "Backup Data & Maintenance Server",
        desc: "Setup skema backup data teratur untuk proteksi kehilangan, pemeriksaan rutin kesehatan server (health check), restart aman, dan setup jaringan lokal."
      },
      {
        type: "IT SUPPORT",
        typeClass: "text-accent",
        icon: "bi bi-display",
        iconColor: "var(--accent)",
        name: "Remote Support & Helpdesk",
        desc: "Pemecahan masalah error software secara cepat dan instan dari jarak jauh menggunakan AnyDesk, TeamViewer, atau RustDesk secara aman."
      },
      {
        type: "IT COMPLIANCE",
        typeClass: "text-accent2",
        icon: "bi bi-shield-check",
        iconColor: "var(--accent2)",
        name: "IT Auditing & Pengawasan",
        desc: "Audit kepatuhan sistem operasional IT, analisis risiko keamanan, monitoring server, pelatihan SOP hardware/software bagi karyawan."
      }
    ]
  },
  experience: experienceData,
  education: educationData,
  certTags: certTags,
  contact: contactInfo
};
