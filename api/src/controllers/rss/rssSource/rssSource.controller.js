const logger = require("../../../config/logger");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");
const rssSourceService = require("./rssSource.service");

exports.create = catchAsync(async (req, res, next) => {
  const rssSource = await rssSourceService.create(req.body);
  if (!rssSource || Object.keys(rssSource).length === 0) {
    return next(new AppError(`Source could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssSource,
    },
  });
  logger.info(`Source was saved`);
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
  logger.info(`${rssSources.length} RSS Source were founded`);
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
    logger.info(`${id} was found`);
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssSource = await rssSourceService.update(id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      rssSource,
    },
  });
  logger.info(`${id} was updated`);
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssSource = await rssSourceService.remove(id);
  res.status(200).json({
    status: "success",
    data: {
      rssSource,
    },
  });
  logger.info(`Source with ${id} ID was deleted`);
});
