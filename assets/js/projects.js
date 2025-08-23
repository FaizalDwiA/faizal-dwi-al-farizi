const projectsData = [
  {
    icon: "bi bi-person-bounding-box",
    title: "SiWeb",
    desc: "Aplikasi absensi berbasis web dengan teknologi pengenalan wajah (berkedip) dan deteksi lokasi. Fitur utama meliputi: Absensi, Riwayat Absensi, Pendaftaran, Manajemen Group, Izin Karyawan, Jenis Izin, Hari Libur, Log Aktivitas, Lokasi, Tabulasi, serta Rekap Cuti.",
    link: "javascript:alert('Program ini sudah menjadi milik CV. Rosin')",
    delay: 200,
  },
  {
    icon: "bi bi-book",
    title: "Website Kelas",
    desc: "Website yang saya buat sendiri, berisi waktu sholat, data anggota kelas, Visi misi kampus, website/sosmed kampus, dan data dosen.",
    link: "https://faizaldwia.github.io/sib/pages/waktu_sholat.html",
    delay: 100,
  },
  {
    icon: "bi bi-shield-check",
    title: "Enkripsi Dekripsi Public",
    desc: "Website untuk melakukan enkripsi dan dekripsi teks secara online, memudahkan pengguna dalam mengamankan maupun membaca kembali data yang dienkripsi.",
    link: "https://faizaldwia.github.io/enkripsi-dekripsi",
    delay: 500,
  },
  {
    icon: "bi bi-shop",
    title: "Tayokasi & Pempek Nyah Nur",
    desc: 'Website profil usaha keluarga "Nyah Nur", yang bergerak di bidang kuliner pempek dan tayokasi. ',
    link: "https://faizaldwia.github.io/nyah-nur",
    delay: 200,
  },
  {
    icon: "bi bi-volume-up",
    title: "PlaySF",
    desc: "Website interaktif untuk memutar efek suara (SFX) sesuai tema tertentu, dibuat agar pengguna dapat mengakses dan memainkan SFX dengan mudah.",
    link: "https://faizaldwia.github.io/playsf-player-sfx-website",
    delay: 400,
  },
  {
    icon: "bi bi-chat-left-text",
    title: "CapFabi",
    desc: "Aplikasi Python untuk menghasilkan caption dari Facebook secara otomatis, memudahkan pengguna dalam mengambil atau membuat caption yang relevan.",
    link: "https://github.com/FaizalDwiA/capfabi-caption-fb-python",
    delay: 100,
  },
  {
    icon: "bi bi-terminal",
    title: "ConPyXelin",
    desc: "Program Python untuk mengonversi file Python (.py) menjadi executable (.exe) khusus di Linux, sehingga aplikasi dapat dijalankan tanpa perlu interpreter Python.",
    link: "https://github.com/FaizalDwiA/conpyxelin-convert-python-to-exe-linux",
    delay: 200,
  },
  {
    icon: "bi bi-collection-play",
    title: "TransYou",
    desc: "Program Python untuk mengunduh transkrip dari video YouTube, berguna untuk dokumentasi, riset, atau catatan pembelajaran.",
    link: "https://github.com/FaizalDwiA/transyou-transkrip-youtube-python",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-lock2",
    title: "Gaexhid",
    desc: "Program Python untuk mengganti ekstensi file dan menyembunyikannya (hidden), berguna untuk manajemen file maupun kebutuhan keamanan sederhana.",
    link: "https://github.com/FaizalDwiA/gaexhid-ganti-extension-dan-hidden-python",
    delay: 500,
  },
  {
    icon: "bi bi-terminal-fill",
    title: "ConPyXeWin",
    desc: "Program Python untuk mengonversi file Python (.py) menjadi executable (.exe) di Windows, sehingga aplikasi bisa dijalankan tanpa Python terinstal.",
    link: "https://github.com/FaizalDwiA/conpyxewin-convert-python-to-exe-windows",
    delay: 600,
  },
  {
    icon: "bi bi-download",
    title: "DownVid",
    desc: "Aplikasi Python untuk mengunduh video dari YouTube dengan cepat dan mudah, mendukung berbagai format video.",
    link: "https://github.com/FaizalDwiA/downvid-download-video-python",
    delay: 700,
  },
  {
    icon: "bi bi-book",
    title: "UTS Semester 3",
    desc: "Membuat Website tanpa framework untuk UTS Semester 3.",
    link: "https://faizaldwia.github.io/uts-semester-3/",
    delay: 300,
  },
  {
    icon: "bi bi-bar-chart",
    title: "Website E-Kinerja Karyawan",
    desc: "Berisi pencatatan absensi, jobdesk, perizinan, dan penggajian.",
    link: "https://github.com/FaizalDwiA/E-Kinerja",
    delay: 100,
  },
  {
    icon: "bi bi-qr-code",
    title: "QR Code Python",
    desc: "Program Python untuk membuat QR Code dari teks atau data tertentu. QR Code yang dihasilkan dapat dipindai untuk berbagai kebutuhan, seperti link, kontak, maupun informasi lainnya.",
    link: "https://github.com/FaizalDwiA/qr-code-python",
    delay: 100,
  },
  {
    icon: "bi bi-card-image",
    title: "Text Image Python",
    desc: "Program Python untuk mengonversi gambar menjadi teks (Image to Text) menggunakan teknik OCR, sehingga tulisan pada gambar dapat dibaca dan disalin sebagai teks digital.",
    link: "https://github.com/FaizalDwiA/text-image-python",
    delay: 200,
  },
  {
    icon: "bi bi-shield-lock",
    title: "EnTeks",
    desc: "Program Python untuk enkripsi dan dekripsi teks. Berguna untuk menjaga kerahasiaan data dengan cara mengamankan teks agar hanya bisa dibaca setelah didekripsi.",
    link: "https://github.com/FaizalDwiA/enteks-enkripsi-teks-python",
    delay: 300,
  },
  {
    icon: "bi bi-cloud-download",
    title: "Download Website Python",
    desc: "Program Python untuk mengunduh sebuah website secara penuh, sehingga dapat diakses secara offline atau digunakan untuk arsip.",
    link: "https://github.com/FaizalDwiA/download-website-python",
    delay: 400,
  },
  {
    icon: "bi bi-bug",
    title: "Website Crack Smadav Pro",
    desc: "Sebuah website sederhana yang dibuat untuk kebutuhan eksperimen dalam mempelajari cara kerja aktivasi software, khususnya Smadav Pro. Website ini berfokus pada implementasi antarmuka yang ringan dan mudah diakses.",
    link: "https://faizaldwia.github.io/Smadav-Pro",
    delay: 200,
  },
  {
    icon: "bi bi-palette",
    title: "Colors W3S",
    desc: "Dokumentasi warna berdasarkan referensi dari W3Schools. Website ini menyajikan berbagai kombinasi warna, kode HEX, dan RGB, yang dapat membantu dalam mendesain antarmuka web maupun proyek desain grafis.",
    link: "https://faizaldwia.github.io/colors-w3s",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi VBS",
    desc: "Dokumentasi pribadi mengenai bahasa pemrograman Visual Basic Script (VBS). Berisi kumpulan kode, catatan, dan contoh implementasi dasar untuk mempermudah proses pembelajaran.",
    link: "https://faizaldwia.github.io/vbs",
    delay: 300,
  },
  {
    icon: "bi bi-grid",
    title: "Dokumentasi CSS Flexbox",
    desc: "Dokumentasi hasil pembelajaran CSS Flexbox dari materi UNPAS. Membahas konsep dasar, properti utama, serta contoh implementasi layout responsif menggunakan Flexbox.",
    link: "https://faizaldwia.github.io/css-flexbox-unpas",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi PHP Dasar",
    desc: "Dokumentasi pembelajaran PHP dasar dari materi UNPAS. Berisi catatan sintaks, fungsi, dan contoh program sederhana untuk memahami konsep pemrograman backend dengan PHP.",
    link: "https://faizaldwia.github.io/php-unpas-dasar",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi Laravel",
    desc: "Dokumentasi pembelajaran framework Laravel dari materi UNPAS. Mencakup dasar-dasar penggunaan Laravel, struktur folder, routing, controller, hingga implementasi CRUD sederhana.",
    link: "https://faizaldwia.github.io/laravel-unpas",
    delay: 300,
  },
  {
    icon: "bi bi-git",
    title: "Dokumentasi Git",
    desc: "Dokumentasi penggunaan Git hasil pembelajaran dari materi UNPAS. Berisi catatan perintah Git, alur kerja version control, serta contoh kolaborasi menggunakan GitHub.",
    link: "https://faizaldwia.github.io/git-unpas",
    delay: 300,
  },
  {
    icon: "bi bi-browser-chrome",
    title: "Dokumentasi JavaScript PZN",
    desc: "Dokumentasi hasil pembelajaran JavaScript dari Programming Zaman Now (PZN). Membahas sintaks dasar, DOM manipulation, function, object, hingga konsep modern JavaScript.",
    link: "https://faizaldwia.github.io/javascript-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-database",
    title: "Dokumentasi Database PZN",
    desc: "Dokumentasi pembelajaran Database dari Programming Zaman Now (PZN). Mencakup konsep dasar SQL, manajemen tabel, query, relasi, serta praktik terbaik dalam mengelola database.",
    link: "https://faizaldwia.github.io/database-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi PHP Dasar PZN",
    desc: "Dokumentasi pembelajaran PHP Dasar dari Programming Zaman Now (PZN). Berisi catatan sintaks, tipe data, struktur kontrol, dan contoh kode untuk pemula.",
    link: "https://faizaldwia.github.io/php-dasar-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi PHP OOP PZN",
    desc: "Dokumentasi pembelajaran PHP OOP dari Programming Zaman Now (PZN). Membahas konsep object-oriented programming seperti class, object, inheritance, dan polymorphism.",
    link: "https://faizaldwia.github.io/php-oop-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-git",
    title: "Dokumentasi Git PZN",
    desc: "Dokumentasi pembelajaran Git dari Programming Zaman Now (PZN). Berisi penjelasan alur kerja Git, branching, merging, hingga praktik penggunaan GitHub untuk kolaborasi.",
    link: "https://faizaldwia.github.io/git-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi Python",
    desc: "Dokumentasi pembelajaran Python dari Kelas Terbuka. Berisi catatan sintaks, tipe data, fungsi, modul, hingga implementasi sederhana untuk pemrograman dasar.",
    link: "https://faizaldwia.github.io/python-kelas-terbuka/",
    delay: 300,
  },
  {
    icon: "bi bi-image",
    title: "Dokumentasi Photoshop",
    desc: "Dokumentasi pribadi mengenai penggunaan Adobe Photoshop. Berisi catatan fitur, tool, dan contoh praktik dasar editing gambar serta desain grafis.",
    link: "https://faizaldwia.github.io/photoshop/",
    delay: 300,
  },
  {
    icon: "bi bi-person-circle",
    title: "Website Proklim Purbayan",
    desc: "Website profil sederhana untuk Program Kampung Iklim (Proklim) Purbayan. Website ini berfungsi sebagai media informasi dan publikasi kegiatan lingkungan masyarakat. (Catatan: source code hilang)",
    link: "javascript:alert('Source Code Hilang')",
    delay: 300,
  },
];

const projectsContainer = document.getElementById("service-container");

projectsData.forEach((item) => {
  projectsContainer.innerHTML += `
              <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${item.delay}">
                <div class="service-item">
                  <div class="icon">
                    <i class="${item.icon}"></i>
                  </div>
                  <h3>${item.title}</h3>
                  <p>${item.desc}</p>
                  <div class="card-links">
                    <a href="${item.link}" class="link-item">
                      Learn More
                      <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            `;
});

document.addEventListener("DOMContentLoaded", () => {
  const totalProjects = projectsData.length;
  const projectsCounter = document.getElementById("projectsCounter");

  if (projectsCounter) {
    projectsCounter.setAttribute("data-purecounter-end", totalProjects);
    projectsCounter.textContent = totalProjects;
  }

  document.getElementById("projectsCount").textContent = totalProjects;
});
