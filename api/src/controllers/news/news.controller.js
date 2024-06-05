const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');
const newsService = require('./news.service');

exports.create = catchAsync(async (req, res, next) => {
  const news = await newsService.create(req.body);
  if (!news) {
    return next(new AppError(`News could not saved`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      news,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const limit = req.query.limit || 20;
  const sort = req.query.sort || -1;
  const news = await newsService.findAll(sort, limit);
  res.status(200).json({
    status: 'success',
    results: news.length,
    data: {
      news,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const news = await newsService.findById(id);
  if (!news) {
    return next(new AppError(`News with ${id} ID could not found`));
  }
  if (news) {
    res.status(200).json({
      status: 'success',
      data: {
        news,
      },
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const news = await newsService.update(id, req.body);
  if (!news) {
    return next(new AppError(`News with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      news,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const news = await newsService.remove(id);
  if (!news) {
    return next(new AppError(`News with ${id} ID could not found`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      news,
    },
  });
});
