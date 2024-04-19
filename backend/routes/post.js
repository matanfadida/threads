const express = require('express');

const router = express.Router();

const PostController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');

router.post('/get-posts', isAuth, PostController.getPosts);
router.post('/add-post', isAuth, PostController.addPost);
router.post('/update-like', isAuth, PostController.UpdateLikes);

module.exports = router;

