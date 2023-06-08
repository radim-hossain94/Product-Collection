
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verify = async (req, res, next) =>{
    try {
        let token = req.headers.api_key;

        if (!token) {
          res.status(401).json({
            message: "Token is required",
          });
        } else {
          jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
              res.status(500).json({
                message: "Invalid token",
              });
            }
            req.user = decode;
            next();
          });
        }
    } catch (error) {
        return res.json(error)
    }


}