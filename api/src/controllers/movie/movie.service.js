const Movie = require('../../models/Movie.model');
const { GENRES } = require('../../utils/constants');
const { removeAccents } = require('../../utils/helpers');

exports.create = (movie) => {
  const newMovie = new Movie(movie);
  return newMovie.save();
};

exports.findAll = async (sortOrder, limit, skip) => {
  if (!sortOrder || !limit || !skip) return await Movie.find();
  return await Movie.find().sort({ release: sortOrder }).limit(limit).skip(skip);
};

exports.findByQuery = async (searchText, fromDate, toDate, genre, sortOrder, page, pageSize) => {
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

  if (searchText) {
    const regex = new RegExp(removeAccents(searchText), 'i'); // 'i' for case-insensitive
    query.$or = [{ title: { $regex: regex } }, { overview: { $regex: regex } }];
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
