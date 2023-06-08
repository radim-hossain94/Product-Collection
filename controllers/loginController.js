const { comparePassword } = require("../helpers/auth");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/User");


exports.login = async(req, res) =>{
    const {email, password} = req.body;

    const user = await User.findById(req.user._id);
    console.log(user.email);
    if(!user.email){
        return res.status(404).json({
            "error": "email is requred"
        });
    }
    if (!password || password.length < 6) {
      return res.status(404).json({
        error: "password must be 6 length long",
      });
    }
    if(password){
        let match = await comparePassword(password, user.password);
        console.log(match);
        if (!match) {
          return res.status(400).json({
            message: "Email or password doesn't match",
          });
        }
    }
    
    const login_token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {expiresIn: '10d'});
    

    res.json({'userName': user.userName,
    'login_token': login_token
});
}