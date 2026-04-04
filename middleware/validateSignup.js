const validateSignup = (req, res, next) => {
  let { username, email, password, confirmPassword } = req.body;

  // Trim all inputs
  username = username?.trim();
  email = email?.trim();
  password = password?.toString().trim();
  confirmPassword = confirmPassword?.toString().trim();
  // Only letters and numbers (no special characters)
  const passwordRegex = /^[A-Za-z0-9]+$/;
  // Username validation
  const usernameRegex = /^[A-Za-z]+$/;
  // Gmail validation
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (!username || !usernameRegex.test(username) || username.length < 3 || username.length > 20) {
  return res.status(400).json({ 
    message: "Username must be 3-20 letters only (no numbers or symbols)." 
  });
}

if (!email || !gmailRegex.test(email)) {
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

if (!passwordRegex.test(password)) {
  return res.status(400).json({ 
    message: "Password can only contain letters and numbers (no special characters)." 
  });
}
  

  next();
};

export default validateSignup;