import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useFirestoreData } from './hooks/useFirestoreData.js';

// Layout & Common Components
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import CustomCursor from './components/common/CustomCursor.jsx';
import GlobalLoader from './components/common/GlobalLoader.jsx';
import WaModal from './components/common/WaModal.jsx';

// Pages
import ITPage from './pages/ITPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectsAdminPage from './pages/ProjectsAdminPage.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import CertificatesPage from './pages/CertificatesPage.jsx';

// Static Nav Data
import { itData } from './data/it-data.js';
import { adminData } from './data/admin-data.js';

export default function App() {
  const location = useLocation();
  const [waOpen, setWaOpen] = useState(false);

  const queryParams = new URLSearchParams(location.search);

  // Handle direct folder pathname access (especially on localhost where Vite doesn't redirect automatically)
  const browserPath = window.location.pathname;
  const cleanPath = browserPath.replace(/\/$/, ''); // remove trailing slash
  const base = browserPath.includes('/faizal-dwi-al-farizi') ? '/faizal-dwi-al-farizi' : '';
  const relativePath = base ? cleanPath.substring(base.length) : cleanPath;

  const isAdminPath = 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/projects-admin') || 
    location.pathname.startsWith('/project-admin') ||
    relativePath === '/admin' ||
    relativePath === '/projects-admin' ||
    relativePath === '/project-admin' ||
    queryParams.get('role') === 'admin';
  
  const role = isAdminPath ? 'admin' : 'user';
  const navLinks = isAdminPath ? adminData.navLinks : itData.navLinks;

  // Load Firestore data using custom hook (only load admin projects if on admin routes)
  const { projects, adminProjects, certificates, loading } = useFirestoreData(isAdminPath);

  // Redirect local pathname routes to hash routes to match GitHub Pages redirect behavior
  useEffect(() => {
    const redirectRoutes = ['/admin', '/projects', '/projects-admin', '/certificates'];
    if (redirectRoutes.includes(relativePath)) {
      window.location.replace(base + '/#' + relativePath + window.location.search + window.location.hash);
    }
  }, [relativePath, base]);

  // Scrollspy & fade-in animations trigger
  useEffect(() => {
    // Scroll to section if hash is present
    if (location.hash) {
      const targetEl = document.querySelector(location.hash);
      if (targetEl) {
        const timer = setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      // If navigating to page without hash, reset scroll to top
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  // Set up standard scroll animations observer (like animations.js)
  useEffect(() => {
    if (loading) return;

    // Intersection observer for fade-in animations
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08 });

    // Wait slightly to let DOM render
    const animTimer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));
    }, 200);

    return () => {
      clearTimeout(animTimer);
      fadeObs.disconnect();
    };
  }, [loading, location.pathname]);

  return (
    <>
      {/* Global simulated and actual database connection loader */}
      <GlobalLoader dbLoading={loading} />

      {/* Futuristic cursor with trail effects */}
      <CustomCursor isAdmin={isAdminPath} />

      {/* Navigation header */}
      <Navbar links={navLinks} role={role} />

      {/* Main viewport */}
      <main style={{ minHeight: '80vh', position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <ITPage 
                projects={projects} 
                adminProjects={adminProjects} 
                certificates={certificates} 
                onWaTriggerClick={() => setWaOpen(true)} 
                loading={loading}
              />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                projects={projects} 
                adminProjects={adminProjects} 
                certificates={certificates} 
                onWaTriggerClick={() => setWaOpen(true)} 
                loading={loading}
              />
            } 
          />
          <Route 
            path="/projects" 
            element={<ProjectsPage projects={projects} loading={loading} />} 
          />
          <Route 
            path="/projects-admin" 
            element={<ProjectsAdminPage adminProjects={adminProjects} loading={loading} />} 
          />
          <Route 
            path="/project/:id" 
            element={<ProjectDetail isAdmin={false} />} 
          />
          <Route 
            path="/project-admin/:id" 
            element={<ProjectDetail isAdmin={true} />} 
          />
          <Route 
            path="/certificates" 
            element={<CertificatesPage certificates={certificates} />} 
          />
        </Routes>
      </main>

      {/* Common Footer */}
      <Footer />

      {/* Contact modal overlay */}
      <WaModal isOpen={waOpen} onClose={() => setWaOpen(false)} />
    </>
  );
}
