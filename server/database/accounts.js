var crypto = require('crypto');
var phoneTokens = require('phoneTokens.js');

var account = function(result) {
    this._name = result.name;
    this._id = result.id;
    this._passowrd = result.password;
};

var _hashPassword = function(password) {
    return crypto.createHash('sha256').update(__config.password_salt + password).digest('base64');
}

account.prototype.getPhoneTokens = function(callback) {
    phoneTokens.getAccountsByToken(this, callback);

};


account.prototype.getName = function() {
    return this._name;
};

account.prototype.setName = function(value) {
    this._name = value;
};

account.prototype.getId = function() {
    return this._id;
};

account.prototype.updatePassword = function(value) {
    this._password = _hashPassword(value);
};

account.prototype.commit = function(callback) {

    __db.getConnection(function(err, connection) {
        if (err) {
            callback(false);
            console.log(err);
            connection.release()
        } else {
            connection.query("UPDATE accounts SET name = ?, password = ? WHERE id = ?", [this._name, this._password, this._id], function(err, results) {
                if (err) {
                    callback(false);
                    console.log(err)
                } else {
                    callback(true);
                }
                connection.release();
            });
        }
    });

};


var _login = function(name, password, callback) {
    __db.getConnection(function(err, connection) {
        if (err) {
            callback(false);
            console.log(err);
            connection.release()
        } else {
            connection.query("SELECT * FROM accounts WHERE name = ? AND password = ?", [name, _hashPassword(password)], function(err, results) {
                if (err) {
                    callback(false);
                    console.log(err);
                } else {
                    if (results.length > 0) {
                        callback(new account(results[0]));
                    } else {
                        callback(false);
                    }
                }
                connection.release();
            });
        }
    });

}

var _search = function(name, callback) {
    __db.getConnection(function(err, connection) {
        if (err) {
            callback(null);
            console.log(err);
            connection.release();

        } else {
            connection.query("SELECT * FROM accounts WHERE name = ?", [name], function(err, results) {
                if (err) {
                    callback(null);
                    console.log(err);
                } else {
                    var laccount = null;
                    for (var i = results.length - 1; i >= 0; i--) {
                        laccount = new account(results[i]);
                    }
                    callback(laccount);
                }
                connection.release();

            });
        }
    });

};

var _create = function(name, password, callback) {

    __db.getConnection(function(err, connection) {
        if (err) {
            callback(null);
            console.log(err);
            connection.release();

        } else {
            var laccount = {
                "name": name,
                "password": _hashPassword(password)
            };
            __db.query("INSERT INTO accounts SET ?", laccount, function(err, result) {
                if (err) {
                    callback(null);
                    console.log(err);
                } else {
                    callback(new account({
                        "id": result.insertId,
                        "name": name,
                        "password": password
                    }));
                }
                connection.release();
            });
        }
    });

};

var _accountById = function(id, callback) {
    __db.getConnection(function(err, connection) {
        if (err) {
            callback(null);
            console.log(err);
            connection.release();

        } else {
            connection.query("SELECT * FROM accounts WHERE id = ?", [id], function(err, results) {
                if (err) {
                    callback(null);
                    console.log(err);
                } else {

                    var laccount = null;
                    for (var i = results.length - 1; i >= 0; i--) {
                        laccount = new account(results[i]);
                    }
                    callback(laccount);
                }
            });
        }
    });
}

var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `accounts` ( \
  `id` INT AUTO_INCREMENT, \
  `name` VARCHAR(45) , \
  `password` VARCHAR(200) , \
  `email` VARCHAR(200) , \
  PRIMARY KEY (`id`), \
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));");
};

module.exports = {
    verify: _verify,
    create: _create,
    search: _search,
    login: _login,
    byId: _accountById,
    _account: account
};