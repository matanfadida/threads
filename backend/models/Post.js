const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  showTo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  likes: {
    count: {type: Number},
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  comments: [
    {
      commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
