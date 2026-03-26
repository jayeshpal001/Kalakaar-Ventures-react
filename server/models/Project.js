const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
  story: { type: String },
  order: { type: Number, default: 0 }, // NEW: Determines display sequence
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);