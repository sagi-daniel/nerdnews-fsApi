const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const categoryService = require('./category.service');

exports.create = catchAsync(async (req, res, next) => {
  const category = await categoryService.create(req.body);
  if (!category) {
    return next(new AppError(`Category could not saved`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const categories = await categoryService.findAll();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await categoryService.findById(id);
  if (!category) {
    return next(new AppError(`Category with ${id} ID could not found`));
  }
  if (category) {
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await categoryService.update(id, req.body);
  if (!category) {
    return next(new AppError(`Category with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await categoryService.remove(id);
  if (!category) {
    return next(new AppError(`Category with ${id} ID could not found`));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});
