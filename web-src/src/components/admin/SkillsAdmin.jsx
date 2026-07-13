import React, { useState, useEffect } from 'react';
import { adminData } from '../../data/admin-data.js';

export default function SkillsAdmin() {
  const { label, title, desc, categories } = adminData.skills;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills">
      <div className="section-inner">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>

        <div className="skills-grid-wrapper" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="skill-card fade-in visible">
              <div className="skill-card-header">
                <span className="icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
              </div>
              
              {cat.items.map((skill, itemIdx) => (
                <div key={itemIdx} className="skill-bar-wrap">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-fill" 
                      style={{ 
                        width: animate ? `${skill.pct}%` : '0%',
                        transition: 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
