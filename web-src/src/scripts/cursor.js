export function initCursor() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  
  if (!cur || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;

  // Track mouse coordinates
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Track hover status
  let isHovered = false;

  // ── DYNAMIC SCRAMBLE/DISINTEGRATION STATE ──
  let clickState = 'normal'; // 'normal', 'scrambling', 'compiling'
  let scrambleStartTime = 0;
  let compileStartTime = 0;
  const GLYPHS = '$%&?#@*!01x_';

  // ── CODE SNAKE CONFIG ──
  const SYMBOLS = ['</>', '{ }', '=>', ';', 'const', 'dev', '[]', '&&', '||', '++', '()', '$'];
  const segments = [];
  const totalSegments = SYMBOLS.length;
  
  // Container for trail segments
  const trailContainer = document.createElement('div');
  trailContainer.id = 'cursorTrailContainer';
  trailContainer.style.position = 'fixed';
  trailContainer.style.top = '0';
  trailContainer.style.left = '0';
  trailContainer.style.width = '100vw';
  trailContainer.style.height = '100vh';
  trailContainer.style.pointerEvents = 'none';
  trailContainer.style.zIndex = '9997';
  document.body.appendChild(trailContainer);

  // Spawn segments
  for (let i = 0; i < totalSegments; i++) {
    const el = document.createElement('span');
    el.className = 'cursor-segment';
    el.innerText = SYMBOLS[i];
    
    // Gradual taper & opacity fade for the tail
    const size = Math.max(9, 13 - i * 0.4);
    const opacity = Math.max(0.25, 0.8 - i * 0.05);
    el.style.fontSize = `${size}px`;
    el.style.opacity = opacity;
    
    trailContainer.appendChild(el);
    
    segments.push({
      el: el,
      x: mouseX,
      y: mouseY,
      size: size,
      baseOpacity: opacity,
      originalText: SYMBOLS[i]
    });
  }

  // ── CODE/KEYWORD EMITTER TRAIL CONFIG ──
  const trailWords = [];
  const CODE_KEYWORDS = [
    'const', 'let', 'function', 'return', 'import', 'export', 'class', 
    'if', 'else', 'for', 'while', '=>', '||', '&&', '++', '--', '===', 
    '<?php', 'echo', 'public', 'private', 'async', 'await', 'try', 'catch', 
    'git add', 'git commit', 'git push', 'npm run dev', 'composer install',
    'pip install', 'python', 'javascript', 'php', 'laravel', 'mysql', 'CI3',
    'node', 'npm', 'yarn', 'docker', 'nginx', 'api', 'json', 'null', 'true', 'false'
  ];

  let lastEmitX = mouseX;
  let lastEmitY = mouseY;
  const EMIT_DISTANCE = 35; // Spawn a word every 35px of movement

  function spawnTrailWord(x, y) {
    const word = CODE_KEYWORDS[Math.floor(Math.random() * CODE_KEYWORDS.length)];
    const el = document.createElement('span');
    el.className = 'cursor-trail-word';
    el.innerText = word;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    trailContainer.appendChild(el);

    const angle = (Math.random() - 0.5) * 0.5;
    const speedX = (Math.random() - 0.5) * 0.8;
    const speedY = -0.6 - Math.random() * 0.8; // float up

    trailWords.push({
      el: el,
      x: x,
      y: y,
      vx: speedX,
      vy: speedY,
      rotation: angle * 10,
      vRotation: (Math.random() - 0.5) * 0.8,
      opacity: 0.8,
      decay: 0.015 + Math.random() * 0.01
    });
  }

  // ── CLICK MUTATING GLITCH PARTICLES CONFIG ──
  const glitchParticles = [];
  const GLITCH_GLYPHS = ['0', '1', '[', ']', '{', '}', ';', '=>', '++', '--', '&&', '||', '!', '$', '?', '#', 'x', 'y', 'f', 'a'];

  document.addEventListener('click', e => {
    // 1. Trigger Scramble Disintegration State
    clickState = 'scrambling';
    scrambleStartTime = Date.now();
    
    // Hide main cursor and ring
    cur.classList.add('disintegrated');
    ring.classList.add('disintegrated');
    
    // Clear spammed click timeouts
    if (window.cursorScrambleTimeout) clearTimeout(window.cursorScrambleTimeout);
    if (window.cursorCompileTimeout) clearTimeout(window.cursorCompileTimeout);
    if (window.cursorNormalTimeout) clearTimeout(window.cursorNormalTimeout);
    
    // Compile transition (Starts after 500ms)
    window.cursorCompileTimeout = setTimeout(() => {
      clickState = 'compiling';
      compileStartTime = Date.now();
    }, 500);
    
    // Return to stable normal (Starts after compile seq finishes)
    window.cursorNormalTimeout = setTimeout(() => {
      clickState = 'normal';
      cur.classList.remove('disintegrated');
      ring.classList.remove('disintegrated');
    }, 500 + totalSegments * 45 + 120 + 50);

    // 2. Generate 15-20 Mutating Glitch Code Particles
    const count = 15 + Math.floor(Math.random() * 6);
    const colors = ['color-cyan', 'color-green', 'color-yellow', 'color-pink'];

    for (let i = 0; i < count; i++) {
      const glyph = GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
      const el = document.createElement('span');
      el.className = 'cursor-glitch-particle';
      el.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      el.innerText = glyph;
      
      const px = e.clientX;
      const py = e.clientY;
      el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      trailContainer.appendChild(el);
      
      // Radial explosion velocity
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 4.5;
      
      glitchParticles.push({
        el: el,
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: (Math.random() - 0.5) * 30,
        vRotation: (Math.random() - 0.5) * 3.0,
        scale: 1.0,
        vScale: -0.012 - Math.random() * 0.008,
        opacity: 1.0,
        decay: 0.012 + Math.random() * 0.008,
        mutateCounter: 0
      });
    }
  });

  // ── ANIMATION PHYSICS LOOP ──
  function updateAnimation() {
    // 1. Move lead dot (disabled/hidden visually when disintegrated but physics active)
    currentX += (mouseX - currentX) * 0.95;
    currentY += (mouseY - currentY) * 0.95;
    cur.style.transform = `translate3d(${currentX - 5}px, ${currentY - 5}px, 0)`;

    // 2. Move lag ring
    ringX += (mouseX - ringX) * 0.50;
    ringY += (mouseY - ringY) * 0.50;
    ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;

    // 3. Emit coding trail words based on movement distance (only if not disintegrated)
    const distDx = currentX - lastEmitX;
    const distDy = currentY - lastEmitY;
    const dist = Math.hypot(distDx, distDy);
    
    if (dist >= EMIT_DISTANCE && clickState === 'normal') {
      spawnTrailWord(currentX, currentY);
      lastEmitX = currentX;
      lastEmitY = currentY;
    }

    // 4. Move and Scramble/Compile code segments
    const spacing = isHovered ? 11 : 16;
    
    for (let i = 0; i < totalSegments; i++) {
      const seg = segments[i];
      
      const prevX = i === 0 ? currentX : segments[i - 1].x;
      const prevY = i === 0 ? currentY : segments[i - 1].y;
      
      const segmentDx = prevX - seg.x;
      const segmentDy = prevY - seg.y;
      const angle = Math.atan2(segmentDy, segmentDx);
      
      const targetX = prevX - Math.cos(angle) * spacing;
      const targetY = prevY - Math.sin(angle) * spacing;
      
      seg.x += (targetX - seg.x) * 0.65;
      seg.y += (targetY - seg.y) * 0.65;
      
      const sizeOffset = seg.size / 2;
      seg.el.style.transform = `translate3d(${seg.x - sizeOffset}px, ${seg.y - sizeOffset}px, 0)`;

      // SCRAMBLE / COMPILE PHYSICS STATE MACHINE
      if (clickState === 'scrambling') {
        const elapsed = Date.now() - scrambleStartTime;
        const ratio = Math.max(0, 1 - elapsed / 300);
        let rnd = '';
        for (let k = 0; k < seg.originalText.length; k++) {
          rnd += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        seg.el.innerText = rnd;
        seg.el.style.opacity = seg.baseOpacity * ratio;
      } else if (clickState === 'compiling') {
        const elapsed = Date.now() - compileStartTime;
        const delay = i * 45;
        if (elapsed < delay) {
          seg.el.style.opacity = '0';
        } else if (elapsed >= delay && elapsed < delay + 120) {
          const compileRatio = (elapsed - delay) / 120;
          let rnd = '';
          for (let k = 0; k < seg.originalText.length; k++) {
            rnd += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          seg.el.innerText = rnd;
          seg.el.style.opacity = seg.baseOpacity * compileRatio;
        } else {
          seg.el.innerText = seg.originalText;
          seg.el.style.opacity = seg.el.classList.contains('hovered') ? 1.0 : seg.baseOpacity;
        }
      } else {
        seg.el.innerText = seg.originalText;
        seg.el.style.opacity = seg.el.classList.contains('hovered') ? 1.0 : seg.baseOpacity;
      }
    }

    // 5. Update floating trail words
    for (let i = trailWords.length - 1; i >= 0; i--) {
      const w = trailWords[i];
      w.x += w.vx;
      w.y += w.vy;
      w.vy -= 0.02;
      w.rotation += w.vRotation;
      w.opacity -= w.decay;
      
      if (w.opacity <= 0) {
        w.el.remove();
        trailWords.splice(i, 1);
      } else {
        w.el.style.transform = `translate3d(${w.x}px, ${w.y}px, 0) rotate(${w.rotation}deg)`;
        w.el.style.opacity = w.opacity;
      }
    }

    // 6. Update glitch particles with physics & real-time character mutations
    for (let i = glitchParticles.length - 1; i >= 0; i--) {
      const p = glitchParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      // Dampen velocity with friction & pull slightly downward under gravity
      p.vx *= 0.93;
      p.vy *= 0.93;
      p.vy += 0.08; 
      
      p.rotation += p.vRotation;
      p.scale += p.vScale;
      p.opacity -= p.decay;
      
      if (p.opacity <= 0 || p.scale <= 0) {
        p.el.remove();
        glitchParticles.splice(i, 1);
      } else {
        // Mutate the character content of the glitch particle every 2 frames
        p.mutateCounter++;
        if (p.mutateCounter % 2 === 0) {
          p.el.innerText = GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
        }
        
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`;
        p.el.style.opacity = p.opacity;
      }
    }

    requestAnimationFrame(updateAnimation);
  }
  
  // Start loop
  requestAnimationFrame(updateAnimation);

  // ── HOVER INTERACTIONS (EVENT DELEGATION) ──
  document.addEventListener('mouseover', e => {
    const target = e.target.closest('a, button, .sert-card, .filter-btn, .social-btn, .contact-item-link, .about-card');
    if (target) {
      isHovered = true;
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(126, 231, 135, 0.8)';
      
      // Turn segments into green-glow state
      segments.forEach(seg => {
        seg.el.classList.add('hovered');
      });
    }
  });

  document.addEventListener('mouseout', e => {
    const target = e.target.closest('a, button, .sert-card, .filter-btn, .social-btn, .contact-item-link, .about-card');
    if (target) {
      isHovered = false;
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(0, 212, 255, 0.5)';
      
      // Restore segments to cyan state
      segments.forEach(seg => {
        seg.el.classList.remove('hovered');
      });
    }
  });
}

