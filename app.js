
var express 				= require('express')
	, exphbs					= require('express-handlebars')
	, path						= require('path')
  , port     				= 3000
	, indexRoutes			= require('./routes/home')
	, userRoutes			= require('./routes/userProfile')
  , dashboardRoutes			= require('./routes/userDashboard')
  , searchRoutes			= require('./routes/search')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

// app.use(session({
//   cookieName: 'session',
//   secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
//   resave: false,
//   saveUninitialized: true
// }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)
app.use('/userProfile', userRoutes)
app.use('/userDashboard', dashboardRoutes)// function(req, res){
// // 	var options = {
// // 		url: 'https://api.instagram.com/v1/users/self/feed?access_token=' +  + req.session.access_token
// // 	}
// // req.get(options, function(error, response, body){
// // 	try{
// // 		var feed = JSON.parse(body)
// //       if(feed.meta.code > 200){
// //         return next(feed.meta.error_message)
// // 			}
// // 	}catch(err){
// // 		return next(err)
// // 	}
// 		res.render('userDashboard', {
// 			title: 'Dashboard',
// 			layout: 'auth_base',
// 		//	feed: feed.data
// 		})
//
//	})
//})






app.use('/search', searchRoutes)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
