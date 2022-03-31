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
  refreshtoken: {
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
  const name = this.name;
  const email = this.email;
  this.token = jwt.sign({ email, name }, process.env.SECRET_KEY, {
    expiresIn: "10s",
  });
  this.refreshtoken = jwt.sign({ email, name }, process.env.SECRET_RKEY, {
    expiresIn: "30d",
  });
  next();
});

//Generating token once user is created
UserSchema.methods.generateToken = async function (email, name) {
  const token = await jwt.sign({ email, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};
UserSchema.methods.generateRefreshToken = async function (email, name) {
  const refreshtoken = await jwt.sign(
    { email, name },
    process.env.SECRET_RKEY,
    {
      expiresIn: "30d",
    }
  );
  return refreshtoken;
};
//Validating access token VerifyAccessToken
UserSchema.methods.accessToken = async function (token) {
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return {
        status: 401,
        message: "Access token invalid",
      };
    } else {
      return decoded;
    }
  });
};
//Comparing with hash password
UserSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
