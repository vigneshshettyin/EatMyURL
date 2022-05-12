const express = require("express");
const User = require("../schema/user");
const URL = require("../schema/url");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchemaValidation = require("../@ValidationSchema/ValidateUser");
const authenticate = require("../Middleware/verifytoken");
const { authenticateUser } = require("../Middleware/authuser");
const tokenlist = {};
const UserRouter = express.Router();

//signup
UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send({ Message: "All fields are not filled" });
    return;
  }
  //Validate schema
  try {
    const value = await UserSchemaValidation.validateAsync({ ...req.body });
    if (!value) {
      return res.status(400).send({ Message: "Invalid format" });
    }
  } catch (e) {
    res.status(422).send({ Message: e });
    return;
  }
  try {
    console.log("Finding user")
    //If user exists, don't allow to signup
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      console.log("Uswr exists")
      res.status(500).send({ Message: "User Already exists" });
      return;
    }
    //Generate  temporary tokens whcih will be converted to valid tokens before saving
    const token = "temporary acces token";
    const refreshtoken = "temporary refresh token";

    //If not exists thn only create new User
    const newUser = new User({
      ...req.body,
      token: token,
      refreshtoken: refreshtoken,
    });
    console.log(newUser)
    const UserCreated = await newUser.save();

    //Response to be sent to frontend
    const UserData = {
      name: UserCreated.name,
      email: UserCreated.email,
      token: UserCreated.token,
      refreshtoken: UserCreated.refreshtoken,
    };

    res.status(200).send(UserData);
    return;
  } catch (e) {
    console.log(`error: ${e}`)
    res.status(400).send({ Message: e });
    return;
  }
});

//login
UserRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ Message: "All fields are not filled" });
    return;
  }
  //Find if user exists
  const findUser = await User.findOne({ email: email });
  console.log("User found");
  console.log(findUser);
  //if exists compare password
  if (findUser) {
    const passwordmatch = await findUser.comparePassword(password);

    //if password matches generate token and sent response to frontend
    if (passwordmatch) {
      //Generating new access and refresh token for user
      const token2 = await findUser.generateToken(email, findUser.name);
      const refreshtoken2 = await findUser.generateRefreshToken(
        email,
        findUser.name
      );
      //Updating tokens in DB as well
      const updateUserDb = await User.findByIdAndUpdate(
        { _id: findUser._id },
        { ...findUser, token: token2, refreshtoken: refreshtoken2 },
        { new: true }
      );

      console.log(updateUserDb);
      //Sending response so that it can be saved at client side
      const response = {
        _id: updateUserDb._id,
        name: updateUserDb.name,
        email: updateUserDb.email,
        token: updateUserDb.token,
        refreshtoken: updateUserDb.refreshtoken,
      };

      res.status(200).send(response);
    } else {
      //If password mismatches
      res.status(400).send({ Message: "Invalid Cridentials" });
    }
    //If user doesnt exists
  } else {
    res.status(400).send({ Message: "User doesnt exists" });
    return;
  }
});

//While signup as well as login, we had sent the acesss and refresh token
//Now this route will help in verifying access token
//If valid, no issue
//If invalid with help of refresh token new accessand refresh tokens will be provided
UserRouter.post("/token", authenticate, async (req, res) => {
  //If access valid it'll come here
  //If access in valid and refresh valid
  //It'll generate new tokens and thn come here
  //If refresh too is invalid it wont come here.
  return res.status(200).send({ Message: "Authorised User" });
});

UserRouter.get("/getallurls", async (req, res) => {
  console.log(req.user);
  const { user } = req.body;
  var allurls = await URL.find({ user: user }).populate("user");

  res.status(200).send(allurls);
});
module.exports = UserRouter;
