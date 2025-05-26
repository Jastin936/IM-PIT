// controllers/productController.js
const { Product, Inventory } = require('../models');

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Inventory });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    const product = await Product.findOne({ where: { barcode }, include: Inventory });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
