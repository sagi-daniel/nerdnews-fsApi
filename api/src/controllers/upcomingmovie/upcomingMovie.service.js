const UpcomingMovie = require('../../models/UpcomingMovie.model');

exports.create = (upcomingMovie) => {
  const newUpcomingMovie = new UpcomingMovie(upcomingMovie);
  return newUpcomingMovie.save();
};

exports.findAll = () => UpcomingMovie.find();

exports.findByDateRange = (fromDate, toDate, sort, limit) =>
  UpcomingMovie.find({
    release: {
      $lte: toDate,
      $gte: fromDate,
    },
  })
    .sort({ release: sort })
    .limit(limit);

exports.findById = (id) => UpcomingMovie.findById(id);

exports.update = (id, upcomingMovie) => UpcomingMovie.findByIdAndUpdate(id, upcomingMovie, { new: true });

exports.remove = (id) => UpcomingMovie.findByIdAndDelete(id);
