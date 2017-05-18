var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan'); // logs changes on command promt
var mongoose = require('mongoose');
var app = require('express')();
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api.js')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);


//  http://localhost:8080/users

mongoose.connect('mongodb://localhost:27017/tutorial',function(err) {
  if (err) {
  	 console.log("not connected to database" + err);
  	 }else{
  	 	console.log("Database created!");
  	 }
  });
  

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
	console.log('running the server at port ' + port);
});