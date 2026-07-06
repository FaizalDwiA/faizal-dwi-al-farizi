// ── STYLESHEETS ──
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './styles/global.css';
import './styles/nav.css';
import './styles/sections.css';
import './styles/projects.css';
import './styles/cursor.css';
import './styles/animations.css';

// ── LOGIC MODULES ──
import { initCursor } from './scripts/cursor.js';
import { initWaModal } from './scripts/waModal.js';
import { initAnimations } from './scripts/animations.js';
import { fetchProjects } from './firebase/firestore.js';

const kategoriLabel = {
  website: 'Website',
  python: 'Python',
  dokumentasi: 'Dokumentasi',
  android: 'Android'
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
  android: "bi bi-phone"
};

document.addEventListener('DOMContentLoaded', async () => {
  initCursor();
  initWaModal();

  // Check role from sessionStorage
  const role = sessionStorage.getItem('portfolio_role');
  if (role === 'admin') {
    // 1. Update logo link
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
      navLogo.setAttribute('href', 'admin.html');
    }

    // 2. Update navbar links
    const navLinks = document.querySelectorAll('#navLinks a');
    navLinks.forEach(link => {
      let href = link.getAttribute('href');
      if (href && href.includes('index.html')) {
        href = href.replace('index.html', 'admin.html');
        link.setAttribute('href', href);
      }
    });

    // 3. Update breadcrumbs
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
      let href = link.getAttribute('href');
      if (href && href.includes('index.html')) {
        href = href.replace('index.html', 'admin.html');
        link.setAttribute('href', href);
      }
    });
  }

  const projGrid = document.getElementById('proj-grid-container');
  const projCountEl = document.getElementById('projCount');
  const searchInput = document.getElementById('projSearchInput');
  const filterButtons = document.querySelectorAll('#projFilterBar .filter-btn');
  const techButtonsContainer = document.getElementById('techButtonsContainer');

  // Helper function to format Google Drive direct links to stable googleusercontent endpoint wrapped in weserv proxy
  function formatDriveImageUrl(url) {
    if (!url) return '';
    if (url.includes('drive.google.com') || url.includes('docs.google.com') || url.includes('googleusercontent.com')) {
      const matchId = url.match(/\/file\/d\/([^\/]+)/) || url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^\/]+)/);
      if (matchId && matchId[1]) {
        return `https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${matchId[1]}`;
      }
    }
    // Check if it's a raw Google Drive ID (alphanumeric, underscores, hyphens, and no dots/slashes)
    if (!url.includes('/') && !url.includes('.') && url.length >= 15 && url.length <= 60) {
      return `https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${url}`;
    }
    return url;
  }

  // Create and inject global screen blurred loader overlay
  const globalLoader = document.createElement('div');
  globalLoader.className = 'global-loader';
  globalLoader.id = 'global-loader';
  globalLoader.innerHTML = `
    <div class="skeleton-terminal" style="width: 520px; max-width: 90vw; margin: 0; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
      <div class="skeleton-terminal-header">
        <div class="skeleton-terminal-title">
          <i class="bi bi-terminal"></i> database_loader.sh — bash
        </div>
        <div class="skeleton-terminal-dots">
          <span class="skeleton-terminal-dot r"></span>
          <span class="skeleton-terminal-dot y"></span>
          <span class="skeleton-terminal-dot g"></span>
        </div>
      </div>
      <div class="skeleton-terminal-body" id="global-term-body">
        <div class="skeleton-terminal-line cmd">> connect --service="firebase"</div>
        <div class="skeleton-terminal-line info"><span style="color:var(--accent)">[CONNECT]</span> Melakukan jabat tangan keamanan...</div>
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi database projects... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `;
  document.body.appendChild(globalLoader);

  // Setup static skeleton placeholders inside the projects grid
  if (projGrid) {
    projGrid.innerHTML = Array.from({ length: 6 }).map(() => `
      <div class="skeleton-card proj-card">
        <div class="skeleton-scanner"></div>
        <div class="proj-type">
          <span class="skeleton-line skeleton-shimmer" style="width: 35%; height: 10px; border-radius: 4px;"></span>
        </div>
        <div class="proj-icon-row" style="margin-bottom:0.6rem;">
          <div class="skeleton-circle skeleton-shimmer" style="width: 28px; height: 28px; border-radius: 50%;"></div>
        </div>
        <div class="proj-name">
          <span class="skeleton-line skeleton-shimmer" style="width: 75%; height: 16px; border-radius: 4px; margin-bottom: 0.5rem;"></span>
        </div>
        <div class="proj-card-tags" style="display:flex; flex-wrap:wrap; gap:0.3rem; margin-top:0.4rem; margin-bottom:1rem;">
          <span class="skeleton-line skeleton-shimmer" style="width: 45px; height: 14px; border-radius: 3px;"></span>
          <span class="skeleton-line skeleton-shimmer" style="width: 60px; height: 14px; border-radius: 3px;"></span>
        </div>
        <div class="proj-desc">
          <span class="skeleton-line skeleton-shimmer" style="width: 100%; height: 11px; border-radius: 4px; margin-bottom: 0.5rem;"></span>
          <span class="skeleton-line skeleton-shimmer" style="width: 50%; height: 11px; border-radius: 4px;"></span>
        </div>
        <div style="margin-top:auto; padding-top:1rem">
          <div class="skeleton-line skeleton-shimmer" style="width: 100%; height: 32px; border-radius: 6px;"></div>
        </div>
      </div>
    `).join('');
  }

  // Animate loading terminal steps
  const termBody = document.getElementById('global-term-body');
  const stepOne = document.getElementById('term-step-1');
  let stepTimeout1, stepTimeout2;

  if (termBody) {
    stepTimeout1 = setTimeout(() => {
      if (stepOne) {
        const cursors = stepOne.querySelectorAll('.skeleton-terminal-cursor');
        cursors.forEach(c => c.remove());
      }
      const line = document.createElement('div');
      line.className = 'skeleton-terminal-line info';
      line.innerHTML = '<span style="color:#66d9ef">[PARSING]</span> Memetakan data & images proyek... <span class="skeleton-terminal-cursor"></span>';
      termBody.appendChild(line);
    }, 600);

    stepTimeout2 = setTimeout(() => {
      const cursors = termBody.querySelectorAll('.skeleton-terminal-cursor');
      cursors.forEach(c => c.remove());
      const line = document.createElement('div');
      line.className = 'skeleton-terminal-line success';
      line.innerHTML = '<span style="color:#a6e22e">[SUCCESS]</span> Sinkronisasi database selesai. Memulai grid UI... <span class="skeleton-terminal-cursor"></span>';
      termBody.appendChild(line);
    }, 1100);
  }

  let projectsList = [];
  try {
    const projectsRes = await fetchProjects();

    if (projectsRes && Array.isArray(projectsRes)) {
      projectsList = projectsRes.map(p => {
        const formattedImages = p.images ? p.images.map(img => formatDriveImageUrl(img)) : [];
        return {
          ...p,
          images: formattedImages
        };
      });
    }
  } catch (err) {
    console.error("Gagal mengambil data Projects:", err);
  }

  // Clear simulated timeouts and remove loader
  clearTimeout(stepTimeout1);
  clearTimeout(stepTimeout2);
  globalLoader.classList.add('fade-out');
  setTimeout(() => {
    globalLoader.remove();
  }, 400);

  if (!projGrid) return;

  if (projectsList.length === 0) {
    projGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Gagal mengambil data projects dari spreadsheet. Silakan refresh halaman.
      </div>
    `;
    if (projCountEl) projCountEl.innerHTML = `Menampilkan <span>0</span> dari 0 project`;
    return;
  }

  // Pre-process
  const mappedProjects = projectsList.map(p => {
    const categoryLower = (p.category || '').toLowerCase();
    let kategori = 'website';
    if (categoryLower.includes('python')) kategori = 'python';
    else if (categoryLower.includes('document') || categoryLower.includes('dokumen')) kategori = 'dokumentasi';
    else if (categoryLower.includes('android')) kategori = 'android';

    const icon = idIconMap[p.id] || categoryIconMap[kategori] || 'bi bi-grid';
    const desc = p.overview || '';
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
  let searchQuery = '';

  function renderProjects() {
    const filtered = mappedProjects.filter(p => {
      const matchKategori = activeKategori === '*' || p.kategori === activeKategori;
      const matchTech = activeTech === '*' || (p.tech && p.tech.includes(activeTech));

      const textToSearch = `${p.title} ${p.desc} ${(p.tech || []).join(' ')}`.toLowerCase();
      const matchSearch = !searchQuery || textToSearch.includes(searchQuery);

      return matchKategori && matchTech && matchSearch;
    });

    if (projCountEl) {
      projCountEl.innerHTML = `Menampilkan <span>${filtered.length}</span> dari ${mappedProjects.length} project`;
    }

    projGrid.innerHTML = '';

    if (filtered.length === 0) {
      projGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
          🔍 Tidak ada proyek yang cocok dengan filter / pencarian Anda.
        </div>
      `;
      return;
    }

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

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }

  // Dynamic Technology Filter generator
  function updateTechFilterBar() {
    // 1. Get all projects belonging to the active category
    const projectsInKategori = mappedProjects.filter(p => activeKategori === '*' || p.kategori === activeKategori);
    
    // 2. Gather unique technologies
    const uniqueTechs = new Set();
    projectsInKategori.forEach(p => {
      if (p.tech && Array.isArray(p.tech)) {
        p.tech.forEach(t => {
          if (t) uniqueTechs.add(t);
        });
      }
    });

    const sortedTechs = Array.from(uniqueTechs).sort();

    // 3. Reset activeTech if it's not present in the new set
    if (activeTech !== '*' && !uniqueTechs.has(activeTech)) {
      activeTech = '*';
    }

    // 4. Render buttons inside container
    if (techButtonsContainer) {
      techButtonsContainer.innerHTML = '';
      
      // Add 'Semua' button
      const allBtn = document.createElement('button');
      allBtn.className = `filter-btn ${activeTech === '*' ? 'active' : ''}`;
      allBtn.style.cssText = "padding:0.3rem 0.75rem;font-size:0.68rem;";
      allBtn.dataset.tech = '*';
      allBtn.textContent = 'Semua';
      allBtn.addEventListener('click', function() {
        techButtonsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeTech = '*';
        renderProjects();
      });
      techButtonsContainer.appendChild(allBtn);

      // Add button for each technology
      sortedTechs.forEach(tech => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${activeTech === tech ? 'active' : ''}`;
        btn.style.cssText = "padding:0.3rem 0.75rem;font-size:0.68rem;";
        btn.dataset.tech = tech;
        btn.textContent = tech;
        btn.addEventListener('click', function() {
          techButtonsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          activeTech = tech;
          renderProjects();
        });
        techButtonsContainer.appendChild(btn);
      });
    }
  }

  // Category Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeKategori = this.dataset.filter;
      
      // Update tech filter options dynamically and re-render
      updateTechFilterBar();
      renderProjects();
    });
  });

  // Initial render and dynamic tech bar load
  updateTechFilterBar();
  renderProjects();

  // Setup animations observer
  initAnimations(projectsList, []);
});
