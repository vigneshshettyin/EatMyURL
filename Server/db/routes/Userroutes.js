const express = require("express");
const User = require("../schema/user");
const Joi = require("joi");
const UserSchemaValidation = require("../@ValidationSchema/ValidateUser");
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
    //If user exists, don't allow to signup
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      res.status(500).send({ Message: "User Already exists" });
      return;
    }

    //If not exists thn only create new User
    const newUser = new User({ ...req.body });
    const UserCreated = await newUser.save();
    //Generate token for user to be sent to frontend
    const token = await UserCreated.generateToken(UserCreated._id);
    const refreshtoken = await UserCreated.generateRefreshToken(
      UserCreated._id
    );
    //Response to be sent to frontend
    const UserData = {
      name: UserCreated.name,
      email: UserCreated.email,
      token: token,
      refreshtoken: refreshtoken,
    };

    res.status(200).send(UserData);
    return;
  } catch (e) {
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
  //if exists compare password
  if (findUser) {
    const passwordmatch = await findUser.comparePassword(password);

    //if password matches generate token and sent response to frontend
    if (passwordmatch) {
      const token = await findUser.generateToken(findUser._id);
      const refreshtoken = await findUser.generateRefreshToken(findUser._id);
      const response = {
        name: findUser.name,
        email: findUser.email,
        token: token,
        refreshtoken: refreshtoken,
      };
      tokenlist[refreshtoken] = response;
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

module.exports = UserRouter;
