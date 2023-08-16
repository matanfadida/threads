const express = require('express');

const router = express.Router();

const PostController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');

router.get('/get-posts', isAuth, PostController.getPosts);
router.post('/add-post', isAuth, PostController.addPost);

module.exports = router;

