const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).send({ Message: "No token provided" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ Message: "Unauthorised access" });
      }
      req.decoded = decoded;
      next();
    });
  }
};
