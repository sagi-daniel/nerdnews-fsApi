const logger = require("../../../config/logger");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");
const rssCategoryService = require("./rssCategory.service");

exports.create = catchAsync(async (req, res, next) => {
  const rssCategory = await rssCategoryService.create(req.body);
  if (!rssCategory || Object.keys(rssCategory).length === 0) {
    return next(new AppError(`Category could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssCategory,
    },
  });
  logger.info(`Category was saved`);
});

exports.findAll = catchAsync(async (req, res, next) => {
  const rssCategories = await rssCategoryService.findAll();
  res.status(200).json({
    status: "success",
    results: rssCategories.length,
    data: {
      rssCategories,
    },
  });
  logger.info(`${rssCategories.length} rss category was found`);
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssCategory = await rssCategoryService.findById(id);
  if (!rssCategory) {
    return next(new AppError(`Category with ${id} ID could not found`));
  }
  if (rssCategory) {
    res.status(200).json({
      status: "success",
      data: {
        rssCategory,
      },
    });
  }
  logger.info(`${id} was found`);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssCategory = await rssCategoryService.update(id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      rssCategory,
    },
  });
  logger.info(`${id} was updated`);
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssCategory = await rssCategoryService.remove(id);
  res.status(200).json({
    status: "success",
    data: {
      rssCategory,
    },
  });
  logger.info(`Category with ${id} ID was deleted`);
});
