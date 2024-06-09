const News = require('../../models/News.model');

exports.create = (news) => {
  const newNews = new News(news);
  return newNews.save();
};

exports.findAll = (sort, limit, skip, category) =>
  News.find(category ? { category: category } : {})
    .populate({
      path: 'category',
      select: '-__v',
    })
    .populate({
      path: 'source',
      select: '-__v -createdAt -updatedAt',
    })
    .sort({ release: sort })
    .skip(skip)
    .limit(limit);

exports.findById = (id) =>
  News.findById(id).populate({
    path: 'category',
    select: '-__v',
  });

exports.update = (id, news) => News.findByIdAndUpdate(id, news, { new: true });

exports.remove = (id) => News.findByIdfindByIdAndDeleteAndRemove(id);
