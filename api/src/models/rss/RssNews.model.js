const mongoose = require("mongoose");
const RssCategoryModel = require("./RssCategory.model");

const RssNewsSchema = mongoose.Schema(
  {
    release: {
      type: Date,
    },
    creator: {
      type: String,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "RssCategory",
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
    contentSnippet: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RssNews", RssNewsSchema);
