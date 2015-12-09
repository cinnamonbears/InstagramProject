var express = require('express');
var router = express.Router();
var Users = require('../models/users')

router.get('/', function(req, res) {
	res.render('savedSearches', {
		title: 'Saved Searches',
		layout: 'auth_base'
	})
})
router.post('/savedSearches/removeSearch', function(req, res){
	var search = req.body.search
	var userId = req.session.userId
	Users.removeSearch(userId, search, function(){
		res.redirect('/savedSearches')
	})
})

module.exports = router
