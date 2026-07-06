import"./config-CM5qn_ja.js";import{a as e,i as t,o as n,t as r}from"./firestore-1_gg0Jdp.js";var i={excel:`bi bi-file-earmark-excel`,spreadsheet:`bi bi-file-earmark-spreadsheet`,spreadsheets:`bi bi-file-earmark-spreadsheet`,admin:`bi bi-person-workspace`,logistics:`bi bi-box-seam`,finance:`bi bi-cash-coin`};document.addEventListener(`DOMContentLoaded`,async()=>{n(),e();let a=document.querySelector(`.nav-logo`);a&&a.setAttribute(`href`,`admin.html`),document.querySelectorAll(`#navLinks a`).forEach(e=>{let t=e.getAttribute(`href`);t&&t.includes(`index.html`)&&(t=t.replace(`index.html`,`admin.html`),e.setAttribute(`href`,t))}),document.querySelectorAll(`.breadcrumb a`).forEach(e=>{let t=e.getAttribute(`href`);t&&t.includes(`index.html`)&&(t=t.replace(`index.html`,`admin.html`),e.setAttribute(`href`,t))});let o=document.getElementById(`proj-grid-container`),s=document.getElementById(`projCount`),c=document.getElementById(`projSearchInput`);function l(e){if(!e)return``;if(e.includes(`drive.google.com`)||e.includes(`docs.google.com`)||e.includes(`googleusercontent.com`)){let t=e.match(/\/file\/d\/([^\/]+)/)||e.match(/[?&]id=([^&]+)/)||e.match(/\/d\/([^\/]+)/);if(t&&t[1])return`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${t[1]}`}return!e.includes(`/`)&&!e.includes(`.`)&&e.length>=15&&e.length<=60?`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${e}`:e}let u=document.createElement(`div`);u.className=`global-loader`,u.id=`global-loader`,u.innerHTML=`
    <div class="skeleton-terminal" style="width: 520px; max-width: 90vw; margin: 0; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
      <div class="skeleton-terminal-header">
        <div class="skeleton-terminal-title">
          <i class="bi bi-terminal"></i> database_loader.sh — bash
        </div>
        <div class="skeleton-terminal-dots">
          <span class="skeleton-terminal-dot r"></span>
          <span class="skeleton-terminal-dot y"></span>
          <span class="skeleton-terminal-dot g"></span>
        </div>
      </div>
      <div class="skeleton-terminal-body" id="global-term-body">
        <div class="skeleton-terminal-line cmd">> connect --service="firebase"</div>
        <div class="skeleton-terminal-line info"><span style="color:var(--accent)">[CONNECT]</span> Melakukan jabat tangan keamanan...</div>
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi database admin_projects... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `,document.body.appendChild(u),o&&(o.innerHTML=Array.from({length:3}).map(()=>`
      <div class="skeleton-card proj-card">
        <div class="skeleton-scanner"></div>
        <div class="proj-type">
          <span class="skeleton-line skeleton-shimmer" style="width: 35%; height: 10px; border-radius: 4px;"></span>
        </div>
        <div class="proj-icon-row" style="margin-bottom:0.6rem;">
          <div class="skeleton-circle skeleton-shimmer" style="width: 28px; height: 28px; border-radius: 50%;"></div>
        </div>
        <div class="proj-name">
          <span class="skeleton-line skeleton-shimmer" style="width: 75%; height: 16px; border-radius: 4px; margin-bottom: 0.5rem;"></span>
        </div>
        <div class="proj-card-tags" style="display:flex; flex-wrap:wrap; gap:0.3rem; margin-top:0.4rem; margin-bottom:1rem;">
          <span class="skeleton-line skeleton-shimmer" style="width: 45px; height: 14px; border-radius: 3px;"></span>
          <span class="skeleton-line skeleton-shimmer" style="width: 60px; height: 14px; border-radius: 3px;"></span>
        </div>
        <div class="proj-desc">
          <span class="skeleton-line skeleton-shimmer" style="width: 100%; height: 11px; border-radius: 4px; margin-bottom: 0.5rem;"></span>
          <span class="skeleton-line skeleton-shimmer" style="width: 50%; height: 11px; border-radius: 4px;"></span>
        </div>
        <div style="margin-top:auto; padding-top:1rem">
          <div class="skeleton-line skeleton-shimmer" style="width: 100%; height: 32px; border-radius: 6px;"></div>
        </div>
      </div>
    `).join(``));let d=document.getElementById(`global-term-body`),f=document.getElementById(`term-step-1`),p,m;d&&(p=setTimeout(()=>{f&&f.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line info`,e.innerHTML=`<span style="color:#66d9ef">[PARSING]</span> Memetakan data & formula sheet... <span class="skeleton-terminal-cursor"></span>`,d.appendChild(e)},600),m=setTimeout(()=>{d.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line success`,e.innerHTML=`<span style="color:#a6e22e">[SUCCESS]</span> Sinkronisasi database selesai. Memulai grid UI... <span class="skeleton-terminal-cursor"></span>`,d.appendChild(e)},1100));let h=[];try{let e=await r();e&&Array.isArray(e)&&(h=e.map(e=>{let t=e.images?e.images.map(e=>l(e)):[];return{...e,images:t}}))}catch(e){console.error(`Gagal mengambil data Admin Projects:`,e)}if(clearTimeout(p),clearTimeout(m),u.classList.add(`fade-out`),setTimeout(()=>{u.remove()},400),!o)return;if(h.length===0){o.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Belum ada data project admin yang dimigrasi dari Google Sheets.
      </div>
    `,s&&(s.innerHTML=`Menampilkan <span>0</span> dari 0 project`);return}let g=h.map(e=>{let t=(e.category||``).toLowerCase(),n=`bi bi-file-earmark-spreadsheet`;for(let[e,r]of Object.entries(i))if(t.includes(e)){n=r;break}let r=e.overview||``,a=`project-details-admin.html?id=${e.id}`;return{...e,icon:n,desc:r,link:a}}),_=``;function v(){let e=g.filter(e=>{let t=`${e.title} ${e.desc} ${e.category} ${(e.tech||[]).join(` `)}`.toLowerCase();return!_||t.includes(_)});if(s&&(s.innerHTML=`Menampilkan <span>${e.length}</span> dari ${g.length} project`),o.innerHTML=``,e.length===0){o.innerHTML=`
        <div style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
          🔍 Tidak ada proyek admin yang cocok dengan pencarian Anda.
        </div>
      `;return}e.forEach((e,t)=>{let n=t%3*80,r=e.tech&&e.tech.length>0?`<div class="proj-card-tags" style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem;margin-bottom:1rem;">
             ${e.tech.map(e=>`<span style="font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--accent);background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);padding:0.1rem 0.4rem;border-radius:3px;">${e}</span>`).join(``)}
           </div>`:``;o.innerHTML+=`
      <div class="proj-card fade-in" style="transition-delay:${n}ms">
        <div class="proj-type">${e.category||`Excel / Admin`}</div>
        <div class="proj-icon-row">
          <i class="${e.icon}" style="font-size:1.5rem;color:var(--accent);margin-bottom:0.6rem;display:block"></i>
        </div>
        <div class="proj-name">${e.title}</div>
        ${r}
        <div class="proj-desc">${e.desc}</div>
        <div style="margin-top:auto;padding-top:1rem">
          <a href="${e.link}" class="proj-btn">
            Detail Project <span class="arrow">→</span>
          </a>
        </div>
      </div>`}),document.querySelectorAll(`#proj-grid-container .fade-in`).forEach(e=>{setTimeout(()=>e.classList.add(`visible`),10)})}c&&c.addEventListener(`input`,e=>{_=e.target.value.toLowerCase().trim(),v()}),v(),t(h,[])});