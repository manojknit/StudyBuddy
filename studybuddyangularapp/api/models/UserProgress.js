const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
let UserProgress = new Schema({
  courseuser_id: { 
    type: String
  },
  user_id: {
    type: String
  },
  course_id: {
    type: String
  },
  registered_on: {
    type: String
  },
  start_dt: {
    type: String
  },
  course_completion: {
    type: Number
  },
  video_id: {
    type: String
  },
  video_completion: {
    type: Number
  },
  last_accessed: {
    type: String
  }
},{
    collection: 'UserProgress'
});

module.exports = mongoose.model('UserProgress', UserProgress);