import { useState, useEffect } from 'react';
import { fetchProjects, fetchCertificates, fetchAdminProjects } from '../firebase/firestore.js';

export function formatDriveImageUrl(url) {
  if (!url) return '';
  if (url.includes('drive.google.com') || url.includes('docs.google.com') || url.includes('googleusercontent.com')) {
    const matchId = url.match(/\/file\/d\/([^\/]+)/) || url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^\/]+)/);
    if (matchId && matchId[1]) {
      return `https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${matchId[1]}`;
    }
  }
  // Check if it's a raw Google Drive ID (alphanumeric, underscores, hyphens, and no dots/slashes)
  if (!url.includes('/') && !url.includes('.') && url.length >= 15 && url.length <= 60) {
    return `https://images.weserv.nl/?url=https://lh3.googleusercontent.com/d/${url}`;
  }
  return url;
}

export function useFirestoreData(isAdmin = false) {
  const [projects, setProjects] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const promises = [
          fetchProjects().catch(err => {
            console.error("Gagal mengambil data Projects:", err);
            return [];
          }),
          fetchCertificates().catch(err => {
            console.error("Gagal mengambil data Sertifikat:", err);
            return [];
          })
        ];

        if (isAdmin) {
          promises.push(
            fetchAdminProjects().catch(err => {
              console.error("Gagal mengambil data Admin Projects:", err);
              return [];
            })
          );
        }

        const results = await Promise.all(promises);
        
        if (!active) return;

        const projectsRes = results[0] || [];
        const certsRes = results[1] || [];
        const adminProjectsRes = isAdmin ? (results[2] || []) : [];

        // Format projects images
        const formattedProjects = projectsRes.map(p => ({
          ...p,
          images: p.images ? p.images.map(img => formatDriveImageUrl(img)) : []
        }));

        // Format admin projects images
        const formattedAdminProjects = adminProjectsRes.map(p => ({
          ...p,
          images: p.images ? p.images.map(img => formatDriveImageUrl(img)) : []
        }));

        // Format certificates images
        const formattedCerts = certsRes.map(c => ({
          ...c,
          img: formatDriveImageUrl(c.img)
        }));

        setProjects(formattedProjects);
        setCertificates(formattedCerts);
        if (isAdmin) {
          setAdminProjects(formattedAdminProjects);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading Firestore data in hook:", err);
        if (active) {
          setError(err);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [isAdmin]);

  return { projects, adminProjects, certificates, loading, error };
}
