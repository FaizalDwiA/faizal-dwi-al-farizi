import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const categoryIconMapSoftware = {
  website: "bi bi-globe",
  python: "bi bi-terminal",
  dokumentasi: "bi bi-file-earmark-code",
  webview: "bi bi-phone"
};

const categoryIconMapAdmin = {
  excel: "bi bi-file-earmark-excel",
  spreadsheet: "bi bi-file-earmark-spreadsheet",
  spreadsheets: "bi bi-file-earmark-spreadsheet",
  admin: "bi bi-person-workspace",
  logistics: "bi bi-box-seam",
  finance: "bi bi-cash-coin"
};

export default function Projects({
  projects = [],
  limit = null,
  showFilters = false,
  showSearch = false,
  showAdminToggle = false,
  adminToggleState = 'admin', // 'admin' | 'software'
  onAdminToggleChange = () => {},
  isGallery = false,
  detailUrlPrefix = '/project',
  role = 'user',
  loading = false
}) {
  const [activeKategori, setActiveKategori] = useState('*');
  const [activeTech, setActiveTech] = useState('*');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <section id="projects" style={{ minHeight: '30vh' }}>
        <div className="section-inner">
          <div className="section-label">05 — projects</div>
          <h2 className="section-title">Selected Work</h2>
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
            🔄 Memuat data projects...
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" style={{ minHeight: '30vh' }}>
        <div className="section-inner">
          <div className="section-label">05 — projects</div>
          <h2 className="section-title">Selected Work</h2>
          
          {/* Admin toggle bar (so they can toggle to software projects even if admin database is empty!) */}
          {showAdminToggle && (
            <div className="filter-bar fade-in visible" id="adminProjFilterBar"
              style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className={`filter-btn ${adminToggleState === 'admin' ? 'active' : ''}`}
                onClick={() => onAdminToggleChange('admin')}
              >
                <span className="filter-icon">📊</span> Admin & Excel
              </button>
              <button 
                className={`filter-btn ${adminToggleState === 'software' ? 'active' : ''}`}
                onClick={() => onAdminToggleChange('software')}
              >
                <span className="filter-icon">💻</span> Software & IT
              </button>
            </div>
          )}

          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace", border: '1px dashed var(--border)', borderRadius: '10px', background: 'rgba(6,9,14,0.3)', margin: '2rem 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', letterSpacing: '0.02em' }}>
              {role === 'admin' 
                ? "Belum ada data project admin yang dimigrasi dari Google Sheets." 
                : "Belum ada data project yang dimigrasi."
              }
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Pre-process raw projects
  const mappedProjects = projects.map(p => {
    const categoryLower = (p.category || '').toLowerCase();
    
    // Choose category for Software
    let kategori = 'website';
    if (categoryLower.includes('python')) kategori = 'python';
    else if (categoryLower.includes('document') || categoryLower.includes('dokumen')) kategori = 'dokumentasi';
    else if (categoryLower.includes('webview')) kategori = 'webview';

    // Choose appropriate icon
    let icon = 'bi bi-grid';
    if (detailUrlPrefix.includes('admin')) {
      icon = 'bi bi-file-earmark-spreadsheet';
      for (const [key, val] of Object.entries(categoryIconMapAdmin)) {
        if (categoryLower.includes(key)) {
          icon = val;
          break;
        }
      }
    } else {
      icon = idIconMap[p.id] || categoryIconMapSoftware[kategori] || 'bi bi-grid';
    }

    const desc = p.overview || '';
    let link = `${detailUrlPrefix}/${p.id}`;
    if (role === 'admin') {
      link += '?role=admin';
    }

    return {
      ...p,
      kategori,
      icon,
      desc,
      link
    };
  });

  // Filter logic
  const filtered = mappedProjects.filter(p => {
    // Search query filter (Gallery Admin)
    if (showSearch && searchQuery) {
      const textToSearch = `${p.title} ${p.desc} ${p.category} ${(p.tech || []).join(' ')}`.toLowerCase();
      return textToSearch.includes(searchQuery);
    }
    
    // Desktop double filters (Gallery IT)
    const matchKategori = activeKategori === '*' || p.kategori === activeKategori;
    const matchTech = activeTech === '*' || (p.tech && p.tech.includes(activeTech));
    return matchKategori && matchTech;
  });

  const displayList = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="projects">
      <div className="section-inner">
        {!isGallery && (
          <>
            <div className="section-label">05 — projects</div>
            <h2 className="section-title">Selected Work</h2>
            <p className="section-desc">Beberapa proyek yang pernah saya kerjakan — dari sistem enterprise hingga tools pribadi.</p>
          </>
        )}

        {/* Admin toggle bar (Homepage admin) */}
        {showAdminToggle && (
          <div className="filter-bar fade-in visible" id="adminProjFilterBar"
            style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className={`filter-btn ${adminToggleState === 'admin' ? 'active' : ''}`}
              onClick={() => onAdminToggleChange('admin')}
            >
              <span className="filter-icon">📊</span> Admin & Excel
            </button>
            <button 
              className={`filter-btn ${adminToggleState === 'software' ? 'active' : ''}`}
              onClick={() => onAdminToggleChange('software')}
            >
              <span className="filter-icon">💻</span> Software & IT
            </button>
          </div>
        )}

        {/* Search Bar (Gallery Admin) */}
        {showSearch && (
          <div className="search-container fade-in visible">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Ketik kata kunci untuk mencari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              autoComplete="off" 
            />
            <span className="search-icon">🔍</span>
          </div>
        )}

        {/* Software Gallery Filters (Gallery IT) */}
        {showFilters && !showSearch && (
          <>
            {/* Category Filter */}
            <div className="filter-bar fade-in visible" id="projFilterBar" style={{ marginBottom: '1.2rem' }}>
              <button className={`filter-btn ${activeKategori === '*' ? 'active' : ''}`} onClick={() => setActiveKategori('*')}>
                <span className="filter-icon">⊞</span> Semua
              </button>
              <button className={`filter-btn ${activeKategori === 'website' ? 'active' : ''}`} onClick={() => setActiveKategori('website')}>
                <span className="filter-icon">🖥️</span> Website
              </button>
              <button className={`filter-btn ${activeKategori === 'python' ? 'active' : ''}`} onClick={() => setActiveKategori('python')}>
                <span className="filter-icon">🐍</span> Python
              </button>
              <button className={`filter-btn ${activeKategori === 'webview' ? 'active' : ''}`} onClick={() => setActiveKategori('webview')}>
                <span className="filter-icon">📱</span> Webview
              </button>
              <button className={`filter-btn ${activeKategori === 'dokumentasi' ? 'active' : ''}`} onClick={() => setActiveKategori('dokumentasi')}>
                <span className="filter-icon">📔</span> Dokumentasi
              </button>
            </div>

            {/* Tech Filter */}
            <div className="filter-bar fade-in visible" id="techFilterBar" style={{ gap: '0.4rem' }}>
              <button className={`filter-btn ${activeTech === '*' ? 'active' : ''}`} onClick={() => setActiveTech('*')}>
                *
              </button>
              {['PHP', 'Laravel', 'CodeIgniter', 'JavaScript', 'React', 'Python', 'MySQL', 'PostgreSQL', 'CSS'].map(t => (
                <button 
                  key={t}
                  className={`filter-btn ${activeTech === t ? 'active' : ''}`}
                  onClick={() => setActiveTech(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Projects Display Count */}
        {isGallery && (
          <div className="proj-count fade-in visible" id="projCount">
            Menampilkan <span>{filtered.length}</span> dari {mappedProjects.length} project
          </div>
        )}

        {/* Projects Grid */}
        <div className="proj-grid" id="proj-grid-container">
          {displayList.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
              🔍 Tidak ada proyek yang cocok dengan filter atau pencarian Anda.
            </div>
          ) : (
            displayList.map((p, i) => {
              const delay = (i % 3) * 80;
              return (
                <div 
                  key={p.id || i}
                  className="proj-card fade-in visible" 
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="proj-type">{p.category || (kategoriLabel[p.kategori] || p.kategori)}</div>
                  <div className="proj-icon-row">
                    <i className={p.icon} style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '0.6rem', display: 'block' }}></i>
                  </div>
                  <div className="proj-name">{p.title}</div>
                  
                  {p.tech && p.tech.length > 0 && (
                    <div className="proj-card-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem', marginBottom: '1rem' }}>
                      {p.tech.map((t, tIdx) => (
                        <span 
                          key={tIdx} 
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: '0.62rem',
                            color: 'var(--accent)',
                            background: 'rgba(0,212,255,0.05)',
                            border: '1px solid rgba(0,212,255,0.15)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '3px'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="proj-desc">{p.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <Link to={p.link} className="proj-btn">
                      Detail Project <span className="arrow">→</span>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* View All Button (Homepage only) */}
        {limit && filtered.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }} className="fade-in visible">
            <Link 
              to={adminToggleState === 'admin' 
                ? (role === 'admin' ? "/projects-admin?role=admin" : "/projects-admin") 
                : (role === 'admin' ? "/projects?role=admin" : "/projects")
              } 
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.8rem 2rem' }}
            >
              ⚡ Lihat Semua Projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
