const express = require("express");
const { getProjects, addProject } = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");
// const { protect } = require("../middlewares/authMiddleware"); // Import the bouncer

const router = express.Router();

router.route("/")
  .get(getProjects) // Public
  .post(protect, addProject); // Locked down!

module.exports = router;