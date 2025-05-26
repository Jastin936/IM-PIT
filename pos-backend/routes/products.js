// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateJWT, authorizeRole } = require('../middlewares/authMiddleware');

router.get('/', authenticateJWT, authorizeRole(['cashier', 'manager', 'admin']), productController.listProducts);
router.get('/barcode/:barcode', authenticateJWT, authorizeRole(['cashier', 'manager', 'admin']), productController.searchProductByBarcode);

module.exports = router;
