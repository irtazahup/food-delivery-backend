const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// Restaurant Context Routes (Nested under restaurants)
router.post("/restaurants/:restaurantId/menu", protect, authorizeRoles("owner"), menuController.createMenuItem);
router.get("/restaurants/:restaurantId/menu", menuController.getRestaurantMenu);

// Direct Item Action Routes
router.put("/menu/:id", protect, authorizeRoles("owner"), menuController.updateMenuItem);
router.delete("/menu/:id", protect, authorizeRoles("owner"), menuController.deleteMenuItem);

module.exports = router;