const Project = require("../models/Project");

// @desc    Fetch all portfolio projects
// @route   GET /api/portfolio
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error); 
  }
};

// @desc    Add a new project
// @route   POST /api/portfolio
const addProject = async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  addProject,
};