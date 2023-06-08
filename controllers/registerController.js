const User = require('../models/User');
require('dotenv').config();
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');

exports.register = async (req, res)=>{
    try {
        const { userName, email, password, age, gender, mobile, address } = req.body;

        let validUser = true;
        
        if (!userName) {
            validUser = false;
          res.status(404).json({
            error: "Username is required",
          });
        }
        if (!email) {
          validUser = false;
          res.status(404).json({
            error: "Email is required",
          });
        }
        const findUserName = await User.findOne({ userName });
        if (findUserName) {
            validUser = false;
          res.status(403).json({
            error: "Username already exists",
          });
        }

        if (!password) {
            validUser = false;
          res.status(404).json({
            error: "Password is required",
          });
        } else if (password.length < 6) {
            validUser = false;
          res.status(301).json({
            error: "Password length should be atleast 6 character long",
          });
        }
        if (!age) {
            validUser = false;
          res.status(401).json({
            error: "Age is required",
          });
        }
        if (!gender) {
            validUser = false;
          res.status(401).json({
            error: "Gender is required",
          });
        }
        if (!mobile) {
            validUser = false;
          res.status(401).json({
            error: "Mobile number is required",
          });
        } else if (mobile.length < 11 || mobile.length > 13) {
          res.status(403).json({
            error: "Mobile number is not valid",
          });
        }

        const hasPassword = await hashPassword(password);

        if(validUser){
            const user = await new User({
              userName,
              email,
              password: hasPassword,
              age,
              gender,
              mobile,
              address,
            }).save();

            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
              expiresIn: "10h",
            });

            res.status(200).json({
              user: {
                userName: user.userName,
                age: user.age,
                gender: user.gender,
                mobile: user.mobile,
                address: user.address,
              },
              token,
              message: "Regstraton completed",
            });
        }else{
            res.json({
                message: 'Regstraton failed'
            })
        }
        

        
    } catch (error) {
        console.log(error);
    }
}