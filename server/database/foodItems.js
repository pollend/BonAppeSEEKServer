var relationFoodItemFeature = require("./relationFoodItemFeatures.js");
var feature = require("./features.js");

var foodItem = function(result)
{
    this._id = result.id;
    this._foodItem = result.foodItem;
}

foodItem.prototype.addFeature = function(feature) {
  
};

//converts to json format
foodItem.prototype.toJson = function(first_argument) {
  return {
    id:this._id,
    foodItem : this._foodItem
  };
};

foodItem.prototype.getId = function() {
  return this._id;
};

//get the food Item
foodItem.prototype.getFoodItem = function() {
  return this._foodItem;
};

//set food Item
foodItem.prototype.setFoodItem = function(value) {
  this._foodItem = value;
};

foodItem.prototype.commit = function() {
    __db.query("UPDATE foodItems SET foodItem = ? WHERE id = ?",[this._feature,this._id],function(err,results)
  {
    if(err)
    {
      callback(false);
      console.log(err)
    }

    callback(true);
  });
};


var _foodItemById = function(id,callback)
{
   var query = __db.query("SELECT * FROM foodItems WHERE id = ?",[id],function(err, results)
    {
        if(err)
        {  
          callback(null);
          console.log(err)
        }

        var lfeatures = null;
        for(var x = 0; x < results.length; x++)
        {
            lfeatures = new foodItem(results[x]);
        }
        callback(lfeatures);
    });
}

var _instance = function(name, callback)
{
  var lfoodItem = {foodItem : name};
  var query = __db.query("INSERT INTO foodItems SET ?",lfoodItem, function(err,results){
    if(err)
    {  
      callback(null);
      console.log(err)
    }
  
    callback(new foodItem({id : results.insertId, foodItem : name}))
  });
}

var _searchFoodItemByName = function(name,callback)
{

  var query = __db.query("SELECT * FROM foodItems WHERE foodItem LIKE ?",[name],function(err, results)
  {
      var lfeatures = [];
      console.log(err)
      for(var x = 0; x < results.length; x++)
      {
          lfeatures.push(new foodItem(results[x]));
      }
      callback(lfeatures);
  });
}

var _verify = function()
{
 __db.query("CREATE TABLE IF NOT EXISTS  `foodItems` ( \
  `id` INT AUTO_INCREMENT, \
  `foodItem` VARCHAR(45) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `foodItem_UNIQUE` (`foodItem` ASC));");
}

module.exports = {
 instance : _instance,
 byId : _foodItemById,
 search : _searchFoodItemByName,
 verify : _verify,
 _foodItem : foodItem
};

