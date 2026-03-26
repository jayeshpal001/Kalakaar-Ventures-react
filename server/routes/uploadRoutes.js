const express = require("express");
// const { uploadFile } = require("../controllers/uploadController");

const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { uploadFile } = require("../controllers/uploadController");

const router = express.Router();

// Intercept the file using Multer, then pass to the upload controller
router.post("/", protect, upload.single("media"), uploadFile);

module.exports = router;