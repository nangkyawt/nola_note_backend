// backend/controllers/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // your user model

// Login user and generate token
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user in DB
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Check password (for now plaintext, later use bcrypt)
  if (user.password !== password)
    return res.status(401).json({ message: "Invalid password" });

  // Sign JWT
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  res.json({ token, user: { id: user._id, name: user.name, email } });
};

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { login, verifyToken };