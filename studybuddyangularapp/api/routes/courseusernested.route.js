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

//update video progress based on user_id, course_id and video_id
courseusernestedRoutes.route('/updateVideoProgress/:id1/:id2/:id3/:progress/:complete').post(function (req, res) {
  let user_id = req.params.id1;
  let course_id = req.params.id2;
  let video_name = req.params.id3;
  let progress = req.params.progress;
  let complete = req.params.complete;
  let start_date = req.body.start_date;
  let last_date = req.body.end_date;
  let progress_sec = req.body.progress_sec;

  console.log("values are " + user_id + ": " + course_id + " : " + video_name + " : " + progress + " : " + complete + " : " + start_date + " : " + last_date + "progress in sec " + progress_sec);
 
  var query = { "user_id": user_id, "course_id": course_id, "video_details.video_title": new RegExp(video_name, 'i')  },
    update = { "$set": { 
      "video_details.$.video_is_complete": complete,
      "video_details.$.video_progress": progress,
      "video_details.$.video_progress_sec": progress_sec,
      "video_details.$.video_start_date": start_date,
      "video_details.$.video_last_accessed_date": last_date,
    } },
    options = { "upsert": false };

    CourseUserNested.findOneAndUpdate(query, update, options, function(err, doc){
      if(err) return res.send(500, {error: err});
      return res.send("successfully updated!!!");
  });
});

//Get user velocity based on user_id and course_id
courseusernestedRoutes.route('/getVelocity/:id1/:id2').post(function (req, res) {
  let user_id = req.params.id1;
  let course_id = req.params.id2;

  //Get the videos associated with the specific user id and course_id, 
  // compute the velocity by adding progress across videos and dividing by number of days (using course_start_date)
});

courseusernestedRoutes.route('/getForVelocity').get(function (req, res) {
 
  CourseUserNested.aggregate(
    [
		{ "$unwind": "$video_details" },
        {
         $group : {
            _id:{ user_id: "$user_id", user_name: "$user_name",  started_on: "$started_on", course_id : "$course_id"},
            totalProgress: { $sum: "$video_details.video_progress_sec" },
            max_video_date: { $max: "$video_details.video_last_accessed_date" }
         }
       }
    ]).
    then(function (res1) {
      console.log(res1); // [ { maxBalance: 98000 } ]
      return res.send(res1);
    });
});

module.exports = courseusernestedRoutes;