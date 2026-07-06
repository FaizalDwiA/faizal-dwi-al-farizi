// ============================================================
// GOOGLE APPS SCRIPT - Portfolio Excel/Spreadsheet Projects
// ------------------------------------------------------------
// Konfigurasi Tab Sheet
const SHEET_NAME = "Excel"; 
// ============================================================

function doGet(e) {
  try {
    const data = getProjectsData();

    // Mengembalikan response dalam format JSON
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

function getProjectsData() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet dengan nama tab "${SHEET_NAME}" tidak ditemukan.`);
  }

  const rows = sheet.getDataRange().getDisplayValues();

  // Jika sheet kosong
  if (rows.length < 2) {
    return {};
  }

  // Baca baris header (ke lowercase untuk mencocokkan)
  const headers = rows[0].map(h => String(h).trim().toLowerCase());

  // Cari posisi indeks kolom berdasarkan header secara dinamis
  const urutCol     = headers.indexOf("urut");
  const idCol       = headers.indexOf("id");
  const titleCol    = headers.indexOf("title");
  const dateCol     = headers.indexOf("date");
  const categoryCol = headers.indexOf("category");
  const websiteCol  = headers.indexOf("url") !== -1 ? headers.indexOf("url") : headers.indexOf("website");
  const overviewCol = headers.indexOf("overview");
  const featuresCol = headers.indexOf("features");
  const imagesCol   = headers.indexOf("images");

  // Opsional: Kolom tambahan jika Anda menambahkannya di kemudian hari
  const clientCol   = headers.indexOf("client");
  const techCol     = headers.indexOf("tech");

  const projectsData = {};

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Dapatkan ID proyek
    const id = idCol !== -1 ? String(row[idCol]).trim() : "";
    if (!id) continue; // Skip baris jika ID kosong

    const title    = titleCol !== -1 ? String(row[titleCol]).trim() : "";
    const date     = dateCol !== -1 ? String(row[dateCol]).trim() : "";
    const category = categoryCol !== -1 ? String(row[categoryCol]).trim() : "";
    const website  = websiteCol !== -1 ? String(row[websiteCol]).trim() : "";
    const overview = overviewCol !== -1 ? String(row[overviewCol]).trim() : "";
    
    // Opsional
    const client   = clientCol !== -1 ? String(row[clientCol]).trim() : "";
    const techRaw  = techCol !== -1 ? String(row[techCol]).trim() : "";

    // Parse features: pisahkan berdasarkan enter (baris baru) atau koma
    let features = [];
    if (featuresCol !== -1) {
      const featsRaw = String(row[featuresCol]).trim();
      if (featsRaw) {
        const separator = featsRaw.includes("\n") ? "\n" : ",";
        features = featsRaw.split(separator).map(f => f.trim()).filter(Boolean);
      }
    }

    // Parse images: pisahkan berdasarkan koma
    let images = [];
    if (imagesCol !== -1) {
      const imgsRaw = String(row[imagesCol]).trim();
      if (imgsRaw) {
        images = imgsRaw.split(",").map(img => img.trim()).filter(Boolean);
      }
    }

    // Parse tech (jika ada): pisahkan berdasarkan koma
    let tech = [];
    if (techRaw) {
      tech = techRaw.split(",").map(t => t.trim()).filter(Boolean);
    }

    const urut = urutCol !== -1 ? Number(row[urutCol]) || 0 : 0;

    // Memetakan ke struktur data JSON yang dibaca migrate.js
    projectsData[id] = {
      urut,
      title,
      client, 
      date,
      category,
      website, // Kolom 'url' spreadsheet dipetakan ke field 'website' agar dibaca migrate.js
      overview,
      tech,
      features,
      images
    };
  }

  return projectsData;
}

// Fungsi Uji Coba: Klik tombol Run pada fungsi ini di editor untuk melihat output logs
function testGetProjectsData() {
  const data = getProjectsData();
  const keys = Object.keys(data);

  Logger.log("=== JUMLAH PROYEK YANG TERDETEKSI: " + keys.length + " ===");
  keys.forEach(function(key) {
    const p = data[key];
    Logger.log("ID: " + key + " | Title: " + p.title + " | URL/Website: " + p.website);
    Logger.log("Features: " + p.features.join(" | "));
    Logger.log("Images Count: " + p.images.length);
    Logger.log("--------------------------------------------------");
  });
}
