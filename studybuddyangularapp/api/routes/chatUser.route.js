const express = require('express');
const app = express();
const chatUserRoute = express.Router();

// Require Course model in our routes module
let ChatUser = require('../models/ChatUser');

// // Defined store route
chatUserRoute.route('/add').post(function (req, res) {
  let chatUser = new ChatUser(req.body);
  chatUser.save()
    .then(chatUser => {
      res.status(200).json({'ChatUser': 'ChatUser in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
chatUserRoute.route('/').get(function (req, res) {
    ChatUser.find(function (err, chatUser){
    if(err){
      console.log(err);
    }
    else {
      res.json(chatUser);
    }
  });
});

chatUserRoute.route('/getOtherThan/:id').get(function (req, res) {
    let id = req.params.id;
    ChatUser.find({ 'user_name': {$ne: id} }, function (err, chatUser){
      if(err){
        console.log(err);
      }
      else {
        console.log(chatUser);
        res.json(chatUser);
    }
});
});

module.exports = chatUserRoute;