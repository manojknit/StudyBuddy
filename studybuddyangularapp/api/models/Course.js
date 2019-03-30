const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
let Course = new Schema({
  user_name: {
    type: String
  },
  course_title: {
    type: String
  },
  course_desc: {
    type: String
  },
  category: {
    type: String
  },
  course_rating: {
    type: Number
  },
  tenantid: {type: String},
  fee: {type: Number},
  short_text: {type: String},
  instructions: {type: String}
},{
    collection: 'course'
});

module.exports = mongoose.model('Course', Course);