const searchService = require('./search.service');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const { parsePaginationParams } = require('../../utils/helpers');

exports.findByQuery = catchAsync(async (req, res, next) => {
  const { pageSize, page } = parsePaginationParams(req.query, 10, 1);
  const { searchText } = req.query;

  const { news, movies, totalItems, totalPages } = await searchService.findByQuery(page, pageSize, searchText);

  sendResponse(res, { results: news.length + movies.length, totalItems, totalPages, data: { news, movies } });
});
