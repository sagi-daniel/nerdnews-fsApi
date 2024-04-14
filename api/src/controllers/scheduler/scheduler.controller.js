const logger = require("../../config/logger");
const rssHandler = require("./rssScheduleHandling/rssHandler");
const upcomingMovieHandler = require("./upcomingMovieScheduleHandling/upcomingMovieHandler");

async function scheduler(req, res, next) {
  logger.info("Scheduled tasks...");
  try {
    const savedFeeds = await rssHandler();
    logger.info(`${savedFeeds.length} feed saved successfully`);
    const savedMovies = await upcomingMovieHandler();
    logger.info(`${savedMovies.length} movie saved successfully`);
  } catch (error) {
    logger.error("Error fetching and saving data:", error);
    return next(new createError.InternalServerError(`Scheduled task error`));
  }
}

module.exports = scheduler;
