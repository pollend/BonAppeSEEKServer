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
  require("./foodItems.js").verify();
  require("./relationFoodItemFeatures.js").verify();

}

module.exports = database;