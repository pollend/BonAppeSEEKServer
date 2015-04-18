var meals = require("./../database/meals.js");
var table = require("./../database/table.js");
var errors = require("./errors.js");
var meal = function() {

};

meal.prototype.pageId = function() {
    return "meal";

};

meal.prototype.output = function(callback, req) {
    if (req.query.hasOwnProperty("id")) {
        meals.byId(req.query.id, function(result) {
            if (result)
                callback(result.toJson());
            else
                callback(errors.id);
        });
    } else if (req.query.hasOwnProperty("search")) {
        meals.search(req.query.search, function(results) {
            callback(table.entriresToJson(results));
        });
    } else callback(errors.general);
};

module.exports = meal;