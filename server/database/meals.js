var relationFoodsMeals = require("./relationFoodsMeals.js");

var meal = function(result) {
    this._id = result.id;
    this._name = result.name;
}

meal.prototype.getFoods = function(callback) {
    relationFoodsMeals.getFoods(this, callback);
};

meal.prototype.addFood = function(food, callback) {
    relationFoodsMeals.createRelationPair(food, this, callback);
};

meal.prototype.toJson = function() {
    return {
        "id": this._id,
        "name": this._name
    }
};

/**
 * returns the id
 * @return {int} id
 */
meal.prototype.getId = function() {
    return this._id;
};


/**
 * returns the name of the meal
 * @return {string} the meal name
 */
meal.prototype.getName = function() {
    return this._name;
};

/**
 * sets the name for the meal
 * @param {string} value the meal value
 */
meal.prototype.setName = function(value) {
    this._name = value;
};

/**
 * commit the update object to the database
 * @param  {function} a true or false callback that verify if the commit succeeds
 */
meal.prototype.commit = function(callback) {
    __db.query("UPDATE meals SET name = ?, WHERE id = ?", [this._name, this._id], function(err, results) {
        if (err) {
            callback(false);
            console.log(err)
        }

        callback(true);
    });
};

/**
 * verifies the table
 */
var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `meals` ( \
  `id` INT AUTO_INCREMENT, \
  `name` VARCHAR(45) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));");
}

/**
 * searches the meal table based on the name
 * @param  {string}   name     searches based on the name
 * @param  {Function} callback the callback of meals
 */
var _search = function(name, callback) {
    var query = __db.query("SELECT * FROM meals WHERE name LIKE ?", [name], function(err, results) {
        if (err) {
            console.log(err)
            callback(null);
        }
        var lmeals = [];
        for (var i = 0; i < results.length; i++) {
            lmeals.push(new meal(results[i]));
        };
        callback(lmeals);

    });
}

/**
 * get the meal by the Id
 * @param  {integer}   id      get the meals by the ID
 * @param  {Function} callback The collection of meals
 */
var _mealById = function(id, callback) {
    var query = __db.query("SELECT * FROM meals WHERE id = ?", [id], function(err, results) {
        if (err) {
            callback(null);
            console.log(err)
        }

        var lmeals = null;
        console.log(results);
        for (var x = 0; x < results.length; x++) {
            lmeals = new meal(results[x]);
        }
        callback(lmeals);
    });
}

var _create = function(name, callback) {
    var lmeal = {
        "name": name
    };
    var query = __db.query("INSERT INTO meals SET ?", lmeal, function(err, results) {
        if (err) {
            callback(null);
            console.log(err)
        } else {
            callback(new meal({
                "id": results.insertId,
                "name": name
            }))
        }
    });
}


module.exports = {
    verify: _verify,
    search: _search,
    create: _create,
    byId: _mealById,
    _meal: meal
}