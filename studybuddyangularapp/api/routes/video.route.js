const express = require('express');
const app = express();
const videoRoutes = express.Router();

// Require Video model in our routes module
let Video = require('../models/Video');

// Defined store route
videoRoutes.route('/add').post(function (req, res) {
  let video = new Video(req.body);
  video.save()
    .then(video => {
      res.status(200).json({'video': 'video in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
videoRoutes.route('/').get(function (req, res) {
  Video.find(function (err, video){
    if(err){
      console.log(err);
    }
    else {
      res.json(video);
    }
  });
});

// Get videos by course id
//https://mongoosejs.com/docs/2.7.x/docs/finding-documents.html
videoRoutes.route('/getbycourseid/:id').get(function (req, res) {
  let id = req.params.id;
  Video.find({ 'CourseId': id }, function (err, video){
    if(err){
      console.log(err);
    }
    else {
      console.log(video);
      res.json(video);
    }
  });
});

module.exports = videoRoutes;