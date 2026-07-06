const kategoriLabel = {
  website: 'Website',
  python: 'Python',
  dokumentasi: 'Dokumentasi',
  webview: 'Webview'
};

const idIconMap = {
  siWeb: "bi bi-person-bounding-box",
  websiteKelas: "bi bi-book",
  enkripsiDekripsiPublic: "bi bi-shield-check",
  tayokasiNyahNur: "bi bi-shop",
  playSF: "bi bi-volume-up",
  eKinerja: "bi bi-bar-chart",
  utsSemester3: "bi bi-book",
  websiteCrackSmadavPro: "bi bi-bug",
  colorsW3S: "bi bi-palette",
  proklimPurbayan: "bi bi-person-circle",
  capFabi: "bi bi-chat-left-text",
  conPyXelin: "bi bi-terminal",
  transYou: "bi bi-collection-play",
  gaexhid: "bi bi-file-earmark-lock2",
  conPyXeWin: "bi bi-terminal-fill",
  downVid: "bi bi-download",
  qrCodePython: "bi bi-qr-code",
  textImagePython: "bi bi-card-image",
  enTeks: "bi bi-shield-lock",
  downloadWebsitePython: "bi bi-cloud-download",
  dokumentasiVBS: "bi bi-file-earmark-code",
  dokumentasiCSSFlexbox: "bi bi-grid",
  dokumentasiPHPDasar: "bi bi-file-earmark-code",
  dokumentasiLaravel: "bi bi-file-earmark-code",
  dokumentasiGit: "bi bi-git",
  dokumentasiJavaScriptPZN: "bi bi-browser-chrome",
  dokumentasiDatabasePZN: "bi bi-database",
  dokumentasiPHPDasarPZN: "bi bi-file-earmark-code",
  dokumentasiPHPOOPPZN: "bi bi-file-earmark-code",
  dokumentasiGitPZN: "bi bi-git",
  dokumentasiPython: "bi bi-file-earmark-code",
  dokumentasiPhotoshop: "bi bi-image"
};

const categoryIconMap = {
  website: "bi bi-globe",
  python: "bi bi-terminal",
  dokumentasi: "bi bi-file-earmark-code",
  webview: "bi bi-phone"
};

export function initProjects(projectsList) {
  const projGrid = document.getElementById('proj-grid-container');
  const projCountEl = document.getElementById('projCount');
  const filterButtons = document.querySelectorAll('#projFilterBar .filter-btn');
  const techButtons = document.querySelectorAll('#techFilterBar .filter-btn');

  if (!projGrid) return;

  if (!projectsList || projectsList.length === 0) {
    projGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Gagal mengambil data projects dari spreadsheet. Silakan refresh halaman.
      </div>
    `;
    if (projCountEl) {
      projCountEl.innerHTML = `Menampilkan <span>0</span> dari 0 project`;
    }
    return;
  }

  // Pre-process projects list to map fields (desc, kategori, icon, link)
  const mappedProjects = projectsList.map(p => {
    // 1. Map kategori
    const categoryLower = (p.category || '').toLowerCase();
    let kategori = 'website';
    if (categoryLower.includes('python')) kategori = 'python';
    else if (categoryLower.includes('document') || categoryLower.includes('dokumen')) kategori = 'dokumentasi';
    else if (categoryLower.includes('webview')) kategori = 'webview';

    // 2. Map icon
    const icon = idIconMap[p.id] || categoryIconMap[kategori] || 'bi bi-grid';

    // 3. Map desc
    const desc = p.overview || '';

    // 4. Map link
    const link = `project-details.html?id=${p.id}`;

    return {
      ...p,
      kategori,
      icon,
      desc,
      link
    };
  });

  let activeKategori = '*';
  let activeTech = '*';

  function renderProjects() {
    const filtered = mappedProjects.filter(p => {
      const matchKategori = activeKategori === '*' || p.kategori === activeKategori;
      const matchTech = activeTech === '*' || (p.tech && p.tech.includes(activeTech));
      return matchKategori && matchTech;
    });
    
    if (projCountEl) {
      projCountEl.innerHTML = `Menampilkan <span>${filtered.length}</span> dari ${mappedProjects.length} project`;
    }
    projGrid.innerHTML = '';
    
    filtered.forEach((p, i) => {
      const delay = (i % 3) * 80;
      const techBadges = p.tech
        ? `<div class="proj-card-tags" style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem;margin-bottom:1rem;">
             ${p.tech.map(t => `<span style="font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--accent);background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);padding:0.1rem 0.4rem;border-radius:3px;">${t}</span>`).join('')}
           </div>`
        : '';

      projGrid.innerHTML += `
      <div class="proj-card fade-in" style="transition-delay:${delay}ms" data-kategori="${p.kategori}">
        <div class="proj-type">${kategoriLabel[p.kategori] || p.kategori}</div>
        <div class="proj-icon-row">
          <i class="${p.icon}" style="font-size:1.5rem;color:var(--accent);margin-bottom:0.6rem;display:block"></i>
        </div>
        <div class="proj-name">${p.title}</div>
        ${techBadges}
        <div class="proj-desc">${p.desc}</div>
        <div style="margin-top:auto;padding-top:1rem">
          <a href="${p.link}" class="proj-btn">
            Detail Project <span class="arrow">→</span>
          </a>
        </div>
      </div>`;
    });

    // Re-observe/activate fade-in class
    document.querySelectorAll('#proj-grid-container .fade-in').forEach(el => {
      setTimeout(() => el.classList.add('visible'), 10);
    });
  }

  // Category Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeKategori = this.dataset.filter;
      renderProjects();
    });
  });

  // Technology Filter buttons
  techButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      techButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeTech = this.dataset.tech;
      renderProjects();
    });
  });

  // Initial render
  renderProjects();
}

