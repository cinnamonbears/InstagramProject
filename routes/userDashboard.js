var express = require('express');
var request = require('request')
var router = express.Router();

router.get('/', function(req, res, next) {

  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token
  }
  request.get(options, function(error, response, body){
    try{
      var feed = JSON.parse(body)
       //console.log(body)
        if(feed.meta.code > 200){
          if(feed.meta.code == 400){
            // console.log('Should redirect here')
            return res.redirect('/')
          }
          return next(feed.meta.error_message)
        }
      }catch(err){
        return next(err)
      }
      res.render('userDashboard', {
        title: 'Dashboard',
        layout: 'auth_base',
        feed: feed.data
      })

  })
})

module.exports = router
