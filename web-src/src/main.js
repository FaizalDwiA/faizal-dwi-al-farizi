// ── STYLESHEETS ──
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './styles/global.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/projects.css';
import './styles/sertifikat.css';
import './styles/contact.css';
import './styles/modal.css';
import './styles/cursor.css';
import './styles/animations.css';
// import './styles/sectionParticles.css'; // DISABLED: animasi hujan per section (berat)

// ── LOGIC MODULES ──
import { initCursor } from './scripts/cursor.js';
// import { initSectionParticles } from './scripts/sectionParticles.js'; // DISABLED
import { initProjects } from './scripts/projects.js';
import { initSertifikat } from './scripts/sertifikat.js';
import { initWaModal } from './scripts/waModal.js';
import { initAnimations } from './scripts/animations.js';
import { fetchProjects, fetchCertificates, fetchAdminProjects } from './firebase/firestore.js';

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

// Initialize all modules when document is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Set portfolio role based on pathname
  if (window.location.pathname.includes('admin.html')) {
    sessionStorage.setItem('portfolio_role', 'admin');
  } else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    sessionStorage.setItem('portfolio_role', 'user');
  }

  // 1. Initialize cursor tracking and section particles
  initCursor();
  // initSectionParticles(); // DISABLED: animasi hujan per section

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
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi data dari Firebase Firestore... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `;
  document.body.appendChild(globalLoader);

  // Setup static skeleton placeholders inside the grids
  const projGrid = document.getElementById('proj-grid-container');
  if (projGrid) {
    projGrid.innerHTML = Array.from({ length: 3 }).map(() => `
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

  const sertGrid = document.getElementById('sert-grid-container');
  if (sertGrid) {
    sertGrid.innerHTML = Array.from({ length: 4 }).map(() => `
      <div class="skeleton-sert-card sert-card" style="cursor: default;">
        <div class="skeleton-scanner"></div>
        <div class="sert-img-wrap" style="position:relative;">
          <div class="skeleton-shimmer" style="width:100%; height:100%;"></div>
        </div>
        <div class="sert-body">
          <div class="sert-meta">
            <span class="skeleton-line skeleton-shimmer" style="width: 40%; height: 9px; border-radius: 4px; margin-bottom: 0.4rem;"></span>
          </div>
          <div class="sert-title">
            <span class="skeleton-line skeleton-shimmer" style="width: 80%; height: 13px; border-radius: 4px;"></span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Animate the loading terminal steps
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
      line.innerHTML = '<span style="color:#66d9ef">[PARSING]</span> Memetakan objek proyek & sertifikat... <span class="skeleton-terminal-cursor"></span>';
      termBody.appendChild(line);
    }, 600);

    stepTimeout2 = setTimeout(() => {
      const cursors = termBody.querySelectorAll('.skeleton-terminal-cursor');
      cursors.forEach(c => c.remove());
      const line = document.createElement('div');
      line.className = 'skeleton-terminal-line success';
      line.innerHTML = '<span style="color:#a6e22e">[SUCCESS]</span> Sinkronisasi database selesai. Memulai render UI... <span class="skeleton-terminal-cursor"></span>';
      termBody.appendChild(line);
    }, 1100);
  }

  // Fetch projects and certificates from Firebase Firestore
  const role = sessionStorage.getItem('portfolio_role');
  const isAdmin = role === 'admin';

  let projectsList = [];
  let adminProjectsList = [];
  let sertifikatList = [];
  try {
    // Fetch data based on role
    const promises = [
      fetchProjects().catch(err => {
        console.error("Gagal mengambil data Projects:", err);
        return null;
      }),
      fetchCertificates().catch(err => {
        console.error("Gagal mengambil data Sertifikat:", err);
        return null;
      })
    ];

    if (isAdmin) {
      promises.push(
        fetchAdminProjects().catch(err => {
          console.error("Gagal mengambil data Admin Projects:", err);
          return null;
        })
      );
    }

    const results = await Promise.all(promises);
    const projectsRes = results[0];
    const certsRes = results[1];
    const adminProjectsRes = isAdmin ? results[2] : null;

    // Parsing data Projects (Software)
    if (projectsRes && Array.isArray(projectsRes)) {
      projectsList = projectsRes.map(p => {
        const formattedImages = p.images ? p.images.map(img => formatDriveImageUrl(img)) : [];
        return {
          ...p,
          images: formattedImages
        };
      });
    }

    // Parsing data Admin Projects (Excel)
    if (isAdmin && adminProjectsRes && Array.isArray(adminProjectsRes)) {
      adminProjectsList = adminProjectsRes.map(p => {
        const formattedImages = p.images ? p.images.map(img => formatDriveImageUrl(img)) : [];
        return {
          ...p,
          images: formattedImages
        };
      });
    }

    // Parsing data Sertifikat
    if (certsRes && Array.isArray(certsRes)) {
      sertifikatList = certsRes.map(c => ({
        ...c,
        img: formatDriveImageUrl(c.img)
      }));
    }
  } catch (err) {
    console.error("Gagal mengambil data dari Firebase Firestore:", err);
  }

  // Clear simulated timeouts and remove loader
  clearTimeout(stepTimeout1);
  clearTimeout(stepTimeout2);
  globalLoader.classList.add('fade-out');
  setTimeout(() => {
    globalLoader.remove();
  }, 400);

  // 2. Render dynamic contents first (Show maximum 6 projects and 4 certificates on homepage)
  if (isAdmin) {
    const mappedAdminProjects = adminProjectsList.map(p => ({
      ...p,
      link: `project-details-admin.html?id=${p.id}`
    }));
    const mappedSoftwareProjects = projectsList.map(p => ({
      ...p,
      link: `project-details.html?id=${p.id}`
    }));

    const adminFilterBar = document.getElementById('adminProjFilterBar');
    const allProjBtn = document.querySelector('#projects .btn-primary');

    if (adminProjectsList.length === 0) {
      // If excel data is empty, hide filter bar and default to software projects
      if (adminFilterBar) {
        adminFilterBar.style.display = 'none';
      }
      initProjects(mappedSoftwareProjects.slice(0, 6));
      if (allProjBtn) {
        allProjBtn.setAttribute('href', 'projects.html');
      }
    } else {
      // Render admin projects by default
      initProjects(mappedAdminProjects.slice(0, 6));

      // Setup Admin filter bar events
      if (adminFilterBar) {
        adminFilterBar.style.display = 'flex';
        const filterBtns = adminFilterBar.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const source = this.dataset.source;
            if (source === 'admin') {
              initProjects(mappedAdminProjects.slice(0, 6));
            } else {
              initProjects(mappedSoftwareProjects.slice(0, 6));
            }
          });
        });
      }
      if (allProjBtn) {
        allProjBtn.setAttribute('href', 'projects-admin.html');
      }
    }
  } else {
    initProjects(projectsList.slice(0, 6));
  }

  initSertifikat(sertifikatList.slice(0, 4));

  // 3. Setup WhatsApp modal interactions
  initWaModal();

  // 4. Trigger animations and observers (including stats count which reads project/cert data counts)
  if (isAdmin) {
    initAnimations([...adminProjectsList, ...projectsList], sertifikatList);
  } else {
    initAnimations(projectsList, sertifikatList);
  }

  // 5. Fix for initial hash scroll (e.g. reload on #sertifikat) after dynamic content rendering
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 150); // Slight delay to ensure DOM is fully repainted and layout offsets are stable
    }
  }

  // 6. Terminal interactive diagnostic scan simulation
  const runDiagBtn = document.getElementById('runDiagBtn');
  const termContent = document.getElementById('termContent');
  
  if (runDiagBtn && termContent) {
    const originalJSON = termContent.innerHTML;
    let running = false;
    
    runDiagBtn.addEventListener('click', () => {
      if (running) return;
      running = true;
      runDiagBtn.disabled = true;
      runDiagBtn.innerHTML = `<i class="bi bi-hourglass-split"></i> DIAGNOSING...`;
      
      termContent.innerHTML = '';
      
      const role = sessionStorage.getItem('portfolio_role');
      const isAdmin = role === 'admin';

      const lines = isAdmin ? [
        { text: '$ ./excel_and_system_audit.sh --mode=active', type: 'cmd', delay: 200 },
        { text: 'Memulai verifikasi integritas data & kesiapan sistem IT...', type: 'info', delay: 600 },
        { text: '[EXCEL] Memeriksa tautan workbook & data sheet... <span class="term-success">[ OK ]</span>', type: 'info', delay: 800 },
        { text: '[EXCEL] Validasi formula VLOOKUP, INDEX/MATCH, Pivot Table... <span class="term-success">[ VALID ]</span>', type: 'info', delay: 600 },
        { text: '[STOCK] Sinkronisasi data stok fisik vs arsip digital... <span class="term-success">[ 100% MATCH ]</span>', type: 'info', delay: 1000 },
        { text: '[CPU] Pemindaian core prosesor PC Admin... <span class="term-success">[ OK ]</span>', type: 'info', delay: 600 },
        { text: '[PRINTER] Memeriksa koneksi sharing printer & LAN... <span class="term-success">[ ONLINE ]</span>', type: 'info', delay: 900 },
        { text: '[BACKUP] Verifikasi skema backup data arsip otomatis... <span class="term-success">[ SECURE ]</span>', type: 'info', delay: 800 },
        { text: '<span class="term-success" style="font-weight:bold;">Integritas data Excel & sistem IT 100% optimal! Seluruh tes berhasil dilalui.</span>', type: 'success', delay: 800 },
        { text: '<button id="backToProfileBtn" class="terminal-diag-btn" style="margin-top:0.8rem; font-size:0.6rem;"><i class="bi bi-arrow-left"></i> KEMBALI KE PROFIL</button>', type: 'action', delay: 400 }
      ] : [
        { text: '$ ./system_diagnostics.sh --mode=unified', type: 'cmd', delay: 200 },
        { text: 'Memulai verifikasi integritas sistem & server local...', type: 'info', delay: 600 },
        { text: '[PORT] Memeriksa status server lokal dev... <span class="term-success">[ 1174 ONLINE ]</span>', type: 'info', delay: 800 },
        { text: '[FIREBASE] Sinkronisasi database & security rules... <span class="term-success">[ SECURE ]</span>', type: 'info', delay: 600 },
        { text: '[COMPILER] Memeriksa dependensi package... <span class="term-success">[ 0 VULNERABILITIES ]</span>', type: 'info', delay: 1000 },
        { text: '[CPU] Pemindaian core prosesor PC Developer... <span class="term-success">[ OK ]</span>', type: 'info', delay: 600 },
        { text: '[CLEANUP] Pembersihan file temporer & build cache... <span class="term-success">[ DONE ]</span>', type: 'info', delay: 900 },
        { text: '<span class="term-success" style="font-weight:bold;">Sistem dan server pengembang 100% optimal! Seluruh tes berhasil dilalui.</span>', type: 'success', delay: 800 },
        { text: '<button id="backToProfileBtn" class="terminal-diag-btn" style="margin-top:0.8rem; font-size:0.6rem;"><i class="bi bi-arrow-left"></i> KEMBALI KE PROFIL</button>', type: 'action', delay: 400 }
      ];
      
      let index = 0;
      
      function printNextLine() {
        if (index >= lines.length) {
          const backBtn = document.getElementById('backToProfileBtn');
          if (backBtn) {
            backBtn.addEventListener('click', () => {
              termContent.innerHTML = originalJSON;
              runDiagBtn.disabled = false;
              runDiagBtn.innerHTML = `<i class="bi bi-cpu"></i> RUN DIAGNOSTICS`;
              running = false;
            });
          }
          return;
        }
        
        const line = lines[index];
        const lineEl = document.createElement('div');
        
        if (line.type === 'cmd') {
          lineEl.style.color = '#fff';
          lineEl.style.fontWeight = 'bold';
        } else if (line.type === 'success') {
          lineEl.style.marginTop = '0.5rem';
        }
        
        lineEl.innerHTML = line.text;
        termContent.appendChild(lineEl);
        
        const termBody = document.getElementById('termBody');
        if (termBody) {
          termBody.scrollTop = termBody.scrollHeight;
        }
        
        index++;
        setTimeout(printNextLine, line.delay);
      }
      
      printNextLine();
    });
  }
});
