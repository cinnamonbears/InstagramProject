var express = require('express');
var router = express.Router();
var querystring = require('querystring')
var request = require('request')
var Users = require('../models/users')

var cfg = require('../config')

router.get('/', function(req, res) {
  if(req.session.access_token != null){
    req.session.access_token = null;
  }
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
    var user = data.user

    req.session.access_token = data.access_token
    req.session.userId = data.user.id

    user._id = user.id
    delete user.id

    Users.find(user._id, function(document) {
      if (!document) {
        Users.insert(user, function(result) {
          res.redirect('/userDashboard')
        })
      } else {
        res.redirect('/userDashboard')
      }
    })
  })
})

module.exports = router
