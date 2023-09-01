const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.SignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.file;
    try{
        if(!req.file){
            const error = new Error('No add Image !');
            error.statusCode = 422;
            throw error;
        }
        const hashedPass = await bcrypt.hash(password, 12);
        const newUser = new User({
            email: email,
            password: hashedPass,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            image: image.path,
        });
        const result = await newUser.save();
        res.status(201).json({massage:"add user success!"});
    } catch (err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.SignIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            const error = new Error('not find a user !');
            error.statusCode = 401;
            throw error;
        }
        //check passowrd 
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            const error = new Error('The password is incorrect !');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({email:user.email, userId: user._id},"Sfa14shASFREgGETGE12!@#fdsf#$f@!F",{expiresIn:'1h'});
        res.status(200).json({token:token, userId: user._id})
    } catch (err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.GetActivities = async(req, res, next) => {
    const userId = req.userId;
    try{
        const user = await User.findOne({_id:userId});
        if(!user){
            const error = new Error('not find a user !');
            error.statusCode = 401;
            throw error;
        }
        const notification = user.Activity.notification;

        const userAction = await User.findOne({_id:notification.user}).populate({
            path: "user",
            select: "userName image",
          });
        if(!userAction){
            const error = new Error('not find a user !');
            error.statusCode = 401;
            throw error;//create notification
        }

        const post = await User.findOne({_id:notification.postId}).select('content');
        if(!post){
            const error = new Error('not find a post !');
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({message:"success", data:user.Activity.notification.populate({
            path: "user",
            select: "userName image",
          })});
    } catch (err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}