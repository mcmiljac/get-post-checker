//Jacob McMillen
//CS 290: Web Design
//HW Assignment: GET and POST checker
//15 November, 2015

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//Handler for GET requests
app.get('/',function(req,res){
	var queryParams = [];
	for (var p in req.query){
		queryParams.push({'name':p,'value':req.query[p]})
	}
	var context = {};
	context.dataList = queryParams;
	res.render('get-checker', context);
});

//Handler for POST requests
app.post('/', function(req,res){
	var queryParams = [];
	for (var p in req.query){
		queryParams.push({'name':p,'value':req.query[p]})
	}
	var bodyParams = [];
	for (var p in req.body){
		bodyParams.push({'name':p,'value':req.body[p]})
	}
	var context = {};
	context.dataListQuery = queryParams;
	context.dataListBody = bodyParams;
	res.render('post-checker', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
