const User = require("../models/User");
const Activity = require("../models/Activity");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.SignUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const image = req.file;
  try {
    if (!req.file) {
      const error = new Error("No add Image !");
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
    res.status(201).json({ massage: "add user success!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.SignIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("not find a user !");
      error.statusCode = 401;
      throw error;
    }
    //check passowrd
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("The password is incorrect !");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      "Sfa14shASFREgGETGE12!@#fdsf#$f@!F",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.GetUser = async (req, res, next) => {
  const userId = req.query.userId;
  const query = req.query.query;
  try {
    const user = await User.findOne({ _id: userId }).select(query);
    if (!user) {
      const error = new Error("not find a user !");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: "success !", data: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.GetActivities = async (req, res, next) => {
  const userId = req.userId;
  try {
    const activities = await Activity.find({ userOwner: userId }).populate([
      {
        path: "userOwner",
        select: "userName image",
      },
      {
        path: 'postId',
        select: 'content',
        options: {
          skipInvalidIds: true // This option skips populating if postId is not present
        },
      },
      {
        path: 'commentId',
        select: 'content',
        options: {
          skipInvalidIds: true // This option skips populating if postId is not present
        },
      }
    ]);

    if (!activities) {
      const error = new Error("user not activities !");
      error.statusCode = 422;
      throw error;
    }

    console.log(activities);
    res.status(200).json({ message: "success !", data: activities });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};