var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')


router.post('/', function(req, res){
	console.log(req.body)
	var query = req.body.search
	console.log(query)
	res.redirect('search')
})

router.get('/', function(req, res) {
	var options = {
		url: 'https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + req.session.access_token
	}
	request.get(options, function(error, response, body){
		try{
			var feed = JSON.parse(body)
			if(feed.meta.code > 200){
				return next(feed.meta.error_message)
			}
		}catch(err){
			return next(err)
		}
	})
	res.render('search', {
		title: 'Search',
		layout: 'auth_base',
	})
})

module.exports = router
