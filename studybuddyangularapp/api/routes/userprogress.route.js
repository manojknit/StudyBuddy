const express = require('express');
const app = express();
const userprogressRoutes = express.Router();

// Require Course model in our routes module
let UserProgress = require('../models/UserProgress');

// Defined Userprogress route
userprogressRoutes.route('/add').post(function (req, res) {
  let userprogress = new UserProgress(req.body);
  userprogress.save()
    .then(userprogress => {
      res.status(200).json({'userprogress': 'userprogress in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
userprogressRoutes.route('/').get(function (req, res) {
    UserProgress.find(function (err, userprogress){
    if(err){
      console.log(err);
    }
    else {
      res.json(userprogress);
    }
  });
});

//  Defined update Userprogress route; Needs more definition as it needs to update different
//  videos associated with the same courseuser_id
userprogressRoutes.route('/update/:id').post(function (req, res) {
    UserProgress.findById(req.params.id, function(err, userprogress) {
    if (!userprogress)
      return next(new Error('Could not load Document'));
    else {
        userprogress.user_name = req.body.user_name;

        userprogress.save().then(userprogress => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


module.exports = userprogressRoutes;