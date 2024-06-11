const Movie = require('../../models/Movie.model');

exports.create = (movie) => {
  const newMovie = new Movie(movie);
  return newMovie.save();
};

exports.findAll = () => Movie.find();

exports.findByQuery = (fromDate, toDate, genre, sortOrder, page, pageSize) => {
  let query = {};
  if (fromDate && toDate) {
    query.release = {
      $gte: fromDate,
      $lte: toDate,
    };
  }

  if (genre) {
    let genreArr = [];
    if (!Array.isArray(genre)) {
      genreArr = genre.split(',').map((genre) => genre.trim().toUpperCase());
    } else {
      genreArr = genre.map((genre) => genre.toUpperCase());
    }
    query.genre = { $all: genreArr };
  }

  const skip = (page - 1) * pageSize;

  return Movie.find(query).sort({ release: sortOrder }).skip(skip).limit(pageSize);
};

exports.findById = (id) => Movie.findById(id);

exports.update = (id, movie) => Movie.findByIdAndUpdate(id, movie, { new: true });

exports.remove = (id) => Movie.findByIdAndDelete(id);
