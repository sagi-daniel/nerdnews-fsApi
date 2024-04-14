const createError = require("http-errors");
const { rssParser } = require("./rssParser");
const {
  create,
  findByMonthRange,
} = require("../../rss/rssNews/rssNews.service");
const { findAll } = require("../../rss/rssSource/rssSource.service");

//*SCHUDULER VARIABLE UPDATING RANGE BY MONTH
const MONTH_RANGE = 2;

async function rssHandler() {
  try {
    const rssSources = await findAll().populate("category");
    const existingNews = await findByMonthRange(MONTH_RANGE);
    const newFeeds = [];
    for (const rssSource of rssSources) {
      const feeds = await rssParser(
        rssSource.sourceLink,
        rssSource.category._id,
        rssSource.sourceType
      );
      for (feedItem of feeds) {
        const isExisting = existingNews.some(
          (existing) => existing.link === feedItem.link
        );
        if (!isExisting) {
          newFeeds.push(feedItem);
        }
      }
    }
    for (const feed of newFeeds) {
      await create(feed);
    }
    return newFeeds;
  } catch (error) {
    return next(
      new createError.InternalServerError(
        "Something went wring with the RSS scheduler"
      )
    );
  }
}

module.exports = rssHandler;
