var database = function()
{

  var mysql = require('mysql');
  var connection = mysql.createConnection(
  {
   host     : __config.database_host,
   user     : __config.database_user,
   password : __config.database_password,
   database : __config.database_name
  });
  global.__db = connection;

  require("./features.js").verify();
  require("./foods.js").verify();
  require("./meals.js").verify();
  require("./relationFoodsFeatures.js").verify();
  require("./relationFoodsMeals.js").verify();

}

module.exports = database;