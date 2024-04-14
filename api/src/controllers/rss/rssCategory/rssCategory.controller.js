const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");
const rssCategoryService = require("./rssCategory.service");

exports.create = catchAsync(async (req, res, next) => {
  const rssCategory = await rssCategoryService.create(req.body);
  if (!rssCategory) {
    return next(new AppError(`Category could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssCategory,
    },
  });
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
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssCategory = await rssCategoryService.update(id, req.body);
  if (!rssCategory) {
    return next(new AppError(`Category with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssCategory,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssCategory = await rssCategoryService.remove(id);
  if (!rssCategory) {
    return next(new AppError(`Category with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssCategory,
    },
  });
});
