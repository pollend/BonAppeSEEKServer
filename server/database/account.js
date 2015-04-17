var crypto = require('crypto');

var account = function(result) {

};

var _login = function(name, password, callback) {
    __db.query("SELECT * FROM accounts WHERE name = ? AND password = ?", [name, password], function(err, results) {
        if (err) {
            callback(false);
            console.log(err);
        }
        if (results.length > 0) {
            callback(true);
        } else {
            callback(false);
        }
    });

}

var _search = function(name, result) {
    __db.query("SELECT * FROM accounts WHERE name = ?", [name], function(err, result) {
        if (err) {
            callback(null);
            console.log(err);
        }

        var laccount = null;
        console.log(result);

    });

};

var _create = function(name, password, callback) {
    var laccount = {
        "name": name,
        "password": password
    };

    __db.query("INSERT INTO accounts SET ?", laccount, function(err, result) {
        if (err) {
            callback(null);
            console.log(err);
        }
        callback(new account({
            "id": result.insertId,
            "name": name,
            "password": password
        }));

    });

};

var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `accounts` ( \
  `id` INT AUTO_INCREMENT, \
  `name` VARCHAR(45) , \
  `password` VARCHAR(200) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));");
};

module.exports = {
    verify: _verify,
    create: _create
};