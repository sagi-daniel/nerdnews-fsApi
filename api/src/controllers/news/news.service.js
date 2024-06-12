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
  let query = {};
  if (fromDate && toDate) {
    query.release = {
      $gte: fromDate,
      $lte: toDate,
    };
  }

  if (category) {
    const categoryArr = category.split(',').map((category) => category.trim().toUpperCase());

    // Using Promise.all to wait for all findOne queries to complete
    const categoryIdArr = await Promise.all(
      categoryArr.map(async (category) => {
        const categoryObj = await Category.findOne({ categoryName: category }).select('_id');
        return categoryObj ? categoryObj._id : null;
      })
    );

    // Filtering out null values (in case some categories were not found)
    const validCategoryIds = categoryIdArr.filter((id) => id !== null);

    if (validCategoryIds.length > 0) {
      query.category = { $in: validCategoryIds };
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
