const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// @desc    Register a new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate inputs exist
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Check if user already exists (Equivalent to SQLAlchemy query(User).filter_by(email=email).first())
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3. Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create and save the user to the database (Equivalent to db.add(new_user) + db.commit())
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Respond with the safe user details
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};