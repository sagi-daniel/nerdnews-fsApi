const express = require('express');
const morgan = require('morgan');
const cron = require('node-cron');
const cors = require('cors');
const compression = require('compression');
const { join } = require('path');
const setupSwagger = require('./swagger');

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
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://nerdnews.hu',
    credentials: true,
  })
);

const frontendAppPath = join(__dirname, '..', 'dist');

const AppError = require('./utils/appError');

setupSwagger(app);

// *GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https:', "'unsafe-inline'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        fontSrc: ["'self'", 'https:', 'data:', 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', '*'],
        connectSrc: ["'self'", 'https:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

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

// Compress lib
app.use(compression());

// ROUTES MIDDLEWARES
app.use('/user', require('./controllers/user/user.routes'));
app.use('/movie', require('./controllers/movie/movie.routes'));
app.use('/news', require('./controllers/news/news.routes'));
app.use('/source', require('./controllers/source/source.routes'));
app.use('/category', require('./controllers/category/category.routes'));

// Serve static files
app.use(express.static(frontendAppPath));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.get('*', (req, res) => {
  res.sendFile(join(frontendAppPath, 'index.html'));
});

// SCHEDULED TASKS
cron.schedule('0 8,16,0 * * *', require('./controllers/scheduler/scheduler.controller'));

app.all('*', (req, res, next) => {
  next(new AppError(`Could not found ${req.originalUrl} on this server!`, 404));
});

// GLOBAL MIDDLEWARE
app.use(require('./controllers/error/error.controller'));

module.exports = app;
