var features = function(id,value)
{
this._id = id;
this._value = value;
}


var _getFeatureById = function(id)
{
 console.log("featureID:" + id);
}

var _instance = function()
{

 console.log("instance:");
}

module.exports = {
 instance : _instance,
 byId : _getFeatureById
};

