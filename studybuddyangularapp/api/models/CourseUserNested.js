const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
let CourseUserNested = new Schema({
  user_id: { 
    type: String
  },
  user_name: {
    type: String
  },
  course_id: {
    type: String
  },
  registered_on: {
    type: Date
  },
  course_velocity: {
    type: Number
  },
  course_progress: [{
    video_id: {
      type: String
    },
    video_length: {
      type: Number
    }, 
    video_is_complete: {
      type: Boolean
    },
    video_progress: {
      type: Number
    },
    video_start_date: {
      type: Date
    },
    video_last_accessed_date: {
      type: Date
    }
  }]
},
{
    collection: 'CourseUserNested'
});

module.exports = mongoose.model('CourseUserNested', CourseUserNested);