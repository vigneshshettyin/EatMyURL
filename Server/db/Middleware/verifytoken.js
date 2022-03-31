const jwt = require("jsonwebtoken");
const { updateMany } = require("../schema/user");
const User = require("../schema/user");
module.exports = async (req, res, next) => {
  try {
    const { _id, name, email, token, refreshtoken } = req.body;

    console.log(refreshtoken);
    if (!refreshtoken || !token) {
      return res.status(400).send({ Message: "Required tokens not sent" });
    }
    //Getting user with help of email
    const findUser = await User.findById({ _id: _id });

    //Now checking if acess token is valid
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      //If access token is valid no need of any procedure
      if (decoded) {
        res.status(200).send({ Message: "Access  token  is valid" });
      } else {
        //Access token is not valid
        //Let's check if refresh sent is valid

        if (refreshtoken === findUser.refreshtoken) {
          //Generating new access token for user

          //This function will update tokens in DB //It provides new access and refresh token
          const tokens = async () => {
            //Checking if refresh token is valid first
            const validrefresh = await jwt.verify(
              refreshtoken,
              process.env.SECRET_RKEY
            );
            //If valid thn oinly new tokens will be generated and updated in DB
            if (validrefresh) {
              const newtoken2 = await findUser.generateToken(email, name);
              const newrefreshtoken2 = await findUser.generateRefreshToken(
                email,
                name
              );

              //Updating user in DB
              const UpdateUser = await User.findByIdAndUpdate(
                { _id: findUser }._id,
                {
                  ...findUser,
                  token: newtoken2,
                  refreshtoken: newrefreshtoken2,
                },
                { new: true }
              );
            } else {
              //If refresh is invalid too(as its no longer valid)
              res.status(401).send("Unauthorised Access");
            }
          };
          tokens();

          //Sending response
          next();
        } else {
          //If refresh is invalid too(as not one in DB)
          res.status(401).send({ Message: "Unauthorised acess" });
        }
      }
    });
  } catch (e) {
    console.log(`error is: ${e}`);
  }
};
