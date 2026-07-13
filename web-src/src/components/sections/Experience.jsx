import React from 'react';

export default function Experience({ experience = [], education = [], certTags = [] }) {
  return (
    <section id="experience">
      <div className="section-inner">
        <div className="section-label">03 — riwayat</div>
        <h2 className="section-title">Perjalanan Karier & Pendidikan</h2>

        <div className="exp-grid">
          {/* Experience timeline */}
          <div>
            <h3 style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.8rem",
              color: "var(--accent)",
              letterSpacing: "0.1em",
              marginBottom: "2rem"
            }}>
              $ cat experience.log
            </h3>
            <div className="timeline">
              {experience.map((item, idx) => (
                <div 
                  key={idx} 
                  className="tl-item fade-in" 
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="tl-period">{item.period}</div>
                  <div className="tl-role">{item.role}</div>
                  <div className="tl-company">{item.company}</div>
                  <div className="tl-desc">
                    <ul className="tl-list">
                      {item.desc.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  {item.tags && (
                    <div className="tl-tags">
                      {item.tags.map((t, tIdx) => (
                        <span key={tIdx} className="tl-tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.8rem",
              color: "var(--accent2)",
              letterSpacing: "0.1em",
              marginBottom: "2rem"
            }}>
              $ cat education.log
            </h3>

            <div className="education-list">
              {education.map((item, idx) => (
                <div 
                  key={idx} 
                  className="edu-item fade-in" 
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="edu-period">{item.period}</div>
                  <div className="edu-degree">{item.degree}</div>
                  <div className="edu-school">{item.school}</div>
                  <div className="edu-desc">
                    <ul className="edu-list">
                      {item.desc.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Cert badges */}
            {certTags.length > 0 && (
              <div style={{ marginTop: '2.5rem' }} className="fade-in">
                <h3 style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.8rem",
                  color: "var(--accent4)",
                  letterSpacing: "0.1em",
                  marginBottom: "1.2rem"
                }}>
                  $ ls certificates/
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {certTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="tl-tag" 
                      style={{ borderColor: 'rgba(255,215,0,0.25)', color: 'var(--accent4)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
