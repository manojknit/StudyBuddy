const express = require('express');
const app = express();
const courseRoutes = express.Router();

// Require Course model in our routes module
let Course = require('../models/Course');

// Defined store route
courseRoutes.route('/add').post(function (req, res) {
  let course = new Course(req.body);
  course.save()
    .then(course => {
      res.status(200).json({'course': 'course in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
courseRoutes.route('/').get(function (req, res) {
    Course.find(function (err, course){
    if(err){
      console.log(err);
    }
    else {
      res.json(course);
    }
  });
});

// Defined edit route
courseRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Course.findById(id, function (err, course){
      res.json(course);
  });
});

//  Defined update route
courseRoutes.route('/update/:id').post(function (req, res) {
    Course.findById(req.params.id, function(err, course) {
    if (!course)
      return next(new Error('Could not load Document'));
    else {
        course.user_name = req.body.user_name;
        course.course_title = req.body.course_title;
        course.course_desc = req.body.course_desc;
        course.category = req.body.category;
        course.course_rating = req.body.course_rating;

        course.save().then(course => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
courseRoutes.route('/delete/:id').get(function (req, res) {
    Course.findByIdAndRemove({_id: req.params.id}, function(err, course){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = courseRoutes;