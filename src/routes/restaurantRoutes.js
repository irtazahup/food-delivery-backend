const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// Public Route: Anyone can view restaurants
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
// Protected Routes: Only logged-in users with the 'owner' role can execute mutations
router.post("/", protect, authorizeRoles("owner"), restaurantController.createRestaurant);
router.put("/:id", protect, authorizeRoles("owner"), restaurantController.updateRestaurant);
router.delete("/:id", protect, authorizeRoles("owner"), restaurantController.deleteRestaurant);

module.exports = router;