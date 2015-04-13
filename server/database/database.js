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

  require("./feature.js").verify();

}

module.exports = database;