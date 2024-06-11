const Movie = require('../../models/Movie.model');

exports.create = (Movie) => {
  const newMovie = new Movie(Movie);
  return newMovie.save();
};

exports.findAll = () => Movie.find();

exports.findByQuery = (fromDate, toDate, genre, sortOrder, page, pageSize) => {
  let query = {
    release: {
      $lte: toDate,
      $gte: fromDate,
    },
  };

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
