const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Baca file Excel
const workbook = XLSX.readFile('./data.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

// Endpoint cari asset berdasarkan nomor
app.get('/asset', (req, res) => {
  const number = req.query.number;
  const result = data.find(item => String(item.asset_number) === String(number));

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
      photo_link1: result.photo_link1 || "",
      photo_link2: result.photo_link2 || "",
      photo_link3: result.photo_link3 || "",
      photo_link4: result.photo_link4 || ""
    });
  } else {
    res.status(404).json({ error: 'Asset not found' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});
