const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sourceService = require('./source.service');

exports.create = catchAsync(async (req, res, next) => {
  const source = await sourceService.create(req.body);
  if (!source) {
    return next(new AppError(`Source could not saved`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      source,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const sources = await sourceService.findAll();
  res.status(200).json({
    status: 'success',
    results: sources.length,
    data: {
      sources,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const source = await sourceService.findById(id);
  if (!source) {
    return next(new AppError(`Source with ${id} ID could not found`));
  }
  if (source) {
    res.status(200).json({
      status: 'success',
      data: {
        source,
      },
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const source = await sourceService.update(id, req.body);
  if (!source) {
    return next(new AppError(`Source with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      source,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const source = await sourceService.remove(id);
  if (!source) {
    return next(new AppError(`Source with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      source,
    },
  });
});
