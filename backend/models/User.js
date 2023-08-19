const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  posts: [
    {
      postId: { type: Schema.Types.ObjectId, ref: "Post" },
    },
  ],
  comments: [
    {
      commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    },
  ],
  followers: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  following: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  Activity:{
    likes:[
      {
        posts: { type: Schema.Types.ObjectId, ref: "Post" },
      },
    ],
    notification: [{
      user:{type: Schema.Types.ObjectId, ref: "User"},
      action: {type: String, required:true},
      postId: { type: Schema.Types.ObjectId, ref: "Post" },  }]
  },
});

module.exports = mongoose.model("User", UserSchema);
