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


//used for rest interface
app.get('/rest/',function (req,res){

});

require("./database/database.js")();
//sets up the basic web pages displayed
require("./webpage/base.js")(app);


require("./database/feature.js").instance("asdfasdfasfeawbef",function()
{
    
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Created Server at http://%s:%s', host, port);

});
