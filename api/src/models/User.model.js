const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      required: [true, "Please provide a valid userName!"],
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
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confrim your password!"],
      validate: {
        // Works on create user
        validator: function(confirmP) {
          return confirmP === this.password;
        },
        message: "Passwords are NOT match",
      },
    },
    firstName: {
      type: String,
      // required: [true, "Please tell us your firstname!"],
    },
    lastName: {
      type: String,
      // rrequired: [true, "Please tell us your lastname!"],
    },
    photo: String,
    userNews: [{ type: Schema.Types.ObjectId, ref: "RssNews" }],
    userMovies: [{ type: Schema.Types.ObjectId, ref: "UpcomingMovie" }],
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

module.exports = mongoose.model("User", UserSchema);
