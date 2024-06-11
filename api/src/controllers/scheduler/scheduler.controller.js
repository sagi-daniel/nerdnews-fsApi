const AppError = require('../../utils/appError');
const logger = require('../../utils/logger');
const rssHandler = require('./rssScheduleHandling/rssHandler');
const upcomingMovieHandler = require('./movieScheduleHandling/upcomingMovieHandler');

async function scheduler(req, res, next) {
  logger.info('Scheduled tasks started...');
  try {
    await rssHandler();
    await upcomingMovieHandler();
    logger.info('Scheduled tasks completed successfully');
  } catch (error) {
    logger.error(`Scheduled task error: ${error.message}`);
    return next(new AppError('Scheduled task error', 500));
  }
}

module.exports = scheduler;
