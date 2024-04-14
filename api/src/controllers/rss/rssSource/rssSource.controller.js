const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");
const rssSourceService = require("./rssSource.service");

exports.create = catchAsync(async (req, res, next) => {
  const rssSource = await rssSourceService.create(req.body);
  if (!rssSource) {
    return next(new AppError(`Source could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssSource,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const rssSources = await rssSourceService.findAll();
  res.status(200).json({
    status: "success",
    results: rssSources.length,
    data: {
      rssSources,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssSource = await rssSourceService.findById(id);
  if (!rssSource) {
    return next(new AppError(`Source with ${id} ID could not found`));
  }
  if (rssSource) {
    res.status(200).json({
      status: "success",
      data: {
        rssSource,
      },
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssSource = await rssSourceService.update(id, req.body);
  if (!rssSource) {
    return next(new AppError(`Source with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssSource,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssSource = await rssSourceService.remove(id);
  if (!rssSource) {
    return next(new AppError(`Source with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssSource,
    },
  });
});
