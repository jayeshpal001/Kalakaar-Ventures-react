const jwt = require("jsonwebtoken");

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
const loginAdmin = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Check if the provided password matches the environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      // Sign a token that lasts for 30 days
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).json({ success: true, token });
    } else {
      res.status(401);
      throw new Error("Access Denied: Incorrect credentials.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin };