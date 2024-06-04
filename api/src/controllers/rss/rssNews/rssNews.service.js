const RssNews = require('../../../models/rss/RssNews.model');

exports.create = (rssNews) => {
  const newRssNews = new RssNews(rssNews);
  return newRssNews.save();
};

exports.findAll = (sort, limit) =>
  RssNews.find()
    .populate({
      path: 'category',
      select: '-__v -createdAt -updatedAt',
    })
    .sort({ release: sort })
    .limit(limit);

exports.findById = (id) =>
  RssNews.findById(id).populate({
    path: 'category',
    select: '-__v -createdAt -updatedAt',
  });

exports.findByMonthRange = (monthRange) =>
  RssNews.find({
    release: {
      $gte: new Date(new Date().getMonth() - monthRange).toISOString(),
      $lte: new Date().toISOString(),
    },
  });

exports.update = (id, rssNews) => RssNews.findByIdAndUpdate(id, rssNews, { new: true });

exports.remove = (id) => RssNews.findByIdfindByIdAndDeleteAndRemove(id);
