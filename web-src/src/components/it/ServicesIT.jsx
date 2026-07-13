import React from 'react';
import { itData } from '../../data/it-data.js';

export default function ServicesIT() {
  const { label, title, desc, list } = itData.services;

  return (
    <section id="services">
      <div className="section-inner">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>

        <div className="proj-grid" style={{ marginTop: '3rem' }}>
          {list.map((srv, idx) => {
            const delay = (idx % 3) * 80;
            return (
              <div 
                key={idx} 
                className="proj-card fade-in visible" 
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="proj-type" style={{ color: srv.typeClass === 'text-accent2' ? 'var(--accent2)' : 'var(--accent)' }}>
                  {srv.type}
                </div>
                <div className="proj-icon-row">
                  <i className={srv.icon} style={{ fontSize: '1.5rem', color: srv.iconColor, marginBottom: '0.6rem', display: 'block' }}></i>
                </div>
                <div className="proj-name">{srv.name}</div>
                <div className="proj-desc">{srv.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
