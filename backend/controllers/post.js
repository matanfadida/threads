const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch {
        
    }
}