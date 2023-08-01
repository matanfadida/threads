const express = require('express');

const router = express.Router();

const PostController = require('../controllers/post');

router.get('/get-posts', PostController.getPosts);
router.get('/add-post', PostController.getPosts);

module.exports = router;

