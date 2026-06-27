const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");

// @desc    Add a menu item to a restaurant
// @route   POST /api/restaurants/:restaurantId/menu
// @access  Private (Owner of this restaurant only)
exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, isAvailable } = req.body;

    // 1. Verify restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // 2. Ownership Check: Does this user own this restaurant?
    if (restaurant.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You do not own this restaurant." });
    }

    // 3. Create the item
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      isAvailable,
      restaurantId: parseInt(restaurantId),
    });

    return res.status(201).json({ message: "Menu item added successfully", menuItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get all menu items for a specific restaurant
// @route   GET /api/restaurants/:restaurantId/menu
// @access  Public
exports.getRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menuItems = await MenuItem.findAll({
      where: { restaurantId }
    });

    return res.status(200).json(menuItems);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private (Owner of parent restaurant only)
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, isAvailable } = req.body;

    const menuItem = await MenuItem.findByPk(id, { include: Restaurant });
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    // Ownership Check: Check the linked Restaurant's userId
    if (menuItem.Restaurant.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You do not own this restaurant." });
    }

    await menuItem.update({ name, description, price, isAvailable });
    return res.status(200).json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private (Owner of parent restaurant only)
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByPk(id, { include: Restaurant });
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    if (menuItem.Restaurant.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied. You do not own this restaurant." });
    }

    await menuItem.destroy();
    return res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};