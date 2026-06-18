const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }

    const decodedObj = jwt.verify(token, 'Savara_secretKey');

    const user = await User.findById(decodedObj._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    return next(); // IMPORTANT
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can access" });
    }

    return next(); // IMPORTANT
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
    authUser,
    isAdmin
};