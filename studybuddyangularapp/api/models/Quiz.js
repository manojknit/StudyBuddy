const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for quiz
/*
let Quiz = new Schema({
    question: {
      type: String
    },
    option1: {
      type: String
    },
    option2: {
      type: String
    },
    option3: {
      type: String
    },
    option4: {
      type: String
    },
    correct_ans: {
        type: String
    },
    
  },{
      collection: 'Quiz'
  });

   quizObject: {
        type: Array,
        default : []
    }
  */
 let Quiz = new Schema({
    CourseId: {
        type: String

    },
    quizFileName: {
        type: String 
    },
    quizObject: [
        {
            question: String,
            option1: String,
            option2: String,
            option3: String,
            option4: String,
            correct_ans: String
        }
    ]
},
    {
        collection: 'Quiz'
    
 });

  module.exports = mongoose.model('Quiz', Quiz);