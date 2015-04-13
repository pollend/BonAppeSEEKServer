var Page = require("./Page.js");
var util = require("util");

var Home =  function()
{
	Page.apply(this);
	console.log(this);
}

util.inherits(Home, Page);

Home.prototype.pageId = function()
{
	Page.prototype.pageId.call(this);
	return "/Home";
}

Home.prototype.body = function(req,res)
{
	Page.prototype.body.call(this,req,res);
	return "./Body/Home.jade";

}


module.exports = Home;