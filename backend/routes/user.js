const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.SignUp);

router.post('/signin', userController.SignIn);

router.get('/get-activities',isAuth, userController.GetActivities);

router.get('/get-user',isAuth, userController.GetUser);

module.exports = router;