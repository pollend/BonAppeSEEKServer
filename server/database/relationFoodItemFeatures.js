foodItems = require("./foodItems.js");
feature = require("./features.js");

var _getFoodItems = function(feature,callback)
{
 __db.query("SELECT foodItems.* , relationFoodItemFeature.* FROM foodItems INNER JOIN relationFoodItemFeature ON foodItems.id = relationFoodItemFeature.foodItemId WHERE foodItems.id = ?",[feature.getId()],function(err, results)
 {
   if(err)
   {
    callback(null);
    console.log(err);
   }
   var lfoodItems = [];
   for(var x = 0; x < results.length; x++)
   {
    lfoodItems.push(new foodItems._foodItem(results[x]));
   }
   callback(lfoodItems);
 });

}

var _getFeatures = function(foodItem,callback)
{
  __db.query("SELECT features.* , relationFoodItemFeature.* FROM features INNER JOIN relationFoodItemFeature ON features.id = relationFoodItemFeature.featureId WHERE features.id = ?",[foodItem.getId()],function(err, results)
 {
   if(err)
   {
    callback(null);
    console.log(err);
   }
   var lfoodItems = [];
   for(var x = 0; x < results.length; x++)
   {
    lfoodItems.push(new foodItems._foodItem(results[x]));
   }
   callback(lfoodItems);
 });
}

var _verify = function()
{
 __db.query("CREATE TABLE IF NOT EXISTS  `relationFoodItemFeature` ( \
  `foodItemId` INT NULL, \
  `featureId` INT NULL);");
}


var _createRelationPair= function(foodItems,feature,callback)
{
  var lrealtionalPair = {
   foodItemId : foodItems.getId,
   featureId : feature.getId
  };

  __db.query("INSERT INTO `relationFoodItemFeature` SET ?",lrealtionalPair,function(err,results)
  {
     if(err)
    {
      callback(false);
      console.log(err)
    }

    callback(true);
  });

}


module.exports = {
 verify : _verify,
 createRelationPair : _createRelationPair,
 getFoodItems : _getFoodItems,
 getFeatures : _getFeatures

}