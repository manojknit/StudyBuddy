const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for ChatUser
let ChatUser = new Schema({
  user_name: {
    type: String
  },
  active: {
      type: Boolean
  }
},{
    collection: 'ChatUser'
});

module.exports = mongoose.model('ChatUser', ChatUser);