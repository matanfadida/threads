const User = require('../models/User');

exports.SignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.body.image;
    try{
        const user = new User(
            email,
            password,
            userName,
            firstName,
            lastName,
            image);
        const result = await user.save();
        res.status(200).json({massage:"add product success!"});
    } catch{

    }
}