const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Inventory = sequelize.define('Inventory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  reorderThreshold: { type: DataTypes.INTEGER, defaultValue: 5 },
}, {
  timestamps: true,
});

module.exports = Inventory;
