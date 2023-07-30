const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    posts:{
        items:[{
            postId: { type: Schema.Types.ObjectId, ref:'Post'}
        }]
    },
    comments:{
        items:[{
            commentId: { type: Schema.Types.ObjectId, ref:'Comment'}
        }]
    },
    followers:{
        users:[{
            userId: { type: Schema.Types.ObjectId, ref:'User'}
        }]
    },
    following:{
        users:[{
            userId: { type: Schema.Types.ObjectId, ref:'User'}
        }]
    }
});

module.exports = mongoose.model('User',UserSchema);