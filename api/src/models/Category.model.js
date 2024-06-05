const mongoose = require("mongoose");

const RssCategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
});

module.exports = mongoose.model("RssCategory", RssCategorySchema);
