// controllers/transactionController.js
const { Transaction, Product, Inventory, User } = require('../models');
const sequelize = require('../config');

exports.createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items, paymentMethod, discounts, loyaltyPointsUsed, giftCardUsed } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Transaction must have at least one item.' });
    }

    // Check inventory availability
    for (const item of items) {
      const inventory = await Inventory.findOne({ where: { ProductId: item.productId } });
      if (!inventory || inventory.quantity < item.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Insufficient stock for product ID ${item.productId}` });
      }
    }

    // Calculate total price with discounts here (simplified)
    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      total += product.price * item.quantity;
    }

    // Deduct inventory quantities
    for (const item of items) {
      const inventory = await Inventory.findOne({ where: { ProductId: item.productId } });
      inventory.quantity -= item.quantity;
      await inventory.save({ transaction: t });
    }

    // Create transaction
    const transaction = await Transaction.create({
      UserId: req.user.id,
      totalAmount: total,
      paymentMethod,
      discounts: discounts || 0,
    }, { transaction: t });

    // Add transaction items (many-to-many)
    for (const item of items) {
      await transaction.addProduct(item.productId, { through: { quantity: item.quantity }, transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Transaction completed', transactionId: transaction.id });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};
