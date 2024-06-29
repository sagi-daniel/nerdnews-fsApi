const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const userService = require('./user.service');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const user = await userService.findById(id);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for updating password. Please use /updateMyPassword.', 400));
  }
  const filteredBody = filterObj(req.body, 'userName', 'email', 'firstName', 'lastName');
  const user = await userService.update(req.user._id, filteredBody);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await userService.inactivate(req.user._id);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMyNews = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const user = await userService.findNewsById(id);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.addNewsToMyNews = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newsId = req.body.newsId;
  const user = await userService.addNewsToUserNews(userId, newsId);
  if (!user) {
    return next(new AppError(`User news could not added`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.removeNewsFromMyNews = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newsId = req.params.id;

  const user = await userService.removeNewsFromUserNews(userId, newsId);
  if (!user) {
    return next(new AppError(`User news could not removed`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getMyMovies = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findMoviesById(userId);
  if (!user) {
    return next(new AppError(`User with ${userId} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.addMovieToMyMovies = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.body.movieId;

  const user = await userService.addMovieToUserMovies(userId, movieId);
  if (!user) {
    return next(new AppError(`User news could not added`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.removeMovieFromMyMovies = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.params.id;

  const user = await userService.removeMovieFromUserMovies(userId, movieId);

  if (!user) {
    return next(new AppError(`User movie could not removed`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const user = await userService.create(req.body);
  if (!user) {
    return next(new AppError(`User could not saved`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const users = await userService.findAll();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.findById(userId);
  if (!user) {
    return next(new AppError(`User with ${userId} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.update(userId, req.body);
  if (!user) {
    return next(new AppError(`User with ${userId} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userService.remove(userId);
  if (!user) {
    return next(new AppError(`User with ${userId} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
