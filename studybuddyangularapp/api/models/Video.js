const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Video
let Video = new Schema({
  CourseId: {
    type: String
  },
  VideoTitle: {
    type: String
  },
  VideoFileName: {
    type: String
  }
},{
    collection: 'video'
});

module.exports = mongoose.model('Video', Video);