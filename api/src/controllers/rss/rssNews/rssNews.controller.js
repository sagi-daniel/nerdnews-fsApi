const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");
const rssNewsService = require("./rssNews.service");

exports.create = catchAsync(async (req, res, next) => {
  const rssnNews = await rssNewsService.create(req.body);
  if (!rssnNews) {
    return next(new AppError(`News could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssnNews,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const rssNews = await rssNewsService.findAll();
  res.status(200).json({
    status: "success",
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
      status: "success",
      data: {
        rssNews,
      },
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssnNews = await rssNewsService.update(id, req.body);
  if (!rssNews) {
    return next(new AppError(`News with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      rssnNews,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rssnNews = await rssNewsService.remove(id);
  if (!rssNews) {
    return next(new AppError(`News with ${id} ID could not found`));
  }

  res.status(200).json({
    status: "success",
    data: {
      rssnNews,
    },
  });
});
