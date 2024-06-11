const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const movieService = require('./movie.service');
const { parseDate, parseSortOrder, parsePaginationParams } = require('../../utils/helpers');

exports.create = catchAsync(async (req, res, next) => {
  const movie = await movieService.create(req.body);
  if (!movie) {
    return next(new AppError('UpcomingMovie could not be saved'));
  }
  sendResponse(res, { data: { movie } });
});

exports.findAll = catchAsync(async (req, res) => {
  const movies = await movieService.findAll();
  sendResponse(res, { results: movies.length, data: { movies } });
});

exports.findByQuery = catchAsync(async (req, res, next) => {
  const fromDate = parseDate(req.query.fromDate);
  const toDate = parseDate(req.query.toDate);

  const { pageSize, page } = parsePaginationParams(req.query);
  const sortOrder = parseSortOrder(req.query.sortOrder, next);
  const genre = req.query.genre || '';

  const movies = await movieService.findByQuery(fromDate, toDate, genre, sortOrder, page, pageSize);
  sendResponse(res, { results: movies.length, data: { movies } });
});

exports.findById = catchAsync(async (req, res, next) => {
  const movie = await movieService.findById(req.params.id);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ID ${req.params.id} could not be found`));
  }
  sendResponse(res, { data: { movie } });
});

exports.update = catchAsync(async (req, res, next) => {
  const movie = await movieService.update(req.params.id, req.body);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ID ${req.params.id} could not be found`));
  }
  sendResponse(res, { data: { movie } });
});

exports.remove = catchAsync(async (req, res, next) => {
  const movie = await movieService.remove(req.params.id);
  if (!movie) {
    return next(new AppError(`UpcomingMovie with ID ${req.params.id} could not be found`));
  }
  sendResponse(res, { data: { movie } });
});