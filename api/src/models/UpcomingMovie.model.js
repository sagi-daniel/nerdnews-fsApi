const mongoose = require("mongoose");
const validator = require("validator");

const UpcomingMovieSchema = mongoose.Schema(
  {
    tmdb_id: {
      type: Number,
      required: true,
      unique: true,
    },
    release: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpcomingMovie", UpcomingMovieSchema);
