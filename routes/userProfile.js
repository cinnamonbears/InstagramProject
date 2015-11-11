var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('userProfile', {
    title: 'This is a User Profile!',
    layout: 'auth_base'
  })
})

module.exports = router
