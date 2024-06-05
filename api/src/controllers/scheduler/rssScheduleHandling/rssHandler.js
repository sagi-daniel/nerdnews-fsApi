const contentSimilarityChecker = require('../../../utils/contentSimilarityChecker');
const { rssParser } = require('./rssParser');
const { create, findByMonthRange, findAll } = require('./rssHandlerService');

const MONTH_RANGE = 2;

async function rssHandler() {
  const rssSources = await findAll();
  const existingNews = await findByMonthRange(MONTH_RANGE);
  const newFeeds = [];

  for (const rssSource of rssSources) {
    const feeds = await rssParser(rssSource.sourceLink, rssSource.category, rssSource.sourceType, rssSource._id);
    const filteredFeeds = filterSimilarFeeds(feeds);

    for (const feedItem of filteredFeeds) {
      if (!isFeedExisting(feedItem, existingNews)) {
        newFeeds.push(feedItem);
      }
    }
  }

  for (const feed of newFeeds) {
    await create(feed);
  }

  return newFeeds;
}

function filterSimilarFeeds(feeds) {
  return feeds.filter((feed, index, array) => {
    for (let i = 0; i < index; i++) {
      const titleSimilarity = contentSimilarityChecker(feed.title, array[i].title);
      const contentSimilarity = contentSimilarityChecker(feed.content, array[i].content);

      if (titleSimilarity > 70 || contentSimilarity > 80) {
        return false;
      }
    }
    return true;
  });
}

function isFeedExisting(feedItem, existingNews) {
  return existingNews.some(
    (existing) =>
      existing.link === feedItem.link ||
      contentSimilarityChecker(existing.title, feedItem.title) > 90 ||
      contentSimilarityChecker(existing.content, feedItem.content) > 80
  );
}

module.exports = rssHandler;
