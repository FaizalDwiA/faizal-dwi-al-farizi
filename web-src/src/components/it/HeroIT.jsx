import React, { useState, useEffect } from 'react';
import { itData } from '../../data/it-data.js';

function CountUp({ target, duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (target === 0) return;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count}+</>;
}

export default function HeroIT({ projectCount = 0, certificateCount = 0 }) {
  const { badge, title, roleCmd, desc, hud, terminal } = itData.hero;
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagLines, setDiagLines] = useState([]);
  const [diagStep, setDiagStep] = useState(0);

  const startDiagnostics = () => {
    setIsDiagnosing(true);
    setDiagLines([]);
    setDiagStep(0);
  };

  useEffect(() => {
    if (!isDiagnosing) return;

    const lines = terminal.diagnosticLines;
    if (diagStep < lines.length) {
      const currentLine = lines[diagStep];
      const timer = setTimeout(() => {
        setDiagLines(prev => [...prev, currentLine]);
        setDiagStep(prev => prev + 1);
      }, currentLine.delay);
      return () => clearTimeout(timer);
    }
  }, [isDiagnosing, diagStep]);

  const resetDiagnostics = () => {
    setIsDiagnosing(false);
    setDiagLines([]);
    setDiagStep(0);
  };

  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-text fade-in visible">
          {/* SYSTEM HUD PANEL */}
          <div className="status-panel" style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '0.7rem',
            border: '1px solid var(--border)',
            padding: '0.6rem 0.8rem',
            borderRadius: '6px',
            background: 'rgba(6,9,14,0.7)',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1.2rem',
            flexWrap: 'wrap',
            borderLeft: '3px solid var(--accent)',
            position: 'relative',
            zIndex: 5
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>SYSTEM:</span>{' '}
              <span className="blink" style={{ color: 'var(--accent2)', fontWeight: 700 }}>● {hud.system}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>NETSEC:</span>{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{hud.netsec}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>LOCAL_IP:</span>{' '}
              <span style={{ color: 'var(--accent)' }}>{hud.ip}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>SOLVED:</span>{' '}
              <span style={{ color: 'var(--accent2)' }}>{hud.solved}</span>
            </div>
          </div>

          <div className="hero-badge">{badge}</div>
          <h1 className="hero-name">
            {title[0]}<br />
            <span className="highlight">{title[1]}</span>
          </h1>
          <div className="hero-role">{roleCmd}</div>
          <p className="hero-desc">{desc}</p>
          <div className="hero-ctas">
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">▶ Lihat Layanan</button>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">📁 Proyek Web</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">
                <CountUp target={projectCount} />
              </div>
              <div className="stat-lbl">WEB PROJECTS</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <CountUp target={certificateCount} />
              </div>
              <div className="stat-lbl">SERTIFIKAT</div>
            </div>
          </div>
        </div>

        {/* TERMINAL */}
        <div className="terminal fade-in visible" style={{ width: '100%' }}>
          <div className="terminal-bar">
            <div className="dot r"></div>
            <div className="dot y"></div>
            <div className="dot g"></div>
            <div className="terminal-title">{terminal.title}</div>
            <button 
              className="terminal-diag-btn" 
              onClick={startDiagnostics} 
              disabled={isDiagnosing}
            >
              <i className="bi bi-cpu"></i> {isDiagnosing ? 'DIAGNOSING...' : 'RUN DIAGNOSTICS'}
            </button>
          </div>
          <div className="terminal-body" style={{ overflowY: 'auto' }}>
            {!isDiagnosing ? (
              <div id="termContent">
                <div className="t-comment">{terminal.profile.comment}</div>
                <div>{'{'}</div>
                <div className="t-indent">
                  <span className="t-key">"name"</span>: <span className="t-str">"{terminal.profile.name}"</span>,
                </div>
                <div className="t-indent">
                  <span className="t-key">"roles"</span>: [
                  {terminal.profile.roles.map((r, i) => (
                    <span key={i}>
                      <span className="t-str">"{r}"</span>
                      {i < terminal.profile.roles.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  ],
                </div>
                <div className="t-indent">
                  <span className="t-key">"location"</span>: <span className="t-str">"{terminal.profile.location}"</span>,
                </div>
                <div className="t-indent">
                  <span className="t-key">"skills"</span>: {'{'}
                </div>
                <div className="t-indent" style={{ paddingLeft: '3rem' }}>
                  <span className="t-key">"software"</span>: [
                  {terminal.profile.skills.software.map((s, i) => (
                    <span key={i}>
                      <span className="t-str">"{s}"</span>
                      {i < terminal.profile.skills.software.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  ],
                  <br />
                  <span className="t-key">"hardware"</span>: [
                  {terminal.profile.skills.hardware.map((h, i) => (
                    <span key={i}>
                      <span className="t-str">"{h}"</span>
                      {i < terminal.profile.skills.hardware.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  ]
                </div>
                <div className="t-indent">{'}'},</div>
                <div className="t-indent">
                  <span className="t-key">"experience"</span>: <span className="t-str">"{terminal.profile.experience}"</span>,
                </div>
                <div className="t-indent">
                  <span className="t-key">"available"</span>: <span className="t-val">{terminal.profile.available.toString()}</span>
                </div>
                <div>{'}'}<span className="t-cursor"></span></div>
              </div>
            ) : (
              <div id="termContent">
                {diagLines.map((line, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      color: line.type === 'cmd' ? '#fff' : '', 
                      fontWeight: line.type === 'cmd' ? 'bold' : 'normal',
                      marginTop: line.type === 'success' ? '0.5rem' : '0'
                    }}
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  />
                ))}
                
                {diagStep < terminal.diagnosticLines.length && (
                  <span className="t-cursor"></span>
                )}

                {diagStep === terminal.diagnosticLines.length && (
                  <div style={{ marginTop: '0.8rem' }}>
                    <button 
                      className="terminal-diag-btn" 
                      style={{ fontSize: '0.6rem' }}
                      onClick={resetDiagnostics}
                    >
                      <i className="bi bi-arrow-left"></i> KEMBALI KE PROFIL
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
