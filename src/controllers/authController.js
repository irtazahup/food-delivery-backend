// Add this line at the VERY top of file that uses the .env variables (before imports)
require('dotenv').config();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("CRITICAL ERROR: JWT_SECRET is not defined in .env file!");
  process.exit(1);
}
// @desc    Register a new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

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
      role
    });
    

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 5. Respond with the safe user details
    return res.status(201).json({

      name: user.name,
      email: user.email,
      role: user.role,
      token: token


    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required' });

    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    return res.status(500).json({ error: error.message });

  }
};