const mongoose = require('mongoose');
const News = require('../../models/News.model');
const Category = require('../../models/Category.model');

exports.create = (news) => {
  const newNews = new News(news);
  return newNews.save();
};

exports.findAll = async (sortOrder, limit, skip, categoryName) => {
  return await News.find()
    .populate({
      path: 'category',
      select: '-__v',
    })
    .populate({
      path: 'source',
      select: '-__v -createdAt -updatedAt',
    });
};

exports.findByQuery = async (fromDate, toDate, category, sortOrder, page, pageSize) => {
  let query = {
    release: {
      $lte: toDate,
      $gte: fromDate,
    },
  };

  if (category) {
    const categoryObj = await Category.findOne({ categoryName: category.toUpperCase() }).select('_id');
    if (categoryObj) {
      query.category = categoryObj._id;
    } else {
      return [];
    }
  }

  const skip = (page - 1) * pageSize;

  return await News.find(query)
    .populate({
      path: 'category',
      select: '-__v',
    })
    .populate({
      path: 'source',
      select: '-__v -createdAt -updatedAt',
    })
    .sort({ release: sortOrder })
    .skip(skip)
    .limit(pageSize);
};

exports.findById = (id) =>
  News.findById(id).populate({
    path: 'category',
    select: '-__v',
  });

exports.update = (id, news) => News.findByIdAndUpdate(id, news, { new: true });

exports.remove = (id) => News.findByIdAndDelete(id);
