var express 				= require('express')
	, exphbs					= require('express-handlebars')
	, path						= require('path')
  , port     				= 3000
	, indexRoutes			= require('./routes/home')
	, userRoutes			= require('./routes/userProfile')
  , DashboardRoutes			= require('./routes/userDashboard')
  , searchRoutes			= require('./routes/search')
	, savedSearch = require('./routes/savedSearches')
	, cfg = require('./config')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)
app.use('/userProfile', userRoutes)
//app.use('/userDashboard', DashboardRoutes)
app.get('/userDashboard', function(req, res){
	var options = {
		url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + ACCESS_TOKEN
	}
	res.render('userDashboard', {
		title: 'Dashboard',
		layout: 'auth_base'
	})

})

app.get('/savedSearches', function(req, res) {
	res.render('savedSearches')
})

app.get('/search', function(req, res) {
  res.render('search')
})



app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
