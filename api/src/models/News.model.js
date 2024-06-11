const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema(
  {
    release: {
      type: Date,
    },
    creator: {
      type: String,
    },
    source: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Source',
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    title: {
      type: String,
    },
    link: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', NewsSchema);
