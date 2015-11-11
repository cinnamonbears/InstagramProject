var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('userDashboard', {
    title: 'Dashboard',
    welcome: 'Welcome',
    layout: 'auth_base'
  })
})

module.exports = router
