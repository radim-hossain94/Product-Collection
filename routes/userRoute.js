const express = require('express');
const { register } = require('../controllers/registerController');
const { verify } = require('../middlewares/verify');
const { login } = require('../controllers/loginController');
const router = express.Router();


router.post('/register', register);

router.post('/login', verify, login);


module.exports = router;