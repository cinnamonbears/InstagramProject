var express = require('express');
var router = express.Router();
var request = require('request')
var bodyParser = require('body-parser')

var query = "";

router.post('/', function(req, res){
	query = req.body.search
	res.redirect('search')
	console.log('Post Page: ' + query)
})

router.get('/', function(req, res, next) {
	console.log('Search Page: ' +query)
	var options = {
		url: 'https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + req.session.access_token
	}
	console.log(req.session.access_token)
	//
	if(req.session.access_token == null){
		console.log('redirecting')
		return res.redirect('/')
	}
	if(query != ""){
		request.get(options, function(error, response, body){
			try{
				var feed = JSON.parse(body)
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
				res.render('search', {
					title: 'Search',
					layout: 'auth_base',
					feed: feed.data,
					searchWord: function() {return query;}
				})
			})
	 }else{
	 	res.render('search', {
	 		title: 'Search',
	 		layout: 'auth_base',
	 	})
	 }
})

module.exports = router
