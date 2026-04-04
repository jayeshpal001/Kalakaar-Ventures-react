const express = require("express");
const { 
  getProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  reorderProjects // Add this import
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/reorder", protect, reorderProjects);

// Base route: /api/portfolio
router.route("/")
  .get(getProjects)
  .post(protect, addProject);

// ID-specific route: /api/portfolio/:id
router.route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;