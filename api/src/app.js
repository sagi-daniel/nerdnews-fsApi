const express = require('express');
const morgan = require('morgan');
const cron = require('node-cron');
const cors = require('cors');
//Security libs
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
const AppError = require('./utils/appError');

// *GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit request from same API
app.use(
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again later!',
  })
);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against noSWL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent paramter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// ROUTES MIDDLEWARES
app.use('/user', require('./controllers/user/user.routes'));

app.use('/upcomingmovie', require('./controllers/upcomingmovie/upcomingMovie.routes'));
app.use('/rssnews', require('./controllers/news/news.routes'));
app.use('/rsssource', require('./controllers/rssSource/rssSource.routes'));
app.use('/rsscategory', require('./controllers/category/category.routes'));

//SCHEDULED TASKS
cron.schedule('* 2-3 * * *', require('./controllers/scheduler/scheduler.controller'));

app.all('*', (req, res, next) => {
  next(new AppError(`Could not found ${req.originalUrl} on this server!`, 404));
});

//GLOBAL MIDDLEWARE
app.use(require('./controllers/error/error.controller'));

module.exports = app;
