const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  items: { type: DataTypes.JSON, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  receiptType: { type: DataTypes.STRING },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  tax: { type: DataTypes.FLOAT, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Sale;
