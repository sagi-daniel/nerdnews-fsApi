const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
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
  const DEFAULTS = {
    LIMIT: null,
    SKIP: 0,
    SORT_ORDER: -1, // desc
  };

  let limit = parseInt(req.query.limit, 10) || DEFAULTS.LIMIT;
  let skip = parseInt(req.query.skip, 10) || DEFAULTS.SKIP;
  let sortOrder;

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

  const category = req.query.category;

  if (limit < 1) limit = DEFAULTS.LIMIT;
  if (skip < 0) skip = DEFAULTS.SKIP;

  const news = await newsService.findAll(sortOrder, limit, skip, category);

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

exports.top3fresh = catchAsync(async (req, res, next) => {
  const limit = 3;
  const skip = 0;
  const sort = -1;
  const news = await newsService.findAll(sort, limit, skip);
  res.status(200).json({
    status: 'success',
    results: news.length,
    data: {
      news,
    },
  });
});
