const Movie = require('../../models/Movie.model');
const { GENRES } = require('../../utils/constants');

exports.create = (movie) => {
  const newMovie = new Movie(movie);
  return newMovie.save();
};

exports.findAll = () => Movie.find();

exports.findByQuery = async (fromDate, toDate, genre, sortOrder, page, pageSize) => {
  let query = {};

  if (fromDate && toDate) {
    query.release = {
      $gte: fromDate,
      $lte: toDate,
    };
  }

  if (genre && genre !== 'ALL') {
    const genreUpperCase = genre.trim().toUpperCase();

    if (GENRES.includes(genreUpperCase)) {
      query.genre = genreUpperCase;
    }
  }
  const skip = (page - 1) * pageSize;

  const [movies, totalItems] = await Promise.all([
    Movie.find(query).sort({ release: sortOrder }).skip(skip).limit(pageSize),
    Movie.countDocuments(query),
  ]);

  return { movies, totalItems };
};

exports.findById = (id) => Movie.findById(id);

exports.update = (id, movie) => Movie.findByIdAndUpdate(id, movie, { new: true });

exports.remove = (id) => Movie.findByIdAndDelete(id);
