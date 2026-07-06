/**
 * ── SECTION THEMATIC PARTICLE EMITTER SYSTEM ──
 * High-performance, GPU-accelerated background particles themed per section.
 * Automatically managed by IntersectionObserver (sleeps when off-screen).
 */

class SectionParticle {
  constructor(container, sectionId, containerWidth, containerHeight, isBurst = false) {
    this.container = container;
    this.sectionId = sectionId;
    this.cWidth = containerWidth;
    this.cHeight = containerHeight;
    this.isBurst = isBurst;

    this.el = document.createElement('span');
    this.el.className = 'section-particle';
    
    this.init(isBurst);
    this.container.appendChild(this.el);
  }

  init(isBurst = false) {
    this.opacity = 0;
    this.scale = 0.5 + Math.random() * 0.7;
    
    // Choose content & colors based on Section ID
    let items = [];
    let classes = [];
    let isEmoji = false;
    let specialClass = '';

    switch (this.sectionId) {
      case 'hero':
        // Matrix Code Rain
        items = ['0', '1', 'const', 'let', '=>', '{}', '[]', ';', 'FDA_F174', 'dev'];
        classes = ['color-cyan', 'color-dim', 'size-sm', 'size-md'];
        
        this.x = Math.random() * this.cWidth;
        this.y = isBurst ? Math.random() * this.cHeight : -20;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = 1.0 + Math.random() * 1.6; // falls down
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.wobbleRange = 0.5 + Math.random() * 1.5;
        this.wobbleOffset = Math.random() * 100;
        this.rotZ = 0;
        this.vRotZ = 0;
        break;

      case 'about':
        // Floating Bio Hologram Tags
        items = ['SELECT *', 'Laravel', 'Python', 'developer', 'CI3', 'MySQL', 'Sukoharjo', 'available: true', 'exp: 5+', 'coffee++'];
        classes = ['color-green', 'color-dim', 'size-sm', 'size-md', 'size-lg'];
        
        this.x = Math.random() * this.cWidth;
        this.y = isBurst ? Math.random() * this.cHeight : this.cHeight + 20;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -0.5 - Math.random() * 0.8; // floats up
        this.wobbleSpeed = 0.01 + Math.random() * 0.02;
        this.wobbleRange = 1.5 + Math.random() * 2.5;
        this.wobbleOffset = Math.random() * 100;
        this.rotY = (Math.random() - 0.5) * 30;
        this.rotZ = (Math.random() - 0.5) * 15;
        this.vRotY = (Math.random() - 0.5) * 0.5;
        this.vRotZ = (Math.random() - 0.5) * 0.2;
        break;

      case 'skills':
        // Bubbling Tech Stacks
        items = ['PHP', 'JS', 'Python', 'Laravel', 'CI3', 'MySQL', 'CSS', 'HTML', 'Git', 'Yarn', '💻', '🌐', '🚀', '⚙️'];
        classes = ['color-cyan', 'color-green', 'color-yellow', 'size-sm', 'size-md', 'size-lg'];
        
        this.x = Math.random() * this.cWidth;
        this.y = isBurst ? Math.random() * this.cHeight : this.cHeight + 30;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -0.6 - Math.random() * 1.0; // bubbles up
        this.wobbleSpeed = 0.03 + Math.random() * 0.04;
        this.wobbleRange = 2.0 + Math.random() * 4.0;
        this.wobbleOffset = Math.random() * 100;
        this.rotZ = (Math.random() - 0.5) * 20;
        this.vRotZ = (Math.random() - 0.5) * 0.8;
        break;

      case 'experience':
        // Timeline Commit Elements
        items = ['✓', 'git commit', 'git push', 'merge', 'pull', 'branch', '⏰', '📅', '💼', '🚀'];
        classes = ['color-green', 'color-yellow', 'color-dim', 'size-sm', 'size-md'];
        
        this.x = Math.random() * this.cWidth;
        this.y = isBurst ? Math.random() * this.cHeight : this.cHeight + 20;
        this.vx = -0.2 - Math.random() * 0.5; // drifts left
        this.vy = -0.4 - Math.random() * 0.8; // floats up
        this.wobbleSpeed = 0.015 + Math.random() * 0.025;
        this.wobbleRange = 4.0 + Math.random() * 6.0; // wide sway
        this.wobbleOffset = Math.random() * 100;
        this.rotZ = 0;
        this.vRotZ = 0;
        break;

      case 'projects':
        // 3D Rotating Code/Engineering Elements
        items = ['📁', '💻', '⚙️', '</>', '★', 'app', 'web', 'db', 'code', 'deploy'];
        classes = ['color-cyan', 'color-pink', 'color-dim', 'size-md', 'size-lg'];
        
        this.x = Math.random() * this.cWidth;
        this.y = isBurst ? Math.random() * this.cHeight : this.cHeight + 30;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -0.4 - Math.random() * 0.6; // slow floating up
        this.wobbleSpeed = 0.01 + Math.random() * 0.015;
        this.wobbleRange = 2.0 + Math.random() * 3.0;
        this.wobbleOffset = Math.random() * 100;
        this.rotX = Math.random() * 360;
        this.rotY = Math.random() * 360;
        this.rotZ = Math.random() * 360;
        this.vRotX = (Math.random() - 0.5) * 1.5;
        this.vRotY = (Math.random() - 0.5) * 1.5;
        this.vRotZ = (Math.random() - 0.5) * 0.5;
        break;

      case 'sertifikat':
        // Hujan Piala / Trophy Rain!
        items = ['🏆', '🏅', '⭐', '📜', '✨'];
        isEmoji = true;
        specialClass = 'emoji-trophy';
        
        this.x = Math.random() * this.cWidth;
        // On click/scroll burst, spread throughout heights; ambient rain starts at top
        this.y = isBurst ? Math.random() * this.cHeight * 0.7 - 50 : -40;
        this.vx = (Math.random() - 0.5) * 1.5; // wider lateral spread
        this.vy = isBurst ? 2.5 + Math.random() * 4.0 : 1.2 + Math.random() * 2.2; // falls down rapidly
        this.wobbleSpeed = 0.04 + Math.random() * 0.05;
        this.wobbleRange = 2.0 + Math.random() * 4.0;
        this.wobbleOffset = Math.random() * 100;
        this.rotZ = Math.random() * 360;
        this.vRotZ = (Math.random() - 0.5) * 5.0; // spins faster
        break;

      case 'contact':
        // Floating Communications (planes, envelopes, chat)
        items = ['✉️', '✈️', '💬', '📞', '👋'];
        isEmoji = true;
        specialClass = 'emoji-comm';
        
        this.x = Math.random() * this.cWidth;
        this.y = isBurst ? Math.random() * this.cHeight : this.cHeight + 30;
        // Diagonal flight: up and slightly right
        this.vx = 0.3 + Math.random() * 0.8;
        this.vy = -0.5 - Math.random() * 0.9;
        this.wobbleSpeed = 0.02 + Math.random() * 0.02;
        this.wobbleRange = 3.0 + Math.random() * 5.0;
        this.wobbleOffset = Math.random() * 100;
        this.rotZ = -30 + (Math.random() - 0.5) * 15; // angled flight
        this.vRotZ = (Math.random() - 0.5) * 0.3;
        break;
    }

    const content = items[Math.floor(Math.random() * items.length)];
    this.el.innerText = content;

    // Detect if content is an emoji
    const emojiRegex = /\p{Emoji}/u;
    if (isEmoji || emojiRegex.test(content)) {
      this.el.classList.add('is-emoji');
      if (specialClass) this.el.classList.add(specialClass);
    } else {
      classes.forEach(c => this.el.classList.add(c));
    }

    this.render();
  }

  update(cWidth, cHeight) {
    this.cWidth = cWidth;
    this.cHeight = cHeight;

    // Physics movement
    this.x += this.vx;
    this.y += this.vy;

    // Add gentle sinuous sway/wobble
    this.wobbleOffset += this.wobbleSpeed;
    const sway = Math.sin(this.wobbleOffset) * this.wobbleRange;
    let actualX = this.x + sway;

    // Apply rotation dynamics
    if (this.vRotX) this.rotX += this.vRotX;
    if (this.vRotY) this.rotY += this.vRotY;
    if (this.vRotZ) this.rotZ += this.vRotZ;

    // Boundary check / Reset / Opacity calculations
    let isDead = false;

    // HERO & SERTIFIKAT fall DOWN. Others float UP.
    if (this.sectionId === 'hero' || this.sectionId === 'sertifikat') {
      // Fade in at top, fade out near bottom
      if (this.y < 80) {
        this.opacity = Math.min(1.0, this.y / 80);
      } else if (this.y > this.cHeight - 120) {
        this.opacity = Math.max(0, (this.cHeight - this.y) / 120);
      } else {
        this.opacity = 1.0;
      }
      
      if (this.y > this.cHeight + 40 || this.x < -40 || this.x > this.cWidth + 40) {
        isDead = true;
      }
    } else {
      // Floating upwards: fade in at bottom, fade out near top
      if (this.y > this.cHeight - 80) {
        this.opacity = Math.min(1.0, (this.cHeight - this.y) / 80);
      } else if (this.y < 120) {
        this.opacity = Math.max(0, this.y / 120);
      } else {
        this.opacity = 1.0;
      }

      if (this.y < -40 || this.x < -40 || this.x > this.cWidth + 40) {
        isDead = true;
      }
    }

    if (isDead) {
      if (this.isBurst) {
        // Burst particles are removed upon death
        this.el.remove();
        return false;
      } else {
        // Ambient particles are recycled
        this.init(false);
      }
    }

    this.render(actualX);
    return true;
  }

  render(renderedX = this.x) {
    let transformStr = `translate3d(${renderedX}px, ${this.y}px, 0) scale(${this.scale})`;
    
    if (this.rotX || this.rotY || this.rotZ) {
      if (this.rotX) transformStr += ` rotateX(${this.rotX}deg)`;
      if (this.rotY) transformStr += ` rotateY(${this.rotY}deg)`;
      if (this.rotZ) transformStr += ` rotateZ(${this.rotZ}deg)`;
    }

    this.el.style.transform = transformStr;
    this.el.style.opacity = this.opacity;
  }

  destroy() {
    this.el.remove();
  }
}

class SectionParticleEmitter {
  constructor(section) {
    this.section = section;
    this.sectionId = section.getAttribute('id');
    this.particles = [];
    this.isActive = false;
    this.rafId = null;

    // Build container
    this.container = document.createElement('div');
    this.container.className = 'section-particle-container';
    
    // Inject at the very beginning of the section (background)
    this.section.insertBefore(this.container, this.section.firstChild);

    // Track size
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // Detect mobile for density limit
    this.isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    this.maxParticles = this.isMobile ? 6 : 13;
    if (this.sectionId === 'sertifikat') {
      this.maxParticles = this.isMobile ? 8 : 16;
    }
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;

    // Update dimensions
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // On start, fill with initial items in random heights
    const initialCount = Math.floor(this.maxParticles * 0.7);
    for (let i = 0; i < initialCount; i++) {
      this.particles.push(new SectionParticle(this.container, this.sectionId, this.width, this.height, false));
      // Randomize initial positions in height
      const p = this.particles[i];
      p.y = Math.random() * this.height;
    }

    // Special Burst for Certifications (Trophy rain explosion!)
    if (this.sectionId === 'sertifikat') {
      this.triggerTrophyBurst();
    }

    // Start physics loop
    this.loop = this.loop.bind(this);
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop() {
    if (!this.isActive) return;
    this.isActive = false;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    // Completely clear all DOM elements to save memory and layout calculation
    this.particles.forEach(p => p.destroy());
    this.particles = [];
  }

  triggerTrophyBurst() {
    const burstCount = this.isMobile ? 12 : 24;
    for (let i = 0; i < burstCount; i++) {
      this.particles.push(new SectionParticle(this.container, this.sectionId, this.width, this.height, true));
    }
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.isMobile = window.innerWidth < 768;
    this.maxParticles = this.isMobile ? 6 : 13;
    if (this.sectionId === 'sertifikat') {
      this.maxParticles = this.isMobile ? 8 : 16;
    }
  }

  loop() {
    if (!this.isActive) return;

    // Add ambient particles if count is below maximum
    const ambientCount = this.particles.filter(p => !p.isBurst).length;
    if (ambientCount < this.maxParticles && Math.random() < 0.08) {
      this.particles.push(new SectionParticle(this.container, this.sectionId, this.width, this.height, false));
    }

    // Update positions and filter dead particles
    this.particles = this.particles.filter(p => {
      const alive = p.update(this.width, this.height);
      return alive;
    });

    this.rafId = requestAnimationFrame(this.loop);
  }
}

export function initSectionParticles() {
  const sections = document.querySelectorAll('#hero, #about, #skills, #experience, #projects, #sertifikat, #contact');
  if (sections.length === 0) return;

  const emitters = [];

  // Initialize emitter for each section
  sections.forEach(sec => {
    emitters.push(new SectionParticleEmitter(sec));
  });

  // Observe section entry and exit of viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const emitter = emitters.find(em => em.section === e.target);
      if (!emitter) return;

      if (e.isIntersecting) {
        emitter.start();
      } else {
        emitter.stop();
      }
    });
  }, {
    threshold: 0.03 // Starts animating as soon as 3% of the section is visible
  });

  sections.forEach(sec => observer.observe(sec));

  // Handle screen resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      emitters.forEach(em => em.resize());
    }, 150);
  });
}
