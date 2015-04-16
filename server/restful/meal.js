var meals = require("./../database/meals.js");

var meal = function()
{

}

meal.prototype.pageId = function()
{
 return "meal";

}

meal.prototype.output = function(callback,req)
{
 if(req.query.hasOwnProperty("id"))
 {
 	meals.byId(req.query.id,function(result)
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
		meals.search(req.query.search,function(result)
		{
				if(result)
				{
					var lmeals = [];
					for(var x = 0; x < result.length; x++)
					{
						lmeals.push(result[x].toJson());
					}
					callback(lmeals);
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

module.exports = meal;