// ============================================================
// SNIPPET INI MENGGANTIKAN:
//   <script src="assets/js/projects-data.js"></script>
//
// di file index.html dan project-details.html
//
// CARA PAKAI:
// 1. Hapus baris: <script src="assets/js/projects-data.js"></script>
// 2. Ganti APPS_SCRIPT_URL dengan URL deployment kamu
// 3. Paste snippet ini di bagian <head> atau sebelum </body>
// ============================================================

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBoJvyliz4gjjnlJnGhIctKAk9S4K3eezKsPYE7ZLBZgfDYgnpTp_Q5_kGivh7jSQZ/exec";

// Fungsi untuk load data dari Google Sheets via Apps Script
async function loadProjectsData() {
  try {
    const response = await fetch(APPS_SCRIPT_URL);

    if (!response.ok) {
      throw new Error("Gagal fetch data: " + response.status);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    return data;

  } catch (err) {
    console.error("Error loadProjectsData:", err);
    return null;
  }
}


// ============================================================
// CONTOH PENGGUNAAN DI project-details.html
// Ganti bagian initPage() atau fungsi yang load project
// ============================================================

// Sebelum (pakai data statis dari projects-data.js):
// -------------------------------------------------------
// const id = new URLSearchParams(window.location.search).get("project");
// const p  = projectsData[id];
// renderProject(p);

// Sesudah (pakai data dari Google Sheets):
// -------------------------------------------------------
async function initPage() {
  const id   = new URLSearchParams(window.location.search).get("project");
  const data = await loadProjectsData(); // fetch dari Apps Script

  if (!data || !data[id]) {
    document.getElementById("projTitle").textContent = "Project tidak ditemukan";
    return;
  }

  const p = data[id];

  // Isi semua elemen HTML (sama seperti sebelumnya)
  document.getElementById("pageHeroTitle").textContent = p.title;
  document.getElementById("breadcrumbTitle").textContent = p.title;
  document.getElementById("projTitle").textContent = p.title;
  document.getElementById("projCat").textContent = p.category;
  document.getElementById("projDate").textContent = p.date;
  document.getElementById("projClient").textContent = p.client;
  document.getElementById("projOverview").textContent = p.overview;

  // URL link
  const urlEl = document.getElementById("projUrl");
  const urlTextEl = document.getElementById("projUrlText");
  const viewLinkEl = document.getElementById("viewLink");
  if (urlEl) urlEl.href = p.website;
  if (urlTextEl) urlTextEl.textContent = p.website.replace(/^https?:\/\//, "");
  if (viewLinkEl) viewLinkEl.href = p.website;

  // Tech badges
  const techBadgesEl = document.getElementById("techBadges");
  if (techBadgesEl) {
    techBadgesEl.innerHTML = p.tech
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join("");
  }

  // Features grid
  const featuresEl = document.getElementById("featuresGrid");
  if (featuresEl) {
    featuresEl.innerHTML = p.features
      .map(f => `<div class="feature-item">${f}</div>`)
      .join("");
  }

  // Images slider
  const swiperImg = document.getElementById("swiperImg");
  const swiperDots = document.getElementById("swiperDots");
  if (swiperImg && p.images.length > 0) {
    // Setup images array untuk swiper
    window._projectImages = p.images;
    window._currentSlide  = 0;
    swiperImg.src = p.images[0];
    swiperImg.alt = p.title;

    // Dots
    if (swiperDots) {
      swiperDots.innerHTML = p.images
        .map((_, i) =>
          `<button class="swiper-dot ${i === 0 ? "active" : ""}"
            onclick="goToSlide(${i})"></button>`
        )
        .join("");
    }
  }
}

// Panggil saat halaman siap
document.addEventListener("DOMContentLoaded", initPage);
