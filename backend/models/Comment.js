const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        required: true,
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
