var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('userProfile', {
    title: 'This is a User Profile!',
    welcome: 'Welcome user'
  })
})

module.exports = router
