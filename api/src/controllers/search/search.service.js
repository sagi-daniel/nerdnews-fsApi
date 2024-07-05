const News = require('../../models/News.model');
const Movie = require('../../models/Movie.model');

exports.findByQuery = async (page, pageSize, searchText) => {
  const query = {
    $or: [
      { title: { $regex: searchText, $options: 'i' } },
      { content: { $regex: searchText, $options: 'i' } },
      { overview: { $regex: searchText, $options: 'i' } },
    ],
  };

  const newsCount = await News.countDocuments(query);
  const movieCount = await Movie.countDocuments(query);
  const totalCount = newsCount + movieCount;
  const totalPages = Math.ceil(totalCount / pageSize);

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
    .skip(skip)
    .limit(pageSize);

  const movies = await Movie.find(query)
    .populate({
      path: 'genre',
      select: '-__v',
    })
    .skip(skip)
    .limit(pageSize);

  return { news, movies, totalItems: totalCount, totalPages };
};
