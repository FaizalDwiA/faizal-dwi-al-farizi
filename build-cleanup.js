import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./web-src/dist');
const parentDir = path.resolve('./');

console.log('🚀 Memindahkan hasil kompilasi ke root repositori...');

// 1. Cek folder dist
if (!fs.existsSync(distDir)) {
  console.error('❌ Folder dist tidak ditemukan!');
  process.exit(1);
}

// target file/folder yang mau dibersihkan
const targets = [
  { path: 'assets', type: 'dir' },
  { path: 'index.html', type: 'file' },
  { path: 'project-details.html', type: 'file' },
  { path: 'projects.html', type: 'file' },
  { path: 'certificates.html', type: 'file' },
  { path: 'public', type: 'dir' }
];

try {
  // 2. Cleanup root lama
  for (const item of targets) {
    try {
      const fullPath = path.join(parentDir, item.path);

      fs.rmSync(fullPath, {
        recursive: true,
        force: true
      });

      console.log(`🧹 Menghapus ${item.path}...`);
    } catch (err) {
      console.log(`⚠️ Gagal hapus ${item.path}: ${err.message}`);
    }
  }

  // 3. Ambil isi dist (AMAN dari error)
  let files;
  try {
    files = fs.readdirSync(distDir);
  } catch (err) {
    console.error('❌ Gagal membaca folder dist:', err.message);
    process.exit(1);
  }

  // 4. Pindahkan file ke root
  for (const file of files) {
    const srcPath = path.join(distDir, file);
    const destPath = path.join(parentDir, file);

    console.log(`📦 Memindahkan ${file}...`);

    try {
      // hapus dulu kalau sudah ada
      fs.rmSync(destPath, {
        recursive: true,
        force: true
      });

      fs.renameSync(srcPath, destPath);
    } catch (err) {
      console.error(`❌ Gagal memindahkan ${file}:`, err.message);
    }
  }

  console.log('✅ Berhasil memindahkan file produksi ke root!');

  // 5. Hapus folder dist
  try {
    fs.rmSync(distDir, {
      recursive: true,
      force: true
    });
    console.log('🧹 Folder dist dihapus');
  } catch (err) {
    console.error('❌ Gagal menghapus dist:', err.message);
  }

} catch (error) {
  console.error('❌ Terjadi error saat proses build:', error);
  process.exit(1);
}