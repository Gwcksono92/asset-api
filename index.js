const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔓 Aktifkan CORS agar bisa diakses dari aplikasi lain (termasuk MIT App Inventor)
app.use(cors());

// 📁 Path ke file Excel
const excelPath = path.join(__dirname, 'data.xlsx');

let data = [];

// 📦 Baca data Excel saat server dijalankan
try {
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  data = XLSX.utils.sheet_to_json(sheet);
  console.log(`✅ Berhasil memuat ${data.length} baris data dari Excel`);
} catch (err) {
  console.error('❌ Gagal membaca file Excel:', err.message);
}

// 🌐 Endpoint default agar bisa dicek saat Render baru bangun
app.get('/', (req, res) => {
  res.send('✅ API Asset aktif 🚀');
});

// 🔍 Endpoint untuk mencari asset berdasarkan asset_number
app.get('/asset', (req, res) => {
  const number = req.query.number;

  if (!number) {
    return res.status(400).json({ error: 'Parameter "number" wajib diisi' });
  }

  const result = data.find(item =>
    String(item.asset_number).trim() === String(number).trim()
  );

  if (result) {
    res.json({
      asset_number: result.asset_number || "",
      asset_name: result.asset_name || "",
      cost_center: result.cost_center || "",
      merk: result.merk || "",
      type: result.type || "",
      serial_number: result.serial_number || "",
      capacity: result.capacity || "",
      condition: result.condition || "",
      location: result.location || "",
      latitude: result.latitude || "",
      longitude: result.longitude || "",
      photo_link: result.photo_link || ""
    });
  } else {
    res.status(404).json({ error: 'Asset tidak ditemukan' });
  }
});

// ⚠️ Handler global untuk error tak terduga
app.use((err, req, res, next) => {
  console.error('❗ Terjadi error:', err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

// ▶️ Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
