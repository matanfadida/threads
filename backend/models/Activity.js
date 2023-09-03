const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    postId:{
        type: Schema.Types.ObjectId,
        ref:'Post',
    },
    userOwner:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    action:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);