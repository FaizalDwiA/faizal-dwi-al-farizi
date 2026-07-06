// ============================================================
// GOOGLE APPS SCRIPT - Portfolio Projects Data
// Faizal Dwi Al Farizi
// ------------------------------------------------------------
// CARA PAKAI (Container-bound Script):
// 1. Buka Google Spreadsheet kamu
// 2. Klik Extensions → Apps Script
// 3. Copy-paste seluruh kode ini
// 4. Klik Run → testGetProjectsData (untuk test)
// 5. Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy URL deployment → paste ke portfolio HTML
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
// Tidak perlu SPREADSHEET_ID karena script ini dipasang
// langsung di dalam spreadsheet (container-bound script)

const SHEET_NAME = "Projects";
// Sesuaikan jika nama tab sheet kamu berbeda
// ────────────────────────────────────────────────────────────


/**
 * Handler utama Web App.
 * Dipanggil saat ada request GET ke URL deployment.
 */
function doGet(e) {
  try {
    const data = getProjectsData();

    // Ambil data sertifikat secara dinamis dari sheet Certificates
    try {
      data._certificates = getCertificatesData();
    } catch (certErr) {
      Logger.log("Gagal memuat sertifikat: " + certErr.message);
      data._certificates = [];
    }

    // Tambahkan timestamp agar response selalu fresh (anti-cache)
    data._lastUpdated = new Date().toISOString();

    const output = ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

    return output;

  } catch (err) {
    const errorResponse = {
      status: "error",
      message: err.message
    };

    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * Membaca data dari spreadsheet dan mengubahnya
 * menjadi format object projectsData yang sama
 * seperti di file projects-data.js
 *
 * Mendukung header mapping dinamis:
 * - Kolom statis dicari berdasarkan nama header (id, title, client, date, category, website, overview, tech, images)
 * - Semua kolom yang diawali dengan "feature" (misal feature1, feature2, feature3, feature4, dst)
 *   akan dikumpulkan secara otomatis ke dalam array features!
 */
function getProjectsData() {
  // Langsung ambil spreadsheet aktif — tidak perlu ID!
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" tidak ditemukan.`);
  }

  const rows = sheet.getDataRange().getDisplayValues();

  // Baris pertama = header, skip
  if (rows.length < 2) {
    return {};
  }

  // Baca baris header (huruf kecil & tanpa spasi luar)
  const headers = rows[0].map(h => String(h).trim().toLowerCase());

  // Cari index untuk masing-masing kolom statis
  const urutCol     = headers.indexOf("urut");
  const idCol       = headers.indexOf("id");
  const titleCol    = headers.indexOf("title");
  const clientCol   = headers.indexOf("client");
  const dateCol     = headers.indexOf("date");
  const categoryCol = headers.indexOf("category");
  const websiteCol  = headers.indexOf("website");
  const overviewCol = headers.indexOf("overview");
  const techCol     = headers.indexOf("tech");
  const imagesCol   = headers.indexOf("images");

  // Cari index kolom tunggal "features" atau "feature"
  const featuresCol = headers.indexOf("features") !== -1 
    ? headers.indexOf("features") 
    : headers.indexOf("feature");

  // Cari semua index kolom yang diawali dengan "feature" (untuk format kolom terpisah seperti feature1, feature2, dll)
  const featureCols = [];
  headers.forEach((header, index) => {
    if (header.startsWith("feature") && header !== "features" && header !== "feature") {
      featureCols.push(index);
    }
  });

  const projectsData = {};

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Ambil nilai berdasarkan index kolom dinamis
    const id = idCol !== -1 ? String(row[idCol]).trim() : "";
    if (!id) continue; // Skip jika ID kosong

    const title    = titleCol !== -1 ? String(row[titleCol]).trim() : "";
    const client   = clientCol !== -1 ? String(row[clientCol]).trim() : "";
    const date     = dateCol !== -1 ? String(row[dateCol]).trim() : "";
    const category = categoryCol !== -1 ? String(row[categoryCol]).trim() : "";
    const website  = websiteCol !== -1 ? String(row[websiteCol]).trim() : "";
    const overview = overviewCol !== -1 ? String(row[overviewCol]).trim() : "";
    const techRaw  = techCol !== -1 ? String(row[techCol]).trim() : "";
    const imgsRaw  = imagesCol !== -1 ? String(row[imagesCol]).trim() : "";

    // Parsing tech: "HTML, CSS, JavaScript" → ["HTML", "CSS", "JavaScript"]
    const tech = techRaw
      ? techRaw.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    // Parsing images: "img1.webp, img2.webp" → ["img1.webp", "img2.webp"]
    const images = imgsRaw
      ? imgsRaw.split(",").map(img => img.trim()).filter(Boolean)
      : [];

    // Mengumpulkan features (mendukung Kolom Tunggal atau Kolom Terpisah)
    let features = [];
    if (featuresCol !== -1) {
      // OPSI A: Kolom tunggal "features" — dipisahkan dengan enter / baris baru (newline)
      const featsRaw = String(row[featuresCol]).trim();
      if (featsRaw) {
        features = featsRaw.split("\n").map(f => f.trim()).filter(Boolean);
      }
    } else {
      // OPSI B: Kolom terpisah "feature1", "feature2", dst.
      featureCols.forEach(colIndex => {
        const featVal = String(row[colIndex]).trim();
        if (featVal) {
          features.push(featVal);
        }
      });
    }

    const urut = urutCol !== -1 ? Number(row[urutCol]) || 0 : 0;

    // Simpan ke object dengan id sebagai key
    projectsData[id] = {
      urut,
      title,
      client,
      date,
      category,
      website,
      overview,
      tech,
      features,
      images
    };
  }

  return projectsData;
}




/**
 * Fungsi test — jalankan manual dari Apps Script Editor
 * untuk memastikan data terbaca dengan benar
 * sebelum di-deploy sebagai Web App.
 */
function testGetProjectsData() {
  const data = getProjectsData();
  const keys = Object.keys(data);

  Logger.log("=== Jumlah project: " + keys.length + " ===");

  keys.forEach(function(key) {
    const p = data[key];
    Logger.log("----------------------------------");
    Logger.log("ID       : " + key);
    Logger.log("Title    : " + p.title);
    Logger.log("Category : " + p.category);
    Logger.log("Tech     : " + p.tech.join(", "));
    Logger.log("Features : " + p.features.join(" | "));
    Logger.log("Images   : " + p.images.length + " gambar");
  });

  Logger.log("=== Selesai ===");
}



