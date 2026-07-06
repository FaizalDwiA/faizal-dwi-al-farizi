// ── STYLESHEETS ──
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './styles/global.css';
import './styles/nav.css';
import './styles/sections.css';
import './styles/sertifikat.css';
import './styles/projects.css';
import './styles/cursor.css';
import './styles/animations.css';

// ── LOGIC MODULES ──
import { initCursor } from './scripts/cursor.js';
import { initWaModal } from './scripts/waModal.js';
import { initAnimations } from './scripts/animations.js';
import { initSertifikat } from './scripts/sertifikat.js';
import { fetchCertificates } from './firebase/firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
  initCursor();
  initWaModal();

  // Check if user came from IT Support page
  const urlParams = new URLSearchParams(window.location.search);
  const isItSupport = urlParams.get('role') === 'itsupport';

  if (isItSupport) {
    // Override accent color variables to Matrix Green
    document.documentElement.style.setProperty('--accent', '#00ff66');
    document.documentElement.style.setProperty('--accent-rgb', '0, 255, 102');
    document.documentElement.style.setProperty('--glow', '0 0 20px rgba(0, 255, 102, 0.45)');
    document.documentElement.style.setProperty('--glow2', '0 0 30px rgba(0, 255, 102, 0.2)');

    // Update navbar brand logo
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
      navLogo.setAttribute('href', 'index.html');
    }

    // Update navbar links
    const navLinks = document.querySelectorAll('#navLinks a');
    navLinks.forEach(link => {
      let href = link.getAttribute('href');
      if (href) {
        // Replace projects link to services
        if (href.includes('#projects')) {
          href = href.replace('#projects', '#services');
          link.textContent = 'layanan';
        }
        // Keep the role query parameter on internal pages if needed (e.g. to keep the state)
        if (href.includes('certificates.html')) {
          href += href.includes('?') ? '&role=itsupport' : '?role=itsupport';
        }
        link.setAttribute('href', href);
      }
    });

    // Update breadcrumb links
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
      let href = link.getAttribute('href');
      if (href && href.includes('index.html')) {
        link.setAttribute('href', 'index.html');
      }
    });
  }

  const sertGrid = document.getElementById('sert-grid-container');
  const sertCountEl = document.getElementById('sertCount');

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
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi database sertifikat... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `;
  document.body.appendChild(globalLoader);

  // Setup static skeleton placeholders inside the certificates grid
  if (sertGrid) {
    sertGrid.innerHTML = Array.from({ length: 8 }).map(() => `
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
      line.innerHTML = '<span style="color:#66d9ef">[PARSING]</span> Memetakan data & file gambar sertifikat... <span class="skeleton-terminal-cursor"></span>';
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

  let sertifikatList = [];
  try {
    const certsRes = await fetchCertificates();

    if (certsRes && Array.isArray(certsRes)) {
      sertifikatList = certsRes.map(c => ({
        ...c,
        img: formatDriveImageUrl(c.img)
      }));
    }
  } catch (err) {
    console.error("Gagal mengambil data Sertifikat:", err);
  }

  // Clear simulated timeouts and remove loader
  clearTimeout(stepTimeout1);
  clearTimeout(stepTimeout2);
  globalLoader.classList.add('fade-out');
  setTimeout(() => {
    globalLoader.remove();
  }, 400);

  // Render Sertifikat
  initSertifikat(sertifikatList);

  // Setup animations observer
  initAnimations([], sertifikatList);
});
