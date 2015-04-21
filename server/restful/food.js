var foods = require("./../database/foods.js");
var table = require("./../database/table.js");
var errors = require("./errors.js");

var food = function() {

};

food.prototype.pageId = function() {
    return "food";
};

var _getFoodRequest = function(get, food, callback) {
    if (get === "features") {
        if (req.query.hasOwnProperty("search")) {
            food.searchFeatures(req.query.search, function(results, error) {
                if (!error) {
                    callback(table.entriresToJson(results));
                } else callback(errors.custom(error));
            });
        } else {
            food.getFeatures(function(results, error) {
                if (!error) {
                    callback(table.entriresToJson(results));
                } else callback(errors.custom(error));
            });
        }
    } else if (get === "meals") {
        food.getMeals(function(results, error) {
            if (!error) {
                callback(table.entriresToJson(results));
            } else callback(errors.custom(error));
        });
    } else callback(errors.get);
};

food.prototype.output = function(callback, req) {

    if (req.query.hasOwnProperty("id")) {

        foods.byId(req.query.id, function(result, error) {
            if (!error) {
                //checks for the get property
                if (req.query.hasOwnProperty("get")) {
                    _getFoodRequest(req.query.get, result, callback);
                    //returns the id result
                } else {
                    if (!result)
                        callback(errors.empty);
                    else
                        callback(result.toJson());
                }
            } else callback(errors.custom(error));
        });
    } else if (req.query.hasOwnProperty("search")) {
        foods.search(req.query.search, function(results, error) {
            if (!error) {
                if (results) {
                    callback(table.entriresToJson(results));
                } else callback(errors.empty);
            } else callback(errors.custom(error));
        });
    } else if (req.query.hasOwnProperty("mealId") && req.query.hasOwnProperty("featureId")) {
        foods.featureAndMeal(req.query.featureId, req.query.mealId, function(results, error) {
            if (!error) {
                if (results) {
                    callback(table.entriresToJson(results));
                } else callback(errors.empty);
            } else callback(errors.custom(error));
        });

    } else callback(errors.general);

};

module.exports = food;