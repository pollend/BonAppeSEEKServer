var page = require("./page.js");
var util = require("util");

var home =  function()
{
	page.apply(this);
}

util.inherits(home, page);

home.prototype.pageId = function()
{
	page.prototype.pageId.call(this);
	return "/";
}

home.prototype.menuName = function()
{
 return "home";
}

home.prototype.body = function()
{
	page.prototype.body.call(this);
	return "./body/home.jade";

}


module.exports = home;