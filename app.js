//import express package
var express = require("express")
var mongodb = require("mongodb")
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var helpers = require('express-helpers')
var engine = require('ejs-locals')
var connect = require('connect')
var routes = require('./routes/index')
var exphbs  = require('express-handlebars')
var categories = require('./data/categories')
var countries = require('./data/countries')

var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/countryranking');

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/countryranking'

mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient;

helpers(app)
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/test', function(req, res){
  res.render('layout.ejs');
});


app.get("/", function(req, res){
  res.render("chart", {categories: categories, countries: countries});
});


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});


app.use('/',require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);

app.listen(process.env.PORT || 3000)

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
    });
