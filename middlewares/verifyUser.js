const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyUser = async (req, res, next) => {
  const login_token = req.headers.login_token;
  if (!login_token) {
    return res.status(401).json({
      error: "You need to login First",
    });
  } else {
    jwt.verify(login_token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          error: "Invalid Token or Expired token",
        });
      } else {
        req.user = decode;
        next();
      }
    });
  }
};
