const mongoose = require('mongoose');
const validator = require('validator');

const MovieSchema = mongoose.Schema(
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
      required: false,
    },
    genre: {
      type: [String],
      required: true,
    },
    poster: {
      type: String,
      required: true,
      unique: true,
    },
    voteAverage: {
      type: Number,
    },
    voteCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', MovieSchema);
