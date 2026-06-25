
const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Mount Routes
app.use("/api/auth", authRoutes);

const PORT = 3000;

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