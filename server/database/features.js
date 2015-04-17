var relationFoodItemFeature = require("./relationFoodsFeatures.js");

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

feature.prototype.setName = function(value) {
    this._name = value;
};

feature.prototype.getId = function() {
    return this._id;
};

//commit the data to the features
feature.prototype.commit = function(callback) {
    __db.query("UPDATE features SET name = ? WHERE id = ?", [this._name, this._id], function(err, results) {
        if (err) {
            callback(false);
            console.log(err)
        }

        callback(true);
    });
};

//get the feature by the id
var _featureById = function(id, callback) {
    var query = __db.query("SELECT * FROM features WHERE id = ?", [id], function(err, results) {
        if (err) {
            callback(null);
            console.log(err)
        }

        var lfeatures = null;
        for (var x = 0; x < results.length; x++) {
            lfeatures = new feature(results[x]);
        }
        callback(lfeatures);
    });
}

var _instance = function(name, callback) {
    var lfeature = {
        "name": name
    };
    var query = __db.query("INSERT INTO features SET ?", lfeature, function(err, results) {
        console.log(err);
        if (err) {
            callback(null);
            console.log(err)
        }

        callback(new feature(results.insertId, name))
    });
}


var _searchByName = function(name, callback) {

    var query = __db.query("SELECT * FROM features WHERE name LIKE ?", [name], function(err, results) {
        if (err) {
            callback(null);
            console.log(err)
        }

        var lfeatures = [];
        for (var x = 0; x < results.length; x++) {
            lfeatures.push(new feature(results[x].id, results[x].feature));
        }
        callback(lfeatures);
    });
}

var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `features` ( \
  `id` INT AUTO_INCREMENT, \
  `name` VARCHAR(45) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));");
}

module.exports = {
    instance: _instance,
    byId: _featureById,
    search: _searchByName,
    verify: _verify,
    _feature: feature
};