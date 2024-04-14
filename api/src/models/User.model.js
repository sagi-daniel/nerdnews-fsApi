const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
      uppercase: true,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: true,
    },
    passwordConfirm: {
      type: String,
      required: false,
      minlength: 8,
      select: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userNews: {
      type: [{ type: Schema.Types.ObjectId, ref: "RssNews" }],
    },
    userMovies: {
      type: [{ type: Schema.Types.ObjectId, ref: "UpcomingMovie" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
