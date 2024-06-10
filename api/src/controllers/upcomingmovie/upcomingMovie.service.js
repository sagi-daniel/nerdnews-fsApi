const UpcomingMovie = require('../../models/UpcomingMovie.model');

exports.create = (upcomingMovie) => {
  const newUpcomingMovie = new UpcomingMovie(upcomingMovie);
  return newUpcomingMovie.save();
};

exports.findAll = () => UpcomingMovie.find();

exports.findByQuery = (fromDate, toDate, genre, sortOrder, page, pageSize) => {
  if (!Array.isArray(genre)) {
    genre = [genre];
  }
  genre = genre.map((genre) => genre.toUpperCase());

  const skip = (page - 1) * pageSize;

  return UpcomingMovie.find({
    release: {
      $lte: toDate,
      $gte: fromDate,
    },
    genre: { $all: genre },
  })
    .sort({ release: sortOrder })
    .skip(skip)
    .limit(pageSize);
};

exports.findById = (id) => UpcomingMovie.findById(id);

exports.update = (id, upcomingMovie) => UpcomingMovie.findByIdAndUpdate(id, upcomingMovie, { new: true });

exports.remove = (id) => UpcomingMovie.findByIdAndDelete(id);
