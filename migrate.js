import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Mengambil __dirname di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyPath = path.join(__dirname, "serviceAccountKey.json");

if (!fs.existsSync(keyPath)) {
  console.error("ERROR: File serviceAccountKey.json tidak ditemukan!");
  console.error("Silakan unduh file serviceAccountKey.json dari Firebase Console dan letakkan di root folder.");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));

if (serviceAccount.private_key === "PLACEHOLDER") {
  console.error("ERROR: File serviceAccountKey.json masih menggunakan PLACEHOLDER!");
  console.error("Silakan ganti isi file serviceAccountKey.json dengan kredensial yang asli.");
  process.exit(1);
}

// Inisialisasi Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const PROJECTS_DEV_URL = "https://script.google.com/macros/s/AKfycbwBoJvyliz4gjjnlJnGhIctKAk9S4K3eezKsPYE7ZLBZgfDYgnpTp_Q5_kGivh7jSQZ/exec";
const PROJECTS_EXCEL_URL = "https://script.google.com/macros/s/AKfycbwBSRG6EReQM1yNgJDUZLLB7lsGFkEE7tT_gXIV0fil-oqz7UG9Sj6-Ii8XmBfps_KqkA/exec";
const CERTS_URL = "https://script.google.com/macros/s/AKfycbxPSbET_yYEvSI2ymTAJgW5hb8mi_xmhbgZY0Sz3GJw_uo_7opl8uh_az91MnZCkhPb/exec";

async function run() {
  try {
    // 1. Cleanup old documents to prevent duplicate entries
    console.log("Cleaning up old projects from Firestore...");
    const projSnap = await db.collection("projects").get();
    for (const docSnap of projSnap.docs) {
      console.log(`Deleting old project doc: ${docSnap.id}...`);
      await db.collection("projects").doc(docSnap.id).delete();
    }

    console.log("Cleaning up old admin projects from Firestore...");
    const adminProjSnap = await db.collection("admin_projects").get();
    for (const docSnap of adminProjSnap.docs) {
      console.log(`Deleting old admin project doc: ${docSnap.id}...`);
      await db.collection("admin_projects").doc(docSnap.id).delete();
    }

    console.log("Cleaning up old certificates from Firestore...");
    const certSnap = await db.collection("certificates").get();
    for (const docSnap of certSnap.docs) {
      console.log(`Deleting old cert doc: ${docSnap.id}...`);
      await db.collection("certificates").doc(docSnap.id).delete();
    }

    // 2. Fetch and migrate projects
    console.log("Fetching IT/Developer projects from Google Apps Script...");
    const devRes = await fetch(PROJECTS_DEV_URL + `?t=${Date.now()}`);
    const devData = await devRes.json();

    console.log("Fetching Excel/Admin projects from Google Apps Script...");
    const excelRes = await fetch(PROJECTS_EXCEL_URL + `?t=${Date.now()}`);
    const excelData = await excelRes.json();

    console.log("Migrating IT/Developer projects to Firestore...");
    let devOrder = 0;
    for (const [id, project] of Object.entries(devData)) {
      if (id === '_lastUpdated' || id === '_certificates') continue;
      devOrder++;
      console.log(`Writing IT project: ${id} (order: ${devOrder})...`);
      await db.collection("projects").doc(id).set({
        title: project.title || "",
        client: project.client || "",
        date: project.date || "",
        category: project.category || "",
        website: project.website || "",
        overview: project.overview || "",
        tech: project.tech || [],
        features: project.features || [],
        images: project.images || [],
        order: (project.urut !== undefined && project.urut !== "") ? Number(project.urut) : devOrder
      });
    }

    console.log("Migrating Excel/Admin projects to Firestore...");
    let excelOrder = 0;
    for (const [id, project] of Object.entries(excelData)) {
      if (id === '_lastUpdated' || id === '_certificates') continue;
      excelOrder++;
      console.log(`Writing Excel project: ${id} (order: ${excelOrder})...`);
      await db.collection("admin_projects").doc(id).set({
        title: project.title || "",
        client: project.client || "",
        date: project.date || "",
        category: project.category || "",
        website: project.website || "",
        overview: project.overview || "",
        tech: project.tech || [],
        features: project.features || [],
        images: project.images || [],
        order: (project.urut !== undefined && project.urut !== "") ? Number(project.urut) : excelOrder
      });
    }

    // 3. Fetch and migrate certificates
    console.log("Fetching certificates from Google Apps Script...");
    const certRes = await fetch(CERTS_URL + `?t=${Date.now()}`);
    const certData = await certRes.json();
    const certsList = certData.certificates || certData._certificates || (Array.isArray(certData) ? certData : []);

    console.log("Migrating certificates to Firestore...");
    let certOrder = 0;
    for (const cert of certsList) {
      certOrder++;
      console.log(`Writing certificate: ${cert.title} (order: ${cert.urut || certOrder})...`);
      await db.collection("certificates").add({
        kategori: cert.kategori || "",
        meta: cert.meta || "",
        jenis: cert.jenis || "",
        title: cert.title || "",
        img: cert.img || "",
        desc: cert.desc || "",
        order: (cert.urut !== undefined && cert.urut !== "") ? Number(cert.urut) : certOrder
      });
    }
    
    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
