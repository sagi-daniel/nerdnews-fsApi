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

module.exports = mongoose.model('Source', SourceSchema);
