const jwt = require("jsonwebtoken");
const User = require("../models/User");

//middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select("-password"); //Exclude the password here
      next();
    } catch (error) {
      console.error("Token verification failed ", error);
      res.status(401).json({
        success: false,
        message: "Not authorized,Token verification failed",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

exports.isCustomer = async (req, res, next) => {
  if (req.user && req.user.role !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Not authorized as an customer",
    });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Not authorized as an Admin",
    });
  }
  next();
};
