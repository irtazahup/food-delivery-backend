const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the User schema (Equivalent to SQLAlchemy Column declarations)
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "customer", // New signups default to buyers/customers
    validate: {
      isIn: [["customer", "owner", "driver"]], // Validates values on create/update
    },
  },
},
{
  timestamps: true, // Automatically manages createdAt and updatedAt columns
});

module.exports = User;