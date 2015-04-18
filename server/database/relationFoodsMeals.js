var foods = require("./foods.js");
var meals = require("./meals.js");
var table = require("./table.js");


var _getFoods = function(meal, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT foods.* , relationFoodsMeals.* FROM foods INNER JOIN relationFoodsMeals ON foods.id = relationFoodsMeals.foodId WHERE relationFoodsMeals.mealId = ?", [meal.getId()], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfoodItems = [];
                    for (var x = 0; x < results.length; x++) {
                        lfoodItems.push(new foods._foodItem(results[x]));
                    }
                    callback(lfoodItems);
                    connection.release();
                }
            });

        }
    });
}

var _getMeals = function(food, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT meals.* , relationFoodsMeals.* FROM meals INNER JOIN relationFoodsMeals ON meals.id = relationFoodsMeals.mealId WHERE relationFoodsMeals.foodId = ?", [food.getId()], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfoodItems = [];
                    for (var x = 0; x < results.length; x++) {
                        lfoodItems.push(new meals._meal(results[x]));
                    }
                    callback(lfoodItems);
                    connection.release();
                }
            });
        }
    });
}

var _searchMeals = function(food, search, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT meals.* , relationFoodsMeals.* FROM meals INNER JOIN relationFoodsMeals ON meals.id = relationFoodsMeals.mealId WHERE relationFoodsMeals.foodId = ? AND meals.name LIKE ?", [food.getId(), search], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfoodItems = [];
                    for (var x = 0; x < results.length; x++) {
                        lfoodItems.push(new meals._meal(results[x]));
                    }
                    callback(lfoodItems);
                    connection.release();
                }
            });
        }
    });
}


var _verify = function() {

    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection)) {
            connection.query("CREATE TABLE IF NOT EXISTS  `relationFoodsMeals` ( \
              `foodId` INT NULL, \
              `mealId` INT NULL);", function(err, results) {
                if (table.checkError(err, connection))
                    connection.release();

            });
        }
    });

}


var _createRelationPair = function(food, meal, callback) {

    __db.getConnection(function(err, connection) {
        table.checkError(err, connection);
        connection.query("SELECT * FROM `relationFoodsMeals` WHERE foodId = ? AND mealId = ?", [food.getId(), meal.getId()], function(err, results) {
            table.checkError(err, connection);
            if (results.length === 0) {
                var lrealtionalPair = {
                    foodId: food.getId(),
                    mealId: meal.getId()
                };
                connection.query("INSERT INTO `relationFoodsMeals` SET ?", lrealtionalPair, function(err, results) {
                    table.checkError(err, connection);
                    callback(lrealtionalPair);
                    connection.release();

                });
            }

        });
    });

}


module.exports = {
    verify: _verify,
    createRelationPair: _createRelationPair,
    getFoods: _getFoods,
    getMeals: _getMeals,
    searchMeals: _searchMeals

}