const mongoose = require('mongoose');

const SourceSchema = mongoose.Schema(
  {
    sourceName: {
      type: String,
      required: [true, 'Please provide a source name!'],
    },
    sourceType: {
      type: String,
      enum: ['RSS', 'RDF'],
      default: 'RSS',
    },
    sourceLink: {
      type: String,
      required: [true, 'Please provide a source link!'],
      unique: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: [true, 'Please provide a category!'],
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

// Törlés middleware
SourceSchema.pre('remove', async function (next) {
  try {
    // Ellenőrizd, hogy a Source használva van-e a News gyűjteményben
    const newsCount = await News.countDocuments({ source: this._id });
    if (newsCount > 0) {
      // Ha a Source használva van, ne töröld és dobj hibát
      const error = new Error('Cannot delete source as it is already used in News');
      next(error);
    } else {
      // Ha nem használják, folytasd a törlést
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Source', SourceSchema);
