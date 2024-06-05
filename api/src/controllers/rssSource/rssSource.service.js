const RssSource = require("../../../models/rss/RssSource.model");

exports.create = (rssSource) => {
  const newRssSource = new RssSource(rssSource);
  return newRssSource.save();
};

exports.findAll = () => RssSource.find().populate("category");

exports.findById = (id) => RssSource.findById(id).populate("category");

exports.update = (id, rssSource) =>
  RssSource.findByIdAndUpdate(id, rssSource, { new: true });

exports.remove = (id) => RssSource.findByIdAndDelete(id);
