var features = require("./../database/features.js");

var feature = function()
{

}

feature.prototype.pageId = function()
{
 return "feature";
}

feature.prototype.output = function(callback,req)
{
  if(req.query.hasOwnProperty("id"))
 {
  features.byId(req.query.id,function(result)
  {
   if(result)
   {
    callback(result.toJson());
   }
   else
   {
    callback({"error":"Illegal Id"});
   }
  });
 }
 else if(req.query.hasOwnProperty("search"))
 {
  features.search(req.query.search,function(result)
  {
    if(result)
    {
     var lfeatures = [];
     for(var x = 0; x < result.length; x++)
     {
      lfeatures.push(result[x].toJson());
     }
     callback(lfeatures);
    }
    else
    {
     callback({"error":"Illegal Id"});
    }
  }); 
 }
 else
 {
  callback({"error":"error"});
 }

}

module.exports = feature;