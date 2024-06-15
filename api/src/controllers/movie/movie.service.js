const Movie = require('../../models/Movie.model');
const { GENRES } = require('../../utils/constants');

exports.create = (movie) => {
  const newMovie = new Movie(movie);
  return newMovie.save();
};

exports.findAll = () => Movie.find();

exports.findByQuery = async (fromDate, toDate, genre, sortOrder, page, pageSize) => {
  let query = {};

  if (fromDate && toDate && fromDate < toDate) {
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

  const totalCount = await Movie.countDocuments(query);
  const totalPages = Math.ceil(totalCount / pageSize);

  // Ensure the page value is within the valid range
  page = Math.max(1, Math.min(page, totalPages));

  const skip = (page - 1) * pageSize;

  const movies = await Movie.find(query).sort({ release: sortOrder }).skip(skip).limit(pageSize);
  return { movies, totalItems: totalCount, totalPages };
};

exports.findById = (id) => Movie.findById(id);

exports.update = (id, movie) => Movie.findByIdAndUpdate(id, movie, { new: true });

exports.remove = (id) => Movie.findByIdAndDelete(id);
