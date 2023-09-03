const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref:'Post',
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