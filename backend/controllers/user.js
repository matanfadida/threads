const User = require('../models/User');

exports.SignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.body.image;
    try{
        const newUser = new User({
            email: email,
            password: password,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            image: image,
        });
        const result = await newUser.save();
        res.status(200).json({massage:"add user success!"});
    } catch (err){
        err.statusCode = 500;
        next(err);
    }
}

exports.SignIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({email:email});
        console.log('sadasd',user);
        if(!user){
            const error = new Error('not find a user !');
            error.statusCode = 401;
            throw error;
        }
        //check passowrd 
        const token = jwt.sing({email:user.email, userId: user._id},"SfasfASFREgGETGE12!@#fdsf#$f@!F",{expiresIn:'1h'});
        res.status(200).json({token:token})
    } catch (err){
        console.log(err);
        err.statusCode = 500;
        next(err);
    }
}