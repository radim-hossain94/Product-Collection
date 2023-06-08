const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    min: 11,
  },
  address: {
    type: String,
    required: false,
    default: "Dhaka, Bangladesh",
  },
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;