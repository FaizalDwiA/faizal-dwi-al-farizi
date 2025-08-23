// Data sertifikat (bisa kamu tambah sesuai kebutuhan)
const sertifikatData = [
  // === Sertifikat WMK ===
  {
    kategori: "wmk",
    meta: "WMK",
    title: "Peserta Seminar Akselerasi Digital Tahun 2023",
    img: "assets/img/sertifikat/WMK/2023_WMK_Peserta Seminar Akselerasi Digital Tahun 2023.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Seminar yang membekali peserta dengan wawasan digitalisasi bisnis, strategi akselerasi usaha, dan pemanfaatan teknologi di era ekonomi digital.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "wmk",
    meta: "WMK",
    title: "Pitching Wirausaha Merdeka UMS Angkatan II",
    img: "assets/img/sertifikat/WMK/2023_WMK_Pitching Wirausaha Merdeka UMS Angkatan II.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Kegiatan pitching ide bisnis kreatif di Universitas Muhammadiyah Surakarta, sebagai bagian dari program Wirausaha Merdeka untuk mengasah inovasi dan keterampilan presentasi.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "wmk",
    meta: "WMK",
    title: "Surat Pencatatan Hak Cipta Afarma Aromatics",
    img: "assets/img/sertifikat/WMK/2024_WMK_Surat Pencatatan Hak Cipta Afarma Aromatics.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Dokumen resmi pencatatan hak cipta karya inovasi “Afarma Aromatics”, sebagai bentuk perlindungan kekayaan intelektual dalam bidang kewirausahaan.",
    // link: "portfolio-details.html",
  },
  // === End Sertifikat WMK ===

  // === Sertifikat FreeCodeCamp ===
  {
    kategori: "freecodecamp",
    meta: "Free Code Camp",
    title: "Responsive Web Design",
    img: "assets/img/sertifikat/freecodecamp/Responsive Web Design.png",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Kursus intensif yang berfokus pada pembuatan website responsif dengan HTML, CSS, Flexbox, Grid, dan prinsip desain modern. Sertifikat ini menandakan penyelesaian lebih dari 300 jam latihan coding beserta project nyata.",
    // link: "portfolio-details.html",
  },
  // === End Sertifikat FreeCodeCamp ===

  // === Sertifikat Sololearn ===
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Coding for Data_certificate",
    img: "assets/img/sertifikat/solo learn/Coding for Data_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Pengenalan dasar coding dengan fokus pada data, melatih logika pemrograman dan pemrosesan data sederhana.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Coding Foundations_certificate",
    img: "assets/img/sertifikat/solo learn/Coding Foundations_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Fondasi utama pemrograman: variabel, tipe data, logika, dan struktur dasar coding untuk semua bahasa.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "HTML_certificate",
    img: "assets/img/sertifikat/solo learn/HTML_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Belajar dasar-dasar HTML untuk membuat struktur halaman web yang semantik dan rapi.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Introduction to CSS_certificate",
    img: "assets/img/sertifikat/solo learn/Introduction to CSS_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Memahami dasar CSS untuk mempercantik tampilan web dengan style, warna, dan layout.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Introduction to HTML_certificate",
    img: "assets/img/sertifikat/solo learn/Introduction to HTML_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Kursus pengantar yang lebih ringkas, membahas elemen-elemen HTML dasar untuk pemula.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Introduction to JavaScript_certificate",
    img: "assets/img/sertifikat/solo learn/Introduction to JavaScript_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Belajar dasar JavaScript untuk membuat website lebih interaktif dengan event dan fungsi sederhana.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Introduction to Python_certificate",
    img: "assets/img/sertifikat/solo learn/Introduction to Python_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Pengenalan bahasa Python: sintaks dasar, variabel, kondisi, dan pengenalan ke pemrograman modern.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "JavaScript Intermediate_certificate",
    img: "assets/img/sertifikat/solo learn/JavaScript Intermediate_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Level menengah JavaScript: array, object, function lanjutan, dan konsep DOM manipulation.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "PHP_certificate",
    img: "assets/img/sertifikat/solo learn/PHP_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Dasar-dasar pemrograman PHP untuk backend development, termasuk variabel, kontrol alur, dan form handling.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Responsive-Web-Design_certificate",
    img: "assets/img/sertifikat/solo learn/Responsive-Web-Design_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Belajar teknik membuat website yang responsif dengan CSS Flexbox, Grid, dan media queries.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "SQL Intermediate _certificate",
    img: "assets/img/sertifikat/solo learn/SQL Intermediate _certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Level menengah SQL: query lanjutan, pengelolaan data, serta teknik join dan relasi antar tabel.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Web Development_certificate",
    img: "assets/img/sertifikat/solo learn/Web Development_certificate.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Kursus lengkap yang menggabungkan HTML, CSS, dan JavaScript untuk membangun website modern.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "Generative AI in Practice",
    img: "assets/img/sertifikat/solo learn/Generative AI in Practice_certificate.jpg",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Belajar dasar-dasar penerapan Generative AI dalam berbagai konteks praktis, termasuk pembuatan konten dan pemanfaatan model AI modern.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "ML for beginners",
    img: "assets/img/sertifikat/solo learn/ML for beginners.jpg",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Pengenalan konsep dasar Machine Learning untuk pemula: supervised, unsupervised learning, serta algoritma dasar.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "solo-learn",
    meta: "SOLO LEARN",
    title: "SEO with AI",
    img: "assets/img/sertifikat/solo learn/SEO with AI.jpg",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Mempelajari cara mengoptimalkan Search Engine Optimization (SEO) dengan bantuan AI untuk meningkatkan visibilitas website.",
    // link: "portfolio-details.html",
  },
  // === End Sertifikat Sololearn ===

  // === Sertifikat Eksternal ===
  {
    kategori: "eksternal",
    meta: "EKSTERNAL",
    title:
      "Peran Artificial Intelligence Untuk Perlindungan Privasi dan Keamanan Data",
    img: "assets/img/sertifikat/eksternal/2022_Peran Artificial Intelligence Untuk Perlindungan Privasi dan Keamanan Data.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Seminar yang membahas bagaimana kecerdasan buatan (AI) dapat dimanfaatkan untuk menjaga privasi serta meningkatkan keamanan data di era digital.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "eksternal",
    meta: "EKSTERNAL",
    title: "Webinar Nasional Artificial Intelligence",
    img: "assets/img/sertifikat/eksternal/2024_Webinar Nasional Artificial Intelligence.webp",
    gallery: "portfolio-gallery-ui",
    desc: "Pelatihan desain aplikasi mobile dengan pendekatan UI/UX.",
    // link: "portfolio-details.html",
  },
  // === End Sertifikat Eksternal ===

  // === Sertifikat Indonusa ===
  {
    kategori: "indonusa",
    meta: "INDONUSA",
    title: "PPKMB Usaha Untuk Maju Bangga Jadi Indonusa",
    img: "assets/img/sertifikat/indonusa/2021_PKKMB_Usaha Untuk Maju Bangga Jadi Indonusa.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Kegiatan pengenalan kehidupan kampus bagi mahasiswa baru yang menumbuhkan rasa bangga terhadap almamater, semangat berprestasi, serta motivasi untuk maju bersama Universitas Dian Nuswantoro.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "indonusa",
    meta: "INDONUSA",
    title: "WEBINAR DIES NATALIS KE-19",
    img: "assets/img/sertifikat/indonusa/2021_WEBINAR DIES NATALIS KE-19.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Webinar peringatan Dies Natalis ke-19 yang menghadirkan narasumber inspiratif untuk membahas perjalanan, pencapaian, dan visi ke depan dalam membangun generasi unggul.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "indonusa",
    meta: "INDONUSA",
    title: "Bijak Menggunakan Mobile Applications Dalam Menghadapi Badai Hoax",
    img: "assets/img/sertifikat/indonusa/2022_Bijak Menggunakan Mobile Applications Dalam Menghadapi Badai Hoax.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Seminar edukatif tentang literasi digital, memberikan wawasan bagaimana menggunakan aplikasi mobile secara bijak untuk menangkal penyebaran hoax di era informasi cepat.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "indonusa",
    meta: "INDONUSA",
    title:
      "Smart Collaboration Of Enterpreneurship And Technology for New Normal Era",
    img: "assets/img/sertifikat/indonusa/2022_Smart Collaboration Of Enterpreneurship And Technology for New Normal Era.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Pelatihan kewirausahaan berbasis teknologi, membekali peserta dengan strategi kolaboratif agar tetap produktif dan inovatif dalam menghadapi tantangan era normal baru.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "indonusa",
    meta: "INDONUSA",
    title: "Workshop Program Kreativitas Mahasiswa Tahun",
    img: "assets/img/sertifikat/indonusa/2022_Workshop Program Kreativitas Mahasiswa Tahun.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Workshop pengembangan ide kreatif mahasiswa melalui Program Kreativitas Mahasiswa (PKM), yang mendorong inovasi dan kontribusi nyata bagi masyarakat.",
    // link: "portfolio-details.html",
  },
  {
    kategori: "indonusa",
    meta: "INDONUSA",
    title: "Become A Creative Entrepreneur With Inspiring Digital Inovation",
    img: "assets/img/sertifikat/indonusa/2023_Become A Creative Entrepreneur With Inspiring Digital Inovation.webp",
    gallery: "portfolio-gallery-ui",
    desc: "📌 Webinar motivasi kewirausahaan digital yang mengajarkan pentingnya kreativitas dan inovasi dalam membangun bisnis berbasis teknologi modern.",
    // link: "portfolio-details.html",
  },
  // === End Sertifikat Indonusa ===
];

// Ambil container
const sertifikatContainer = document.getElementById("sertifikat-container");

// Generate item
sertifikatData.forEach((item) => {
  sertifikatContainer.innerHTML += `
            <div class="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item ${item.kategori}">
            <article class="portfolio-entry">
                <figure class="entry-image">
                <img src="${item.img}" class="img-fluid" alt="${item.title}" loading="lazy" />
                <div class="entry-overlay">
                    <div class="overlay-content">
                    <div class="entry-meta">${item.meta}</div>
                    <h3 class="entry-title">${item.title}</h3>
                    <div class="entry-links">
                        <a href="${item.img}" 
                        class="glightbox" 
                        data-gallery="${item.gallery}" 
                        data-glightbox="title: ${item.title}; description: ${item.desc}">
                        <i class="bi bi-arrows-angle-expand"></i>
                        </a>
                        <!--
                        <a href="${item.link}">
                        <i class="bi bi-arrow-right"></i>
                        </a>
                        -->
                    </div>
                    </div>
                </div>
                </figure>
            </article>
            </div>
        `;
});

document.addEventListener("DOMContentLoaded", () => {
  const totalSertifikat = sertifikatData.length;
  const sertifikatCounter = document.getElementById("sertifikatCounter");

  if (sertifikatCounter) {
    sertifikatCounter.setAttribute("data-purecounter-end", totalSertifikat);
    sertifikatCounter.textContent = totalSertifikat;
  }

  document.getElementById("sertifikatCount").textContent = totalSertifikat;
});
