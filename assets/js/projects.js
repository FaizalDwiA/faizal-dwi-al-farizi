const projectsData = [
  {
    icon: "bi bi-book",
    title: "Website Kelas",
    desc: "Website yang saya buat sendiri, berisi waktu sholat, data anggota kelas, Visi misi kampus, website/sosmed kampus, dan data dosen.",
    link: "https://faizaldwia.github.io/sib/pages/waktu_sholat.html",
    delay: 100,
  },
  {
    icon: "bi bi-person-circle",
    title: "Nyah Nur",
    desc: "Website Profile untuk Usaha Ortu.",
    link: "https://faizaldwia.github.io/nyah-nur",
    delay: 200,
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
    icon: "bi bi-bug",
    title: "Website Crack Smadav Pro",
    desc: "Website simple untuk crack smadav pro.",
    link: "https://faizaldwia.github.io/Smadav-Pro",
    delay: 200,
  },
  {
    icon: "bi bi-palette",
    title: "Colors W3S",
    desc: "Dokumentasi Warna W3Schools.",
    link: "https://faizaldwia.github.io/colors-w3s",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi VBS",
    desc: "Dokumentasi VBS.",
    link: "https://faizaldwia.github.io/vbs",
    delay: 300,
  },
  {
    icon: "bi bi-grid",
    title: "Dokumentasi CSS Flexbox",
    desc: "Dokumentasi CSS Flexbox UNPAS.",
    link: "https://faizaldwia.github.io/css-flexbox-unpas",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi PHP Dasar",
    desc: "Dokumentasi PHP Dasar UNPAS.",
    link: "https://faizaldwia.github.io/php-unpas-dasar",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi Laravel",
    desc: "Dokumentasi Laravel UNPAS.",
    link: "https://faizaldwia.github.io/laravel-unpas",
    delay: 300,
  },
  {
    icon: "bi bi-git",
    title: "Dokumentasi Git",
    desc: "Dokumentasi Git UNPAS.",
    link: "https://faizaldwia.github.io/git-unpas",
    delay: 300,
  },
  {
    icon: "bi bi-browser-chrome",
    title: "Dokumentasi JavaScript PZN",
    desc: "Dokumentasi JavaScript Programming Zaman Now.",
    link: "https://faizaldwia.github.io/javascript-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-database",
    title: "Dokumentasi Database PZN",
    desc: "Dokumentasi Database Programming Zaman Now.",
    link: "https://faizaldwia.github.io/database-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi PHP Dasar PZN",
    desc: "Dokumentasi PHP Dasar Programming Zaman Now.",
    link: "https://faizaldwia.github.io/php-dasar-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi PHP OOP PZN",
    desc: "Dokumentasi PHP OOP Programming Zaman Now.",
    link: "https://faizaldwia.github.io/php-oop-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-git",
    title: "Dokumentasi Git PZN",
    desc: "Dokumentasi Git Programming Zaman Now.",
    link: "https://faizaldwia.github.io/git-pzn",
    delay: 300,
  },
  {
    icon: "bi bi-file-earmark-code",
    title: "Dokumentasi Python",
    desc: "Dokumentasi Python Kelas Terbuka.",
    link: "https://faizaldwia.github.io/python-kelas-terbuka/",
    delay: 300,
  },
  {
    icon: "bi bi-image",
    title: "Dokumentasi Photoshop",
    desc: "Dokumentasi Photoshop Pribadi.",
    link: "https://faizaldwia.github.io/photoshop/",
    delay: 300,
  },
  {
    icon: "bi bi-person-circle",
    title: "Website Proklim Purbayan",
    desc: "web profile untuk proklim purbayan.",
    link: "javascript:void(0)",
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
