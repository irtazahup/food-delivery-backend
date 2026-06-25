const jwt = require("jsonwebtoken");



const protect = async (req, res, next) => {
  try {
    let token;

    // Check if the request contains an Authorization header formatted as 'Bearer <token>'
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Extract the raw token string
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify the token structure and integrity
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);

    // Attach the decoded payload (e.g., { id: user.id }) directly to the request object
    req.user = decoded;

    // Pass control to the next controller function in line
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};

module.exports = { protect };