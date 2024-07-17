const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const sourceService = require('./source.service');

exports.create = catchAsync(async (req, res, next) => {
  const source = await sourceService.create(req.body);
  if (!source) {
    return next(new AppError(`Source could not be saved`));
  }
  sendResponse(res, { data: { source } });
});

exports.findAll = catchAsync(async (req, res) => {
  const sources = await sourceService.findAll();
  sendResponse(res, { results: sources.length, data: { sources } });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const source = await sourceService.findById(id);
  if (!source) {
    return next(new AppError(`Source with ${id} ID could not be found`));
  }
  sendResponse(res, { data: { source } });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const source = await sourceService.update(id, req.body);
  if (!source) {
    return next(new AppError(`Source with ${id} ID could not be found`));
  }
  sendResponse(res, { data: { source } });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const source = await sourceService.remove(id);
  if (!source) {
    return next(new AppError(`Source with ${id} ID could not be found`));
  }
  sendResponse(res, { data: { source } });
});
