const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary with your secure keys
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Multer's memory storage (holds the file temporarily in RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload, cloudinary };