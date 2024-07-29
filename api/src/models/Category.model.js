const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
});

// Törlés middleware
CategorySchema.pre('remove', async function (next) {
  try {
    // Ellenőrizd, hogy a Category használva van-e a News gyűjteményben
    const newsCount = await News.countDocuments({ category: this._id });
    if (newsCount > 0) {
      // Ha a Category használva van, ne töröld és dobj hibát
      const error = new Error('Cannot delete category as it is already used in News');
      next(error);
    } else {
      // Ha nem használják, folytasd a törlést
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Category', CategorySchema);
