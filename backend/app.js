const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

const PostRoutes = require('./routes/post');
const UserRoutes = require('./routes/user');

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(cors({origin:true,credentials: true}));

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/post',PostRoutes);
app.use('/api/user',UserRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(message);
  res.status(status).json({message: message});
})

mongoose.connect('mongodb+srv://matanfadida7:NHWscF0isy8JIp6f@threads.qn6wcph.mongodb.net/').then(() =>{
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
}).catch(err => {console.log(err)});