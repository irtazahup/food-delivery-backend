const Restaurant = require("../models/restaurantModel");

// @desc    Create a new restaurant
// @route   POST /api/restaurants
// @access  Private (Owner only)
exports.createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, address } = req.body;

    if (!name || !cuisine || !address) {
      return res.status(400).json({ error: "Name, cuisine, and address are required" });
    }

    // 🧠 req.user.id was attached by our 'protect' middleware!
    const restaurant = await Restaurant.create({
      name,
      cuisine,
      address,
      userId: req.user.id, // Tie the restaurant to the authenticated owner
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public (Anyone can browse)
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private (Owner only)
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cuisine, address } = req.body;

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // 🔒 OWNERSHIP CHECK: Ensure the logged-in owner actually owns this restaurant
    if (restaurant.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You do not own this restaurant." });
    }

    // Perform the structural update
    await restaurant.update({ name, cuisine, address });

    return res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private (Owner only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // 🔒 OWNERSHIP CHECK
    if (restaurant.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You do not own this restaurant." });
    }

    await restaurant.destroy();
    return res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};