const logger = require("../config/logger");

module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      logger.error(err.message);

      next(err);
    });
  };
};
