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
var connection = mysql.net.createConnection(
{
  host     : __config.database_host,
  user     : __config.database_name,
  password : __config.database_password
});
global.__database = connection;

//used for rest interface
app.get('/rest/',function (req,res){

});

//pages
var pages = [];

//creates a page object for this association
var home = require("./pages/home");
pages.push(new home());


for (var i = 0; i < pages.length; i++) 
{
	 var id = i;
	 app.get(pages[id].pageId(),function(req,res){
   
      //list out all the associated pages
      var menu_items = [];
      for (var i = 0; i < pages.length; i++) 
      {
        if(pages[i].menuName() !== "")
        {
          menu_items.push({
          name:pages[i].menuName(),
          link:__config.url + pages[i].pageId()});
        }
      }
      //render the jade
      res.render(pages[id].body(),{active_menu_name:pages[id].menuName(),menu:menu_items})
	 });
}

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});