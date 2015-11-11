var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('savedSearches', {
		title: 'Saved Searches',
		layout: 'auth_base'
	})
})

module.exports = router
