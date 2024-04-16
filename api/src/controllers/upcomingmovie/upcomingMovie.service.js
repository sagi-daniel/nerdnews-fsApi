const UpcomingMovie = require("../../models/UpcomingMovie.model");

exports.create = (upcomingMovie) => {
  const newUpcomingMovie = new UpcomingMovie(upcomingMovie);
  return newUpcomingMovie.save();
};

exports.findAll = () => UpcomingMovie.find();

exports.findById = (id) => UpcomingMovie.findById(id);

exports.update = (id, upcomingMovie) =>
  UpcomingMovie.findByIdAndUpdate(id, upcomingMovie, { new: true });

exports.remove = (id) => UpcomingMovie.findByIdAndDelete(id);
