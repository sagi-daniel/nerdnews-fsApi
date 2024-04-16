const User = require("../../models/User.model");

exports.create = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

exports.findAll = () => User.find();

exports.findById = (id) => User.findById(id);

exports.update = (id, user) => User.findByIdAndUpdate(id, user, { new: true });

exports.remove = (id) => User.findByIdAndDelete(id);
