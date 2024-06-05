const mongoose = require('mongoose');

const RssNewsSchema = mongoose.Schema(
  {
    release: {
      type: Date,
    },
    creator: {
      type: String,
    },
    Source: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'RssSource',
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'NewsCategory',
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

module.exports = mongoose.model('RssNews', RssNewsSchema);
