const Source = require('../../models/Source.model');

exports.create = (source) => {
  const newSource = new Source(source);
  return newSource.save();
};

exports.findAll = () =>
  Source.find().populate({
    path: 'category',
    select: '-__v -createdAt -updatedAt',
  });

exports.findById = (id) =>
  Source.findById(id).populate({
    path: 'category',
    select: '-__v -createdAt -updatedAt',
  });

exports.update = (id, source) => Source.findByIdAndUpdate(id, source, { new: true });

exports.remove = (id) => Source.findByIdAndDelete(id);
