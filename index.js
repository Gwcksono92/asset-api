const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔓 Aktifkan CORS
app.use(cors());

// 📁 Path ke file Excel
const excelPath = path.join(__dirname, 'data.xlsx');

let data = [];

// 📦 Baca Excel
try {
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  data = XLSX.utils.sheet_to_json(sheet);
  console.log(`✅ Berhasil memuat ${data.length} baris data dari Excel`);
} catch (err) {
  console.error('❌ Gagal membaca file Excel:', err.message);
}

// 🌐 Endpoint default
app.get('/', (req, res) => {
  res.send('✅ API Asset aktif 🚀');
});

// 🔍 Endpoint pencarian berdasarkan asset_number
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


// ✅ 🔑 Endpoint login hanya pakai password
app.get('/login', (req, res) => {
  const inputPass = req.query.pass;

  if (!inputPass) {
    return res.status(400).json({ success: false, message: 'Password wajib diisi' });
  }

  const found = data.find(row =>
    String(row.password || '').trim() === String(inputPass).trim()
  );

  if (!found) {
    return res.status(401).json({ success: false, message: 'Password salah atau tidak ditemukan' });
  }

  res.json({
    success: true,
    message: 'Login berhasil',
    data: {
      asset_number: found.asset_number || "",
      asset_name: found.asset_name || "",
      cost_center: found.cost_center || "",
      merk: found.merk || "",
      type: found.type || "",
      serial_number: found.serial_number || "",
      capacity: found.capacity || "",
      condition: found.condition || "",
      location: found.location || "",
      latitude: found.latitude || "",
      longitude: found.longitude || "",
      photo_link: found.photo_link || ""
    }
  });
});

// ⚠️ Handler error global
app.use((err, req, res, next) => {
  console.error('❗ Terjadi error:', err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

// ▶️ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
