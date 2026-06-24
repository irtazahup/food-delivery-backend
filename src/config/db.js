const { Sequelize } = require("sequelize");
const path = require("path");

// Set up the connection instance pointing to your root directory
const sequelize = new Sequelize({
  dialect: "sqlite",
  // This creates a new dev.db file directly in your main food-delivery-backend folder
  storage: path.join(__dirname, "../../dev.db"), 
  logging: false, 
});

module.exports = sequelize;