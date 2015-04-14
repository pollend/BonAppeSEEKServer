var rest = require("./rest.js");
var util = require("util");

var feature = function()
{
rest.apply(this);
}

util.inherits(feature, rest);

feature.prototype.pageId = function() {
	rest.prototype.pageId.call(this);
};

feature.prototype.output = function(callback)
{
	reset.prototype.output(this,output);

	callback({


	});

}

module.exports = feature;