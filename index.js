const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const assets = [
  {
    asset_number: "123",
    name: "ASUS ExpertBook",
    merk: "ASUS",
    type: "Laptop",
    serial_number: "SN123456",
    capacity: "16GB RAM / 512GB SSD",
    condition: "Baik",
    new_location: "Gedung A, Lantai 2",
    photos: [
      "https://linkfotokamu.com/foto1.jpg",
      "https://linkfotokamu.com/foto2.jpg",
      "https://linkfotokamu.com/foto3.jpg",
      "https://linkfotokamu.com/foto4.jpg"
    ],
    latitude: -6.200000,
    longitude: 106.816666
  },
  {
    asset_number: "456",
    name: "HP LaserJet Pro",
    merk: "HP",
    type: "Printer",
    serial_number: "SN7891011",
    capacity: "Black & White A4",
    condition: "Butuh perawatan",
    new_location: "Ruang Cetak, Gedung B",
    photos: [
      "https://linkfotokamu.com/fotoA.jpg",
      "https://linkfotokamu.com/fotoB.jpg",
      "https://linkfotokamu.com/fotoC.jpg",
      "https://linkfotokamu.com/fotoD.jpg"
    ],
    latitude: -6.900000,
    longitude: 107.600000
  }
];

app.get('/asset', (req, res) => {
  const { number } = req.query;
  const asset = assets.find(a => a.asset_number === number);
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).json({ error: "Asset not found" });
  }
});

app.listen(PORT, () => {
  console.log(`API berjalan di http://localhost:${PORT}`);
});
