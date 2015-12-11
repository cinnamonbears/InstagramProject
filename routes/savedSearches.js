var express = require('express');
var router = express.Router();
var Users = require('../models/users')

/*router.get('/', function(req, res) {
	res.render('savedSearches', {
		title: 'Saved Searches',
		layout: 'auth_base'
	})
})*/

router.get('/', function(req, res) {
  if(req.session.userId){
      Users.find(req.session.userId, function(document){
          if(!document) return res.redirect('/')
					res.render('savedSearches', {
						title: 'Saved Searches',
						layout: 'auth_base',
            user: document
          })
      })
  }
  else{
    res.redirect('/')
  }
})



/*.post('/savedSearches/removeSearch', function(req, res){
	var search = req.body.search
	var userId = req.session.userId
	Users.removeSearch(userId, search, function(){
		res.redirect('/savedSearches')
	})
})*/

module.exports = router
