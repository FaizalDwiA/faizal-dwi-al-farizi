import React from 'react';
import { itData } from '../../data/it-data.js';

export default function AboutIT() {
  const { label, title, desc, intro, quote, photoInfo, cards } = itData.about;

  return (
    <section id="about">
      <div className="section-inner">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>

        <div className="about-grid">
          {/* PROFILE PHOTO */}
          <div className="about-photo-container fade-in visible">
            <div className="about-photo-frame">
              {/* HUD Elements */}
              <div className="hud-corner top-left"></div>
              <div className="hud-corner top-right"></div>
              <div className="hud-corner bottom-left"></div>
              <div className="hud-corner bottom-right"></div>
              <div className="hud-glow"></div>

              <img src="/assets/img/profile/profile.webp" alt="Faizal Dwi Al Farizi" className="about-photo" />

              {/* Scanline overlay */}
              <div className="scanline"></div>

              {/* Available Status Tag */}
              <div className="status-tag">
                <span className="status-pulse"></span>
                <span>AVAILABLE FOR HIRE</span>
              </div>
            </div>

            <div className="photo-info-footer">
              <div className="photo-info-item">
                <span className="lbl">ROLE:</span>
                <span className="val text-cyan">{photoInfo.role}</span>
              </div>
              <div className="photo-info-item">
                <span className="lbl">EXP:</span>
                <span className="val text-green">{photoInfo.exp}</span>
              </div>
            </div>
          </div>

          <div className="about-intro fade-in visible" style={{ transitionDelay: '0.1s' }}>
            <p dangerouslySetInnerHTML={{ __html: intro }}></p>
            <div className="about-quote">{quote}</div>
            <p>Bagi saya, baik keandalan infrastruktur fisik maupun kualitas kode aplikasi adalah prioritas utama. Setiap kebutuhan teknis dan audit sistem yang Anda percayakan dijamin selesai sepenuhnya.</p>
            <div className="hero-ctas" style={{ marginTop: '1.8rem' }}>
              <a href="#experience" className="btn-outline">Lihat Riwayat Kerja →</a>
            </div>
          </div>
        </div>

        <div className="about-cards fade-in visible" style={{ transitionDelay: '0.2s' }}>
          {cards.map((c, i) => (
            <div key={i} className="about-card">
              <div className="about-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
