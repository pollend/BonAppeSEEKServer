var foods = require("./../database/foods.js");

var feature = function()
{
}

feature.prototype.pageId = function() {
	return "food";
};

feature.prototype.output = function(callback,req)
{

	if(req.query.hasOwnProperty("id"))
	{

		foods.byId(req.query.id,function(result)
		{
				if(result)
				{
					if(req.query.hasOwnProperty("get"))
					{
						if(req.query.get === "features")
						{
							result.getFeatures(function(results)
							{
								var lfeatures = [];
								for(var x = 0; x < results.length; x++)
								{
									lfeatures.push(results[x].toJson());
								}
								callback(lfeatures);

							});
						}
						else if(req.query.get === "meals")
						{
							result.getMeals(function(results)
								{
									var lmeals = [];
									for(var x = 0; x < results.length; x++)
									{
										lfeatures.push(results[x].toJson());
									}
									callback(lmeals);

								});	
						}
						else
						{
							callback({"error":"Illegal get request"});
						}

					}
					else
					{
						callback(result.toJson());
					}
				}
				else
				{
					callback({"error":"Illegal Id"});
				}
		});
		
	}
	else if(req.query.hasOwnProperty("search"))
	{

			foods.search(req.query.search,function(result)
			{
					if(result)
					{
						var lfoods = [];
						for(var x = 0; x < result.length; x++)
						{
							lfoods.push(result[x].toJson());
						}
						callback(lfoods);
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