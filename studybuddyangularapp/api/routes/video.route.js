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
    Course.find(function (err, video){
    if(err){
      console.log(err);
    }
    else {
      res.json(video);
    }
  });
});

module.exports = videoRoutes;