const jwt = require("jsonwebtoken");
const User = require("../schema/user");

const authenticateUser = async (req, res, next) => {
  let token;
  //If token is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //Getting token
    token = req.headers.authorization.split(" ")[1];
    //Decoding token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
        return res.status(401).send({Message:"Unauthorized access"})
    }
    //Sending user info
    req.user = await User.findById({ _id: decoded.userid }).select("-password");
    next();
  }
  if (!token) {
    res.status(401).send({ Message: "Unauthorised access" });
  }
};

module.exports = { authenticateUser };
