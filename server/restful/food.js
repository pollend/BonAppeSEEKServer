var foods = require("./../database/foods.js");
var table = require("./../database/table.js");
var errors = require("./errors.js");

var food = function() {

};

food.prototype.pageId = function() {
    return "food";
};

food.prototype.output = function(callback, req) {

    if (req.query.hasOwnProperty("id")) {

        foods.byId(req.query.id, function(result) {
            if (result) {
                //checks for the get property
                if (req.query.hasOwnProperty("get")) {
                    if (req.query.get === "features") {
                        if (req.query.hasOwnProperty("search")) {
                            result.searchFeatures(req.query.search, function(results) {
                                if (results) {
                                    callback(table.entriresToJson(results));
                                } else callback(errors.empty);
                            });
                        } else {
                            result.getFeatures(function(results) {
                                if (results) {
                                    callback(table.entriresToJson(results));
                                } else callback(errors.empty);
                            });
                        }
                    } else if (req.query.get === "meals") {
                        result.getMeals(function(results) {
                            callback(table.entriresToJson(results));
                        });
                    } else callback(errors.get);
                    //returns the id result
                } else callback(result.toJson());
            } else callback(errors.empty);
        });
    } else if (req.query.hasOwnProperty("search")) {
        foods.search(req.query.search, function(results) {
            if (results) {
                callback(table.entriresToJson(results));
            } else callback(errors.empty);
        });
    } else callback(errors.general);

};

module.exports = food;