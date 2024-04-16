const RssCategory = require("../../../models/rss/RssCategory.model");

exports.create = (rssCategory) => {
  const newrRssCategory = new RssCategory(rssCategory);
  return newrRssCategory.save();
};

exports.findAll = () => RssCategory.find();

exports.findById = (id) => RssCategory.findById(id);

exports.update = (id, rssCategory) =>
  RssCategory.findByIdAndUpdate(id, rssCategory, { new: true });

exports.remove = (id) => RssCategory.findByIdAndDelete(id);
