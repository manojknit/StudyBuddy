const express = require('express');
const app = express();
const chatRoute = express.Router();

let Chat = require('../models/Chat');

chatRoute.route('/getbyKey/:id').get(function (req, res) {
  let id = req.params.id;
  Chat.find({ 'key':  id },null,{sort:{
            date: 1 //Sort by Date Added ASC
    }}, function (err, chat){
    if(err){
      console.log(err);
    }
    else {
      console.log(chat);
      res.json(chat);
  }
});
});

// // Defined store route
chatRoute.route('/add').post(function (req, res) {
  let chat = new Chat(req.body);
  chat.save()
    .then(chat => {
      res.status(200).json({'chat': 'chat in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


module.exports = chatRoute;