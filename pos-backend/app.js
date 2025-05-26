const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const saleRoutes = require('./routes/sales');
const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/sales', saleRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server started on port 5000"));
});
