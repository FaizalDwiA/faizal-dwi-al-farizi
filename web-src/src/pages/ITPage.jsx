import React, { useState, useEffect } from 'react';
import HeroIT from '../components/it/HeroIT.jsx';
import AboutIT from '../components/it/AboutIT.jsx';
import SkillsIT from '../components/it/SkillsIT.jsx';
import Experience from '../components/sections/Experience.jsx';
import ServicesIT from '../components/it/ServicesIT.jsx';
import Projects from '../components/sections/Projects.jsx';
import Certificates from '../components/sections/Certificates.jsx';
import Contact from '../components/sections/Contact.jsx';
import { itData } from '../data/it-data.js';

export default function ITPage({ projects = [], adminProjects = [], certificates = [], onWaTriggerClick, loading = false }) {
  const [toggleState, setToggleState] = useState('software'); // 'software' | 'admin'

  useEffect(() => {
    document.title = itData.meta.title;
    
    // Update meta description dynamically for SEO
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', itData.meta.description);
    }
  }, []);

  const displayedProjects = toggleState === 'software' ? projects : adminProjects;
  const detailUrlPrefix = toggleState === 'admin' ? '/project-admin' : '/project';

  return (
    <>
      <HeroIT projectCount={projects.length} certificateCount={certificates.length} />
      <AboutIT />
      <SkillsIT />
      <Experience 
        experience={itData.experience} 
        education={itData.education} 
        certTags={itData.certTags} 
      />
      <ServicesIT />
      <Projects 
        projects={displayedProjects} 
        limit={6} 
        showAdminToggle={adminProjects.length > 0 || projects.length > 0}
        adminToggleState={toggleState}
        onAdminToggleChange={setToggleState}
        detailUrlPrefix={detailUrlPrefix}
        role="user"
        loading={loading}
      />
      <Certificates 
        certificates={certificates} 
        limit={4} 
        role="user"
      />
      <Contact onWaTriggerClick={onWaTriggerClick} />
    </>
  );
}
