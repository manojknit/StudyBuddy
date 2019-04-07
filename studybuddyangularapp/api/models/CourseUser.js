const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
let CourseUser = new Schema({
  user_name: {
    type: String
  },
  course_id: {
    type: String
  },
  registered_on: {
    type: String
  }
},{
    collection: 'CourseUser'
});

module.exports = mongoose.model('CourseUser', CourseUser);