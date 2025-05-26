// routes/transactions.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticateJWT, authorizeRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, authorizeRole(['cashier', 'manager']), transactionController.createTransaction);

module.exports = router;
