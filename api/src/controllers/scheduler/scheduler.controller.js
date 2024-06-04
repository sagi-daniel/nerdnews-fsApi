const AppError = require('../../utils/appError');
const rssHandler = require('./rssScheduleHandling/rssHandler');
const upcomingMovieHandler = require('./upcomingMovieScheduleHandling/upcomingMovieHandler');

async function scheduler(req, res, next) {
  logger.info('Scheduled tasks...');
  try {
    await rssHandler();
    await upcomingMovieHandler();
  } catch (error) {
    return next(new AppError(`Scheduled task error`));
  }
}

module.exports = scheduler;
