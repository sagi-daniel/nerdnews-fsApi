const express = require('express');
const morgan = require('morgan');
const cron = require('node-cron');
const cors = require('cors');
const compression = require('compression');

// Security libs
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Start express app
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
const AppError = require('./utils/appError');

// *GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
app.use(
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again later!',
  })
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/dist`));

app.use(compression());

// ROUTES MIDDLEWARES
app.use('/user', require('./controllers/user/user.routes'));
app.use('/movie', require('./controllers/movie/movie.routes'));
app.use('/news', require('./controllers/news/news.routes'));
app.use('/source', require('./controllers/source/source.routes'));
app.use('/category', require('./controllers/category/category.routes'));

// SCHEDULED TASKS
cron.schedule('* * * * *', require('./controllers/scheduler/scheduler.controller'));

app.all('*', (req, res, next) => {
  next(new AppError(`Could not found ${req.originalUrl} on this server!`, 404));
});

// GLOBAL MIDDLEWARE
app.use(require('./controllers/error/error.controller'));

// Middleware for logging memory usage
app.use((req, res, next) => {
  const memoryUsage = process.memoryUsage();
  console.log(
    `Memory Usage - RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB, Heap Total: ${(
      memoryUsage.heapTotal /
      1024 /
      1024
    ).toFixed(2)} MB, Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
  );
  next();
});

module.exports = app;
