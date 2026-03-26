

const { cloudinary } = require("../middleware/uploadMiddleware");

// @desc    Upload a file to Cloudinary
// @route   POST /api/upload
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file provided");
    }

    // Convert the memory buffer into a readable string for Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Kalakaar Cloud folder. 'auto' detects if it's an image or video automatically.
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "kalakaar_ventures",
      resource_type: "auto", 
    });

    // Return the secure URL to the frontend
    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };