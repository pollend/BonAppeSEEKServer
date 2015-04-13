var feature = function(id,value)
{
this._id = id;
this._value = value;


}

feature.prototype.commit = function(first_argument) {
};


var _getFeatureById = function(id)
{
}

var _instance = function()
{

}

var _searchByFeatureName = function(name)
{

}

var _verify = function()
{
 __db.query("CREATE TABLE IF NOT EXISTS `features` ( \
  `id` INT NOT NULL AUTO_INCREMENT, \
  `feature` TEXT CHARACTER SET 'big5' COLLATE 'big5_chinese_ci' NOT NULL, \
  PRIMARY KEY (`id`)); ");
}

module.exports = {
 instance : _instance,
 byId : _getFeatureById,
 search : _searchByFeatureName,
 verify : _verify
};

