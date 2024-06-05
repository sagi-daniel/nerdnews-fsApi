const { rssParser } = require('./rssParser');
const { create, findByMonthRange } = require('./rssHandlerService');
const { findAll } = require('./rssHandlerService');

const MONTH_RANGE = 2;

async function rssHandler() {
  const rssSources = await findAll();
  const existingNews = await findByMonthRange(MONTH_RANGE);
  const newFeeds = [];
  for (const rssSource of rssSources) {
    const feeds = await rssParser(rssSource.sourceLink, rssSource.category, rssSource.sourceType, rssSource._id);
    for (feedItem of feeds) {
      const isExisting = existingNews.some((existing) => existing.link === feedItem.link);
      if (!isExisting) {
        newFeeds.push(feedItem);
      }
    }
  }
  for (const feed of newFeeds) {
    await create(feed);
  }
  return newFeeds;
}

module.exports = rssHandler;
