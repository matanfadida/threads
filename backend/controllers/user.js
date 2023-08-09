const User = require('../models/User');

exports.SignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.body.image;
    console.log('asdasdasdefwa');
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
        console.log(err);
    }
}