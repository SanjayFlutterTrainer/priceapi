const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

let currentPrice = 100.00;

function generateNextPrice() {
  const change = parseFloat((Math.random() * 20 - 10).toFixed(2)); // Change between -10 to +10
  currentPrice = parseFloat(currentPrice) + change;
  return parseFloat(currentPrice.toFixed(2));
}

// Server-Sent Events stream
app.get('/api/price-stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const sendPriceUpdate = () => {
    const price = generateNextPrice();
    const data = {
      timestamp: new Date().toISOString(),
      price: price,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send data every 5 seconds
  const interval = setInterval(sendPriceUpdate, 2500);

  // Send first update immediately
  sendPriceUpdate();

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});