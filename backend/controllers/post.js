const Post = require("../models/Post");
const Activity = require('../models/Activity');
const User = require("../models/User");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "user",
      select: "userName image",
    });
    if (!posts) {
      const error = new Error("not have post!");
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json(posts);
  } catch {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addPost = async (req, res, next) => {
  const userId = req.userId;
  const content = req.body.content;
  const showTo = req.body.content;
  const createAt = new Date();
  const imageUrl = req.body.image;
  const likes = { count: 0, userId: [] };
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      const error = new Error("not find a user !");
      error.statusCode = 401;
      throw error;
    }

    const post = new Post({
      content: content,
      // imageUrl: imageUrl,
      createAt: createAt,
      showTo:showTo,
      likes: likes,
      user: userId,
    });
    await post.save();

    user.posts.push(post);
    await user.save();
    res.status(200).json({ message: "create post success !" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.UpdateLikes = async (req, res, next) => {
  const like = req.body.like;
  const postId = req.body.postId;
  const userId = req.userId;
  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      const error = new Error("not have post!");
      error.statusCode = 402;
      throw error;
    }

    post.likes.count += like;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      const error = new Error("not find a user !");
      error.statusCode = 401;
      throw error;
    }

    if (like === -1) {
      post.likes.userId = post.likes.userId.filter((item) => item.toString() !== req.userId);

      if (user.Activity.likes.find((x) => x.toString() === postId)) {
        user.Activity.likes = user.Activity.likes.filter(
          (x) => x.toString() !== postId
        );
      }
    } else {
      post.likes.userId.push(req.userId);
      user.Activity.likes.push(post._id);
    }

    await post.save();
    await user.save();
    
    const userCreate = await User.findOne({ _id: post.user });
    if (!userCreate) {
      const error = new Error("not find a user !");
      error.statusCode = 401;
      throw error;
    }

    const newNotification = { userOwner:userCreate._id, user: userId, action: "like", postId: postId };

    if(like === -1){
        var objectDeleted = await Activity.findOne(newNotification);
        await Activity.deleteOne(newNotification);
        userCreate.Activity.notification = userCreate.Activity.notification.filter(item => item.toString() !== objectDeleted._id.toString());
    }else{
      newNotification.createdAt = new Date();
        const newActivity = new Activity(newNotification);
        await newActivity.save();
        userCreate.Activity.notification.push(newActivity._id);
    }

    await userCreate.save();

    res.status(200).json({ message: "update like" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};