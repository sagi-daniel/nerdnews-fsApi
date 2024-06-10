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
  const DEFAULTS = {
    LIMIT: null,
    SKIP: 0,
    SORT_ORDER: -1, // desc
  };

  const currentDateMonth = new Date().setMonth(new Date().getMonth());
  const fromDate = req.query.fromDate ? new Date(req.query.fromDate) : new Date(currentDateMonth - 6);
  const toDate = req.query.toDate ? new Date(req.query.toDate) : new Date(currentDateMonth + 2);

  let limit = parseInt(req.query.limit, 10) || DEFAULTS.LIMIT;
  let skip = parseInt(req.query.skip, 10) || DEFAULTS.SKIP;
  let sortOrder;
  const category = req.query.category;

  if (limit < 1) limit = DEFAULTS.LIMIT;
  if (skip < 0) skip = DEFAULTS.SKIP;

  if (req.query.sortOrder) {
    if (req.query.sortOrder.toLowerCase() === 'asc') {
      sortOrder = 1;
    } else if (req.query.sortOrder.toLowerCase() === 'desc') {
      sortOrder = -1;
    } else {
      return next(new AppError('Invalid sortOrder parameter. Use "asc" or "desc".', 400));
    }
  } else {
    sortOrder = DEFAULTS.SORT_ORDER;
  }

  const movies = await upcomingMovieService.findByDateRange(fromDate, toDate, sortOrder, limit, category);
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
