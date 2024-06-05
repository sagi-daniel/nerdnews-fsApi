const RssSource = require('../../models/RssSource.model');

exports.create = (rssSource) => {
  const newRssSource = new RssSource(rssSource);
  return newRssSource.save();
};

exports.findAll = () => RssSource.find();

exports.findById = (id) =>
  RssSource.findById(id).populate({
    path: 'category',
    select: '-__v -createdAt -updatedAt',
  });

exports.update = (id, rssSource) => RssSource.findByIdAndUpdate(id, rssSource, { new: true });

exports.remove = (id) => RssSource.findByIdAndDelete(id);
