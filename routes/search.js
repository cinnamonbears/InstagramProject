var express = require('express');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', function(req, res) {
	res.render('search', {
		title: 'Search',
		layout: 'auth_base',
	})
})

module.exports = router
