var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('search', {
    title: 'Search for stuff',
    welcome: 'YAY'
  })
})

module.exports = router
