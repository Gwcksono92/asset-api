const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const assets = [
  {
    asset_number: "123",
    type: "Laptop",
    serial_number: "SN123456",
    cost_center: "IT01",
    latitude: -6.200000,
    longitude: 106.816666,
    photo_url: "https://linkfotokamu.com/foto123.jpg"
  },
  {
    asset_number: "456",
    type: "Printer",
    serial_number: "SN7891011",
    cost_center: "PR02",
    latitude: -6.900000,
    longitude: 107.600000,
    photo_url: "https://linkfotokamu.com/foto456.jpg"
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
