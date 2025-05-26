Product.init({
  name: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
}, { sequelize, modelName: 'product' });