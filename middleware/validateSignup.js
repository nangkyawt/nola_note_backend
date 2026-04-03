const validateSignup = (req, res, next) => {
  let { username, email, password, confirmPassword } = req.body;

  // Trim all inputs
  username = username?.trim();
  email = email?.trim();
  password = password?.toString().trim();
  confirmPassword = confirmPassword?.toString().trim();

  // Username validation
  if (!username || username.length < 3 || username.length > 20) {
    return res.status(400).json({ message: "Username must be 3-20 characters." });
  }

  // Gmail validation
  if (!email || !email.toLowerCase().endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Please enter a valid Gmail address." });
  }

  // Password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Password strength
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  next();
};

export default validateSignup;