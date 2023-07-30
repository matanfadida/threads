const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    comments: {
        items:[
            {
                commentId:{ type:Schema.Types.ObjectId, ref: 'Comment'},
            }
        ]
    },
    user:{
        userId:{type: Schema.Types.ObjectId, ref:'User'}
    }
});

module.exports = mongoose.model('Post', postSchema);