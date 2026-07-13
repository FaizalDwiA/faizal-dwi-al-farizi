import React, { useState, useEffect } from 'react';
import HeroAdmin from '../components/admin/HeroAdmin.jsx';
import AboutAdmin from '../components/admin/AboutAdmin.jsx';
import SkillsAdmin from '../components/admin/SkillsAdmin.jsx';
import Experience from '../components/sections/Experience.jsx';
import ServicesAdmin from '../components/admin/ServicesAdmin.jsx';
import Projects from '../components/sections/Projects.jsx';
import Certificates from '../components/sections/Certificates.jsx';
import Contact from '../components/sections/Contact.jsx';
import { adminData } from '../data/admin-data.js';

export default function AdminPage({ projects = [], adminProjects = [], certificates = [], onWaTriggerClick, loading = false }) {
  const [toggleState, setToggleState] = useState('admin'); // 'admin' | 'software'

  useEffect(() => {
    document.title = adminData.meta.title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', adminData.meta.description);
    }
  }, []);

  const displayedProjects = toggleState === 'admin' ? adminProjects : projects;
  const detailUrlPrefix = toggleState === 'admin' ? '/project-admin' : '/project';

  return (
    <>
      <HeroAdmin projectCount={adminProjects.length} certificateCount={certificates.length} />
      <AboutAdmin />
      <SkillsAdmin />
      <Experience 
        experience={adminData.experience} 
        education={adminData.education} 
        certTags={adminData.certTags} 
      />
      <ServicesAdmin />
      <Projects 
        projects={displayedProjects} 
        limit={6} 
        showAdminToggle={adminProjects.length > 0 || projects.length > 0}
        adminToggleState={toggleState}
        onAdminToggleChange={setToggleState}
        detailUrlPrefix={detailUrlPrefix}
        role="admin"
        loading={loading}
      />
      <Certificates 
        certificates={certificates} 
        limit={4} 
        role="admin"
      />
      <Contact onWaTriggerClick={onWaTriggerClick} />
    </>
  );
}
