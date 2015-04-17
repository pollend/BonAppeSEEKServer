foods = require("./foods.js");
features = require("./features.js");

var _getFoods = function(feature, callback) {
    __db.query("SELECT foods.* , relationFoodsFeatures.* FROM foods INNER JOIN relationFoodsFeatures ON foods.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.featureId = ?", [feature.getId()], function(err, results) {
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

var _searchFoods = function(feature, search, callback) {
    __db.query("SELECT foods.* , relationFoodsFeatures.* FROM foods INNER JOIN relationFoodsFeatures ON foods.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.featureId = ? AND foods.name LIKE ?", [feature.getId(), search], function(err, results) {
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


var _getFeatures = function(food, callback) {
    __db.query("SELECT features.* , relationFoodsFeatures.* FROM features INNER JOIN relationFoodsFeatures ON features.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.foodId = ?", [food.getId()], function(err, results) {
        if (err) {
            callback(null);
            console.log(err);
        } else {
            var lfeatures = [];
            for (var x = 0; x < results.length; x++) {
                lfeatures.push(new features._feature(results[x]));
            }
            callback(lfeatures);
        }
    });
}

var _searchFeatures = function(food, search, callback) {
    __db.query("SELECT features.* , relationFoodsFeatures.* FROM features INNER JOIN relationFoodsFeatures ON features.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.foodId = ? AND features.name = ?", [food.getId(), search], function(err, results) {
        if (err) {
            callback(null);
            console.log(err);
        } else {
            var lfeatures = [];
            for (var x = 0; x < results.length; x++) {
                lfeatures.push(new features._feature(results[x]));
            }
            callback(lfeatures);
        }
    });
}

var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `relationFoodsFeatures` ( \
  `foodId` INT NULL, \
  `featureId` INT NULL);");
}


var _createRelationPair = function(foodItem, feature, callback) {
    var lrealtionalPair = {
        foodId: foodItem.getId(),
        featureId: feature.getId()
    };

    __db.query("SELECT * FROM `relationFoodsFeatures` WHERE foodId = ? AND featureId = ?", [foodItem.getId(), feature.getId()], function(err, results) {
        if (err) {
            console.log(err)
        } else {
            if (results.length === 0) {
                __db.query("INSERT INTO `relationFoodsFeatures` SET ?", lrealtionalPair, function(err, results) {
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
    searchFoods: _searchFoods,
    getFeatures: _getFeatures,
    searchFeatures: _searchFeatures

}