const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

let currentPrice = 100.00;

function generateNextPrice() {
  const change = parseFloat((Math.random() * 20 - 10).toFixed(2)); // Change between -1.00 to +1.00
  currentPrice = parseFloat(currentPrice) + change;
  return parseFloat(currentPrice.toFixed(2));
}

app.get('/api/price', (req, res) => {
  const price = generateNextPrice();
  res.json({
    timestamp: new Date().toISOString(),
    price: price
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
