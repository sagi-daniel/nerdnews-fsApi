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

exports.findByQuery = catchAsync(async (req, res, next) => {
  const DEFAULTS = {
    PAGE_SIZE: null,
    PAGE: 0,
    SORT_ORDER: -1, // desc
    FROM_DATE_RANGE: 6,
    TO_DATE_RANGE: 6,
  };

  const currentDate = new Date();
  const fromDate = req.query.fromDate
    ? new Date(req.query.fromDate)
    : new Date(new Date(currentDate).setMonth(currentDate.getMonth() - DEFAULTS.FROM_DATE_RANGE));
  const toDate = req.query.toDate
    ? new Date(req.query.toDate)
    : new Date(new Date(currentDate).setMonth(currentDate.getMonth() + DEFAULTS.TO_DATE_RANGE));

  let pageSize = parseInt(req.query.pageSize, 10) || DEFAULTS.PAGE_SIZE;
  let page = parseInt(req.query.page, 10) || DEFAULTS.PAGE;
  let sortOrder;

  let genre = req.query.genre.split(',');

  if (pageSize < 1) pageSize = DEFAULTS.PAGE_SIZE;
  if (page < 0) page = DEFAULTS.PAGE;

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

  const movies = await upcomingMovieService.findByQuery(fromDate, toDate, genre, sortOrder, page, pageSize);
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
