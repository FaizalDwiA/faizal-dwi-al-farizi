import React, { useState, useEffect } from 'react';

export default function GlobalLoader({ dbLoading }) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Sequence of terminal lines
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1000);
    const timer3 = setTimeout(() => setStep(3), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // When database load completes AND terminal steps have reached step 3
  useEffect(() => {
    if (!dbLoading && step >= 3) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 400);
      const removeTimer = setTimeout(() => setVisible(false), 900);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [dbLoading, step]);

  if (!visible) return null;

  return (
    <div className={`global-loader ${fadeOut ? 'fade-out' : ''}`} id="global-loader">
      <div className="skeleton-terminal" style={{ width: '520px', maxWidth: '90vw', margin: 0, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        <div className="skeleton-terminal-header">
          <div className="skeleton-terminal-title">
            <i className="bi bi-terminal"></i> database_loader.sh — bash
          </div>
          <div className="skeleton-terminal-dots">
            <span className="skeleton-terminal-dot r"></span>
            <span className="skeleton-terminal-dot y"></span>
            <span className="skeleton-terminal-dot g"></span>
          </div>
        </div>
        <div className="skeleton-terminal-body" id="global-term-body">
          <div className="skeleton-terminal-line cmd">&gt; connect --service="firebase"</div>
          <div className="skeleton-terminal-line info">
            <span style={{ color: 'var(--accent)' }}>[CONNECT]</span> Melakukan jabat tangan keamanan...
          </div>
          <div className="skeleton-terminal-line info" id="term-step-1">
            <span style={{ color: 'var(--accent)' }}>[FETCH]</span> Sinkronisasi data dari Firebase Firestore...
            {step === 0 && <span className="skeleton-terminal-cursor"></span>}
          </div>
          
          {step >= 1 && (
            <div className="skeleton-terminal-line info">
              <span style={{ color: '#66d9ef' }}>[PARSING]</span> Memetakan objek proyek & sertifikat...
              {step === 1 && <span className="skeleton-terminal-cursor"></span>}
            </div>
          )}

          {step >= 2 && (
            <div className="skeleton-terminal-line success">
              <span style={{ color: '#a6e22e' }}>[SUCCESS]</span> Sinkronisasi database selesai. Memulai render UI...
              {step === 2 && <span className="skeleton-terminal-cursor"></span>}
            </div>
          )}

          {step >= 3 && dbLoading && (
            <div className="skeleton-terminal-line info">
              <span style={{ color: 'var(--text-muted)' }}>[WAIT]</span> Menunggu koneksi Firestore...
              <span className="skeleton-terminal-cursor"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
