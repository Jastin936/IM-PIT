const Sequelize = require('sequelize');
const sequelize = require('../config'); // assuming this exports a Sequelize instance
const DataTypes = Sequelize.DataTypes;

const User = require('./User')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const Inventory = require('./Inventory')(sequelize, DataTypes);
const Transaction = require('./Transaction')(sequelize, DataTypes);
const LoyaltyPoint = require('./LoyaltyPoint')(sequelize, DataTypes);
const GiftCard = require('./GiftCard')(sequelize, DataTypes);

// Associations
User.hasMany(Transaction);
Transaction.belongsTo(User);

Product.hasOne(Inventory);
Inventory.belongsTo(Product);

Transaction.belongsToMany(Product, { through: 'TransactionItems' });
Product.belongsToMany(Transaction, { through: 'TransactionItems' });

User.hasOne(LoyaltyPoint);
LoyaltyPoint.belongsTo(User);

User.hasMany(GiftCard);
GiftCard.belongsTo(User);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Product,
  Inventory,
  Transaction,
  LoyaltyPoint,
  GiftCard,
};
