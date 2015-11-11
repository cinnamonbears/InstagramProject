var express = require('express');
var router = express.Router();
var querystring = require('querystring')
var request = require('request')

var cfg = require('../config')

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Home',
    welcome: 'Welcome to the site!'
  })
})

router.get('/authorize', function(req, res) {
  var qs = {
    client_id: cfg.client_id,
    redirect_uri: cfg.redirect_uri,
    response_type: 'code'
  }

  var query = querystring.stringify(qs)
  var url = 'https://api.instagram.com/oauth/authorize/?' + query

  res.redirect(url)
})

router.get('/auth/finalize', function(req, res) {
  var post_data = {
    client_id: cfg.client_id,
    client_secret: cfg.client_secret,
    redirect_uri: cfg.redirect_uri,
    grant_type: 'authorization_code',
    code: req.query.code
  }

  var options = {
    url: 'https://api.instagram.com/oauth/access_token',
    form: post_data
  }

  request.post(options, function(error, response, body) {
    var data = JSON.parse(body)
    req.session.access_token = data.access_token
    res.redirect('/userDashboard')
  })
})

module.exports = router
