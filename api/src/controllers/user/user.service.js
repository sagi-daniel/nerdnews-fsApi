const User = require('../../models/User.model');

exports.create = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

exports.findAll = () => User.find();

exports.findById = (id) => User.findById(id);

exports.findNewsById = (id) =>
  User.findById(id).populate({
    path: 'userNews',
    select: '-__v -createdAt -updatedAt',
  });

exports.addNewsToUserNews = (userId, newsId) =>
  User.findByIdAndUpdate(userId, { $push: { userNews: newsId } }, { new: true, runValidators: true });

exports.removeNewsFromUserNews = (userId, newsId) =>
  User.findByIdAndUpdate(userId, { $pull: { userNews: newsId } }, { new: true, runValidators: true });

exports.findMoviesById = (id) =>
  User.findById(id).populate({
    path: 'userMovies',
    select: '-__v -createdAt -updatedAt',
  });

exports.addMovieToUserMovies = (userId, movieId) =>
  User.findByIdAndUpdate(userId, { $push: { userMovies: movieId } }, { new: true, runValidators: true });

exports.removeMovieFromUserMovies = (userId, movieId) =>
  User.findByIdAndUpdate(userId, { $pull: { userMovies: movieId } }, { new: true, runValidators: true });

exports.update = (id, user) => User.findByIdAndUpdate(id, user, { new: true, runValidators: true });

exports.inactivate = (id) => User.findByIdAndUpdate(id, { active: false });

exports.remove = (id) => User.findByIdAndDelete(id);
