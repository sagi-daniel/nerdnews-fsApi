const { createLogger, format, transports } = require('winston');
const AppError = require('../../utils/appError');
const rssHandler = require('./rssScheduleHandling/rssHandler');
const upcomingMovieHandler = require('./upcomingMovieScheduleHandling/upcomingMovieHandler');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [new transports.Console()],
});

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
