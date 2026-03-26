const express = require("express");
const { sendEmail } = require("../controllers/contactController");

const router = express.Router();

// This route remains public (no 'protect' middleware) so anyone can contact you
router.post("/", sendEmail);

module.exports = router;