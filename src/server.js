
const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const Restaurant = require("./models/restaurantModel");
const MenuItem = require("./models/menuItemModel");
const User = require("./models/userModel");

const restaurantRoutes = require("./routes/restaurantRoutes");


const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

const PORT = 3000;



// 1. User <-> Restaurant Relationship
User.hasMany(Restaurant, { foreignKey: "userId", onDelete: "CASCADE" });
Restaurant.belongsTo(User, { foreignKey: "userId" });

// 2. Restaurant <-> MenuItem Relationship
Restaurant.hasMany(MenuItem, { foreignKey: "restaurantId", onDelete: "CASCADE" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurantId" });

// Sync database tables, then boot up the express listener
sequelize.sync({ alter: true }) // 'alter: true' safely checks and updates structural layout updates
  .then(() => {
    console.log("Database connected & synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });