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
	return "/";
}

Home.prototype.menuName = function()
{
    return "Home";
}

Home.prototype.body = function()
{
	Page.prototype.body.call(this);
	return "./Body/Home.jade";

}


module.exports = Home;