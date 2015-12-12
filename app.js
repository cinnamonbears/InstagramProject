
var express 				= require('express')
	, exphbs					= require('express-handlebars')
	, path						= require('path')
  , port     				= 3000
	, indexRoutes			= require('./routes/home')
	, userRoutes			= require('./routes/userProfile')
  , dashboardRoutes			= require('./routes/userDashboard')
  , searchRoutes			= require('./routes/search')
	, savedSearch = require('./routes/savedSearches')
	, cfg = require('./config')
	, session = require('express-session')
	, bodyParser = require('body-parser')
	, db = require('./db')
	, Users = require('./models/users')

var ACCESS_TOKEN = ''

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)
app.use('/userProfile', userRoutes)
app.use('/userDashboard', dashboardRoutes)
app.use('/savedSearches', savedSearch)
app.use('/search', searchRoutes)

db.connect('mongodb://LZCT:PASSWORD@ds027295.mongolab.com:27295/instagramproject', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
// app.listen(port)
//
// console.log('Server running at http:127.0.0.1:' + port + '/')
