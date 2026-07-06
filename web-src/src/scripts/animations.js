export function initAnimations(projectsList, sertifikatList) {
  // ── 1. ACTIVE NAV HIGHLIGHTING ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    let current = '';
    const scrollPos = window.scrollY;

    // Premium touch: If at the bottom of the page, force "contact" to be active
    if ((window.innerHeight + scrollPos) >= document.documentElement.scrollHeight - 60) {
      current = 'contact';
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 160; // Offset for fixed nav
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
    }

    // Default to the first section (usually hero) if scroll is at the very top
    if (!current && sections.length > 0) {
      current = sections[0].getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Trigger initially

  // ── 2. MOBILE HAMBURGER TOGGLE ──
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ── 3. STATS COUNTER ANIMATION ──
  function animCount(el, target, dur) {
    if (!el) return;
    let start = 0;
    const step = target / (dur / 16);
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start) + '+';
      if (start >= target) {
        clearInterval(interval);
      }
    }, 16);
  }

  let counted = false;
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const counterObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        animCount(document.getElementById('statProj'), (projectsList || []).length, 1200);
        animCount(document.getElementById('statSert'), (sertifikatList || []).length, 1400);
      }
    });
    counterObs.observe(heroSection);
  }

  // ── 4. SCROLL FADE-IN ──
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08
  });
  document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

  // ── 5. SKILL BARS PROGRESS FILL ──
  const skillBarObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(f => {
          f.style.width = f.dataset.pct + '%';
        });
      }
    });
  }, {
    threshold: 0.2
  });
  document.querySelectorAll('.skill-card').forEach(c => skillBarObs.observe(c));
}
