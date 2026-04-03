const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
    },
    // Icon ke liye aap image URL ya kisi icon library ka class name save kar sakte hain
    icon: {
      type: String, 
      default: '', 
    },
    // Agar future mein kisi service ko delete kiye bina website se hatana ho
    isActive: {
      type: Boolean,
      default: true,
    },
    // Services ko display order mein rakhne ke liye
    order: {
      type: Number,
      default: 0, 
    }
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model('Service', serviceSchema);