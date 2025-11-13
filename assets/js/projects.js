const projectsData = [
	{
		icon: "bi bi-person-bounding-box",
		title: "SiWeb",
		kategori: "website",
		desc: "Aplikasi absensi berbasis web dengan teknologi pengenalan wajah (berkedip) dan deteksi lokasi. Fitur utama meliputi: Absensi, Riwayat Absensi, Pendaftaran, Manajemen Group, Izin Karyawan, Jenis Izin, Hari Libur, Log Aktivitas, Lokasi, Tabulasi, serta Rekap Cuti.",
		link: "project-details.html?id=siWeb",
		delay: 200,
	},
	{
		icon: "bi bi-book",
		title: "Website Kelas",
		kategori: "website",
		desc: "Website yang saya buat sendiri, berisi waktu sholat, data anggota kelas, Visi misi kampus, website/sosmed kampus, dan data dosen.",
		link: "project-details.html?id=websiteKelas",
		delay: 100,
	},
	{
		icon: "bi bi-shield-check",
		title: "Enkripsi Dekripsi Public",
		kategori: "website",
		desc: "Website untuk melakukan enkripsi dan dekripsi teks secara online, memudahkan pengguna dalam mengamankan maupun membaca kembali data yang dienkripsi.",
		link: "project-details.html?id=enkripsiDekripsiPublic",
		delay: 500,
	},
	{
		icon: "bi bi-shop",
		title: "Tayokasi & Pempek Nyah Nur",
		kategori: "website",
		desc: 'Website profil usaha keluarga "Nyah Nur", yang bergerak di bidang kuliner pempek dan tayokasi. ',
		link: "project-details.html?id=tayokasiNyahNur",
		delay: 200,
	},
	{
		icon: "bi bi-volume-up",
		title: "PlaySF",
		kategori: "website",
		desc: "Website interaktif untuk memutar efek suara (SFX) sesuai tema tertentu, dibuat agar pengguna dapat mengakses dan memainkan SFX dengan mudah.",
		link: "project-details.html?id=playSF",
		delay: 400,
	},
	{
		icon: "bi bi-chat-left-text",
		title: "CapFabi",
		kategori: "python",
		desc: "Aplikasi Python untuk menghasilkan caption dari Facebook secara otomatis, memudahkan pengguna dalam mengambil atau membuat caption yang relevan.",
		link: "project-details.html?id=capFabi",
		delay: 100,
	},
	{
		icon: "bi bi-terminal",
		title: "ConPyXelin",
		kategori: "python",
		desc: "Program Python untuk mengonversi file Python (.py) menjadi executable (.exe) khusus di Linux, sehingga aplikasi dapat dijalankan tanpa perlu interpreter Python.",
		link: "project-details.html?id=conPyXelin",
		delay: 200,
	},
	{
		icon: "bi bi-collection-play",
		title: "TransYou",
		kategori: "python",
		desc: "Program Python untuk mengunduh transkrip dari video YouTube, berguna untuk dokumentasi, riset, atau catatan pembelajaran.",
		link: "project-details.html?id=transYou",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-lock2",
		title: "Gaexhid",
		kategori: "python",
		desc: "Program Python untuk mengganti ekstensi file dan menyembunyikannya (hidden), berguna untuk manajemen file maupun kebutuhan keamanan sederhana.",
		link: "project-details.html?id=gaexhid",
		delay: 500,
	},
	{
		icon: "bi bi-terminal-fill",
		title: "ConPyXeWin",
		kategori: "python",
		desc: "Program Python untuk mengonversi file Python (.py) menjadi executable (.exe) di Windows, sehingga aplikasi bisa dijalankan tanpa Python terinstal.",
		link: "project-details.html?id=conPyXeWin",
		delay: 600,
	},
	{
		icon: "bi bi-download",
		title: "DownVid",
		kategori: "python",
		desc: "Aplikasi Python untuk mengunduh video dari YouTube dengan cepat dan mudah, mendukung berbagai format video.",
		link: "project-details.html?id=downVid",
		delay: 700,
	},
	{
		icon: "bi bi-book",
		title: "UTS Semester 3",
		kategori: "website",
		desc: "Membuat Website tanpa framework untuk UTS Semester 3.",
		link: "project-details.html?id=utsSemester3",
		delay: 300,
	},
	{
		icon: "bi bi-bar-chart",
		title: "Website E-Kinerja Karyawan",
		kategori: "website",
		desc: "Berisi pencatatan absensi, jobdesk, perizinan, dan penggajian.",
		link: "project-details.html?id=eKinerja",
		delay: 100,
	},
	{
		icon: "bi bi-qr-code",
		title: "QR Code Python",
		kategori: "python",
		desc: "Program Python untuk membuat QR Code dari teks atau data tertentu. QR Code yang dihasilkan dapat dipindai untuk berbagai kebutuhan, seperti link, kontak, maupun informasi lainnya.",
		link: "project-details.html?id=qrCodePython",
		delay: 100,
	},
	{
		icon: "bi bi-card-image",
		title: "Text Image Python",
		kategori: "python",
		desc: "Program Python untuk mengonversi gambar menjadi teks (Image to Text) menggunakan teknik OCR, sehingga tulisan pada gambar dapat dibaca dan disalin sebagai teks digital.",
		link: "project-details.html?id=textImagePython",
		delay: 200,
	},
	{
		icon: "bi bi-shield-lock",
		title: "EnTeks",
		kategori: "python",
		desc: "Program Python untuk enkripsi dan dekripsi teks. Berguna untuk menjaga kerahasiaan data dengan cara mengamankan teks agar hanya bisa dibaca setelah didekripsi.",
		link: "project-details.html?id=enTeks",
		delay: 300,
	},
	{
		icon: "bi bi-cloud-download",
		title: "Download Website Python",
		kategori: "python",
		desc: "Program Python untuk mengunduh sebuah website secara penuh, sehingga dapat diakses secara offline atau digunakan untuk arsip.",
		link: "project-details.html?id=downloadWebsitePython",
		delay: 400,
	},
	{
		icon: "bi bi-bug",
		title: "Website Crack Smadav Pro",
		kategori: "website",
		desc: "Sebuah website sederhana yang dibuat untuk kebutuhan eksperimen dalam mempelajari cara kerja aktivasi software, khususnya Smadav Pro. Website ini berfokus pada implementasi antarmuka yang ringan dan mudah diakses.",
		link: "project-details.html?id=websiteCrackSmadavPro",
		delay: 200,
	},
	{
		icon: "bi bi-palette",
		title: "Colors W3S",
		kategori: "website",
		desc: "Dokumentasi warna berdasarkan referensi dari W3Schools. Website ini menyajikan berbagai kombinasi warna, kode HEX, dan RGB, yang dapat membantu dalam mendesain antarmuka web maupun proyek desain grafis.",
		link: "project-details.html?id=colorsW3S",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-code",
		title: "Dokumentasi VBS",
		kategori: "dokumentasi",
		desc: "Dokumentasi pribadi mengenai bahasa pemrograman Visual Basic Script (VBS). Berisi kumpulan kode, catatan, dan contoh implementasi dasar untuk mempermudah proses pembelajaran.",
		link: "project-details.html?id=dokumentasiVBS",
		delay: 300,
	},
	{
		icon: "bi bi-grid",
		title: "Dokumentasi CSS Flexbox",
		kategori: "dokumentasi",
		desc: "Dokumentasi hasil pembelajaran CSS Flexbox dari materi UNPAS. Membahas konsep dasar, properti utama, serta contoh implementasi layout responsif menggunakan Flexbox.",
		link: "project-details.html?id=dokumentasiCSSFlexbox",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-code",
		title: "Dokumentasi PHP Dasar",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran PHP dasar dari materi UNPAS. Berisi catatan sintaks, fungsi, dan contoh program sederhana untuk memahami konsep pemrograman backend dengan PHP.",
		link: "project-details.html?id=dokumentasiPHPDasar",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-code",
		title: "Dokumentasi Laravel",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran framework Laravel dari materi UNPAS. Mencakup dasar-dasar penggunaan Laravel, struktur folder, routing, controller, hingga implementasi CRUD sederhana.",
		link: "project-details.html?id=dokumentasiLaravel",
		delay: 300,
	},
	{
		icon: "bi bi-git",
		title: "Dokumentasi Git",
		kategori: "dokumentasi",
		desc: "Dokumentasi penggunaan Git hasil pembelajaran dari materi UNPAS. Berisi catatan perintah Git, alur kerja version control, serta contoh kolaborasi menggunakan GitHub.",
		link: "project-details.html?id=dokumentasiGit",
		delay: 300,
	},
	{
		icon: "bi bi-browser-chrome",
		title: "Dokumentasi JavaScript PZN",
		kategori: "dokumentasi",
		desc: "Dokumentasi hasil pembelajaran JavaScript dari Programming Zaman Now (PZN). Membahas sintaks dasar, DOM manipulation, function, object, hingga konsep modern JavaScript.",
		link: "project-details.html?id=dokumentasiJavaScriptPZN",
		delay: 300,
	},
	{
		icon: "bi bi-database",
		title: "Dokumentasi Database PZN",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran Database dari Programming Zaman Now (PZN). Mencakup konsep dasar SQL, manajemen tabel, query, relasi, serta praktik terbaik dalam mengelola database.",
		link: "project-details.html?id=dokumentasiDatabasePZN",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-code",
		title: "Dokumentasi PHP Dasar PZN",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran PHP Dasar dari Programming Zaman Now (PZN). Berisi catatan sintaks, tipe data, struktur kontrol, dan contoh kode untuk pemula.",
		link: "project-details.html?id=dokumentasiPHPDasarPZN",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-code",
		title: "Dokumentasi PHP OOP PZN",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran PHP OOP dari Programming Zaman Now (PZN). Membahas konsep object-oriented programming seperti class, object, inheritance, dan polymorphism.",
		link: "project-details.html?id=dokumentasiPHPOOPPZN",
		delay: 300,
	},
	{
		icon: "bi bi-git",
		title: "Dokumentasi Git PZN",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran Git dari Programming Zaman Now (PZN). Berisi penjelasan alur kerja Git, branching, merging, hingga praktik penggunaan GitHub untuk kolaborasi.",
		link: "project-details.html?id=dokumentasiGitPZN",
		delay: 300,
	},
	{
		icon: "bi bi-file-earmark-code",
		title: "Dokumentasi Python",
		kategori: "dokumentasi",
		desc: "Dokumentasi pembelajaran Python dari Kelas Terbuka. Berisi catatan sintaks, tipe data, fungsi, modul, hingga implementasi sederhana untuk pemrograman dasar.",
		link: "project-details.html?id=dokumentasiPython",
		delay: 300,
	},
	{
		icon: "bi bi-image",
		title: "Dokumentasi Photoshop",
		kategori: "dokumentasi",
		desc: "Dokumentasi pribadi mengenai penggunaan Adobe Photoshop. Berisi catatan fitur, tool, dan contoh praktik dasar editing gambar serta desain grafis.",
		link: "project-details.html?id=dokumentasiPhotoshop",
		delay: 300,
	},
	{
		icon: "bi bi-person-circle",
		title: "Website Proklim Purbayan",
		kategori: "website",
		desc: "Website profil sederhana untuk Program Kampung Iklim (Proklim) Purbayan. Website ini berfungsi sebagai media informasi dan publikasi kegiatan lingkungan masyarakat. (Catatan: source code hilang)",
		link: "project-details.html?id=proklimPurbayan",
		delay: 300,
	},
];

const projectsContainer = document.getElementById("project-container");

projectsData.forEach((item) => {
	projectsContainer.innerHTML += `
              <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${item.kategori}" data-aos-delay="${item.delay}">
                <div class="project-item">
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
