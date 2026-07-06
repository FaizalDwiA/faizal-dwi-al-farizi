export function initWaModal() {
  const waOverlay = document.getElementById('waModalOverlay');
  const waTrigger = document.getElementById('waContactTrigger');
  const waClose = document.getElementById('waModalClose');
  const waSendBtn = document.getElementById('waSendBtn');

  if (!waOverlay) return;

  const waNoHP = '62895378120630';

  function openWaModal(e) {
    if (e) e.preventDefault();
    waOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const nameInput = document.getElementById('waName');
    if (nameInput) nameInput.focus();
  }

  function closeWaModal() {
    waOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind trigger clicks once
  if (waTrigger) {
    waTrigger.addEventListener('click', openWaModal);
  }

  // Bind close buttons once
  if (waClose) {
    waClose.addEventListener('click', closeWaModal);
  }

  // Overlay click to close
  waOverlay.addEventListener('click', e => {
    if (e.target === waOverlay) closeWaModal();
  });

  // Esc key press to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && waOverlay.classList.contains('open')) {
      closeWaModal();
    }
  });

  // Validation and Submission to WhatsApp
  if (waSendBtn) {
    waSendBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('waName');
      const dariInput = document.getElementById('waDari');
      const keperluanInput = document.getElementById('waKeperluan');
      const pesanInput = document.getElementById('waPesan');

      const nama = nameInput ? nameInput.value.trim() : '';
      const dari = dariInput ? dariInput.value.trim() : '';
      const keperluan = keperluanInput ? keperluanInput.value : '';
      const pesan = pesanInput ? pesanInput.value.trim() : '';

      if (!nama) {
        if (nameInput) {
          nameInput.focus();
          nameInput.style.borderColor = 'var(--accent3)';
          setTimeout(() => { nameInput.style.borderColor = ''; }, 1500);
        }
        return;
      }
      if (!keperluan) {
        if (keperluanInput) {
          keperluanInput.focus();
          keperluanInput.style.borderColor = 'var(--accent3)';
          setTimeout(() => { keperluanInput.style.borderColor = ''; }, 1500);
        }
        return;
      }

      let msg = `Assalamu'alaikum Warahmatullahi Wabarakatuh\n\nHalo Faizal Dwi Al Farizi\n\nSaya *${nama}*\n`;
      if (dari) {
        msg += `Dari: *${dari}*\n`;
      }
      msg += `Keperluan: *${keperluan}*`;
      
      if (pesan) {
        msg += `\n\nPesan tambahan:\n${pesan}`;
      }
      msg += `\n\n_(Pesan dikirim dari portofolio https://faizaldwia.github.io/faizal-dwi-al-farizi )_`;

      const url = `https://wa.me/${waNoHP}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      closeWaModal();
    });
  }
}
