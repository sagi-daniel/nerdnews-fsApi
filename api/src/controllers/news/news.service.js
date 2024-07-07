const News = require('../../models/News.model');
const Category = require('../../models/Category.model');
const { removeAccents } = require('../../utils/helpers');

exports.create = (news) => {
  const newNews = new News(news);
  return newNews.save();
};

exports.findAll = async (sortOrder, limit, skip) => {
  return await News.find()
    .populate({
      path: 'category',
      select: '-__v',
    })
    .populate({
      path: 'source',
      select: '-__v -createdAt -updatedAt',
    })
    .sort({ release: sortOrder })
    .limit(limit)
    .skip(skip);
};

exports.findByQuery = async (searchText, fromDate, toDate, category, sortOrder, page, pageSize) => {
  let query = {};

  if (fromDate && toDate && fromDate < toDate) {
    query.release = {
      $gte: fromDate,
      $lte: toDate,
    };
  }

  if (category && category !== 'ALL') {
    const categoryArr = category.split(',').map((category) => category.trim().toUpperCase());

    const categoryIdArr = await Promise.all(
      categoryArr.map(async (category) => {
        const categoryObj = await Category.findOne({ categoryName: category }).select('_id');
        return categoryObj ? categoryObj._id : null;
      })
    );

    const validCategoryIds = categoryIdArr.filter((id) => id !== null);

    if (validCategoryIds.length > 0) {
      query.category = { $in: validCategoryIds };
    }
  }

  if (searchText) {
    const regex = new RegExp(removeAccents(searchText), 'i'); // 'i' for case-insensitive
    query.$or = [{ title: { $regex: regex } }, { content: { $regex: regex } }];
  }

  const totalCount = await News.countDocuments(query);
  const totalPages = Math.ceil(totalCount / pageSize);

  // Ensure the page value is within the valid range
  page = Math.max(1, Math.min(page, totalPages));

  const skip = (page - 1) * pageSize;

  const news = await News.find(query)
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

  return { news, totalItems: totalCount, totalPages };
};

exports.findById = (id) =>
  News.findById(id).populate({
    path: 'category',
    select: '-__v',
  });

exports.update = (id, news) => News.findByIdAndUpdate(id, news, { new: true });

exports.remove = (id) => News.findByIdAndDelete(id);
