import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Projects from '../components/sections/Projects.jsx';

export default function ProjectsAdminPage({ adminProjects = [], loading = false }) {
  useEffect(() => {
    document.title = "Admin & Excel Projects — Faizal Dwi Al Farizi";
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Admin & Excel Projects</h1>
          <div className="breadcrumb">
            <Link to="/admin">Home</Link>
            <span className="sep">/</span>
            <span>Projects Archive</span>
          </div>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <section id="projects" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="section-inner">
          <p className="section-desc" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Arsip lengkap seluruh proyek pengelolaan data, spreadsheets (Excel/Google Sheets), serta pekerjaan administrasi yang telah saya selesaikan. Gunakan fitur pencarian di bawah.
          </p>

          <Projects 
            projects={adminProjects} 
            showSearch={true} 
            isGallery={true} 
            detailUrlPrefix="/project-admin"
            role="admin"
            loading={loading}
          />
        </div>
      </section>
    </>
  );
}
