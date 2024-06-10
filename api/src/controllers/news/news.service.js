const mongoose = require('mongoose');
const News = require('../../models/News.model');
const Category = require('../../models/Category.model');

exports.create = (news) => {
  const newNews = new News(news);
  return newNews.save();
};

exports.findAll = async (sortOrder, limit, skip, categoryName) => {
  let query = {};
  if (categoryName) {
    const category = await Category.findOne({ categoryName: categoryName.toUpperCase() }).select('_id');
    if (category) {
      query.category = category._id;
    } else {
      return [];
    }
  }
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
    .skip(parseInt(skip))
    .limit(parseInt(limit));
};

exports.findById = (id) =>
  News.findById(id).populate({
    path: 'category',
    select: '-__v',
  });

exports.update = (id, news) => News.findByIdAndUpdate(id, news, { new: true });

exports.remove = (id) => News.findByIdAndDelete(id);
