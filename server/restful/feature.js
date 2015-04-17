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
        features.byId(req.query.id, function(result) {
            if (result) {
                callback(result.toJson());
            } else callback(errors.empty);
        });
    } else if (req.query.hasOwnProperty("search")) {
        features.search(req.query.search, function(result) {
            if (result) {
                callback(table.entriresToJson(result));
            } else callback(errors.empty);
        });
    } else callback(errors.general);
};

module.exports = feature;