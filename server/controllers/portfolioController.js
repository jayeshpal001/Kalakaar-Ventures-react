const Project = require("../models/Project");

// @desc    Fetch all portfolio projects
// @route   GET /api/portfolio
const getProjects = async (req, res, next) => {
  try {
    // UPDATED: Sort by our new 'order' field first (ascending), then by newest
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
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

const updateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Returns the updated document
    );
    if (!updatedProject) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/portfolio/:id
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const reorderProjects = async (req, res, next) => {
  try {
    const { reorderedProjects } = req.body; // Expects an array of objects: [{ _id, order }]

    // Execute multiple database updates concurrently for maximum speed
    const updatePromises = reorderedProjects.map((project) => 
      Project.findByIdAndUpdate(project._id, { order: project.order })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ success: true, message: "Database sequence updated." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,   
  deleteProject,   
  reorderProjects,
};
