import { collection, getDocs } from "firebase/firestore";
import { db } from "./config.js";

/**
 * Fetch all projects from Firestore and sort them by order.
 * @returns {Promise<Array>} List of project objects.
 */
export async function fetchProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects = [];
  querySnapshot.forEach((doc) => {
    projects.push({
      id: doc.id,
      ...doc.data()
    });
  });

  // Urutkan langsung di JavaScript berdasarkan field order secara ascending (kecil ke besar)
  projects.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  return projects;
}

/**
 * Fetch all certificates from Firestore and sort them by order.
 * @returns {Promise<Array>} List of certificate objects.
 */
export async function fetchCertificates() {
  const querySnapshot = await getDocs(collection(db, "certificates"));
  const certificates = [];
  querySnapshot.forEach((doc) => {
    certificates.push({
      id: doc.id,
      ...doc.data()
    });
  });

  // Urutkan langsung di JavaScript berdasarkan field order secara ascending (kecil ke besar)
  certificates.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  return certificates;
}

