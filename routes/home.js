var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Home',
    welcome: 'Welcome to the site!'
  })
})

module.exports = router
