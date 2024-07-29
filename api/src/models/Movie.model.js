const mongoose = require('mongoose');
const validator = require('validator');

const MovieSchema = mongoose.Schema(
  {
    tmdb_id: {
      type: Number,
      required: [true, 'Please provide a tmdb ID!'],
      unique: true,
    },
    release: {
      type: Date,
      required: [true, 'Please provide a release date!'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a title!'],
    },
    overview: {
      type: String,
      required: false,
    },
    genre: {
      type: [String],
      required: [true, 'Please provide a genre!'],
    },
    poster: {
      type: String,
      required: [true, 'Please provide a poster!'],
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
