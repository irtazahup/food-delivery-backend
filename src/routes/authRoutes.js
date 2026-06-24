const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route: POST /api/auth/signup
router.post("/signup", authController.signup);

module.exports = router;