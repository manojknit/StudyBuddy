const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Chat
let Chat = new Schema({
  key: {
    type: String
  },
  sender: {
      type: String
  },
  receiver: {
      type: String
  },
  message: {
      type: String
  },
  date: 
  {
    type : Date
  }
},{
    collection: 'Chat'
});

module.exports = mongoose.model('Chat', Chat);