const express = require('express');
const app = express();
const courseusernestedRoutes = express.Router();

// Require Course model in our routes module
let CourseUserNested = require('../models/CourseUserNested');

// Defined store route
courseusernestedRoutes.route('/add').post(function (req, res) {
  let courseusernested = new CourseUserNested(req.body);
  courseusernested.save()
    .then(courseusernested => {
      res.status(200).json({'courseusernested': 'courseusernested in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
courseusernestedRoutes.route('/').get(function (req, res) {
    CourseUserNested.find(function (err, courseusernested){
    if(err){
      console.log(err);
    }
    else {
      res.json(courseusernested);
    }
  });
});


module.exports = courseusernestedRoutes;