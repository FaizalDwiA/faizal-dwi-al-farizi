import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Batasi pemunculan hanya pada rute tertentu
  const showOnPaths = ['/projects', '/projects-admin', '/certificates'];
  const isTargetPage = 
    showOnPaths.includes(location.pathname) ||
    location.pathname.startsWith('/project/') ||
    location.pathname.startsWith('/project-admin/');

  useEffect(() => {
    if (!isTargetPage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Hitung persentase scroll
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(percent);

      // Munculkan tombol jika scroll melebihi 300px
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTargetPage, location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isTargetPage) return null;

  // Matematika SVG Circle: radius r=18, keliling C = 2 * PI * r ≈ 113.1
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button 
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <svg className="progress-ring" width="46" height="46" viewBox="0 0 46 46">
        <circle 
          className="progress-ring-bg"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="23"
          cy="23"
        />
        <circle 
          className="progress-ring-circle"
          stroke="var(--accent)"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="23"
          cy="23"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="arrow-icon">▲</span>
    </button>
  );
}
