foods = require("./foods.js");
meals = require("./meals.js");

var _getFoods = function(meal, callback) {
    __db.query("SELECT foods.* , relationFoodsMeals.* FROM foods INNER JOIN relationFoodsMeals ON foods.id = relationFoodsMeals.foodId WHERE relationFoodsMeals.mealId = ?", [meal.getId()], function(err, results) {
        if (err) {
            callback(null);
            console.log(err);
        }
        var lfoodItems = [];
        for (var x = 0; x < results.length; x++) {
            lfoodItems.push(new foods._foodItem(results[x]));
        }
        callback(lfoodItems);
    });
}

var _getMeals = function(food, callback) {
    __db.query("SELECT meals.* , relationFoodsMeals.* FROM meals INNER JOIN relationFoodsMeals ON meals.id = relationFoodsMeals.mealId WHERE relationFoodsMeals.foodId = ?", [food.getId()], function(err, results) {
        if (err) {
            callback(null);
            console.log(err);
        }
        var lfoodItems = [];
        for (var x = 0; x < results.length; x++) {
            lfoodItems.push(new meals._meal(results[x]));
        }
        callback(lfoodItems);
    });
}

var _searchMeals = function(food,search, callback) {
    __db.query("SELECT meals.* , relationFoodsMeals.* FROM meals INNER JOIN relationFoodsMeals ON meals.id = relationFoodsMeals.mealId WHERE relationFoodsMeals.foodId = ? AND meals.name LIKE ?", [food.getId(),search], function(err, results) {
        if (err) {
            callback(null);
            console.log(err);
        }
        var lfoodItems = [];
        for (var x = 0; x < results.length; x++) {
            lfoodItems.push(new meals._meal(results[x]));
        }
        callback(lfoodItems);
    });
}


var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `relationFoodsMeals` ( \
  `foodId` INT NULL, \
  `mealId` INT NULL);");
}


var _createRelationPair = function(food, meal, callback) {
    var lrealtionalPair = {
        foodId: food.getId(),
        mealId: meal.getId()
    };

    __db.query("SELECT * FROM `relationFoodsMeals` WHERE foodId = ? AND mealId = ?", [food.getId(), meal.getId()], function(err, results) {
        if (err) {
            console.log(err)
        } else {
            if (results.length === 0) {
                __db.query("INSERT INTO `relationFoodsMeals` SET ?", lrealtionalPair, function(err, results) {
                    if (err) {
                        callback(false);
                        console.log(err)
                    } else {
                        callback(true);
                    }
                });
            }
        }
    });

}


module.exports = {
    verify: _verify,
    createRelationPair: _createRelationPair,
    getFoods: _getFoods,
    getMeals: _getMeals,
    searchMeals : _searchMeals

}