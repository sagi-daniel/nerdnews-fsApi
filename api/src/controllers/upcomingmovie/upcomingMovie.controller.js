const logger = require("../../config/logger");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const upcomingMovieService = require("./upcomingMovie.service");

exports.create = catchAsync(async (req, res, next) => {
  const movie = await upcomingMovieService.create(req.body);
  if (!movie || Object.keys(movie).length === 0) {
    return next(new AppError(`UpcomingMovie could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
  logger.info(`Upcoming movie was saved`);
});

exports.findAll = catchAsync(async (req, res, next) => {
  const movies = await upcomingMovieService.findAll();
  res.status(200).json({
    status: "success",
    results: movies.length,
    data: {
      movies,
    },
  });
  logger.info(`${movies.length} upcoming movie was found`);
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const movie = await upcomingMovieService.findById(id);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
  logger.info(`${id} was found`);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const movie = await upcomingMovieService.update(id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
  logger.info(`${updatedUpcomingMovie} was updated`);
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const movie = await upcomingMovieService.remove(id);
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
  logger.info(`Upcoming movie with ${id} ID was deleted`);
});
