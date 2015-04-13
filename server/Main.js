var express = require('express');
var app = express();

//used for the jade template engine
var jade = require('jade');
app.set('view engine', 'jade');


app.use('/b_public', express.static("bower_components"));
app.use('/public', express.static("public"));


//used for rest interface
app.get('/rest/',function (req,res){

});


//list out all the associated pages
var pages = [];

var Home = require("./pages/Home");
pages.push(new Home());

for (var i = 0; i <pages.length; i++) 
{

	var id = i;
	 app.get(pages[id].pageId(),function(req,res){
	 	res.render(pages[id].body(),{})
	 });
}

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});