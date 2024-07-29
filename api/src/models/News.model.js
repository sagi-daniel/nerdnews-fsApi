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
      required: [true, 'Please provide a source link!'],
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: [true, 'Please provide a category!'],
    },
    title: {
      type: String,
    },
    link: {
      type: String,
      required: [true, 'Please provide a news link!'],
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
