
var _table = "foodItems";


var foodItem = function(id,foodItem)
{
    this._id = id;
    this._foodItem = foodItem;
}

foodItem.prototype.commit = function() {
    __db.query("UPDATE " + _table + " SET foodItem = ?",[this._feature],function(err,results)
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
   var query = __db.query("SELECT * FROM " + _table + " WHERE id = ?",[id],function(err, results)
    {
        if(err)
        {  
          callback(null);
          console.log(err)
        }

        var lfeatures = null;
        for(var x = 0; x < results.length; x++)
        {
            lfeatures = new foodItem(results[x].id,results[x].foodItem);
        }
        callback(lfeatures);
    });
}

var _instance = function(name, callback)
{
  var lfoodItem = {foodItem : name};
  var query = __db.query("INSERT INTO "+ _table +" SET ?",lfoodItem, function(err,results){
    if(err)
    {  
      callback(null);
      console.log(err)
    }
  
    callback(new foodItem(results.insertId,name))
  });
}

var _searchFoodItemByName = function(name,callback)
{

  var query = __db.query("SELECT * FROM " + _table + " WHERE foodItem LIKE ?",[name],function(err, results)
  {
      var lfeatures = [];
      console.log(err)
      for(var x = 0; x < results.length; x++)
      {
          lfeatures.push(new feature(results[x].id,results[x].feature));
      }
      callback(lfeatures);
  });
}

var _verify = function()
{
 __db.query("CREATE TABLE IF NOT EXISTS  `"+ _table+"` ( \
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
 table : _table
};

