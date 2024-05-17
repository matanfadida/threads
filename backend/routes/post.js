const express = require('express');

const router = express.Router();

const PostController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');

router.get('/get-posts', isAuth, PostController.getPosts);

router.get('/get-post', isAuth, PostController.getPost);

router.post('/add-post', isAuth, PostController.addPost);

router.post('/update-like', isAuth, PostController.UpdateLikes);

router.post('/add-comments', isAuth, PostController.AddComment);


module.exports = router;

