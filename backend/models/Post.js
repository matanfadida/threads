const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
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
