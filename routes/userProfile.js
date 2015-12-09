var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('userProfile', {
    title: 'User Profile!',
    welcome: 'Welcome, UserNameGoesHere!',
    layout: 'auth_base'
  })
})

module.exports = router
