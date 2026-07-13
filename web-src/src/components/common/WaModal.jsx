import React, { useState, useEffect, useRef } from 'react';

export default function WaModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [dari, setDari] = useState('');
  const [keperluan, setKeperluan] = useState('');
  const [pesan, setPesan] = useState('');
  
  const [nameError, setNameError] = useState(false);
  const [keperluanError, setKeperluanError] = useState(false);

  const nameInputRef = useRef(null);
  const keperluanSelectRef = useRef(null);

  const waNoHP = '62895378120630';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus name input when modal opens
      setTimeout(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      if (nameInputRef.current) nameInputRef.current.focus();
      setTimeout(() => setNameError(false), 1500);
      hasError = true;
    }

    if (!keperluan) {
      setKeperluanError(true);
      if (keperluanSelectRef.current) keperluanSelectRef.current.focus();
      setTimeout(() => setKeperluanError(false), 1500);
      hasError = true;
    }

    if (hasError) return;

    let msg = `Assalamu'alaikum Warahmatullahi Wabarakatuh\n\nHalo Faizal Dwi Al Farizi\n\nSaya *${name.trim()}*\n`;
    if (dari.trim()) {
      msg += `Dari: *${dari.trim()}*\n`;
    }
    msg += `Keperluan: *${keperluan}*`;
    
    if (pesan.trim()) {
      msg += `\n\nPesan tambahan:\n${pesan.trim()}`;
    }
    msg += `\n\n_(Pesan dikirim dari portofolio https://faizaldwia.github.io/faizal-dwi-al-farizi )_`;

    const url = `https://wa.me/${waNoHP}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    
    // Reset form and close
    setName('');
    setDari('');
    setKeperluan('');
    setPesan('');
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('wa-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="wa-modal-overlay open" onClick={handleOverlayClick}>
      <div className="wa-modal">
        <div className="wa-modal-header">
          <h3><i className="bi bi-whatsapp"></i> Chat WhatsApp</h3>
          <button className="wa-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="wa-modal-body">
          <div className="wa-input-group">
            <label htmlFor="waName">Nama Anda <span style={{ color: 'var(--accent3)' }}>*</span></label>
            <input 
              type="text" 
              id="waName" 
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama..." 
              autoComplete="off"
              style={{ borderColor: nameError ? 'var(--accent3)' : '' }}
            />
          </div>
          <div className="wa-input-group">
            <label htmlFor="waDari">Instansi / Perusahaan (Opsional)</label>
            <input 
              type="text" 
              id="waDari" 
              value={dari}
              onChange={(e) => setDari(e.target.value)}
              placeholder="Nama instansi..." 
              autoComplete="off"
            />
          </div>
          <div className="wa-input-group">
            <label htmlFor="waKeperluan">Keperluan <span style={{ color: 'var(--accent3)' }}>*</span></label>
            <select 
              id="waKeperluan" 
              ref={keperluanSelectRef}
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
              style={{ borderColor: keperluanError ? 'var(--accent3)' : '' }}
            >
              <option value="">-- Pilih Keperluan --</option>
              <option value="Pembuatan Web / Software">Pembuatan Web / Software</option>
              <option value="Servis Hardware PC / Laptop">Servis Hardware PC / Laptop</option>
              <option value="Instalasi & Troubleshooting Software">Instalasi & Troubleshooting Software</option>
              <option value="Setup Jaringan / LAN / Wi-Fi">Setup Jaringan / LAN / Wi-Fi</option>
              <option value="IT Auditing / Konsultasi Sistem">IT Auditing / Konsultasi Sistem</option>
              <option value="Kerjasama Pekerjaan / Lainnya">Kerjasama Pekerjaan / Lainnya</option>
            </select>
          </div>
          <div className="wa-input-group">
            <label htmlFor="waPesan">Pesan Tambahan (Opsional)</label>
            <textarea 
              id="waPesan" 
              rows="3" 
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis deskripsi kendala / pesan tambahan..."
            ></textarea>
          </div>
        </div>
        <div className="wa-modal-footer">
          <button className="wa-btn-send" id="waSendBtn" onClick={handleSend}>
            Kirim via WhatsApp <i className="bi bi-send-fill" style={{ marginLeft: '0.3rem' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
