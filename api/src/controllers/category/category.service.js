const Category = require('../../../models/Category.model');

exports.create = (category) => {
  const newCategory = new Category(category);
  return newCategory.save();
};

exports.findAll = () => Category.find();

exports.findById = (id) => Category.findById(id);

exports.update = (id, category) => Category.findByIdAndUpdate(id, Category, { new: true });

exports.remove = (id) => Category.findByIdAndDelete(id);
