TransactionItem.init({
  transactionId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
}, { sequelize, modelName: 'transaction_item' });