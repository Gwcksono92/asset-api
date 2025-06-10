const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 📁 Pastikan path file Excel benar relatif terhadap file ini
const excelPath = path.join(__dirname, 'data.xlsx');

let data = [];

// 📦 Baca Excel saat server mulai
try {
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  data = XLSX.utils.sheet_to_json(sheet);
  console.log(`✅ Berhasil memuat ${data.length} data dari Excel`);
} catch (err) {
  console.error('❌ Gagal membaca file Excel:', err.message);
}

// 🔍 Endpoint cari asset
app.get('/asset', (req, res) => {
  const number = req.query.number;
  if (!number) {
    return res.status(400).json({ error: 'Parameter number wajib diisi' });
  }

  const result = data.find(item => String(item.asset_number) === String(number));

  if (result) {
    // Pilih link foto pertama yang tersedia
    const photoLink = result.photo_link1 || result.photo_link2 || result.photo_link3 || result.photo_link4 || "";

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
      photo_link: result.photoLink || "",
    });
  } else {
    res.status(404).json({ error: 'Asset tidak ditemukan' });
  }
});

// ▶️ Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
