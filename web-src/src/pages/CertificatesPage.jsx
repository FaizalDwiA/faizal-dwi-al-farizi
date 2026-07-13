import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Certificates from '../components/sections/Certificates.jsx';

export default function CertificatesPage({ certificates = [] }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cameFromAdmin = queryParams.get('role') === 'admin';

  useEffect(() => {
    document.title = "Certificates Archive — Faizal Dwi Al Farizi";
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Certificates Archive</h1>
          <div className="breadcrumb">
            <Link to={cameFromAdmin ? "/admin" : "/"}>Home</Link>
            <span className="sep">/</span>
            <span>Certificates Gallery</span>
          </div>
        </div>
      </div>

      {/* CERTIFICATES SECTION */}
      <div style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <Certificates 
          certificates={certificates} 
          showFilters={true} 
          role={cameFromAdmin ? 'admin' : 'user'}
        />
      </div>
    </>
  );
}
