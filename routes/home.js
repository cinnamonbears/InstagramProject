var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('home', {
    title: 'This is the Home Page',
    welcome: 'Welcome to the site!'
  })
})

module.exports = router
