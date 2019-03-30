const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

//Add for table
const courseRoute = require('./routes/course.route');
const videoRoute = require('./routes/video.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/course', courseRoute);
app.use('/video', videoRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
//$ nodemon server
//https://appdividend.com/2018/11/04/angular-7-crud-example-mean-stack-tutorial/