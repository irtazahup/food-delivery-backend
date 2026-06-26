const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("./restaurantModel");

const MenuItem = sequelize.define("MenuItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT, // Use FLOAT or DECIMAL for currency values
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurant,
      key: "id",
    },
  },
}, {
  timestamps: true,
});

module.exports = MenuItem;