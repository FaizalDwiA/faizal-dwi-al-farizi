import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';

export default function Navbar({ links = [], role = 'user' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === '/' || location.pathname === '/admin';

  // Get active section using scroll spy
  const sectionIds = links.map(link => link.href.replace('#', '')).filter(Boolean);
  const activeSection = useScrollSpy(sectionIds);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (e, href) => {
    setMenuOpen(false);
    if (isMainPage && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Update hash in URL manually without changing the router path
      const baseHash = location.pathname === '/admin' ? '#/admin' : '#/';
      window.location.hash = `${baseHash}#${targetId}`;
    }
  };

  // Determine prefix based on role
  const mainPath = role === 'admin' ? '/admin' : '/';

  return (
    <nav>
      <Link to={mainPath} className="nav-logo" style={{ textDecoration: 'none' }} onClick={(e) => handleLinkClick(e, mainPath)}>
        <span>&lt;</span>FDA_F174<span>/&gt;</span>
      </Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
        {links.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = isMainPage && activeSection === sectionId;
          
          if (isMainPage) {
            return (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className={isActive ? 'active' : ''}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            );
          } else {
            return (
              <li key={link.label}>
                <Link 
                  to={`${mainPath}${link.href}`}
                  onClick={(e) => handleLinkClick(e, `${mainPath}${link.href}`)}
                >
                  {link.label}
                </Link>
              </li>
            );
          }
        })}
      </ul>

      <div className="nav-status">
        <div className="status-dot"></div>بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
      </div>

      <button 
        className={`nav-toggle ${menuOpen ? 'active' : ''}`} 
        id="navToggle" 
        onClick={toggleMenu}
        aria-label="menu"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
