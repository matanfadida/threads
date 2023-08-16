const Post = require('../models/Post');
const User = require('../models/User');

exports.getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find().populate('user');
        if(!posts){
            const error = new Error('not have post!')
            error.statusCode = 500
            throw error;
        }
        console.log(posts);
        res.status(200).json(posts);
    } catch {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addPost = async(req, res, next) => {
    const userId = req.userId;
    const content = req.body.content;
    const createAt = new Date();
    const imageUrl = req.body.imageUrl;
    const likes = 0;
    try{
        const user = await User.findOne({_id:userId});

        if(!user){
            const error = new Error('not find a user !');
            error.statusCode = 401;
            throw error;
        }

        const post = new Post({
            content: content,
            imageUrl: imageUrl,
            createAt: createAt,
            likes: likes,
            user: userId,
        });
        await post.save();

        user.posts.push(post);
        await user.save();
        res.status(200).json({message: "create post success !"});

    } catch (err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}