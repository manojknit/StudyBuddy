const express = require('express');
const app = express();
const quizRoutes = express.Router();

// Require Quiz model in our routes module
let Quiz = require('../models/Quiz');
let Quizresults = require('../models/Quizresults');
// Defined store route
quizRoutes.route('/addQuestion').post(function (req, res) {
    let quiz = new Quiz(req.body);
    quiz.save()
      .then(quiz => {
        res.status(200).json({'quiz': 'question in added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });

  quizRoutes.route('/addQuiz').post(function (req, res) {
    let quiz = new Quiz(req.body);

   // require('dotenv').config();
   // const AWS = require('aws-sdk');
    //const csv = require('csvtojson');
   // csvToJSON();

    quiz.save()
      .then(quiz => {
        res.status(200).json({'QUIZ': 'Quiz is added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to quiz to database");
      });
  });

  // Defined get data(index or listing) route
  quizRoutes.route('/getquizbycourseid/:id').get(function (req, res) {
    let id = req.params.id;
  Quiz.find({ 'CourseId': id }, function (err, quiz){
    if(err){
      console.log(err);
    }
    else {
      console.log('inside quizzzzzz' + JSON.stringify(quiz) );
      if(quiz == [] || quiz == null || quiz == undefined || quiz == {} || JSON.stringify(quiz) == '[]') {
        console.log('yes undefined');
        
        
      }
      res.json(quiz);
     // console.log("quiz object " + quiz['quizObject']);
     // console.log('quiz id ' + quiz._id);
    }
  });
});
quizRoutes.route('/getquizIdbycourseid/:id').get(function (req, res) {
  let id = req.params.id;
  Quiz.find({ 'CourseId': id }, function (err, quiz){
    if(err){
      console.log(err);
    }
    else {
      if(quiz[0]!= undefined || quiz[0]!=null) {
      console.log('quizzzzzzid ' + quiz[0]._id);
      res.json(quiz[0]._id);
      }
     else
     res.json();
    }
  });

});
quizRoutes.route('/submitQuiz').post(function (req, res) {
    let quizresults = new Quizresults(req.body);
    quizresults.save()
      .then(quizresults => {
        res.status(200).json({'QUIZ': 'Quiz is added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to quiz to database");
      });



});
  async function csvToJSON() {
    // get csv file and create stream
    console.log("inside csvto json");
    const stream = S3.getObject(params).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(stream);
    console.log(" json  " + JSON.stringify(json));
  };
  module.exports = quizRoutes;
