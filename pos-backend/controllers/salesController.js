const Sale = require('../models/Sale');

exports.createSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json({ success: true, sale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
