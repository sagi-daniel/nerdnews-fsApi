const News = require('../../../models/News.model');

exports.create = (news) => {
  const newNews = new News(news);
  return newNews.save();
};

exports.findAll = (sort, limit) =>
  News.find()
    .populate({
      path: 'category',
      select: '-__v -createdAt -updatedAt',
    })
    .sort({ release: sort })
    .limit(limit);

exports.findById = (id) =>
  News.findById(id).populate({
    path: 'category',
    select: '-__v -createdAt -updatedAt',
  });

exports.findByMonthRange = (monthRange) =>
  News.find({
    release: {
      $gte: new Date(new Date().getMonth() - monthRange).toISOString(),
      $lte: new Date().toISOString(),
    },
  });

exports.update = (id, news) => News.findByIdAndUpdate(id, news, { new: true });

exports.remove = (id) => News.findByIdfindByIdAndDeleteAndRemove(id);
