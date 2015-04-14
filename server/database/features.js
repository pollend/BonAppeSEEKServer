var feature = function(id,feature)
{
  console.log(id +"," + feature);
  this._id = id;
  this._feature = feature;
}

feature.prototype.getFeature = function() {
  return this._feature;
};

feature.prototype.toJson = function() {
  return {
    id : this._id,
    feature : this._feature
  }
};

feature.prototype.setFeature = function(value) {
  this._feature = value;
};

feature.prototype.getId = function() {
  return this._id;
};

feature.prototype.commit = function(callback) {
  __db.query("UPDATE features SET feature = ? WHERE id = ?",[this._feature,this._id],function(err,results)
  {
    if(err)
    {
      callback(false);
      console.log(err)
    }

    callback(true);
  });
};


var _featureById = function(id, callback)
{
  var query = __db.query("SELECT * FROM features WHERE id = ?",[id],function(err, results)
    {
        if(err)
        {  
          callback(null);
          console.log(err)
        }

        var lfeatures = null;
        for(var x = 0; x < results.length; x++)
        {
            lfeatures = new feature(results[x].id,results[x].feature);
        }
        callback(lfeatures);
    });
}

var _instance = function(name,callback)
{
  var lfeature = {feature : name};
  var query = __db.query("INSERT INTO features SET ?",lfeature, function(err,results){
    console.log(err);
    if(err)
    {  
      callback(null);
      console.log(err)
    }
  
    callback(new feature(results.insertId,name))
  });
}


var _searchByFeatureName = function(name,callback)
{

    var query = __db.query("SELECT * FROM features WHERE feature LIKE ?",[name],function(err, results)
    {
        if(err)
        {  
          callback(null);
          console.log(err)
        }

        var lfeatures = [];
        for(var x = 0; x < results.length; x++)
        {
            lfeatures.push(new feature(results[x].id,results[x].feature));
        }
        callback(lfeatures);
    });
}

var _verify = function()
{
 __db.query("CREATE TABLE IF NOT EXISTS  `features` ( \
  `id` INT AUTO_INCREMENT, \
  `feature` VARCHAR(45) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `feature_UNIQUE` (`feature` ASC));");
}

module.exports = {
 instance : _instance,
 byId : _featureById,
 search : _searchByFeatureName,
 verify : _verify,
 _feature :feature
};

