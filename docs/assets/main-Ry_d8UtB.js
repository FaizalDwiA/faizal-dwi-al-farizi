import"./config-CM5qn_ja.js";import{a as e,i as t,n,r,t as i}from"./firestore-VnQBJDOl.js";import{t as a}from"./sertifikat-B713RU8v.js";var o={website:`Website`,python:`Python`,dokumentasi:`Dokumentasi`,webview:`Webview`},s={siWeb:`bi bi-person-bounding-box`,websiteKelas:`bi bi-book`,enkripsiDekripsiPublic:`bi bi-shield-check`,tayokasiNyahNur:`bi bi-shop`,playSF:`bi bi-volume-up`,eKinerja:`bi bi-bar-chart`,utsSemester3:`bi bi-book`,websiteCrackSmadavPro:`bi bi-bug`,colorsW3S:`bi bi-palette`,proklimPurbayan:`bi bi-person-circle`,capFabi:`bi bi-chat-left-text`,conPyXelin:`bi bi-terminal`,transYou:`bi bi-collection-play`,gaexhid:`bi bi-file-earmark-lock2`,conPyXeWin:`bi bi-terminal-fill`,downVid:`bi bi-download`,qrCodePython:`bi bi-qr-code`,textImagePython:`bi bi-card-image`,enTeks:`bi bi-shield-lock`,downloadWebsitePython:`bi bi-cloud-download`,dokumentasiVBS:`bi bi-file-earmark-code`,dokumentasiCSSFlexbox:`bi bi-grid`,dokumentasiPHPDasar:`bi bi-file-earmark-code`,dokumentasiLaravel:`bi bi-file-earmark-code`,dokumentasiGit:`bi bi-git`,dokumentasiJavaScriptPZN:`bi bi-browser-chrome`,dokumentasiDatabasePZN:`bi bi-database`,dokumentasiPHPDasarPZN:`bi bi-file-earmark-code`,dokumentasiPHPOOPPZN:`bi bi-file-earmark-code`,dokumentasiGitPZN:`bi bi-git`,dokumentasiPython:`bi bi-file-earmark-code`,dokumentasiPhotoshop:`bi bi-image`},c={website:`bi bi-globe`,python:`bi bi-terminal`,dokumentasi:`bi bi-file-earmark-code`,webview:`bi bi-phone`};function l(e){let t=document.getElementById(`proj-grid-container`),n=document.getElementById(`projCount`),r=document.querySelectorAll(`#projFilterBar .filter-btn`),i=document.querySelectorAll(`#techFilterBar .filter-btn`);if(!t)return;if(!e||e.length===0){t.innerHTML=`
      <div style="grid-column:1/-1;text-align:center;padding:3rem 0;color:var(--text-muted);font-family:'JetBrains Mono',monospace;">
        ❌ Gagal mengambil data projects dari spreadsheet. Silakan refresh halaman.
      </div>
    `,n&&(n.innerHTML=`Menampilkan <span>0</span> dari 0 project`);return}let a=e.map(e=>{let t=(e.category||``).toLowerCase(),n=`website`;t.includes(`python`)?n=`python`:t.includes(`document`)||t.includes(`dokumen`)?n=`dokumentasi`:t.includes(`webview`)&&(n=`webview`);let r=s[e.id]||c[n]||`bi bi-grid`,i=e.overview||``,a=`project-details.html?id=${e.id}`;return{...e,kategori:n,icon:r,desc:i,link:a}}),l=`*`,u=`*`;function d(){let e=a.filter(e=>{let t=l===`*`||e.kategori===l,n=u===`*`||e.tech&&e.tech.includes(u);return t&&n});n&&(n.innerHTML=`Menampilkan <span>${e.length}</span> dari ${a.length} project`),t.innerHTML=``,e.forEach((e,n)=>{let r=n%3*80,i=e.tech?`<div class="proj-card-tags" style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem;margin-bottom:1rem;">
             ${e.tech.map(e=>`<span style="font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--accent);background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);padding:0.1rem 0.4rem;border-radius:3px;">${e}</span>`).join(``)}
           </div>`:``;t.innerHTML+=`
      <div class="proj-card fade-in" style="transition-delay:${r}ms" data-kategori="${e.kategori}">
        <div class="proj-type">${o[e.kategori]||e.kategori}</div>
        <div class="proj-icon-row">
          <i class="${e.icon}" style="font-size:1.5rem;color:var(--accent);margin-bottom:0.6rem;display:block"></i>
        </div>
        <div class="proj-name">${e.title}</div>
        ${i}
        <div class="proj-desc">${e.desc}</div>
        <div style="margin-top:auto;padding-top:1rem">
          <a href="${e.link}" class="proj-btn">
            Detail Project <span class="arrow">→</span>
          </a>
        </div>
      </div>`}),document.querySelectorAll(`#proj-grid-container .fade-in`).forEach(e=>{setTimeout(()=>e.classList.add(`visible`),10)})}r.forEach(e=>{e.addEventListener(`click`,function(){r.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),l=this.dataset.filter,d()})}),i.forEach(e=>{e.addEventListener(`click`,function(){i.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`),u=this.dataset.tech,d()})}),d()}function u(e){if(!e)return``;if(e.includes(`drive.google.com`)||e.includes(`docs.google.com`)||e.includes(`googleusercontent.com`)){let t=e.match(/\/file\/d\/([^\/]+)/)||e.match(/[?&]id=([^&]+)/)||e.match(/\/d\/([^\/]+)/);if(t&&t[1])return`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${t[1]}`}return!e.includes(`/`)&&!e.includes(`.`)&&e.length>=15&&e.length<=60?`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${e}`:e}document.addEventListener(`DOMContentLoaded`,async()=>{e();let o=document.createElement(`div`);o.className=`global-loader`,o.id=`global-loader`,o.innerHTML=`
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
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi data dari Firebase Firestore... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `,document.body.appendChild(o);let s=document.getElementById(`proj-grid-container`);s&&(s.innerHTML=Array.from({length:3}).map(()=>`
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
    `).join(``));let c=document.getElementById(`sert-grid-container`);c&&(c.innerHTML=Array.from({length:4}).map(()=>`
      <div class="skeleton-sert-card sert-card" style="cursor: default;">
        <div class="skeleton-scanner"></div>
        <div class="sert-img-wrap" style="position:relative;">
          <div class="skeleton-shimmer" style="width:100%; height:100%;"></div>
        </div>
        <div class="sert-body">
          <div class="sert-meta">
            <span class="skeleton-line skeleton-shimmer" style="width: 40%; height: 9px; border-radius: 4px; margin-bottom: 0.4rem;"></span>
          </div>
          <div class="sert-title">
            <span class="skeleton-line skeleton-shimmer" style="width: 80%; height: 13px; border-radius: 4px;"></span>
          </div>
        </div>
      </div>
    `).join(``));let d=document.getElementById(`global-term-body`),f=document.getElementById(`term-step-1`),p,m;d&&(p=setTimeout(()=>{f&&f.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line info`,e.innerHTML=`<span style="color:#66d9ef">[PARSING]</span> Memetakan objek proyek & sertifikat... <span class="skeleton-terminal-cursor"></span>`,d.appendChild(e)},600),m=setTimeout(()=>{d.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line success`,e.innerHTML=`<span style="color:#a6e22e">[SUCCESS]</span> Sinkronisasi database selesai. Memulai render UI... <span class="skeleton-terminal-cursor"></span>`,d.appendChild(e)},1100));let h=[],g=[];try{let[e,t]=await Promise.all([n().catch(e=>(console.error(`Gagal mengambil data Projects:`,e),null)),i().catch(e=>(console.error(`Gagal mengambil data Sertifikat:`,e),null))]);e&&Array.isArray(e)&&(h=e.map(e=>{let t=e.images?e.images.map(e=>u(e)):[];return{...e,images:t}})),t&&Array.isArray(t)&&(g=t.map(e=>({...e,img:u(e.img)})))}catch(e){console.error(`Gagal mengambil data dari Firebase Firestore:`,e)}if(clearTimeout(p),clearTimeout(m),o.classList.add(`fade-out`),setTimeout(()=>{o.remove()},400),l(h.slice(0,6)),a(g.slice(0,4)),t(),r(h,g),window.location.hash){let e=document.querySelector(window.location.hash);e&&setTimeout(()=>{e.scrollIntoView({behavior:`auto`,block:`start`})},150)}let _=document.getElementById(`runDiagBtn`),v=document.getElementById(`termContent`);if(_&&v){let e=v.innerHTML,t=!1;_.addEventListener(`click`,()=>{if(t)return;t=!0,_.disabled=!0,_.innerHTML=`<i class="bi bi-hourglass-split"></i> DIAGNOSING...`,v.innerHTML=``;let n=[{text:`$ ./excel_and_system_audit.sh --mode=active`,type:`cmd`,delay:200},{text:`Memulai verifikasi integritas data & kesiapan sistem IT...`,type:`info`,delay:600},{text:`[EXCEL] Memeriksa tautan workbook & data sheet... <span class="term-success">[ OK ]</span>`,type:`info`,delay:800},{text:`[EXCEL] Validasi formula VLOOKUP, INDEX/MATCH, Pivot Table... <span class="term-success">[ VALID ]</span>`,type:`info`,delay:600},{text:`[STOCK] Sinkronisasi data stok fisik vs arsip digital... <span class="term-success">[ 100% MATCH ]</span>`,type:`info`,delay:1e3},{text:`[CPU] Pemindaian core prosesor PC Admin... <span class="term-success">[ OK ]</span>`,type:`info`,delay:600},{text:`[PRINTER] Memeriksa koneksi sharing printer & LAN... <span class="term-success">[ ONLINE ]</span>`,type:`info`,delay:900},{text:`[BACKUP] Verifikasi skema backup data arsip otomatis... <span class="term-success">[ SECURE ]</span>`,type:`info`,delay:800},{text:`<span class="term-success" style="font-weight:bold;">Integritas data Excel & sistem IT 100% optimal! Seluruh tes berhasil dilalui.</span>`,type:`success`,delay:800},{text:`<button id="backToProfileBtn" class="terminal-diag-btn" style="margin-top:0.8rem; font-size:0.6rem;"><i class="bi bi-arrow-left"></i> KEMBALI KE PROFIL</button>`,type:`action`,delay:400}],r=0;function i(){if(r>=n.length){let n=document.getElementById(`backToProfileBtn`);n&&n.addEventListener(`click`,()=>{v.innerHTML=e,_.disabled=!1,_.innerHTML=`<i class="bi bi-cpu"></i> RUN DIAGNOSTICS`,t=!1});return}let a=n[r],o=document.createElement(`div`);a.type===`cmd`?(o.style.color=`#fff`,o.style.fontWeight=`bold`):a.type===`success`&&(o.style.marginTop=`0.5rem`),o.innerHTML=a.text,v.appendChild(o);let s=document.getElementById(`termBody`);s&&(s.scrollTop=s.scrollHeight),r++,setTimeout(i,a.delay)}i()})}});