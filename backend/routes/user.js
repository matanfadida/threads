const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.SignUp);

router.post('/signin', userController.SignIn);

module.exports = router;