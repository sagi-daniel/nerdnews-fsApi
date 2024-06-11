const News = require('../../../models/News.model');
const RssSource = require('../../../models/Source.model');

exports.create = (news) => {
  const newNews = new News(news);
  return newNews.save();
};

exports.findByMonthRange = (monthRange) =>
  News.find({
    release: {
      $gte: new Date(new Date().getMonth() - monthRange).toISOString(),
      $lte: new Date().toISOString(),
    },
  });

exports.findAll = () => RssSource.find();
