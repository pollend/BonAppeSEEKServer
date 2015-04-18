var relationFoodFeature = require("./relationFoodsFeatures.js");
var relationFoodsMeals = require("./relationFoodsMeals.js");
var feature = require("./features.js");
var table = require("./table.js");


var food = function(result) {
    this._id = result.id;
    this._name = result.name;
    this._image = result.image;
    this._nutritionImage = result.nutritionImage;
};

food.prototype.addFeature = function(feature, callback) {
    relationFoodItemFeature.createRelationPair(this, feature, callback);
};

food.prototype.getFeatures = function(callback) {
    relationFoodItemFeature.getFeatures(this, callback);
};

food.prototype.searchFeatures = function(search, callback) {
    relationFoodItemFeature.searchFeatures(this, search, callback);
};


food.prototype.addMeal = function(meal, callback) {
    relationFoodsMeals.createRelationPair(this, meal, callback);
};

food.prototype.getMeals = function(callback) {
    relationFoodsMeals.getMeals(this, callback);
};

food.prototype.searchMeals = function(serach, callback) {
    relationFoodsMeals.searchMeals(this, search, callback);
};


//converts to json format
food.prototype.toJson = function() {
    return {
        "id": this._id,
        "name": this._name,
        "image": this._image,
        "nutritionImage": this._nutritionImage

    };
};


food.prototype.getId = function() {
    return this._id;
};

//get the food Item
food.prototype.getName = function() {
    return this._name;
};

//set food Item
food.prototype.setName = function(value) {
    this._name = value;
};


food.prototype.setFoodImage = function(value) {
    this._image = value;
};

food.prototype.getFoodImage = function() {
    return this._image;
};


food.prototype.setNutritionImage = function(value) {
    this._nutritionImage = value;
};

food.prototype.getNutritionImage = function() {
    return this._nutritionImage;
};


food.prototype.commit = function(callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("UPDATE foods SET name = ?, image = ?, nutritionImage = ? WHERE id = ?", [this._name, this._image, this._nutritionImage, this._id], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    callback(true);
                    connection.release();
                }
            });
        }

    });
};


var _foodById = function(id, callback) {

    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT * FROM foods WHERE id = ?", [id], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfoods = null;
                    for (var x = 0; x < results.length; x++) {
                        lfoods = new food(results[x]);
                    }
                    callback(lfoods);
                    connection.release();
                }

            });
        }

    });
}

var _create = function(name, image, nutritionImage, callback) {

    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("INSERT INTO foods SET ?", lfoodItem, function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfoodItem = {
                        "name": name,
                        "image": image,
                        "nutritionImage": nutritionImage
                    };
                    callback(new food({
                        id: results.insertId,
                        foodItem: name
                    }));
                    connection.release();
                }
            });
        }

    });
};

var _search = function(name, callback) {

    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT * FROM foods WHERE name LIKE ?", [name], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var lfoods = [];
                    for (var x = 0; x < results.length; x++) {
                        lfoods.push(new food(results[x]));
                    }
                    callback(lfoods);
                    connection.release();
                }
            });
        }

    });
};

var _verify = function() {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection)) {
            __db.query("CREATE TABLE IF NOT EXISTS  `foods` ( \
                      `id` INT AUTO_INCREMENT, \
                      `name` VARCHAR(45) , \
                      `image` VARCHAR(200) , \
                      `nutritionImage` VARCHAR(200) , \
                      PRIMARY KEY (`id`), \
                      UNIQUE INDEX `id_UNIQUE` (`id` ASC));", function(err, results) {
                if (table.checkError(err, connection))
                    connection.release();
            });
        }
    });
}

module.exports = {
    create: _create,
    byId: _foodById,
    search: _search,
    verify: _verify,
    _food: food
};