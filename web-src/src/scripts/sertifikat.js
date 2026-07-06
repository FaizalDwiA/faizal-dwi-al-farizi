export function initSertifikat(sertifikatList) {
  const sertGrid = document.getElementById('sert-grid-container');
  const sertCountEl = document.getElementById('sertCount');
  const filterBar = document.getElementById('sertFilterBar');

  if (!sertGrid) return;

  if (!sertifikatList || sertifikatList.length === 0) {
    sertGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Gagal mengambil data sertifikat dari spreadsheet. Silakan refresh halaman.
      </div>
    `;
    if (sertCountEl) {
      sertCountEl.innerHTML = `Menampilkan <span>0</span> dari 0 sertifikat`;
    }
    return;
  }

  let activeJenis = '*';
  let activeSumber = '*';

  // 1. Generate filter buttons dynamically if filter bar exists (e.g. on certificates gallery page)
  if (filterBar) {
    // Helper to extract emoji and title from a string (e.g. "💼 MAGANG" -> { emoji: "💼", text: "MAGANG" })
    const extractEmojiAndText = (str) => {
      if (!str) return { emoji: '', text: '' };
      const emojiRegex = /^([\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F9FF}\u{FE00}-\u{FE0F}\u{200D}]+)\s*(.*)$/u;
      const match = str.match(emojiRegex);
      if (match) {
        return { emoji: match[1], text: match[2].trim() };
      }
      return { emoji: '', text: str.trim() };
    };

    // Helper to format meta/jenis string to Title Case (e.g., "SOLO LEARN" -> "Solo Learn")
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
          if (word.length <= 3) return word.toUpperCase(); // Preserve acronyms like SMK, WMK
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    };

    // --- ROW 1: JENIS ---
    const uniqueJenis = [...new Set(sertifikatList.map(s => s.jenis || s.kategori).filter(Boolean))];
    const categoryDataJenis = uniqueJenis.map(cat => {
      const { emoji, text } = extractEmojiAndText(cat);
      const title = formatCategoryTitle(text);
      return { original: cat, icon: emoji || '', title };
    });

    const predefinedOrderJenis = ['magang', 'sertifikasi', 'penghargaan', 'coding', 'excel', 'pelatihan', 'webinar'];
    const getSortIndexJenis = (jenisName) => {
      const lower = jenisName.toLowerCase();
      const idx = predefinedOrderJenis.findIndex(keyword => lower.includes(keyword));
      return idx !== -1 ? idx : 999;
    };
    categoryDataJenis.sort((a, b) => {
      const idxA = getSortIndexJenis(a.original);
      const idxB = getSortIndexJenis(b.original);
      if (idxA !== idxB) return idxA - idxB;
      return a.original.localeCompare(b.original);
    });

    let jenisHtml = `
      <button class="filter-btn active" data-filter="*">
        <span class="filter-icon">⊞</span> Semua
      </button>
    `;
    let selectJenisHtml = `
      <option value="*">⊞ Semua Bidang / Jenis</option>
    `;
    categoryDataJenis.forEach(item => {
      const iconHtml = item.icon ? `<span class="filter-icon">${item.icon}</span>` : '';
      const emojiPrefix = item.icon ? `${item.icon} ` : '';
      jenisHtml += `
        <button class="filter-btn" data-filter="${item.original}">
          ${iconHtml} ${item.title}
        </button>
      `;
      selectJenisHtml += `
        <option value="${item.original}">${emojiPrefix}${item.title}</option>
      `;
    });

    // --- ROW 2: SUMBER ---
    const uniqueSumber = [...new Set(sertifikatList.map(s => s.meta).filter(Boolean))];
    const categoryDataSumber = uniqueSumber.map(sub => {
      const { emoji, text } = extractEmojiAndText(sub);
      const title = formatCategoryTitle(text);
      return { original: sub, icon: emoji || '', title };
    });

    const predefinedOrderSumber = ['magang', 'wmk', 'freecodecamp', 'solo learn', 'sololearn', 'simpli learn', 'simplilearn', 'eksternal', 'indonusa', 'smk'];
    const getSortIndexSumber = (sumberName) => {
      const lower = sumberName.toLowerCase();
      const idx = predefinedOrderSumber.findIndex(keyword => lower.includes(keyword));
      return idx !== -1 ? idx : 999;
    };
    categoryDataSumber.sort((a, b) => {
      const idxA = getSortIndexSumber(a.original);
      const idxB = getSortIndexSumber(b.original);
      if (idxA !== idxB) return idxA - idxB;
      return a.original.localeCompare(b.original);
    });

    let sumberHtml = `
      <button class="filter-btn active" data-filter="*">
        <span class="filter-icon">⊞</span> Semua
      </button>
    `;
    let selectSumberHtml = `
      <option value="*">⊞ Semua Penerbit / Sumber</option>
    `;
    categoryDataSumber.forEach(item => {
      const iconHtml = item.icon ? `<span class="filter-icon">${item.icon}</span>` : '';
      const emojiPrefix = item.icon ? `${item.icon} ` : '';
      sumberHtml += `
        <button class="filter-btn" data-filter="${item.original}">
          ${iconHtml} ${item.title}
        </button>
      `;
      selectSumberHtml += `
        <option value="${item.original}">${emojiPrefix}${item.title}</option>
      `;
    });

    // Inject 2 layouts (Desktop and Mobile) into filterBar
    filterBar.innerHTML = `
      <div class="sert-filter-desktop">
        <div class="filter-row" style="margin-bottom:1.2rem; width:100%;">
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; gap:0.4rem;">
            <span>📂</span> Bidang / Jenis
          </div>
          <div class="filter-bar" id="sertFilterBarJenis" style="margin:0;">
            ${jenisHtml}
          </div>
        </div>
        <div class="filter-row" style="margin-bottom:0.8rem; width:100%;">
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent2); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; gap:0.4rem;">
            <span>🏢</span> Penerbit / Sumber
          </div>
          <div class="filter-bar" id="sertFilterBarSumber" style="margin:0;">
            ${sumberHtml}
          </div>
        </div>
      </div>
      
      <div class="sert-filter-mobile">
        <div style="margin-bottom: 0.8rem;">
          <label for="sertSelectJenis" style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent); display:block; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:500;">📂 Bidang / Jenis</label>
          <select id="sertSelectJenis" class="filter-select">
            ${selectJenisHtml}
          </select>
        </div>
        <div>
          <label for="sertSelectSumber" style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent2); display:block; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:500;">🏢 Penerbit / Sumber</label>
          <select id="sertSelectSumber" class="filter-select">
            ${selectSumberHtml}
          </select>
        </div>
      </div>
    `;
  }

  const filterButtonsJenis = document.querySelectorAll('#sertFilterBarJenis .filter-btn');
  const filterButtonsSumber = document.querySelectorAll('#sertFilterBarSumber .filter-btn');
  const selectJenis = document.getElementById('sertSelectJenis');
  const selectSumber = document.getElementById('sertSelectSumber');
  let currentSertData = [...sertifikatList];
  let lightboxIdx = 0;

  // Inject responsive filter styling if not already present
  if (!document.getElementById('sert-responsive-filter-style')) {
    const style = document.createElement('style');
    style.id = 'sert-responsive-filter-style';
    style.innerHTML = `
      .sert-filter-desktop {
        display: block;
      }
      .sert-filter-mobile {
        display: none;
      }
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
      .filter-select:focus {
        border-color: var(--accent) !important;
      }
      .filter-select option {
        background: var(--bg2);
        color: var(--text);
      }
      .filter-btn.disabled {
        opacity: 0.22;
        pointer-events: none;
        cursor: not-allowed;
        border-color: rgba(255, 255, 255, 0.05) !important;
        background: rgba(255, 255, 255, 0.01) !important;
        color: var(--text-muted) !important;
      }
      @media (max-width: 768px) {
        .sert-filter-desktop {
          display: none;
        }
        .sert-filter-mobile {
          display: block;
          margin-bottom: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Disable filter options that would yield 0 results based on the other active filter
  const updateButtonStates = () => {
    // 1. Check Jenis buttons & select options
    filterButtonsJenis.forEach(btn => {
      const filterVal = btn.dataset.filter;
      if (filterVal === '*') return; // Always keep "Semua" enabled
      
      const hasMatch = sertifikatList.some(s => {
        const matchJenis = (s.jenis || s.kategori) === filterVal;
        const matchSumber = activeSumber === '*' || s.meta === activeSumber;
        return matchJenis && matchSumber;
      });
      
      const option = selectJenis ? selectJenis.querySelector(`option[value="${filterVal}"]`) : null;
      
      if (hasMatch) {
        btn.classList.remove('disabled');
        if (option) {
          option.disabled = false;
          option.text = option.text.replace(' (Tidak Tersedia)', '');
        }
      } else {
        btn.classList.add('disabled');
        if (option) {
          option.disabled = true;
          if (!option.text.includes('(Tidak Tersedia)')) {
            option.text += ' (Tidak Tersedia)';
          }
        }
      }
    });

    // 2. Check Sumber buttons & select options
    filterButtonsSumber.forEach(btn => {
      const filterVal = btn.dataset.filter;
      if (filterVal === '*') return; // Always keep "Semua" enabled
      
      const hasMatch = sertifikatList.some(s => {
        const matchJenis = activeJenis === '*' || (s.jenis || s.kategori) === activeJenis;
        const matchSumber = s.meta === filterVal;
        return matchJenis && matchSumber;
      });
      
      const option = selectSumber ? selectSumber.querySelector(`option[value="${filterVal}"]`) : null;
      
      if (hasMatch) {
        btn.classList.remove('disabled');
        if (option) {
          option.disabled = false;
          option.text = option.text.replace(' (Tidak Tersedia)', '');
        }
      } else {
        btn.classList.add('disabled');
        if (option) {
          option.disabled = true;
          if (!option.text.includes('(Tidak Tersedia)')) {
            option.text += ' (Tidak Tersedia)';
          }
        }
      }
    });
  };

  // Lightbox DOM Elements
  const overlay = document.getElementById('lightboxOverlay');
  const lbImg = document.getElementById('lightboxImg');
  const lbMeta = document.getElementById('lightboxMeta');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbDesc = document.getElementById('lightboxDesc');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');

  function openLightbox(idx) {
    if (!overlay) return;
    lightboxIdx = idx;
    const s = currentSertData[idx];
    if (lbImg) lbImg.src = s.img;
    if (lbMeta) lbMeta.textContent = s.meta;
    if (lbTitle) lbTitle.textContent = s.title;
    if (lbDesc) lbDesc.textContent = s.desc;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderSertifikat() {
    currentSertData = sertifikatList.filter(s => {
      const matchJenis = activeJenis === '*' || (s.jenis || s.kategori) === activeJenis;
      const matchSumber = activeSumber === '*' || s.meta === activeSumber;
      return matchJenis && matchSumber;
    });

    if (sertCountEl) {
      sertCountEl.innerHTML = `Menampilkan <span>${currentSertData.length}</span> dari ${sertifikatList.length} sertifikat`;
    }
    sertGrid.innerHTML = '';

    if (currentSertData.length === 0) {
      sertGrid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:4rem 1rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace; border:1px dashed var(--border); border-radius:10px; background:rgba(6,9,14,0.3); margin: 2rem 0;">
          <div style="font-size:2rem; margin-bottom:1rem;">🔍</div>
          <div style="font-size:0.82rem; margin-bottom:1.5rem; color:var(--text-dim); letter-spacing:0.02em;">
            Tidak ditemukan sertifikat untuk kombinasi filter ini.
          </div>
          <button id="resetFilterBtn" class="filter-btn" style="border-color:var(--accent); color:var(--accent); font-size:0.7rem; padding:0.5rem 1.2rem; cursor:pointer; background:rgba(0,212,255,0.02); display:inline-flex; align-items:center; gap:0.4rem; border-radius:6px; font-family:'JetBrains Mono',monospace;">
            ↺ Reset Semua Filter
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeJenis = '*';
          activeSumber = '*';
          
          // Reset Buttons
          filterButtonsJenis.forEach(b => {
            if (b.dataset.filter === '*') b.classList.add('active');
            else b.classList.remove('active');
          });
          filterButtonsSumber.forEach(b => {
            if (b.dataset.filter === '*') b.classList.add('active');
            else b.classList.remove('active');
          });

          // Reset Selects
          if (selectJenis) selectJenis.value = '*';
          if (selectSumber) selectSumber.value = '*';
          
          renderSertifikat();
          updateButtonStates();
        });
      }
      return;
    }
    
    currentSertData.forEach((s, i) => {
      const delay = (i % 4) * 60;
      sertGrid.innerHTML += `
      <div class="sert-card fade-in" style="transition-delay:${delay}ms" data-idx="${i}">
        <div class="sert-img-wrap">
          <img src="${s.img}" alt="${s.title}" loading="lazy"
            onerror="this.style.display='none';this.parentElement.querySelector('.sert-img-placeholder').style.display='flex'">
          <div class="sert-img-placeholder" style="display:none">🏆</div>
          <div class="sert-overlay">
            <div class="sert-overlay-icon">⤢</div>
          </div>
        </div>
        <div class="sert-body">
          <div class="sert-meta">${s.meta}</div>
          <div class="sert-title">${s.title}</div>
        </div>
      </div>`;
    });

    document.querySelectorAll('#sert-grid-container .fade-in').forEach(el => {
      setTimeout(() => el.classList.add('visible'), 10);
    });

    // Bind click event to each rendered card to open Lightbox
    document.querySelectorAll('.sert-card').forEach(card => {
      card.addEventListener('click', () => openLightbox(parseInt(card.dataset.idx)));
    });
  }

  // Filter button event listeners for Jenis (Desktop)
  filterButtonsJenis.forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.classList.contains('disabled')) return;
      filterButtonsJenis.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeJenis = this.dataset.filter;
      
      // Sync mobile select
      if (selectJenis) selectJenis.value = activeJenis;

      renderSertifikat();
      updateButtonStates();
    });
  });

  // Filter button event listeners for Sumber (Desktop)
  filterButtonsSumber.forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.classList.contains('disabled')) return;
      filterButtonsSumber.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeSumber = this.dataset.filter;
      
      // Sync mobile select
      if (selectSumber) selectSumber.value = activeSumber;

      renderSertifikat();
      updateButtonStates();
    });
  });

  // Filter dropdown change listeners (Mobile)
  if (selectJenis) {
    selectJenis.addEventListener('change', function () {
      activeJenis = this.value;
      
      // Sync desktop buttons active state
      filterButtonsJenis.forEach(b => {
        if (b.dataset.filter === activeJenis) b.classList.add('active');
        else b.classList.remove('active');
      });
      
      renderSertifikat();
      updateButtonStates();
    });
  }

  if (selectSumber) {
    selectSumber.addEventListener('change', function () {
      activeSumber = this.value;
      
      // Sync desktop buttons active state
      filterButtonsSumber.forEach(b => {
        if (b.dataset.filter === activeSumber) b.classList.add('active');
        else b.classList.remove('active');
      });
      
      renderSertifikat();
      updateButtonStates();
    });
  }

  // Lightbox Close Event
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });
  }

  // Lightbox Navigation Events
  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      openLightbox((lightboxIdx - 1 + currentSertData.length) % currentSertData.length);
    });
  }
  if (lbNext) {
    lbNext.addEventListener('click', () => {
      openLightbox((lightboxIdx + 1) % currentSertData.length);
    });
  }

  // Lightbox Keyboard Listener
  document.addEventListener('keydown', e => {
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox((lightboxIdx - 1 + currentSertData.length) % currentSertData.length);
    if (e.key === 'ArrowRight') openLightbox((lightboxIdx + 1) % currentSertData.length);
  });

  // Initial render
  renderSertifikat();
  updateButtonStates();
}
