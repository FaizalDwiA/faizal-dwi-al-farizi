import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Projects from '../components/sections/Projects.jsx';

export default function ProjectsPage({ projects = [], loading = false }) {
  useEffect(() => {
    document.title = "Web & App Projects — Faizal Dwi Al Farizi";
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Web & App Projects</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span>Projects Archive</span>
          </div>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <section id="projects" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="section-inner">
          <p className="section-desc" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Arsip lengkap seluruh proyek pembuatan website, software engineering, rekayasa otomasi Python, serta webview yang telah saya kerjakan. Gunakan filter di bawah.
          </p>

          <Projects 
            projects={projects} 
            showFilters={true} 
            isGallery={true} 
            detailUrlPrefix="/project"
            role="user"
            loading={loading}
          />
        </div>
      </section>
    </>
  );
}
