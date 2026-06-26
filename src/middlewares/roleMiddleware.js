// Middleware factory function to restrict routes by user role
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 🧠 req.user comes from your protect middleware that ran right before this!
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "Forbidden. You do not have permission to access this resource." 
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };