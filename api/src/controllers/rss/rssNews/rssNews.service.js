const RssNews = require("../../../models/rss/RssNews.model");

exports.create = (rssNews) => {
  const newRssNews = new RssNews(rssNews);
  return newRssNews.save();
};

exports.findAll = () => RssNews.find().populate("category");

exports.findById = (id) => RssNews.findById(id).populate("category");

exports.findByMonthRange = (monthRange) =>
  RssNews.find({
    release: {
      $gte: new Date(new Date().getMonth() - monthRange).toISOString(),
      $lte: new Date().toISOString(),
    },
  });

exports.update = (id, rssNews) =>
  RssNews.findByIdAndUpdate(id, rssNews, { new: true });

exports.delete = (id) => RssNews.findByIdAndRemove(id);
