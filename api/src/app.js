const express = require("express");
const morgan = require("morgan");
const cron = require("node-cron");
const app = express();
const AppError = require("./utils/appError");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//* ROUTES
app.use("/user", require("./controllers/user/user.routes"));
app.use(
  "/upcomingmovie",
  require("./controllers/upcomingmovie/upcomingMovie.routes")
);
app.use("/rssnews", require("./controllers/rss/rssNews/rssNews.routes"));
app.use("/rsssource", require("./controllers/rss/rssSource/rssSource.routes"));
app.use(
  "/rsscategory",
  require("./controllers/rss/rssCategory/rssCategory.routes")
);

// //*SCHEDULED TASKS
cron.schedule(
  "* * * * *",
  require("./controllers/scheduler/scheduler.controller")
);

app.all("*", (req, res, next) => {
  next(new AppError(`Could not found ${req.originalUrl} on this server!`, 404));
});

app.use(require("./controllers/error/error.controller"));

module.exports = app;
