const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
//this is for testing we will remove this code 
const { protect } = require("../middlewares/authMiddleware");

// Route: POST /api/auth/signup
router.post("/signup", authController.signup);
router.post("/login", authController.login);

//this is for testing we will remove this code
// Protected Route (Requires a valid Bearer token)

router.get("/profile", protect, (req, res) => {
  // Any route downstream from 'protect' has access to req.user
  res.json({
    message: "Welcome to your secure profile!",
    userId: req.user.id
  });
});

module.exports = router;


