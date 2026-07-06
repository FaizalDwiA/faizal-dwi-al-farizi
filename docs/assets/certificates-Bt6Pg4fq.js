import"./config-CM5qn_ja.js";import{a as e,i as t,n,o as r}from"./firestore-1_gg0Jdp.js";import{t as i}from"./sertifikat-B713RU8v.js";document.addEventListener(`DOMContentLoaded`,async()=>{r(),e();let a=new URLSearchParams(window.location.search).get(`role`)===`itsupport`,o=sessionStorage.getItem(`portfolio_role`)===`admin`;if(a){document.documentElement.style.setProperty(`--accent`,`#00ff66`),document.documentElement.style.setProperty(`--accent-rgb`,`0, 255, 102`),document.documentElement.style.setProperty(`--glow`,`0 0 20px rgba(0, 255, 102, 0.45)`),document.documentElement.style.setProperty(`--glow2`,`0 0 30px rgba(0, 255, 102, 0.2)`);let e=document.querySelector(`.nav-logo`);e&&e.setAttribute(`href`,`index.html`),document.querySelectorAll(`#navLinks a`).forEach(e=>{let t=e.getAttribute(`href`);t&&(t.includes(`#projects`)&&(t=t.replace(`#projects`,`#services`),e.textContent=`layanan`),t.includes(`certificates.html`)&&(t+=t.includes(`?`)?`&role=itsupport`:`?role=itsupport`),e.setAttribute(`href`,t))}),document.querySelectorAll(`.breadcrumb a`).forEach(e=>{let t=e.getAttribute(`href`);t&&t.includes(`index.html`)&&e.setAttribute(`href`,`index.html`)})}else if(o){let e=document.querySelector(`.nav-logo`);e&&e.setAttribute(`href`,`admin.html`),document.querySelectorAll(`#navLinks a`).forEach(e=>{let t=e.getAttribute(`href`);t&&t.includes(`index.html`)&&(t=t.replace(`index.html`,`admin.html`),e.setAttribute(`href`,t))}),document.querySelectorAll(`.breadcrumb a`).forEach(e=>{let t=e.getAttribute(`href`);t&&t.includes(`index.html`)&&(t=t.replace(`index.html`,`admin.html`),e.setAttribute(`href`,t))})}let s=document.getElementById(`sert-grid-container`);document.getElementById(`sertCount`);function c(e){if(!e)return``;if(e.includes(`drive.google.com`)||e.includes(`docs.google.com`)||e.includes(`googleusercontent.com`)){let t=e.match(/\/file\/d\/([^\/]+)/)||e.match(/[?&]id=([^&]+)/)||e.match(/\/d\/([^\/]+)/);if(t&&t[1])return`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${t[1]}`}return!e.includes(`/`)&&!e.includes(`.`)&&e.length>=15&&e.length<=60?`https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${e}`:e}let l=document.createElement(`div`);l.className=`global-loader`,l.id=`global-loader`,l.innerHTML=`
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
        <div class="skeleton-terminal-line info" id="term-step-1"><span style="color:var(--accent)">[FETCH]</span> Sinkronisasi database sertifikat... <span class="skeleton-terminal-cursor"></span></div>
      </div>
    </div>
  `,document.body.appendChild(l),s&&(s.innerHTML=Array.from({length:8}).map(()=>`
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
    `).join(``));let u=document.getElementById(`global-term-body`),d=document.getElementById(`term-step-1`),f,p;u&&(f=setTimeout(()=>{d&&d.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line info`,e.innerHTML=`<span style="color:#66d9ef">[PARSING]</span> Memetakan data & file gambar sertifikat... <span class="skeleton-terminal-cursor"></span>`,u.appendChild(e)},600),p=setTimeout(()=>{u.querySelectorAll(`.skeleton-terminal-cursor`).forEach(e=>e.remove());let e=document.createElement(`div`);e.className=`skeleton-terminal-line success`,e.innerHTML=`<span style="color:#a6e22e">[SUCCESS]</span> Sinkronisasi database selesai. Memulai grid UI... <span class="skeleton-terminal-cursor"></span>`,u.appendChild(e)},1100));let m=[];try{let e=await n();e&&Array.isArray(e)&&(m=e.map(e=>({...e,img:c(e.img)})))}catch(e){console.error(`Gagal mengambil data Sertifikat:`,e)}clearTimeout(f),clearTimeout(p),l.classList.add(`fade-out`),setTimeout(()=>{l.remove()},400),i(m),t([],m)});