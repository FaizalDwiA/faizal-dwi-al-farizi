import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { formatDriveImageUrl } from '../hooks/useFirestoreData.js';

export default function ProjectDetail({ isAdmin = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Lightbox & Magnifier state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(2.0);
  const [magnifierStyle, setMagnifierStyle] = useState({ display: 'none' });
  const modalImgRef = useRef(null);

  useEffect(() => {
    let active = true;
    async function fetchDetail() {
      setLoading(true);
      try {
        const collectionName = isAdmin ? 'admin_projects' : 'projects';
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        
        if (!active) return;

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProject({
            id: docSnap.id,
            ...data,
            images: data.images ? data.images.map(img => formatDriveImageUrl(img)) : []
          });
          document.title = `${data.title} — Faizal Dwi Al Farizi`;
        } else {
          // If project not found, redirect to home
          navigate(isAdmin ? '/admin' : '/');
        }
      } catch (err) {
        console.error("Gagal memuat detail proyek:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchDetail();
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      active = false;
    };
  }, [id, isAdmin, navigate]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  if (loading) {
    return (
      <div className="global-loader" id="global-loader">
        <div className="skeleton-terminal" style={{ width: '520px', maxWidth: '90vw', margin: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div className="skeleton-terminal-header">
            <div className="skeleton-terminal-title">
              <i className="bi bi-terminal"></i> details_fetcher.sh — bash
            </div>
            <div className="skeleton-terminal-dots">
              <span className="skeleton-terminal-dot r"></span>
              <span className="skeleton-terminal-dot y"></span>
              <span className="skeleton-terminal-dot g"></span>
            </div>
          </div>
          <div className="skeleton-terminal-body">
            <div className="skeleton-terminal-line cmd">&gt; fetch-detail --id="{id}"</div>
            <div className="skeleton-terminal-line info"><span style={{ color: 'var(--accent)' }}>[CONNECT]</span> Menghubungkan ke database Firebase...</div>
            <div className="skeleton-terminal-line success"><span style={{ color: '#a6e22e' }}>[SUCCESS]</span> Memuat detail proyek... <span className="skeleton-terminal-cursor"></span></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const images = project.images.length > 0 ? project.images : ['/assets/img/icon.webp'];

  // Handle URL alert trigger for CV Rosin private systems
  const handleLinkClick = (e, url) => {
    if (url.startsWith('javascript:')) {
      e.preventDefault();
      const alertMsg = url.match(/alert\(['"](.*?)['"]\)/)?.[1] || "Proyek bersifat privat.";
      alert(alertMsg);
    }
  };

  const handlePrev = () => {
    setCurrentIdx(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIdx(prev => (prev + 1) % images.length);
  };

  // Magnifier positioning and background calculations
  const handleMouseMove = (e) => {
    if (!modalImgRef.current) return;
    const rect = modalImgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    setMagnifierStyle({
      display: 'block',
      left: `${e.clientX - 90}px`,
      top: `${e.clientY - 90}px`,
      backgroundImage: `url('${images[currentIdx]}')`,
      backgroundSize: `${rect.width * zoomScale}px ${rect.height * zoomScale}px`,
      backgroundPosition: `${bgX}% ${bgY}%`
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({ display: 'none' });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    let newScale = zoomScale;
    if (e.deltaY < 0) {
      newScale = Math.min(4.0, zoomScale + 0.2);
    } else {
      newScale = Math.max(1.5, zoomScale - 0.2);
    }
    setZoomScale(newScale);

    // Refresh position immediately after scale adjustment
    if (modalImgRef.current) {
      const rect = modalImgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      setMagnifierStyle(prev => ({
        ...prev,
        backgroundSize: `${rect.width * newScale}px ${rect.height * newScale}px`,
        backgroundPosition: `${bgX}% ${bgY}%`
      }));
    }
  };

  const isPrivate = project.website.startsWith('javascript:');

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title" id="pageHeroTitle">{project.title}</h1>
          <div className="breadcrumb">
            <Link to={isAdmin ? "/admin" : "/"}>Home</Link>
            <span className="sep">/</span>
            <span>Project Details</span>
            <span className="sep">/</span>
            <span id="breadcrumbTitle">{project.title}</span>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <main>
        <section className="details-section">
          <div className="details-inner">
            {/* Image Slider / Media Column */}
            <div className="media-col">
              <div className="swiper-container">
                <div id="swiperWrapper" onClick={() => setLightboxOpen(true)}>
                  {images.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={project.title} 
                      className={`swiper-slide ${i === currentIdx ? 'active' : ''}`} 
                    />
                  ))}
                </div>
                {images.length > 1 && (
                  <>
                    <button className="swiper-btn prev" id="swBtnPrev" onClick={handlePrev}>‹</button>
                    <button className="swiper-btn next" id="swBtnNext" onClick={handleNext}>›</button>
                  </>
                )}
              </div>

              {/* Dots */}
              {images.length > 1 && (
                <div className="swiper-dots" id="swiperDots">
                  {images.map((_, i) => (
                    <button 
                      key={i} 
                      className={`swiper-dot ${i === currentIdx ? 'active' : ''}`}
                      onClick={() => setCurrentIdx(i)}
                    ></button>
                  ))}
                </div>
              )}

              {/* Thumbnails */}
              {images.length > 1 && (
                <div 
                  className="swiper-thumbnails" 
                  id="swiperThumbnails"
                  style={{ justifyContent: images.length > 4 ? 'flex-start' : 'center' }}
                >
                  {images.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`Thumbnail ${i + 1}`}
                      className={`swiper-thumbnail ${i === currentIdx ? 'active' : ''}`}
                      onClick={() => setCurrentIdx(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Spec Column */}
            <div className="info-col">
              <div className="project-overview-container">
                <div className="proj-type">{project.category}</div>
                <h2 className="project-title-name" id="projTitle" style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1.2rem', lineHeight: '1.15' }}>
                  {project.title}
                </h2>
                
                <div className="project-meta-table" style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(6,9,14,0.3)', marginBottom: '1.8rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderBottom: '1px solid var(--border)', padding: '0.75rem 1.2rem', fontSize: '0.8rem' }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-muted)' }}>KATAGORI:</div>
                    <div id="projCat" style={{ color: '#fff', fontWeight: 600 }}>{project.category}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderBottom: '1px solid var(--border)', padding: '0.75rem 1.2rem', fontSize: '0.8rem' }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-muted)' }}>TANGGAL:</div>
                    <div id="projDate" style={{ color: '#fff' }}>{project.date}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderBottom: '1px solid var(--border)', padding: '0.75rem 1.2rem', fontSize: '0.8rem' }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-muted)' }}>KLIEN:</div>
                    <div id="projClient" style={{ color: '#fff' }}>{project.client}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '0.75rem 1.2rem', fontSize: '0.8rem' }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-muted)' }}>WEBSITE:</div>
                    <div>
                      <a 
                        id="projUrl" 
                        href={project.website}
                        target={isPrivate ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent)', textDecoration: 'none', wordBreak: 'break-all' }}
                        onClick={(e) => handleLinkClick(e, project.website)}
                      >
                        <span id="projUrlText">{project.website}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-overview" id="projOverview" style={{ borderLeft: '3px solid var(--accent)', padding: '1.2rem 1.5rem', background: 'rgba(0,212,255,0.02)', borderRadius: '0 8px 8px 0', fontSize: '0.92rem', lineHeight: '1.8', color: 'var(--text)', marginBottom: '2rem' }}>
                  {project.overview}
                </div>

                {/* Tech badges */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent2)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tech Stack & Tools
                  </h4>
                  <div className="tech-badges" id="techBadges" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.tech.map((t, i) => (
                      <span key={i} className="tech-badge" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: '#fff', border: '1px solid var(--border)', background: 'var(--card)', padding: '0.3rem 0.8rem', borderRadius: '4px', transition: 'border-color 0.2s, transform 0.2s' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fitur & Ruang Lingkup
                  </h4>
                  <div className="features-grid" id="featuresGrid" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {project.features.map((f, i) => (
                      <div key={i} className="feature-item" style={{ border: '1px solid var(--border)', background: 'rgba(6,9,14,0.3)', padding: '0.8rem 1.2rem', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text)', position: 'relative', borderLeft: '3px solid var(--accent2)' }}>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                  <a 
                    id="viewLink" 
                    href={project.website}
                    target={isPrivate ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="btn-primary" 
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={(e) => handleLinkClick(e, project.website)}
                  >
                    🚀 Buka Live Demo
                  </a>
                  <Link to={isAdmin ? "/admin" : "/"} className="btn-outline" style={{ textDecoration: 'none' }}>
                    Kembali
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div 
          className="lightbox-modal open" 
          id="lightboxModal"
          onClick={(e) => {
            if (e.target.id === 'lightboxModal' || e.target.id === 'lightboxCaption') {
              setLightboxOpen(false);
              setMagnifierStyle({ display: 'none' });
            }
          }}
        >
          <button className="lightbox-close" onClick={() => {
            setLightboxOpen(false);
            setMagnifierStyle({ display: 'none' });
          }}>
            ✕
          </button>
          
          <div className="lightbox-wrapper">
            <img 
              src={images[currentIdx]} 
              alt={project.title} 
              className="lightbox-content" 
              id="lightboxImg"
              ref={modalImgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onWheel={handleWheel}
            />
            {/* Magnifier Glass Lens */}
            <div className="lightbox-magnifier" id="lightboxMagnifier" style={magnifierStyle}></div>
          </div>

          {/* Cyberpunk Controls panel */}
          <div className="lightbox-controls">
            <span className="control-label">ZOOM POWER:</span>
            <input 
              type="range" 
              min="1.5" 
              max="4.0" 
              step="0.1" 
              value={zoomScale} 
              onChange={(e) => setZoomScale(parseFloat(e.target.value))}
              className="zoom-slider" 
              id="zoomSlider" 
            />
            <span className="zoom-value" id="zoomValue">{zoomScale.toFixed(1)}x</span>
          </div>

          <div id="lightboxCaption" style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginTop: '5px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {project.title} — Gambar {currentIdx + 1} dari {images.length}
          </div>
        </div>
      )}
    </>
  );
}
