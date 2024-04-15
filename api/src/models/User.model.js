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
      required: [true, "Please provide a valid username!"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please provide your email!"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confrim your password!"],
      minlength: 8,
    },
    firstName: {
      type: String,
      required: [true, "Please tell us your firstname!"],
    },
    lastName: {
      type: String,
      rrequired: [true, "Please tell us your lastname!"],
    },
    photo: String,
    userNews: [{ type: Schema.Types.ObjectId, ref: "RssNews" }],
    userMovies: [{ type: Schema.Types.ObjectId, ref: "UpcomingMovie" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
