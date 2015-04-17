var util = require("util");

var home = function() {}


home.prototype.pageId = function() {
    return "/";
}


home.prototype.body = function() {
    return "./body/home.jade";
}

home.prototype.data = function(output) {
    output({});
}


module.exports = home;