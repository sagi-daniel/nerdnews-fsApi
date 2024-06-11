const logger = require('../../utils/logger');
const rssHandler = require('./rssScheduleHandling/rssHandler');
const upcomingMovieHandler = require('./movieScheduleHandling/upcomingMovieHandler');

async function scheduler(req, res, next) {
  logger.info('Scheduled tasks started...');
  try {
    await rssHandler();
    logger.info('RSS handler completed successfully.');
  } catch (error) {
    logger.error(`RSS handler error: ${error.message}`);
  }

  try {
    await upcomingMovieHandler();
    logger.info('Upcoming movie handler completed successfully.');
  } catch (error) {
    logger.error(`Upcoming movie handler error: ${error.message}`);
  }

  logger.info('Scheduled tasks completed.');
  next();
}

module.exports = scheduler;
