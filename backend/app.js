const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const multerConfigFunction = require('./multerConfig'); // Import the multer configuration function
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

const PostRoutes = require('./routes/post');
const UserRoutes = require('./routes/user');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
};


app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));//image is the name in frontend input

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors({origin:true,credentials: true}));

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/post',PostRoutes);
app.use('/api/user',UserRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  let statusMessage = "";
  if(status === 400 || status === 401){
    statusMessage = "Authorization Error";
  }
  res.status(status).json({message: message, status: statusMessage});
})

mongoose.connect('mongodb+srv://matanfadida7:NHWscF0isy8JIp6f@threads.qn6wcph.mongodb.net/').then(() =>{
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
}).catch(err => {console.log(err)});