const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const userService = require('./user.service');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findById(userId);
  if (!user) {
    return next(new AppError(`User with ID ${userId} could not be found`));
  }
  sendResponse(res, { data: { user } });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for updating password. Please use /updateMyPassword.', 400));
  }
  const filteredBody = filterObj(req.body, 'userName', 'email', 'firstName', 'lastName');
  const user = await userService.update(req.user._id, filteredBody);
  if (!user) {
    return next(new AppError(`User with ID ${req.user._id} could not be found`));
  }
  sendResponse(res, { data: { user } });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await userService.inactivate(req.user._id);
  if (!user) {
    return next(new AppError(`User with ID ${req.user._id} could not be found`));
  }
  sendResponse(res, { statusCode: 204, data: null });
});

exports.getMyNews = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findNewsById(userId);
  if (!user) {
    return next(new AppError(`User with ID ${userId} could not be found`));
  }
  sendResponse(res, { data: { user } });
});

exports.addNewsToMyNews = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newsId = req.body.newsId;
  const user = await userService.addNewsToUserNews(userId, newsId);
  if (!user) {
    return next(new AppError(`User news could not be added`));
  }
  sendResponse(res, { data: { user } });
});

exports.removeNewsFromMyNews = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newsId = req.params.id;
  const user = await userService.removeNewsFromUserNews(userId, newsId);
  if (!user) {
    return next(new AppError(`User news could not be removed`));
  }
  sendResponse(res, { data: { user } });
});

exports.getMyMovies = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findMoviesById(userId);
  if (!user) {
    return next(new AppError(`User with ID ${userId} could not be found`));
  }
  sendResponse(res, { data: { user } });
});

exports.addMovieToMyMovies = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.body.movieId;
  const user = await userService.addMovieToUserMovies(userId, movieId);
  if (!user) {
    return next(new AppError(`User movie could not be added`));
  }
  sendResponse(res, { data: { user } });
});

exports.removeMovieFromMyMovies = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.params.id;
  const user = await userService.removeMovieFromUserMovies(userId, movieId);
  if (!user) {
    return next(new AppError(`User movie could not be removed`));
  }
  sendResponse(res, { data: { user } });
});

exports.create = catchAsync(async (req, res, next) => {
  const user = await userService.create(req.body);
  if (!user) {
    return next(new AppError(`User could not be saved`));
  }
  sendResponse(res, { data: { user } });
});

exports.findAll = catchAsync(async (req, res) => {
  const users = await userService.findAll();
  sendResponse(res, { results: users.length, data: { users } });
});

exports.findById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.findById(userId);
  if (!user) {
    return next(new AppError(`User with ID ${userId} could not be found`));
  }
  sendResponse(res, { data: { user } });
});

exports.update = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.update(userId, req.body);
  if (!user) {
    return next(new AppError(`User with ID ${userId} could not be found`));
  }
  sendResponse(res, { data: { user } });
});

exports.remove = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.inactivate(userId);
  if (!user) {
    return next(new AppError(`User with ID ${userId} could not be found`));
  }
  sendResponse(res, { data: { user } });
});
