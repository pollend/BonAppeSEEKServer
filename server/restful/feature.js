var features = require("./../database/features.js");
var table = require("./../database/table.js");
var errors = require("./errors.js");

var feature = function() {

};

feature.prototype.pageId = function() {
    return "feature";
};

feature.prototype.output = function(callback, req) {
    if (req.query.hasOwnProperty("id")) {
        features.byId(req.query.id, function(result, err) {
            callback(result.toJson());
        });
    } else if (req.query.hasOwnProperty("search")) {
        features.search(req.query.search, function(result) {
            callback(table.entriresToJson(result));
        });
    }
};

module.exports = feature;