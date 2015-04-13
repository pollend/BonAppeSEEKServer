var express = require('express');
var app = express();

//used for the jade template engine
var jade = require('jade');
app.set('view engine', 'jade');


//linking bower components and public folder
app.use('/b_public', express.static("bower_components"));
app.use('/public', express.static("public"));


//globals------------------------------------------------------------------
global.__config =require("./config.js");

global.__base = __dirname + '/';

var mysql = require('mysql');
var connection = mysql.createConnection(
{
  host     : __config.database_host,
  user     : __config.database_name,
  password : __config.database_password
});
global.__db = connection;

//used for rest interface
app.get('/rest/',function (req,res){

});

 require("./webpage/base.js")(app);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
