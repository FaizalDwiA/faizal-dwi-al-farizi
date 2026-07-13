import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const extractEmojiAndText = (str) => {
  if (!str) return { emoji: '', text: '' };
  const emojiRegex = /^([\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F9FF}\u{FE00}-\u{FE0F}\u{200D}]+)\s*(.*)$/u;
  const match = str.match(emojiRegex);
  if (match) {
    return { emoji: match[1], text: match[2].trim() };
  }
  return { emoji: '', text: str.trim() };
};

const formatCategoryTitle = (metaText) => {
  if (!metaText) return '';
  const cleanText = metaText.trim().replace(/\s+/g, ' ');
  const normalized = cleanText.toLowerCase().replace(/[\s-_]/g, '');
  
  if (normalized === 'freecodecamp') return 'FreeCodeCamp';
  if (normalized === 'sololearn') return 'SoloLearn';
  if (normalized === 'simplilearn') return 'Simplilearn';
  if (cleanText.length <= 3) return cleanText.toUpperCase();
  
  return cleanText
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length <= 3) return word.toUpperCase(); // SMK, WMK
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const predefinedOrderJenis = ['magang', 'sertifikasi', 'penghargaan', 'coding', 'excel', 'pelatihan', 'webinar'];
const getSortIndexJenis = (jenisName) => {
  const lower = jenisName.toLowerCase();
  const idx = predefinedOrderJenis.findIndex(keyword => lower.includes(keyword));
  return idx !== -1 ? idx : 999;
};

const predefinedOrderSumber = ['magang', 'wmk', 'freecodecamp', 'solo learn', 'sololearn', 'simpli learn', 'simplilearn', 'eksternal', 'indonusa', 'smk'];
const getSortIndexSumber = (sumberName) => {
  const lower = sumberName.toLowerCase();
  const idx = predefinedOrderSumber.findIndex(keyword => lower.includes(keyword));
  return idx !== -1 ? idx : 999;
};

export default function Certificates({ certificates = [], limit = null, showFilters = false, role = 'user' }) {
  const [activeJenis, setActiveJenis] = useState('*');
  const [activeSumber, setActiveSumber] = useState('*');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIdx(prev => (prev - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'ArrowRight') {
        setLightboxIdx(prev => (prev + 1) % filtered.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx, certificates]);

  if (!certificates || certificates.length === 0) {
    return (
      <section id="sertifikat" style={{ background: 'var(--bg2)' }}>
        <div className="section-inner">
          <div className="section-label">06 — sertifikat</div>
          <h2 className="section-title">Sertifikat & Pencapaian</h2>
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
            ❌ Memuat data sertifikat...
          </div>
        </div>
      </section>
    );
  }

  // Extract categories dynamically
  const uniqueJenis = [...new Set(certificates.map(s => s.jenis || s.kategori).filter(Boolean))];
  const listJenis = uniqueJenis.map(original => {
    const { emoji, text } = extractEmojiAndText(original);
    return { original, icon: emoji, title: formatCategoryTitle(text) };
  }).sort((a, b) => {
    const idxA = getSortIndexJenis(a.original);
    const idxB = getSortIndexJenis(b.original);
    if (idxA !== idxB) return idxA - idxB;
    return a.original.localeCompare(b.original);
  });

  const uniqueSumber = [...new Set(certificates.map(s => s.meta).filter(Boolean))];
  const listSumber = uniqueSumber.map(original => {
    const { emoji, text } = extractEmojiAndText(original);
    return { original, icon: emoji, title: formatCategoryTitle(text) };
  }).sort((a, b) => {
    const idxA = getSortIndexSumber(a.original);
    const idxB = getSortIndexSumber(b.original);
    if (idxA !== idxB) return idxA - idxB;
    return a.original.localeCompare(b.original);
  });

  // Filter logic
  const filtered = certificates.filter(s => {
    const matchJenis = activeJenis === '*' || (s.jenis || s.kategori) === activeJenis;
    const matchSumber = activeSumber === '*' || s.meta === activeSumber;
    return matchJenis && matchSumber;
  });

  const displayList = limit ? filtered.slice(0, limit) : filtered;

  // Check which buttons should be disabled (would yield 0 results)
  const isJenisBtnDisabled = (jenisVal) => {
    if (jenisVal === '*') return false;
    return !certificates.some(s => (s.jenis || s.kategori) === jenisVal && (activeSumber === '*' || s.meta === activeSumber));
  };

  const isSumberBtnDisabled = (sumberVal) => {
    if (sumberVal === '*') return false;
    return !certificates.some(s => s.meta === sumberVal && (activeJenis === '*' || (s.jenis || s.kategori) === activeJenis));
  };

  const resetFilters = () => {
    setActiveJenis('*');
    setActiveSumber('*');
  };

  const currentLightboxCert = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section id="sertifikat" style={{ background: 'var(--bg2)' }}>
      <div className="section-inner">
        <div className="section-label">06 — sertifikat</div>
        <h2 className="section-title">Sertifikat & Pencapaian</h2>
        <p className="section-desc">Kumpulan sertifikat dari berbagai program, pelatihan, dan pencapaian akademik.</p>

        {showFilters && (
          <div id="sertFilterBar">
            {/* Desktop Filters */}
            <div className="sert-filter-desktop">
              <div className="filter-row" style={{ marginBottom: '1.2rem', width: '100%' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📂</span> Bidang / Jenis
                </div>
                <div className="filter-bar" style={{ margin: 0 }}>
                  <button className={`filter-btn ${activeJenis === '*' ? 'active' : ''}`} onClick={() => setActiveJenis('*')}>
                    <span className="filter-icon">⊞</span> Semua
                  </button>
                  {listJenis.map(item => (
                    <button 
                      key={item.original}
                      className={`filter-btn ${activeJenis === item.original ? 'active' : ''} ${isJenisBtnDisabled(item.original) ? 'disabled' : ''}`}
                      onClick={() => !isJenisBtnDisabled(item.original) && setActiveJenis(item.original)}
                    >
                      {item.icon && <span className="filter-icon">{item.icon}</span>} {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-row" style={{ marginBottom: '0.8rem', width: '100%' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent2)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🏢</span> Penerbit / Sumber
                </div>
                <div className="filter-bar" style={{ margin: 0 }}>
                  <button className={`filter-btn ${activeSumber === '*' ? 'active' : ''}`} onClick={() => setActiveSumber('*')}>
                    <span className="filter-icon">⊞</span> Semua
                  </button>
                  {listSumber.map(item => (
                    <button 
                      key={item.original}
                      className={`filter-btn ${activeSumber === item.original ? 'active' : ''} ${isSumberBtnDisabled(item.original) ? 'disabled' : ''}`}
                      onClick={() => !isSumberBtnDisabled(item.original) && setActiveSumber(item.original)}
                    >
                      {item.icon && <span className="filter-icon">{item.icon}</span>} {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="sert-filter-mobile">
              <div style={{ marginBottom: '0.8rem' }}>
                <label htmlFor="sertSelectJenis" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>📂 Bidang / Jenis</label>
                <select id="sertSelectJenis" className="filter-select" value={activeJenis} onChange={(e) => setActiveJenis(e.target.value)}>
                  <option value="*">⊞ Semua Bidang / Jenis</option>
                  {listJenis.map(item => (
                    <option key={item.original} value={item.original} disabled={isJenisBtnDisabled(item.original)}>
                      {item.icon ? `${item.icon} ` : ''}{item.title} {isJenisBtnDisabled(item.original) ? '(Tidak Tersedia)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sertSelectSumber" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent2)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>🏢 Penerbit / Sumber</label>
                <select id="sertSelectSumber" className="filter-select" value={activeSumber} onChange={(e) => setActiveSumber(e.target.value)}>
                  <option value="*">⊞ Semua Penerbit / Sumber</option>
                  {listSumber.map(item => (
                    <option key={item.original} value={item.original} disabled={isSumberBtnDisabled(item.original)}>
                      {item.icon ? `${item.icon} ` : ''}{item.title} {isSumberBtnDisabled(item.original) ? '(Tidak Tersedia)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Certificates Grid */}
        <div className="sert-grid" id="sert-grid-container">
          {displayList.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace", border: '1px dashed var(--border)', borderRadius: '10px', background: 'rgba(6,9,14,0.3)', margin: '2rem 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
              <div style={{ fontSize: '0.82rem', marginBottom: '1.5rem', color: 'var(--text-dim)', letterSpacing: '0.02em' }}>
                Tidak ditemukan sertifikat untuk kombinasi filter ini.
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
            displayList.map((s, i) => {
              const delay = (i % 4) * 60;
              return (
                <div 
                  key={s.id || i}
                  className="sert-card fade-in visible" 
                  style={{ transitionDelay: `${delay}ms` }}
                  onClick={() => setLightboxIdx(i)}
                >
                  <div className="sert-img-wrap">
                    <img src={s.img} alt={s.title} loading="lazy" />
                    <div className="sert-overlay">
                      <div className="sert-overlay-icon">⤢</div>
                    </div>
                  </div>
                  <div className="sert-body">
                    <div className="sert-meta">{s.meta}</div>
                    <div className="sert-title">{s.title}</div>
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
              to={role === 'admin' ? "/certificates?role=admin" : "/certificates"} 
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.8rem 2rem' }}
            >
              ⚡ Lihat Semua Sertifikat →
            </Link>
          </div>
        )}

        {/* Lightbox Overlay */}
        {lightboxIdx !== null && currentLightboxCert && (
          <div className="lightbox-overlay open" id="lightboxOverlay" onClick={(e) => {
            if (e.target.id === 'lightboxOverlay' || e.target.classList.contains('lightbox-close')) {
              setLightboxIdx(null);
            }
          }}>
            <button className="lightbox-close" onClick={() => setLightboxIdx(null)}>✕</button>
            <button 
              className="lightbox-nav prev" 
              onClick={() => setLightboxIdx(prev => (prev - 1 + filtered.length) % filtered.length)}
            >
              ‹
            </button>
            <button 
              className="lightbox-nav next" 
              onClick={() => setLightboxIdx(prev => (prev + 1) % filtered.length)}
            >
              ›
            </button>
            <div className="lightbox-inner">
              <img src={currentLightboxCert.img} alt={currentLightboxCert.title} id="lightboxImg" />
              <div className="lightbox-info">
                <div className="lightbox-meta" id="lightboxMeta">{currentLightboxCert.meta}</div>
                <div className="lightbox-title" id="lightboxTitle">{currentLightboxCert.title}</div>
                <div className="lightbox-desc" id="lightboxDesc">{currentLightboxCert.desc || ''}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inject styling */}
      <style id="sert-responsive-filter-style" dangerouslySetInnerHTML={{ __html: `
        .sert-filter-desktop { display: block; }
        .sert-filter-mobile { display: none; }
        .filter-select {
          width: 100%;
          padding: 0.6rem 2.2rem 0.6rem 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: var(--text);
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 6px;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ff66' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 0.85rem;
          transition: border-color 0.2s;
        }
        .filter-select:focus { border-color: var(--accent) !important; }
        .filter-select option { background: var(--bg2); color: var(--text); }
        .filter-btn.disabled {
          opacity: 0.22;
          pointer-events: none;
          cursor: not-allowed;
          border-color: rgba(255, 255, 255, 0.05) !important;
          background: rgba(255, 255, 255, 0.01) !important;
          color: var(--text-muted) !important;
        }
        @media (max-width: 768px) {
          .sert-filter-desktop { display: none; }
          .sert-filter-mobile { display: block; margin-bottom: 1.5rem; }
        }
      `}} />
    </section>
  );
}
