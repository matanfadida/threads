const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(app)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect('mongodb+srv://matanfadida7:NHWscF0isy8JIp6f@threads.qn6wcph.mongodb.net/').then(() =>{
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
}).catch(err => {console.log(err)});