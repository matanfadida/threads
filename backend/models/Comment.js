const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref:'Post',
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    likes:{
        type:Number,
        required:true,
    },
    content: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model('Comment', CommentSchema);