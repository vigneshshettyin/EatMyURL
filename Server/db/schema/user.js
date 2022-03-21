const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

//Hashing password pre saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//Generating token once user is created
UserSchema.methods.generateToken = async function (userid) {
  const token = await jwt.sign({ userid }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};
UserSchema.methods.generateRefreshToken = async function (userid) {
  const refreshtoken = await jwt.sign({ userid }, process.env.SECRET_RKEY, {
    expiresIn: "30d",
  });
  return refreshtoken;
};

//Comparing with hash password
UserSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
