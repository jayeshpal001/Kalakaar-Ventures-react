const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    // Slug SEO aur URL routing ke liye bohot kaam aata hai (e.g. 'video-work')
    slug: {
      type: String,
      lowercase: true,
    }
  },
  { 
    timestamps: true // Automatically createdAt aur updatedAt handle karega
  }
);

// Slug auto-generator (Save hone se pehle name ko slug mein badal dega)
categorySchema.pre('save', function() {
  if (this.isModified('name')) {
    this.slug = this.name.split(' ').join('-').toLowerCase();
  }

});

module.exports = mongoose.model('Category', categorySchema);