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
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === "OPTIONS") {
//          res.status(200).end();
//     }
//      next();
// });

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/post',PostRoutes);
app.use('/api/user',UserRoutes);

mongoose.connect('mongodb+srv://matanfadida7:NHWscF0isy8JIp6f@threads.qn6wcph.mongodb.net/').then(() =>{
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
}).catch(err => {console.log(err)});