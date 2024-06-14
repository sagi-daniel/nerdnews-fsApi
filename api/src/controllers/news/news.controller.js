const newsService = require('./news.service');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const { parseDate, parseSortOrder, parsePaginationParams } = require('../../utils/helpers');

exports.create = catchAsync(async (req, res, next) => {
  const news = await newsService.create(req.body);
  if (!news) {
    return next(new AppError('News could not be saved'));
  }
  sendResponse(res, { data: { news } });
});

exports.findAll = catchAsync(async (req, res) => {
  const news = await newsService.findAll();
  sendResponse(res, { results: news.length, data: { news } });
});

exports.findByQuery = catchAsync(async (req, res, next) => {
  const fromDate = parseDate(req.query.fromDate, 'from');
  const toDate = parseDate(req.query.toDate, 'to');

  const { pageSize, page } = parsePaginationParams(req.query);
  const sortOrder = parseSortOrder(req.query.sortOrder);
  const category = req.query.category || '';

  const { news, totalItems } = await newsService.findByQuery(fromDate, toDate, category, sortOrder, page, pageSize);

  sendResponse(res, { results: news.length, totalItems, data: { news } });
});

exports.findById = catchAsync(async (req, res, next) => {
  const news = await newsService.findById(req.params.id);
  if (!news) {
    return next(new AppError(`News with ID ${req.params.id} could not be found`));
  }
  sendResponse(res, { data: { news } });
});

exports.update = catchAsync(async (req, res, next) => {
  const news = await newsService.update(req.params.id, req.body);
  if (!news) {
    return next(new AppError(`News with ID ${req.params.id} could not be found`));
  }
  sendResponse(res, { data: { news } });
});

exports.remove = catchAsync(async (req, res, next) => {
  const news = await newsService.remove(req.params.id);
  if (!news) {
    return next(new AppError(`News with ID ${req.params.id} could not be found`));
  }
  sendResponse(res, { data: { news } });
});

exports.top3fresh = catchAsync(async (req, res) => {
  const sortOrder = parseSortOrder(req.query.sortOrder);
  const news = await newsService.findAll(sortOrder, 3, 0);
  sendResponse(res, { results: news.length, data: { news } });
});
