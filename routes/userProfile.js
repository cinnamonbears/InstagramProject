var express = require('express');
var router = express.Router();
var Users = require('../models/users')

router.get('/', function(req, res) {
  if(req.session.userId){
      Users.find(req.session.userId, function(document){
          if(!document) return res.redirect('/')
          res.render('userProfile', {
            title: 'User Profile!',
            welcome: 'Welcome, '+document.username + "!",
            layout: 'auth_base',
            user: document
          })
      })
  }
  else{
    res.redirect('/')
  }
})

router.post('/', function(req, res){
  var user = req.body
  console.log('Post received')
  Users.update(user, function(result){
    console.log('User Update Successful')
    res.render('userProfile', {
      //title: 'User Profile!',
      //welcome: 'Welcome, '+user.username + "!",
      //layout: 'auth_base',
      user: user,
      success: 'User updated successfully!'
    })
  })
})

module.exports = router
