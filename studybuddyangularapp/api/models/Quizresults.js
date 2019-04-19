const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for quizresults

let Quizresults = new Schema({
    userId: {
      type: String
    },
    CourseId: {
      type: String
    },
    QuizId: {
      type: String
    },
    QuizName: {
      type: String
    },
    Score: {
      type: String
    },
    maxScore: {
      type: String
    },
    bestScore: {
        type: String
    },
    attempts: {
        type: String
    }
    
  },{
      collection: 'Quizresults'
  });

  module.exports = mongoose.model('Quizresults', Quizresults);