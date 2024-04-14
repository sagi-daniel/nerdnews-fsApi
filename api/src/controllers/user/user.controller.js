const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const userService = require("./user.service");

exports.create = catchAsync(async (req, res, next) => {
  const user = await userService.create(req.body);
  if (!user) {
    return next(new AppError(`User could not saved`));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const users = await userService.findAll();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.findById(id);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.update(id, req.body);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.remove(id);
  if (!user) {
    return next(new AppError(`User with ${id} ID could not found`));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
