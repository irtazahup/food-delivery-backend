const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel"); // To reference the owner

const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., 'Italian', 'Burgers'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
}, {
  timestamps: true,
});

module.exports = Restaurant;