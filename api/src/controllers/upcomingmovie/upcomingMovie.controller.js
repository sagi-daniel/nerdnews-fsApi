const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const upcomingMovieService = require('./upcomingMovie.service');

exports.create = catchAsync(async (req, res, next) => {
  const movie = await upcomingMovieService.create(req.body);
  if (!movie) {
    return next(new AppError(`UpcomingMovie could not saved`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const movies = await upcomingMovieService.findAll();
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

exports.findByDateRange = catchAsync(async (req, res, next) => {
  const fromDate = req.query.fromDate || new Date(new Date()).setMonth(new Date(new Date()).getMonth() - 2);
  const toDate = req.query.toDate || new Date(new Date()).setMonth(new Date(new Date()).getMonth() + 2);
  const limit = req.query.limit || 20;
  const sort = req.query.sort || -1;

  console.log(fromDate, toDate, sort, limit);

  const movies = await upcomingMovieService.findByDateRange(fromDate, toDate, sort, limit);
  res.status(200).json({
    satus: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const movie = await upcomingMovieService.findById(id);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
  logger.info(`${id} was found`);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const movie = await upcomingMovieService.update(id, req.body);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const movie = await upcomingMovieService.remove(id);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});
