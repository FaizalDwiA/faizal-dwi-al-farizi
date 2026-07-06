function e(e){let t=document.getElementById(`sert-grid-container`),n=document.getElementById(`sertCount`),r=document.getElementById(`sertFilterBar`);if(!t)return;if(!e||e.length===0){t.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Gagal mengambil data sertifikat dari spreadsheet. Silakan refresh halaman.
      </div>
    `,n&&(n.innerHTML=`Menampilkan <span>0</span> dari 0 sertifikat`);return}let i=`*`,a=`*`;if(r){let t=e=>{if(!e)return{emoji:``,text:``};let t=e.match(/^([\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F9FF}\u{FE00}-\u{FE0F}\u{200D}]+)\s*(.*)$/u);return t?{emoji:t[1],text:t[2].trim()}:{emoji:``,text:e.trim()}},n=e=>{if(!e)return``;let t=e.trim().replace(/\s+/g,` `),n=t.toLowerCase().replace(/[\s-_]/g,``);return n===`freecodecamp`?`FreeCodeCamp`:n===`sololearn`?`SoloLearn`:n===`simplilearn`?`Simplilearn`:t.length<=3?t.toUpperCase():t.toLowerCase().split(` `).map(e=>e.length<=3?e.toUpperCase():e.charAt(0).toUpperCase()+e.slice(1)).join(` `)},i=[...new Set(e.map(e=>e.jenis||e.kategori).filter(Boolean))].map(e=>{let{emoji:r,text:i}=t(e),a=n(i);return{original:e,icon:r||``,title:a}}),a=[`magang`,`sertifikasi`,`penghargaan`,`coding`,`excel`,`pelatihan`,`webinar`],o=e=>{let t=e.toLowerCase(),n=a.findIndex(e=>t.includes(e));return n===-1?999:n};i.sort((e,t)=>{let n=o(e.original),r=o(t.original);return n===r?e.original.localeCompare(t.original):n-r});let s=`
      <button class="filter-btn active" data-filter="*">
        <span class="filter-icon">⊞</span> Semua
      </button>
    `,c=`
      <option value="*">⊞ Semua Bidang / Jenis</option>
    `;i.forEach(e=>{let t=e.icon?`<span class="filter-icon">${e.icon}</span>`:``,n=e.icon?`${e.icon} `:``;s+=`
        <button class="filter-btn" data-filter="${e.original}">
          ${t} ${e.title}
        </button>
      `,c+=`
        <option value="${e.original}">${n}${e.title}</option>
      `});let l=[...new Set(e.map(e=>e.meta).filter(Boolean))].map(e=>{let{emoji:r,text:i}=t(e),a=n(i);return{original:e,icon:r||``,title:a}}),u=[`magang`,`wmk`,`freecodecamp`,`solo learn`,`sololearn`,`simpli learn`,`simplilearn`,`eksternal`,`indonusa`,`smk`],d=e=>{let t=e.toLowerCase(),n=u.findIndex(e=>t.includes(e));return n===-1?999:n};l.sort((e,t)=>{let n=d(e.original),r=d(t.original);return n===r?e.original.localeCompare(t.original):n-r});let f=`
      <button class="filter-btn active" data-filter="*">
        <span class="filter-icon">⊞</span> Semua
      </button>
    `,p=`
      <option value="*">⊞ Semua Penerbit / Sumber</option>
    `;l.forEach(e=>{let t=e.icon?`<span class="filter-icon">${e.icon}</span>`:``,n=e.icon?`${e.icon} `:``;f+=`
        <button class="filter-btn" data-filter="${e.original}">
          ${t} ${e.title}
        </button>
      `,p+=`
        <option value="${e.original}">${n}${e.title}</option>
      `}),r.innerHTML=`
      <div class="sert-filter-desktop">
        <div class="filter-row" style="margin-bottom:1.2rem; width:100%;">
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; gap:0.4rem;">
            <span>📂</span> Bidang / Jenis
          </div>
          <div class="filter-bar" id="sertFilterBarJenis" style="margin:0;">
            ${s}
          </div>
        </div>
        <div class="filter-row" style="margin-bottom:0.8rem; width:100%;">
          <div style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent2); margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; gap:0.4rem;">
            <span>🏢</span> Penerbit / Sumber
          </div>
          <div class="filter-bar" id="sertFilterBarSumber" style="margin:0;">
            ${f}
          </div>
        </div>
      </div>
      
      <div class="sert-filter-mobile">
        <div style="margin-bottom: 0.8rem;">
          <label for="sertSelectJenis" style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent); display:block; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:500;">📂 Bidang / Jenis</label>
          <select id="sertSelectJenis" class="filter-select">
            ${c}
          </select>
        </div>
        <div>
          <label for="sertSelectSumber" style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:var(--accent2); display:block; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:500;">🏢 Penerbit / Sumber</label>
          <select id="sertSelectSumber" class="filter-select">
            ${p}
          </select>
        </div>
      </div>
    `}let o=document.querySelectorAll(`#sertFilterBarJenis .filter-btn`),s=document.querySelectorAll(`#sertFilterBarSumber .filter-btn`),c=document.getElementById(`sertSelectJenis`),l=document.getElementById(`sertSelectSumber`),u=[...e],d=0;if(!document.getElementById(`sert-responsive-filter-style`)){let e=document.createElement(`style`);e.id=`sert-responsive-filter-style`,e.innerHTML=`
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
    `,document.head.appendChild(e)}let f=()=>{o.forEach(t=>{let n=t.dataset.filter;if(n===`*`)return;let r=e.some(e=>{let t=(e.jenis||e.kategori)===n,r=a===`*`||e.meta===a;return t&&r}),i=c?c.querySelector(`option[value="${n}"]`):null;r?(t.classList.remove(`disabled`),i&&(i.disabled=!1,i.text=i.text.replace(` (Tidak Tersedia)`,``))):(t.classList.add(`disabled`),i&&(i.disabled=!0,i.text.includes(`(Tidak Tersedia)`)||(i.text+=` (Tidak Tersedia)`)))}),s.forEach(t=>{let n=t.dataset.filter;if(n===`*`)return;let r=e.some(e=>{let t=i===`*`||(e.jenis||e.kategori)===i,r=e.meta===n;return t&&r}),a=l?l.querySelector(`option[value="${n}"]`):null;r?(t.classList.remove(`disabled`),a&&(a.disabled=!1,a.text=a.text.replace(` (Tidak Tersedia)`,``))):(t.classList.add(`disabled`),a&&(a.disabled=!0,a.text.includes(`(Tidak Tersedia)`)||(a.text+=` (Tidak Tersedia)`)))})},p=document.getElementById(`lightboxOverlay`),m=document.getElementById(`lightboxImg`),h=document.getElementById(`lightboxMeta`),g=document.getElementById(`lightboxTitle`),_=document.getElementById(`lightboxDesc`),v=document.getElementById(`lightboxClose`),y=document.getElementById(`lightboxPrev`),b=document.getElementById(`lightboxNext`);function x(e){if(!p)return;d=e;let t=u[e];m&&(m.src=t.img),h&&(h.textContent=t.meta),g&&(g.textContent=t.title),_&&(_.textContent=t.desc),p.classList.add(`open`),document.body.style.overflow=`hidden`}function S(){p&&(p.classList.remove(`open`),document.body.style.overflow=``)}function C(){if(u=e.filter(e=>{let t=i===`*`||(e.jenis||e.kategori)===i,n=a===`*`||e.meta===a;return t&&n}),n&&(n.innerHTML=`Menampilkan <span>${u.length}</span> dari ${e.length} sertifikat`),t.innerHTML=``,u.length===0){t.innerHTML=`
        <div style="grid-column:1/-1; text-align:center; padding:4rem 1rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace; border:1px dashed var(--border); border-radius:10px; background:rgba(6,9,14,0.3); margin: 2rem 0;">
          <div style="font-size:2rem; margin-bottom:1rem;">🔍</div>
          <div style="font-size:0.82rem; margin-bottom:1.5rem; color:var(--text-dim); letter-spacing:0.02em;">
            Tidak ditemukan sertifikat untuk kombinasi filter ini.
          </div>
          <button id="resetFilterBtn" class="filter-btn" style="border-color:var(--accent); color:var(--accent); font-size:0.7rem; padding:0.5rem 1.2rem; cursor:pointer; background:rgba(0,212,255,0.02); display:inline-flex; align-items:center; gap:0.4rem; border-radius:6px; font-family:'JetBrains Mono',monospace;">
            ↺ Reset Semua Filter
          </button>
        </div>
      `;let e=document.getElementById(`resetFilterBtn`);e&&e.addEventListener(`click`,()=>{i=`*`,a=`*`,o.forEach(e=>{e.dataset.filter===`*`?e.classList.add(`active`):e.classList.remove(`active`)}),s.forEach(e=>{e.dataset.filter===`*`?e.classList.add(`active`):e.classList.remove(`active`)}),c&&(c.value=`*`),l&&(l.value=`*`),C(),f()});return}u.forEach((e,n)=>{let r=n%4*60;t.innerHTML+=`
      <div class="sert-card fade-in" style="transition-delay:${r}ms" data-idx="${n}">
        <div class="sert-img-wrap">
          <img src="${e.img}" alt="${e.title}" loading="lazy"
            onerror="this.style.display='none';this.parentElement.querySelector('.sert-img-placeholder').style.display='flex'">
          <div class="sert-img-placeholder" style="display:none">🏆</div>
          <div class="sert-overlay">
            <div class="sert-overlay-icon">⤢</div>
          </div>
        </div>
        <div class="sert-body">
          <div class="sert-meta">${e.meta}</div>
          <div class="sert-title">${e.title}</div>
        </div>
      </div>`}),document.querySelectorAll(`#sert-grid-container .fade-in`).forEach(e=>{setTimeout(()=>e.classList.add(`visible`),10)}),document.querySelectorAll(`.sert-card`).forEach(e=>{e.addEventListener(`click`,()=>x(parseInt(e.dataset.idx)))})}o.forEach(e=>{e.addEventListener(`click`,function(){this.classList.contains(`disabled`)||(o.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),i=this.dataset.filter,c&&(c.value=i),C(),f())})}),s.forEach(e=>{e.addEventListener(`click`,function(){this.classList.contains(`disabled`)||(s.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),a=this.dataset.filter,l&&(l.value=a),C(),f())})}),c&&c.addEventListener(`change`,function(){i=this.value,o.forEach(e=>{e.dataset.filter===i?e.classList.add(`active`):e.classList.remove(`active`)}),C(),f()}),l&&l.addEventListener(`change`,function(){a=this.value,s.forEach(e=>{e.dataset.filter===a?e.classList.add(`active`):e.classList.remove(`active`)}),C(),f()}),v&&v.addEventListener(`click`,S),p&&p.addEventListener(`click`,e=>{e.target===p&&S()}),y&&y.addEventListener(`click`,()=>{x((d-1+u.length)%u.length)}),b&&b.addEventListener(`click`,()=>{x((d+1)%u.length)}),document.addEventListener(`keydown`,e=>{!p||!p.classList.contains(`open`)||(e.key===`Escape`&&S(),e.key===`ArrowLeft`&&x((d-1+u.length)%u.length),e.key===`ArrowRight`&&x((d+1)%u.length))}),C(),f()}export{e as t};