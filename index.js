const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const assets = [
  {
    Asset_Number: "123",
    Asset_Name: "ASUS ExpertBook",
    Merk: "ASUS",
    Type: "Laptop",
    Serial_Number: "SN123456",
    Capacity: "16GB RAM / 512GB SSD",
    Condition: "Baik",
    Location: "Gedung A, Lantai 2",
    Cost_Center: "IT-001",
    Photos: [
      "https://linkfotokamu.com/foto1.jpg",
      "https://linkfotokamu.com/foto2.jpg",
      "https://linkfotokamu.com/foto3.jpg",
      "https://linkfotokamu.com/foto4.jpg"
    ],
    Latitude: -6.200000,
    Longitude: 106.816666
  },
  {
    Asset_Number: "456",
    Asset_Name: "HP LaserJet Pro",
    Merk: "HP",
    Type: "Printer",
    Serial_Number: "SN7891011",
    Capacity: "Black & White A4",
    Condition: "Butuh perawatan",
    Location: "Ruang Cetak, Gedung B",
    Cost_Center: "PRINT-002",
    Photos: [
      "https://linkfotokamu.com/fotoA.jpg",
      "https://linkfotokamu.com/fotoB.jpg",
      "https://linkfotokamu.com/fotoC.jpg",
      "https://linkfotokamu.com/fotoD.jpg"
    ],
    Latitude: -6.900000,
    Longitude: 107.600000
  }
];

app.get('/asset', (req, res) => {
  const { number } = req.query;
  const asset = assets.find(a => a.Asset_Number === number);
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).json({ error: "Asset not found" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API berjalan di http://localhost:${PORT}`);
});
