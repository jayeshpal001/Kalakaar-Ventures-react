const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If valid, allow the request to proceed to the controller
      if (decoded.role === "admin") {
        next();
      } else {
        res.status(403);
        throw new Error("Not authorized as admin");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
};

module.exports = { protect };