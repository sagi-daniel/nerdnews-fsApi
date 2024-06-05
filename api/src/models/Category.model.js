const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
