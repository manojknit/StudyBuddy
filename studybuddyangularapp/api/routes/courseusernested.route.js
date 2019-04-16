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

// Get course registered by user_id
//https://mongoosejs.com/docs/2.7.x/docs/finding-documents.html
courseusernestedRoutes.route('/getbyuserid/:id').get(function (req, res) {
  let id = req.params.id;
  CourseUserNested.find({ 'user_id': id }, function (err, courseusernested){
    if(err){
      console.log(err);
    }
    else {
      console.log(courseusernested);
      res.json(courseusernested);
    }
  });
});

// Get by PK of CourseUserNested
//https://mongoosejs.com/docs/2.7.x/docs/finding-documents.html
courseusernestedRoutes.route('/getbyid/:id').get(function (req, res) {
  let id = req.params.id;
  CourseUserNested.find({ '_id': id }, function (err, courseusernested){
    if(err){
      console.log(err);
    }
    else {
      console.log(courseusernested);
      res.json(courseusernested);
    }
  });
});

module.exports = courseusernestedRoutes;