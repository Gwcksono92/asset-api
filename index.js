const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());

const workbook = XLSX.readFile('data.xlsx');
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// GET endpoint: cari berdasarkan asset_number
app.get('/asset', (req, res) => {
  const number = req.query.number;
  const asset = data.find(item => String(item.asset_number) === number);

  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }

  // Susun photos jadi 1 array
  const photos = [
    asset.photo_link1,
    asset.photo_link2,
    asset.photo_link3,
    asset.photo_link4,
  ].filter(Boolean); // hilangkan undefined/null jika kosong

  res.json({
    asset_number: asset.asset_number,
    name: asset.asset_name,
    cost_center: asset.cost_center,
    merk: asset.merk,
    type: asset.type,
    serial_number: asset.serial_number,
    capacity: asset.capacity,
    condition: asset.condition,
    new_location: asset.location,
    latitude: parseFloat(asset.latitude),
    longitude: parseFloat(asset.longitude),
    photos: photos,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
