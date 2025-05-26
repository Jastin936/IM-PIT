const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Example route
app.get('/', (req, res) => {
  res.send('POS backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
