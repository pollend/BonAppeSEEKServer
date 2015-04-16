var relationFoodsMeals = require("./relationFoodsMeals.js");

var meal = function(result)
{
 this._id = result.id;
 this._name = result.name;
}

meal.prototype.getFoods = function(callback) {
  relationFoodsMeals.getFoods(this,callback);
  
};

meal.prototype.addFood = function(food, callback) {
  relationFoodsMeals.createRelationPair(food,this,callback);
};

meal.prototype.toJson = function() {
  return {"id" : this._id, "name" : this._name}
};

meal.prototype.getId = function() {
  return this._id;
};

meal.prototype.getName = function() {
  return this._name;
};

meal.prototype.setName = function(value) {
  this._name = value;
};

meal.prototype.commit = function(callback) {
  __db.query("UPDATE meals SET name = ?, WHERE id = ?",[this._name,this._id],function(err,results)
  {
    if(err)
    {
      callback(false);
      console.log(err)
    }

    callback(true);
  });
};


/**
* static database functions
**/
var _verify = function()
{
 __db.query("CREATE TABLE IF NOT EXISTS  `meals` ( \
  `id` INT AUTO_INCREMENT, \
  `name` VARCHAR(45) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));");
}

var _search = function(name, callback)
{
  var query = __db.query("SELECT * FROM meals WHERE name LIKE ?",[name],function(err, results)
  {
     if(err)
    {
      console.log(err)
    }
    var lmeals = [];
    for (var i = 0; i < results.length ; i++) {
     lmeals.push(new meal(results[i]));
    };
    return lmeals;

  });
}

var _instance = function(name,callback)
{
   var lmeal = {
    "name" : name
  };
  var query = __db.query("INSERT INTO meals SET ?",lmeal, function(err,results){
    if(err)
    {  
      callback(null);
      console.log(err)
    }
    else
    {
     callback(new foodItem({"id" : results.insertId, "name" : name}))
    }
  });
}


module.exports = {
 verify : _verify,
 search : _search,
 instance : _instance,
 _meal : meal
}