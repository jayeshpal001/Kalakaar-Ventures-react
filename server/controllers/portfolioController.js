const Project = require("../models/Project");

// @desc    Fetch portfolio projects (Aggregated & Paginated)
// @route   GET /api/portfolio?page=1&limit=8&category=All
const getProjects = async (req, res, next) => {
  try {
    // 1. Frontend se aane wale parameters capture karein (default values ke sath)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8; // Default 8 projects per page
    const category = req.query.category && req.query.category !== "All" ? req.query.category : null;

    // 2. Dynamic Match Stage (Agar category select hui hai toh filter lagao, warna sab lao)
    const matchStage = category ? { category: category } : {};

    // 3. THE MASTERSTROKE: MongoDB Aggregation Pipeline
    const aggregationResult = await Project.aggregate([
      // Stage 1: Filter Data
      { $match: matchStage },
      
      // Stage 2: Sort Data (Aapka custom order aur date)
      { $sort: { order: 1, createdAt: -1 } },
      
      // Stage 3: The Multi-Tasker ($facet) - Ek sath 2 result layega
      {
        $facet: {
          // Task A: Total counting (taaki frontend ko pata chale aur 'Explore More' dikhana hai ya nahi)
          metadata: [{ $count: "total" }],
          
          // Task B: Asli Data lana (Skip & Limit ke sath)
          data: [
            { $skip: (page - 1) * limit }, // Ex: Page 2 par (2-1)*8 = Pehle 8 skip kar do
            { $limit: limit }              // Aur agle 8 utha lo
          ]
        }
      }
    ]);

    // 4. Aggregation output ko clean objects mein extract karna
    const projects = aggregationResult[0].data;
    const total = aggregationResult[0].metadata[0] ? aggregationResult[0].metadata[0].total : 0;
    
    // Boolean flag for frontend "Explore More" button
    const hasMore = (page * limit) < total;

    // 5. Send optimized payload
    res.status(200).json({ 
      success: true, 
      data: projects,
      pagination: {
        totalProjects: total,
        currentPage: page,
        hasMore: hasMore
      }
    });
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
