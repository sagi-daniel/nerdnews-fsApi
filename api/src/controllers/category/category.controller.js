const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const categoryService = require('./category.service');

exports.create = catchAsync(async (req, res, next) => {
  const category = await categoryService.create(req.body);
  if (!category) {
    return next(new AppError(`Category could not be saved`));
  }
  sendResponse(res, { data: { category } });
});

exports.findAll = catchAsync(async (req, res) => {
  const categories = await categoryService.findAll();
  sendResponse(res, { results: categories.length, data: { categories } });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await categoryService.findById(id);
  if (!category) {
    return next(new AppError(`Category with ID ${id} could not be found`));
  }
  sendResponse(res, { data: { category } });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await categoryService.update(id, req.body);
  if (!category) {
    return next(new AppError(`Category with ID ${id} could not be found`));
  }
  sendResponse(res, { data: { category } });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await categoryService.remove(id);
  if (!category) {
    return next(new AppError(`Category with ID ${id} could not be found`));
  }
  sendResponse(res, { data: { category } });
});
