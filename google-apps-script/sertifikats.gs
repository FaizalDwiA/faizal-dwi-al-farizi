// ============================================================
// GOOGLE APPS SCRIPT - Portfolio Certificates Data
// Faizal Dwi Al Farizi
// ------------------------------------------------------------
// CARA PAKAI (Bisa digunakan dengan 2 cara):
// 
// CARA A: Digabungkan dengan projects.gs (Direkomendasikan)
// 1. Letakkan file ini berdampingan dengan projects.gs di editor Apps Script yang sama.
// 2. data._certificates akan otomatis dipanggil oleh doGet() milik projects.gs.
//
// CARA B: Standalone Web App (Dipisah/Independen)
// 1. Buat project Apps Script baru khusus untuk sertifikat.
// 2. Deploy → New Deployment → Web App.
// 3. Gunakan URL deployment tersebut untuk mengambil data sertifikat saja.
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
const CERT_SHEET_NAME = "Sertifikats";
// ────────────────────────────────────────────────────────────

/**
 * Handler utama Web App (untuk CARA B - Standalone).
 * Dipanggil saat ada request GET ke URL deployment sertifikat ini.
 */
function doGet(e) {
  try {
    const certificates = getCertificatesData();
    
    const response = {
      status: "success",
      _lastUpdated: new Date().toISOString(),
      _certificates: certificates, // Kompatibel dengan format response projects.gs
      certificates: certificates   // Standar format array
    };

    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

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
 * Membaca data sertifikat dari spreadsheet secara dinamis.
 * Mendukung beberapa fallback nama sheet jika terjadi kesalahan penulisan.
 *
 * Format kolom spreadsheet (A-E):
 * A: kategori | B: meta | C: title | D: img | E: desc
 */
function getCertificatesData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Mencari sheet dengan nama utama
  let sheet = ss.getSheetByName(CERT_SHEET_NAME);

  // Fallback: Coba cari dengan nama alternatif jika nama utama tidak ditemukan
  if (!sheet) {
    sheet = ss.getSheetByName("Certificates") || 
            ss.getSheetByName("Sertifikat") || 
            ss.getSheetByName("certificates") ||
            ss.getSheetByName("sertifikats");
  }

  if (!sheet) {
    Logger.log("Peringatan: Sheet sertifikat tidak ditemukan!");
    return [];
  }

  const rows = sheet.getDataRange().getDisplayValues();

  // Baris pertama adalah header, jika tidak ada data baris lain, return []
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map(h => String(h).trim().toLowerCase());
  const urutCol     = headers.indexOf("urut");
  const kategoriCol = headers.indexOf("kategori");
  const metaCol     = headers.indexOf("meta");
  const jenisCol    = headers.indexOf("jenis");
  const titleCol    = headers.indexOf("title");
  const imgCol      = headers.indexOf("img") !== -1 ? headers.indexOf("img") : headers.indexOf("image");
  const descCol     = headers.indexOf("desc") !== -1 ? headers.indexOf("desc") : headers.indexOf("deskripsi");

  const certificates = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Ambil nilai tiap kolom dengan proteksi index & undefined/null
    const urut     = urutCol !== -1 ? Number(row[urutCol]) || 0 : 0;
    const kategori = kategoriCol !== -1 ? String(row[kategoriCol]).trim() : "";
    const meta     = metaCol !== -1 ? String(row[metaCol]).trim() : "";
    const jenis    = jenisCol !== -1 ? String(row[jenisCol]).trim() : "";
    const title    = titleCol !== -1 ? String(row[titleCol]).trim() : "";
    const img      = imgCol !== -1 ? String(row[imgCol]).trim() : "";
    const desc     = descCol !== -1 ? String(row[descCol]).trim() : "";

    // Skip baris kosong / jika kolom judul kosong
    if (!title) continue;

    certificates.push({
      urut,
      kategori,
      meta,
      jenis,
      title,
      img,
      desc
    });
  }

  return certificates;
}

/**
 * Fungsi test — jalankan manual dari Apps Script Editor
 * untuk memastikan data terbaca dengan benar
 * sebelum di-deploy sebagai Web App.
 */
function testGetCertificatesData() {
  const data = getCertificatesData();
  Logger.log("=== Jumlah sertifikat terdeteksi: " + data.length + " ===");

  data.forEach(function (c, i) {
    Logger.log("----------------------------------");
    Logger.log("Indeks   : " + i);
    Logger.log("Title    : " + c.title);
    Logger.log("Kategori : " + c.kategori);
    Logger.log("Meta     : " + c.meta);
    Logger.log("Image    : " + c.img);
    Logger.log("Desc     : " + c.desc);
  });

  Logger.log("=== Selesai ===");
}
