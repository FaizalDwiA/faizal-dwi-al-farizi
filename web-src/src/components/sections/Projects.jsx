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

  // Check if a category button should be disabled based on current tech filter
  const isKategoriBtnDisabled = (kategoriVal) => {
    if (kategoriVal === '*') return false;
    return !projects.some(p => {
      const rawKategori = p.category ? p.category.trim() : 'Website';
      const kategori = rawKategori.charAt(0).toUpperCase() + rawKategori.slice(1).toLowerCase();

      const matchKategori = kategori === kategoriVal;
      const matchTech = activeTech === '*' || (p.tech && p.tech.includes(activeTech));
      return matchKategori && matchTech;
    });
  };

  // Check if a tech button should be disabled based on current category filter
  const isTechBtnDisabled = (techVal) => {
    if (techVal === '*') return false;
    return !projects.some(p => {
      const rawKategori = p.category ? p.category.trim() : 'Website';
      const kategori = rawKategori.charAt(0).toUpperCase() + rawKategori.slice(1).toLowerCase();

      const matchKategori = activeKategori === '*' || kategori === activeKategori;
      const matchTech = p.tech && p.tech.includes(techVal);
      return matchKategori && matchTech;
    });
  };

  const resetFilters = () => {
    setActiveKategori('*');
    setActiveTech('*');
  };

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

  // Extract categories dynamically from the data
  const listKategori = [...new Set(projects.map(p => {
    const rawKategori = p.category ? p.category.trim() : 'Website';
    return rawKategori.charAt(0).toUpperCase() + rawKategori.slice(1).toLowerCase();
  }).filter(Boolean))];

  const getCategoryIcon = (cat) => {
    const lower = cat.toLowerCase();
    const icons = {
      website: '🖥️',
      python: '🐍',
      webview: '📱',
      dokumentasi: '📔',
      android: '🤖'
    };
    for (const [key, icon] of Object.entries(icons)) {
      if (lower.includes(key)) return icon;
    }
    return '📁';
  };

  const getCategoryLabel = (cat) => {
    if (cat.toLowerCase() === 'webview') return 'Webview';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Extract technology tags dynamically from all projects
  const uniqueTechs = [...new Set(projects.flatMap(p => p.tech || []).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  // Pre-process raw projects
  const mappedProjects = projects.map(p => {
    const rawKategori = p.category ? p.category.trim() : 'Website';
    const kategori = rawKategori.charAt(0).toUpperCase() + rawKategori.slice(1).toLowerCase();
    const categoryLower = rawKategori.toLowerCase();
    
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
      let matchedIcon = null;
      for (const [key, val] of Object.entries(categoryIconMapSoftware)) {
        if (categoryLower.includes(key)) {
          matchedIcon = val;
          break;
        }
      }
      icon = idIconMap[p.id] || matchedIcon || 'bi bi-grid';
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
          <div id="projFilterBarSection">
            {/* Desktop Filters */}
            <div className="proj-filter-desktop">
              {/* Category Filter */}
              <div className="filter-row" style={{ marginBottom: '1.2rem', width: '100%' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🗂</span> Kategori / Tipe
                </div>
                <div className="filter-bar" style={{ margin: 0 }}>
                  <button className={`filter-btn ${activeKategori === '*' ? 'active' : ''}`} onClick={() => setActiveKategori('*')}>
                    <span className="filter-icon">⊞</span> Semua
                  </button>
                  {listKategori.map(cat => (
                    <button 
                      key={cat}
                      className={`filter-btn ${activeKategori === cat ? 'active' : ''} ${isKategoriBtnDisabled(cat) ? 'disabled' : ''}`} 
                      onClick={() => !isKategoriBtnDisabled(cat) && setActiveKategori(cat)}
                    >
                      <span className="filter-icon">{getCategoryIcon(cat)}</span> {getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Filter */}
              <div className="filter-row" style={{ marginBottom: '0.8rem', width: '100%' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent2)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🔧</span> Teknologi
                </div>
                <div className="filter-bar" style={{ margin: 0, gap: '0.4rem' }}>
                  <button className={`filter-btn ${activeTech === '*' ? 'active' : ''}`} onClick={() => setActiveTech('*')}>
                    * Semua
                  </button>
                  {uniqueTechs.map(t => (
                    <button 
                      key={t}
                      className={`filter-btn ${activeTech === t ? 'active' : ''} ${isTechBtnDisabled(t) ? 'disabled' : ''}`}
                      onClick={() => !isTechBtnDisabled(t) && setActiveTech(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="proj-filter-mobile">
              <div style={{ marginBottom: '0.8rem' }}>
                <label htmlFor="projSelectKategori" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>🗂 Kategori / Tipe</label>
                <select id="projSelectKategori" className="filter-select" value={activeKategori} onChange={(e) => setActiveKategori(e.target.value)}>
                  <option value="*">⊞ Semua Kategori</option>
                  {listKategori.map(cat => (
                    <option key={cat} value={cat} disabled={isKategoriBtnDisabled(cat)}>
                      {getCategoryIcon(cat)} {getCategoryLabel(cat)} {isKategoriBtnDisabled(cat) ? '(Tidak Tersedia)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="projSelectTech" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent2)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>🏢 Teknologi</label>
                <select id="projSelectTech" className="filter-select" value={activeTech} onChange={(e) => setActiveTech(e.target.value)}>
                  <option value="*">⊞ Semua Teknologi</option>
                  {uniqueTechs.map(t => (
                    <option key={t} value={t} disabled={isTechBtnDisabled(t)}>
                      {t} {isTechBtnDisabled(t) ? '(Tidak Tersedia)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
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
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace", border: '1px dashed var(--border)', borderRadius: '10px', background: 'rgba(6,9,14,0.3)', margin: '2rem 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
              <div style={{ fontSize: '0.82rem', marginBottom: '1.5rem', color: 'var(--text-dim)', letterSpacing: '0.02em' }}>
                Tidak ada proyek yang cocok dengan filter atau pencarian Anda.
              </div>
              <button 
                onClick={resetFilters}
                className="filter-btn" 
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)', fontSize: '0.7rem', padding: '0.5rem 1.2rem', cursor: 'pointer', background: 'rgba(0,212,255,0.02)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '6px', fontFamily: "'JetBrains Mono',monospace" }}
              >
                ↺ Reset Semua Filter
              </button>
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
      {/* Inject styling */}
      <style id="proj-responsive-filter-style" dangerouslySetInnerHTML={{ __html: `
        .proj-filter-desktop { display: block; }
        .proj-filter-mobile { display: none; }
        .filter-row { width: 100%; }
        @media (max-width: 768px) {
          .proj-filter-desktop { display: none; }
          .proj-filter-mobile { display: block; margin-bottom: 1.5rem; }
        }
      `}} />
    </section>
  );
}
