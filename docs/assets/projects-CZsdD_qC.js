import"./config-CM5qn_ja.js";import{a as e,i as t,n,r}from"./firestore-VnQBJDOl.js";var i={website:`Website`,python:`Python`,dokumentasi:`Dokumentasi`,android:`Android`},a={siWeb:`bi bi-person-bounding-box`,websiteKelas:`bi bi-book`,enkripsiDekripsiPublic:`bi bi-shield-check`,tayokasiNyahNur:`bi bi-shop`,playSF:`bi bi-volume-up`,eKinerja:`bi bi-bar-chart`,utsSemester3:`bi bi-book`,websiteCrackSmadavPro:`bi bi-bug`,colorsW3S:`bi bi-palette`,proklimPurbayan:`bi bi-person-circle`,capFabi:`bi bi-chat-left-text`,conPyXelin:`bi bi-terminal`,transYou:`bi bi-collection-play`,gaexhid:`bi bi-file-earmark-lock2`,conPyXeWin:`bi bi-terminal-fill`,downVid:`bi bi-download`,qrCodePython:`bi bi-qr-code`,textImagePython:`bi bi-card-image`,enTeks:`bi bi-shield-lock`,downloadWebsitePython:`bi bi-cloud-download`,dokumentasiVBS:`bi bi-file-earmark-code`,dokumentasiCSSFlexbox:`bi bi-grid`,dokumentasiPHPDasar:`bi bi-file-earmark-code`,dokumentasiLaravel:`bi bi-file-earmark-code`,dokumentasiGit:`bi bi-git`,dokumentasiJavaScriptPZN:`bi bi-browser-chrome`,dokumentasiDatabasePZN:`bi bi-database`,dokumentasiPHPDasarPZN:`bi bi-file-earmark-code`,dokumentasiPHPOOPPZN:`bi bi-file-earmark-code`,dokumentasiGitPZN:`bi bi-git`,dokumentasiPython:`bi bi-file-earmark-code`,dokumentasiPhotoshop:`bi bi-image`},o={website:`bi bi-globe`,python:`bi bi-terminal`,dokumentasi:`bi bi-file-earmark-code`,android:`bi bi-phone`};document.addEventListener(`DOMContentLoaded`,async()=>{e(),t();let s=document.getElementById(`proj-grid-container`),c=document.getElementById(`projCount`),l=document.getElementById(`projSearchInput`),u=document.querySelectorAll(`#projFilterBar .filter-btn`),d=document.getElementById(`techButtonsContainer`);function f(e){if(!e)return``;if(e.includes(`drive.google.com`)||e.includes(`docs.google.com`)||e.includes(`googleusercontent.com`)){let t=e.match(/\/file\/d\/([^\/]+)/)||e.match(/[?&]id=([^&]+)/)||e.match(/\/d\/([^\/]+)/);if(t&&t[1])return`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${t[1]}`}return!e.includes(`/`)&&!e.includes(`.`)&&e.length>=15&&e.length<=60?`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${e}`:e}let p=document.createElement(`div`);p.className=`global-loader`,p.id=`global-loader`,p.innerHTML=`
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
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi database projects... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `,document.body.appendChild(p),s&&(s.innerHTML=Array.from({length:6}).map(()=>`
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
    `).join(``));let m=document.getElementById(`global-term-body`),h=document.getElementById(`term-step-1`),g,_;m&&(g=setTimeout(()=>{h&&h.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line info`,e.innerHTML=`<span style="color:#66d9ef">[PARSING]</span> Memetakan data & images proyek... <span class="skeleton-terminal-cursor"></span>`,m.appendChild(e)},600),_=setTimeout(()=>{m.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line success`,e.innerHTML=`<span style="color:#a6e22e">[SUCCESS]</span> Sinkronisasi database selesai. Memulai grid UI... <span class="skeleton-terminal-cursor"></span>`,m.appendChild(e)},1100));let v=[];try{let e=await n();e&&Array.isArray(e)&&(v=e.map(e=>{let t=e.images?e.images.map(e=>f(e)):[];return{...e,images:t}}))}catch(e){console.error(`Gagal mengambil data Projects:`,e)}if(clearTimeout(g),clearTimeout(_),p.classList.add(`fade-out`),setTimeout(()=>{p.remove()},400),!s)return;if(v.length===0){s.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Gagal mengambil data projects dari spreadsheet. Silakan refresh halaman.
      </div>
    `,c&&(c.innerHTML=`Menampilkan <span>0</span> dari 0 project`);return}let y=v.map(e=>{let t=(e.category||``).toLowerCase(),n=`website`;t.includes(`python`)?n=`python`:t.includes(`document`)||t.includes(`dokumen`)?n=`dokumentasi`:t.includes(`android`)&&(n=`android`);let r=a[e.id]||o[n]||`bi bi-grid`,i=e.overview||``,s=`project-details.html?id=${e.id}`;return{...e,kategori:n,icon:r,desc:i,link:s}}),b=`*`,x=`*`,S=``;function C(){let e=y.filter(e=>{let t=b===`*`||e.kategori===b,n=x===`*`||e.tech&&e.tech.includes(x),r=`${e.title} ${e.desc} ${(e.tech||[]).join(` `)}`.toLowerCase(),i=!S||r.includes(S);return t&&n&&i});if(c&&(c.innerHTML=`Menampilkan <span>${e.length}</span> dari ${y.length} project`),s.innerHTML=``,e.length===0){s.innerHTML=`
        <div style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
          🔍 Tidak ada proyek yang cocok dengan filter / pencarian Anda.
        </div>
      `;return}e.forEach((e,t)=>{let n=t%3*80,r=e.tech?`<div class="proj-card-tags" style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem;margin-bottom:1rem;">
             ${e.tech.map(e=>`<span style="font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--accent);background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);padding:0.1rem 0.4rem;border-radius:3px;">${e}</span>`).join(``)}
           </div>`:``;s.innerHTML+=`
      <div class="proj-card fade-in" style="transition-delay:${n}ms" data-kategori="${e.kategori}">
        <div class="proj-type">${i[e.kategori]||e.kategori}</div>
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
      </div>`}),document.querySelectorAll(`#proj-grid-container .fade-in`).forEach(e=>{setTimeout(()=>e.classList.add(`visible`),10)})}l&&l.addEventListener(`input`,e=>{S=e.target.value.toLowerCase().trim(),C()});function w(){let e=y.filter(e=>b===`*`||e.kategori===b),t=new Set;e.forEach(e=>{e.tech&&Array.isArray(e.tech)&&e.tech.forEach(e=>{e&&t.add(e)})});let n=Array.from(t).sort();if(x!==`*`&&!t.has(x)&&(x=`*`),d){d.innerHTML=``;let e=document.createElement(`button`);e.className=`filter-btn ${x===`*`?`active`:``}`,e.style.cssText=`padding:0.3rem 0.75rem;font-size:0.68rem;`,e.dataset.tech=`*`,e.textContent=`Semua`,e.addEventListener(`click`,function(){d.querySelectorAll(`.filter-btn`).forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),x=`*`,C()}),d.appendChild(e),n.forEach(e=>{let t=document.createElement(`button`);t.className=`filter-btn ${x===e?`active`:``}`,t.style.cssText=`padding:0.3rem 0.75rem;font-size:0.68rem;`,t.dataset.tech=e,t.textContent=e,t.addEventListener(`click`,function(){d.querySelectorAll(`.filter-btn`).forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),x=e,C()}),d.appendChild(t)})}}u.forEach(e=>{e.addEventListener(`click`,function(){u.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),b=this.dataset.filter,w(),C()})}),w(),C(),r(v,[])});