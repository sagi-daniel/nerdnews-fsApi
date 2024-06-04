const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');
const rssNewsService = require('./rssNews.service');

exports.create = catchAsync(async (req, res, next) => {
  const rssNews = await rssNewsService.create(req.body);
  if (!rssNews) {
    return next(new AppError(`News could not saved`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      rssNews,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const limit = req.query.limit || 20;
  const sort = req.query.sort || -1;
  const rssNews = await rssNewsService.findAll(sort, limit);
  res.status(200).json({
    status: 'success',
    results: rssNews.length,
    data: {
      rssNews,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssNews = await rssNewsService.findById(id);
  if (!rssNews) {
    return next(new AppError(`News with ${id} ID could not found`));
  }
  if (rssNews) {
    res.status(200).json({
      status: 'success',
      data: {
        rssNews,
      },
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssNews = await rssNewsService.update(id, req.body);
  if (!rssNews) {
    return next(new AppError(`News with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      rssNews,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssNews = await rssNewsService.remove(id);
  if (!rssNews) {
    return next(new AppError(`News with ${id} ID could not found`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      rssNews,
    },
  });
});
