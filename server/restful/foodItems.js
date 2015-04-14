var rest = require("./rest.js");
var util = require("util");

var feature = function()
{
rest.apply(this);
}

util.inherits(feature, rest);

feature.prototype.pageId = function() {
};

feature.prototype.output = function(callback)
{
	callback({
		
	});

}

module.exports = feature;