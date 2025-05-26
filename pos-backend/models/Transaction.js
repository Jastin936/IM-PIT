Transaction.init({
  totalAmount: DataTypes.FLOAT,
  paymentMethod: DataTypes.STRING,
  discount: DataTypes.FLOAT,
  tax: DataTypes.FLOAT,
  receiptUrl: DataTypes.STRING, // For digital receipt
}, { sequelize, modelName: 'transaction' });