const express = require('express');
const app = express();
const courseuserRoutes = express.Router();

// Require Course model in our routes module
let CourseUser = require('../models/CourseUser');

// Defined store route
courseuserRoutes.route('/add').post(function (req, res) {
  let courseuser = new CourseUser(req.body);
  courseuser.save()
    .then(courseuser => {
      res.status(200).json({'courseuser': 'courseuser in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
courseuserRoutes.route('/').get(function (req, res) {
    CourseUser.find(function (err, courseuser){
    if(err){
      console.log(err);
    }
    else {
      res.json(courseuser);
    }
  });
});


module.exports = courseuserRoutes;