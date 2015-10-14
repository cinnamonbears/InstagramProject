var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('userDashboard', {
    title: 'This is a User Dash!',
    welcome: 'Welcome user'
  })
})

module.exports = router
