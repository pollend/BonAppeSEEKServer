var relationFoodItemFeature = require("./relationFoodsFeatures.js");
var table = require("./table.js");

var feature = function(result) {
    this._id = result.id;
    this._name = result.name;
}

feature.prototype.toJson = function() {
    return {
        id: this._id,
        feature: this._name
    }
};

feature.prototype.getFoods = function(callback) {
    relationFoodItemFeature.getFeatures(this, callback);
};

feature.prototype.addFood = function(food, callback) {
    relationFoodItemFeature.createRelationPair(food, this, callback);
}

feature.prototype.searchFoods = function(search, callback) {
    relationFoodItemFeature.searchFeatures(this, this, callback);
};

feature.prototype.getName = function() {
    return this._name;
};

/**
 * set the name for the feature
 */
feature.prototype.setName = function(value) {
    this._name = value;
};

feature.prototype.getId = function() {
    return this._id;
};

//commit the data to the features
feature.prototype.commit = function(callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("UPDATE features SET name = ? WHERE id = ?", [this._name, this._id], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    callback(true);
                    connection.release();
                }
            });
        };
    });
};

//get the feature by the id
var _featureById = function(id, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection)) {
            connection.query("SELECT * FROM features WHERE id = ?", [id], function(err, results) {
                if (table.checkError(err, connection)) {
                    var lfeatures = null;
                    for (var x = 0; x < results.length; x++) {
                        lfeatures = new feature(results[x]);
                    }
                    callback(lfeatures);
                    connection.release();
                }
            });
        }

    });
}

var _create = function(name, callback) {

    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            var lfeature = {
                "name": name
            };
            connection.query("INSERT INTO features SET ?", lfeature, function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    callback(new feature({
                        "id": results.insertId,
                        "name": name
                    }));
                    connection.release();
                }
            });
        }

    });
}


var _searchByName = function(name, callback) {

    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT * FROM features WHERE name LIKE ?", [name], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfeatures = [];
                    for (var x = 0; x < results.length; x++) {
                        lfeatures.push(new feature(results[x].id, results[x].feature));
                    }

                    callback(lfeatures);
                    connection.release();
                }
            });
        }

    });
}

var _verify = function() {
    __db.getConnection(function(err, connection) {
        connection.query("CREATE TABLE IF NOT EXISTS  `features` ( \
                          `id` INT AUTO_INCREMENT, \
                          `name` VARCHAR(45) , \
                          PRIMARY KEY (`id`), \
                          UNIQUE INDEX `id_UNIQUE` (`id` ASC));", function(err, results) {
            if (table.checkError(err, connection)) {
                connection.release();
            }
        });
    });
}

module.exports = {
    create: _create,
    byId: _featureById,
    search: _searchByName,
    verify: _verify,
    _feature: feature
};