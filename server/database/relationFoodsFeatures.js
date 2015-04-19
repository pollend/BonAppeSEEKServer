foods = require("./foods.js");
features = require("./features.js");
var table = require("./table.js");


var _getFoods = function(feature, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT foods.*  FROM foods INNER JOIN relationFoodsFeatures ON foods.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.featureId = ?", [feature.getId()], function(err, results) {
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
};

var _searchFoods = function(feature, search, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT foods.*  FROM foods INNER JOIN relationFoodsFeatures ON foods.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.featureId = ? AND foods.name LIKE ?", [feature.getId(), search], function(err, results) {
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
};


var _getFeatures = function(food, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT features.*  FROM features INNER JOIN relationFoodsFeatures ON features.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.foodId = ?", [food.getId()], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfeatures = [];
                    for (var x = 0; x < results.length; x++) {
                        lfeatures.push(new features._feature(results[x]));
                    }
                    callback(lfeatures);
                    connection.release();
                }

            });
        }
    });
};

var _searchFeatures = function(food, search, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT features.* FROM features INNER JOIN relationFoodsFeatures ON features.id = relationFoodsFeatures.foodId WHERE relationFoodsFeatures.foodId = ? AND features.name = ?", [food.getId(), search], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfeatures = [];
                    for (var x = 0; x < results.length; x++) {
                        lfeatures.push(new features._feature(results[x]));
                    }
                    callback(lfeatures);
                    connection.release();
                }

            });
        }
    });
};

var _createRelationPair = function(foodItem, feature, callback) {
    var lrealtionalPair = {
        foodId: foodItem.getId(),
        featureId: feature.getId()
    };
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT * FROM `relationFoodsFeatures` WHERE foodId = ? AND featureId = ?", [foodItem.getId(), feature.getId()], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    if (results.length === 0) {
                        connection.query("INSERT INTO `relationFoodsFeatures` SET ?", lrealtionalPair, function(err, results) {
                            if (table.checkError(err, connection, callback)) {
                                callback(true);
                            }
                        });
                    }
                }
            });
        }
    });

}

var _verify = function() {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection)) {
            __db.query("CREATE TABLE IF NOT EXISTS  `relationFoodsFeatures` ( \
                      `foodId` INT NULL, \
                      `featureId` INT NULL);", function(err, results) {
                if (table.checkError(err, connection))
                    connection.release();
            });
        }
    });
};


module.exports = {
    verify: _verify,
    createRelationPair: _createRelationPair,
    getFoods: _getFoods,
    searchFoods: _searchFoods,
    getFeatures: _getFeatures,
    searchFeatures: _searchFeatures

};